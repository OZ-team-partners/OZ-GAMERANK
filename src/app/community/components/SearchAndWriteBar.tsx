"use client";

import React from "react";
import { Search, PenSquare } from "lucide-react";

interface SearchAndWriteBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onWriteClick: () => void;
}

export default function SearchAndWriteBar({ 
  searchTerm, 
  onSearchChange, 
  onWriteClick 
}: SearchAndWriteBarProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-700 mb-6 shadow-xl">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="게시글 검색..."
            className="w-full pl-10 pr-4 py-3 bg-slate-700/50 rounded-xl text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <button
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all cursor-pointer"
          onClick={onWriteClick}
        >
          <PenSquare className="w-5 h-5" />
          <span>글쓰기</span>
        </button>
      </div>
    </div>
  );
}