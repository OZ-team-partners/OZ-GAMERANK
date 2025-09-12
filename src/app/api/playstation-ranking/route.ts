import { NextResponse } from "next/server";
import puppeteer, { Browser, Page } from "puppeteer";

interface PsItem {
  rank: number;
  title: string;
  image: string;
  releaseDate: string;
}

const PAGE1_URL =
  "https://www.metacritic.com/browse/game/ps5/all/current-year/metascore/?platform=ps5&page=1";

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

    // image (prefer large)
    const bigImg = card.querySelector(
      ".c-finderProductCard_img img"
    ) as HTMLImageElement | null;
    const anyImg =
      bigImg || (card.querySelector("img") as HTMLImageElement | null);

    let image = "";
    if (anyImg) {
      image =
        anyImg.getAttribute("src") ||
        anyImg.getAttribute("data-src") ||
        (() => {
          const srcset =
            anyImg.getAttribute("srcset") ||
            anyImg.getAttribute("data-srcset") ||
            "";
          if (!srcset) return "";
          const first = srcset.split(",")[0]?.trim().split(" ")[0];
          return first || "";
        })();
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

    await page.goto(PAGE1_URL, { waitUntil: "networkidle2", timeout: 60000 });
    await waitForList(page);
    await autoScrollToLoadAll(page, 24, 24);
    await new Promise((r) => setTimeout(r, 300));

    const items = await page.evaluate(extractItems);

    return NextResponse.json({
      success: true,
      total: items.length,
      data: items,
      lastUpdated: new Date().toISOString(),
      source: "Metacritic PS5 (page=1)",
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
