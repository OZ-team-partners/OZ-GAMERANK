"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/shared/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/shared/lib/supabase";

// 댓글 데이터 타입 정의
interface Comment {
  id: number;
  content: string;
  rating: number;
  created_at: string;
  users: {
    id: string;
    username: string;
  } | null;
}

// 별점 표시 컴포넌트
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex text-yellow-400 text-sm">
    {"★".repeat(rating)}
    {"☆".repeat(5 - rating)}
  </div>
);

export default function CommentsSection({ gameId }: { gameId: number }) {
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const router = useRouter();

  const [comments, setComments] = useState<Comment[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 수정 관련 상태
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(0);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/game-comments?game_id=${gameId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, [gameId]);

  useEffect(() => {
    if (gameId) {
      fetchComments();
    }
  }, [gameId, fetchComments]);

  const submitReview = async () => {
    if (!reviewText.trim() || selectedRating === 0) {
      alert("리뷰 내용과 평점을 모두 입력해주세요.");
      return;
    }
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      router.push("/auth/login");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("세션이 만료되었습니다. 다시 로그인해주세요.");
      }

      const response = await fetch("/api/game-comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          game_id: gameId,
          content: reviewText,
          rating: selectedRating,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Failed to submit review");
      }

      const result = await response.json();
      console.log("Review submitted successfully:", result);

      setReviewText("");
      setSelectedRating(0);
      await fetchComments();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to submit review";
      setError(errorMessage);
      console.error("Submit review error:", err);
      alert(`리뷰 작성 중 오류가 발생했습니다: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 댓글 수정 시작
  const startEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.content);
    setEditRating(comment.rating);
  };

  // 댓글 수정 취소
  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditText("");
    setEditRating(0);
  };

  // 댓글 수정 저장
  const saveEdit = async () => {
    if (!editText.trim() || editRating === 0) {
      alert("리뷰 내용과 평점을 모두 입력해주세요.");
      return;
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("세션이 만료되었습니다.");
      }

      const response = await fetch("/api/game-comments", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          comment_id: editingCommentId,
          content: editText,
          rating: editRating,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update comment");
      }

      await fetchComments();
      cancelEdit();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update comment";
      alert(`댓글 수정 중 오류가 발생했습니다: ${errorMessage}`);
    }
  };

  // 댓글 삭제
  const deleteComment = async (commentId: number) => {
    if (!confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("세션이 만료되었습니다.");
      }

      const response = await fetch(
        `/api/game-comments?comment_id=${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete comment");
      }

      await fetchComments();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete comment";
      alert(`댓글 삭제 중 오류가 발생했습니다: ${errorMessage}`);
    }
  };

  // 댓글 섹션으로 스크롤하는 함수

  return (
    <div
      className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700 mt-6"
      data-comments-section
    >
      <h2 className="text-2xl font-bold text-white mb-6">유저 리뷰 & 댓글</h2>

      {/* 댓글 작성 */}
      <div className="mb-6">
        {authLoading ? (
          <div className="text-center text-slate-400">
            인증 정보를 불러오는 중...
          </div>
        ) : isAuthenticated ? (
          <div className="bg-slate-700 rounded-lg p-4">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="게임에 대한 리뷰를 남겨주세요!"
              className="w-full bg-slate-600 text-white placeholder-slate-400 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              disabled={isSubmitting}
            />
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 text-lg">평점:</span>
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
                      disabled={isSubmitting}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={submitReview}
                disabled={
                  isSubmitting || !reviewText.trim() || selectedRating === 0
                }
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white px-4 py-2 rounded-lg text-sm transition-colors disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? "작성 중..." : "리뷰 작성"}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center bg-slate-700 p-6 rounded-lg">
            <p className="text-slate-400 mb-4">
              댓글을 작성하려면 로그인이 필요합니다.
            </p>
            <button
              onClick={() => router.push("/auth/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              로그인 페이지로 이동
            </button>
          </div>
        )}
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center text-slate-400">
            댓글을 불러오는 중...
          </div>
        ) : error ? (
          <div className="text-center text-red-400">오류: {error}</div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-white font-semibold">
                      {comment.users?.username || "탈퇴한 사용자"}
                    </span>
                    <StarRating rating={comment.rating} />
                    <span className="text-slate-400 text-xs">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {/* 수정 모드인지 확인 */}
                  {editingCommentId === comment.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full bg-slate-600 text-white p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-400 text-sm">평점:</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setEditRating(star)}
                              className={`text-lg transition-colors cursor-pointer ${
                                star <= editRating
                                  ? "text-yellow-400"
                                  : "text-slate-500 hover:text-yellow-300"
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={saveEdit}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                        >
                          저장
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-300 leading-relaxed">
                      {comment.content}
                    </p>
                  )}
                </div>

                {/* 본인 댓글인 경우에만 수정/삭제 버튼 표시 */}
                {isAuthenticated &&
                  user &&
                  comment.users?.id === user.id &&
                  editingCommentId !== comment.id && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEdit(comment)}
                        className="p-2 rounded-lg bg-blue-600/20 text-blue-400 hover:cursor-pointer hover:bg-blue-600/30 transition-colors"
                        title="수정"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-pen w-4 h-4"
                          aria-hidden="true"
                        >
                          <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteComment(comment.id)}
                        className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:cursor-pointer hover:bg-red-600/30 transition-colors"
                        title="삭제"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-trash2 lucide-trash-2 w-4 h-4"
                          aria-hidden="true"
                        >
                          <path d="M10 11v6"></path>
                          <path d="M14 11v6"></path>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                          <path d="M3 6h18"></path>
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-slate-500 py-8">
            아직 작성된 리뷰가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
