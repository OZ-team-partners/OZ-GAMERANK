"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { Gamepad2, Zap, Trophy, Award, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import DropdownItem from "./DropdownItem";
import { Category, DropdownOption } from "../types";

const Navigation = () => {
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

  // 카테고리별 색상 테마 매핑 (DropdownItem에 전달되는 Tailwind 클래스)
  const colorThemes: Record<
    string,
    {
      itemHoverFromClass: string;
      itemHoverToClass: string;
      itemBorderHoverClass: string;
      titleHoverClass: string;
      arrowColorClass: string;
      panelBorderClass: string; // 드롭다운 패널 외곽선 색
    }
  > = {
    Community: {
      itemHoverFromClass: "hover:from-emerald-900/30",
      itemHoverToClass: "hover:to-teal-900/30",
      itemBorderHoverClass: "hover:border-emerald-500/40",
      titleHoverClass: "group-hover:text-emerald-300",
      arrowColorClass: "text-emerald-400",
      panelBorderClass: "border-emerald-500/30",
    },
    PC: {
      itemHoverFromClass: "hover:from-indigo-900/30",
      itemHoverToClass: "hover:to-blue-900/30",
      itemBorderHoverClass: "hover:border-indigo-500/40",
      titleHoverClass: "group-hover:text-indigo-300",
      arrowColorClass: "text-indigo-400",
      panelBorderClass: "border-indigo-500/30",
    },
    Console: {
      itemHoverFromClass: "hover:from-purple-900/30",
      itemHoverToClass: "hover:to-fuchsia-900/30",
      itemBorderHoverClass: "hover:border-purple-500/40",
      titleHoverClass: "group-hover:text-purple-300",
      arrowColorClass: "text-purple-400",
      panelBorderClass: "border-purple-500/30",
    },
    Mobile: {
      itemHoverFromClass: "hover:from-rose-900/30",
      itemHoverToClass: "hover:to-orange-900/30",
      itemBorderHoverClass: "hover:border-rose-500/40",
      titleHoverClass: "group-hover:text-rose-300",
      arrowColorClass: "text-rose-400",
      panelBorderClass: "border-rose-500/30",
    },
  };

  const communityOptions: DropdownOption[] = [
    {
      name: "Community",
      path: "/community",
      description: "게임을 주제로 친해져보아요",
    },
    {
      name: "Level Up! 소식통",
      path: "/blog/newsletter",
      description: "개발팀이 전하는 게임 news",
    },
  ];

  const pcOptions: DropdownOption[] = [
    {
      name: "온라인 게임",
      path: "/rank/pc/online",
      description: "실시간 멀티플레이어 게임 순위",
    },
    {
      name: "Steam",
      path: "/rank/pc/steam",
      description: "스팀 플랫폼 인기 게임 랭킹",
    },
  ];

  const consoleOptions: DropdownOption[] = [
    {
      name: "Nintendo",
      path: "/rank/console/nintendo",
      description: "닌텐도 스위치 인기 타이틀",
    },
    {
      name: "PlayStation",
      path: "/rank/console/playStation",
      description: "플레이스테이션 독점 게임들",
    },
  ];

  const mobileOptions: DropdownOption[] = [
    {
      name: "iOS",
      path: "/rank/mobile/ios",
      description: "아이폰 앱스토어 순위",
    },
    {
      name: "Android",
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 경로 변경시 드롭다운 닫기
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  const handleCategoryClick = (categoryName: string) => {
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
      case "Community":
        return communityOptions;
      case "PC":
        return pcOptions;
      case "Console":
        return consoleOptions;
      case "Mobile":
        return mobileOptions;
      default:
        return [];
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
            aria-label={`${category.name} 카테고리 메뉴 열기`}
            startIcon={category.icon}
            endIcon={
              <ChevronDown
                size={14}
                className={`transition-transform duration-150 ${
                  openDropdown === category.name ? "rotate-180" : "rotate-0"
                }`}
              />
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
          {openDropdown === category.name &&
            getDropdownOptions(category.name).length > 0 && (
              <div className="absolute top-full mt-3 w-80 z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                <div className="relative">
                  <div
                    className={`relative bg-gradient-to-br from-slate-800/95 via-slate-850/95 to-slate-900/95 backdrop-blur-xl border ${
                      colorThemes[category.name]?.panelBorderClass ??
                      "border-purple-500/30"
                    } rounded-2xl shadow-2xl overflow-hidden`}
                  >
                    <div className="p-3">
                      {getDropdownOptions(category.name).map(
                        (option, index) => (
                          <DropdownItem
                            key={option.name}
                            title={option.name}
                            description={option.description}
                            path={option.path}
                            isLast={
                              index ===
                              getDropdownOptions(category.name).length - 1
                            }
                            onClick={closeDropdown}
                            itemHoverFromClass={
                              colorThemes[category.name]?.itemHoverFromClass
                            }
                            itemHoverToClass={
                              colorThemes[category.name]?.itemHoverToClass
                            }
                            itemBorderHoverClass={
                              colorThemes[category.name]?.itemBorderHoverClass
                            }
                            titleHoverClass={
                              colorThemes[category.name]?.titleHoverClass
                            }
                            arrowColorClass={
                              colorThemes[category.name]?.arrowColorClass
                            }
                          />
                        )
                      )}
                    </div>
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
