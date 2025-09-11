"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SmallSlide } from "../types";

const smallSlides: SmallSlide[] = [
  {
    id: 1,
    title: "디지털 50% sale 지금 바로!",
    smallSlides_text: "지금이 제일 저렴할때!",
    image: "/images/home/ads1.png",
    href: "/community/board",
  },
  {
    id: 2,
    title: "게임특전",
    smallSlides_text: "지금이 제일 할인률이 높은거 아시죠?",
    image: "/images/home/ads2.jpg",
    href: "/small_contents/game_mbti/",
  },
  {
    id: 3,
    title: "ads",
    smallSlides_text: "S&P 500은 언제가 제일 싸다?",
    image: "/images/home/ads3.jpg",
    href: "/small_contents/game_mbti/",
  },
  {
    id: 4,
    title: "game-bti",
    smallSlides_text: "게임도 적성검사가 있는거 아세요?",
    image: "/icon/page_icon/small_contents_game_mbti.png",
    href: "/small_contents/game_mbti/",
  },
];

export default function SmallCardsGrid() {
  const [currentSmallSlide] = useState(0);

  return (
    <section className="py-12 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-400 text-sm font-medium uppercase tracking-wider">
              Promotion
            </span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            진행중인 프로모션
          </h2>
          <p className="text-xl text-slate-300 font-light">
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
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-purple-400 font-bold uppercase">HOT</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-2">
                    <h3 className={`font-bold text-white group-hover:text-purple-400 transition-colors duration-300 ${
                      slide.title === "game-bti" ? "font-bangers text-xl" : "text-lg"
                    }`}>
                      {slide.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                      {slide.smallSlides_text}
                    </p>
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-purple-400 font-medium uppercase tracking-wide">
                        프로모션
                      </span>
                      <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
                        <svg className="w-4 h-4 text-purple-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}