"use client";

import React, { useMemo, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import RankingGrid from "../../components/RankingGrid";
import TopThreeCards from "../../components/TopThreeCards";
import {
  ChevronDown,
  Gamepad2,
  Sword,
  Wand2,
  Brain,
  Trophy,
  SortAsc,
  Sparkles,
  TrendingUp,
  Calendar,
  CalendarDays,
  Activity,
  Search
} from "lucide-react";

// 사이트 톤앤매너에 맞춘 게이밍 드롭다운 컴포넌트
function StyledGameDropdown({ options, value, onChange, placeholder }: {
  options: readonly {value: string, label: string, icon: React.ComponentType<{ className?: string }>}[] | Array<{value: string, label: string, icon: React.ComponentType<{ className?: string }>}>;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const currentOption = options.find(opt => opt.value === value);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 150); // 애니메이션 시간과 일치
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-800/60 border border-slate-700/50 text-slate-300 px-4 py-2.5 rounded-xl text-sm font-medium hover:border-orange-500/40 hover:text-white transition-all duration-300 flex items-center gap-2.5 min-w-[140px] justify-between group"
      >
        <div className="flex items-center gap-2">
          {currentOption?.icon ? (
            <currentOption.icon className="w-4 h-4 text-slate-400 group-hover:text-orange-400 transition-colors" />
          ) : (
            <Gamepad2 className="w-4 h-4 text-slate-400 group-hover:text-orange-400 transition-colors" />
          )}
          <span className="font-medium">{currentOption?.label || placeholder}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-orange-400 transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          {/* 백드롭 */}
          <div
            className="fixed inset-0 z-10"
            onClick={handleClose}
          />

          {/* 드롭다운 메뉴 */}
          <div className={`absolute top-full mt-2 left-0 bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-20 min-w-full transition-all duration-150 ${
            isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
          }`}>
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  handleClose();
                }}
                className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-150 flex items-center gap-3 relative group ${
                  value === option.value
                    ? "bg-gradient-to-r from-orange-500/20 to-orange-600/10 text-orange-400"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {/* 선택된 항목 글로우 효과 */}
                {value === option.value && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent" />
                )}

                <option.icon className={`w-4 h-4 relative z-10 ${
                  value === option.value ? 'text-orange-400' : 'text-slate-500 group-hover:text-orange-400'
                } transition-colors`} />
                <span className="relative z-10">{option.label}</span>

                {/* 호버 효과 */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-orange-600/0 group-hover:from-orange-500/5 group-hover:to-orange-600/5 transition-all duration-300" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface AndroidGame {
  id: number;
  title: string;
  subtitle: string;
  img: string;
  rank: number;
  isNew?: boolean;
  isHot?: boolean;
  rankChange?: number;
  consecutiveWeeks?: number;
}

// 목업 데이터 상수
const RANK_CHANGE_VALUES = [0, 0, 0, 2, -1, 8, 0, -4, 3, 1, -2, 6, 0, 4, -5, 2, 0, 7, -1, 3];
const NEW_RANK_POSITIONS = [3, 7, 12, 16];
const HOT_THRESHOLD = 3;
const CONSECUTIVE_WEEKS_FOR_FIRST = 5;

// 장르 필터링 키워드 상수
const GENRE_KEYWORDS = {
  action: ["action", "shooting", "fight"],
  rpg: ["rpg", "role", "adventure"],
  strategy: ["strategy", "simulation", "tycoon"]
} as const;

// 드롭다운 옵션 상수
const GENRE_OPTIONS = [
  { value: "all", label: "전체 장르", icon: Gamepad2 },
  { value: "action", label: "액션/FPS", icon: Sword },
  { value: "rpg", label: "RPG", icon: Wand2 },
  { value: "strategy", label: "전략", icon: Brain }
] as const;

const SORT_OPTIONS = [
  { value: "rank", label: "순위순", icon: Trophy },
  { value: "title", label: "이름순", icon: SortAsc },
  { value: "new", label: "신작순", icon: Sparkles }
] as const;

const TREND_OPTIONS = [
  { value: "hide", label: "랭킹 변화", icon: Activity },
  { value: "daily", label: "일간 변화", icon: TrendingUp },
  { value: "weekly", label: "주간 변화", icon: Calendar },
  { value: "monthly", label: "월간 변화", icon: CalendarDays }
] as const;

type SortType = "rank" | "title" | "new";
type FilterGenreType = "all" | "action" | "rpg" | "strategy";
type ShowTrendType = "hide" | "daily" | "weekly" | "monthly";

