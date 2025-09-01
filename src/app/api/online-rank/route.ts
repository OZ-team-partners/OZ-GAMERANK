import { NextResponse } from "next/server";
import puppeteer, { Page } from "puppeteer";

interface OnlineGame {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  rank: number;
}

async function scrapeOnlineGames(page: Page): Promise<OnlineGame[]> {
  return await page.evaluate(() => {
    const gameElements: OnlineGame[] = [];

    // 게임메카 순위 테이블에서 게임 행들을 선택
    // 다양한 선택자로 시도
    let gameRows = document.querySelectorAll("table tr");

    // 첫 번째 선택자로 찾지 못한 경우 다른 선택자 시도
    if (gameRows.length === 0) {
      gameRows = document.querySelectorAll('[class*="ranking"]');
    }

    // 여전히 찾지 못한 경우 더 일반적인 선택자 시도
    if (gameRows.length === 0) {
      gameRows = document.querySelectorAll('tr[class*="row"]');
    }

    console.log(`게임 행 개수: ${gameRows.length}개`);

    // 각 게임 행에서 정보 추출 (1위~50위까지만)
    gameRows.forEach((row, index) => {
      if (index === 0) return; // 헤더 행 건너뛰기
      if (index > 50) return; // 50위까지만 처리

      try {
        // 순위 추출
        const rankElement = row.querySelector("td:first-child");
        const rankText = rankElement?.textContent?.trim();
        const rank = rankText ? parseInt(rankText) : index;

        // 게임 아이콘 이미지 추출
        const imgElement = row.querySelector("img");
        let imgSrc = "";
        if (imgElement) {
          imgSrc = imgElement.getAttribute("src") || "";
        }

        // 게임 제목 추출
        const titleElement = row.querySelector(
          "td:nth-child(4) a[href*='gmview']"
        );
        const title = titleElement?.textContent?.trim() || `Null`;

        // 개발사 정보 추출
        const developerElement = row.querySelector("a[href*='gmcid=']");
        const developer =
          developerElement?.textContent?.trim() || "개발사 정보 없음";

        // 부제목 생성 (개발사 정보만)
        const subtitle = developer;

        // 기본 이미지 설정
        if (!imgSrc || !imgSrc.startsWith("http")) {
          imgSrc = `/icon/rank_icon/online${(rank % 3) + 1}.jpeg`;
        }

        gameElements.push({
          id: rank.toString(),
          title: title,
          subtitle: subtitle,
          img: imgSrc,
          rank: rank,
        });

        console.log(`게임 ${rank}: ${title} - ${developer}`);
      } catch (error) {
        console.error(`게임 ${index} 추출 중 오류:`, error);
      }
    });

    return gameElements;
  });
}

export async function GET() {
  let browser;

  try {
    console.log("Puppeteer 브라우저 시작...");

    browser = await puppeteer.launch({
      headless: true,
      devtools: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();

    // User-Agent 설정
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // 뷰포트 설정
    await page.setViewport({ width: 1920, height: 1080 });

    console.log("게임메카 순위 페이지 로딩 중...");

    await page.goto("https://www.gamemeca.com/ranking.php#ranking-top", {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    console.log("페이지 로딩 완료, 데이터 추출 시작...");

    let games: OnlineGame[] = [];
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries && games.length === 0) {
      try {
        console.log(`크롤링 시도 ${retryCount + 1}/${maxRetries}`);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        games = await scrapeOnlineGames(page);

        console.log(`총 ${games.length}개의 게임 데이터 추출 완료`);

        if (games.length === 0) {
          console.log("데이터가 추출되지 않음, 재시도 중...");
          retryCount++;

          if (retryCount < maxRetries) {
            await page.reload({ waitUntil: "networkidle2" });
            await new Promise((resolve) => setTimeout(resolve, 3000));
          }
        }
      } catch (error) {
        console.error(`크롤링 시도 ${retryCount + 1} 실패:`, error);
        retryCount++;

        if (retryCount < maxRetries) {
          console.log("페이지 새로고침 후 재시도...");
          await page.reload({ waitUntil: "networkidle2" });
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }
    }

    if (games.length === 0) {
      console.log("모든 재시도 후에도 데이터를 추출할 수 없음");
      return NextResponse.json(
        {
          success: false,
          error:
            "게임메카 순위에서 데이터를 추출할 수 없습니다. 페이지 구조가 변경되었을 수 있습니다.",
          retryCount: retryCount,
          lastUpdated: new Date().toISOString(),
          source: "게임메카 순위 (Failed)",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: games,
      total: games.length,
      lastUpdated: new Date().toISOString(),
      source: "게임메카 순위 (Puppeteer)",
      scrapedCount: games.length,
      retryCount: retryCount,
    });
  } catch (error) {
    console.error("게임메카 온라인 게임 랭킹 크롤링 오류:", error);

    return NextResponse.json(
      {
        success: false,
        error: "게임메카 온라인 게임 랭킹 데이터를 가져오는데 실패했습니다.",
        details: error instanceof Error ? error.message : "Unknown error",
        lastUpdated: new Date().toISOString(),
        source: "게임메카 순위 (Error)",
      },
      { status: 500 }
    );
  } finally {
    // 브라우저 종료
    if (browser) {
      await browser.close();
      console.log("Puppeteer 브라우저 종료");
    }
  }
}
