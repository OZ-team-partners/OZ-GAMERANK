"use client";

import React from "react";

export default function CommentsSection() {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700 mt-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        유저 리뷰 & 댓글
      </h2>

      {/* 댓글 작성 */}
      <div className="mb-6">
        <div className="bg-slate-700 rounded-lg p-4">
          <textarea
            placeholder="게임에 대한 리뷰를 남겨주세요!"
            className="w-full bg-slate-600 text-white placeholder-slate-400 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 text-sm">평점:</span>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="text-yellow-400 hover:text-yellow-300 text-lg"
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              리뷰 작성
            </button>
          </div>
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-4">
        <div className="bg-slate-700 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              김
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-white font-semibold">
                  김하이랄
                </span>
                <div className="flex text-yellow-400 text-sm">
                  ★★★★★
                </div>
                <span className="text-slate-400 text-xs">
                  2024.01.15
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                정말 최고의 게임입니다! 오픈월드의 자유도가 엄청나고,
                어디로 가야 할지 모르는 재미가 있어요. 처음에는
                어려웠지만 점점 익숙해지면서 더욱 재밌어졌습니다. 강력
                추천!
              </p>
              <div className="flex items-center space-x-4 mt-3">
                <button className="text-slate-400 hover:text-white text-sm flex items-center space-x-1">
                  <span>👍</span>
                  <span>24</span>
                </button>
                <button className="text-slate-400 hover:text-white text-sm">
                  답글
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              링
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-white font-semibold">
                  링크마스터
                </span>
                <div className="flex text-yellow-400 text-sm">
                  ★★★★☆
                </div>
                <span className="text-slate-400 text-xs">
                  2024.01.12
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                그래픽이 정말 아름답고 음악도 환상적이에요. 다만 무기가
                부서지는 시스템은 좀 아쉬웠습니다. 그래도 전체적으로
                훌륭한 게임이고 시간 가는 줄 모르고 플레이했어요!
              </p>
              <div className="flex items-center space-x-4 mt-3">
                <button className="text-slate-400 hover:text-white text-sm flex items-center space-x-1">
                  <span>👍</span>
                  <span>18</span>
                </button>
                <button className="text-slate-400 hover:text-white text-sm">
                  답글
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              젤
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-white font-semibold">
                  젤다공주
                </span>
                <div className="flex text-yellow-400 text-sm">
                  ★★★★★
                </div>
                <span className="text-slate-400 text-xs">
                  2024.01.10
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                100시간 넘게 플레이했는데도 아직 할 게 많아요. 탐험의
                재미가 끝이 없고, 퍼즐을 풀 때마다 성취감이 정말 크네요.
                닌텐도 스위치 필수 게임!
              </p>
              <div className="flex items-center space-x-4 mt-3">
                <button className="text-slate-400 hover:text-white text-sm flex items-center space-x-1">
                  <span>👍</span>
                  <span>31</span>
                </button>
                <button className="text-slate-400 hover:text-white text-sm">
                  답글
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
              게
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-white font-semibold">
                  게임러버
                </span>
                <div className="flex text-yellow-400 text-sm">
                  ★★★☆☆
                </div>
                <span className="text-slate-400 text-xs">
                  2024.01.08
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                기대했던 것보다는 아쉬웠어요. 스토리가 좀 단조로운
                느낌이고, 던전이 예전 젤다 시리즈보다 부족한 것 같아요.
                그래도 오픈월드는 재밌습니다.
              </p>
              <div className="flex items-center space-x-4 mt-3">
                <button className="text-slate-400 hover:text-white text-sm flex items-center space-x-1">
                  <span>👍</span>
                  <span>7</span>
                </button>
                <button className="text-slate-400 hover:text-white text-sm">
                  답글
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 더보기 버튼 */}
      <div className="text-center mt-6">
        <button className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-2 rounded-lg transition-colors">
          댓글 더보기
        </button>
      </div>
    </div>
  );
}