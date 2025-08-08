"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSmallSlide, setCurrentSmallSlide] = useState(0);

  const mainSlides = [
    { id: 1, title: "PC 게임", image: "/game1.jpg" },
    { id: 2, title: "콘솔 게임", image: "/game2.jpg" },
    { id: 3, title: "모바일 게임", image: "/game3.jpg" },
    { id: 4, title: "인디 게임", image: "/game4.jpg" },
  ];

  const smallSlides = [
    { id: 1, title: "액션", image: "/action.jpg" },
    { id: 2, title: "RPG", image: "/rpg.jpg" },
    { id: 3, title: "전략", image: "/strategy.jpg" },
    { id: 4, title: "스포츠", image: "/sports.jpg" },
    { id: 5, title: "퍼즐", image: "/puzzle.jpg" },
    { id: 6, title: "레이싱", image: "/racing.jpg" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mainSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + mainSlides.length) % mainSlides.length
    );
  };

  const nextSmallSlide = () => {
    setCurrentSmallSlide((prev) => (prev + 1) % (smallSlides.length - 3));
  };

  const prevSmallSlide = () => {
    setCurrentSmallSlide(
      (prev) => (prev - 1 + (smallSlides.length - 3)) % (smallSlides.length - 3)
    );
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="bg-slate-800 shadow-lg border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-indigo-500 font-bangers">
                GAME RANK
              </h1>

              {/* 검색바 */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="게임 검색..."
                  className="w-64 px-4 py-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-700 text-white placeholder-slate-400"
                />
                <button className="absolute right-3 top-2.5">
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* 드롭다운 메뉴 */}
              <div className="flex space-x-4">
                <button className="px-3 py-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-700 text-white hover:bg-slate-600 transition-colors">
                  커뮤니티
                </button>
                <select className="px-3 py-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-700 text-white">
                  <option>PC</option>
                </select>
                <select className="px-3 py-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-700 text-white">
                  <option>Console</option>
                </select>
                <select className="px-3 py-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-700 text-white">
                  <option>Mobile</option>
                </select>
              </div>
            </div>

            {/* Sign In 버튼 */}
            <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="relative h-20 bg-gradient-to-r from-indigo-600 to-orange-700 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40">
          <Image
            src="/icon/page_icon/mainUpperIcon1.png"
            alt="게임 아이콘 1"
            width={48}
            height={48}
            className="absolute top-[20%] left-[10%] rotate-[-20deg] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]"
          />
          <Image
            src="/icon/page_icon/mainUpperIcon2.png"
            alt="게임 아이콘 2"
            width={48}
            height={48}
            className="absolute top-[10%] left-[30%] rotate-[15deg] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]"
          />
          <Image
            src="/icon/page_icon/mainUpperIcon3.png"
            alt="게임 아이콘 3"
            width={48}
            height={48}
            className="absolute top-[25%] right-[10%] rotate-[15deg] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]"
          />
          <Image
            src="/icon/page_icon/mainUpperIcon4.png"
            alt="게임 아이콘 4"
            width={100}
            height={48}
            className="absolute top-[-1%] right-[35%] rotate-[10deg] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]"
          />
          <Image
            src="/icon/page_icon/mainUpperIcon5.png"
            alt="게임 아이콘 5"
            width={48}
            height={48}
            className="absolute top-[10%] right-[20%] rotate-[10deg] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]"
          />
          <Image
            src="/icon/page_icon/mainUpperIcon6.png"
            alt="게임 아이콘 6"
            width={48}
            height={48}
            className="absolute top-[40%] left-[20%] rotate-[10deg] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]"
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">
            흩어져 있는 순위, 이제 한곳에서 모아보자
          </h2>
          <h3 className="text-1xl font-semibold font-bangers">[GAME RANK]</h3>
        </div>
      </section>

      {/* 메인 슬라이더 */}
      <section className="py-12 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="flex items-center justify-between">
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-slate-700 rounded-full p-2 shadow-lg hover:bg-slate-600 text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex-1 mx-16">
                <div className="relative h-80 bg-slate-700 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">
                        {mainSlides[currentSlide].title}
                      </h3>
                      <p className="text-lg">게임 순위를 확인해보세요</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-slate-700 rounded-full p-2 shadow-lg hover:bg-slate-600 text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* 슬라이드 인디케이터 */}
            <div className="flex justify-center mt-4 space-x-2">
              {mainSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? "bg-indigo-500" : "bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 작은 슬라이더 (4개) */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="flex items-center justify-between">
              <button
                onClick={prevSmallSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-slate-700 rounded-full p-2 shadow-lg hover:bg-slate-600 text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex-1 mx-16">
                <div className="grid grid-cols-4 gap-4">
                  {smallSlides
                    .slice(currentSmallSlide, currentSmallSlide + 4)
                    .map((slide) => (
                      <div
                        key={slide.id}
                        className="bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      >
                        <div className="h-32 bg-gradient-to-br from-emerald-500 to-indigo-500 flex items-center justify-center">
                          <div className="text-center text-white">
                            <h4 className="font-semibold">{slide.title}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <button
                onClick={nextSmallSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-slate-700 rounded-full p-2 shadow-lg hover:bg-slate-600 text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 순위 차트 */}
      <section className="py-12 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            게임 순위
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-600">
              <thead>
                <tr className="bg-slate-700">
                  <th className="border border-slate-600 px-6 py-3 text-left font-semibold text-amber-500">
                    순위
                  </th>
                  <th className="border border-slate-600 px-6 py-3 text-left font-semibold text-indigo-400">
                    PC
                  </th>
                  <th className="border border-slate-600 px-6 py-3 text-left font-semibold text-indigo-400">
                    Console
                  </th>
                  <th className="border border-slate-600 px-6 py-3 text-left font-semibold text-indigo-400">
                    Mobile
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-slate-900">
                  <td className="border border-slate-600 px-6 py-3 font-semibold text-amber-500">
                    1
                  </td>
                  <td className="border border-slate-600 px-6 py-3 text-white">
                    League of Legends
                  </td>
                  <td className="border border-slate-600 px-6 py-3 text-white">
                    FIFA 24
                  </td>
                  <td className="border border-slate-600 px-6 py-3 text-white">
                    PUBG Mobile
                  </td>
                </tr>
                <tr className="bg-slate-800">
                  <td className="border border-slate-600 px-6 py-3 font-semibold text-amber-500">
                    2
                  </td>
                  <td className="border border-slate-600 px-6 py-3 text-white">
                    Valorant
                  </td>
                  <td className="border border-slate-600 px-6 py-3 text-white">
                    Call of Duty
                  </td>
                  <td className="border border-slate-600 px-6 py-3 text-white">
                    Genshin Impact
                  </td>
                </tr>
                <tr className="bg-slate-900">
                  <td className="border border-slate-600 px-6 py-3 font-semibold text-amber-500">
                    3
                  </td>
                  <td className="border border-slate-600 px-6 py-3 text-white">
                    Overwatch 2
                  </td>
                  <td className="border border-slate-600 px-6 py-3 text-white">
                    God of War
                  </td>
                  <td className="border border-slate-600 px-6 py-3 text-white">
                    Clash Royale
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* HOT ISSUE 섹션 */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-white font-bangers">
            GAME RANK : HOT ISSUE
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {/* 2행 3열의 글 페이지들 */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="h-24 bg-gradient-to-br from-emerald-500 to-indigo-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg
                      className="w-8 h-8 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <p className="text-xs">이슈 {item}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold mb-3 text-white text-lg">
                    게임 이슈 제목 {item}
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    게임 관련 최신 소식과 이슈를 확인해보세요. 다양한 게임
                    커뮤니티에서 화제가 되고 있는 내용들을 한눈에 볼 수
                    있습니다. 업데이트 소식부터 새로운 게임 출시 정보까지 모든
                    것을 확인하세요.
                  </p>
                  <div className="mt-4 flex items-center text-emerald-400 text-xs">
                    <span>조회수 1.2K</span>
                    <span className="mx-2">•</span>
                    <span>2시간 전</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
