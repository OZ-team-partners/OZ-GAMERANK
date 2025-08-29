"use client";

import { Category } from "@/shared/data/dummyData";

interface CategoryFilterProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories = [
    { name: "온라인게임", icon: "🎮" },
    { name: "steam", icon: "🕹️" },
    { name: "PS", icon: "🎮" },
    { name: "닌텐도", icon: "📱" },
    { name: "모바일", icon: "🔍" },
    { name: "유머/정보", icon: "⭐" },
    { name: "디지털/컴퓨터/폰", icon: "🗂️" },
    { name: "게임공략", icon: "🗂️" },
    { name: "핫딜", icon: "🗂️" },
  ];

  return (
    <div className="col-span-1 lg:col-span-4 flex gap-9 py-3 pb-5 flex-wrap items-center justify-center">
      {categories.map((category) => (
        <div
          key={category.name}
          className="w-19 flex flex-col items-center gap-1.5 text-xs text-center"
        >
          <div className="w-9 h-9 rounded-md bg-purple-800 border border-slate-600 flex items-center justify-center shadow-sm">
            {category.icon}
          </div>
          <button
            className={`w-full p-1.5 border rounded text-sm cursor-pointer transition-colors ${
              selectedCategory === category.name
                ? "bg-indigo-400 text-white border-indigo-500"
                : "bg-slate-800 text-white border-slate-600 hover:border-slate-500"
            }`}
            onClick={() => onCategoryChange(category.name as Category)}
          >
            {category.name}
          </button>
        </div>
      ))}
    </div>
  );
}