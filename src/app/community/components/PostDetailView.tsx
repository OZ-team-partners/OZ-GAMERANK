'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowLeft, Calendar, Eye, Heart, MessageCircle, User, Edit2, Trash2 } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { CommunityPost } from '../types';

interface PostDetailViewProps {
  post: CommunityPost;
  user: SupabaseUser | null;
  onBack: () => void;
  onEdit?: () => void;
  onDelete?: (id: number) => void;
}

export default function PostDetailView({ post, user, onBack, onEdit, onDelete }: PostDetailViewProps) {
  const handleEdit = () => {
    if (onEdit) onEdit();
  };

  const handleDelete = () => {
    if (onDelete && post && confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      onDelete(post.post_id || post.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>목록으로</span>
        </button>

        {/* 작성자만 수정/삭제 버튼 표시 */}
        {user && post.user_id === user.id && (
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              <span>수정</span>
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>삭제</span>
            </button>
          </div>
        )}
      </div>

      {/* 게시글 내용 */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
        {/* 게시글 헤더 */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="px-3 py-1 bg-slate-700/50 rounded-lg text-sm">
              {post.category}
            </div>
            {post.is_pinned && (
              <div className="flex items-center gap-1 text-yellow-400">
                <span className="text-sm">📌 고정</span>
              </div>
            )}
          </div>
          
          <h1 className="text-2xl font-bold mb-4 text-white">{post.title}</h1>
          
          {/* 작성자 정보 및 메타 데이터 */}
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              {post.author?.avatar_url ? (
                <Image
                  src={post.author.avatar_url}
                  alt={post.author.username || 'User'}
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6" />
              )}
              <span className="text-white">{post.author?.username || 'Unknown'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.created_at).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{post.view_count || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{post.like_count || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comment_count || 0}</span>
            </div>
          </div>
        </div>

        {/* 게시글 이미지 */}
        {post.image_url && (
          <div className="p-6 border-b border-slate-700">
            <Image
              src={post.image_url}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-auto rounded-lg object-cover max-h-96"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}

        {/* 게시글 내용 */}
        <div className="p-6">
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-slate-200 leading-relaxed text-base">
              {post.content}
            </div>
          </div>
        </div>

        {/* 좋아요/댓글 액션 바 */}
        <div className="p-6 border-t border-slate-700 bg-slate-800/30">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors">
              <Heart className="w-4 h-4" />
              <span>좋아요</span>
              <span className="text-slate-400">({post.like_count || 0})</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>댓글</span>
              <span className="text-slate-400">({post.comment_count || 0})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 댓글 섹션 - 추후 구현 */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          댓글 ({post.comment_count || 0})
        </h3>
        <div className="text-center text-slate-400 py-8">
          <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>댓글 기능은 준비 중입니다.</p>
        </div>
      </div>
    </div>
  );
}