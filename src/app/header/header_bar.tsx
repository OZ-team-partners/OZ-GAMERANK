"use client";
import { useState, useEffect } from "react";
import Logo from "./components/Logo";
import SearchBar from "./components/SearchBar";
import Navigation from "./components/Navigation";
import Newsletter from "./components/Newsletter";
import UserMenu from "./components/UserMenu";
import HamburgerMenu from "./components/HamburgerMenu";
import SearchModal from "./components/SearchModal";
import "./styles/responsive.css";

const GameRankHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`bg-slate-900 border-b border-slate-800 sticky top-0 z-50 transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center h-16 justify-between">
          {/* 그룹 1: 로고 & 검색바 */}
          <div className="flex items-center gap-3">
            <Logo />
            <SearchBar />
            <SearchModal />
          </div>
          {/* 그룹 2: 네비게이션 메뉴 (커뮤니티, PC, 콘솔, 모바일) - 1270px 이상에서만 표시 */}
          <div className="navigation-desktop">
            <Navigation />
          </div>
          {/* 그룹 3: 소식통 & 로그인 & 햄버거 메뉴 */}
          <div className="flex items-center gap-4">
            <Newsletter />
            <UserMenu />
            <div className="hamburger-menu">
              <HamburgerMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameRankHeader;
