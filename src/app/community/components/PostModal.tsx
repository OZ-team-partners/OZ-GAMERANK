"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Upload, ImageIcon, Save, Edit } from "lucide-react";
import type { PostModalProps, Category, PostFormData } from "../types";

export default function PostModal({
  isOpen,
  isEditMode,
  isViewMode = false,
  currentPost,
  user,
  onClose,
  onSubmit,
  onEdit,
}: PostModalProps) {
  const [formData, setFormData] = useState<PostFormData>({
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
        e.target.value = ""; // 파일 입력 초기화
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.onerror = () => {
        alert("이미지를 읽는 중 오류가 발생했습니다.");
        e.target.value = ""; // 파일 입력 초기화
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 삭제 함수
  const handleImageRemove = () => {
    setImagePreview("");
    // 파일 입력 초기화
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, imagePreview);
    // 주의: 여기서 clearFormData()나 onClose()를 호출하지 않음
    // 성공/실패는 부모 컴포넌트에서 처리
  };

  // 변경사항이 있는지 확인
  const hasChanges = () => {
    if (!currentPost) {
      // 새 게시글 작성 시
      return formData.title.trim() !== "" || formData.content.trim() !== "" || imagePreview !== "";
    } else {
      // 게시글 수정 시
      return (
        formData.title !== currentPost.title ||
        formData.content !== currentPost.content ||
        formData.category !== currentPost.category ||
        imagePreview !== (currentPost.image_url || "")
      );
    }
  };

  // 취소 처리
  const handleCancel = () => {
    if (hasChanges()) {
      if (window.confirm("작성 중인 내용이 있습니다. 정말로 취소하시겠습니까?")) {
        clearFormData();
        onClose();
      }
    } else {
      onClose();
    }
  };

  // 폼 데이터 초기화
  const clearFormData = () => {
    setFormData({
      title: "",
      content: "",
      category: "온라인게임",
    });
    setImagePreview("");
    // 파일 입력 초기화
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800/95 backdrop-blur-md text-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            {isViewMode ? "게시글 보기" : isEditMode ? "게시글 수정" : "새 게시글 작성"}
          </h2>
          <button
            onClick={isViewMode ? onClose : handleCancel}
            className="p-2 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {isViewMode ? (
          // 읽기 전용 모드
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">카테고리</label>
              <div className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700/30 text-slate-300">
                {currentPost?.category || "카테고리 없음"}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">제목</label>
              <div className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700/30 text-white">
                {currentPost?.title || "제목 없음"}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">내용</label>
              <div className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700/30 text-white min-h-[150px] whitespace-pre-wrap">
                {currentPost?.content || "내용 없음"}
              </div>
            </div>

            {currentPost?.image_url && (
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  첨부 이미지
                </label>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <Image
                    src={currentPost.image_url}
                    alt="게시글 이미지"
                    width={400}
                    height={300}
                    className="rounded-lg object-cover mx-auto"
                  />
                </div>
              </div>
            )}

            {/* 게시글 정보 */}
            <div className="pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>작성자: {currentPost?.author?.username || "알 수 없음"}</span>
                <span>작성일: {currentPost?.created_at ? new Date(currentPost.created_at).toLocaleDateString('ko-KR') : "알 수 없음"}</span>
              </div>
            </div>

            {/* 액션 버튼 - 본인 글이면 수정 버튼 표시 */}
            <div className="flex gap-3 pt-6 border-t border-slate-700">
              {user && currentPost?.user_id === user.id && onEdit && (
                <button
                  onClick={onEdit}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all font-semibold cursor-pointer"
                >
                  <Edit className="w-4 h-4" />
                  수정하기
                </button>
              )}
              <button
                onClick={onClose}
                className="flex-1 bg-slate-700/50 text-white py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors font-semibold cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        ) : (
          // 작성/수정 모드
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
              <div className="mt-3 p-3 bg-slate-700/30 rounded-lg relative">
                <button
                  type="button"
                  onClick={handleImageRemove}
                  className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-500 text-white rounded-full p-1 z-10"
                  title="이미지 삭제"
                >
                  <X className="w-4 h-4" />
                </button>
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
              onClick={handleCancel}
              className="flex-1 bg-slate-700/50 text-white py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors font-semibold cursor-pointer"
            >
              취소
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}