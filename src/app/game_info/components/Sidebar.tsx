"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

interface SidebarProps {
  userVote: number | null;
  onVote: (rating: number) => void;
  imageUrl?: string | null;
  title?: string;
  platform?: string | null; // 추가
}

export default function Sidebar({
  userVote,
  onVote,
  imageUrl,
  title,
  platform, // 추가
}: SidebarProps) {
  const similarGames = [
    {
      name: "젤다의 전설: 티어스 오브 더 킹덤",
      description: "브레스 오브 더 와일드의 후속작",
      rating: 9.5,
      reviews: 892,
      tags: ["액션 어드벤처", "오픈월드"],
      logoSrc: "/icon/game_info_icon/zelda/Logo_zelda tears of the kingdom.png",
    },
    {
      name: "슈퍼 마리오 오디세이",
      description: "3D 마리오의 새로운 모험",
      rating: 9.2,
      reviews: 1547,
      tags: ["플랫포머", "어드벤처"],
      logoSrc: "/icon/game_info_icon/mario/Logo_supermario odyssey.png",
    },
  ];

  return (
    <div className="space-y-6" style={{ marginTop: "0px" }}>
      <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
        <div className="space-y-6">
          {/* 게임 이미지 */}
          <div>
            <div className="w-20 h-10 rounded-2xl flex items-center justify-center relative overflow-hidden bg-slate-700">
              <Image
                src={imageUrl || "/icon/rank_icon/steam1.jpeg"}
                alt={title || "게임 이미지"}
                fill
                className="rounded-xl object-cover"
                sizes="128px"
              />
            </div>
          </div>

          <div>
            <p className="font-bold mono text-slate-100 text-2xl ">
              {title || "게임 타이틀"}
            </p>
          </div>

          <div>
            <p className="text-slate-300">
              이 게임에 대한 여러분들의 평가를 남겨주세요!
            </p>
          </div>

          {/* 유저 평점 */}
          <div>
            <h3 className="text-xl font-bold text-white">유저 평점</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-3xl font-bold text-yellow-400">9.3</div>
                <div>
                  <div className="flex text-yellow-400 text-lg">★★★★★</div>
                  <p className="text-slate-400 text-xs">1,245개 리뷰</p>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <p className="text-slate-300 text-sm font-medium">내 평점</p>
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
              {/* 플랫폼 표시부 교체 */}
              <div className="flex justify-between">
                <span className="text-slate-400">플랫폼:</span>
                <span className="text-white">{platform || "정보 없음"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">언어:</span>
                <span className="text-white">한국어 지원</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              구매 하러 가기
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
          <div className="text-slate-600 text-sm">Advertisement Banner</div>
        </div>

        <div className="space-y-4">
          <div className="bg-yellow-400 text-black px-3 py-1 rounded-lg inline-block font-bold text-sm">
            비슷한 게임
          </div>
          <div className="space-y-4">
            {similarGames.map((game, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden bg-slate-700">
                    <Image
                      src={game.logoSrc}
                      alt={`${game.name} 로고`}
                      fill
                      className="object-contain p-1"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xl font-bold text-white mb-2">
                      {game.name}
                    </h4>
                    <p className="text-slate-300 text-sm mb-3">
                      {game.description}
                    </p>
                    <div className="flex items-start">
                      <div className="space-y-2 mr-8">
                        <div className="flex items-center space-x-2">
                          <Star
                            size={16}
                            className="text-yellow-400 fill-current"
                          />
                          <span className="text-yellow-400 font-bold">
                            {game.rating}
                          </span>
                        </div>
                        <div className="text-slate-400 text-sm">
                          ({game.reviews}개 리뷰)
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1">
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
