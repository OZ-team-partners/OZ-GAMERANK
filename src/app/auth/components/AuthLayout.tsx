"use client";

import React from "react";
import { Grow } from "@mui/material";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      {/* 동적 배경 요소들 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>

        {/* 게임 플랫폼 로고들 */}
        <div className="absolute top-32 left-1/4 animate-float">
          <Image src="/icon/page_icon/mainUpperIcon1.png" alt="Nintendo" width={24} height={24} className="opacity-30" />
        </div>
        <div className="absolute bottom-40 right-1/4 animate-float-delayed">
          <Image src="/icon/page_icon/mainUpperIcon2.png" alt="Steam" width={28} height={28} className="opacity-30" />
        </div>
        <div className="absolute top-1/3 right-1/5 animate-float-slow">
          <Image src="/icon/page_icon/mainUpperIcon3.png" alt="Xbox" width={20} height={20} className="opacity-30" />
        </div>
      </div>

      <Grow in timeout={800}>
        <div className="w-full max-w-md p-6 relative z-10">
          {children}
        </div>
      </Grow>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default AuthLayout;