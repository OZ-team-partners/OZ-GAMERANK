"use client";

import React from "react";
import GameRankCard from "./GameRankCard";

interface RankingItem {
  id: number;
  rank: number;
  title: string;
  subtitle: string;
  img: string;
  isNew?: boolean;
  isHot?: boolean;
  rankChange?: number;
  consecutiveWeeks?: number;
}

interface RankingGridProps {
  items: RankingItem[];
  loading?: boolean;
  showTopThree?: boolean; // Top 3를 포함할지 여부
}

function SkeletonCard() {
  return (
    <div className="relative backdrop-blur-sm bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden animate-pulse">
      <div className="aspect-video bg-slate-700/50" />
      <div className="p-4">
        <div className="h-5 bg-slate-700/50 rounded mb-2 w-3/4" />
        <div className="h-4 bg-slate-700/50 rounded w-full" />
      </div>
    </div>
  );
}

export default function RankingGrid({ items, loading = false, showTopThree = true }: RankingGridProps) {
  // Top 3를 제외할지 결정
  const filteredItems = showTopThree ? items : items.filter(item => item.rank > 3);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800 rounded-full mb-4">
          <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {showTopThree ? "게임 데이터가 없습니다" : "4위 이하 게임이 없습니다"}
        </h3>
        <p className="text-slate-400">나중에 다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <GameRankCard
            key={item.id}
            id={item.id}
            rank={item.rank}
            title={item.title}
            subtitle={item.subtitle}
            imageUrl={item.img}
            isNew={item.isNew}
            isHot={item.isHot}
            rankChange={item.rankChange}
            consecutiveWeeks={item.consecutiveWeeks}
          />
        ))}
      </div>
    </div>
  );
}