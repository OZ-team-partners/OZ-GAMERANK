"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { Gamepad2, Zap, Trophy, Award, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import DropdownItem from "./DropdownItem";
import { Category, DropdownOption } from "../types";

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const categories: Category[] = [
    {
      name: "Community",
      icon: <Gamepad2 size={16} />,
      path: "/community",
    },
    { name: "PC", icon: <Zap size={16} /> },
    { name: "Console", icon: <Trophy size={16} /> },
    { name: "Mobile", icon: <Award size={16} /> },
  ];

  const pcOptions: DropdownOption[] = [
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

  const consoleOptions: DropdownOption[] = [
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

  const mobileOptions: DropdownOption[] = [
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

  // 외부 클릭시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      let clickedInside = false;

      // 드롭다운 영역 클릭 확인
      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && ref.contains(target)) {
          clickedInside = true;
        }
      });

      if (!clickedInside) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 경로 변경시 드롭다운 닫기
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  const handleCategoryClick = (categoryName: string) => {
    if (categoryName === "Community") {
      router.push("/community");
      return;
    }

    if (openDropdown === categoryName) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(categoryName);
    }
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const getDropdownOptions = (categoryName: string) => {
    switch (categoryName) {
      case "PC": return pcOptions;
      case "Console": return consoleOptions;
      case "Mobile": return mobileOptions;
      default: return [];
    }
  };

  return (
    <nav className="flex items-center justify-center flex-1 relative">
      {categories.map((category) => (
        <div 
          key={category.name} 
          className="relative"
          ref={(el) => {
            dropdownRefs.current[category.name] = el;
          }}
        >
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
                    openDropdown === category.name ? "rotate-180" : "rotate-0"
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
              color: openDropdown === category.name ? "#FFFFFF" : "#CBD5E1",
              backgroundColor:
                openDropdown === category.name
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

          {/* 드롭다운 메뉴 */}
          {openDropdown === category.name && getDropdownOptions(category.name).length > 0 && (
            <div className="absolute top-full mt-3 w-80 z-50">
              <div className="bg-white/98 backdrop-blur-xl border border-slate-200/40 rounded-2xl shadow-lg overflow-hidden ring-1 ring-slate-900/5">
                <div className="p-2">
                  {getDropdownOptions(category.name).map((option, index) => (
                    <DropdownItem
                      key={option.name}
                      title={option.name}
                      description={option.description}
                      path={option.path}
                      isLast={index === getDropdownOptions(category.name).length - 1}
                      onClick={closeDropdown}
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