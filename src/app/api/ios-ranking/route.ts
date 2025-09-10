import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { saveRankGameForPlatform } from "@/lib/supabase";

interface IOSGame {
  id: number;
  title: string;
  subtitle: string;
  img: string;
  rank: number;
}

interface IOSRankingResponse {
  success: boolean;
  data: IOSGame[];
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
      protocol: "webDriverBiDi", // CDP would be used by default for Chrome.
      headless: true,
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
      "https://apps.apple.com/kr/charts/iphone/top-paid-games/6014",
      {
        waitUntil: "networkidle2",
        timeout: 30000,
      }
    );

    // 페이지가 완전히 로드될 때까지 대기
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 게임 데이터 추출
    const games = await page.evaluate(() => {
      const gameElements = document.querySelectorAll(".we-lockup");
      const games: Array<{
        id: number;
        title: string;
        subtitle: string;
        img: string;
        rank: number;
      }> = [];

      gameElements.forEach((element, index) => {
        if (index >= 99) return; // 최대 99개로 제한

        try {
          // 순위 추출
          const rankElement = element.querySelector(".we-lockup__rank");
          const rank = rankElement
            ? parseInt(rankElement.textContent?.trim() || "0")
            : index + 1;

          // 제목 추출
          const titleElement = element.querySelector(".we-clamp--visual");
          const title =
            titleElement?.textContent?.trim() || `게임 ${index + 1}`;

          // 부제목(개발사) 추출
          const subtitleElement = element.querySelector(".we-lockup__subtitle");
          const subtitle = subtitleElement?.textContent?.trim() || "알 수 없음";

          // 이미지 추출 - picture 태그의 source에서 첫 번째 이미지 URL 추출
          const pictureElement = element.querySelector("picture");
          let img = "/icon/rank_icon/mobile1.jpeg"; // 기본값

          if (pictureElement) {
            // source 태그에서 srcset 추출
            const sourceElement = pictureElement.querySelector("source");
            if (sourceElement && sourceElement.srcset) {
              // srcset에서 첫 번째 URL 추출 (320w 크기)
              const srcset = sourceElement.srcset;
              const urlMatch = srcset.match(/(https:\/\/[^\s]+)/);
              if (urlMatch) {
                img = urlMatch[1];
              }
            }

            // source에서 찾지 못한 경우 img 태그의 src 사용
            if (img === "/icon/rank_icon/mobile1.jpeg") {
              const imgElement = pictureElement.querySelector(
                "img"
              ) as HTMLImageElement;
              if (imgElement && imgElement.src) {
                img = imgElement.src;
                // 상대 경로를 절대 경로로 변환
                if (img.startsWith("/assets/")) {
                  img = "https://apps.apple.com" + img;
                }
              }
            }
          }

          games.push({
            id: index + 1,
            title,
            subtitle,
            img,
            rank,
          });
        } catch (error) {
          console.error(`게임 ${index + 1} 파싱 오류:`, error);
        }
      });

      return games;
    });

    await chromeBrowser.close();

    // DB 저장
    const payload = games.map((g) => ({
      rank_position: g.rank,
      title: g.title,
      subtitle: g.subtitle,
      img_url: g.img,
    }));
    const save = await saveRankGameForPlatform("ios", payload);
    if (save.error) {
      return NextResponse.json(
        {
          success: false,
          data: games,
          total: games.length,
          lastUpdated: new Date().toISOString(),
          source: "https://apps.apple.com/kr/charts/iphone/top-paid-games/6014",
          error: save.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: games,
      total: games.length,
      lastUpdated: new Date().toISOString(),
      source: "https://apps.apple.com/kr/charts/iphone/top-paid-games/6014",
      savedToDatabase: true,
    });
  } catch (error) {
    console.error("iOS 랭킹 크롤링 실패:", error);

    // 브라우저가 열려있다면 닫기
    if (chromeBrowser) {
      await chromeBrowser.close();
    }

    const result: IOSRankingResponse = {
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
