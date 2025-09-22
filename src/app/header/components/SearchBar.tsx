import { useState, FormEvent, useCallback } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!searchTerm.trim()) return;
      const query = encodeURIComponent(searchTerm.trim());
      window.location.href = `/search?q=${query}`;
    },
    [searchTerm]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  return (
    <div className="relative w-48 desktop-search">
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
          onChange={handleInputChange}
          className="
            w-full pl-9 pr-3 py-2
            bg-slate-800/80 border border-slate-700/60 rounded-lg
            text-slate-300 placeholder-slate-500 text-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50
            focus:shadow-sm focus:shadow-indigo-500/10 focus:bg-slate-800
            transition-all duration-150 ease-out
            backdrop-blur-sm
          "
        />
      </form>
    </div>
  );
};

export default SearchBar;
