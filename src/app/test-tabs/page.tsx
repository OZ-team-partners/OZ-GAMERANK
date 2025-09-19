"use client";

import React, { useState } from "react";
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
  Filter,
  Activity,
  Search
} from "lucide-react";

// 사이트 톤앤매너에 맞춘 게이밍 드롭다운 컴포넌트
function StyledGameDropdown({ options, value, onChange, placeholder }: {
  options: Array<{value: string, label: string, icon: React.ComponentType<{ className?: string }>}>;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const currentOption = options.find(opt => opt.value === value);

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
            <Filter className="w-4 h-4 text-slate-400 group-hover:text-orange-400 transition-colors" />
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
            onClick={() => setIsOpen(false)}
          />

          {/* 드롭다운 메뉴 */}
          <div className="absolute top-full mt-2 left-0 bg-slate-900/95 border border-slate-700/50 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-20 min-w-full animate-fadeIn">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
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

// 랭킹 페이지 스타일 필터 컴포넌트
function RankingFilters() {
  const [activeGenre, setActiveGenre] = useState("all");
  const [activeSortBy, setActiveSortBy] = useState("rank");
  const [activeTrend, setActiveTrend] = useState("hide");

  const genreOptions = [
    { value: "all", label: "전체 장르", icon: Gamepad2 },
    { value: "action", label: "액션/FPS", icon: Sword },
    { value: "rpg", label: "RPG", icon: Wand2 },
    { value: "strategy", label: "전략", icon: Brain }
  ];

  const sortOptions = [
    { value: "rank", label: "순위순", icon: Trophy },
    { value: "title", label: "이름순", icon: SortAsc },
    { value: "new", label: "신작순", icon: Sparkles }
  ];

  const trendOptions = [
    { value: "hide", label: "랭킹 변화 추이", icon: Activity },
    { value: "daily", label: "일간 변화", icon: TrendingUp },
    { value: "weekly", label: "주간 변화", icon: Calendar },
    { value: "monthly", label: "월간 변화", icon: CalendarDays }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* 헤더 섹션 */}
      <div className="text-center py-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/10" />
        <p className="text-orange-500 font-semibold text-sm mb-2 tracking-wider">● ● ● PC ONLINE GAMES ● ● ●</p>
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-2">
          Online 게임 랭킹
        </h1>
        <p className="text-slate-400 text-sm">
          PC에서 가장 인기 있는 Online 게임 순위입니다 🎮
        </p>
        <p className="text-slate-500 text-xs mt-2">
          포털 트렌드 · PC방 점속 · 게임방송 시청자 · 메타 유저 투표 기준
        </p>

      </div>

      {/* 필터 섹션 - 수평 레이아웃 */}
      <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6 space-y-4">
        {/* 첫 번째 줄: 드롭다운들과 검색창 */}
        <div className="flex items-center justify-between">
          {/* 드롭다운 필터들 */}
          <div className="flex items-center gap-3">
            <StyledGameDropdown
              options={genreOptions}
              value={activeGenre}
              onChange={setActiveGenre}
              placeholder="장르 선택"
            />
            <StyledGameDropdown
              options={sortOptions}
              value={activeSortBy}
              onChange={setActiveSortBy}
              placeholder="정렬 기준"
            />
            <StyledGameDropdown
              options={trendOptions}
              value={activeTrend}
              onChange={setActiveTrend}
              placeholder="변화 추이"
            />
          </div>

          {/* 검색창 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="게임 제목이나 설명으로 검색..."
              className="bg-slate-800/60 border border-slate-700/50 text-slate-300 pl-10 pr-4 py-2.5 rounded-xl text-sm placeholder-slate-500 focus:border-orange-500/40 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 w-80"
            />
          </div>
        </div>

        {/* 두 번째 줄: 데이터 제공 정보 */}
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span>총 50개의 게임</span>
          <span className="text-slate-600">·</span>
          <span>마지막 업데이트: 2025. 9. 17. 오후 3:06:27</span>
          <span className="text-slate-600">·</span>
          <span>데이터 제공: <a href="https://gamemeca.com" className="text-orange-500 hover:text-orange-400 transition-colors">gamemeca.com</a></span>
        </div>
      </div>
    </div>
  );
}

export default function TestTabsPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-8">
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
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>

      <RankingFilters />
    </div>
  );
}