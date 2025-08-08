"use client";

import React, { useState } from "react";
import { Search, User, Trophy, Gamepad2, Zap, Award } from "lucide-react";
import { Button } from "@mui/material";

const GameRankHeader = () => {
  const [activeCategory, setActiveCategory] = useState("커뮤니티");

  const categories = [
    { name: "커뮤니티", icon: <Gamepad2 size={16} /> },
    { name: "PC", icon: <Zap size={16} /> },
    { name: "Console", icon: <Trophy size={16} /> },
    { name: "Mobile", icon: <Award size={16} /> },
  ];

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
              GAME RAN<span style={{ marginRight: "0.25rem" }}>K</span>
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
          <nav className="flex items-center flex-1">
            {categories.map((category, index) => (
              <Button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                variant="text"
                startIcon={category.icon}
                sx={{
                  minWidth: 96,
                  height: 40,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "14px",
                  fontWeight: 500,
                  marginRight: index < categories.length - 1 ? 2 : 0,
                  color:
                    activeCategory === category.name ? "#6366F1" : "#CBD5E1",
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
            ))}
          </nav>

          {/* 우측: 로그인 */}
          <div className="flex items-center flex-shrink-0">
            <button
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
              <span>Sign in</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameRankHeader;
