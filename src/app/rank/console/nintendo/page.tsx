"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface NintendoGame {
  id: number;
  title: string;
  subtitle: string;
  img: string;
  rank: number;
  developer: string;
}

// API 응답 타입은 더 이상 사용하지 않음 (DB 직접 조회)

export default function SectionPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState<NintendoGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [dataSource, setDataSource] = useState<string>("");

  // 닌텐도 Switch 랭킹 데이터 가져오기
  useEffect(() => {
    const fetchNintendoRankings = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("닌텐도 랭킹 DB 조회 시작...");
        const { data, error } = await supabase
          .from("rank_game")
          .select("id, game_title, game_subtitle, image_url, rank, update_when")
          .eq("platform", "nintendo")
          .order("rank", { ascending: true });

        if (error) {
          console.error("DB 조회 오류:", error);
          throw new Error(error.message);
        }

        type RankGameRow = {
          id: number;
          game_title: string;
          game_subtitle: string | null;
          image_url: string | null;
          rank: number;
          update_when: string | null;
        };

        const mapped: NintendoGame[] = (
          (data as RankGameRow[] | null) || []
        ).map((row) => ({
          id: row.id,
          title: row.game_title,
          subtitle: row.game_subtitle || "",
          img: row.image_url || "/icon/rank_icon/console1.jpeg",
          rank: row.rank,
          developer: row.game_subtitle || "",
        }));

        setGames(mapped);
        setLastUpdated(
          data && data[0]?.update_when
            ? new Date(data[0].update_when).toISOString()
            : new Date().toISOString()
        );
        setDataSource("DB: rank_game (nintendo)");
        console.log(`닌텐도 랭킹 DB 데이터 로드 완료: ${mapped.length}개`);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "알 수 없는 오류가 발생했습니다.";
        setError(
          `닌텐도 Switch 랭킹 데이터를 불러오는 중 오류가 발생했습니다: ${errorMessage}`
        );
        console.error("닌텐도 Switch 랭킹 가져오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNintendoRankings();
  }, []);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return games;
    return games.filter(
      (game) =>
        game.title.toLowerCase().includes(q) ||
        game.subtitle.toLowerCase().includes(q) ||
        game.developer.toLowerCase().includes(q)
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
                  닌텐도 Switch 랭킹을 불러오는 중...
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
              Nintendo Switch 랭킹
            </h1>
            <p className="text-slate-400">
              2025년 상반기 Nintendo Switch 다운로드 랭킹입니다. [유료
              소프트웨어 대상]
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
                  데이터 소스: Nintendo Switch 랭킹
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
              placeholder="검색 (제목/개발사)"
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
                href={`/game_info/${game.id}`}
                key={game.id}
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

                  <div className="card-img w-80 h-40 bg-slate-700 flex items-center justify-center text-xl rounded overflow-hidden">
                    <Image
                      src={game.img || "/icon/rank_icon/console1.jpeg"}
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
                      개발사: {game.developer}
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
