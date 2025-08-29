"use client";

import React from "react";
import { DropdownOption } from "../types";
import Dropdown from "./Dropdown";

const Newsletter = () => {
  const newsletterOptions: DropdownOption[] = [
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
    <Dropdown
      label="Level Up! 소식통"
      icon={<span>📧</span>}
      options={newsletterOptions}
      variant="success"
      ariaLabel="Level Up! 소식통 메뉴 열기"
      position="right"
    />
  );
};

export default Newsletter;