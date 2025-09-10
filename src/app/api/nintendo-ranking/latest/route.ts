import { NextResponse } from "next/server";
import { nintendoRankingApi } from "@/lib/supabase";

export async function GET() {
  try {
    console.log("=== 닌텐도 랭킹 데이터 조회 시작 ===");

    // 데이터베이스에서 최신 랭킹 데이터 조회
    const result = await nintendoRankingApi.getLatestRanking();

    if (result.error) {
      console.error("닌텐도 랭킹 데이터 조회 실패:", result.error);
      return NextResponse.json(
        {
          success: false,
          error: "닌텐도 랭킹 데이터를 조회할 수 없습니다.",
          details: result.error,
          lastUpdated: new Date().toISOString(),
          source: "닌텐도 Switch 랭킹 (Database Query Failed)",
        },
        { status: 500 }
      );
    }

    console.log(
      `=== 데이터베이스에서 ${result.data.length}개 게임 조회 완료 ===`
    );

    return NextResponse.json({
      success: true,
      data: result.data,
      total: result.data.length,
      lastUpdated: new Date().toISOString(),
      source: "닌텐도 Switch 랭킹 (Database)",
      platform: "nintendo",
    });
  } catch (error) {
    console.error("=== 닌텐도 랭킹 데이터 조회 오류 ===");
    console.error("오류 상세:", error);

    return NextResponse.json(
      {
        success: false,
        error: "닌텐도 랭킹 데이터를 조회하는데 실패했습니다.",
        details: error instanceof Error ? error.message : "Unknown error",
        lastUpdated: new Date().toISOString(),
        source: "닌텐도 Switch 랭킹 (Error)",
      },
      { status: 500 }
    );
  }
}
