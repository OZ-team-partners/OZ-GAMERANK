"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";
import { supabase } from "@/lib/supabase";
import PlatformRankCard from "./components/PlatformRankCard";

type PlatformKey =
  | "online"
  | "steam"
  | "playstation"
  | "nintendo"
  | "ios"
  | "android";

interface RankGameRow {
  id: number;
  game_title: string;
  game_subtitle: string | null;
  image_url: string | null;
  rank: number;
}

interface RankItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  rank: number;
}

const FALLBACK_IMAGE: Record<PlatformKey, string> = {
  online: "/icon/rank_icon/online1.jpeg",
  steam: "/icon/rank_icon/steam1.jpeg",
  playstation: "/icon/rank_icon/console3.jpeg",
  nintendo: "/icon/rank_icon/console1.jpeg",
  ios: "/icon/rank_icon/mobile1.jpeg",
  android: "/icon/rank_icon/mobile2.jpeg",
};

async function fetchTop3ByPlatform(
  platform: PlatformKey
): Promise<RankItem[]> {
  if (!supabase) return [];
  
  const { data, error } = await supabase
    .from("rank_game")
    .select("id, game_title, game_subtitle, image_url, rank")
    .eq("platform", platform)
    .order("rank", { ascending: true })
    .limit(3);

  if (error) {
    console.error(`rank_game(${platform}) 조회 오류:`, error.message);
    return [];
  }

  const rows = (data as RankGameRow[] | null) || [];
  return rows.map((row) => ({
    id: row.id,
    title: row.game_title,
    subtitle: row.game_subtitle || "",
    image: row.image_url || FALLBACK_IMAGE[platform],
    rank: row.rank,
  }));
}

export default function FrontRankTop3() {
  const [dataByPlatform, setDataByPlatform] = useState<
    Partial<Record<PlatformKey, RankItem[]>>
  >({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    
    (async () => {
      try {
        setLoading(true);
        const platforms: PlatformKey[] = [
          "online",
          "steam",
          "playstation",
          "nintendo",
          "ios",
          "android",
        ];

        const results = await Promise.all(
          platforms.map(async (p) => ({
            key: p,
            items: await fetchTop3ByPlatform(p),
          }))
        );

        if (!isMounted) return;
        
        const next: Partial<Record<PlatformKey, RankItem[]>> = {};
        results.forEach(({ key, items }) => {
          next[key] = items;
        });
        setDataByPlatform(next);
      } catch (err) {
        console.error("TOP3 데이터 로드 실패:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const platformColumns = useMemo(
    () => [
      { key: "online" as PlatformKey, label: "Online" },
      { key: "steam" as PlatformKey, label: "Steam" },
      { key: "playstation" as PlatformKey, label: "PlayStation" },
      { key: "nintendo" as PlatformKey, label: "Nintendo" },
      { key: "ios" as PlatformKey, label: "iOS" },
      { key: "android" as PlatformKey, label: "Android" },
    ],
    []
  );

  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
            <span className="text-indigo-400 text-sm font-medium uppercase tracking-wider">
              Game Rankings
            </span>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            플랫폼 별 TOP 3
          </h2>
          <p className="text-lg text-slate-300 font-light">
            이번 달의 POWER RANKER 🏆
          </p>

          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto mt-6 rounded-full" />
        </div>

        {/* Desktop View - 2 columns grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {platformColumns.map((col) => (
            <PlatformRankCard
              key={col.key}
              platformKey={col.key}
              platformLabel={col.label}
              items={dataByPlatform[col.key] || []}
              isMobile={false}
            />
          ))}
        </div>

        {/* Mobile View - Vertical stack */}
        <div className="md:hidden space-y-4">
          {platformColumns.map((col) => (
            <PlatformRankCard
              key={col.key}
              platformKey={col.key}
              platformLabel={col.label}
              items={dataByPlatform[col.key] || []}
              isMobile={true}
            />
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-3 backdrop-blur-md bg-white/10 rounded-full px-6 py-3 border border-white/20">
              <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              <Typography
                variant="body1"
                sx={{ color: "#e2e8f0", fontWeight: "500" }}
              >
                데이터를 불러오는 중...
              </Typography>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}