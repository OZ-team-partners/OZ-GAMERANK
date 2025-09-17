import { NextResponse } from "next/server";
import puppeteer, { Browser, Page, HTTPRequest } from "puppeteer";
import { nintendoRankingApi } from "@/lib/supabase";

interface NintendoGame {
  id: number;
  title: string;
  subtitle: string;
  img: string;
  rank: number;
  developer: string;
}

// 대기 시간을 위한 헬퍼 함수
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 닌텐도 Switch 랭킹 크롤링 함수
async function scrapeNintendoGames(page: Page): Promise<NintendoGame[]> {
  return await page.evaluate(() => {
    const gameElements: NintendoGame[] = [];

    // data-rank 속성을 가진 게임 카드들을 찾기
    const gameCards = document.querySelectorAll("div[data-rank]");
    console.log(`게임 카드 개수: ${gameCards.length}개`);

    // 각 게임 카드에서 정보 추출
    gameCards.forEach((card) => {
      try {
        // data-rank 속성에서 순위 추출
        const rankAttr = card.getAttribute("data-rank");
        if (!rankAttr) return;

        const rank = parseInt(rankAttr);
        if (rank < 1 || rank > 30) return; // 1~30위만 처리

        // 게임 제목 추출 - tit 클래스를 가진 p 태그
        const titleElement = card.querySelector("p.tit");
        const title =
          titleElement?.textContent?.trim() || `닌텐도 게임 ${rank}위`;

        // 제조사 정보 추출 - releaseInfo 클래스를 가진 p 태그
        const developerElement = card.querySelector("p.releaseInfo");
        const developer =
          developerElement?.textContent?.trim() || "개발사 정보 없음";

        // 이미지 URL 추출 - 순위에 따라 직접 URL 생성
        let imgSrc = "";

        // 1~30위까지 순위별 이미지 URL 생성
        if (rank >= 1 && rank <= 30) {
          const rankNumber = rank < 10 ? `0${rank}` : `${rank}`; // 01, 02, 03... 형태로 변환
          imgSrc = `https://www.nintendo.com/kr/switch/ranking/img/ranking_2025_1st/${rankNumber}.jpg`;
        } else {
          // 기본 이미지 설정
          imgSrc = `/icon/rank_icon/console${(rank % 3) + 1}.jpeg`;
        }

        console.log(`게임 ${rank}위 이미지 URL: ${imgSrc}`); // 디버깅용

        // 부제목 생성
        const subtitle = developer;

        gameElements.push({
          id: rank,
          title: title,
          subtitle: subtitle,
          img: imgSrc,
          rank: rank,
          developer: developer,
        });

        console.log(`게임 ${rank}: ${title} - ${developer} - ${imgSrc}`);
      } catch (error) {
        console.error(`게임 카드 처리 중 오류:`, error);
      }
    });

    // 만약 data-rank로 데이터를 찾지 못했다면, 다른 방법 시도
    if (gameElements.length === 0) {
      console.log("data-rank로 데이터를 찾지 못함, 다른 방법 시도...");

      // nc3-c-softCard 클래스를 가진 요소들 찾기
      const softCards = document.querySelectorAll(".nc3-c-softCard");
      console.log(`소프트 카드 개수: ${softCards.length}개`);

      softCards.forEach((card, index) => {
        try {
          const rank = index + 1;
          if (rank > 30) return; // 30위까지만 처리

          // 게임 제목 추출
          const titleElement = card.querySelector("p.tit");
          const title =
            titleElement?.textContent?.trim() || `닌텐도 게임 ${rank}위`;

          // 제조사 정보 추출
          const developerElement = card.querySelector("p.releaseInfo");
          const developer =
            developerElement?.textContent?.trim() || "개발사 정보 없음";

          // 이미지 URL 추출
          const imgElement = card.querySelector('img[src*="ranking_2025_1st"]');
          let imgSrc = "";

          if (imgElement) {
            const src = imgElement.getAttribute("src");
            if (src) {
              if (src.startsWith("../../")) {
                imgSrc = `https://www.nintendo.com/kr/switch/ranking/${src.replace(
                  "../../",
                  ""
                )}`;
              } else if (src.startsWith("/")) {
                imgSrc = `https://www.nintendo.com${src}`;
              } else if (src.startsWith("http")) {
                imgSrc = src;
              } else {
                imgSrc = `https://www.nintendo.com/kr/switch/ranking/${src}`;
              }
            }
          }

          // 기본 이미지 설정
          if (!imgSrc || !imgSrc.startsWith("http")) {
            imgSrc = `/icon/rank_icon/console${(rank % 3) + 1}.jpeg`;
          }

          const subtitle = developer;

          gameElements.push({
            id: rank,
            title: title,
            subtitle: subtitle,
            img: imgSrc,
            rank: rank,
            developer: developer,
          });

          console.log(`게임 ${rank}: ${title} - ${developer}`);
        } catch (error) {
          console.error(`소프트 카드 ${index + 1} 처리 중 오류:`, error);
        }
      });
    }

    // 만약 위의 방법으로 데이터를 찾지 못했다면, 텍스트 기반으로 추출
    if (gameElements.length === 0) {
      console.log("DOM 요소로 데이터를 찾지 못함, 텍스트 기반 추출 시도...");

      // 페이지의 모든 텍스트 내용 가져오기
      const textContent = document.body.textContent || "";
      const lines = textContent
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      let currentRank = 0;
      let currentTitle = "";
      let currentDeveloper = "";

      lines.forEach((line) => {
        // 순위 패턴 찾기 (숫자. 형태)
        const rankMatch = line.match(/^(\d+)\.\s*(.+)$/);
        if (rankMatch) {
          currentRank = parseInt(rankMatch[1]);
          currentTitle = rankMatch[2].trim();
        }
        // 개발사 정보 찾기 (한국닌텐도, CAPCOM 등)
        else if (
          line.includes("한국닌텐도") ||
          line.includes("CAPCOM") ||
          line.includes("EA") ||
          line.includes("WB Games") ||
          line.includes("Ubisoft") ||
          line.includes("Team17") ||
          line.includes("반다이남코") ||
          line.includes("SEGA") ||
          line.includes("NEXON") ||
          line.includes("Blizzard") ||
          line.includes("MLBAM") ||
          line.includes("Sunblink") ||
          line.includes("LEVEL5")
        ) {
          currentDeveloper = line.trim();

          // 게임 정보가 완성되면 추가
          if (currentRank > 0 && currentTitle && currentDeveloper) {
            const imgSrc = `/icon/rank_icon/console${
              (currentRank % 3) + 1
            }.jpeg`;

            gameElements.push({
              id: currentRank,
              title: currentTitle,
              subtitle: currentDeveloper,
              img: imgSrc,
              rank: currentRank,
              developer: currentDeveloper,
            });

            // 변수 초기화
            currentRank = 0;
            currentTitle = "";
            currentDeveloper = "";
          }
        }
      });
    }

    console.log("최종 추출된 게임 수:", gameElements.length);
    return gameElements;
  });
}

