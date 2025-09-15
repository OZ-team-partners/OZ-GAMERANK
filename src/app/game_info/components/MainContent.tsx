"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function MainContent({ platform = "" }: { platform?: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const SHOW_MEDIA = false;
//젤다의 전설 목업데이터를(사진,영상,게임소개) 'true'로 변경하면 데이터가 표시됩니다.


  const gameMedia = [
    {
      type: "image",
      src: "/images/console/nintendo/nintendo_The Legend of Zelda- Breath of the Wild_main.png",
      alt: "젤다의 전설 브레스 오브 더 와일드 1",
    },
    {
      type: "image",
      src: "/images/console/nintendo/nintendo_The Legend of Zelda- Breath of the Wild_01.jpg",
      alt: "젤다의 전설 브레스 오브 더 와일드 2",
    },
    {
      type: "youtube",
      src: "https://youtu.be/utRRCvdV1Dk?si=T-WEFEpE5xEaQydV",
      embedSrc:
        "https://www.youtube.com/embed/utRRCvdV1Dk?autoplay=1&mute=1&rel=0&modestbranding=1",
      thumbnail: "https://img.youtube.com/vi/utRRCvdV1Dk/maxresdefault.jpg",
      alt: "젤다의 전설 브레스 오브 더 와일드 트레일러",
    },
    {
      type: "image",
      src: "/images/console/nintendo/nintendo_The Legend of Zelda- Breath of the Wild_03.jpg",
      alt: "젤다의 전설 브레스 오브 더 와일드 4",
    },
    {
      type: "image",
      src: "/images/console/nintendo/nintendo_The Legend of Zelda- Breath of the Wild_04.jpg",
      alt: "젤다의 전설 브레스 오브 더 와일드 5",
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gameMedia.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + gameMedia.length) % gameMedia.length
    );
  };

  const goToImage = (targetIndex: number) => {
    setCurrentImageIndex(targetIndex);
  };

  return (
    <div>
      {/* 게임 이미지 캐러셀 */}
      {SHOW_MEDIA && (
        <div className="relative mb-6">
          <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl overflow-hidden shadow-2xl relative">
            {gameMedia[currentImageIndex].type === "youtube" ? (
              <iframe
                src={gameMedia[currentImageIndex].embedSrc}
                title={gameMedia[currentImageIndex].alt}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={gameMedia[currentImageIndex].src}
                alt={gameMedia[currentImageIndex].alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}

            {/* 캐러셀 네비게이션 버튼 - 유튜브 재생 중이 아닐 때만 표시 */}
            {gameMedia[currentImageIndex].type !== "youtube" && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 hover:scale-110 text-white p-2 rounded-full transition-all duration-200 cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 hover:scale-110 text-white p-2 rounded-full transition-all duration-200 cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* 썸네일 네비게이션 */}
      {SHOW_MEDIA && (
        <div className="grid grid-cols-5 gap-4 mb-6">
          {gameMedia.map((media, index) => (
            <div
              key={index}
              className={`aspect-video rounded-lg overflow-hidden cursor-pointer transition-all relative ${
                index === currentImageIndex
                  ? "ring-4 ring-yellow-400"
                  : "ring-2 ring-transparent hover:ring-slate-400"
              }`}
              onClick={() => goToImage(index)}
            >
              {media.type === "youtube" ? (
                <div className="relative w-full h-full group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={media.thumbnail}
                    alt={media.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 3.2L14.5 8.5c.7.4.7 1.4 0 1.8L6.3 16.8c-.7.4-1.6-.1-1.6-.9V4.1c0-.8.9-1.3 1.6-.9z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <Image
                  src={media.src}
                  alt={media.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
            </div>
          ))}
        </div>
      )}

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
          여름 한복판, 에어컨이 고장 난 도서관에서 글을 쓰려고 앉아 있었는데, 옆자리 학생이 갑자기 종이비행기를 접더니 창문을 열고 멀리 날려버렸다. 그 비행기가 곡선을 그리며 날아가더니, 지나가던 까마귀의 날개에 걸려 함께 사라졌다.
          <br />그 순간 도서관 안은 이상하게 조용해졌고, 사람들은 모두 고개를 들어 창문 밖을 바라봤다. 누군가는 “이제 곧 비가 오려나 보다”라고 중얼거렸고, 나는 괜히 가슴이 두근거려서 노트 첫 장에 이렇게 적었다.
          <br />“게임 내용을 DB에 안넣었어요.”
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
          <h3 className="text-lg font-semibold text-white mb-3">
            시스템 요구사항
          </h3>
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">플랫폼:</span>
                <span className="text-white ml-2">
                  {platform || "정보 없음"}
                </span>
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
    </div>
  );
}
