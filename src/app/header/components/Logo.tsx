import React from "react";
import { Trophy } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center space-x-3 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-200 ml-1"
    >
      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
        <Trophy className="text-white" size={20} />
      </div>
      <span className="text-2xl font-bangers bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
        GAME RAN
        <span style={{ marginRight: "0.25rem" }}>K</span>
      </span>
    </Link>
  );
};

export default Logo;