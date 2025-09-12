"use client";

import { useState, useEffect, useRef } from "react";
import { IconButton } from "@mui/material";
import { Menu, X, Gamepad2, Zap, Trophy, Award, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: {
    name: string;
    path: string;
    description: string;
  }[];
}

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const menuItems: MenuItem[] = [
    {
      name: "커뮤니티",
      icon: <Gamepad2 size={18} />,
      path: "/community",
    },
    {
      name: "PC",
      icon: <Zap size={18} />,
      subItems: [
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
      ],
    },
    {
      name: "콘솔",
      icon: <Trophy size={18} />,
      subItems: [
        {
          name: "PlayStation",
          path: "/rank/console/playStation",
          description: "플레이스테이션 독점 게임들",
        },
        {
          name: "Nintendo",
          path: "/rank/console/nintendo",
          description: "닌텐도 스위치 인기 타이틀",
        },
      ],
    },
    {
      name: "모바일",
      icon: <Award size={18} />,
      subItems: [
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
      ],
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleItemClick = (item: MenuItem) => {
    if (item.path) {
      router.push(item.path);
      setIsOpen(false);
      setExpandedItem(null);
    } else if (item.subItems) {
      setExpandedItem(expandedItem === item.name ? null : item.name);
    }
  };

  const handleSubItemClick = (path: string) => {
    router.push(path);
    setIsOpen(false);
    setExpandedItem(null);
  };

  return (
    <div ref={menuRef} className="relative">
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        aria-label="메뉴 열기"
        sx={{
          color: "#CBD5E1",
          padding: "8px",
          "&:hover": {
            backgroundColor: "rgba(148, 163, 184, 0.1)",
            color: "#FFFFFF",
          },
        }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </IconButton>

      {/* 모바일 메뉴 패널 */}
      {isOpen && (
        <div className="absolute top-12 right-0 w-80 bg-slate-900 border border-slate-800 rounded-lg shadow-xl z-50">
          <div className="py-2">
            {menuItems.map((item) => (
              <div key={item.name}>
                <button
                  onClick={() => handleItemClick(item)}
                  className="w-full px-4 py-3 flex items-center justify-between text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {item.subItems && (
                    <ChevronRight
                      size={18}
                      className={`transition-transform ${
                        expandedItem === item.name ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </button>

                {/* 서브메뉴 */}
                {item.subItems && expandedItem === item.name && (
                  <div className="bg-slate-800/50">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.path}
                        onClick={() => handleSubItemClick(subItem.path)}
                        className="w-full px-8 py-3 text-left hover:bg-slate-700 transition-colors"
                      >
                        <div className="text-slate-300 hover:text-white">
                          <div className="font-medium text-sm">{subItem.name}</div>
                          <div className="text-xs text-slate-400 mt-1">
                            {subItem.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;