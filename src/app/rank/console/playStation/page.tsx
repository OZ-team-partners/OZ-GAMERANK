"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/shared/lib/supabase";

interface PsItem {
  rank: number;
  title: string;
  image: string;
  releaseDate: string;
}

export default function SectionPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState<PsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [dataSource, setDataSource] = useState<string>("");

  // Supabase rank_game에서 platform=playstation 데이터 로드
  useEffect(() => {
    const loadFromSupabase = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!supabase) {
          throw new Error("Supabase 클라이언트가 초기화되지 않았습니다.");
        }

        const { data, error } = await supabase
          .from("rank_game")
          .select("platform, game_title, game_subtitle, image_url, rank, update_when")
          .eq("platform", "playstation")
          .order("rank", { ascending: true });

        if (error) throw error;

        const mapped: PsItem[] = (data || []).map((row: {
          rank: number;
          game_title: string;
          image_url?: string | null;
          game_subtitle?: string | null;
          update_when?: string;
        }) => ({
          rank: row.rank,
          title: row.game_title,
          image: row.image_url || "",
          releaseDate: row.game_subtitle || "",
        }));

        setGames(mapped);
        const latestUpdated = data?.[0]?.update_when || new Date().toISOString();
        setLastUpdated(latestUpdated);
        setDataSource("rank_game (platform=playstation)");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    loadFromSupabase();
  }, []);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return games;
    return games.filter(
      (game) =>
        game.title.toLowerCase().includes(q) ||
        (game.releaseDate || "").toLowerCase().includes(q)
    );
  }, [games, searchQuery]);

  // 로딩 상태
  if (loading) {
    return (
      <div className="bg-slate-900 text-white min-h-screen">
        <div className="m-0 font-sans flex flex-col md:flex-row min-h-screen">
          <aside className="w-full md:w-52 bg-slate-800 border-slate-700 border-b md:border-b-0 md:border-r p-5 flex flex-col gap-5 text-white">
            <div className="text-sm leading-relaxed">
              <strong className="block mb-2">Lesson & Article</strong>
              <div>2025 상반기</div>
              <div>2025 하반기</div>
              <div>2026 상반기</div>
            </div>
            <div className="h-48 border border-slate-700 flex items-center justify-center">
              광고
            </div>
            <div className="flex-grow"></div>
          </aside>

          <main className="flex-1 p-5">
            <div className="ad-banner bg-slate-800 border border-slate-700 h-20 flex items-center justify-center mb-5">
              광고
            </div>

            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-red-400">
                  PS5 메타크리틱 랭킹을 불러오는 중...
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="bg-slate-900 text-white min-h-screen">
        <div className="m-0 font-sans flex flex-col md:flex-row min-h-screen">
          <aside className="w-full md:w-52 bg-slate-800 border-slate-700 border-b md:border-b-0 md:border-r p-5 flex flex-col gap-5 text-white">
            <div className="text-sm leading-relaxed">
              <strong className="block mb-2">Lesson & Article</strong>
              <div>2025 상반기</div>
              <div>2025 하반기</div>
              <div>2026 상반기</div>
            </div>
            <div className="h-48 border border-slate-700 flex items-center justify-center">
              광고
            </div>
            <div className="flex-grow"></div>
          </aside>

          <main className="flex-1 p-5">
            <div className="ad-banner bg-slate-800 border border-slate-700 h-20 flex items-center justify-center mb-5">
              광고
            </div>

            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-red-400 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-indigo-500 text-white rounded-md py-2 px-4 cursor-pointer hover:bg-indigo-600 transition-colors"
                >
                  다시 시도
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <div className="m-0 font-sans flex flex-col md:flex-row min-h-screen">
        {/* 사이드바 */}
        <aside className="w-full md:w-52 bg-slate-800 border-slate-700 border-b md:border-b-0 md:border-r p-5 flex flex-col gap-5 text-white">
          <div className="text-sm leading-relaxed">
            <strong className="block mb-2">Lesson & Article</strong>
            <div>2025 상반기</div>
            <div>2025 하반기</div>
            <div>2026 상반기</div>
          </div>
          <div className="h-48 border border-slate-700 flex items-center justify-center">
            광고
          </div>
          <div className="flex-grow"></div>
        </aside>

        {/* 메인 영역 */}
        <main className="flex-1 p-5">
          <Link href="/blog/newsletter" className="block">
            <div className="ad-banner bg-slate-800 border border-slate-700 h-20 flex items-center justify-center mb-5 cursor-pointer hover:opacity-90 transition-opacity">
              광고
            </div>
          </Link>

          {/* 헤더 */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              PS5 메타크리틱 랭킹
            </h1>
            <p className="text-slate-400">
              2025년 PS5 메타크리틱 랭킹입니다. [메타크리틱 내 랭킹 순위를
              반영합니다.]
            </p>
            <p className="text-sm text-slate-500 mt-2">
              총 {games.length}개의 게임이 등록되어 있습니다.
              {lastUpdated && (
                <span className="ml-4">
                  마지막 업데이트:{" "}
                  {new Date(lastUpdated).toLocaleString("ko-KR")}
                </span>
              )}
              {dataSource && (
                <span className="ml-4 text-blue-400">
                  데이터 소스: {dataSource}
                </span>
              )}
              
            </p>
          </div>

          <div className="flex gap-2.5 mb-5">
            <select className="bg-slate-800 border border-slate-700 text-white text-sm p-1.5">
              <option>언어</option>
            </select>
            <select className="bg-slate-800 border border-slate-700 text-white text-sm p-1.5">
              <option>정렬</option>
            </select>
            <input
              type="text"
              placeholder="검색 (제목/발매일)"
              className="bg-slate-800 border border-slate-700 text-white text-sm p-1.5 flex-grow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* 검색 결과 통계 */}
          {searchQuery && (
            <div className="mb-4 text-sm text-slate-400">
              &quot;{searchQuery}&quot; 검색 결과: {filteredItems.length}개
            </div>
          )}

          {/* 게임 목록 */}
          {filteredItems.length > 0 ? (
            filteredItems.map((game) => (
              <Link
                href={`/game_info/${encodeURIComponent(game.title)}`}
                key={`${game.rank}-${game.title}`}
                className="block"
              >
                <div className="card bg-slate-800 border border-slate-700 flex items-center p-2.5 mb-2.5 gap-2.5 hover:bg-slate-700/60 transition-colors cursor-pointer">
                  {/* 순위 배지 */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      game.rank === 1
                        ? "bg-yellow-500 text-white"
                        : game.rank === 2
                        ? "bg-gray-400 text-white"
                        : game.rank === 3
                        ? "bg-amber-600 text-white"
                        : "bg-slate-600 text-white"
                    }`}
                  >
                    {game.rank}
                  </div>

                  <div className="card-img w-35 h-50 bg-slate-700 flex items-center justify-center text-xl rounded overflow-hidden">
                    <Image
                      src={game.image || "/icon/rank_icon/console1.jpeg"}
                      alt={game.title}
                      width={320}
                      height={160}
                      className="w-full h-full object-cover rounded"
                      placeholder="empty"
                      unoptimized={true}
                    />
                  </div>
                  <div className="card-text flex-1">
                    <p className="card-title font-bold m-0 text-white text-2xl">
                      {game.title}
                    </p>
                    <p className="text-blue-400 text-sm">
                      발매일: {game.releaseDate || "정보 없음"}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400">
                {searchQuery
                  ? "검색 결과가 없습니다."
                  : "게임 데이터가 없습니다."}
              </p>
            </div>
          )}

          <div className="mt-5 flex gap-2.5">
            <button className="bg-indigo-500 text-white rounded-md py-2 px-4 cursor-pointer hover:bg-indigo-600 transition-colors">
              더 많은 랭킹 보기
            </button>
            <button className="bg-transparent border border-indigo-500 text-indigo-500 rounded-md py-2 px-4 cursor-pointer hover:bg-indigo-500 hover:text-white transition-colors">
              필터 설정
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
