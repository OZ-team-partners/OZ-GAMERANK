import { NextResponse } from "next/server";
import { nintendoRankingApi } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    console.log("=== 닌텐도 랭킹 히스토리 조회 시작 ===");

    // URL에서 쿼리 파라미터 추출
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "7");

    // 데이터베이스에서 랭킹 히스토리 조회
    const result = await nintendoRankingApi.getRankingHistory(days);

    if (result.error) {
      console.error("닌텐도 랭킹 히스토리 조회 실패:", result.error);
      return NextResponse.json(
        {
          success: false,
          error: "닌텐도 랭킹 히스토리를 조회할 수 없습니다.",
          details: result.error,
          lastUpdated: new Date().toISOString(),
          source: "닌텐도 Switch 랭킹 히스토리 (Database Query Failed)",
        },
        { status: 500 }
      );
    }

    console.log(
      `=== 데이터베이스에서 ${result.data.length}개 히스토리 데이터 조회 완료 ===`
    );

    return NextResponse.json({
      success: true,
      data: result.data,
      total: result.data.length,
      days: days,
      lastUpdated: new Date().toISOString(),
      source: "닌텐도 Switch 랭킹 히스토리 (Database)",
      platform: "nintendo",
    });
  } catch (error) {
    console.error("=== 닌텐도 랭킹 히스토리 조회 오류 ===");
    console.error("오류 상세:", error);

    return NextResponse.json(
      {
        success: false,
        error: "닌텐도 랭킹 히스토리를 조회하는데 실패했습니다.",
        details: error instanceof Error ? error.message : "Unknown error",
        lastUpdated: new Date().toISOString(),
        source: "닌텐도 Switch 랭킹 히스토리 (Error)",
      },
      { status: 500 }
    );
  }
}
