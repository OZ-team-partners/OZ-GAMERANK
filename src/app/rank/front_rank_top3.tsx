"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
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
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: 1200,
        mx: "auto",
        backgroundColor: "transparent",
        backgroundImage: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(30, 41, 59, 0.4) 100%)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "24px",
        boxShadow: title.includes("두 번째")
          ? "0 25px 50px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
          : "0 25px 50px rgba(79, 70, 229, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        mt: title.includes("두 번째") ? 6 : 0,
        overflow: "hidden",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
        },
      }}
    >
      <Table sx={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              sx={{
                fontWeight: "bold",
                fontSize: "0.9rem",
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                color: "white",
                border: "none",
                width: "12%",
                py: 2,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  right: 0,
                  top: "20%",
                  bottom: "20%",
                  width: "1px",
                  background: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              순위
            </TableCell>
            {columns.map((col, idx) => (
              <TableCell
                key={col.key}
                align="center"
                sx={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                  color: "white",
                  border: "none",
                  py: 2,
                  position: "relative",
                  width: `${Math.floor(88 / columns.length)}%`,
                  "&::after": idx < columns.length - 1 ? {
                    content: '""',
                    position: "absolute",
                    right: 0,
                    top: "20%",
                    bottom: "20%",
                    width: "1px",
                    background: "rgba(255, 255, 255, 0.2)",
                  } : {},
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
                  backgroundColor: "rgba(30, 41, 59, 0.6)",
                  border: "none",
                  borderBottom: position !== 3 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                  py: 2,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    right: 0,
                    top: "10%",
                    bottom: "10%",
                    width: "1px",
                    background: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <Chip
                  label={position}
                  sx={{
                    background: position === 1
                      ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
                      : position === 2
                      ? "linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)"
                      : "linear-gradient(135deg, #cd7f32 0%, #a0522d 100%)",
                    color: position === 2 ? "#111827" : "white",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    width: 36,
                    height: 36,
                    boxShadow: position === 1
                      ? "0 6px 16px rgba(251, 191, 36, 0.4)"
                      : position === 2
                      ? "0 6px 16px rgba(156, 163, 175, 0.4)"
                      : "0 6px 16px rgba(205, 127, 50, 0.4)",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    "& .MuiChip-label": {
                      overflow: "visible",
                      textOverflow: "unset",
                      whiteSpace: "nowrap",
                    },
                  }}
                />
              </TableCell>

              {columns.map((col, colIdx) => {
                const items = dataByPlatform[col.key] || [];
                const item = items[position - 1];
                return (
                  <TableCell
                    key={`${col.key}-${position}`}
                    sx={{
                      backgroundColor: "rgba(30, 41, 59, 0.3)",
                      border: "none",
                      borderBottom: position !== 3 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                      py: 2,
                      px: 2,
                      position: "relative",
                      "&::after": colIdx < columns.length - 1 ? {
                        content: '""',
                        position: "absolute",
                        right: 0,
                        top: "10%",
                        bottom: "10%",
                        width: "1px",
                        background: "rgba(255, 255, 255, 0.1)",
                      } : {},
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
                            border: "2px solid rgba(255, 255, 255, 0.15)",
                            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
                            transition: "transform 0.2s ease",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{ 
                              fontWeight: "bold", 
                              color: "white", 
                              fontSize: "0.95rem",
                              mb: 0.3,
                              textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: "#cbd5e1", 
                              fontSize: "0.8rem",
                              opacity: 0.8,
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
    </TableContainer>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
            <span className="text-indigo-400 text-sm font-medium uppercase tracking-wider">
              Game Rankings
            </span>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            플랫폼 별 TOP 3
          </h2>
          <p className="text-xl text-slate-300 font-light">
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
