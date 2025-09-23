import { NextResponse } from "next/server";
import { saveRankGameForPlatform } from "@/lib/supabase";
import puppeteer, { Browser, Page } from "puppeteer";

interface PsItem {
  rank: number;
  title: string;
  image: string;
  releaseDate: string;
}

const PAGE1_URL =
  "https://www.metacritic.com/browse/game/ps5/all/current-year/metascore/?platform=ps5&page=1";
const PAGE2_URL =
  "https://www.metacritic.com/browse/game/ps5/all/current-year/metascore/?platform=ps5&page=2";

async function waitForList(page: Page) {
  const selectors = [
    ".c-productListings",
    ".c-productListings_grid",
    ".c-finderProductCard",
    "h3.c-finderProductCard_titleHeading",
  ];
  for (const sel of selectors) {
    try {
      await page.waitForSelector(sel, { timeout: 10000 });
      return;
    } catch {}
  }
}

async function autoScrollToLoadAll(page: Page, minCount = 24, maxScrolls = 24) {
  let lastCount = 0;
  for (let i = 0; i < maxScrolls; i++) {
    const count = await page.evaluate(
      () =>
        document.querySelectorAll(
          ".c-productListings_grid .c-finderProductCard, .c-finderProductCard"
        ).length
    );
    if (count >= minCount) return;

    await page.evaluate(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "instant" as ScrollBehavior,
      });
    });
    await new Promise((r) => setTimeout(r, 700));

    const newCount = await page.evaluate(
      () =>
        document.querySelectorAll(
          ".c-productListings_grid .c-finderProductCard, .c-finderProductCard"
        ).length
    );
    if (newCount === lastCount) {
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
      );
      await new Promise((r) => setTimeout(r, 300));
      await page.evaluate(() =>
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "instant" as ScrollBehavior,
        })
      );
      await new Promise((r) => setTimeout(r, 500));
    }
    lastCount = newCount;
  }
}

