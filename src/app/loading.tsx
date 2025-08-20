export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        {/* 로딩 스피너 */}
        <div className="flex justify-center">
          <div className="relative">
            {/* 외부 링 */}
            <div className="w-20 h-20 border-4 border-slate-700 rounded-full"></div>
            {/* 회전하는 링 */}
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
            {/* 중앙 게임패드 아이콘 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🎮</span>
            </div>
          </div>
        </div>
        
        {/* 메인 메시지 */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">
            게임 정보를 불러오는 중...
          </h1>
          <p className="text-slate-400">
            잠시만 기다려주세요
          </p>
        </div>

        {/* 게임 관련 아이콘들 애니메이션 */}
        <div className="flex justify-center space-x-4 text-2xl">
          <span className="text-blue-400 animate-bounce" style={{ animationDelay: '0ms' }}>🎯</span>
          <span className="text-green-400 animate-bounce" style={{ animationDelay: '200ms' }}>🏆</span>
          <span className="text-yellow-400 animate-bounce" style={{ animationDelay: '400ms' }}>⭐</span>
        </div>

        {/* 진행 바 */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* 로딩 팁 */}
        <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-sm text-slate-300">
            <span className="text-purple-400 font-semibold">팁:</span> 게임 랭킹과 리뷰를 확인하여 최고의 게임을 찾아보세요!
          </p>
        </div>
      </div>
    </div>
  );
}