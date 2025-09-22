"use client";

import Image from "next/image";
import { useState } from "react";
import NewsletterModal from "./NewsletterModal";
import { mockNewsletters } from "./mock-newsletters";

interface NewsletterItem {
  id: number;
  title: string;
  content: string;
  author?: string;
  date?: string;
  category?: string;
  imageUrl?: string;
}

export default function NewsletterPage() {
  const [selectedItem, setSelectedItem] = useState<NewsletterItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item: NewsletterItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 메인 컨테이너 */}
        <div className="bg-gray-100 rounded-xl shadow-2xl overflow-hidden">
          {/* 상단 헤더 */}
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">2025년 9월 11일</span>
              <span className="text-sm font-medium bg-gray-700 px-3 py-1 rounded-full">
                제29호
              </span>
            </div>
          </div>

          {/* 타이틀 섹션 */}
          <div className="text-center py-8 px-6 bg-gradient-to-b from-gray-50 to-gray-100">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent mb-2">
              렙업 소식통
            </h1>
            <p className="text-gray-700 text-lg font-medium">
              게임랭킹 사이트 공식 뉴스레터
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* 메인 이미지 */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1532012197267-da84d127e765"
              alt="도서관 이미지"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          {/* 콘텐츠 영역 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* 왼쪽 사이드바 */}
            <div className="bg-gradient-to-b from-gray-700 to-gray-800 text-white p-6 lg:p-8">
              <h3 className="text-xl font-bold mb-6 text-gray-100">
                이번 주 주요 소식
              </h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {[...mockNewsletters]
                  .slice()
                  .sort((a, b) => b.id - a.id)
                  .map((item) => (
                    <div
                      key={item.id}
                      onClick={() =>
                        handleItemClick({
                          id: item.id,
                          title: item.title,
                          content: item.content,
                          author: "게임랭킹 편집팀",
                          date: "2025년 9월 11일",
                          category: "게임 소식",
                          imageUrl: item.imageUrl,
                        })
                      }
                      className="group cursor-pointer transition-all duration-300 hover:bg-gray-600 p-3 rounded-lg border border-gray-600 hover:border-gray-500"
                    >
                      <p className="text-sm font-medium text-gray-100 group-hover:text-white leading-relaxed">
                        {item.title}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-400">소식통 제{31 - (item?.id ?? 0)}호</span>
                        <span className="text-xs text-gray-400">읽기</span>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">
                  총 {mockNewsletters.length}개의 소식
                </p>
              </div>
            </div>

            {/* 오른쪽 본문 */}
            <div className="lg:col-span-2 p-6 lg:p-8 bg-gray-50">
              <article className="prose prose-lg max-w-none">
                <header className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-black mb-3 leading-tight">
                    이번 주 플레이 스테이션 진영 초기대작 출시!
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
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

                <div className="space-y-4 text-black leading-relaxed">
                  <p className="text-base">
                    호라이즌 제로 던 시리즈의 새 시리즈 호라이즌 제로 던3을
                    출시한다고 게릴라 게임즈가 공식 발표를 했습니다.
                  </p>

                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg border-l-4 border-gray-600">
                    <p className="text-sm font-medium text-gray-800 mb-2">🏆</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 레벨 업 가이드</li>
                      <li>• 아이템 위치 안내</li>
                      <li>• 보스 공략법</li>
                    </ul>
                  </div>

                  <p className="text-base">
                    다음 뉴스레터도 알찬 소식과 공략으로 꽉 채워서
                    돌아오겠습니다!
                  </p>
                </div>

                {/* 액션 버튼 */}
                <div className="mt-8 pt-6 border-t border-gray-300">
                  <button className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-black text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    전체 기사 보기
                  </button>
                </div>
              </article>
            </div>
          </div>

          {/* 푸터 */}
          <div className="bg-gray-200 px-6 py-4 text-center">
            <p className="text-sm text-gray-700">
              © 2025 게임랭킹 모든 권리 보유.
            </p>
          </div>
        </div>
      </div>

      {/* 모달 컴포넌트 */}
      <NewsletterModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
