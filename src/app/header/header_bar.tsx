"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  User,
  Trophy,
  Gamepad2,
  Zap,
  Award,
  ChevronDown,
} from "lucide-react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DropdownItem = ({
  title,
  description,
  path,
  onClick,
}: {
  title: string;
  description: string;
  path: string;
  onClick?: () => void;
}) => (
  <Link href={path}>
    <div
      onClick={onClick}
      className="group p-4 rounded-xl hover:bg-slate-100 transition-all duration-200 
                       border border-transparent hover:border-slate-200 cursor-pointer
                       hover:shadow-sm"
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest("[data-dropdown]")) {
        setShowPCDropdown(false);
        setShowConsoleDropdown(false);
        setShowMobileDropdown(false);
        setActiveCategory("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const categories = [
    { name: "Community", icon: <Gamepad2 size={16} /> },
    { name: "PC", icon: <Zap size={16} /> },
    { name: "Console", icon: <Trophy size={16} /> },
    { name: "Mobile", icon: <Award size={16} /> },
  ];

  // PC 카테고리 옵션들
  const pcOptions = [
    {
      name: "온라인 게임",
      path: "/rank/online",
      icon: "🌐",
      description: "실시간 멀티플레이어 게임 순위",
    },
    {
      name: "Steam",
      path: "/rank/steam",
      icon: "🎮",
      description: "스팀 플랫폼 인기 게임 랭킹",
    },
  ];

  // Console 카테고리 옵션들
  const consoleOptions = [
    {
      name: "PS",
      path: "/rank/ps",
      icon: "🎮",
      description: "플레이스테이션 독점 게임들",
    },
    {
      name: "Nintendo",
      path: "/rank/nintendo",
      icon: "🎯",
      description: "닌텐도 스위치 인기 타이틀",
    },
  ];

  // Mobile 카테고리 옵션들
  const mobileOptions = [
    {
      name: "iOS",
      path: "/rank/ios",
      icon: "📱",
      description: "아이폰 앱스토어 순위",
    },
    {
      name: "Android",
      path: "/rank/android",
      icon: "🤖",
      description: "구글 플레이스토어 순위",
    },
  ];

  const handleCategoryClick = (categoryName: string) => {
    if (categoryName === "Community") {
      router.push("/community/board");
      setShowPCDropdown(false);
      setShowConsoleDropdown(false);
      setShowMobileDropdown(false);
      setActiveCategory("");
    } else if (categoryName === "PC") {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-6">
          {/* 좌측: 로고 & 브랜드 */}
          <Link
            href="/"
            className="flex items-center space-x-4 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Trophy className="text-white" size={20} />
            </div>
            <span className="text-3xl font-bangers bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              GAME RAN
              <span style={{ marginRight: "0.25rem" }}>K</span>
            </span>
          </Link>
          {/* 검색바 */}
          <div className="flex items-center relative">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search games, rankings..."
                className="
                                        w-70 pl-9 pr-4 py-2 
                                        bg-slate-800 border border-slate-700 rounded-lg
                                        text-slate-300 placeholder-slate-500 text-sm
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                        transition-all duration-200
                                        "
              />
            </div>
          </div>
          {/* 중앙: 네비게이션 */}
          <nav className="flex items-center flex-1 relative">
            {categories.map((category, index) => (
              <div key={category.name} className="relative" data-dropdown>
                <Button
                  onClick={() => handleCategoryClick(category.name)}
                  variant="text"
                  startIcon={category.icon}
                  endIcon={
                    category.name === "PC" ||
                    category.name === "Console" ||
                    category.name === "Mobile" ? (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
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
                    fontWeight: 500,
                    paddingX: 3,
                    marginRight: index < categories.length - 1 ? 2 : 0,
                    color:
                      activeCategory === category.name ? "#FFFFFF" : "#CBD5E1",
                    backgroundColor:
                      activeCategory === category.name
                        ? "rgba(148, 163, 184, 0.1)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(148, 163, 184, 0.1)",
                      color: "#FFFFFF",
                    },
                    "& .MuiTouchRipple-root": {
                      color: "rgba(99, 102, 241, 0.5)",
                    },
                  }}
                >
                  {category.name}
                </Button>

                {/* PC 드롭다운 */}
                {category.name === "PC" && showPCDropdown && (
                  <div
                    className="absolute top-full left-0 mt-2 w-80 z-50"
                    data-dropdown
                  >
                    <div className="bg-white/95 backdrop-blur-md border border-slate-200/50 rounded-2xl shadow-2xl overflow-hidden">
                      <div className="p-2">
                        {pcOptions.map((option) => (
                          <DropdownItem
                            key={option.name}
                            title={option.name}
                            description={option.description}
                            path={option.path}
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
                    className="absolute top-full left-0 mt-2 w-80 z-50"
                    data-dropdown
                  >
                    <div className="bg-white/95 backdrop-blur-md border border-slate-200/50 rounded-2xl shadow-2xl overflow-hidden">
                      <div className="p-2">
                        {consoleOptions.map((option) => (
                          <DropdownItem
                            key={option.name}
                            title={option.name}
                            description={option.description}
                            path={option.path}
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
                    className="absolute top-full left-0 mt-2 w-80 z-50"
                    data-dropdown
                  >
                    <div className="bg-white/95 backdrop-blur-md border border-slate-200/50 rounded-2xl shadow-2xl overflow-hidden">
                      <div className="p-2">
                        {mobileOptions.map((option) => (
                          <DropdownItem
                            key={option.name}
                            title={option.name}
                            description={option.description}
                            path={option.path}
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
          ㄴ{/* 우측: 로그인 */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => router.push("/auth/login")}
              className="
                            flex items-center space-x-2 px-4 py-2 
                            bg-gradient-to-r from-indigo-500 to-purple-600 
                            text-white rounded-lg font-medium text-sm
                            hover:from-indigo-600 hover:to-purple-700
                            transform hover:scale-105 transition-all duration-200
                            shadow-lg hover:shadow-indigo-500/25
                            cursor-pointer
            "
            >
              <User size={16} />
              <span>로그인</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameRankHeader;
