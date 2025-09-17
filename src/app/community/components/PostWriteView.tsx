'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ImageIcon, X } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { Category, PostFormData } from '../types';

interface PostWriteViewProps {
  user: SupabaseUser | null;
  onBack: () => void;
  onSubmit: (formData: PostFormData, imagePreview: string) => void;
}

const categories: Category[] = [
  "온라인게임", "steam", "PS", "닌텐도", "모바일", 
  "유머/정보", "디지털/컴퓨터/폰", "게임공략", "핫딜"
];

export default function PostWriteView({ user, onBack, onSubmit }: PostWriteViewProps) {
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    category: '온라인게임'
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview('');
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData, imagePreview);
    } catch (error) {
      console.error('게시글 작성 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>목록으로</span>
          </button>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-12 text-center">
          <div className="text-slate-400">
            <p className="text-lg">로그인이 필요합니다</p>
            <p className="text-sm mt-2">게시글을 작성하려면 로그인해주세요.</p>
          </div>
        </div>
      </div>
    );
  }

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

        <h1 className="text-2xl font-bold text-white">새 게시글 작성</h1>
        
        <div className="w-20"></div> {/* 중앙 정렬을 위한 공간 */}
      </div>

      {/* 작성 폼 */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 카테고리 선택 */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              카테고리
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as Category }))}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* 제목 입력 */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              제목 *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="제목을 입력해주세요"
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              maxLength={100}
            />
            <div className="text-right text-sm text-slate-500 mt-1">
              {formData.title.length}/100
            </div>
          </div>

          {/* 이미지 업로드 */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              이미지 첨부
            </label>
            <div className="flex items-center gap-4">
              <label
                htmlFor="image-upload"
                className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg cursor-pointer transition-colors"
              >
                <ImageIcon className="w-4 h-4" />
                <span>이미지 선택</span>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>제거</span>
                </button>
              )}
            </div>
            
            {/* 이미지 미리보기 */}
            {imagePreview && (
              <div className="mt-4">
                <Image
                  src={imagePreview}
                  alt="미리보기"
                  width={400}
                  height={300}
                  className="rounded-lg object-cover max-h-64"
                />
              </div>
            )}
          </div>

          {/* 내용 입력 */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              내용 *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="내용을 입력해주세요"
              rows={12}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              maxLength={2000}
            />
            <div className="text-right text-sm text-slate-500 mt-1">
              {formData.content.length}/2000
            </div>
          </div>

          {/* 작성자 정보 */}
          <div className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-lg">
            {user.user_metadata?.avatar_url ? (
              <div className="w-8 h-8 flex-shrink-0">
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="프로필"
                  width={32}
                  height={32}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm text-slate-300">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <p className="text-sm text-slate-300">
                {user.user_metadata?.username || user.email?.split('@')[0] || 'Unknown User'}
              </p>
              <p className="text-xs text-slate-500">작성자</p>
            </div>
          </div>

          {/* 버튼 그룹 */}
          <div className="flex gap-4 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
              className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              {isSubmitting ? '작성 중...' : '게시글 작성'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}