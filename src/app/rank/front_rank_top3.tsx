"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Typography,
} from "@mui/material";
import { supabase } from "@/lib/supabase";

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

async function fetchTop3ByPlatform(platform: PlatformKey): Promise<RankItem[]> {
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

function RankingTable({
  title,
  columns,
  dataByPlatform,
}: {
  title: string;
  columns: { key: PlatformKey; label: string }[];
  dataByPlatform: Partial<Record<PlatformKey, RankItem[]>>;
}) {
  const rows = [1, 2, 3];

  return (
    <div className={`w-full ${title.includes("두 번째") ? "mt-6" : ""}`}>
      <div className="w-full bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl shadow-xl overflow-hidden">
        <Table sx={{ borderCollapse: "separate", borderSpacing: 0, width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              sx={{
                fontWeight: "700",
                fontSize: "0.875rem",
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                color: "white",
                border: "none",
                width: "12%",
                py: 2.5,
                letterSpacing: "0.025em",
              }}
            >
              순위
            </TableCell>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                align="center"
                sx={{
                  fontWeight: "700",
                  fontSize: "0.875rem",
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  color: "white",
                  border: "none",
                  py: 2.5,
                  letterSpacing: "0.025em",
                  width: `${Math.floor(88 / columns.length)}%`,
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((position) => (
            <TableRow 
              key={position}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(99, 102, 241, 0.08)",
                },
                transition: "background-color 0.2s ease",
              }}
            >
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "rgba(51, 65, 85, 0.2)",
                  border: "none",
                  borderBottom: position !== 3 ? "1px solid rgba(71, 85, 105, 0.2)" : "none",
                  py: 2.5,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                    fontSize: "0.875rem",
                    margin: "0 auto",
                    background: position === 1
                      ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
                      : position === 2
                      ? "linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)"
                      : "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    color: position === 2 ? "#1e293b" : "white",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  {position}
                </div>
              </TableCell>

              {columns.map((col) => {
                const items = dataByPlatform[col.key] || [];
                const item = items[position - 1];
                return (
                  <TableCell
                    key={`${col.key}-${position}`}
                    sx={{
                      backgroundColor: "transparent",
                      border: "none",
                      borderBottom: position !== 3 ? "1px solid rgba(71, 85, 105, 0.2)" : "none",
                      py: 2.5,
                      px: 3,
                    }}
                  >
                    {item ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "6px 0",
                        }}
                      >
                        <Avatar
                          src={item.image}
                          alt={item.title}
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: "8px",
                            border: "1px solid rgba(71, 85, 105, 0.3)",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{ 
                              fontWeight: "700", 
                              color: "#f1f5f9", 
                              fontSize: "0.875rem",
                              mb: 0.5,
                              lineHeight: 1.3,
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: "#94a3b8", 
                              fontSize: "0.813rem",
                              lineHeight: 1.4,
                            }}
                          >
                            {item.subtitle}
                          </Typography>
                        </div>
                      </div>
                    ) : (
                      <div style={{ textAlign: "center", padding: "12px 0" }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: "#64748b", 
                            fontStyle: "italic",
                            fontSize: "0.8rem",
                          }}
                        >
                          현재 준비중입니다 🎮
                        </Typography>
                      </div>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
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

  const firstTableCols = useMemo(
    () => [
      { key: "online" as PlatformKey, label: "Online" },
      { key: "steam" as PlatformKey, label: "Steam" },
      { key: "playstation" as PlatformKey, label: "PlayStation" },
    ],
    []
  );

  const secondTableCols = useMemo(
    () => [
      { key: "nintendo" as PlatformKey, label: "Nintendo (2025 상반기)" },
      { key: "ios" as PlatformKey, label: "iOS" },
      { key: "android" as PlatformKey, label: "Android" },
    ],
    []
  );

  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
            <span className="text-indigo-400 text-sm font-medium uppercase tracking-wider">
              Game Rankings
            </span>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            플랫폼 별 TOP 3
          </h2>
          <p className="text-lg text-slate-300 font-light">
            이번 달의 POWER RANKER 🏆
          </p>
          
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="space-y-8">
          <RankingTable
            title="첫 번째 순위 차트"
            columns={firstTableCols}
            dataByPlatform={dataByPlatform}
          />

          <RankingTable
            title="두 번째 순위 차트"
            columns={secondTableCols}
            dataByPlatform={dataByPlatform}
          />
        </div>

        {loading && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-3 backdrop-blur-md bg-white/10 rounded-full px-6 py-3 border border-white/20">
              <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
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
