"use client";

import Image from "next/image";
import NewsletterPage from "@/app/blog/newsletter/page";
import { MainSlide } from "../types";
import { useSlider } from "../hooks/useSlider";
import React, { useEffect, useState } from "react";
import { communityApi } from "@/lib/supabase";

const mainSlides: MainSlide[] = [
  {
    id: 1,
    title: "GAME RANK",
    desc: "",
    image: "/images/home/GAME_RANK_main.png",
  },
  {
    id: 2,
    title: "2024 GOTY",
    desc: "24년을 휩쓴 GOTY작",
    image: "/images/home/mainSlide2.jpg",
  },
  {
    id: 3,
    title: "online 게임",
    desc: "인기 online 게임",
    image: "/images/home/mainSlide3.jpg",
  },
  {
    id: 4,
    title: "steam 게임",
    desc: "뜨겁다 뜨거워 steam 게임",
    image: "/images/home/mainSlide4.jpg",
  },
  {
    id: 5,
    title: "8월 게임 뉘우스",
    desc: "8월 의 새로운 소식 from Jung-Sik",
    render: () => <NewsletterPage />,
  },
];

export default function MainSlider() {
  const { currentSlide, nextSlide, prevSlide, goToSlide } = useSlider({
    totalSlides: mainSlides.length,
    autoPlay: true,
    autoPlayInterval: 5000,
  });

  const handleSlideClick = (slide: MainSlide, index: number) => {
    if (slide.id === 1) {
      const element = document.getElementById("front-rank-top-3");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (slide.id === 2) {
      window.location.href = "/game_info/2978";
    } else if (slide.id === 3) {
      window.location.href = "/game_info/2885";
    } else if (slide.id === 4) {
      window.location.href = "/game_info/2687";
    } else if (slide.id === 5) {
      window.location.href = "/blog/newsletter";
    } else if (slide.id === 6) {
    } else {
      goToSlide(index);
    }
  };

  return (
    <section className="py-15 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-80"></div>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
        <div className="relative overflow-hidden rounded-2xl backdrop-blur-sm bg-black/20 shadow-2xl border border-white/10">
          <div
            className="flex transition-all duration-700 ease-out"
            style={{
              width: `${mainSlides.length * 100}%`,
              transform: `translateX(-${
                currentSlide * (100 / mainSlides.length)
              }%)`,
            }}
          >
            {mainSlides.map((slide, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{
                  width: `${100 / mainSlides.length}%`,
                }}
              >
                <div
                  className="rounded-xl overflow-hidden relative cursor-pointer h-96 w-full group hover:scale-[0.98] transition-all duration-300"
                  onClick={() => handleSlideClick(slide, index)}
                >
                  {typeof slide.image === "string" ? (
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      sizes="100vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900">
                      {slide.render?.()}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 max-w-xs text-white">
                    <div className="backdrop-blur-md bg-black/50 rounded-lg px-3 py-1.5 border border-white/10">
                      <h3 className="text-sm font-bold mb-0.5 text-white drop-shadow-lg">
                        {slide.title}
                      </h3>
                      <p className="text-xs text-slate-300 opacity-80">
                        {slide.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 좌우 버튼 */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full backdrop-blur-md bg-black/30 border border-white/20 text-white hover:bg-indigo-600/50 hover:border-indigo-400/50 transition-all duration-300 flex items-center justify-center group"
            aria-label="이전 슬라이드"
          >
            <svg
              className="w-6 h-6 transition-transform group-hover:-translate-x-0.5"
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

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full backdrop-blur-md bg-black/30 border border-white/20 text-white hover:bg-indigo-600/50 hover:border-indigo-400/50 transition-all duration-300 flex items-center justify-center group"
            aria-label="다음 슬라이드"
          >
            <svg
              className="w-6 h-6 transition-transform group-hover:translate-x-0.5"
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

          {/* 인디케이터 */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {mainSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? "bg-indigo-500 shadow-lg shadow-indigo-500/50 scale-110"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
