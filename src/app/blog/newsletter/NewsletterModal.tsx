"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
interface NewsletterItem {
  id: number;
  title: string;
  content: string;
  author?: string;
  date?: string;
  category?: string;
  imageUrl?: string;
}

interface NewsletterModalProps {
  item: NewsletterItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsletterModal({
  item,
  isOpen,
  onClose,
}: NewsletterModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // 배경 스크롤 방지
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 헤더 */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{item.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-300 mt-1">
              <span>글: {item.author}</span>
              <span>•</span>
              <span>{item.date}</span>
              <span>•</span>
              <span className="bg-gray-600 px-2 py-1 rounded-full text-xs">
                {item.category}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* 모달 내용 */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* 이미지 */}
          {item.imageUrl && (
            <div className="relative h-48 md:h-64">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* 텍스트 내용 */}
          <div className="p-6">
            <div
              className="prose prose-lg max-w-none text-black prose-headings:text-gray-800 prose-h3:text-xl prose-h4:text-lg prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-800"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        </div>

        {/* 모달 푸터 */}
        <div className="bg-gray-100 px-6 py-4 border-t">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              렙업 소식통 제{31 - (item?.id ?? 0)}호
            </p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-black text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
