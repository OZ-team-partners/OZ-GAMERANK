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
        maxWidth: 1100,
        mx: "auto",
        backgroundColor: "#1e293b",
        border: "1px solidrgb(71, 105, 93)",
        borderRadius: 10,
        boxShadow: title.includes("두 번째")
          ? "0 10px 25px rgba(36, 195, 46, 0.5)"
          : "0 10px 25px rgba(137, 23, 23, 0.3)",
        mt: title.includes("두 번째") ? 4 : 0,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              sx={{
                fontWeight: "bold",
                fontSize: "1.1rem",
                borderRight: "2px solid #475569",
                backgroundColor: "#334155",
                color: "white",
                borderBottom: "2px solid #475569",
                width: "10%",
              }}
            >
              순위
            </TableCell>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                align="center"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  backgroundColor: "#334155",
                  color: "white",
                  borderBottom: "2px solid #475569",
                  borderRight:
                    col === columns[columns.length - 1]
                      ? undefined
                      : "2px solid #475569",
                  width: `${Math.floor(90 / columns.length)}%`,
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((position) => (
            <TableRow key={position}>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  borderRight: "2px solid #475569",
                  backgroundColor: "#475569",
                  color: "white",
                  width: "10%",
                }}
              >
                <Chip
                  label={String(position)}
                  sx={{
                    bgcolor:
                      position === 1
                        ? "#FFD700"
                        : position === 2
                        ? "#C0C0C0"
                        : "#CD7F32",
                    color: position === 2 ? "black" : "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    width: 40,
                    height: 40,
                    boxShadow:
                      position === 1
                        ? "0 2px 8px rgba(255, 215, 0, 0.3)"
                        : position === 2
                        ? "0 2px 8px rgba(192, 192, 192, 0.67)"
                        : "0 2px 8px rgba(50, 205, 190, 0.3)",
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
                      backgroundColor: "#1e293b",
                      color: "white",
                      borderRight:
                        colIdx < columns.length - 1
                          ? "2px solid #475569"
                          : undefined,
                      width: `${Math.floor(90 / columns.length)}%`,
                    }}
                  >
                    {item ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <Avatar
                          src={item.image}
                          alt={item.title}
                          sx={{
                            width: 48,
                            height: 48,
                            border: "2px solid #475569",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                          }}
                        />
                        <div>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", color: "white" }}
                          >
                            {item.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                            {item.subtitle}
                          </Typography>
                        </div>
                      </div>
                    ) : (
                      <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                        현재 준비중입니다ㅠㅠ
                      </Typography>
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
    <section className="py-12 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold font-mono text-center mb-8 text-white">
          플랫폼 별 TOP 3 : 이번 달의 POWER RANKER
        </h2>

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

        {loading && (
          <Typography
            variant="body2"
            sx={{ color: "#94a3b8", textAlign: "center", marginTop: 2 }}
          >
            불러오는 중...
          </Typography>
        )}
      </div>
    </section>
  );
}