function extractItems(): PsItem[] {
  const results: PsItem[] = [];
  function pickFromSrcset(srcset: string): string {
    if (!srcset) return "";
    const items = srcset.split(",").map((s) => s.trim());
    const last = items[items.length - 1];
    const candidate = (last || items[0] || "").split(" ")[0] || "";
    return candidate;
  }

  function normalizeUrl(u: string): string {
    if (!u) return "";
    if (u.startsWith("//")) return `https:${u}`;
    try {
      // document.baseURI 기준으로 절대 URL로 정규화 (상대경로/루트경로 모두 처리)
      return new URL(u, document.baseURI || location.href).toString();
    } catch {
      return u;
    }
  }

  // 모든 상품 리스트 컨테이너(상/하 2개)를 순회
  const grids = Array.from(
    document.querySelectorAll(".c-productListings_grid")
  );
  const cards: Element[] = grids.length
    ? grids.flatMap((g) =>
        Array.from(g.querySelectorAll(".c-finderProductCard"))
      )
    : Array.from(document.querySelectorAll(".c-finderProductCard"));

  for (const card of cards) {
    // rank
    const h3 = card.querySelector(
      "h3.c-finderProductCard_titleHeading"
    ) as HTMLElement | null;
    const firstSpan = h3?.querySelector(
      "span:first-child"
    ) as HTMLElement | null;
    const lastSpan = h3?.querySelector("span:last-child") as HTMLElement | null;

    let rank = 0;
    const rankRaw = firstSpan?.textContent?.trim() || ""; // e.g. "1."
    if (rankRaw) {
      const n = parseInt(rankRaw.replace(/\./g, "").trim(), 10);
      if (!isNaN(n)) rank = n;
    }
    // title
    const title =
      lastSpan?.textContent?.trim() ||
      h3?.textContent?.replace(/^[0-9]+\./, "").trim() ||
      "";
    if (!title) continue;

    // release date
    const meta = card.querySelector(
      ".c-finderProductCard_meta"
    ) as HTMLElement | null;
    const dateSpan = meta?.querySelector(
      ".u-text-uppercase"
    ) as HTMLElement | null;
    let releaseDate = dateSpan?.textContent?.trim() || "";
    if (!releaseDate) {
      const timeEl = meta?.querySelector("time") as HTMLElement | null;
      releaseDate =
        timeEl?.getAttribute("datetime") || timeEl?.textContent?.trim() || "";
    }

    // image: lazy-load, data-*, picture/source, srcset 모두 대응
    const bigImg = card.querySelector(
      ".c-finderProductCard_img img"
    ) as HTMLImageElement | null;
    const img = (bigImg ||
      card.querySelector("img")) as HTMLImageElement | null;
    const picture = card.querySelector("picture");

    let image = "";
    const dataSrc = img?.getAttribute("data-src") || "";
    const dataSrcset = img?.getAttribute("data-srcset") || "";
    // 여러 <source>의 srcset 중 가장 큰 해상도를 우선 선택
    const sourceSet = (() => {
      const list = Array.from(
        picture?.querySelectorAll("source") || []
      ) as HTMLSourceElement[];
      const candidates = list
        .map(
          (s) => s.getAttribute("srcset") || s.getAttribute("data-srcset") || ""
        )
        .filter(Boolean)
        .map((s) => pickFromSrcset(s))
        .filter(Boolean);
      return candidates[candidates.length - 1] || "";
    })();
    const src = img?.getAttribute("src") || "";
    const srcset = img?.getAttribute("srcset") || "";

    image =
      dataSrc ||
      pickFromSrcset(dataSrcset) ||
      pickFromSrcset(sourceSet) ||
      src ||
      pickFromSrcset(srcset) ||
      "";

    image = normalizeUrl(image);

    // 최후 보루: CSS background-image에서 추출
    if (!image) {
      const imgWrap = card.querySelector(
        ".c-finderProductCard_img, .c-finderProductCard_image"
      ) as HTMLElement | null;
      if (imgWrap) {
        const bg = getComputedStyle(imgWrap).backgroundImage || "";
        const match = /url\(["']?(.*?)["']?\)/.exec(bg);
        if (match && match[1]) {
          image = normalizeUrl(match[1]);
        }
      }
    }

    results.push({ rank, title, image, releaseDate });
  }

  return results
    .filter((x) => x.title)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 24);
}

export async function GET(req: Request) {
  let browser: Browser | null = null;
  try {
    const urlObj = new URL(req.url);
    const headlessParam = (
      urlObj.searchParams.get("headless") ||
      urlObj.searchParams.get("headline") ||
      "true"
    ).toLowerCase();
    const headless = !(headlessParam === "false" || headlessParam === "0");

    browser = await puppeteer.launch({
      headless,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );
    await page.setExtraHTTPHeaders({
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "accept-language": "en-US,en;q=0.9,ko-KR;q=0.8,ko;q=0.7",
      referer: "https://www.metacritic.com/",
      "upgrade-insecure-requests": "1",
    });
    await page.setViewport({ width: 1366, height: 900 });

    // 공통 크롤링 절차 함수
    const crawlOne = async (url: string) => {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
      await waitForList(page);
      await autoScrollToLoadAll(page, 24, 24);
      // 각 카드를 순차적으로 뷰포트에 노출시켜 lazy-load 이미지 로딩 유도
      await page.evaluate(async () => {
        const cards = Array.from(
          document.querySelectorAll(
            ".c-productListings_grid .c-finderProductCard, .c-finderProductCard"
          )
        );
        for (const el of cards) {
          (el as HTMLElement).scrollIntoView({ block: "center" });
          await new Promise((res) => setTimeout(res, 120));
        }
      });
      await new Promise((r) => setTimeout(r, 300));
      return (await page.evaluate(extractItems)) as PsItem[];
    };

    const items1 = await crawlOne(PAGE1_URL);
    const items2 = await crawlOne(PAGE2_URL);
    // 타이틀 기준 중복 제거
    const seen = new Set<string>();
    const all = [...items1, ...items2].filter((it) => {
      if (seen.has(it.title)) return false;
      seen.add(it.title);
      return true;
    });

    // Supabase 저장 (platform = playstation)
    const mapped = all.map((g) => ({
      rank_position: g.rank,
      title: g.title,
      subtitle: g.releaseDate,
      img_url: g.image,
    }));
    const saveResult = await saveRankGameForPlatform("playstation", mapped);

    return NextResponse.json({
      success: true,
      message: `총 ${all.length}개의 PlayStation 게임 순위를 성공적으로 업데이트했습니다.`,
      total: all.length,
      data: all,
      lastUpdated: new Date().toISOString(),
      source: "Metacritic PS5 (page=1..2)",
      saved: !saveResult.error,
      saveError: saveResult.error || null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    if (browser) await browser.close();
  }
}
