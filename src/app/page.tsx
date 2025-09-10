"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/shared/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import NewsletterPage from "./blog/newsletter/page";
import { useRouter } from "next/navigation";
import FrontRankTop3 from "./rank/front_rank_top3";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSmallSlide] = useState(0);
  // 이 부분들을 주석 처리하거나 제거
  // const [rankingData, setRankingData] = useState(null);
  // const [rankingLoading, setRankingLoading] = useState(true);

  // Supabase 연결 테스트
  useEffect(() => {
    const testConnection = async () => {
      try {
        if (!supabase) {
          console.log("Supabase 인스턴스가 존재하지 않습니다.");
          return;
        }
        const { data, error } = await supabase
          .from("test")
          .select("*")
          .limit(1);

        if (error) {
          console.log("Supabase 연결 실패:", error);
        } else {
          console.log("Supabase 연결 성공!", data);
        }
      } catch (error) {
        console.log("Supabase 테스트 중 오류:", error);
      }
    };

    testConnection();
  }, []);

  // 이 useEffect를 주석 처리하거나 제거
  // useEffect(() => {
  //   const fetchRankingSummary = async () => {
  //     try {
  //       const response = await fetch("/api/ranking-summary");
  //       const result = await response.json();
  //       if (result.success) {
  //         setRankingData(result.data);
  //       }
  //     } catch (error) {
  //       console.error("랭킹 데이터 로드 실패:", error);
  //     } finally {
  //       setRankingLoading(false);
  //     }
  //   };
  //   fetchRankingSummary();
  // }, []);

  const mainSlides = [
    {
      id: 1,
      title: "8월 게임 뉘우스",
      desc: "8월 의 새로운 소식 from  Jung-Sik",
      render: () => <NewsletterPage />,
    },
    //  이미지 대신 newsletter를 사용 하고 싶음 image: "/icon/page_icon/mainSlides1.png",},
    {
      id: 2,
      title: "2024 GOTY",
      desc: "24년을 휩쓴 GOTY작",
      image:
        "/images/console/nintendo/nintendo_The Legend of Zelda- Breath of the Wild_01.jpg",
    },
    {
      id: 3,
      title: "모바일 게임",
      desc: "빈칸",
      image: "/icon/page_icon/mainSlides3.png",
    },
    {
      id: 4,
      title: "인디 게임",
      desc: "빈칸",
      image: "/icon/page_icon/mainSlides4.png",
    },
  ];

  const smallSlides = [
    {
      id: 1,
      title: "디지털 50% sale 지금 바로!",
      smallSlides_text: "지금이 제일 저렴할때!",
      image:
        "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=300&fit=crop",
      href: "/community/board",
    },
    {
      id: 2,
      title: "게임특전",
      smallSlides_text: "지금이 제일 할인률이 높은거 아시죠?",
      image: "/rpg.jpg",
      href: "/small_contents/game_mbti/",
    },
    {
      id: 3,
      title: "ads",
      smallSlides_text: "S&P 500은 언제가 제일 싸다?",
      image: "/rpg.jpg",
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
  const router = useRouter();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mainSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + mainSlides.length) % mainSlides.length
    );
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* 메인 슬라이더 */}
      <section className="py-10 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500"
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
                    className="rounded-lg overflow-hidden relative cursor-pointer h-110"
                    onClick={() => {
                      if (slide.id === 1) {
                        window.location.href = "/blog/newsletter";
                      } else if (slide.id === 2) {
                        window.location.href = "/game_info";
                      } else {
                        setCurrentSlide(index);
                      }
                    }}
                  >
                    {typeof slide.image === "string" ? (
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        width={800}
                        height={320}
                        className="flex-shrink-0 object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full">{slide.render()}</div>
                    )}
                    <div className="absolute inset-0  from-indigo-500 to-purple-600 bg-opacity-50 flex flex-col justify-end p-4 text-white">
                      <h3 className="text-2xl font-bold">{slide.title}</h3>
                      <p className="font-sans text-xl">{slide.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 좌우 버튼 */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-indigo-400"
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
              }}
              aria-label="이전 슬라이드"
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

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-indigo-400"
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
              }}
              aria-label="다음 슬라이드"
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
            {/* 인디케이터 - 사진 내부 하단 중앙 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {mainSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full ${
                    idx === currentSlide ? "bg-indigo-500" : "bg-slate-600"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 작은 슬라이더 (4개) */}
      <section className="py-7 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="flex items-center justify-between">
              {/* 좌우 페이지 버튼이동 구현 안함 */}
              {/* <button
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
              </button> */}

              <div className="flex-1 mx-16">
                <div className="grid grid-cols-4 gap-4">
                  {smallSlides
                    .slice(currentSmallSlide, currentSmallSlide + 4)
                    .map((slide) => (
                      <Link
                        key={slide.id}
                        href={slide.href || "#"} // slide 객체에 href 속성 추가
                      >
                        <div className="bg-slate-600 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                          <Image
                            src={slide.image} // slide 객체의 image 경로
                            alt={slide.title} // 웹 접근성을 위한 alt 속성
                            width={768} // w-full을 고정값으로 변환 (컨테이너 너비에 맞춰 조절)
                            height={600} // h-45 → 45*4 = 180px
                            className="object-cover"
                          />
                          <div className="h-20 flex flex-col justify-end items-start p-3">
                            <h3
                              className={`font-semibold ${
                                slide.title === "game-bti"
                                  ? "font-bangers text-xl"
                                  : ""
                              }`}
                            >
                              {slide.title}
                            </h3>
                            <p className="text-sm text-gray-300 mt-1">
                              {slide.smallSlides_text}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
              {/* 좌우 페이지 버튼이동 구현 안함 */}
              {/* <button
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
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* 순위 차트 */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FrontRankTop3 />
        </div>
      </section>

      {/* HOT ISSUE 섹션 */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-white font-bangers">
            🔥🔥🔥GAME RANK : HOT ISSUE 🔥🔥🔥
          </h2>

          {/* 상단 4개 컨텐츠 (170x120) */}
          <div className="flex justify-between mb-10">
            {[
              {
                id: 1,
                image: "/icon/page_icon/mainUpperIcon1.png",
                title: "게임 랭킹 최신 업데이트",
                description: "인기 게임들의 최신 랭킹 정보를 확인하세요",
              },
              {
                id: 2,
                image: "/icon/page_icon/mainUpperIcon2.png",
                title: "커뮤니티 게시판",
                description: "게이머들과 정보를 공유하고 소통하세요",
              },
              {
                id: 3,
                image: "/icon/page_icon/mainUpperIcon3.png",
                title: "게임 MBTI 테스트",
                description: "나만의 게임 성향을 알아보는 재미있는 테스트",
              },
              {
                id: 4,
                image: "/icon/page_icon/mainUpperIcon4.png",
                title: "게임 뉴스레터",
                description: "최신 게임 소식과 트렌드를 메일로 받아보세요",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="bg-slate-800  shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                style={{
                  width: "290px",
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => router.push("/community/board")} // 클릭 시 이동
              >
                <div
                  className="flex-1 bg-gradient-to-br from-emerald-500 to-indigo-500 flex items-center justify-center"
                  style={{ height: "70px" }}
                >
                  <Image
                    src={item.image ?? "/default.png"}
                    alt={item.title}
                    width={320} // w-80 → 80*4 = 320px
                    height={148} // h-37 → 37*4 = 148px
                    className="object-cover rounded"
                  />
                </div>
                <div className="p-2 text-center">
                  <h4 className="font-semibold text-white text-xs mb-1">
                    {item.title}
                  </h4>
                  <p className="text-slate-300 text-xs">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 하단 세로 나열 컨텐츠들 (728x40) */}
          <div className="space-y-3">
            {[
              {
                id: 1,
                image: "/icon/page_icon/mainUpperIcon1.png",
                title: "League of Legends 월드 챔피언십 2024 개최 확정",
                subtitle: "올해도 전 세계 게이머들의 축제가 열립니다",
                topic: "e 스포츠",
                time: "14:20",
              },
              {
                id: 2,
                image: "/icon/page_icon/mainUpperIcon2.png",
                title: "Valorant 새로운 요원 'Neon' 공개",
                subtitle: "한국 출신 요원으로 게임 메타 변화 예상",
                topic: "e 스포츠",
                time: "14:20",
              },
              {
                id: 3,
                image: "/icon/page_icon/mainUpperIcon3.png",
                title: "PUBG Mobile 글로벌 챔피언십 2024",
                subtitle: "모바일 배틀로얄의 최고 권위 대회",
                topic: "e 스포츠",
                time: "14:20",
              },
              {
                id: 4,
                image: "/icon/page_icon/mainUpperIcon4.png",
                title: "Genshin Impact 4.0 업데이트 소식",
                subtitle: "새로운 지역과 캐릭터 추가 예정",
                topic: "업데이트",
                time: "19:11",
              },
              {
                id: 5,
                image: "/icon/page_icon/mainUpperIcon5.png",
                title: "FIFA 24 e스포츠 리그 개막",
                subtitle: "전 세계 최고의 FIFA 플레이어들이 모입니다",
                topic: "기타",
                time: "209:20",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="bg-slate-800  shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex items-center border-t border-b border-gray-700"
                style={{
                  width: "900px",
                  height: "70px",
                  margin: "0 auto",
                }}
                onClick={() => router.push("/community/board")} // 클릭 시 이동
              >
                <div className="flex items-center w-full px-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80} // style width 적용
                    height={60} // style height 적용
                    className="object-cover rounded mr-3"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm mb-1 truncate">
                      {item.title}
                    </h4>
                    <p className="text-slate-300 text-xs truncate">
                      {item.subtitle}
                    </p>
                  </div>
                  {/* 주제와 시간이 표시되는 부분 */}
                  <div className="flex items-center text-xs text-slate-400 flex-shrink-0 ml-4">
                    <span>{item.topic}</span>
                    <span className="mx-2">|</span>
                    <span>{item.time}</span>
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
