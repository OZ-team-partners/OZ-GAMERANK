"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Trophy } from "lucide-react";

interface TopThreeItem {
  id: number;
  rank: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  isNew?: boolean;
  isHot?: boolean;
  rankChange?: number;
  consecutiveWeeks?: number;
}

interface TopThreeCardsProps {
  items: TopThreeItem[];
}

export default function TopThreeCards({ items }: TopThreeCardsProps) {
  const getCardStyle = (rank: number) => {
    const baseStyle = "bg-slate-800/50 backdrop-blur-sm shadow-xl";
    const borderStyle = rank === 1
      ? "border border-yellow-500/50 hover:border hover:border-yellow-500"
      : rank === 2
      ? "border border-gray-400/50 hover:border hover:border-gray-400"
      : rank === 3
      ? "border border-amber-600/50 hover:border hover:border-amber-600"
      : "border border-slate-700/30 hover:border hover:border-slate-600";

    return `${baseStyle} ${borderStyle}`;
  };

  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 text-white shadow-[0_6px_20px_rgba(0,0,0,0.3)]";
      case 2:
        return "bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600 text-white shadow-[0_6px_20px_rgba(0,0,0,0.3)]";
      case 3:
        return "bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 text-white shadow-[0_6px_20px_rgba(0,0,0,0.3)]";
      default:
        return "bg-slate-600 text-white";
    }
  };

  // 순위순 정렬
  const sortedItems = [...items].sort((a, b) => a.rank - b.rank);

  return (
    <div className="mb-8">
      {/* Top 3 카드 그리드 - 3칸 배치 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedItems.map((item) => {
          return (
            <Link key={item.id} href={`/game_info/${item.id}`}>
              <div className="group relative">
                <div
                  className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer ${getCardStyle(item.rank)}`}
                >
                  {/* 이미지 영역 */}
                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* 순위 배지 - 좌측으로 이동 */}
                    <div className={`absolute top-3 left-3 w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${getRankBadgeStyle(item.rank)} transform-gpu`}>
                      <div className="relative z-10">
                        {item.rank}
                      </div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-white/60 blur-sm pointer-events-none"></div>
                    </div>

                    {/* 뱃지들 */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      {item.consecutiveWeeks && item.rank === 1 && (
                        <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                          <Trophy className="w-3 h-3" />
                          <span>{item.consecutiveWeeks}주 연속</span>
                        </div>
                      )}
                      {item.isNew && (
                        <div className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full uppercase shadow-md">
                          NEW
                        </div>
                      )}
                      {item.isHot && (
                        <div className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full uppercase flex items-center gap-1 animate-pulse shadow-md">
                          <Flame className="w-3 h-3" />
                          <span>HOT</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 정보 영역 */}
                  <div className="p-4 relative">
                    <h3 className="font-bold text-white text-lg line-clamp-1 group-hover:text-orange-400 transition-colors duration-200 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-2">
                      {item.subtitle}
                    </p>

                    {/* 순위 변화 표시 - 우측 하단 */}
                    {item.rankChange !== undefined && (
                      <div className="absolute bottom-4 right-4">
                        {item.rankChange === 0 ? (
                          <div className="flex items-center justify-center w-6 h-6 bg-slate-600/80 rounded-full">
                            <span className="text-slate-300 text-xs font-bold">-</span>
                          </div>
                        ) : item.rankChange > 0 ? (
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                            <span className="text-green-400 text-xs">▲</span>
                            <span className="text-green-400 text-xs font-bold">{item.rankChange}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 px-2 py-1 bg-red-500/20 rounded-full border border-red-500/30">
                            <span className="text-red-400 text-xs">▼</span>
                            <span className="text-red-400 text-xs font-bold">{Math.abs(item.rankChange!)}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}