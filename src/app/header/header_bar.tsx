"use client";

import React, { useState } from "react";
import { Search, User, Trophy, Gamepad2, Zap, Award } from "lucide-react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

const GameRankHeader = () => {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("커뮤니티");
    const [showPCDropdown, setShowPCDropdown] = useState(false);
    const [showConsoleDropdown, setShowConsoleDropdown] = useState(false);
    const [showMobileDropdown, setShowMobileDropdown] = useState(false);

    const categories = [
        { name: "커뮤니티", icon: <Gamepad2 size={16} /> },
        { name: "PC", icon: <Zap size={16} /> },
        { name: "Console", icon: <Trophy size={16} /> },
        { name: "Mobile", icon: <Award size={16} /> },
    ];

    // PC 카테고리 옵션들
    const pcOptions = [
        { name: "온라인 게임", path: "/rank/online", icon: "🌐" },
        { name: "Steam", path: "/rank/steam", icon: "🎮" },
    ];

    // Console 카테고리 옵션들
    const consoleOptions = [
        { name: "PS", path: "/rank/ps", icon: "🎮" },
        { name: "Nintendo", path: "/rank/nintendo", icon: "🎯" },
    ];

    // Mobile 카테고리 옵션들
    const mobileOptions = [
        { name: "iOS", path: "/rank/ios", icon: "📱" },
        { name: "Android", path: "/rank/android", icon: "🤖" },
    ];

    const handleCategoryClick = (categoryName: string) => {
        setActiveCategory(categoryName);
        if (categoryName === "PC") {
            setShowPCDropdown(!showPCDropdown);
            setShowConsoleDropdown(false);
            setShowMobileDropdown(false);
        } else if (categoryName === "Console") {
            setShowConsoleDropdown(!showConsoleDropdown);
            setShowPCDropdown(false);
            setShowMobileDropdown(false);
        } else if (categoryName === "Mobile") {
            setShowMobileDropdown(!showMobileDropdown);
            setShowPCDropdown(false);
            setShowConsoleDropdown(false);
        } else {
            setShowPCDropdown(false);
            setShowConsoleDropdown(false);
            setShowMobileDropdown(false);
        }
    };

    return (
        <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16 gap-6">
                    {/* 좌측: 로고 & 브랜드 */}
                    <div className="flex items-center space-x-4 flex-shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Trophy className="text-white" size={20} />
                        </div>
                        <span className="text-3xl font-bangers bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                            GAME RAN
                            <span style={{ marginRight: "0.25rem" }}>K</span>
                        </span>
                    </div>

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
                            <div key={category.name} className="relative">
                                <Button
                                    onClick={() =>
                                        handleCategoryClick(category.name)
                                    }
                                    variant="text"
                                    startIcon={category.icon}
                                    sx={{
                                        minWidth: 96,
                                        height: 40,
                                        borderRadius: 2,
                                        textTransform: "none",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        marginRight:
                                            index < categories.length - 1
                                                ? 2
                                                : 0,
                                        color:
                                            activeCategory === category.name
                                                ? "#6366F1"
                                                : "#CBD5E1",
                                        backgroundColor:
                                            activeCategory === category.name
                                                ? "rgba(99, 102, 241, 0.2)"
                                                : "transparent",
                                        "&:hover": {
                                            backgroundColor:
                                                activeCategory === category.name
                                                    ? "rgba(99, 102, 241, 0.3)"
                                                    : "rgba(148, 163, 184, 0.1)",
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
                                    <div className="absolute top-full left-0 mt-2 w-56 z-50">
                                        <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-xl">
                                            <div className="p-3">
                                                {pcOptions.map((option) => (
                                                    <Link 
                                                    key={option.name}
                                                    href={option.path}>
                                                        <button
                                                            className="
                                                                w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                                                                hover:bg-indigo-50 hover:border-indigo-200
                                                                transition-all duration-200
                                                                group text-left border border-transparent
                                                            "
                                                        >
                                                            <span className="text-lg">
                                                                {option.icon}
                                                            </span>
                                                            <span className="text-slate-700 group-hover:text-slate-900 font-medium">
                                                                {option.name}
                                                            </span>
                                                        </button>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Console 드롭다운 */}
                                {category.name === "Console" &&
                                    showConsoleDropdown && (
                                        <div className="absolute top-full left-0 mt-2 w-56 z-50">
                                            <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-xl">
                                                <div className="p-3">
                                                    {consoleOptions.map(
                                                        (option) => (
                                                            <button
                                                                key={
                                                                    option.name
                                                                }
                                                                className="
                                                            w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                                                            hover:bg-indigo-50 hover:border-indigo-200
                                                            transition-all duration-200
                                                            group text-left border border-transparent
                                                        "
                                                            >
                                                                <span className="text-lg">
                                                                    {
                                                                        option.icon
                                                                    }
                                                                </span>
                                                                <span className="text-slate-700 group-hover:text-slate-900 font-medium">
                                                                    {
                                                                        option.name
                                                                    }
                                                                </span>
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                {/* Mobile 드롭다운 */}
                                {category.name === "Mobile" &&
                                    showMobileDropdown && (
                                        <div className="absolute top-full left-0 mt-2 w-56 z-50">
                                            <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-xl">
                                                <div className="p-3">
                                                    {mobileOptions.map(
                                                        (option) => (
                                                            <button
                                                                key={
                                                                    option.name
                                                                }
                                                                className="
                                                            w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                                                            hover:bg-indigo-50 hover:border-indigo-200
                                                            transition-all duration-200
                                                            group text-left border border-transparent
                                                        "
                                                            >
                                                                <span className="text-lg">
                                                                    {
                                                                        option.icon
                                                                    }
                                                                </span>
                                                                <span className="text-slate-700 group-hover:text-slate-900 font-medium">
                                                                    {
                                                                        option.name
                                                                    }
                                                                </span>
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        ))}
                    </nav>

                    {/* 우측: 로그인 */}
                    <div className="flex items-center flex-shrink-0">
                        <button
                            onClick={() => router.push("/login")}
                            className="
                            flex items-center space-x-2 px-4 py-2 
                            bg-gradient-to-r from-indigo-500 to-purple-600 
                            text-white rounded-lg font-medium text-sm
                            hover:from-indigo-600 hover:to-purple-700
                            transform hover:scale-105 transition-all duration-200
                            shadow-lg hover:shadow-indigo-500/25
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
