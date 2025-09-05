import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

interface AndroidGame {
  id: number;
  title: string;
  subtitle: string;
  img: string;
  rank: number;
}

interface AndroidRankingResponse {
  success: boolean;
  data: AndroidGame[];
  total: number;
  lastUpdated: string;
  source?: string;
  error?: string;
}

export async function GET() {
  let chromeBrowser;

  try {
    // Puppeteer로 브라우저 실행
    chromeBrowser = await puppeteer.launch({
      browser: "chrome",
      protocol: "webDriverBiDi",
      headless: false,
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

    const page = await chromeBrowser.newPage();

    // User-Agent 설정
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    // 페이지 로드
    await page.goto(
      "https://www.similarweb.com/top-apps/google/korea-republic-of/games/top-paid/",
      {
        waitUntil: "networkidle2",
        timeout: 30000,
      }
    );

    // 페이지가 완전히 로드될 때까지 대기
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // 게임 데이터 추출
    const games = await page.evaluate(() => {
      console.log("페이지 로드 완료, DOM 구조 확인 중...");

      // tbody 안의 tr 요소들을 찾기
      const gameElements = document.querySelectorAll("tbody tr");
      console.log("tbody tr 요소 개수:", gameElements.length);

      const games: Array<{
        id: number;
        title: string;
        subtitle: string;
        img: string;
        rank: number;
      }> = [];

      gameElements.forEach((element, index) => {
        if (index >= 30) return; // 최대 30개로 제한

        try {
          // 순위 추출 - td.top-table__column--position에서 순위 추출
          let rank = index + 1;
          const rankElement = element.querySelector(
            "td.top-table__column--position .ta-table__position"
          );
          if (rankElement) {
            const rankText = rankElement.textContent?.trim();
            const rankMatch = rankText?.match(/(\d+)/);
            if (rankMatch) {
              rank = parseInt(rankMatch[1]);
            }
          }

          // 제목과 부제목 추출 - td.top-table__column--app에서 추출
          let title = `게임 ${index + 1}`;
          let subtitle = "알 수 없음";

          const appCell = element.querySelector("td.top-table__column--app");
          if (appCell) {
            // 제목 추출
            const titleElement = appCell.querySelector(".ta-table__name");
            if (titleElement) {
              title = titleElement.textContent?.trim() || title;
            }

            // 부제목(개발사) 추출
            const publisherElement = appCell.querySelector(
              ".ta-table__publisher"
            );
            if (publisherElement) {
              subtitle = publisherElement.textContent?.trim() || subtitle;
            }
          }

          // 이미지 추출 - app-favicon img에서 추출
          let img = "/icon/rank_icon/mobile2.jpeg"; // Android 기본 이미지
          const imgElement = element.querySelector(
            ".app-favicon img"
          ) as HTMLImageElement;
          if (imgElement && imgElement.src) {
            img = imgElement.src;
          }

          // 디버깅 로그 (처음 5개만)
          if (index < 5) {
            console.log(`게임 ${index + 1}:`, {
              rank,
              title,
              subtitle,
              img: img.substring(0, 50) + "...",
              hasRankElement: !!rankElement,
              hasAppCell: !!appCell,
              hasImgElement: !!imgElement,
            });
          }

          // 유효한 데이터만 추가
          if (title !== `게임 ${index + 1}` || subtitle !== "알 수 없음") {
            games.push({
              id: index + 1,
              title,
              subtitle,
              img,
              rank,
            });
          }
        } catch (error) {
          console.error(`게임 ${index + 1} 파싱 오류:`, error);
        }
      });

      console.log("최종 추출된 게임 개수:", games.length);
      return games;
    });

    await chromeBrowser.close();

    const result: AndroidRankingResponse = {
      success: true,
      data: games,
      total: games.length,
      lastUpdated: new Date().toISOString(),
      source:
        "https://www.similarweb.com/top-apps/google/korea-republic-of/games/top-paid/",
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Android 랭킹 크롤링 실패:", error);

    // 브라우저가 열려있다면 닫기
    if (chromeBrowser) {
      await chromeBrowser.close();
    }

    const result: AndroidRankingResponse = {
      success: false,
      data: [],
      total: 0,
      lastUpdated: new Date().toISOString(),
      error:
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.",
    };

    return NextResponse.json(result, { status: 500 });
  }
}
