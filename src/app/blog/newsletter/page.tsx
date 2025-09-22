
"use client";

import Image from "next/image";
import { useState } from "react";
import { mockNewsletters } from "./mock-newsletters";
import NewsletterModal from "./NewsletterModal";

// Define a type for our newsletter items
interface Newsletter {
  id: number;
  title: string;
  imageUrl: string;
  content: string;
}

export default function NewsletterPage() {
  // State for Modal (onClick)
  const [selectedItem, setSelectedItem] = useState<Newsletter | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for Preview (onMouseEnter)
  const [previewItem, setPreviewItem] = useState<Newsletter>(
    mockNewsletters[0],
  );

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Modal handlers
  const handleItemClick = (item: Newsletter) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockNewsletters.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(mockNewsletters.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-100 rounded-xl shadow-2xl overflow-hidden">
            {/* Title Section */}
            <div className="text-center py-8 px-6 bg-gradient-to-b from-gray-50 to-gray-100 border-b border-gray-200">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent mb-2">
                렙업 소식통
              </h1>
              <p className="text-gray-600 text-lg font-medium mb-4">
                게임랭킹 사이트 공식 뉴스레터
              </p>
              <div className="relative w-full 
     max-w-2xl mx-auto h-78 my-6 
     rounded-lg overflow-hidden 
     shadow-lg">
                <Image
                  src="/images/newsletter/magazine_main.png"
                  alt="Newsletter Banner"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              {/* Left Sidebar - List of Newsletters */}
              <div className="bg-gradient-to-b from-gray-700 to-gray-800 text-white p-6 lg:p-8">
                <h3 className="text-2xl text-center font-bold mb-6 text-gray-100">
                  이번 주 주요 소식
                </h3>
                <p className="text-center text-gray-300 text-xs mb-4">클릭시 자세히 볼수 있습니다</p>
                <div className="space-y-2 pr-2">
                  {currentItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      onMouseEnter={() => setPreviewItem(item)}
                      className={`group cursor-pointer transition-all duration-200 p-4 rounded-lg border border-transparent ${
                        previewItem.id === item.id
                          ? "bg-gray-900 border-gray-500"
                          : "hover:bg-gray-600"
                      }`}
                    >
                      <p className="text-sm font-medium text-gray-100 group-hover:text-white leading-relaxed">
                        {item.title}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          소식통 제{31 - item.id}호
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-400 mb-3">
                    총 {mockNewsletters.length}개의 소식
                  </p>
                  <div className="flex justify-center items-center space-x-1 mt-3">
                    {pageNumbers.map((number) => (
                      <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                          currentPage === number
                            ? "bg-gray-400 text-gray-900"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        [{number}]
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Content - DYNAMIC Preview Pane */}
              <div className="lg:col-span-2 p-6 lg:p-8 bg-white">
                {previewItem && (
                  <article className="prose prose-lg max-w-none">
                    {previewItem.imageUrl && (
                      <div className="relative h-64 md:h-80 overflow-hidden rounded-lg mb-6">
                        <Image
                          src={previewItem.imageUrl}
                          alt={previewItem.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <header className="mb-6">
                      <h2 className="text-3xl md:text-4xl font-bold text-black mb-3 leading-tight">
                        {previewItem.title}
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
                          글: 게임랭킹 편집팀
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
                          2025년 9월
                        </span>
                      </div>
                    </header>
                    <div
                      className="text-black leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: previewItem.content,
                      }}
                    />
                  </article>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-200 px-6 py-4 text-center">
              <p className="text-sm text-gray-700">
                © 2025 게임랭킹 모든 권리 보유.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component Render */}
      <NewsletterModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
