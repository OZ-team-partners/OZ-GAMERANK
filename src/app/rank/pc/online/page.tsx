"use client";

import React, { useMemo, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import CategoryTabs from "../../components/CategoryTabs";
import RankingGrid from "../../components/RankingGrid";

interface OnlineGame {
  id: number;
  title: string;
  subtitle: string;
  img: string;
  rank: number;
  isNew?: boolean;
  isHot?: boolean;
  rankChange?: number;
}

export default function OnlineRankingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState<OnlineGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [sortBy, setSortBy] = useState<"rank" | "title" | "new">("rank");
  const [filterGenre, setFilterGenre] = useState<"all" | "action" | "rpg" | "strategy">("all");

  // Online-game 랭킹 데이터 가져오기 (DB)
  useEffect(() => {
    const fetchOnlineRankings = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("rank_game")
          .select("id, game_title, game_subtitle, image_url, rank, update_when")
          .eq("platform", "online")
          .order("rank", { ascending: true });

        if (error) throw new Error(error.message);

        type RankGameRow = {
          id: number;
          game_title: string;
          game_subtitle: string | null;
          image_url: string | null;
          rank: number;
          update_when: string | null;
        };

        const mapped: OnlineGame[] = ((data as RankGameRow[] | null) || []).map(
          (row, index) => ({
            id: row.id,
            title: row.game_title,
            subtitle: row.game_subtitle || "",
            img: row.image_url || "/icon/rank_icon/online1.jpeg",
            rank: row.rank,
            isNew: index < 3 && Math.random() > 0.7, // 임시로 신작 표시
            isHot: row.rank <= 5 && Math.random() > 0.6, // 임시로 HOT 표시
            rankChange: Math.random() > 0.5 ? Math.floor(Math.random() * 5) - 2 : 0, // 임시 순위 변동
          })
        );

        setGames(mapped);
        setLastUpdated(
          data && (data as RankGameRow[])[0]?.update_when
            ? new Date(
                (data as RankGameRow[])[0].update_when as string
              ).toISOString()
            : new Date().toISOString()
        );
      } catch (err) {
        setError("Online 게임 랭킹 데이터를 불러오는 중 오류가 발생했습니다.");
        console.error("Online 게임 랭킹 가져오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOnlineRankings();
  }, []);

  const filteredAndSortedItems = useMemo(() => {
    let filtered = games;

    // 검색 필터
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(
        (game) =>
          game.title.toLowerCase().includes(q) ||
          game.subtitle.toLowerCase().includes(q)
      );
    }

    // 장르 필터 (임시로 제목 기반)
    if (filterGenre !== "all") {
      filtered = filtered.filter((game) => {
        const title = game.title.toLowerCase();
        switch (filterGenre) {
          case "action":
            return title.includes("배틀") || title.includes("액션") || title.includes("fps");
          case "rpg":
            return title.includes("rpg") || title.includes("판타지") || title.includes("어드벤처");
          case "strategy":
            return title.includes("전략") || title.includes("타이쿤") || title.includes("시뮬레이션");
          default:
            return true;
        }
      });
    }

    // 정렬
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "new":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case "rank":
        default:
          return a.rank - b.rank;
      }
    });

    return sorted;
  }, [games, searchQuery, sortBy, filterGenre]);

  if (error) {
    return (
      <div className="bg-slate-900 text-white min-h-screen">
        <CategoryTabs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-4">
              <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">오류가 발생했습니다</h3>
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium py-2 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <CategoryTabs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200"></div>
            </div>
            <span className="text-orange-400 text-sm font-medium uppercase tracking-wider">
              PC Online Games
            </span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200"></div>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
            Online 게임 랭킹
          </h1>
          <p className="text-lg text-slate-300 font-light mb-2">
            PC에서 가장 인기 있는 Online 게임 순위입니다 🎮
          </p>
          <p className="text-sm text-slate-500">
            포털 트렌드 · PC방 접속 · 게임방송 시청자 · 메카 유저 투표 기준
          </p>

          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mt-6 rounded-full"></div>
        </div>

        {/* 필터 및 검색 영역 */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* 필터 옵션 */}
            <div className="flex flex-wrap gap-3">
              <select
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value as any)}
                className="bg-slate-800/60 border border-slate-700/50 text-white text-sm px-4 py-2 rounded-lg backdrop-blur-sm focus:border-orange-500 transition-colors"
              >
                <option value="all">전체 장르</option>
                <option value="action">액션/FPS</option>
                <option value="rpg">RPG/어드벤처</option>
                <option value="strategy">전략/시뮬레이션</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-800/60 border border-slate-700/50 text-white text-sm px-4 py-2 rounded-lg backdrop-blur-sm focus:border-orange-500 transition-colors"
              >
                <option value="rank">순위순</option>
                <option value="title">이름순</option>
                <option value="new">신작순</option>
              </select>
            </div>

            {/* 검색바 */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="게임 제목이나 설명으로 검색..."
                className="w-full bg-slate-800/60 border border-slate-700/50 text-white text-sm px-4 py-2 pl-10 rounded-lg backdrop-blur-sm focus:border-orange-500 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* 통계 정보 */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-400">
            <span>총 {filteredAndSortedItems.length}개의 게임</span>
            {searchQuery && (
              <span className="text-orange-400">
                &quot;{searchQuery}&quot; 검색 결과
              </span>
            )}
            {lastUpdated && (
              <span>
                마지막 업데이트: {new Date(lastUpdated).toLocaleString("ko-KR")}
              </span>
            )}
          </div>
        </div>

        {/* 게임 그리드 */}
        <RankingGrid items={filteredAndSortedItems} loading={loading} />

        {/* 페이지 하단 정보 */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-6 bg-slate-800/40 rounded-xl backdrop-blur-sm border border-slate-700/50">
            <div className="text-sm text-slate-400">
              데이터 제공: gamemeca.com
            </div>
            <div className="flex gap-3">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium py-2 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200">
                전체 랭킹 보기
              </button>
              <button className="bg-transparent border border-orange-500 text-orange-500 font-medium py-2 px-6 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-200">
                랭킹 변화 추이
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}