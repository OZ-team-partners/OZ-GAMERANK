"use client";

import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';

interface LoginPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignup: () => void;
}

export default function LoginPrompt({ isOpen, onClose, onLogin, onSignup }: LoginPromptProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800/95 backdrop-blur-md text-white rounded-2xl p-6 w-full max-w-md border border-slate-700 shadow-2xl">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <LogIn className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
            로그인이 필요합니다
          </h2>
          <p className="text-slate-400">
            게시글을 작성하려면 로그인이 필요합니다.<br />
            게임 커뮤니티에 참여해보세요!
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all cursor-pointer"
          >
            <LogIn className="w-5 h-5" />
            로그인
          </button>
          
          <button
            onClick={onSignup}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-700/50 border border-slate-600 rounded-xl font-semibold hover:bg-slate-700 transition-all cursor-pointer"
          >
            <UserPlus className="w-5 h-5" />
            회원가입
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-slate-400 hover:text-white transition-colors"
          >
            나중에 하기
          </button>
        </div>
      </div>
    </div>
  );
}