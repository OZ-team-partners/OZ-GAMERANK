"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Trophy } from "lucide-react";

interface GameRankCardProps {
  id: number;
  rank: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  isNew?: boolean;
  isHot?: boolean;
  rankChange?: number; // 순위 변화 (-는 하락, +는 상승, 0은 동일)
  consecutiveWeeks?: number; // 연속 1위 주차
}

export default function GameRankCard({
  id,
  rank,
  title,
  subtitle,
  imageUrl,
  isNew = false,
  isHot = false,
  rankChange = 0,
  consecutiveWeeks,
}: GameRankCardProps) {


  // 1위 카드는 금색 테두리 적용
  const borderStyle = rank === 1
    ? "border border-yellow-500/50 hover:border hover:border-yellow-500"
    : "border border-slate-700/30 hover:border hover:border-slate-600";

  return (
    <Link href={`/game_info/${id}`}>
      <div className={`group relative bg-slate-800/50 backdrop-blur-sm ${borderStyle} rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer`}>
        {/* 순위 번호 - 1위는 금색, 나머지는 회색 */}
        <div className={`absolute top-4 left-4 w-12 h-12 ${
          rank === 1
            ? "bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600"
            : rank === 2
            ? "bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500"
            : rank === 3
            ? "bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600"
            : "bg-slate-600"
        } rounded-full flex items-center justify-center font-bold text-white text-lg z-10 shadow-lg`}>
          {rank}
        </div>

        {/* 뱃지들 */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          {consecutiveWeeks && rank === 1 && (
            <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
              <Trophy className="w-3 h-3" />
              <span>{consecutiveWeeks}주 연속</span>
            </div>
          )}
          {isNew && (
            <div className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full uppercase shadow-md">
              NEW
            </div>
          )}
          {isHot && (
            <div className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full uppercase flex items-center gap-1 animate-pulse shadow-md">
              <Flame className="w-3 h-3" />
              <span>HOT</span>
            </div>
          )}
        </div>

        {/* 이미지 영역 */}
        <div className="relative aspect-video overflow-hidden bg-slate-900">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* 정보 영역 */}
        <div className="p-4 relative">
          <h3 className="font-bold text-white text-lg line-clamp-1 group-hover:text-orange-400 transition-colors duration-200 mb-2">
            {title}
          </h3>
          <p className="text-slate-400 text-sm line-clamp-2">
            {subtitle}
          </p>

          {/* 순위 변화 표시 - 우측 하단 */}
          <div className="absolute bottom-4 right-4">
            {rankChange === 0 ? (
              <div className="flex items-center justify-center w-6 h-6 bg-slate-600/80 rounded-full">
                <span className="text-slate-300 text-xs font-bold">-</span>
              </div>
            ) : rankChange > 0 ? (
              <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                <span className="text-green-400 text-xs">▲</span>
                <span className="text-green-400 text-xs font-bold">{rankChange}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 px-2 py-1 bg-red-500/20 rounded-full border border-red-500/30">
                <span className="text-red-400 text-xs">▼</span>
                <span className="text-red-400 text-xs font-bold">{Math.abs(rankChange)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}