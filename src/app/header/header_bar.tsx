"use client";

import React, { useState, useEffect } from "react";
import Logo from "./components/Logo";
import SearchBar from "./components/SearchBar";
import Navigation from "./components/Navigation";
import Newsletter from "./components/Newsletter";
import UserMenu from "./components/UserMenu";

const GameRankHeader = () => {


  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center h-16 justify-between">
          {/* 그룹 1: 로고 & 검색바 */}
          <div className="flex items-center gap-3">
            <Logo />
            <SearchBar />
          </div>
          {/* 그룹 2: 네비게이션 메뉴 (커뮤니티, PC, 콘솔, 모바일) */}
          <Navigation />
          {/* 그룹 3: 소식통 & 로그인 */}
          <div className="flex items-center gap-4">
            <Newsletter />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameRankHeader;
