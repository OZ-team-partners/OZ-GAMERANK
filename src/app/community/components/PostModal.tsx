"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Post, Category } from "@/shared/data/dummyData";

interface PostModalProps {
  isOpen: boolean;
  isEditMode: boolean;
  currentPost: Post | null;
  onClose: () => void;
  onSubmit: (formData: {
    title: string;
    content: string;
    author: string;
    category: Category;
  }, imagePreview: string) => void;
  onDelete?: (id: number) => void;
}

export default function PostModal({
  isOpen,
  isEditMode,
  currentPost,
  onClose,
  onSubmit,
  onDelete,
}: PostModalProps) {
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    author: string;
    category: Category;
  }>({
    title: currentPost?.title || "",
    content: currentPost?.content || "",
    author: currentPost?.author || "",
    category: currentPost?.category || "온라인게임",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(currentPost?.imageUrl || "");

  React.useEffect(() => {
    if (currentPost) {
      setFormData({
        title: currentPost.title,
        content: currentPost.content,
        author: currentPost.author,
        category: currentPost.category,
      });
      setImagePreview(currentPost.imageUrl || "");
    } else {
      setFormData({
        title: "",
        content: "",
        author: "",
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

      setImageFile(file);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 text-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isEditMode ? "게시글 수정" : "새 게시글 작성"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">카테고리</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-2 border border-slate-600 rounded-md text-white bg-slate-700 cursor-pointer hover:border-slate-500 focus:outline-none focus:border-blue-500"
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
            <label className="block text-sm font-medium mb-1">제목</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-slate-600 rounded-md bg-slate-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">작성자</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full p-2 border border-slate-600 rounded-md bg-slate-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">내용</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={6}
              className="w-full p-2 border border-slate-600 rounded-md resize-none bg-slate-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">이미지 첨부</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-slate-600 rounded-md bg-slate-700 text-white"
            />
            {imagePreview && (
              <div className="mt-2">
                <Image
                  src={imagePreview}
                  alt="미리보기"
                  width={200}
                  height={150}
                  className="rounded-md object-cover"
                  onError={() => setImagePreview("")}
                />
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              {isEditMode ? "수정하기" : "작성하기"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-600 text-white py-2 px-4 rounded-md hover:bg-slate-500 transition-colors"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}