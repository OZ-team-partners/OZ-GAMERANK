"use client";

import React, { useState, useEffect, useRef } from "react";

export default function CommentsSection() {
  const [visibleComments, setVisibleComments] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState<{[key: number]: Array<{id: number, name: string, content: string, date: string}>}>({});
  const [reviewText, setReviewText] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [comments, setComments] = useState<Array<{id: number, name: string, avatar: string, avatarColor: string, rating: string, date: string, content: string, likes: number}>>([]); // 동적으로 추가될 댓글들
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const sentinelRef = useRef(null);

  const allComments = [
    {
      id: 1,
      name: "김하이랄",
      avatar: "김",
      avatarColor: "from-blue-500 to-purple-500",
      rating: "★★★★★",
      date: "2024.01.15",
      content: "정말 최고의 게임입니다! 오픈월드의 자유도가 엄청나고, 어디로 가야 할지 모르는 재미가 있어요. 처음에는 어려웠지만 점점 익숙해지면서 더욱 재밌어졌습니다. 강력 추천!",
      likes: 24
    },
    {
      id: 2,
      name: "링크마스터",
      avatar: "링",
      avatarColor: "from-green-500 to-blue-500",
      rating: "★★★★☆",
      date: "2024.01.12",
      content: "그래픽이 정말 아름답고 음악도 환상적이에요. 다만 무기가 부서지는 시스템은 좀 아쉬웠습니다. 그래도 전체적으로 훌륭한 게임이고 시간 가는 줄 모르고 플레이했어요!",
      likes: 18
    },
    {
      id: 3,
      name: "젤다공주",
      avatar: "젤",
      avatarColor: "from-purple-500 to-pink-500",
      rating: "★★★★★",
      date: "2024.01.10",
      content: "100시간 넘게 플레이했는데도 아직 할 게 많아요. 탐험의 재미가 끝이 없고, 퍼즐을 풀 때마다 성취감이 정말 크네요. 닌텐도 스위치 필수 게임!",
      likes: 31
    },
    {
      id: 4,
      name: "게임러버",
      avatar: "게",
      avatarColor: "from-orange-500 to-red-500",
      rating: "★★★☆☆",
      date: "2024.01.08",
      content: "기대했던 것보다는 아쉬웠어요. 스토리가 좀 단조로운 느낌이고, 던전이 예전 젤다 시리즈보다 부족한 것 같아요. 그래도 오픈월드는 재밌습니다.",
      likes: 7
    },
    {
      id: 5,
      name: "하이랄탐험가",
      avatar: "하",
      avatarColor: "from-teal-500 to-cyan-500",
      rating: "★★★★★",
      date: "2024.01.05",
      content: "이런 게임이 있을 줄 몰랐어요! 자유도가 정말 높고, 어떤 방식으로 플레이해도 재밌네요. 요리 시스템도 재밌고, 물리 엔진도 정말 잘 만들어져 있어요.",
      likes: 15
    },
    {
      id: 6,
      name: "닌텐도팬",
      avatar: "닌",
      avatarColor: "from-red-500 to-yellow-500",
      rating: "★★★★☆",
      date: "2024.01.03",
      content: "닌텐도가 이런 게임을 만들 수 있다니! 평소 젤다 시리즈를 좋아했는데 이번 작품은 정말 혁신적이네요. 다만 프레임 드롭이 가끔 있어서 아쉬워요.",
      likes: 22
    },
    {
      id: 7,
      name: "모험가링크",
      avatar: "모",
      avatarColor: "from-emerald-500 to-teal-500",
      rating: "★★★★★",
      date: "2024.01.02",
      content: "처음에는 복잡해 보였는데 플레이하면 할수록 매력적이에요. 특히 날씨 시스템이 정말 잘 만들어져 있고, 비 올 때 바위 타기가 어려워지는 디테일이 좋네요!",
      likes: 28
    },
    {
      id: 8,
      name: "쿠킹마스터",
      avatar: "쿠",
      avatarColor: "from-yellow-500 to-orange-500",
      rating: "★★★★☆",
      date: "2023.12.30",
      content: "요리 시스템이 너무 재밌어요! 다양한 재료를 조합해서 새로운 요리를 만드는 재미가 쏠쏠합니다. 가끔 이상한 조합으로 요리해서 웃기기도 하고ㅋㅋ",
      likes: 19
    },
    {
      id: 9,
      name: "슈링크마니아",
      avatar: "슈",
      avatarColor: "from-blue-500 to-indigo-500",
      rating: "★★★★★",
      date: "2023.12.28",
      content: "슈링크 120개 다 찾았어요! 퍼즐 난이도가 정말 다양하고 창의적이네요. 어떤 건 정말 머리를 쥐어짜야 해서 더 재밌었습니다. 완전 추천!",
      likes: 35
    },
    {
      id: 10,
      name: "하이랄사진사",
      avatar: "사",
      avatarColor: "from-purple-500 to-violet-500",
      rating: "★★★★☆",
      date: "2023.12.25",
      content: "풍경이 정말 아름다워요. 사진 모드로 스크린샷 찍는 재미가 있고, 일출과 일몰 시간대 풍경은 정말 예술입니다. 다만 스토리가 좀 아쉬웠어요.",
      likes: 12
    },
    {
      id: 11,
      name: "무기수집가",
      avatar: "무",
      avatarColor: "from-gray-500 to-slate-500",
      rating: "★★★☆☆",
      date: "2023.12.22",
      content: "무기가 부서지는 시스템 때문에 좋은 무기를 아껴쓰게 되더라고요. 이 부분은 호불호가 갈릴 것 같아요. 그래도 다양한 무기를 시도해보게 되는 장점은 있네요.",
      likes: 8
    },
    {
      id: 12,
      name: "코로그헌터",
      avatar: "코",
      avatarColor: "from-green-500 to-lime-500",
      rating: "★★★★★",
      date: "2023.12.20",
      content: "코로그 씨앗 900개 다 모으는데 200시간 걸렸어요ㅠㅠ 하지만 그만큼 재밌었습니다! 숨겨진 코로그들을 찾는 재미가 정말 중독적이에요.",
      likes: 42
    },
    {
      id: 13,
      name: "보스헌터",
      avatar: "보",
      avatarColor: "from-red-500 to-pink-500",
      rating: "★★★★☆",
      date: "2023.12.18",
      content: "보스 전투가 정말 짜릿해요! 특히 가논과의 최종 결전은 손에 땀을 쥐게 하더라고요. 다양한 공략법이 있어서 여러 번 플레이해도 재밌어요.",
      likes: 26
    },
    {
      id: 14,
      name: "퍼즐천재",
      avatar: "퍼",
      avatarColor: "from-cyan-500 to-blue-500",
      rating: "★★★★★",
      date: "2023.12.15",
      content: "물리 엔진을 이용한 퍼즐들이 정말 창의적이에요. 개발자가 의도하지 않은 해법도 많아서 자유도가 높네요. 이런 게임은 처음 봐요!",
      likes: 33
    },
    {
      id: 15,
      name: "스위치유저",
      avatar: "스",
      avatarColor: "from-indigo-500 to-purple-500",
      rating: "★★★★☆",
      date: "2023.12.12",
      content: "스위치로 이런 거대한 오픈월드를 돌리다니 정말 대단해요. 가끔 프레임 드롭이 있긴 하지만 휴대용으로 이 정도면 만족합니다. 통근길에 최고!",
      likes: 17
    }
  ];

  const toggleLike = (commentId: number) => {
    setLikedComments(prev => {
      const newLikedComments = new Set(prev);
      if (newLikedComments.has(commentId)) {
        newLikedComments.delete(commentId);
      } else {
        newLikedComments.add(commentId);
      }
      return newLikedComments;
    });
  };

  const handleReplyClick = (commentId: number) => {
    if (replyingTo === commentId) {
      setReplyingTo(null);
      setReplyText("");
    } else {
      setReplyingTo(commentId);
      setReplyText("");
    }
  };

  const submitReply = (commentId: number) => {
    if (!replyText.trim()) return;

    const newReply = {
      id: Date.now(),
      name: "현재 사용자", // 실제로는 로그인된 사용자 이름
      content: replyText,
      date: new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).replace(/\./g, ".").slice(0, -1)
    };

    setReplies(prev => ({
      ...prev,
      [commentId]: [...(prev[commentId] || []), newReply]
    }));

    setReplyText("");
    setReplyingTo(null);
  };

  const submitReview = () => {
    if (!reviewText.trim() || selectedRating === 0) {
      setShowValidationMessage(true);
      setTimeout(() => setShowValidationMessage(false), 3000);
      return;
    }

    const newComment = {
      id: Date.now(),
      name: "현재 사용자",
      avatar: "현",
      avatarColor: "from-green-500 to-teal-500",
      rating: "★".repeat(selectedRating) + "☆".repeat(5 - selectedRating),
      date: new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).replace(/\./g, ".").slice(0, -1),
      content: reviewText,
      likes: 0
    };

    setComments(prev => [newComment, ...prev]);
    setReviewText("");
    setSelectedRating(0);
    setShowValidationMessage(false);
  };

  const loadMoreComments = () => {
    if (isLoading || visibleComments >= allComments.length) return;
    
    setIsLoading(true);
    // 로딩 시뮬레이션
    setTimeout(() => {
      setVisibleComments(prev => Math.min(prev + 5, allComments.length));
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && visibleComments < allComments.length) {
          loadMoreComments();
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [isLoading, visibleComments, allComments.length]);
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700 mt-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        유저 리뷰 & 댓글
      </h2>

      {/* 댓글 작성 */}
      <div className="mb-6">
        <div className="bg-slate-700 rounded-lg p-4">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitReview();
              }
            }}
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
                    onClick={() => setSelectedRating(star)}
                    className={`text-lg transition-colors cursor-pointer ${
                      star <= selectedRating 
                        ? "text-yellow-400" 
                        : "text-slate-500 hover:text-yellow-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div 
              className="relative"
              onMouseEnter={() => {
                if (!reviewText.trim() || selectedRating === 0) {
                  setShowValidationMessage(true);
                }
              }}
              onMouseLeave={() => {
                setShowValidationMessage(false);
              }}
            >
              <button 
                onClick={submitReview}
                disabled={!reviewText.trim() || selectedRating === 0}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white px-4 py-2 rounded-lg text-sm transition-colors disabled:cursor-not-allowed cursor-pointer"
              >
                리뷰 작성
              </button>
              
              {/* 유효성 검사 메시지 */}
              {showValidationMessage && (!reviewText.trim() || selectedRating === 0) && (
                <div className="absolute top-full left-0 mt-2 bg-red-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-10 whitespace-nowrap">
                  {!reviewText.trim() && selectedRating === 0 
                    ? "리뷰 내용과 평점을 입력해주세요!"
                    : !reviewText.trim() 
                    ? "리뷰 내용을 입력해주세요!"
                    : "평점을 선택해주세요!"
                  }
                  <div className="absolute -top-1 left-3 w-2 h-2 bg-red-600 rotate-45"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {/* 새로 작성된 댓글들 먼저 표시 */}
        {comments.map((comment) => (
          <div key={comment.id} className="bg-slate-700 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${comment.avatarColor} rounded-full flex items-center justify-center text-white font-bold`}>
                {comment.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-white font-semibold">
                    {comment.name}
                  </span>
                  <div className="flex text-yellow-400 text-sm">
                    {comment.rating}
                  </div>
                  <span className="text-slate-400 text-xs">
                    {comment.date}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {comment.content}
                </p>
                <div className="flex items-center space-x-4 mt-3">
                  <button 
                    onClick={() => toggleLike(comment.id)}
                    className={`text-sm flex items-center space-x-1 px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                      likedComments.has(comment.id) 
                        ? "text-blue-400 bg-blue-900/30 hover:bg-blue-900/50" 
                        : "text-slate-400 hover:bg-slate-600"
                    }`}
                  >
                    <span>{likedComments.has(comment.id) ? "👍" : "👍"}</span>
                    <span>{comment.likes + (likedComments.has(comment.id) ? 1 : 0)}</span>
                  </button>
                  <button 
                    onClick={() => handleReplyClick(comment.id)}
                    className="text-slate-400 hover:bg-slate-600 text-sm px-2 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    {replyingTo === comment.id ? "취소" : "답글"}
                  </button>
                </div>

                {/* 답글 작성 폼 */}
                {replyingTo === comment.id && (
                  <div className="mt-4 ml-13 bg-slate-600 rounded-lg p-3">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`${comment.name}님에게 답글을 작성하세요...`}
                      className="w-full bg-slate-500 text-white placeholder-slate-300 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        onClick={() => handleReplyClick(comment.id)}
                        className="bg-slate-500 hover:bg-slate-400 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => submitReply(comment.id)}
                        disabled={!replyText.trim()}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white px-3 py-1 rounded text-sm transition-colors disabled:cursor-not-allowed"
                      >
                        답글 작성
                      </button>
                    </div>
                  </div>
                )}

                {/* 답글 목록 */}
                {replies[comment.id] && replies[comment.id].length > 0 && (
                  <div className="mt-4 ml-13 space-y-3">
                    {replies[comment.id].map((reply) => (
                      <div key={reply.id} className="bg-slate-600 rounded-lg p-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            현
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-white font-semibold text-sm">
                                {reply.name}
                              </span>
                              <span className="text-slate-400 text-xs">
                                {reply.date}
                              </span>
                            </div>
                            <p className="text-slate-200 text-sm leading-relaxed">
                              {reply.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* 기존 댓글들 */}
        {allComments.slice(0, visibleComments).map((comment) => (
          <div key={comment.id} className="bg-slate-700 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${comment.avatarColor} rounded-full flex items-center justify-center text-white font-bold`}>
                {comment.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-white font-semibold">
                    {comment.name}
                  </span>
                  <div className="flex text-yellow-400 text-sm">
                    {comment.rating}
                  </div>
                  <span className="text-slate-400 text-xs">
                    {comment.date}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {comment.content}
                </p>
                <div className="flex items-center space-x-4 mt-3">
                  <button 
                    onClick={() => toggleLike(comment.id)}
                    className={`text-sm flex items-center space-x-1 px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                      likedComments.has(comment.id) 
                        ? "text-blue-400 bg-blue-900/30 hover:bg-blue-900/50" 
                        : "text-slate-400 hover:bg-slate-600"
                    }`}
                  >
                    <span>{likedComments.has(comment.id) ? "👍" : "👍"}</span>
                    <span>{comment.likes + (likedComments.has(comment.id) ? 1 : 0)}</span>
                  </button>
                  <button 
                    onClick={() => handleReplyClick(comment.id)}
                    className="text-slate-400 hover:bg-slate-600 text-sm px-2 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    {replyingTo === comment.id ? "취소" : "답글"}
                  </button>
                </div>

                {/* 답글 작성 폼 */}
                {replyingTo === comment.id && (
                  <div className="mt-4 ml-13 bg-slate-600 rounded-lg p-3">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`${comment.name}님에게 답글을 작성하세요...`}
                      className="w-full bg-slate-500 text-white placeholder-slate-300 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        onClick={() => handleReplyClick(comment.id)}
                        className="bg-slate-500 hover:bg-slate-400 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => submitReply(comment.id)}
                        disabled={!replyText.trim()}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white px-3 py-1 rounded text-sm transition-colors disabled:cursor-not-allowed"
                      >
                        답글 작성
                      </button>
                    </div>
                  </div>
                )}

                {/* 답글 목록 */}
                {replies[comment.id] && replies[comment.id].length > 0 && (
                  <div className="mt-4 ml-13 space-y-3">
                    {replies[comment.id].map((reply) => (
                      <div key={reply.id} className="bg-slate-600 rounded-lg p-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            현
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-white font-semibold text-sm">
                                {reply.name}
                              </span>
                              <span className="text-slate-400 text-xs">
                                {reply.date}
                              </span>
                            </div>
                            <p className="text-slate-200 text-sm leading-relaxed">
                              {reply.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 무한 스크롤 로딩 인디케이터 */}
      {visibleComments < allComments.length && (
        <div ref={sentinelRef} className="text-center mt-6 py-4">
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-6 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-slate-400">댓글을 불러오는 중...</span>
            </div>
          ) : (
            <div className="text-slate-500 text-sm">
              스크롤하여 더 많은 댓글 보기
            </div>
          )}
        </div>
      )}
      
      {/* 모든 댓글 로드 완료 */}
      {visibleComments >= allComments.length && (
        <div className="text-center mt-6 py-4">
          <span className="text-slate-500 text-sm">
            모든 댓글을 확인했습니다
          </span>
        </div>
      )}
    </div>
  );
}