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
    const [userVote, setUserVote] = useState(null); // null, 1-5 중 하나

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

    const handleVote = (rating) => {
        if (userVote === rating) {
            // 같은 별점을 다시 클릭하면 투표 취소
            setUserVote(null);
        } else {
            // 새로운 투표
            setUserVote(rating);
        }
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
                            <BreadcrumbArrow
                                size={14}
                                className="text-slate-500"
                            />
                            <Link
                                href="/rank/nintendo"
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                Nintendo
                            </Link>
                            <BreadcrumbArrow
                                size={14}
                                className="text-slate-500"
                            />
                            <span className="text-white font-medium">
                                젤다의 전설: 브레스 오브 더 와일드
                            </span>
                        </nav>

                        {/* 메인 게임 이미지 */}
                        <div className="relative mb-6">
                            <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl overflow-hidden shadow-2xl relative">
                                <img
                                    src="/icon/game_info_icon/zelda/zelda.png"
                                    alt="젤다의 전설 브레스 오브 더 와일드"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDgwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDUwIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMF8xKSIvPgo8dGV4dCB4PSI0MDAiIHk9IjIyNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+WmVsZGE6IEJyZWF0aCBvZiB0aGUgV2lsZDwvdGV4dD4KPGJ1dHRvbiB4PSIzNzAiIHk9IjI3MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjRkY2NjAwIiByeD0iNSI+UGxheTwvYnV0dG9uPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzBfMSIgeDE9IjAiIHkxPSIwIiB4Mj0iODAwIiB5Mj0iNDUwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMyNTYzRUIiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjN0MzQUVEIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+";
                                    }}
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
                                    <img
                                        src={image}
                                        alt={`게임 스크린샷 ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDIwMCAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTEyIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMF8xKSIvPgo8dGV4dCB4PSIxMDAiIHk9IjU2IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7rr7zrr7/sp4A8L3RleHQ+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMF8xIiB4MT0iMCIgeTE9IjAiIHgyPSIyMDAiIHkyPSIxMTIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzI1NjNFQiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM3QzNBRUQiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K`;
                                        }}
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
                                구독만 해도 Game Life, 레벨업!
                            </h3>
                            <div className="flex space-x-2">
                                <input
                                    type="email"
                                    placeholder="이메일을 입력해주세요!"
                                    className="flex-1 px-4 py-2 rounded-lg bg-white text-black text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                                <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold text-sm transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        {/* 게임 정보 섹션 */}
                        <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700 mt-6">
                            <h2 className="text-2xl font-bold text-white mb-6">게임 정보</h2>
                            
                            {/* 게임 소개 */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-white mb-3">게임 소개</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    젤다의 전설: 브레스 오브 더 와일드는 닌텐도가 개발한 오픈 월드 액션 어드벤처 게임입니다. 
                                    하이랄 왕국을 무대로 링크가 되어 광활한 세계를 자유롭게 탐험하며, 
                                    100년 전 멸망한 왕국을 되살리기 위한 모험을 떠나게 됩니다.
                                </p>
                            </div>

                            {/* 주요 특징 */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-white mb-3">주요 특징</h3>
                                <ul className="space-y-2 text-slate-300">
                                    <li className="flex items-start">
                                        <span className="text-yellow-400 mr-2">▶</span>
                                        완전한 자유도를 제공하는 오픈 월드 탐험
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-yellow-400 mr-2">▶</span>
                                        물리 엔진을 활용한 창의적인 퍼즐 해결
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-yellow-400 mr-2">▶</span>
                                        다양한 무기와 도구를 활용한 전략적 전투
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-yellow-400 mr-2">▶</span>
                                        아름다운 그래픽과 몰입감 있는 사운드
                                    </li>
                                </ul>
                            </div>

                            {/* 시스템 요구사항 */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-white mb-3">시스템 요구사항</h3>
                                <div className="bg-slate-700 rounded-lg p-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-slate-400">플랫폼:</span>
                                            <span className="text-white ml-2">Nintendo Switch</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400">용량:</span>
                                            <span className="text-white ml-2">13.4GB</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400">플레이어:</span>
                                            <span className="text-white ml-2">1명</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400">연령등급:</span>
                                            <span className="text-white ml-2">12세 이용가</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* DLC 정보 */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">DLC 확장팩</h3>
                                <div className="space-y-3">
                                    <div className="bg-slate-700 rounded-lg p-4">
                                        <h4 className="text-white font-medium mb-2">확장 패스</h4>
                                        <p className="text-slate-300 text-sm mb-2">
                                            추가 스토리와 새로운 챌린지를 포함한 확장 콘텐츠
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-yellow-400 font-bold">₩22,000</span>
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                                구매하기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 유저 댓글 섹션 */}
                        <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700 mt-6">
                            <h2 className="text-2xl font-bold text-white mb-6">유저 리뷰 & 댓글</h2>
                            
                            {/* 댓글 작성 */}
                            <div className="mb-6">
                                <div className="bg-slate-700 rounded-lg p-4">
                                    <textarea
                                        placeholder="게임에 대한 리뷰를 남겨주세요..."
                                        className="w-full bg-slate-600 text-white placeholder-slate-400 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={3}
                                    />
                                    <div className="flex justify-between items-center mt-3">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-slate-400 text-sm">평점:</span>
                                            <div className="flex space-x-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button key={star} className="text-yellow-400 hover:text-yellow-300 text-lg">
                                                        ★
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                            리뷰 작성
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 댓글 목록 */}
                            <div className="space-y-4">
                                {/* 댓글 1 */}
                                <div className="bg-slate-700 rounded-lg p-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                            김
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className="text-white font-semibold">김하이랄</span>
                                                <div className="flex text-yellow-400 text-sm">★★★★★</div>
                                                <span className="text-slate-400 text-xs">2024.01.15</span>
                                            </div>
                                            <p className="text-slate-300 leading-relaxed">
                                                정말 최고의 게임입니다! 오픈월드의 자유도가 엄청나고, 어디로 가야 할지 모르는 재미가 있어요. 
                                                처음에는 어려웠지만 점점 익숙해지면서 더욱 재밌어졌습니다. 강력 추천!
                                            </p>
                                            <div className="flex items-center space-x-4 mt-3">
                                                <button className="text-slate-400 hover:text-white text-sm flex items-center space-x-1">
                                                    <span>👍</span>
                                                    <span>24</span>
                                                </button>
                                                <button className="text-slate-400 hover:text-white text-sm">답글</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 댓글 2 */}
                                <div className="bg-slate-700 rounded-lg p-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                            링
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className="text-white font-semibold">링크마스터</span>
                                                <div className="flex text-yellow-400 text-sm">★★★★☆</div>
                                                <span className="text-slate-400 text-xs">2024.01.12</span>
                                            </div>
                                            <p className="text-slate-300 leading-relaxed">
                                                그래픽이 정말 아름답고 음악도 환상적이에요. 다만 무기가 부서지는 시스템은 좀 아쉬웠습니다. 
                                                그래도 전체적으로 훌륭한 게임이고 시간 가는 줄 모르고 플레이했어요!
                                            </p>
                                            <div className="flex items-center space-x-4 mt-3">
                                                <button className="text-slate-400 hover:text-white text-sm flex items-center space-x-1">
                                                    <span>👍</span>
                                                    <span>18</span>
                                                </button>
                                                <button className="text-slate-400 hover:text-white text-sm">답글</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 댓글 3 */}
                                <div className="bg-slate-700 rounded-lg p-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                            젤
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className="text-white font-semibold">젤다공주</span>
                                                <div className="flex text-yellow-400 text-sm">★★★★★</div>
                                                <span className="text-slate-400 text-xs">2024.01.10</span>
                                            </div>
                                            <p className="text-slate-300 leading-relaxed">
                                                100시간 넘게 플레이했는데도 아직 할 게 많아요. 탐험의 재미가 끝이 없고, 
                                                퍼즐을 풀 때마다 성취감이 정말 크네요. 닌텐도 스위치 필수 게임!
                                            </p>
                                            <div className="flex items-center space-x-4 mt-3">
                                                <button className="text-slate-400 hover:text-white text-sm flex items-center space-x-1">
                                                    <span>👍</span>
                                                    <span>31</span>
                                                </button>
                                                <button className="text-slate-400 hover:text-white text-sm">답글</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 댓글 4 */}
                                <div className="bg-slate-700 rounded-lg p-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                                            게
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className="text-white font-semibold">게임러버</span>
                                                <div className="flex text-yellow-400 text-sm">★★★☆☆</div>
                                                <span className="text-slate-400 text-xs">2024.01.08</span>
                                            </div>
                                            <p className="text-slate-300 leading-relaxed">
                                                기대했던 것보다는 아쉬웠어요. 스토리가 좀 단조로운 느낌이고, 
                                                던전이 예전 젤다 시리즈보다 부족한 것 같아요. 그래도 오픈월드는 재밌습니다.
                                            </p>
                                            <div className="flex items-center space-x-4 mt-3">
                                                <button className="text-slate-400 hover:text-white text-sm flex items-center space-x-1">
                                                    <span>👍</span>
                                                    <span>7</span>
                                                </button>
                                                <button className="text-slate-400 hover:text-white text-sm">답글</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 더보기 버튼 */}
                            <div className="text-center mt-6">
                                <button className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-2 rounded-lg transition-colors">
                                    댓글 더보기
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
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center">
                                        <img
                                            src="/icon/page_icon/zelda-icon.png"
                                            alt="젤다 아이콘"
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
                                    <p className="text-slate-300 text-lg">
                                        젤다의 전설: 브레스 오브 더 와일드
                                    </p>
                                </div>

                                {/* 게임 한줄 문구 */}
                                <div>
                                    <p className="text-slate-300">
                                        모험의 새로운 차원을 경험하세요
                                    </p>
                                </div>

                                {/* 상세 설명 */}
                                <div>
                                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                        어떤 콘솔이고 어떤 장르인지 설명 또는
                                        아이콘으로
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
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="text-3xl font-bold text-yellow-400">
                                                9.3
                                            </div>
                                            <div>
                                                <div className="flex text-yellow-400 text-lg">
                                                    ★★★★★
                                                </div>
                                                <p className="text-slate-400 text-xs">
                                                    1,245개 리뷰
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* 투표 버튼 */}
                                        <div className="flex flex-col items-center space-y-2">
                                            <p className="text-slate-300 text-sm font-medium">내 평점</p>
                                            <div className="flex space-x-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        onClick={() => handleVote(star)}
                                                        className={`text-2xl transition-all hover:scale-110 ${
                                                            userVote && star <= userVote
                                                                ? "text-yellow-400"
                                                                : "text-slate-500 hover:text-yellow-300"
                                                        }`}
                                                        title={userVote === star ? "클릭하여 투표 취소" : `${star}점 투표`}
                                                    >
                                                        ★
                                                    </button>
                                                ))}
                                            </div>
                                            {userVote && (
                                                <p className="text-blue-400 text-xs">
                                                    {userVote}점 투표완료
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* 기본 게임 정보 */}
                                <div className="border-t border-slate-700 pt-4">
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">
                                                장르:
                                            </span>
                                            <span className="text-white">
                                                액션 어드벤처
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">
                                                개발사:
                                            </span>
                                            <span className="text-white">
                                                Nintendo EPD
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">
                                                출시일:
                                            </span>
                                            <span className="text-white">
                                                2017년 3월 3일
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">
                                                플랫폼:
                                            </span>
                                            <span className="text-white">
                                                Nintendo Switch
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">
                                                언어:
                                            </span>
                                            <span className="text-white">
                                                한국어 지원
                                            </span>
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
                            <div className="text-4xl font-bold text-black mb-2">
                                광고
                            </div>
                            <div className="text-slate-600 text-sm">
                                Advertisement Banner
                            </div>
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
                                                            ({game.reviews}개
                                                            리뷰)
                                                        </span>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        {game.tags.map(
                                                            (tag, tagIndex) => (
                                                                <span
                                                                    key={
                                                                        tagIndex
                                                                    }
                                                                    className="bg-blue-600 text-white text-xs px-2 py-1 rounded"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            )
                                                        )}
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