export default function AndroidRankingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [games, setGames] = useState<AndroidGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortType>("rank");
  const [filterGenre, setFilterGenre] = useState<FilterGenreType>("all");
  const [showTrend, setShowTrend] = useState<ShowTrendType>("hide");

  // 검색어 디바운싱 (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Android 랭킹 데이터 가져오기 (DB)
  useEffect(() => {
    const fetchAndroidRankings = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("rank_game")
          .select("id, game_title, game_subtitle, image_url, rank, update_when")
          .eq("platform", "android")
          .order("rank", { ascending: true });

        if (error) throw new Error(error.message);

        type RankGameRow = {
          id: number;
          game_title: string;
          game_subtitle: string | null;
          image_url: string | null;
          rank: number;
          update_when: string | null;
        };

        const mapped: AndroidGame[] = ((data as RankGameRow[] | null) || []).map(
          (row, index) => {
            const rankChange = RANK_CHANGE_VALUES[index % RANK_CHANGE_VALUES.length] || 0;

            return {
              id: row.id,
              title: row.game_title,
              subtitle: row.game_subtitle || "",
              img: row.image_url || "/icon/rank_icon/mobile2.jpeg",
              rank: row.rank,
              isNew: NEW_RANK_POSITIONS.includes(row.rank),
              isHot: rankChange >= HOT_THRESHOLD,
              rankChange,
              consecutiveWeeks: row.rank === 1 ? CONSECUTIVE_WEEKS_FOR_FIRST : undefined
            };
          }
        );

        setGames(mapped);
        setLastUpdated(
          data && (data as RankGameRow[])[0]?.update_when
            ? new Date(
                (data as RankGameRow[])[0].update_when as string
              ).toISOString()
            : new Date().toISOString()
        );
      } catch (err) {
        setError("Android 게임 랭킹 데이터를 불러오는 중 오류가 발생했습니다.");
        console.error("Android 게임 랭킹 가져오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndroidRankings();
  }, []);

  const filteredAndSortedItems = useMemo(() => {
    let filtered = games;

    // 검색 필터 (디바운싱된 검색어 사용)
    if (debouncedSearchQuery.trim()) {
      const q = debouncedSearchQuery.trim().toLowerCase();
      filtered = filtered.filter(
        (game) =>
          game.title.toLowerCase().includes(q) ||
          game.subtitle.toLowerCase().includes(q)
      );
    }

    // 장르 필터 (제목 기반)
    if (filterGenre !== "all") {
      const keywords = GENRE_KEYWORDS[filterGenre];
      if (keywords) {
        filtered = filtered.filter((game) => {
          const title = game.title.toLowerCase();
          return keywords.some(keyword => title.includes(keyword));
        });
      }
    }

    // 정렬
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "new":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case "rank":
        default:
          return a.rank - b.rank;
      }
    });

    return sorted;
  }, [games, debouncedSearchQuery, sortBy, filterGenre]);

  if (error) {
    return (
      <div className="bg-slate-900 text-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-4">
              <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">오류가 발생했습니다</h3>
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium py-2 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.15s ease-out;
        }
        .animate-fadeOut {
          animation: fadeOut 0.15s ease-in;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200"></div>
            </div>
            <span className="text-orange-400 text-sm font-medium uppercase tracking-wider">
              Mobile Android Games
            </span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200"></div>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
            Android 게임 랭킹
          </h1>
          <p className="text-lg text-slate-300 font-light mb-2">
            Google Play에서 가장 인기 있는 Android 게임 순위입니다 🤖
          </p>
          <p className="text-sm text-slate-500">
            플레이스토어 순위 · 다운로드 수 · 사용자 리뷰 · 매출 기준
          </p>

          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mt-6 rounded-full"></div>
        </div>

        {/* 필터 및 검색 영역 - 새로운 디자인 */}
        <div className="bg-slate-900/95 border border-slate-700/50 rounded-2xl p-6 space-y-4 mb-8 shadow-lg shadow-black/20">
          {/* 첫 번째 줄: 드롭다운들과 검색창 */}
          <div className="flex items-center justify-between">
            {/* 드롭다운 필터들 */}
            <div className="flex items-center gap-3">
              <StyledGameDropdown
                options={GENRE_OPTIONS}
                value={filterGenre}
                onChange={(value) => setFilterGenre(value as FilterGenreType)}
                placeholder="장르 선택"
              />
              <StyledGameDropdown
                options={SORT_OPTIONS}
                value={sortBy}
                onChange={(value) => setSortBy(value as SortType)}
                placeholder="정렬 기준"
              />
              <StyledGameDropdown
                options={TREND_OPTIONS}
                value={showTrend}
                onChange={(value) => setShowTrend(value as ShowTrendType)}
                placeholder="랭킹 변화"
              />
            </div>

            {/* 검색창 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="게임 제목이나 설명으로 검색..."
                className="bg-slate-800/60 border border-slate-700/50 text-slate-300 pl-10 pr-4 py-2.5 rounded-xl text-sm placeholder-slate-500 focus:border-orange-500/40 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 w-80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* 두 번째 줄: 데이터 제공 정보 */}
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>총 {filteredAndSortedItems.length}개의 게임</span>
            <span className="text-slate-600">·</span>
            {lastUpdated && (
              <>
                <span>마지막 업데이트: {new Date(lastUpdated).toLocaleString("ko-KR")}</span>
                <span className="text-slate-600">·</span>
              </>
            )}
            <span>데이터 제공: <a href="https://play.google.com" className="text-orange-500 hover:text-orange-400 transition-colors">play.google.com</a></span>
            {debouncedSearchQuery && (
              <>
                <span className="text-slate-600">·</span>
                <span className="text-orange-400">&quot;{debouncedSearchQuery}&quot; 검색 결과</span>
              </>
            )}
          </div>
        </div>

        {/* Top 3 게임 특별 표시 */}
        {!loading && filteredAndSortedItems.length > 0 && (
          <TopThreeCards
            items={filteredAndSortedItems
              .filter(item => item.rank <= 3)
              .map(item => ({
                id: item.id,
                rank: item.rank,
                title: item.title,
                subtitle: item.subtitle,
                imageUrl: item.img,
                isNew: item.isNew,
                isHot: item.isHot,
                rankChange: item.rankChange,
                consecutiveWeeks: item.consecutiveWeeks
              }))
            }
          />
        )}

        {/* 나머지 게임 그리드 */}
        <RankingGrid items={filteredAndSortedItems} loading={loading} showTopThree={false} />

      </div>
    </div>
  );
}