export async function GET() {
  let browser: Browser | null = null;
  let page: Page | null = null;

  try {
    console.log("=== 닌텐도 랭킹 크롤링 시작 ===");
    console.log("Puppeteer 브라우저 시작...");

    // Puppeteer 브라우저 실행
    browser = await puppeteer.launch({
      headless: true, // 디버깅을 위해 브라우저 표시
      devtools: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-renderer-backgrounding",
        "--disable-features=TranslateUI",
        "--disable-ipc-flooding-protection",
        "--memory-pressure-off",
        "--max_old_space_size=4096",
      ],
    });

    console.log("브라우저 시작 완료");

    page = await browser.newPage();
    console.log("새 페이지 생성 완료");

    // 메모리 사용량 최적화를 위한 설정
    await page.setCacheEnabled(false);
    await page.setRequestInterception(true);

    // 리소스 차단 설정 - CSS와 이미지는 허용
    page.on("request", (req: HTTPRequest) => {
      const resourceType = req.resourceType();

      // 폰트만 차단
      if (resourceType === "font") {
        req.abort();
      } else {
        req.continue();
      }
    });

    // User-Agent 설정
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // 뷰포트 설정
    await page.setViewport({ width: 1920, height: 1080 });

    console.log("닌텐도 Switch 랭킹 페이지 로딩 중...");

    // 닌텐도 Switch 랭킹 페이지로 이동
    await page.goto(
      "https://www.nintendo.com/kr/switch/ranking/ranking_2025_1st.html",
      {
        waitUntil: "domcontentloaded", // networkidle0 대신 domcontentloaded 사용
        timeout: 60000, // 타임아웃을 60초로 증가
      }
    );

    console.log("페이지 로딩 완료");

    // 페이지가 완전히 로드될 때까지 추가 대기
    await delay(5000);

    console.log("페이지 로딩 완료, 데이터 추출 시작...");

    // 최대 3번까지 재시도
    let games: NintendoGame[] = [];
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries && games.length === 0) {
      try {
        console.log(`크롤링 시도 ${retryCount + 1}/${maxRetries}`);

        // 페이지가 완전히 로드될 때까지 대기
        await delay(3000);

        // 닌텐도 Switch 랭킹 데이터 추출
        games = await scrapeNintendoGames(page);

        console.log(`총 ${games.length}개의 게임 데이터 추출 완료`);

        if (games.length === 0) {
          console.log("데이터가 추출되지 않음, 재시도 중...");
          retryCount++;

          if (retryCount < maxRetries) {
            // 페이지 새로고침 후 재시도
            await page.reload({
              waitUntil: "domcontentloaded",
              timeout: 60000,
            });
            await delay(5000);
          }
        }
      } catch (error) {
        console.error(`크롤링 시도 ${retryCount + 1} 실패:`, error);
        retryCount++;

        if (retryCount < maxRetries) {
          console.log("페이지 새로고침 후 재시도...");
          try {
            await page.reload({
              waitUntil: "domcontentloaded",
              timeout: 60000,
            });
            await delay(5000);
          } catch (reloadError) {
            console.error("페이지 새로고침 실패:", reloadError);
          }
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
            "닌텐도 Switch 랭킹에서 데이터를 추출할 수 없습니다. 페이지 구조가 변경되었을 수 있습니다.",
          retryCount: retryCount,
          lastUpdated: new Date().toISOString(),
          source: "닌텐도 Switch 랭킹 (Failed)",
        },
        { status: 500 }
      );
    }

    console.log("=== 크롤링 성공 ===");

    // Supabase에 데이터 저장
    console.log("Supabase에 데이터 저장 중...");
    const rankingData = games.map((game) => ({
      rank_position: game.rank,
      title: game.title,
      subtitle: game.subtitle || game.developer || "",
      img_url: game.img,
      developer: game.developer,
    }));

    const saveResult = await nintendoRankingApi.saveRankingData(rankingData);

    if (saveResult.error) {
      console.error("데이터 저장 실패:", saveResult.error);
      return NextResponse.json(
        {
          success: false,
          error: "데이터 저장에 실패했습니다.",
          details: saveResult.error,
          scrapedData: games,
          lastUpdated: new Date().toISOString(),
          source: "닌텐도 Switch 랭킹 (Save Failed)",
        },
        { status: 500 }
      );
    }

    console.log("=== 데이터 저장 완료 ===");
    return NextResponse.json({
      success: true,
      message: `총 ${games.length}개의 Nintendo 게임 순위를 성공적으로 업데이트했습니다.`,
      data: games,
      total: games.length,
      lastUpdated: new Date().toISOString(),
      source: "닌텐도 Switch 랭킹 (Puppeteer + Supabase)",
      scrapedCount: games.length,
      retryCount: retryCount,
      savedToDatabase: true,
    });
  } catch (error) {
    console.error("=== 닌텐도 Switch 랭킹 크롤링 오류 ===");
    console.error("오류 상세:", error);

    return NextResponse.json(
      {
        success: false,
        error: "닌텐도 Switch 랭킹 데이터를 가져오는데 실패했습니다.",
        details: error instanceof Error ? error.message : "Unknown error",
        lastUpdated: new Date().toISOString(),
        source: "닌텐도 Switch 랭킹 (Error)",
      },
      { status: 500 }
    );
  } finally {
    console.log("=== 리소스 정리 시작 ===");
    // 메모리 정리
    try {
      if (page) {
        await page.close();
        console.log("페이지 종료 완료");
      }
    } catch (error) {
      console.error("페이지 종료 중 오류:", error);
    }

    try {
      if (browser) {
        await browser.close();
        console.log("브라우저 종료 완료");
      }
    } catch (error) {
      console.error("브라우저 종료 중 오류:", error);
    }

    // 가비지 컬렉션 강제 실행
    if (global.gc) {
      global.gc();
      console.log("가비지 컬렉션 완료");
    }

    console.log("=== 리소스 정리 완료 ===");
  }
}
