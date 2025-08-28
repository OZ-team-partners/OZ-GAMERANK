"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import { Gamepad2, Zap, Trophy, Award, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import DropdownItem from "./DropdownItem";

const Navigation = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("");
  const [showPCDropdown, setShowPCDropdown] = useState(false);
  const [showConsoleDropdown, setShowConsoleDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);

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
    <nav className="flex items-center justify-center flex-1 relative">
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
                    (category.name === "Console" && showConsoleDropdown) ||
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
              color: activeCategory === category.name ? "#FFFFFF" : "#CBD5E1",
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
  );
};

export default Navigation;