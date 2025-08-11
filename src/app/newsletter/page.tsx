"use client";

import Image from "next/image";

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 메인 컨테이너 */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* 상단 헤더 */}
          <div className="bg-gradient-to-r from-teal-700 to-teal-800 text-white px-6 py-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">2025년 8월 11일</span>
              <span className="text-sm font-medium bg-teal-600 px-3 py-1 rounded-full">
                제29호
              </span>
            </div>
          </div>

          {/* 타이틀 섹션 */}
          <div className="text-center py-8 px-6 bg-gradient-to-b from-white to-gray-50">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-teal-700 to-teal-900 bg-clip-text text-transparent mb-2">
              게임 소식
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              게임랭킹 사이트 공식 뉴스레터
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-teal-700 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* 메인 이미지 */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1532012197267-da84d127e765"
              alt="도서관 이미지"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          {/* 콘텐츠 영역 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* 왼쪽 사이드바 */}
            <div className="bg-gradient-to-b from-teal-800 to-teal-900 text-white p-6 lg:p-8">
              <h3 className="text-xl font-bold mb-6 text-teal-100">
                이번 주 주요 소식
              </h3>
              <div className="space-y-4">
                <div className="group cursor-pointer transition-all duration-300 hover:bg-teal-700 p-3 rounded-lg">
                  <p className="text-sm font-medium text-teal-100 group-hover:text-white">
                    이번 주 새로운 게임 출시
                  </p>
                </div>
                <div className="group cursor-pointer transition-all duration-300 hover:bg-teal-700 p-3 rounded-lg">
                  <p className="text-sm font-medium text-teal-100 group-hover:text-white">
                    게임 멘탈 관리에 도움 되는 차
                  </p>
                </div>
                <div className="group cursor-pointer transition-all duration-300 hover:bg-teal-700 p-3 rounded-lg">
                  <p className="text-sm font-medium text-teal-100 group-hover:text-white">
                    초보자 가이드: 게임 공략
                  </p>
                </div>
                <div className="group cursor-pointer transition-all duration-300 hover:bg-teal-700 p-3 rounded-lg">
                  <p className="text-sm font-medium text-teal-100 group-hover:text-white">
                    다음 호 예고고
                  </p>
                </div>
              </div>
            </div>

            {/* 오른쪽 본문 */}
            <div className="lg:col-span-2 p-6 lg:p-8">
              <article className="prose prose-lg max-w-none">
                <header className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 leading-tight">
                    이번 주 플레이 스테이션 진영 초기대작 출시!
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      글: 게임랭킹
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      2025년 8월 11일
                    </span>
                  </div>
                </header>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-base">
                    호라이즌 제로 던 시리즈의 새 시리즈 호라이즌 제로 던3을
                    출시한다고 게릴라 게임즈가 공식 발표를 했습니다.
                  </p>

                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-lg border-l-4 border-teal-500">
                    <p className="text-sm font-medium text-teal-800 mb-2">🏆</p>
                    <ul className="text-sm text-teal-700 space-y-1">
                      <li>• 레벨 업 가이드</li>
                      <li>• 아이템 위치 안내</li>
                      <li>• 보스 공략법법</li>
                    </ul>
                  </div>

                  <p className="text-base">
                    다음 뉴스레터도 알찬 소식과 공략으로 꽉 채워서
                    돌아오겠습니다!
                  </p>
                </div>

                {/* 액션 버튼 */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    전체 기사 보기
                  </button>
                </div>
              </article>
            </div>
          </div>

          {/* 푸터 */}
          <div className="bg-gray-50 px-6 py-4 text-center">
            <p className="text-sm text-gray-600">
              © 2025 게임랭킹 모든 권리 보유.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
