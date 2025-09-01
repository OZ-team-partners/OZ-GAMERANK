import { NextResponse } from "next/server";
import puppeteer, { Page } from "puppeteer";

interface SteamGame {
  id: string; // number에서 string으로 변경
  title: string;
  subtitle: string;
  img: string;
  rank: number;
}

// Steam 크롤링 함수
async function scrapeSteamGames(page: Page): Promise<SteamGame[]> {
  return await page.evaluate(() => {
    const gameElements: SteamGame[] = []; // Element[]에서 SteamGame[]로 변경

    // Steam 차트에서 ROWS 클래스로 게임 행들을 선택
    const gameRows = document.querySelectorAll("._2-RN6nWOY56sNmcDHu069P");

    console.log(`게임 행 개수: ${gameRows.length}개`);

    // 각 게임 행에서 정보 추출
    gameRows.forEach((row, index) => {
      if (index >= 100) return; // 최대 100개만 처리

      try {
        // 순위 추출
        const rankElement = row.querySelector("._34h48M_x9S-9Q2FFPX_CcU");
        const rankText = rankElement?.textContent?.trim();
        const rank = rankText ? parseInt(rankText) : index + 1;

        // 게임 제목 추출
        const titleElement = row.querySelector("._1n_4-zvf0n4aqGEksbgW9N");
        const title = titleElement?.textContent?.trim() || `Steam Game ${rank}`;

        // 이미지 URL 추출
        const imageElement = row.querySelector("._2dODJrHKWs6F9v9QpgzihO");
        let imgSrc = "";

        if (imageElement) {
          // img 태그인 경우
          if (imageElement.tagName === "IMG") {
            imgSrc =
              imageElement.getAttribute("src") ||
              imageElement.getAttribute("data-src") ||
              "";
          }
          // 배경 이미지로 설정된 경우
          else {
            const style = window.getComputedStyle(imageElement);
            const backgroundImage = style.backgroundImage;
            if (backgroundImage && backgroundImage !== "none") {
              imgSrc = backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/g, "$1");
            }
          }
        }

        // Steam 앱 ID 추출 (제목 요소에서 링크 찾기)
        let appId = "";
        const titleLink = titleElement?.closest('a[href*="/app/"]');
        if (titleLink) {
          const href = titleLink.getAttribute("href");
          const appIdMatch = href?.match(/\/app\/(\d+)/);
          appId = appIdMatch ? appIdMatch[1] : "";
        }

        // Steam CDN에서 이미지 URL 생성 (앱 ID가 있는 경우)
        if (appId && (!imgSrc || !imgSrc.startsWith("http"))) {
          imgSrc = `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`;
        }

        // 기본 이미지 설정
        if (!imgSrc || !imgSrc.startsWith("http")) {
          imgSrc = `/icon/rank_icon/steam${(rank % 3) + 1}.jpeg`;
        }

        // 개발사/장르 정보 추출 (가능한 경우)
        let subtitle = `Steam 8월 판매량 : ${rank}위`;

        // 제목 요소 주변에서 추가 정보 찾기
        const titleContainer = titleElement?.closest("div");
        if (titleContainer) {
          const developerElement = titleContainer.querySelector(
            '[class*="developer"], [class*="publisher"]'
          );
          const tagElements = titleContainer.querySelectorAll(
            '[class*="tag"], [class*="genre"]'
          );

          const developer = developerElement?.textContent?.trim();
          const tags = Array.from(tagElements)
            .map((tag) => tag.textContent?.trim())
            .filter(Boolean);

          if (developer || tags.length > 0) {
            const parts = [];
            if (developer) parts.push(`개발사: ${developer}`);
            if (tags.length > 0)
              parts.push(`장르: ${tags.slice(0, 3).join(", ")}`);
            subtitle = parts.join(" | ");
          }
        }

        gameElements.push({
          id: rank.toString(), // number를 string으로 변환
          title: title,
          subtitle: subtitle,
          img: imgSrc,
          rank: rank,
        });

        console.log(`게임 ${rank}: ${title} - ${imgSrc}`);
      } catch (error) {
        console.error(`게임 ${index + 1} 추출 중 오류:`, error);
      }
    });

    return gameElements;
  });
}

export async function GET() {
  let browser;

  try {
    console.log("Puppeteer 브라우저 시작...");

    // Puppeteer 브라우저 실행
    browser = await puppeteer.launch({
      headless: true, // 새로운 헤드리스 모드 대신 boolean 값 사용
      devtools: true,
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

    console.log("Steam 차트 페이지 로딩 중...");

    // Steam 차트 페이지로 이동
    await page.goto("https://store.steampowered.com/charts/topselling/global", {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    console.log("페이지 로딩 완료, 데이터 추출 시작...");

    // 최대 3번까지 재시도
    let games: SteamGame[] = [];
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries && games.length === 0) {
      try {
        console.log(`크롤링 시도 ${retryCount + 1}/${maxRetries}`);

        // 페이지가 완전히 로드될 때까지 대기
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Steam 차트 데이터 추출
        games = await scrapeSteamGames(page);

        console.log(`총 ${games.length}개의 게임 데이터 추출 완료`);

        if (games.length === 0) {
          console.log("데이터가 추출되지 않음, 재시도 중...");
          retryCount++;

          if (retryCount < maxRetries) {
            // 페이지 새로고침 후 재시도
            await page.reload({ waitUntil: "networkidle2" });
            // waitForTimeout은 page 객체에 없으므로 대신 setTimeout 사용
            await new Promise((resolve) => setTimeout(resolve, 3000));
          }
        }
      } catch (error) {
        console.error(`크롤링 시도 ${retryCount + 1} 실패:`, error);
        retryCount++;

        if (retryCount < maxRetries) {
          console.log("페이지 새로고침 후 재시도...");
          await page.reload({ waitUntil: "networkidle2" });
          // waitForTimeout은 page 객체에 없으므로 setTimeout 사용
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }
    }

    // 모든 재시도 후에도 데이터가 없는 경우
    if (games.length === 0) {
      console.log("모든 재시도 후에도 데이터를 추출할 수 없음");
      return NextResponse.json(
        {
          success: false,
          error:
            "Steam 차트에서 데이터를 추출할 수 없습니다. 페이지 구조가 변경되었을 수 있습니다.",
          retryCount: retryCount,
          lastUpdated: new Date().toISOString(),
          source: "Steam Charts (Failed)",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: games,
      total: games.length,
      lastUpdated: new Date().toISOString(),
      source: "Steam Charts (Puppeteer)",
      scrapedCount: games.length,
      retryCount: retryCount,
    });
  } catch (error) {
    console.error("Steam 랭킹 크롤링 오류:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Steam 랭킹 데이터를 가져오는데 실패했습니다.",
        details: error instanceof Error ? error.message : "Unknown error",
        lastUpdated: new Date().toISOString(),
        source: "Steam Charts (Error)",
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
