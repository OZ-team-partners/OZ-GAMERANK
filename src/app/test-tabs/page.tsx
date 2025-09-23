"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Trophy, Crown, Star } from "lucide-react";

// Top 3 카드 샘플 데이터
const sampleTopThreeGames = [
  {
    id: 3505,
    rank: 1,
    title: "리그 오브 레전드",
    subtitle: "라이엇 게임즈",
    imageUrl: "/icon/rank_icon/online1.jpeg",
    isNew: false,
    isHot: true,
    rankChange: 2,
    consecutiveWeeks: 5
  },
  {
    id: 3506,
    rank: 2,
    title: "FC 온라인",
    subtitle: "EA코리아 스튜디오",
    imageUrl: "/icon/rank_icon/online2.jpeg",
    isNew: false,
    isHot: false,
    rankChange: 0
  },
  {
    id: 3507,
    rank: 3,
    title: "발로란트",
    subtitle: "라이엇 게임즈",
    imageUrl: "/icon/rank_icon/online3.jpeg",
    isNew: true,
    isHot: false,
    rankChange: -1
  }
];

// 버전 1: 현재 버전 (우측 상단 작은 뱃지)
function TopThreeCardV1({ game }: { game: typeof sampleTopThreeGames[0] }) {
  const getCardStyle = (rank: number) => {
    const baseStyle = "bg-slate-800/50 backdrop-blur-sm shadow-xl";
    const borderStyle = rank === 1
      ? "border border-yellow-500/50 hover:border hover:border-yellow-500"
      : rank === 2
      ? "border border-gray-400/50 hover:border hover:border-gray-400"
      : rank === 3
      ? "border border-amber-600/50 hover:border hover:border-amber-600"
      : "border border-slate-700/30 hover:border hover:border-slate-600";

    return `${baseStyle} ${borderStyle}`;
  };

  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 text-white shadow-[0_6px_20px_rgba(0,0,0,0.3)]";
      case 2:
        return "bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600 text-white shadow-[0_6px_20px_rgba(0,0,0,0.3)]";
      case 3:
        return "bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 text-white shadow-[0_6px_20px_rgba(0,0,0,0.3)]";
      default:
        return "bg-slate-600 text-white";
    }
  };

  return (
    <Link href={`/game_info/${game.id}`}>
      <div className="group relative">
        <div
          className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer ${getCardStyle(game.rank)}`}
        >
          {/* 이미지 영역 */}
          <div className="relative aspect-video overflow-hidden bg-slate-900">
            <Image
              src={game.imageUrl}
              alt={game.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* 순위 배지 - 좌측 상단 */}
            <div className={`absolute top-3 left-3 w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${getRankBadgeStyle(game.rank)} transform-gpu`}>
              <div className="relative z-10">
                {game.rank}
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-white/60 blur-sm pointer-events-none"></div>
            </div>

            {/* 뱃지들 - 우측 상단 (현재 버전) */}
            <div className="absolute top-3 right-3 flex gap-2">
              {game.consecutiveWeeks && game.rank === 1 && (
                <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                  <Trophy className="w-3 h-3" />
                  <span>{game.consecutiveWeeks}주 연속</span>
                </div>
              )}
              {game.isNew && (
                <div className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full uppercase shadow-md">
                  NEW
                </div>
              )}
              {game.isHot && (
                <div className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full uppercase flex items-center gap-1 animate-pulse shadow-md">
                  <Flame className="w-3 h-3" />
                  <span>HOT</span>
                </div>
              )}
            </div>
          </div>

          {/* 정보 영역 */}
          <div className="p-4 relative">
            <h3 className="font-bold text-white text-lg line-clamp-1 group-hover:text-orange-400 transition-colors duration-200 mb-2">
              {game.title}
            </h3>
            <p className="text-slate-400 text-sm line-clamp-2">
              {game.subtitle}
            </p>

            {/* 순위 변화 표시 - 우측 하단 */}
            {game.rankChange !== undefined && (
              <div className="absolute bottom-4 right-4">
                {game.rankChange === 0 ? (
                  <div className="flex items-center justify-center w-6 h-6 bg-slate-600/80 rounded-full">
                    <span className="text-slate-300 text-xs font-bold">-</span>
                  </div>
                ) : game.rankChange > 0 ? (
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                    <span className="text-green-400 text-xs">▲</span>
                    <span className="text-green-400 text-xs font-bold">{game.rankChange}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-2 py-1 bg-red-500/20 rounded-full border border-red-500/30">
                    <span className="text-red-400 text-xs">▼</span>
                    <span className="text-red-400 text-xs font-bold">{Math.abs(game.rankChange)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

// 버전 2: 카드 하단 크게 표시 + 특별한 효과
function TopThreeCardV2({ game }: { game: typeof sampleTopThreeGames[0] }) {
  const getCardStyle = (rank: number) => {
    const baseStyle = "bg-slate-800/50 backdrop-blur-sm shadow-xl";
    const borderStyle = rank === 1
      ? "border border-yellow-500/50 hover:border hover:border-yellow-500"
      : rank === 2
      ? "border border-gray-400/50 hover:border hover:border-gray-400"
      : rank === 3
      ? "border border-amber-600/50 hover:border hover:border-amber-600"
      : "border border-slate-700/30 hover:border hover:border-slate-600";

    return `${baseStyle} ${borderStyle}`;
  };

  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 text-white shadow-[0_6px_20px_rgba(0,0,0,0.3)]";
      case 2:
        return "bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600 text-white shadow-[0_6px_20px_rgba(0,0,0,0.3)]";
      case 3:
        return "bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 text-white shadow-[0_6px_20px_rgba(0,0,0,0.3)]";
      default:
        return "bg-slate-600 text-white";
    }
  };

  return (
    <Link href={`/game_info/${game.id}`}>
      <div className="group relative">
        <div
          className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer ${getCardStyle(game.rank)}`}
        >
          {/* 이미지 영역 */}
          <div className="relative aspect-video overflow-hidden bg-slate-900">
            <Image
              src={game.imageUrl}
              alt={game.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* 순위 배지 - 좌측 상단 */}
            <div className={`absolute top-3 left-3 w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${getRankBadgeStyle(game.rank)} transform-gpu`}>
              <div className="relative z-10">
                {game.rank}
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-white/60 blur-sm pointer-events-none"></div>
            </div>

            {/* 뱃지들 - 우측 상단 */}
            <div className="absolute top-3 right-3 flex gap-2">
              {game.isNew && (
                <div className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full uppercase shadow-md">
                  NEW
                </div>
              )}
              {game.isHot && (
                <div className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full uppercase flex items-center gap-1 animate-pulse shadow-md">
                  <Flame className="w-3 h-3" />
                  <span>HOT</span>
                </div>
              )}
            </div>
          </div>

          {/* 정보 영역 */}
          <div className="p-4 relative">
            <h3 className="font-bold text-white text-lg line-clamp-1 group-hover:text-orange-400 transition-colors duration-200 mb-2">
              {game.title}
            </h3>
            <p className="text-slate-400 text-sm line-clamp-2 mb-3">
              {game.subtitle}
            </p>

            {/* 연속 1위 표시 - 카드 하단에 크게 */}
            {game.consecutiveWeeks && game.rank === 1 && (
              <div className="mb-3">
                <div className="relative overflow-hidden bg-gradient-to-r from-yellow-500/20 via-yellow-400/30 to-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 animate-pulse">
                  {/* 배경 글로우 효과 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-yellow-400/20 to-yellow-500/10 animate-pulse"></div>

                  <div className="relative flex items-center justify-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-400 animate-bounce" />
                    <span className="text-yellow-300 font-bold text-sm tracking-wide">
                      🏆 {game.consecutiveWeeks}주 연속 1위 👑
                    </span>
                    <Crown className="w-5 h-5 text-yellow-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>

                  {/* 반짝이는 효과 */}
                  <div className="absolute top-1 left-4 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
                  <div className="absolute bottom-1 right-6 w-1 h-1 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
            )}

            {/* 순위 변화 표시 - 우측 하단 */}
            {game.rankChange !== undefined && (
              <div className="absolute bottom-4 right-4">
                {game.rankChange === 0 ? (
                  <div className="flex items-center justify-center w-6 h-6 bg-slate-600/80 rounded-full">
                    <span className="text-slate-300 text-xs font-bold">-</span>
                  </div>
                ) : game.rankChange > 0 ? (
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                    <span className="text-green-400 text-xs">▲</span>
                    <span className="text-green-400 text-xs font-bold">{game.rankChange}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-2 py-1 bg-red-500/20 rounded-full border border-red-500/30">
                    <span className="text-red-400 text-xs">▼</span>
                    <span className="text-red-400 text-xs font-bold">{Math.abs(game.rankChange)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

// 버전 3: 순위 번호 옆에 배치
function TopThreeCardV3({ game }: { game: typeof sampleTopThreeGames[0] }) {
  const getCardStyle = (rank: number) => {
    const baseStyle = "bg-slate-800/50 backdrop-blur-sm shadow-xl";
    const borderStyle = rank === 1
      ? "border border-yellow-500/50 hover:border hover:border-yellow-500"
      : rank === 2
      ? "border border-gray-400/50 hover:border hover:border-gray-400"
      : rank === 3
      ? "border border-amber-600/50 hover:border hover:border-amber-600"
      : "border border-slate-700/30 hover:border hover:border-slate-600";

    return `${baseStyle} ${borderStyle}`;
  };

  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 text-white shadow-[0_6px_20px_rgba(0,0,0,0.3)]";
      case 2:
        return "bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600 text-white shadow-[0_6px_20px_rgba(0,0,0,0.3)]";
      case 3:
        return "bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 text-white shadow-[0_6px_20px_rgba(0,0,0,0.3)]";
      default:
        return "bg-slate-600 text-white";
    }
  };

  return (
    <Link href={`/game_info/${game.id}`}>
      <div className="group relative">
        <div
          className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer ${getCardStyle(game.rank)}`}
        >
          {/* 이미지 영역 */}
          <div className="relative aspect-video overflow-hidden bg-slate-900">
            <Image
              src={game.imageUrl}
              alt={game.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* 순위 배지 - 좌측 상단 */}
            <div className={`absolute top-3 left-3 w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${getRankBadgeStyle(game.rank)} transform-gpu`}>
              <div className="relative z-10">
                {game.rank}
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-white/60 blur-sm pointer-events-none"></div>
            </div>

            {/* 연속 1위 표시 - 순위 번호 옆 */}
            {game.consecutiveWeeks && game.rank === 1 && (
              <div className="absolute top-1 left-20 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg animate-pulse border border-yellow-400/50">
                <Star className="w-3 h-3" />
                <span>{game.consecutiveWeeks}주 연속</span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
              </div>
            )}

            {/* 뱃지들 - 우측 상단 */}
            <div className="absolute top-3 right-3 flex gap-2">
              {game.isNew && (
                <div className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full uppercase shadow-md">
                  NEW
                </div>
              )}
              {game.isHot && (
                <div className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full uppercase flex items-center gap-1 animate-pulse shadow-md">
                  <Flame className="w-3 h-3" />
                  <span>HOT</span>
                </div>
              )}
            </div>
          </div>

          {/* 정보 영역 */}
          <div className="p-4 relative">
            <h3 className="font-bold text-white text-lg line-clamp-1 group-hover:text-orange-400 transition-colors duration-200 mb-2">
              {game.title}
            </h3>
            <p className="text-slate-400 text-sm line-clamp-2">
              {game.subtitle}
            </p>

            {/* 순위 변화 표시 - 우측 하단 */}
            {game.rankChange !== undefined && (
              <div className="absolute bottom-4 right-4">
                {game.rankChange === 0 ? (
                  <div className="flex items-center justify-center w-6 h-6 bg-slate-600/80 rounded-full">
                    <span className="text-slate-300 text-xs font-bold">-</span>
                  </div>
                ) : game.rankChange > 0 ? (
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                    <span className="text-green-400 text-xs">▲</span>
                    <span className="text-green-400 text-xs font-bold">{game.rankChange}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-2 py-1 bg-red-500/20 rounded-full border border-red-500/30">
                    <span className="text-red-400 text-xs">▼</span>
                    <span className="text-red-400 text-xs font-bold">{Math.abs(game.rankChange)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function TestTabsPage() {
  const [selectedVersion, setSelectedVersion] = useState<1 | 2 | 3>(1);

  const versions = [
    { id: 1, name: "V1: 현재 버전", description: "우측 상단 작은 뱃지" },
    { id: 2, name: "V2: 카드 하단", description: "크게 + 특별한 효과" },
    { id: 3, name: "V3: 순위 번호 옆", description: "순위 배지 옆에 배치" }
  ] as const;

  const renderCard = (game: typeof sampleTopThreeGames[0]) => {
    switch (selectedVersion) {
      case 1:
        return <TopThreeCardV1 key={`v1-${game.id}`} game={game} />;
      case 2:
        return <TopThreeCardV2 key={`v2-${game.id}`} game={game} />;
      case 3:
        return <TopThreeCardV3 key={`v3-${game.id}`} game={game} />;
      default:
        return <TopThreeCardV1 key={`v1-${game.id}`} game={game} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* 헤더 섹션 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200"></div>
            </div>
            <span className="text-orange-400 text-sm font-medium uppercase tracking-wider">
              연속 1위 표시 비교 테스트
            </span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200"></div>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
            3가지 버전 비교
          </h1>
          <p className="text-lg text-slate-300 font-light mb-2">
            &quot;N주 연속 1위&quot; 표시 방식 3가지 버전을 비교해보세요 🏆
          </p>
        </div>

        {/* 버전 선택 버튼 */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-2 flex gap-2">
            {versions.map((version) => (
              <button
                key={version.id}
                onClick={() => setSelectedVersion(version.id)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedVersion === version.id
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <div className="text-center">
                  <div className="font-bold">{version.name}</div>
                  <div className="text-xs opacity-80">{version.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 현재 선택된 버전 설명 */}
        <div className="text-center mb-8 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-2">
            {versions.find(v => v.id === selectedVersion)?.name}
          </h3>
          <p className="text-slate-300">
            {selectedVersion === 1 && "현재 구현된 버전: 우측 상단에 작은 뱃지로 표시"}
            {selectedVersion === 2 && "카드 하단에 크고 화려한 효과로 표시 (애니메이션 + 글로우)"}
            {selectedVersion === 3 && "순위 번호 바로 옆에 배치하여 직관적으로 표시"}
          </p>
        </div>

        {/* Top 3 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sampleTopThreeGames.map(renderCard)}
        </div>

        {/* 버전별 특징 설명 */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">각 버전의 특징</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-300">
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-400 flex items-center gap-2">
                <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">1</span>
                현재 버전 (V1)
              </h4>
              <ul className="space-y-1 text-xs">
                <li>✅ 깔끔하고 정돈된 느낌</li>
                <li>✅ 다른 뱃지와 일관성</li>
                <li>❌ 상대적으로 눈에 덜 띔</li>
                <li>❌ 특별함이 부족</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-green-400 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">2</span>
                카드 하단 (V2)
              </h4>
              <ul className="space-y-1 text-xs">
                <li>✅ 매우 눈에 띄고 화려함</li>
                <li>✅ 1위의 특별함 강조</li>
                <li>✅ 애니메이션으로 생동감</li>
                <li>❌ 공간을 많이 차지</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-400 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">3</span>
                순위 번호 옆 (V3)
              </h4>
              <ul className="space-y-1 text-xs">
                <li>✅ 순위와 연관성 직관적</li>
                <li>✅ 적절한 시각적 임팩트</li>
                <li>✅ 공간 효율성 좋음</li>
                <li>❌ 다소 복잡해 보일 수 있음</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}