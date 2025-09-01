"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="mt-8 flex justify-center">
      <div className="bg-slate-800/50 backdrop-blur-sm p-3 rounded-xl border border-slate-700 shadow-xl">
        <div className="flex items-center gap-2">
          {/* 처음으로 */}
          <button
            className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            title="처음 페이지"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>

          {/* 이전 */}
          <button
            className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            title="이전 페이지"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* 페이지 번호들 */}
          <div className="flex items-center gap-1 px-2">
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="px-2 text-slate-500">
                  •••
                </span>
              ) : (
                <button
                  key={page}
                  className={`
                    min-w-[32px] h-8 px-2 rounded-lg font-medium transition-all
                    ${currentPage === page
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white cursor-pointer"
                    }
                  `}
                  onClick={() => onPageChange(page as number)}
                >
                  {page}
                </button>
              )
            ))}
          </div>

          {/* 다음 */}
          <button
            className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            title="다음 페이지"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* 마지막으로 */}
          <button
            className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            title="마지막 페이지"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}