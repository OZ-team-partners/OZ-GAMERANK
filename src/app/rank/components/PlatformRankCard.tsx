"use client";

import React from "react";
import Link from "next/link";
import { Avatar } from "@mui/material";

interface RankItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  rank: number;
}

interface PlatformRankCardProps {
  platformKey: string;
  platformLabel: string;
  items: RankItem[];
  isMobile?: boolean;
}

export default function PlatformRankCard({
  platformKey,
  platformLabel,
  items,
  isMobile = false,
}: PlatformRankCardProps) {
  const rows = [1, 2, 3];
  
  const getRouteUrl = () => {
    const platformRoutes: Record<string, string> = {
      online: '/rank/pc/online',
      steam: '/rank/pc/steam',
      playstation: '/rank/console/playstation',
      nintendo: '/rank/console/nintendo',
      ios: '/rank/mobile/ios',
      android: '/rank/mobile/android',
    };
    return platformRoutes[platformKey] || `/rank/${platformKey}`;
  };

  const getRankBadgeStyle = (position: number) => ({
    background:
      position === 1
        ? "radial-gradient(circle at 25% 25%, #fff59d 0%, #fbbf24 30%, #f59e0b 70%, #b45309 100%)"
        : position === 2
        ? "radial-gradient(circle at 25% 25%, #f1f5f9 0%, #e2e8f0 30%, #94a3b8 70%, #64748b 100%)"
        : "radial-gradient(circle at 25% 25%, #cd7c4c 0%, #b8621a 30%, #a0501a 70%, #8b3d15 100%)",
    color: position === 2 ? "#1e293b" : "white",
  });

  if (isMobile) {
    return (
      <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
        <Link href={getRouteUrl()} className="block">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4">
            <h3 className="font-bold text-base text-center">{platformLabel}</h3>
          </div>
        </Link>
        <div className="divide-y divide-slate-700/20">
          {rows.map((position) => {
            const item = items[position - 1];
            return item ? (
              <Link href={`/game_info/${item.id}`} key={position} className="block">
                <div
                  className="flex items-center gap-5 py-5 px-6 cursor-pointer hover:bg-slate-700/30 transition-colors duration-200 group"
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={getRankBadgeStyle(position)}
                  >
                    {position}
                  </div>
                  <div className="overflow-hidden rounded-[8px]">
                    <Avatar
                      src={item.image}
                      alt={item.title}
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "8px",
                        flexShrink: 0,
                      }}
                      className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">
                      {item.title}
                    </p>
                    <p className="text-slate-400 text-xs">{item.subtitle}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <div
                key={position}
                className="flex items-center gap-5 py-5 px-6"
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={getRankBadgeStyle(position)}
                >
                  {position}
                </div>
                <span className="text-slate-500 text-sm italic">
                  준비중...
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop view
  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
      <Link href={getRouteUrl()} className="block">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6">
          <h3 className="font-bold text-lg text-center">{platformLabel}</h3>
        </div>
      </Link>
      <div className="divide-y divide-slate-700/20">
        {rows.map((position) => {
          const item = items[position - 1];
          return item ? (
            <Link href={`/game_info/${item.id}`} key={position} className="block">
              <div
                className="flex items-center gap-5 py-5 px-6 cursor-pointer hover:bg-slate-700/30 transition-colors duration-200 group"
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                  style={getRankBadgeStyle(position)}
                >
                  {position}
                </div>
                <div className="overflow-hidden rounded-[10px]">
                  <Avatar
                    src={item.image}
                    alt={item.title}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "10px",
                      flexShrink: 0,
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    }}
                    className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-base mb-1">
                    {item.title}
                  </p>
                  <p className="text-slate-400 text-sm">{item.subtitle}</p>
                </div>
              </div>
            </Link>
          ) : (
            <div
              key={position}
              className="flex items-center gap-5 py-5 px-6"
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                style={getRankBadgeStyle(position)}
              >
                {position}
              </div>
              <span className="text-slate-500 text-sm italic">
                현재 준비중입니다 🎮
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}