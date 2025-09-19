"use client";

import React, { useState, useMemo, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import CategoryTabs from "../components/CategoryTabs";
import TopThreeCards from "../components/TopThreeCards";
import GameRankCard from "../components/GameRankCard";

interface PCGame {
  id: number;
  title: string;
  subtitle: string;
  img: string;
  rank: number;
  platform: "online" | "steam";
  isNew?: boolean;
  isHot?: boolean;
}

export default function PCGamesPage() {
  const [selectedTab, setSelectedTab] = useState<"all" | "online" | "steam">("all");
  const [games, setGames] = useState<PCGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // PC 게임 데이터 가져오기 (온라인 + Steam)
  useEffect(() => {
    const fetchPCGames = async () => {
      try {
        setLoading(true);

        const { data: onlineData, error: onlineError } = await supabase
          .from("rank_game")
          .select("id, game_title, game_subtitle, image_url, rank")
          .eq("platform", "online")
          .order("rank", { ascending: true });

        const { data: steamData, error: steamError } = await supabase
          .from("rank_game")
          .select("id, game_title, game_subtitle, image_url, rank")
          .eq("platform", "steam")
          .order("rank", { ascending: true });

        if (onlineError) throw new Error(onlineError.message);
        if (steamError) throw new Error(steamError.message);

        type RankGameRow = {
          id: number;
          game_title: string;
          game_subtitle: string | null;
          image_url: string | null;
          rank: number;
        };

        const combinedGames: PCGame[] = [
          ...(onlineData || []).map((item: RankGameRow) => ({
            id: item.id,
            title: item.game_title,
            subtitle: item.game_subtitle || "",
            img: item.image_url || "/icon/rank_icon/online1.jpeg",
            rank: item.rank,
            platform: "online" as const,
            isNew: Math.random() > 0.7,
            isHot: item.rank <= 5 && Math.random() > 0.6,
          })),
          ...(steamData || []).map((item: RankGameRow) => ({
            id: item.id + 1000, // ID 충돌 방지
            title: item.game_title,
            subtitle: item.game_subtitle || "",
            img: item.image_url || "/icon/rank_icon/steam1.jpeg",
            rank: item.rank,
            platform: "steam" as const,
            isNew: Math.random() > 0.7,
            isHot: item.rank <= 5 && Math.random() > 0.6,
          })),
        ];

        setGames(combinedGames);
      } catch (err) {
        setError("PC 게임 랭킹 데이터를 불러오는 중 오류가 발생했습니다.");
        console.error("PC 게임 랭킹 가져오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPCGames();
  }, []);

  const filteredGames = useMemo(() => {
    if (selectedTab === "all") return games;
    return games.filter(game => game.platform === selectedTab);
  }, [games, selectedTab]);

  const topThreeGames = useMemo(() => {
    return filteredGames
      .slice(0, 3)
      .map(game => ({
        id: game.id,
        rank: game.rank,
        title: game.title,
        subtitle: game.subtitle,
        imageUrl: game.img,
        isNew: game.isNew,
        isHot: game.isHot
      }));
  }, [filteredGames]);

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
              PC Gaming Platform
            </span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200"></div>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
            PC 게임 랭킹
          </h1>
          <p className="text-lg text-slate-300 font-light mb-2">
            PC에서 가장 인기 있는 게임들을 한곳에서 🖥️
          </p>
          <p className="text-sm text-slate-500">
            온라인 게임부터 Steam까지 모든 PC 게임 순위
          </p>

          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mt-6 rounded-full"></div>
        </div>

        {/* 플랫폼 탭 네비게이션 */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="inline-flex bg-slate-800 rounded-xl p-1.5 border border-slate-700">
              <button
                onClick={() => setSelectedTab("all")}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedTab === "all"
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "text-slate-300 hover:text-white hover:bg-slate-700"
                }`}
              >
                전체 PC 게임
              </button>
              <button
                onClick={() => setSelectedTab("online")}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedTab === "online"
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "text-slate-300 hover:text-white hover:bg-slate-700"
                }`}
              >
                온라인 게임
              </button>
              <button
                onClick={() => setSelectedTab("steam")}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedTab === "steam"
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "text-slate-300 hover:text-white hover:bg-slate-700"
                }`}
              >
                Steam 게임
              </button>
            </div>
          </div>
        </div>

        {/* 통계 정보 */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg px-6 py-3">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-slate-300">
                  총 <span className="text-orange-400 font-semibold">{filteredGames.length}</span>개의 게임
                </span>
              </div>
              <div className="w-px h-4 bg-slate-600"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-slate-300">
                  현재 보기: <span className="text-green-400 font-semibold">
                    {selectedTab === "all" ? "전체" : selectedTab === "online" ? "온라인" : "Steam"}
                  </span>
                </span>
              </div>
              <div className="w-px h-4 bg-slate-600"></div>
              <div className="text-slate-400">
                실시간 업데이트
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 게임 특별 표시 */}
        {!loading && topThreeGames.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                🏆 TOP 3 게임
              </h2>
              <p className="text-slate-400">
                {selectedTab === "all" ? "전체 PC 게임" : selectedTab === "online" ? "온라인 게임" : "Steam 게임"} 중 최고 인기작
              </p>
            </div>
            <TopThreeCards items={topThreeGames} />
          </div>
        )}

        {/* 전체 게임 그리드 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              전체 순위
            </h2>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>온라인 게임</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Steam 게임</span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, index) => (
                <div key={index} className="bg-slate-800/50 rounded-2xl p-4 animate-pulse">
                  <div className="aspect-video bg-slate-700 rounded-lg mb-4"></div>
                  <div className="h-4 bg-slate-700 rounded mb-2"></div>
                  <div className="h-3 bg-slate-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.slice(3).map((game) => (
                <div key={game.id} className="relative">
                  {/* 플랫폼 표시 배지 */}
                  <div className="absolute top-2 right-2 z-10">
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                      game.platform === "online"
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                    }`}>
                      {game.platform === "online" ? "온라인" : "STEAM"}
                    </div>
                  </div>
                  <GameRankCard
                    id={game.id}
                    rank={game.rank}
                    title={game.title}
                    subtitle={game.subtitle}
                    imageUrl={game.img}
                    isNew={game.isNew}
                    isHot={game.isHot}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 하단 정보 */}
        <div className="mt-16 text-center">
          <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30">
            <h3 className="text-lg font-semibold text-white mb-3">더 자세한 정보가 필요하신가요?</h3>
            <p className="text-slate-400 mb-4">
              각 플랫폼별 상세 랭킹과 분석을 확인해보세요
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/rank/pc/online"
                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200"
              >
                온라인 게임 상세보기
              </a>
              <a
                href="/rank/pc/steam"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
              >
                Steam 게임 상세보기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}