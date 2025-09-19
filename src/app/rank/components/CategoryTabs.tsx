"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Tab {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: "pc",
    label: "PC 게임",
    href: "/rank/pc",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "console",
    label: "콘솔",
    href: "/rank/console",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V6a1 1 0 00-1-1zm-6 8a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    ),
  },
  {
    id: "mobile",
    label: "모바일",
    href: "/rank/mobile",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
      </svg>
    ),
  },
];

const platformTabs = {
  pc: [
    { id: "online", label: "온라인", href: "/rank/pc/online" },
    { id: "steam", label: "Steam", href: "/rank/pc/steam" },
  ],
  console: [
    { id: "playstation", label: "PlayStation", href: "/rank/console/playstation" },
    { id: "nintendo", label: "Nintendo", href: "/rank/console/nintendo" },
  ],
  mobile: [
    { id: "ios", label: "iOS", href: "/rank/mobile/ios" },
    { id: "android", label: "Android", href: "/rank/mobile/android" },
  ],
};

export default function CategoryTabs() {
  const pathname = usePathname();

  const getCurrentCategory = () => {
    if (pathname.startsWith("/rank/pc")) return "pc";
    if (pathname.startsWith("/rank/console")) return "console";
    if (pathname.startsWith("/rank/mobile")) return "mobile";
    return "pc";
  };

  const currentCategory = getCurrentCategory();
  const currentPlatformTabs = platformTabs[currentCategory as keyof typeof platformTabs];

  return (
    <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50">
      {/* 메인 카테고리 탭 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-center mb-4">
          <div className="flex gap-2 bg-slate-800/60 rounded-xl p-2 backdrop-blur-sm border border-slate-700/50">
            {tabs.map((tab) => {
              const isActive = currentCategory === tab.id;
              return (
                <Link key={tab.id} href={tab.href}>
                  <div
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                        : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 플랫폼 서브 탭 */}
        <div className="flex items-center justify-center">
          <div className="flex gap-2 bg-slate-800/40 rounded-lg p-2 backdrop-blur-sm">
            {currentPlatformTabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link key={tab.id} href={tab.href}>
                  <div
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-orange-500 text-white shadow-md"
                        : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                    }`}
                  >
                    {tab.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}