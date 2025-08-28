import React, { useState, FormEvent } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const query = encodeURIComponent(searchTerm.trim());
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
  };

  return (
    <div className="relative w-48">
      <form onSubmit={handleSearch}>
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-300 z-10"
          size={16}
        />
        <input
          type="text"
          placeholder="게임 검색"
          aria-label="게임 및 랭킹 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full pl-9 pr-16 py-2 
            bg-slate-800/80 border border-slate-700/60 rounded-lg
            text-slate-300 placeholder-slate-500 text-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50
            focus:shadow-sm focus:shadow-indigo-500/10 focus:bg-slate-800
            transition-all duration-150 ease-out
            backdrop-blur-sm
          "
        />
        <button
          type="submit"
          className="
            absolute right-1 top-1/2 transform -translate-y-1/2
            bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold
            px-3 py-1 rounded
            transition-colors duration-150
          "
        >
          검색
        </button>
      </form>
    </div>
  );
};

export default SearchBar;