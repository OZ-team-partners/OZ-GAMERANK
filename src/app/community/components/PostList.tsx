"use client";

import React from "react";
import Image from "next/image";
import { Edit2, Trash2, Eye, Calendar, MessageCircle, User, Heart, Pin } from "lucide-react";
import type { PostListProps } from "../types";

export default function PostList({ posts, onViewPost, onEditPost, onDeletePost, isAuthenticated = false, currentUserId, isLoading = false }: PostListProps) {
  if (isLoading) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-12 text-center">
        <div className="text-slate-400">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-600 border-t-blue-500"></div>
          </div>
          <p className="text-lg">게시글 불러오는 중입니다</p>
          <p className="text-sm mt-2">잠시만 기다려주세요...</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-12 text-center">
        <div className="text-slate-400">
          <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">게시글이 없습니다</p>
          <p className="text-sm mt-2">첫 번째 게시글을 작성해보세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <div 
          key={post.post_id || post.id || index}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-slate-600 overflow-hidden hover:cursor-pointer group"
        >
          <div className="p-5">
            <div className="flex gap-4">
              {/* 썸네일 이미지 */}
              <div className="w-20 h-20 rounded-lg bg-slate-700/50 border border-slate-600 overflow-hidden flex-shrink-0">
                {post?.image_url ? (
                  <Image
                    src={post.image_url}
                    alt={post?.title || 'Post image'}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                )}
              </div>

              {/* 게시글 내용 */}
              <div className="flex-1 min-w-0">
                <div 
                  className="hover:cursor-pointer"
                  onClick={() => onViewPost(post)}
                >
                  <h3 className="font-semibold text-lg mb-1 text-white group-hover:text-blue-400">
                    {post?.title || 'Untitled'}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-3">
                    {post?.content || 'No content'}
                  </p>
                </div>

                {/* 메타 정보 */}
                <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                  <div className="flex items-center gap-2">
                    {post.author?.avatar_url ? (
                      <Image
                        src={post.author.avatar_url}
                        alt={post.author.username || 'User'}
                        width={16}
                        height={16}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span>{post.author?.username || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post?.created_at ? new Date(post.created_at).toLocaleDateString('ko-KR') : 'Unknown date'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{post?.view_count || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    <span>{post?.like_count || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{post?.comment_count || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="px-2 py-1 bg-slate-700/50 rounded-lg">
                      {post?.category || 'Uncategorized'}
                    </div>
                    {post?.is_pinned && (
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Pin className="w-3 h-3" />
                        <span>고정</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 액션 버튼 - 게시글 작성자만 표시 */}
              {isAuthenticated && currentUserId && post.user_id === currentUserId && (
                <div className="flex gap-2 items-start">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditPost(post);
                    }}
                    className="p-2 rounded-lg bg-blue-600/20 text-blue-400 hover:cursor-pointer"
                    title="수정"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (post?.id) {
                        onDeletePost(post.id);
                      }
                    }}
                    className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:cursor-pointer"
                    title="삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}