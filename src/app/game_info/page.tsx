"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  ChevronRight as BreadcrumbArrow,
  Star,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function GameInfoPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const gameImages = [
    "/icon/game_info_icon/zelda/zelda.png",
    "/icon/page_icon/zelda2.jpg",
    "/icon/page_icon/zelda3.jpg",
    "/icon/page_icon/zelda4.jpg",
    "/icon/page_icon/zelda5.jpg",
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gameImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + gameImages.length) % gameImages.length
    );
  };

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
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 중앙: 메인 이미지 영역 */}
          <div className="lg:col-span-2">
            {/* 브레드크럼 */}
            <nav className="flex items-center space-x-2 mb-6 text-sm">
              <Link
                href="/"
                className="flex items-center text-slate-400 hover:text-white transition-colors"
              >
                <Home size={16} className="mr-1" />홈
              </Link>
              <BreadcrumbArrow size={14} className="text-slate-500" />
              <Link
                href="/rank/nintendo"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Nintendo
              </Link>
              <BreadcrumbArrow size={14} className="text-slate-500" />
              <span className="text-white font-medium">
                젤다의 전설: 브레스 오브 더 와일드
              </span>
            </nav>

            {/* 메인 게임 이미지 */}
            <div className="relative mb-6">
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl overflow-hidden shadow-2xl relative">
                <Image
                  src="/icon/game_info_icon/zelda/zelda.png"
                  alt="젤다의 전설 브레스 오브 더 와일드"
                  fill // 부모 div 크기에 맞게 꽉 채움
                  className="object-cover"
                  priority // LCP 최적화 (첫 화면에 보이는 이미지면 추가)
                />

                {/* 이동 버튼 */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* 썸네일 이미지들 */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              {gameImages.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-video rounded-lg overflow-hidden cursor-pointer transition-all ${
                    index === currentImageIndex
                      ? "ring-4 ring-yellow-400"
                      : "ring-2 ring-transparent hover:ring-slate-400"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`게임 스크린샷 ${index + 1}`}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* 레벨업 소식통 뉴스레터 */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 shadow-xl">
              <div className="text-sm font-semibold text-purple-200 mb-2">
                NEWSLETTER
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Stay up to date on our latest news and events
              </h3>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 rounded-lg bg-white text-black text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold text-sm transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* 오른쪽: 게임 정보 */}
          <div className="space-y-6" style={{ marginTop: "44px" }}>
            <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
              <div className="space-y-6">
                {/* 게임 아이콘 */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    게임 아이콘
                  </h3>
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center">
                    <Image 
                      src="/icon/page_icon/zelda-icon.png"
                      alt="젤다 아이콘"
                        fill
                      className="w-20 h-20 rounded-xl object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMF8xKSIgcng9IjEyIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+WmVsZGE8L3RleHQ+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMF8xIiB4MT0iMCIgeTE9IjAiIHgyPSI4MCIgeTI9IjgwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMzQjgyRjYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTBCOTgxIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+";
                      }}
                    />
                  </div>
                </div>

                {/* 게임명 */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white">게임명</h3>
                  <p className="text-slate-300 text-lg">
                    젤다의 전설: 브레스 오브 더 와일드
                  </p>
                </div>

                {/* 게임 한줄 문구 */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    게임 한줄 문구
                  </h3>
                  <p className="text-slate-300">
                    모험의 새로운 차원을 경험하세요
                  </p>
                </div>

                {/* 상세 설명 */}
                <div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    어떤 콘솔이고 어떤 장르인지 설명 또는 아이콘으로
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    해당 페이지 색상으로 이동하는 아이콘
                  </p>
                </div>

                {/* 유저 평점 */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    유저 평점
                  </h3>
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl font-bold text-yellow-400">
                      9.3
                    </div>
                    <div>
                      <div className="flex text-yellow-400 text-lg">★★★★★</div>
                      <p className="text-slate-400 text-xs">1,245개 리뷰</p>
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

                {/* 구매/다운로드 버튼 */}
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

            {/* 광고 배너 */}
            <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-black mb-2">광고</div>
              <div className="text-slate-600 text-sm">Advertisement Banner</div>
            </div>

            {/* 비슷한 게임 섹션 */}
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
      </div>
    </div>
  );
}
