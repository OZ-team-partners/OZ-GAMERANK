"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface AndroidGame {
  id: number;
  title: string;
  subtitle: string;
  img: string;
  rank: number;
}

interface AndroidRankingResponse {
  success: boolean;
  data: AndroidGame[];
  total: number;
  lastUpdated: string;
  source?: string;
  error?: string;
}

export default function SectionPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState<AndroidGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [dataSource, setDataSource] = useState<string>("");

  // Android 랭킹 데이터 가져오기
  useEffect(() => {
    const fetchAndroidRankings = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/android-ranking");
        const result: AndroidRankingResponse = await response.json();

        if (result.success) {
          setGames(result.data);
          setLastUpdated(result.lastUpdated);
          setDataSource(result.source || "API");
        } else {
          setError(result.error || "데이터를 가져오는데 실패했습니다.");
        }
      } catch (err) {
        setError("Android 랭킹 데이터를 불러오는 중 오류가 발생했습니다.");
        console.error("Android 랭킹 가져오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndroidRankings();
  }, []);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return games;
    return games.filter(
      (game) =>
        game.title.toLowerCase().includes(q) ||
        game.subtitle.toLowerCase().includes(q)
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
              <div>2025.8</div>
              <div>2025.9</div>
              <div>2025.10</div>
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-green-400">
                  Android 게임 순위를 불러오는 중...
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
              <div>2025.8</div>
              <div>2025.9</div>
              <div>2025.10</div>
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
            <div>2025.8</div>
            <div>2025.9</div>
            <div>2025.10</div>
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
              Android 게임 순위
            </h1>
            <p className="text-slate-400">
              google play에서 가장 인기 있는 Android 게임 순위입니다.
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
                <span className="ml-4 text-green-400">
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
              placeholder="검색 (제목/설명)"
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
              <div
                key={game.id}
                className="card bg-slate-800 border border-slate-700 flex items-center p-2.5 mb-2.5 gap-2.5"
              >
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

                <div className="card-img w-40 h-40 bg-slate-700 flex items-center justify-center text-xl rounded overflow-hidden">
                  <Image
                    src={game.img || "/icon/rank_icon/mobile2.jpeg"}
                    alt={game.title}
                    width={256}
                    height={256}
                    className="w-full h-full object-cover rounded"
                    placeholder="empty"
                  />
                </div>
                <div className="card-text flex-1">
                  <p className="card-title font-bold m-0 text-white text-2xl">
                    {game.title}
                  </p>
                  <p className="card-subtitle text-slate-400 text-sm mb-2">
                    {game.subtitle}
                  </p>
                </div>
              </div>
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
