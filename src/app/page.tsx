"use client";

import { useEffect } from "react";
import { supabase } from "@/shared/lib/supabase";
import FrontRankTop3 from "./rank/front_rank_top3";
import MainSlider from "./home/components/MainSlider";
import SmallCardsGrid from "./home/components/SmallCardsGrid";
import HotIssueSection from "./home/components/HotIssueSection";

export default function Home() {
  // Supabase 연결 테스트
  useEffect(() => {
    const testConnection = async () => {
      try {
        if (!supabase) {
          console.log("Supabase 클라이언트가 초기화되지 않았습니다.");
          return;
        }
        
        const { data, error } = await supabase
          .from("test")
          .select("*")
          .limit(1);

        if (error) {
          console.log("Supabase 연결 실패:", error);
        } else {
          console.log("Supabase 연결 성공!", data);
        }
      } catch (error) {
        console.log("Supabase 테스트 중 오류:", error);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* 메인 슬라이더 */}
      <MainSlider />

      {/* 순위 차트 - 핵심 컨텐츠를 먼저 배치 */}
      <FrontRankTop3 />

      {/* 작은 카드 그리드 */}
      <SmallCardsGrid />

      {/* HOT ISSUE 섹션 */}
      <HotIssueSection />
    </div>
  );
}