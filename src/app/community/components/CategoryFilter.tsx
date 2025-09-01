"use client";

import { Category } from "@/shared/data/dummyData";
import { 
  Gamepad2, 
  Cloud,
  Gamepad, 
  Smartphone, 
  Sparkles, 
  Monitor, 
  Trophy, 
  TrendingUp,
  Grid3X3,
  Joystick
} from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories = [
    { name: "전체", icon: <Grid3X3 className="w-5 h-5" /> },
    { name: "온라인게임", icon: <Gamepad2 className="w-5 h-5" /> },
    { name: "steam", icon: <Cloud className="w-5 h-5" /> },
    { name: "PS", icon: <Gamepad className="w-5 h-5" /> },
    { name: "닌텐도", icon: <Joystick className="w-5 h-5" /> },
    { name: "모바일", icon: <Smartphone className="w-5 h-5" /> },
    { name: "유머/정보", icon: <Sparkles className="w-5 h-5" /> },
    { name: "디지털/컴퓨터/폰", icon: <Monitor className="w-5 h-5" /> },
    { name: "게임공략", icon: <Trophy className="w-5 h-5" /> },
    { name: "핫딜", icon: <TrendingUp className="w-5 h-5" /> },
  ];

  return (
    <div className="mb-8">
      <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 shadow-xl">
        <h3 className="text-lg font-semibold mb-4 text-center">카테고리</h3>
        <div className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-10 gap-3">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name as Category)}
              className={`
                group flex flex-col items-center gap-1 p-2 rounded-xl transition-all cursor-pointer
                ${selectedCategory === category.name 
                  ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg" 
                  : "bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white"
                }
              `}
            >
              <div className={`
                p-1.5 rounded-lg transition-colors
                ${selectedCategory === category.name 
                  ? "bg-white/20" 
                  : "bg-slate-600/50 group-hover:bg-slate-600"
                }
              `}>
                {category.icon}
              </div>
              <span className="text-[10px] font-medium text-center whitespace-nowrap">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}