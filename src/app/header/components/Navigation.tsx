"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@mui/material";
import { Gamepad2, Zap, Trophy, Award, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import DropdownItem from "./DropdownItem";
import { useDropdown } from "../hooks/useDropdown";
import { Category, DropdownOption } from "../types";
import { dropdownStyles } from "../styles/dropdownStyles";

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState("");
  const pcDropdown = useDropdown();
  const consoleDropdown = useDropdown();
  const mobileDropdown = useDropdown();

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

  const closeAllDropdowns = useCallback(() => {
    pcDropdown.close();
    consoleDropdown.close();
    mobileDropdown.close();
    setActiveCategory(""); // 모든 드롭다운 닫을 때 activeCategory도 초기화
  }, [pcDropdown.close, consoleDropdown.close, mobileDropdown.close]);

  // 경로 변경 시 모든 드롭다운 닫기
  useEffect(() => {
    closeAllDropdowns();
  }, [pathname, closeAllDropdowns]);

  // 각 카테고리별 드롭다운 닫기 핸들러
  const closePCDropdown = () => {
    pcDropdown.close();
    setActiveCategory("");
  };

  const closeConsoleDropdown = () => {
    consoleDropdown.close();
    setActiveCategory("");
  };

  const closeMobileDropdown = () => {
    mobileDropdown.close();
    setActiveCategory("");
  };

  const handleCategoryClick = (categoryName: string) => {
    if (categoryName === "Community") {
      router.push("/community");
      return;
    }

    closeAllDropdowns();

    switch (categoryName) {
      case "PC":
        if (activeCategory === "PC") {
          setActiveCategory("");
        } else {
          pcDropdown.open();
          setActiveCategory("PC");
        }
        break;
      case "Console":
        if (activeCategory === "Console") {
          setActiveCategory("");
        } else {
          consoleDropdown.open();
          setActiveCategory("Console");
        }
        break;
      case "Mobile":
        if (activeCategory === "Mobile") {
          setActiveCategory("");
        } else {
          mobileDropdown.open();
          setActiveCategory("Mobile");
        }
        break;
      default:
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
                    (category.name === "PC" && pcDropdown.isOpen) ||
                    (category.name === "Console" && consoleDropdown.isOpen) ||
                    (category.name === "Mobile" && mobileDropdown.isOpen)
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
          {category.name === "PC" && pcDropdown.isOpen && (
            <div
              className={dropdownStyles.container}
              data-dropdown
            >
              <div className={dropdownStyles.content}>
                <div className={dropdownStyles.padding}>
                  {pcOptions.map((option, index) => (
                    <DropdownItem
                      key={option.name}
                      title={option.name}
                      description={option.description}
                      path={option.path}
                      isLast={index === pcOptions.length - 1}
                      onClick={closePCDropdown}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Console 드롭다운 */}
          {category.name === "Console" && consoleDropdown.isOpen && (
            <div
              className={dropdownStyles.container}
              data-dropdown
            >
              <div className={dropdownStyles.content}>
                <div className={dropdownStyles.padding}>
                  {consoleOptions.map((option, index) => (
                    <DropdownItem
                      key={option.name}
                      title={option.name}
                      description={option.description}
                      path={option.path}
                      isLast={index === consoleOptions.length - 1}
                      onClick={closeConsoleDropdown}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mobile 드롭다운 */}
          {category.name === "Mobile" && mobileDropdown.isOpen && (
            <div
              className={dropdownStyles.container}
              data-dropdown
            >
              <div className={dropdownStyles.content}>
                <div className={dropdownStyles.padding}>
                  {mobileOptions.map((option, index) => (
                    <DropdownItem
                      key={option.name}
                      title={option.name}
                      description={option.description}
                      path={option.path}
                      isLast={index === mobileOptions.length - 1}
                      onClick={closeMobileDropdown}
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