"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface GameRankCardProps {
  id: number;
  rank: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  isNew?: boolean;
  isHot?: boolean;
  rankChange?: number;
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
}: GameRankCardProps) {
  const getRankStyle = () => {
    if (rank === 1) {
      return "bg-gradient-to-br from-yellow-400 via-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30";
    } else if (rank === 2) {
      return "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 text-white shadow-lg shadow-gray-400/30";
    } else if (rank === 3) {
      return "bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-white shadow-lg shadow-amber-600/30";
    } else {
      return "bg-slate-600 text-white";
    }
  };

  const getRankChangeIcon = () => {
    if (rankChange > 0) {
      return (
        <div className="flex items-center text-green-400 text-xs">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span>{rankChange}</span>
        </div>
      );
    } else if (rankChange < 0) {
      return (
        <div className="flex items-center text-red-400 text-xs">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>{Math.abs(rankChange)}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <Link href={`/game_info/${id}`}>
      <div className="group relative backdrop-blur-sm bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/10 cursor-pointer">
        {/* 이미지 영역 */}
        <div className="relative aspect-video overflow-hidden bg-slate-900">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* 순위 배지 */}
          <div className={`absolute top-3 left-3 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getRankStyle()}`}>
            {rank}
          </div>

          {/* 뱃지들 */}
          <div className="absolute top-3 right-3 flex gap-2">
            {isNew && (
              <div className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full uppercase">
                NEW
              </div>
            )}
            {isHot && (
              <div className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full uppercase animate-pulse">
                HOT
              </div>
            )}
          </div>
        </div>

        {/* 정보 영역 */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-orange-400 transition-colors duration-200">
              {title}
            </h3>
            {getRankChangeIcon()}
          </div>
          <p className="text-slate-400 text-sm line-clamp-2">
            {subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
}