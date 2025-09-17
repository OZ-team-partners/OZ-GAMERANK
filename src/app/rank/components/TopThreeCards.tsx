"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface TopThreeItem {
  id: number;
  rank: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  isNew?: boolean;
  isHot?: boolean;
}

interface TopThreeCardsProps {
  items: TopThreeItem[];
}

export default function TopThreeCards({ items }: TopThreeCardsProps) {
  const getCrownStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-400 drop-shadow-lg";
      case 2:
        return "text-gray-400 drop-shadow-lg";
      case 3:
        return "text-amber-600 drop-shadow-lg";
      default:
        return "text-gray-500";
    }
  };

  const getCardStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-yellow-500/20 via-amber-500/20 to-orange-500/20 border-yellow-500/50 shadow-xl shadow-yellow-500/20";
      case 2:
        return "bg-gradient-to-br from-gray-400/20 via-slate-400/20 to-gray-500/20 border-gray-400/50 shadow-xl shadow-gray-400/20";
      case 3:
        return "bg-gradient-to-br from-amber-600/20 via-orange-600/20 to-amber-700/20 border-amber-600/50 shadow-xl shadow-amber-600/20";
      default:
        return "bg-slate-800/50 border-slate-700/50";
    }
  };

  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-yellow-400 via-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/50 ring-2 ring-yellow-300/50";
      case 2:
        return "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 text-white shadow-lg shadow-gray-400/50 ring-2 ring-gray-200/50";
      case 3:
        return "bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-white shadow-lg shadow-amber-600/50 ring-2 ring-amber-400/50";
      default:
        return "bg-slate-600 text-white";
    }
  };

  // 정렬: 2위 - 1위 - 3위 순서로 배치 (닌텐도 스타일)
  const sortedItems = [...items].sort((a, b) => {
    if (a.rank === 1) return -1;
    if (b.rank === 1) return 1;
    if (a.rank === 2) return -1;
    if (b.rank === 2) return 1;
    return a.rank - b.rank;
  });

  return (
    <div className="mb-16">
      {/* 섹션 제목 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse delay-100"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
          </div>
          <span className="text-yellow-400 text-lg font-bold uppercase tracking-wider">
            🏆 Top 3 Champions
          </span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse delay-100"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
          최고의 게임들
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto rounded-full"></div>
      </div>

      {/* Top 3 카드 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {sortedItems.map((item, index) => {
          const isFirst = item.rank === 1;
          const cardSize = isFirst ? "lg:col-span-1 lg:row-span-1" : "lg:col-span-1";

          return (
            <Link key={item.id} href={`/game_info/${item.id}`}>
              <div className={`group relative ${cardSize} ${index === 1 ? 'lg:order-1' : index === 0 ? 'lg:order-2' : 'lg:order-3'}`}>
                {/* 왕관 아이콘 */}
                <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 z-20 ${getCrownStyle(item.rank)}`}>
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 16L3 6l5.5 4L12 4l3.5 6L21 6l-2 10H5zm2.7-2h8.6l.9-4.4L14 12l-2-3.4L10 12l-3.2-2.4L7.7 14z"/>
                  </svg>
                </div>

                <div
                  className={`relative backdrop-blur-sm rounded-2xl border-2 overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer ${getCardStyle(item.rank)} ${
                    isFirst ? 'lg:h-[420px]' : 'lg:h-[380px]'
                  }`}
                >
                  {/* 이미지 영역 */}
                  <div className={`relative overflow-hidden bg-slate-900 ${isFirst ? 'h-64' : 'h-48'}`}>
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* 순위 배지 */}
                    <div className={`absolute top-4 right-4 w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl ${getRankBadgeStyle(item.rank)}`}>
                      {item.rank}
                    </div>

                    {/* 뱃지들 */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {item.isNew && (
                        <div className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full uppercase shadow-lg">
                          NEW
                        </div>
                      )}
                      {item.isHot && (
                        <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full uppercase animate-pulse shadow-lg">
                          HOT
                        </div>
                      )}
                    </div>

                    {/* 1위 전용 특별 효과 */}
                    {isFirst && (
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-amber-600/10 animate-pulse" />
                    )}
                  </div>

                  {/* 정보 영역 */}
                  <div className="p-6">
                    <h3 className={`font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-200 ${
                      isFirst ? 'text-2xl' : 'text-xl'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-slate-400 leading-relaxed ${
                      isFirst ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'
                    }`}>
                      {item.subtitle}
                    </p>

                    {/* 1위 전용 추가 정보 */}
                    {isFirst && (
                      <div className="mt-4 pt-4 border-t border-yellow-500/20">
                        <div className="flex items-center justify-center">
                          <div className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-full border border-yellow-500/30">
                            <span className="text-yellow-400 text-sm font-bold">👑 현재 1위</span>
                          </div>
                        </div>
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