import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        {/* 404 아이콘 */}
        <div className="flex justify-center">
          <div className="text-8xl font-bold text-purple-500 font-mono">
            404
          </div>
        </div>
        
        {/* 메인 메시지 */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>

        {/* 게임 관련 아이콘 */}
        <div className="flex justify-center space-x-4 text-4xl">
          <span className="text-blue-400">🎮</span>
          <span className="text-green-400">🕹️</span>
          <span className="text-red-400">🎯</span>
        </div>

        {/* 액션 버튼들 */}
        <div className="space-y-4">
          <Link href="/">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>홈으로 돌아가기</span>
            </button>
          </Link>
          
          <div className="flex justify-center space-x-4">
            <Link href="/rank/steam" className="text-slate-400 hover:text-white transition-colors">
              Steam 랭킹
            </Link>
            <Link href="/community/board" className="text-slate-400 hover:text-white transition-colors">
              커뮤니티
            </Link>
            <Link href="/game_info" className="text-slate-400 hover:text-white transition-colors">
              게임 정보
            </Link>
          </div>
        </div>

        {/* 추가 도움말 */}
        <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-sm text-slate-300">
            문제가 지속되면{" "}
            <Link href="/community/board" className="text-purple-400 hover:text-purple-300">
              커뮤니티
            </Link>
            에 문의해주세요.
          </p>
        </div>
      </div>
    </div>
  );
}