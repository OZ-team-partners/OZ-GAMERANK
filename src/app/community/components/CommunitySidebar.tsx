"use client";

import React, { useMemo } from "react";
import { Star, Flame, Mail, Eye } from "lucide-react";
import { useCommunity } from "./CommunityProvider";
import type { CommunityPost } from "../types";

export default function CommunitySidebar() {
  const { posts, openPostDetail } = useCommunity();

  // 오늘의 핫 토픽: 최신 + 조회수 조합으로 인기 게시글 계산
  const todaysHotTopics = useMemo(() => {
    const now = new Date();

    // 최근 7일 내 게시글 필터링
    const recentPosts = posts.filter(post => {
      const postDate = new Date(post.created_at);
      const daysDiff = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff <= 7;
    });

    // 점수 계산: (조회수 * 0.7) + (최신도 점수 * 0.3)
    const scoredPosts = recentPosts.map(post => {
      const postDate = new Date(post.created_at);
      const daysDiff = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);
      const recencyScore = Math.max(0, 100 - daysDiff * 10); // 최신일수록 높은 점수
      const viewScore = (post.view_count || 0);
      const totalScore = (viewScore * 0.7) + (recencyScore * 0.3);

      return {
        ...post,
        hotScore: totalScore
      };
    });

    // 점수 순으로 정렬하고 상위 5개 선택
    const hotPosts = scoredPosts
      .sort((a, b) => b.hotScore - a.hotScore)
      .slice(0, 5);

    return hotPosts;
  }, [posts]);

  const handleTopicClick = (post: CommunityPost) => {
    openPostDetail(post);
  };

  const truncateTitle = (title: string, maxLength = 20) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  return (
    <div className="lg:col-span-1 flex flex-col gap-4">
      {/* 오늘의 핫 토픽 카드 */}
      <div className="bg-slate-800/50 backdrop-blur-sm p-5 rounded-2xl border border-slate-700 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-5 h-5 text-orange-400" />
          <h4 className="font-semibold text-lg">오늘의 핫 토픽</h4>
        </div>
        <p className="text-sm mb-4 opacity-90">
          최신 + 조회수 기반 인기글
        </p>
        <div className="space-y-2">
          {todaysHotTopics.length > 0 ? (
            todaysHotTopics.map((post, index) => (
              <div
                key={post.post_id || post.id}
                className="flex items-center justify-between py-2 px-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => handleTopicClick(post)}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-xs font-bold text-yellow-300 w-4 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium truncate">
                    {truncateTitle(post.title)}
                  </span>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Eye className="w-3 h-3 text-slate-400" />
                  <span className="text-xs opacity-80">{post.view_count || 0}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-slate-400">
              <p className="text-sm">아직 핫 토픽이 없습니다</p>
            </div>
          )}
        </div>
      </div>

      {/* 뉴스레터 구독 카드 */}
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