"use client";

import React, { useState, useEffect, FormEvent } from "react";
import {
  Search,
  User,
  Trophy,
  Gamepad2,
  Zap,
  Award,
  ChevronDown,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

// DropdownItem 컴포넌트 그대로 유지
const DropdownItem = ({
  title,
  description,
  path,
  onClick,
  isLast = false,
}: {
  title: string;
  description: string;
  path: string;
  onClick?: () => void;
  isLast?: boolean;
}) => (
  <Link
    href={path}
    style={{ display: "block", marginBottom: isLast ? "0" : "8px" }}
  >
    <div
      onClick={onClick}
      className="group p-4 rounded-xl hover:bg-slate-50/80 transition-all duration-150 
                       border border-transparent hover:border-slate-200/60 cursor-pointer
                       hover:shadow-md backdrop-blur-sm"
    >
      <div className="flex-1">
        <h4 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors text-base">
          {title}
        </h4>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed font-semibold">
          {description}
        </p>
      </div>
    </div>
  </Link>
);

const GameRankHeader = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("");
  const [showPCDropdown, setShowPCDropdown] = useState(false);
  const [showConsoleDropdown, setShowConsoleDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [showNewsletterDropdown, setShowNewsletterDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // 🔎 검색 상태 추가
  const [searchTerm, setSearchTerm] = useState("");

  // AuthContext에서 사용자 상태 가져오기
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest("[data-dropdown]")) {
        setShowPCDropdown(false);
        setShowConsoleDropdown(false);
        setShowMobileDropdown(false);
        setShowNewsletterDropdown(false);
        setShowProfileDropdown(false);
        setActiveCategory("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🔎 구글 검색 핸들러
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const query = encodeURIComponent(searchTerm.trim());
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
  };

  // 로그아웃 핸들러
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
      setShowProfileDropdown(false);
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };

  const categories = [
    {
      name: "Community",
      icon: <Gamepad2 size={16} />,
      path: "/community/board",
    },
    { name: "PC", icon: <Zap size={16} /> },
    { name: "Console", icon: <Trophy size={16} /> },
    { name: "Mobile", icon: <Award size={16} /> },
  ];

  // PC 카테고리 옵션들
  const pcOptions = [
    {
      name: "🌐 온라인 게임",
      path: "/rank/pc/online",
      description: "실시간 멀티플레이어 게임 순위",
    },
    {
      name: "⚡ Steam",
      path: "/rank/pc/steam",
      description: "스팀 플랫폼 인기 게임 랭킹",
    },
  ];

  // Console 카테고리 옵션들
  const consoleOptions = [
    {
      name: "🟦 PlayStation",
      path: "/rank/console/playStation",
      description: "플레이스테이션 독점 게임들",
    },
    {
      name: "🔴 Nintendo",
      path: "/rank/console/nintendo",
      description: "닌텐도 스위치 인기 타이틀",
    },
  ];

  // Mobile 카테고리 옵션들
  const mobileOptions = [
    {
      name: "🍎 iOS",
      path: "/rank/mobile/ios",
      description: "아이폰 앱스토어 순위",
    },
    {
      name: "🤖 Android",
      path: "/rank/mobile/android",
      description: "구글 플레이스토어 순위",
    },
  ];

  // Newsletter 옵션들
  const newsletterOptions = [
    {
      name: "📰 8월 게임 뉴스",
      path: "/blog/newsletter",
      description: "이달의 핫한 게임 소식과 업데이트",
    },
    {
      name: "🎮 신작 게임 정보",
      path: "/blog/newsletter",
      description: "출시 예정 게임과 트레일러 모음",
    },
    {
      name: "🏆 랭킹 분석",
      path: "/blog/newsletter",
      description: "게임 순위 변동과 트렌드 분석",
    },
  ];

  const handleCategoryClick = (categoryName: string) => {
    if (categoryName === "Community") {
      router.push("/community/board");
      return;
    }

    if (categoryName === "PC") {
      if (showPCDropdown) {
        setShowPCDropdown(false);
        setActiveCategory("");
      } else {
        setShowPCDropdown(true);
        setActiveCategory("PC");
      }
      setShowConsoleDropdown(false);
      setShowMobileDropdown(false);
    } else if (categoryName === "Console") {
      if (showConsoleDropdown) {
        setShowConsoleDropdown(false);
        setActiveCategory("");
      } else {
        setShowConsoleDropdown(true);
        setActiveCategory("Console");
      }
      setShowPCDropdown(false);
      setShowMobileDropdown(false);
    } else if (categoryName === "Mobile") {
      if (showMobileDropdown) {
        setShowMobileDropdown(false);
        setActiveCategory("");
      } else {
        setShowMobileDropdown(true);
        setActiveCategory("Mobile");
      }
      setShowPCDropdown(false);
      setShowConsoleDropdown(false);
    } else {
      setShowPCDropdown(false);
      setShowConsoleDropdown(false);
      setShowMobileDropdown(false);
      setActiveCategory("");
    }
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center h-16 justify-between">
          {/* 그룹 1: 로고 &  바 */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center space-x-3 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-200 -ml-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Trophy className="text-white" size={20} />
              </div>
              <span className="text-2xl font-bangers bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                GAME RAN
                <span style={{ marginRight: "0.25rem" }}>K</span>
              </span>
            </Link>
            <div className="relative w-48">
              <form onSubmit={handleSearch}>
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-300 z-10"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="게임 검색"
                  aria-label="게임 및 랭킹 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="
                w-full pl-9 pr-16 py-2 
                bg-slate-800/80 border border-slate-700/60 rounded-lg
                text-slate-300 placeholder-slate-500 text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50
                focus:shadow-sm focus:shadow-indigo-500/10 focus:bg-slate-800
                transition-all duration-150 ease-out
                backdrop-blur-sm
            "
                />
                <button
                  type="submit"
                  className="
                absolute right-1 top-1/2 transform -translate-y-1/2
                bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold
                px-3 py-1 rounded
                transition-colors duration-150
            "
                >
                  검색
                </button>
              </form>
            </div>
          </div>
          {/* 그룹 2: 네비게이션 메뉴 (커뮤니티, PC, 콘솔, 모바일) */}
          <nav className="flex items-center justify-center flex-1 relative ">
            {categories.map((category) => (
              <div key={category.name} className="relative" data-dropdown>
                <Button
                  onClick={() => handleCategoryClick(category.name)}
                  variant="text"
                  aria-label={`${category.name} 카테고리${
                    category.name !== "Community" ? " 메뉴 열기" : "로 이동"
                  }`}
                  startIcon={category.icon}
                  endIcon={
                    category.name === "PC" ||
                    category.name === "Console" ||
                    category.name === "Mobile" ? (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-150 ${
                          (category.name === "PC" && showPCDropdown) ||
                          (category.name === "Console" &&
                            showConsoleDropdown) ||
                          (category.name === "Mobile" && showMobileDropdown)
                            ? "rotate-180"
                            : "rotate-0"
                        }`}
                      />
                    ) : null
                  }
                  sx={{
                    width: 130,
                    height: 40,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                    paddingX: 3,
                    marginRight: 1,
                    color:
                      activeCategory === category.name ? "#FFFFFF" : "#CBD5E1",
                    backgroundColor:
                      activeCategory === category.name
                        ? "rgba(148, 163, 184, 0.1)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(148, 163, 184, 0.12)",
                      color: "#FFFFFF",
                    },
                    "& .MuiTouchRipple-root": {
                      color: "rgba(99, 102, 241, 0.4)",
                    },
                    transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {category.name}
                </Button>

                {/* PC 드롭다운 */}
                {category.name === "PC" && showPCDropdown && (
                  <div
                    className="absolute top-full left-0 mt-3 w-80 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
                    data-dropdown
                  >
                    <div className="bg-white/98 backdrop-blur-xl border border-slate-200/40 rounded-2xl shadow-lg overflow-hidden ring-1 ring-slate-900/5">
                      <div className="p-2">
                        {pcOptions.map((option, index) => (
                          <DropdownItem
                            key={option.name}
                            title={option.name}
                            description={option.description}
                            path={option.path}
                            isLast={index === pcOptions.length - 1}
                            onClick={() => setShowPCDropdown(false)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Console 드롭다운 */}
                {category.name === "Console" && showConsoleDropdown && (
                  <div
                    className="absolute top-full left-0 mt-3 w-80 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
                    data-dropdown
                  >
                    <div className="bg-white/98 backdrop-blur-xl border border-slate-200/40 rounded-2xl shadow-lg overflow-hidden ring-1 ring-slate-900/5">
                      <div className="p-2">
                        {consoleOptions.map((option, index) => (
                          <DropdownItem
                            key={option.name}
                            title={option.name}
                            description={option.description}
                            path={option.path}
                            isLast={index === consoleOptions.length - 1}
                            onClick={() => setShowConsoleDropdown(false)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile 드롭다운 */}
                {category.name === "Mobile" && showMobileDropdown && (
                  <div
                    className="absolute top-full left-0 mt-3 w-80 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
                    data-dropdown
                  >
                    <div className="bg-white/98 backdrop-blur-xl border border-slate-200/40 rounded-2xl shadow-lg overflow-hidden ring-1 ring-slate-900/5">
                      <div className="p-2">
                        {mobileOptions.map((option, index) => (
                          <DropdownItem
                            key={option.name}
                            title={option.name}
                            description={option.description}
                            path={option.path}
                            isLast={index === mobileOptions.length - 1}
                            onClick={() => setShowMobileDropdown(false)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          {/* 그룹 3: 소식통 & 로그인 */}
          <div className="flex items-center gap-4">
            {/* Level Up! 소식통 드롭다운 */}
            <div className="relative" data-dropdown>
              <button
                onClick={() =>
                  setShowNewsletterDropdown(!showNewsletterDropdown)
                }
                aria-label="Level Up! 소식통 메뉴 열기"
                className="
                                    flex items-center space-x-2 px-4 py-2 
                                    bg-gradient-to-r from-green-600 to-emerald-600 
                                    text-white rounded-lg font-semibold text-sm
                                    hover:from-green-700 hover:to-emerald-700
                                    transition-all duration-150 ease-out
                                    shadow-md hover:shadow-lg hover:shadow-green-500/15
                                    cursor-pointer backdrop-blur-sm
                                "
              >
                <span>📧</span>
                <span>Level Up! 소식통</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-150 ${
                    showNewsletterDropdown ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Newsletter 드롭다운 */}
              {showNewsletterDropdown && (
                <div
                  className="absolute top-full right-0 mt-3 w-80 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
                  data-dropdown
                >
                  <div className="bg-white/98 backdrop-blur-xl border border-slate-200/40 rounded-2xl shadow-lg overflow-hidden ring-1 ring-slate-900/5">
                    <div className="p-2">
                      {newsletterOptions.map((option, index) => (
                        <DropdownItem
                          key={option.name}
                          title={option.name}
                          description={option.description}
                          path={option.path}
                          isLast={index === newsletterOptions.length - 1}
                          onClick={() => setShowNewsletterDropdown(false)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 로그인/프로필 버튼 */}
            {loading ? (
              <div className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-slate-400 rounded-lg text-sm">
                <User size={16} />
                <span>로딩중...</span>
              </div>
            ) : user ? (
              // 로그인된 사용자 - 프로필 드롭다운
              <div className="relative" data-dropdown>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  aria-label="프로필 메뉴 열기"
                  className="
                    flex items-center space-x-2 px-4 py-2 
                    bg-gradient-to-r from-emerald-600 to-teal-600 
                    text-white rounded-lg font-semibold text-sm
                    hover:from-emerald-700 hover:to-teal-700
                    transition-all duration-150 ease-out
                    shadow-md hover:shadow-lg hover:shadow-emerald-500/15
                    cursor-pointer backdrop-blur-sm
                  "
                >
                  <User size={16} />
                  <span>{user.user_metadata?.username || user.email?.split('@')[0] || '사용자'}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-150 ${
                      showProfileDropdown ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {/* 프로필 드롭다운 메뉴 */}
                {showProfileDropdown && (
                  <div
                    className="absolute top-full right-0 mt-3 w-56 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
                    data-dropdown
                  >
                    <div className="bg-white/98 backdrop-blur-xl border border-slate-200/40 rounded-2xl shadow-lg overflow-hidden ring-1 ring-slate-900/5">
                      <div className="p-2">
                        <div className="px-4 py-3 border-b border-slate-200/60">
                          <p className="text-sm font-semibold text-slate-900">
                            {user.user_metadata?.username || '사용자'}
                          </p>
                          <p className="text-xs text-slate-600 truncate">
                            {user.email}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => {
                            router.push('/profile');
                            setShowProfileDropdown(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors rounded-xl"
                        >
                          <Settings size={16} className="text-slate-500" />
                          <span className="text-sm font-medium text-slate-700">프로필 설정</span>
                        </button>
                        
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors rounded-xl"
                        >
                          <LogOut size={16} className="text-red-500" />
                          <span className="text-sm font-medium text-red-700">로그아웃</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // 비로그인 사용자 - 로그인 버튼
              <button
                onClick={() => router.push("/auth/login")}
                aria-label="로그인 페이지로 이동"
                className="
                  flex items-center space-x-2 px-4 py-2 
                  bg-gradient-to-r from-indigo-600 to-blue-600 
                  text-white rounded-lg font-semibold text-sm
                  hover:from-indigo-700 hover:to-blue-700
                  transition-all duration-150 ease-out
                  shadow-md hover:shadow-lg hover:shadow-indigo-500/15
                  cursor-pointer backdrop-blur-sm
                "
              >
                <User size={16} />
                <span>로그인</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameRankHeader;
