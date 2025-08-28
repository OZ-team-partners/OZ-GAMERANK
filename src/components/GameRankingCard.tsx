import React from "react";
import { GameRanking } from "../types/gameRanking";
import Image from "next/image";

interface GameRankingCardProps {
  game: GameRanking;
  showDetails?: boolean;
}

export default function GameRankingCard({
  game,
  showDetails = false,
}: GameRankingCardProps) {
  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-500 text-white";
    if (rank === 2) return "bg-gray-400 text-white";
    if (rank === 3) return "bg-amber-600 text-white";
    return "bg-gray-200 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="flex items-center p-4">
        {/* 순위 배지 */}
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4 ${getRankBadgeColor(
            game.rank_position
          )}`}
        >
          {game.rank_position}
        </div>

        {/* 게임 이미지 */}
        <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
          {game.game_image_url ? (
            <Image
              src={game.game_image_url}
              alt={game.game_name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-xs">No Image</span>
            </div>
          )}
        </div>

        {/* 게임 정보 */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-900 truncate">
            {game.game_name}
          </h3>

          {game.genre && (
            <p className="text-sm text-gray-600 mb-1">{game.genre}</p>
          )}

          {game.rating && (
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(game.rating!)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {game.rating.toFixed(1)} ({game.review_count.toLocaleString()})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 상세 정보 (선택적) */}
      {showDetails && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-4">
          {game.game_description && (
            <p className="text-sm text-gray-600 mb-2">
              {game.game_description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            {game.developer && (
              <div>
                <span className="font-medium">개발사:</span> {game.developer}
              </div>
            )}
            {game.publisher && (
              <div>
                <span className="font-medium">배급사:</span> {game.publisher}
              </div>
            )}
            {game.release_date && (
              <div>
                <span className="font-medium">출시일:</span>{" "}
                {new Date(game.release_date).toLocaleDateString("ko-KR")}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
