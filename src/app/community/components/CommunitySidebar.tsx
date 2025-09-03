"use client";

import React from "react";
import { Mail, TrendingUp, Star } from "lucide-react";

export default function CommunitySidebar() {
  return (
    <div className="lg:col-span-1 flex flex-col gap-4">
      {/* 구독 카드 */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <Mail className="w-5 h-5" />
          <h4 className="font-semibold text-lg">뉴스레터 구독</h4>
        </div>
        <p className="text-sm mb-4 opacity-90">
          최신 게임 소식을 받아보세요
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="이메일 주소"
            className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-sm placeholder-white/70 text-white border border-white/30 focus:outline-none focus:border-white"
          />
          <button className="w-full p-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-white/90 transition-all cursor-pointer">
            구독하기
          </button>
        </div>
      </div>

      {/* 트렌딩 카드 */}
      <div className="bg-slate-800/50 backdrop-blur-sm p-5 rounded-2xl border border-slate-700 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <h4 className="font-semibold">인기 토픽</h4>
        </div>
        <div className="space-y-2">
          <div className="p-2 bg-slate-700/50 rounded-lg text-sm hover:bg-slate-700 transition-colors cursor-pointer">
            #발더스게이트3
          </div>
          <div className="p-2 bg-slate-700/50 rounded-lg text-sm hover:bg-slate-700 transition-colors cursor-pointer">
            #스팀세일
          </div>
          <div className="p-2 bg-slate-700/50 rounded-lg text-sm hover:bg-slate-700 transition-colors cursor-pointer">
            #PS5신작
          </div>
        </div>
      </div>

      {/* 광고 영역 */}
      <div className="h-[350px] bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-2xl shadow-2xl overflow-hidden relative">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent rotate-45 transform translate-x-[-100%] animate-pulse"></div>
        </div>

        {/* 광고 모집 문구 */}
        <div className="absolute top-4 left-0 right-0 text-center z-10">
          <div className="inline-block bg-black/70 backdrop-blur-sm px-5 py-2.5 rounded-full">
            <div className="flex items-center gap-2">
              <span className="text-xl">📢</span>
              <span className="text-yellow-300 text-base font-bold tracking-wider">
                광고 모집 중
              </span>
              <span className="text-xl">📢</span>
            </div>
          </div>
        </div>

        {/* 메인 광고 컨텐츠 */}
        <div className="relative h-full flex flex-col justify-center items-center p-8 text-center">
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-300" />
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                소중한 광고주
              </h3>
              <Star className="w-6 h-6 text-yellow-300" />
            </div>
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">
              모십니다!
            </h3>
          </div>

          {/* 장식 아이콘들 */}
          <Star className="absolute top-16 right-6 w-5 h-5 text-yellow-300 opacity-80 animate-ping" />
          <Star className="absolute bottom-16 left-6 w-4 h-4 text-white opacity-60 animate-pulse" />
          <Star className="absolute top-28 left-4 w-3 h-3 text-yellow-200 opacity-50 animate-bounce" />
          <Star className="absolute top-20 right-2 w-3 h-3 text-yellow-400 opacity-40 animate-pulse" />
        </div>

        {/* 테두리 네온 효과 */}
        <div className="absolute inset-0 rounded-2xl border-4 border-yellow-300/50 animate-pulse"></div>
      </div>
    </div>
  );
}