"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

interface SidebarProps {
  userVote: number | null;
  onVote: (rating: number) => void;
}

export default function Sidebar({ userVote, onVote }: SidebarProps) {
  const similarGames = [
    {
      name: "사랑스럽다",
      description: "세계 최초의 AI 플스택 엔지니어",
      rating: 4.7,
      reviews: 304,
      tags: ["AI 코딩 어시스턴트", "바이브 코딩 도구"],
      icon: "💜",
    },
    {
      name: "OpenAI의 Codex",
      description: "당신을 대신해 코드를 작성하는 AI",
      rating: 5.0,
      reviews: 1,
      tags: ["AI 코딩 어시스턴트", "AI 코딩 에이전트"],
      icon: "🔷",
    },
  ];

  return (
    <div className="space-y-6" style={{ marginTop: "44px" }}>
      <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
        <div className="space-y-6">
          {/* 게임 아이콘 */}
          <div>
            <div className="w-32 h-20 rounded-2xl flex items-center justify-center relative">
              <Image
                src="/icon/game_info_icon/zelda/Logo_The Legend of Zelda-Breath of the Wild.webp"
                alt="젤다 아이콘"
                fill
                className="rounded-xl object-contain"
                sizes="128px"
              />
            </div>
          </div>

          <div>
            <p className="text-slate-300 text-lg">
              젤다의 전설: 브레스 오브 더 와일드
            </p>
          </div>

          <div>
            <p className="text-slate-300">
              GOTY에서도 높은 점수를 받은 닌텐도의 오픈월드 게임을
              경험해보세요!
            </p>
          </div>

          {/* 유저 평점 */}
          <div>
            <h3 className="text-xl font-bold text-white">유저 평점</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-3xl font-bold text-yellow-400">
                  9.3
                </div>
                <div>
                  <div className="flex text-yellow-400 text-lg">
                    ★★★★★
                  </div>
                  <p className="text-slate-400 text-xs">1,245개 리뷰</p>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <p className="text-slate-300 text-sm font-medium">
                  내 평점
                </p>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => onVote(star)}
                      className={`text-2xl transition-all hover:scale-110 ${
                        userVote && star <= userVote
                          ? "text-yellow-400"
                          : "text-slate-500 hover:text-yellow-300"
                      }`}
                      title={
                        userVote === star
                          ? "클릭하여 투표 취소"
                          : `${star}점 투표`
                      }
                    >
                      ★
                    </button>
                  ))}
                </div>
                <p className="text-blue-400 text-xs h-4">
                  {userVote ? `${userVote}점 투표완료` : ""}
                </p>
              </div>
            </div>
          </div>

          {/* 기본 게임 정보 */}
          <div className="border-t border-slate-700 pt-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">장르:</span>
                <span className="text-white">액션 어드벤처</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">개발사:</span>
                <span className="text-white">Nintendo EPD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">출시일:</span>
                <span className="text-white">2017년 3월 3일</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">플랫폼:</span>
                <span className="text-white">Nintendo Switch</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">언어:</span>
                <span className="text-white">한국어 지원</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              Nintendo eShop에서 구매
            </button>
            <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              위시리스트에 추가
            </button>
          </div>
        </div>
      </div>

      {/* 광고 및 추천 섹션 */}
      <div className="sticky top-20 space-y-4 max-h-screen overflow-y-auto">
        {/* 광고 배너 */}
        <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center">
          <div className="text-4xl font-bold text-black mb-2">광고</div>
          <div className="text-slate-600 text-sm">
            Advertisement Banner
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-yellow-400 text-black px-3 py-1 rounded-lg inline-block font-bold text-sm">
            비슷한 게임
          </div>
          <div className="space-y-4">
            {similarGames.map((game, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl">
                    {game.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xl font-bold text-white mb-2">
                      {game.name}
                    </h4>
                    <p className="text-slate-300 text-sm mb-3">
                      {game.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Star
                          size={16}
                          className="text-yellow-400 fill-current"
                        />
                        <span className="text-yellow-400 font-bold">
                          {game.rating}
                        </span>
                        <span className="text-slate-400 text-sm">
                          ({game.reviews}개 리뷰)
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        {game.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-blue-600 text-white text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}