"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SmallSlide } from "../types";

const smallSlides: SmallSlide[] = [
  {
    id: 1,
    title: "game-bti",
    smallSlides_text: "게임도 적성검사가 있는거 아세요?",
    image: "/icon/page_icon/small_contents_game_mbti.png",
    href: "/small_contents/game_mbti/",
  },
  {
    id: 2,
    title: "GAMERANK 뉴스레터 구독하기",
    smallSlides_text: "매주 최신 게임 소식과 독점 정보를 받아보세요!",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    href: "/blog/newsletter",
  },
  {
    id: 3,
    title: "디지털 50% sale 지금 바로!",
    smallSlides_text: "지금이 제일 저렴할때!",
    image: "/images/home/ads1.png",
    href: "/community",
  },
  {
    id: 4,
    title: "모여봐요 동물의 숲!",
    smallSlides_text: "지금이 제일 할인률이 높은거 아시죠?",
    image: "/images/home/ads2.jpg",
    href: "/small_contents/game_mbti/",
  },
];

export default function SmallCardsGrid() {
  const [currentSmallSlide] = useState(0);

  return (
    <section className="py-12 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-400 text-sm font-medium uppercase tracking-wider">
              Promotion
            </span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            진행중인 프로모션
          </h2>
          <p className="text-lg text-slate-300 font-light">
            놓치면 후회하는 특별 혜택들 🎁
          </p>
          
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {smallSlides
            .slice(currentSmallSlide, currentSmallSlide + 4)
            .map((slide) => (
              <Link key={slide.id} href={slide.href || "#"}>
                <div className="group relative backdrop-blur-sm bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl shadow-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={400}
                      height={160}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* 뉴스레터 카드에만 텍스트 오버레이 추가 */}
                    {slide.id === 2 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="text-center">
                          <h3 className="text-3xl font-black text-white mb-2 drop-shadow-lg">렙업 소식통</h3>
                          <p className="text-base font-bold text-white/95 drop-shadow-md">게임랭킹 사이트 공식 뉴스레터</p>
                        </div>
                      </div>
                    )}


                    <div className="absolute top-3 right-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-purple-400 font-bold uppercase">HOT</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-2">
                    <h3 className={`font-bold text-white group-hover:text-purple-400 transition-colors duration-300 ${
                      slide.title === "game-bti" ? "font-bangers text-lg" : "text-base"
                    }`}>
                      {slide.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {slide.smallSlides_text}
                    </p>
                    
                  </div>
                  
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}