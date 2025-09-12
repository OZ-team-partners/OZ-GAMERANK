import { NextResponse } from "next/server";
import puppeteer, { Page } from "puppeteer";
import { saveRankGameForPlatform } from "@/lib/supabase";

interface PlayStationGame {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  rank: number;
  price?: string;
  developer?: string;
}

// 대기 함수 (waitForTimeout 대신 사용)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// PlayStation Store 크롤링 함수
async function scrapePlayStationGames(page: Page): Promise<PlayStationGame[]> {
  return await page.evaluate(() => {
    const gameElements: PlayStationGame[] = [];

    // 정확한 셀렉터로 게임 카드들 선택
    const gameCards = document.querySelectorAll(
      'a[data-qa=""][data-track="web:store:concept-tile"]'
    );

    console.log(`게임 카드 개수: ${gameCards.length}개`);

    // 각 게임 카드에서 정보 추출
    gameCards.forEach((card, index) => {
      if (index >= 100) return; // 최대 100개만 처리

      try {
        // 게임 제목 추출 (정확한 셀렉터 사용)
        const titleElement = card.querySelector(
          '#product-name, [data-qa="ems-sdk-grid#productTile0#product-name"]'
        );
        const title =
          titleElement?.textContent?.trim() || `PlayStation Game ${index + 1}`;

        // 이미지 URL 추출
        const imageElement = card.querySelector("img");
        let imgSrc = "";

        if (imageElement) {
          imgSrc =
            imageElement.getAttribute("src") ||
            imageElement.getAttribute("data-src") ||
            imageElement.getAttribute("data-lazy") ||
            imageElement.getAttribute("data-original") ||
            "";
        }

        // 기본 이미지 설정
        if (!imgSrc || !imgSrc.startsWith("http")) {
          imgSrc = `/icon/rank_icon/console game${(index % 3) + 1}.jpeg`;
        }

        // 가격 정보 추출 (data-telemetry-meta에서 추출)
        const telemetryMeta = card.getAttribute("data-telemetry-meta");
        let price = "";
        if (telemetryMeta) {
          try {
            const meta = JSON.parse(telemetryMeta);
            price = meta.price || "";
          } catch (e) {
            console.log("가격 정보 파싱 실패:", e);
          }
        }

        // 가격이 없으면 다른 방법으로 시도
        if (!price) {
          const priceElement = card.querySelector(
            '[class*="price"], [class*="cost"], [class*="amount"]'
          );
          price = priceElement?.textContent?.trim() || "";
        }

        // 개발사 정보 추출 (가능한 경우)
        const developerElement = card.querySelector(
          '[class*="developer"], [class*="publisher"], [class*="studio"]'
        );
        const developer = developerElement?.textContent?.trim() || "";

        // 부제목 생성
        let subtitle = `PlayStation Store 베스트셀러 ${index + 1}위`;
        if (price) {
          subtitle += ` | ${price}`;
        }
        if (developer) {
          subtitle += ` | 개발사: ${developer}`;
        }

        gameElements.push({
          id: (index + 1).toString(),
          title: title,
          subtitle: subtitle,
          img: imgSrc,
          rank: index + 1,
          price: price,
          developer: developer,
        });

        console.log(`게임 ${index + 1}: ${title} - ${price} - ${imgSrc}`);
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
        "--disable-web-security",
        "--disable-features=VizDisplayCompositor",
        "--disable-blink-features=AutomationControlled",
        "--disable-extensions",
        "--disable-plugins",
      ],
    });

    const page = await browser.newPage();

    // User-Agent 설정
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // 뷰포트 설정
    await page.setViewport({ width: 1920, height: 1080 });

    // 추가 헤더 설정
    await page.setExtraHTTPHeaders({
      "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    });

    console.log("PlayStation Store 페이지 로딩 중...");

    // PlayStation Store 페이지로 이동
    await page.goto(
      "https://store.playstation.com/ko-kr/category/d0446d4b-dc9a-4f1e-86ec-651f099c9b29/1",
      {
        waitUntil: "networkidle2",
        timeout: 30000,
      }
    );

    console.log("페이지 로딩 완료, 필터 설정 시작...");

    // 페이지 로딩 대기
    await delay(5000);

    // 1단계: 정렬 및 필터 버튼 클릭 - 더 안정적인 방법
    let filterButtonClicked = false;
    try {
      // 여러 가능한 셀렉터를 시도
      const sortFilterSelectors = [
        'button[data-qa="ems-sdk-grid-sort-filter-btn-mobile"]',
        "button.ems-sdk-grid-sort-filter-tablet-margin",
        'button[aria-label="정렬 및 필터 옵션"]',
        'button[aria-label*="정렬"]',
        'button[aria-label*="필터"]',
        "button.psw-button.psw-secondary-button",
        "button:has(.psw-icon--sort-filter)",
        "button:has(.ems-sdk-grid-sort-filter-icon)",
        // 클래스 기반 셀렉터
        ".ems-sdk-grid-sort-filter-tablet-margin",
        ".psw-button.psw-secondary-button",
        // 더 구체적인 셀렉터
        "button.ems-sdk-grid-sort-filter-tablet-margin.psw-m-r-4.psw-button",
      ];

      for (const selector of sortFilterSelectors) {
        try {
          console.log(`정렬 버튼 셀렉터 시도: ${selector}`);

          // 요소가 존재하는지 확인
          const element = await page.$(selector);
          if (element) {
            // 요소가 보이는지 확인
            const isVisible = await element.isIntersectingViewport();
            const isEnabled = await element.isEnabled();

            console.log(
              `요소 발견: ${selector}, 보임: ${isVisible}, 활성화: ${isEnabled}`
            );

            if (isVisible && isEnabled) {
              // JavaScript로 클릭 시도
              await page.evaluate((sel) => {
                const btn = document.querySelector(sel);
                if (btn) {
                  btn.click();
                  console.log(`JavaScript로 클릭 성공: ${sel}`);
                }
              }, selector);

              console.log(`✅ 정렬 및 필터 버튼 클릭 완료: ${selector}`);
              await delay(3000);
              filterButtonClicked = true;
              break;
            } else {
              // 스크롤해서 요소를 보이게 한 후 클릭 시도
              await page.evaluate((sel) => {
                const btn = document.querySelector(sel);
                if (btn) {
                  btn.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }, selector);

              await delay(1000);

              const elementAfterScroll = await page.$(selector);
              if (elementAfterScroll) {
                await elementAfterScroll.click();
                console.log(`✅ 스크롤 후 정렬 버튼 클릭 성공: ${selector}`);
                await delay(3000);
                filterButtonClicked = true;
                break;
              }
            }
          }
        } catch (e) {
          console.log(`셀렉터 실패: ${selector} - ${e}`);
          continue;
        }
      }

      if (!filterButtonClicked) {
        console.log(
          "❌ 정렬 및 필터 버튼을 찾을 수 없음, 직접 데이터 추출 시도..."
        );

        // 디버깅을 위해 페이지의 모든 버튼 확인
        const allButtons = await page.$$("button");
        console.log(`페이지에서 발견된 버튼 개수: ${allButtons.length}`);

        for (let i = 0; i < Math.min(allButtons.length, 10); i++) {
          const button = allButtons[i];
          const ariaLabel = await button.getAttribute("aria-label");
          const className = await button.getAttribute("class");
          const dataQa = await button.getAttribute("data-qa");
          console.log(
            `버튼 ${i}: aria-label="${ariaLabel}", class="${className}", data-qa="${dataQa}"`
          );
        }
      }
    } catch (error) {
      console.log("정렬 및 필터 버튼 클릭 실패:", error);
    }

    // 2단계: "베스트셀러" 라디오 버튼 클릭 (필터 버튼이 클릭된 경우에만)
    if (filterButtonClicked) {
      try {
        // 제공해주신 HTML 구조에 맞는 정확한 셀렉터들
        const bestsellerSelectors = [
          // input 요소 직접 클릭
          'input[value="sales30:false"]',
          'input[name="sorter"][value="sales30:false"]',
          'input[type="radio"][value="sales30:false"]',
          'input[data-telemetry-meta*="sales30"]',
          // label 요소 클릭 (더 안정적)
          'label:has(input[value="sales30:false"])',
          'label:has-text("베스트셀러")',
          'label[for*="input-"]:has(input[value="sales30:false"])',
          // 클래스 기반 셀렉터
          'label.psw-radio:has(input[value="sales30:false"])',
          'label:has(.psw-radio-label:has-text("베스트셀러"))',
          // 더 구체적인 셀렉터
          'label.psw-radio.psw-text-list-radio:has(input[value="sales30:false"])',
        ];

        let bestsellerClicked = false;
        for (const selector of bestsellerSelectors) {
          try {
            console.log(`베스트셀러 셀렉터 시도: ${selector}`);
            const element = await page.$(selector);
            if (element) {
              // 요소가 보이는지 확인
              const isVisible = await element.isIntersectingViewport();
              if (isVisible) {
                await element.click();
                console.log(`✅ 베스트셀러 옵션 선택 완료: ${selector}`);
                await delay(3000);
                bestsellerClicked = true;
                break;
              } else {
                console.log(`요소가 보이지 않음: ${selector}`);
              }
            }
          } catch (e) {
            console.log(`셀렉터 실패: ${selector} - ${e}`);
            continue;
          }
        }

        if (!bestsellerClicked) {
          console.log(
            "❌ 베스트셀러 옵션을 찾을 수 없음, 직접 데이터 추출 시도..."
          );

          // 디버깅을 위해 페이지의 모든 라디오 버튼 확인
          const allRadios = await page.$$('input[type="radio"]');
          console.log(
            `페이지에서 발견된 라디오 버튼 개수: ${allRadios.length}`
          );

          for (let i = 0; i < allRadios.length; i++) {
            const radio = allRadios[i];
            const value = await radio.getAttribute("value");
            const name = await radio.getAttribute("name");
            console.log(`라디오 버튼 ${i}: name="${name}", value="${value}"`);
          }
        }
      } catch (error) {
        console.log("베스트셀러 옵션 선택 실패:", error);
      }
    }

    console.log("필터 설정 완료, 데이터 추출 시작...");

    // 최대 3번까지 재시도
    let games: PlayStationGame[] = [];
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries && games.length === 0) {
      try {
        console.log(`크롤링 시도 ${retryCount + 1}/${maxRetries}`);

        // 페이지가 완전히 로드될 때까지 대기
        await delay(3000);

        // PlayStation Store 데이터 추출
        games = await scrapePlayStationGames(page);

        console.log(`총 ${games.length}개의 게임 데이터 추출 완료`);

        if (games.length === 0) {
          console.log("데이터가 추출되지 않음, 재시도 중...");
          retryCount++;

          if (retryCount < maxRetries) {
            // 페이지 새로고침 후 재시도
            await page.reload({ waitUntil: "networkidle2" });
            await delay(3000);
          }
        }
      } catch (error) {
        console.error(`크롤링 시도 ${retryCount + 1} 실패:`, error);
        retryCount++;

        if (retryCount < maxRetries) {
          console.log("페이지 새로고침 후 재시도...");
          await page.reload({ waitUntil: "networkidle2" });
          await delay(3000);
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
            "PlayStation Store에서 데이터를 추출할 수 없습니다. 페이지 구조가 변경되었을 수 있습니다.",
          retryCount: retryCount,
          lastUpdated: new Date().toISOString(),
          source: "PlayStation Store (Failed)",
        },
        { status: 500 }
      );
    }

    // DB 저장
    const payload = games.map((g) => ({
      rank_position: g.rank,
      title: g.title,
      subtitle: g.subtitle,
      img_url: g.img,
      developer: g.developer,
    }));

    const save = await saveRankGameForPlatform("playstation", payload);
    if (save.error) {
      return NextResponse.json(
        {
          success: false,
          data: games,
          total: games.length,
          lastUpdated: new Date().toISOString(),
          source: "PlayStation Store (Puppeteer)",
          scrapedCount: games.length,
          retryCount: retryCount,
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
      source: "PlayStation Store (Puppeteer)",
      scrapedCount: games.length,
      retryCount: retryCount,
      savedToDatabase: true,
    });
  } catch (error) {
    console.error("PlayStation Store 랭킹 크롤링 오류:", error);

    return NextResponse.json(
      {
        success: false,
        error: "PlayStation Store 랭킹 데이터를 가져오는데 실패했습니다.",
        details: error instanceof Error ? error.message : "Unknown error",
        lastUpdated: new Date().toISOString(),
        source: "PlayStation Store (Error)",
      },
      { status: 500 }
    );
  } finally {
    // 브라우저 종료
    if (browser) {
      try {
        await browser.close();
        console.log("Puppeteer 브라우저 종료");
      } catch (error) {
        console.error("브라우저 종료 중 오류:", error);
      }
    }
  }
}
