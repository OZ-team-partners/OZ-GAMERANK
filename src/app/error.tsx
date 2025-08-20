"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="text-center space-y-6 px-4 max-w-2xl mx-auto">
        {/* 에러 아이콘 */}
        <div className="flex justify-center">
          <div className="text-6xl text-red-500">
            ⚠️
          </div>
        </div>
        
        {/* 메인 메시지 */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white">
            앗! 문제가 발생했습니다
          </h1>
          <p className="text-slate-400 text-lg">
            예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
          </p>
        </div>

        {/* 에러 정보 (개발 환경에서만) */}
        {process.env.NODE_ENV === "development" && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-left">
            <h3 className="text-red-400 font-semibold mb-2">개발자 정보:</h3>
            <p className="text-sm text-slate-300 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-slate-400 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* 게임 컨트롤러 아이콘 */}
        <div className="flex justify-center space-x-4 text-3xl">
          <span className="text-blue-400">🎮</span>
          <span className="text-yellow-400">⚡</span>
          <span className="text-purple-400">🔧</span>
        </div>

        {/* 액션 버튼들 */}
        <div className="space-y-4">
          <button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>다시 시도</span>
          </button>
          
          <div className="flex justify-center">
            <link
              href="/"
              className="text-slate-400 hover:text-white transition-colors inline-flex items-center space-x-2"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>홈으로 돌아가기</span>
            </link>
          </div>
        </div>

        {/* 도움말 */}
        <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <h3 className="text-white font-semibold mb-2">문제 해결 팁</h3>
          <ul className="text-sm text-slate-300 space-y-1 text-left">
            <li>• 페이지를 새로고침해보세요</li>
            <li>• 브라우저 캐시를 지워보세요</li>
            <li>• 잠시 후 다시 시도해보세요</li>
            <li>• 문제가 지속되면 커뮤니티에 문의해주세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}