"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Post, Category } from "@/shared/types/community";
import { X, Upload, ImageIcon, Save, Edit } from "lucide-react";
import type { User } from '@supabase/supabase-js';

interface PostModalProps {
  isOpen: boolean;
  isEditMode: boolean;
  currentPost: Post | null;
  user: User | null;
  onClose: () => void;
  onSubmit: (formData: {
    title: string;
    content: string;
    category: Category;
  }, imagePreview: string) => void;
  onDelete?: (id: number) => void;
}

export default function PostModal({
  isOpen,
  isEditMode,
  currentPost,
  user,
  onClose,
  onSubmit,
}: PostModalProps) {
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    category: Category;
  }>({
    title: currentPost?.title || "",
    content: currentPost?.content || "",
    category: currentPost?.category || "온라인게임",
  });

  const [imagePreview, setImagePreview] = useState<string>(currentPost?.image_url || "");

  React.useEffect(() => {
    if (currentPost) {
      setFormData({
        title: currentPost.title,
        content: currentPost.content,
        category: currentPost.category,
      });
      setImagePreview(currentPost.image_url || "");
    } else {
      setFormData({
        title: "",
        content: "",
        category: "온라인게임",
      });
      setImagePreview("");
    }
  }, [currentPost]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        category: value as Category,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, imagePreview);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800/95 backdrop-blur-md text-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            {isEditMode ? "게시글 수정" : "새 게시글 작성"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">카테고리</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-3 border border-slate-600 rounded-lg text-white bg-slate-700/50 cursor-pointer hover:border-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="온라인게임">온라인게임</option>
              <option value="steam">steam</option>
              <option value="PS">PS</option>
              <option value="닌텐도">닌텐도</option>
              <option value="모바일">모바일</option>
              <option value="유머/정보">유머/정보</option>
              <option value="디지털/컴퓨터/폰">디지털/컴퓨터/폰</option>
              <option value="게임공략">게임공략</option>
              <option value="핫딜">핫딜</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">제목</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="제목을 입력하세요"
              required
            />
          </div>


          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">내용</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={6}
              className="w-full p-3 border border-slate-600 rounded-lg resize-none bg-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="내용을 입력하세요"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              이미지 첨부
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-slate-600 rounded-lg bg-slate-700/30 text-slate-400 cursor-pointer hover:border-blue-500 hover:bg-slate-700/50 transition-all"
              >
                <Upload className="w-5 h-5" />
                <span>클릭하여 이미지 업로드</span>
              </label>
            </div>
            {imagePreview && (
              <div className="mt-3 p-3 bg-slate-700/30 rounded-lg">
                <Image
                  src={imagePreview}
                  alt="미리보기"
                  width={200}
                  height={150}
                  className="rounded-lg object-cover mx-auto"
                  onError={() => setImagePreview("")}
                />
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-6 border-t border-slate-700">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all font-semibold cursor-pointer"
            >
              {isEditMode ? <Edit className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {isEditMode ? "수정하기" : "작성하기"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-700/50 text-white py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors font-semibold cursor-pointer"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}