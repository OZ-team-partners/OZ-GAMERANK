"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/shared/lib/supabase";

interface SidebarProps {
  imageUrl?: string | null;
  title?: string;
  platform?: string | null;
  gameId: number;
  userVote?: number | null;
  onVote?: (rating: number) => void;
}

interface GameRating {
  averageRating: number;
  totalReviews: number;
}

interface SimilarGame {
  id: number;
  game_title: string;
  image_url: string | null;
  platform: string | null;
  rank: number | null;
  userRating: number; // 추가
  reviewCount: number; // 추가
}

export default function Sidebar({
  imageUrl,
  title,
  platform,
  gameId,
}: SidebarProps) {
  const router = useRouter();
  const [gameRating, setGameRating] = useState<GameRating>({
    averageRating: 0,
    totalReviews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [similarGames, setSimilarGames] = useState<SimilarGame[]>([]);
  const [similarGamesLoading, setSimilarGamesLoading] = useState(true);

  // 게임 평점 데이터 가져오기
  useEffect(() => {
    const fetchGameRating = async () => {
      console.log("Fetching rating for gameId:", gameId);

      try {
        const response = await fetch(`/api/game-comments?game_id=${gameId}`);
        console.log("API Response status:", response.status);

        if (response.ok) {
          const comments = await response.json();
          console.log("Comments data:", comments);

          const totalReviews = comments.length;
          console.log("Total reviews:", totalReviews);

          if (totalReviews > 0) {
            const totalRating = comments.reduce(
              (sum: number, comment: { rating: number }) =>
                sum + comment.rating,
              0
            );
            const averageRating = totalRating / totalReviews;
            console.log("Average rating:", averageRating);

            setGameRating({
              averageRating: Math.round(averageRating * 10) / 10,
              totalReviews,
            });
          } else {
            setGameRating({
              averageRating: 0,
              totalReviews: 0,
            });
          }
        } else {
          console.error(
            "API call failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching game rating:", error);
      } finally {
        setLoading(false);
      }
    };

    if (gameId && gameId > 0) {
      fetchGameRating();
    } else {
      console.log("Invalid gameId:", gameId);
      setLoading(false);
    }
  }, [gameId]);

  // 비슷한 게임 데이터 가져오기 (현재 게임 제외)
  useEffect(() => {
    const fetchSimilarGames = async () => {
      try {
        if (!supabase) {
          console.warn("Supabase client is not initialized");
          setSimilarGamesLoading(false);
          return;
        }

        // 모든 게임을 가져온 후 JavaScript에서 랜덤 선택
        const { data, error } = await supabase
          .from("rank_game")
          .select("id, game_title, image_url, platform, rank")
          .neq("id", gameId) // 현재 게임 제외
          .limit(500); // 먼저 10개만 가져와서 성능 최적화

        if (error) {
          console.error("Error fetching similar games:", error);
          setSimilarGames([]);
        } else {
          // JavaScript에서 랜덤하게 2개 선택
          const shuffled = (data || []).sort(() => 0.5 - Math.random());
          const selectedGames = shuffled.slice(0, 2);

          // 각 게임의 리뷰 데이터 가져오기
          const gamesWithRatings = await Promise.all(
            selectedGames.map(async (game) => {
              try {
                const response = await fetch(
                  `/api/game-comments?game_id=${game.id}`
                );
                if (response.ok) {
                  const comments = await response.json();
                  const totalReviews = comments.length;
                  const averageRating =
                    totalReviews > 0
                      ? comments.reduce(
                          (sum: number, comment: { rating: number }) =>
                            sum + comment.rating,
                          0
                        ) / totalReviews
                      : 0;

                  return {
                    ...game,
                    userRating: Math.round(averageRating * 10) / 10,
                    reviewCount: totalReviews,
                  };
                }
              } catch (error) {
                console.error(
                  `Error fetching rating for game ${game.id}:`,
                  error
                );
              }

              return {
                ...game,
                userRating: 0,
                reviewCount: 0,
              };
            })
          );

          setSimilarGames(gamesWithRatings);
        }
      } catch (error) {
        console.error("Error fetching similar games:", error);
        setSimilarGames([]);
      } finally {
        setSimilarGamesLoading(false);
      }
    };

    if (gameId && gameId > 0) {
      fetchSimilarGames();
    } else {
      setSimilarGamesLoading(false);
    }
  }, [gameId]);

  // 댓글 섹션으로 스크롤하는 함수
  const scrollToComments = () => {
    const commentsSection = document.querySelector("[data-comments-section]");
    if (commentsSection) {
      commentsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // 별점 표시 컴포넌트 (절반 별 포함)
  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex text-yellow-400 text-lg">
        {/* 완전한 별 */}
        {Array.from({ length: fullStars }, (_, i) => (
          <span key={i}>★</span>
        ))}
        {/* 절반 별 */}
        {hasHalfStar && <span>☆</span>}
        {/* 빈 별 */}
        {Array.from({ length: emptyStars }, (_, i) => (
          <span key={`empty-${i}`}>☆</span>
        ))}
      </div>
    );
  };

  // 게임 상세 페이지로 이동하는 함수 (Next.js Router 사용)
  const navigateToGame = (gameId: number) => {
    router.push(`/game_info/${gameId}`);
  };

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
                <div className="text-3xl font-bold text-yellow-400">
                  {loading ? "..." : gameRating.averageRating.toFixed(1)}
                </div>
                <div>
                  <StarRating rating={gameRating.averageRating} />
                  <p className="text-slate-400 text-xs">
                    {loading
                      ? "로딩 중..."
                      : `${gameRating.totalReviews}개 리뷰`}
                  </p>
                </div>
              </div>

              {/* 평가하기 버튼 */}
              <button
                onClick={scrollToComments}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                평가하기
              </button>
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
            이런 게임 어때요?
          </div>
          <div className="space-y-4">
            {similarGamesLoading ? (
              <div className="text-center text-slate-400 py-4">
                게임을 불러오는 중...
              </div>
            ) : similarGames.length > 0 ? (
              similarGames.map((game) => (
                <div
                  key={game.id}
                  className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
                  onClick={() => navigateToGame(game.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-35 h-25 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden bg-slate-700">
                      <Image
                        src={game.image_url || "잠깐! 새로고침 해주세요!"}
                        alt={`${game.game_title} 로고`}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xl font-bold text-white mb-2">
                        {game.game_title}
                      </h4>
                      <div className="flex items-start">
                        <div className="space-y-2 mr-8">
                          <div className="flex items-center space-x-2">
                            <Star
                              size={16}
                              className="text-yellow-400 fill-current"
                            />
                            <span className="text-yellow-400 font-bold">
                              {game.userRating.toFixed(1)}
                            </span>
                          </div>
                          <div className="text-slate-400 text-sm">
                            ({game.reviewCount}개 리뷰)
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            {game.platform || "플랫폼"}{" "}
                            {game.rank ? `${game.rank}위` : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-slate-500 py-8">
                추천할 게임이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
