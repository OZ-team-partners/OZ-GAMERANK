"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import DropdownItem from "./DropdownItem";

const Newsletter = () => {
  const [showNewsletterDropdown, setShowNewsletterDropdown] = useState(false);

  const newsletterOptions = [
    {
      name: "📰 8월 게임 뉴스",
      path: "/blog/newsletter",
      description: "이달의 핫한 게임 소식과 업데이트",
    },
    {
      name: "🎮 신작 게임 정보",
      path: "/blog/newsletter",
      description: "출시 예정 게임과 트레일러 모음",
    },
    {
      name: "🏆 랭킹 분석",
      path: "/blog/newsletter",
      description: "게임 순위 변동과 트렌드 분석",
    },
  ];

  return (
    <div className="relative" data-dropdown>
      <button
        onClick={() => setShowNewsletterDropdown(!showNewsletterDropdown)}
        aria-label="Level Up! 소식통 메뉴 열기"
        className="
          flex items-center space-x-2 px-4 py-2 
          bg-gradient-to-r from-green-600 to-emerald-600 
          text-white rounded-lg font-semibold text-sm
          hover:from-green-700 hover:to-emerald-700
          transition-all duration-150 ease-out
          shadow-md hover:shadow-lg hover:shadow-green-500/15
          cursor-pointer backdrop-blur-sm
        "
      >
        <span>📧</span>
        <span>Level Up! 소식통</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-150 ${
            showNewsletterDropdown ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {showNewsletterDropdown && (
        <div
          className="absolute top-full right-0 mt-3 w-80 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
          data-dropdown
        >
          <div className="bg-white/98 backdrop-blur-xl border border-slate-200/40 rounded-2xl shadow-lg overflow-hidden ring-1 ring-slate-900/5">
            <div className="p-2">
              {newsletterOptions.map((option, index) => (
                <DropdownItem
                  key={option.name}
                  title={option.name}
                  description={option.description}
                  path={option.path}
                  isLast={index === newsletterOptions.length - 1}
                  onClick={() => setShowNewsletterDropdown(false)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Newsletter;