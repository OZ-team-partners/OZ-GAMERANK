'use client';

import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export default function DeleteConfirmModal({ 
  isOpen, 
  title = "게시글 삭제",
  message = "정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
  onConfirm, 
  onCancel,
  isDeleting = false
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 백드롭 */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      />

      {/* 모달 */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full transform transition-all">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>
            <button
              onClick={onCancel}
              disabled={isDeleting}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* 본문 */}
          <div className="px-6 pb-6">
            <p className="text-slate-300 mb-6">
              {message}
            </p>

            {/* 경고 메시지 */}
            <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-300">
                  <p className="font-semibold mb-1">주의사항:</p>
                  <ul className="list-disc list-inside space-y-1 text-red-200">
                    <li>삭제된 게시글은 복구할 수 없습니다</li>
                    <li>관련된 모든 댓글과 좋아요도 함께 삭제됩니다</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 버튼 그룹 */}
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
              >
                취소
              </button>
              <button
                onClick={onConfirm}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
              >
                {isDeleting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    삭제 중...
                  </span>
                ) : (
                  '삭제하기'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}