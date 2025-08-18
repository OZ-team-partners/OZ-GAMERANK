"use client";

import React, { useState } from "react";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import CommentsSection from "./components/CommentsSection";

export default function GameInfoPage() {
  const [userVote, setUserVote] = useState<number | null>(null);

  const handleVote = (rating: number) => {
    if (userVote === rating) {
      setUserVote(null);
    } else {
      setUserVote(rating);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <MainContent />
          <Sidebar userVote={userVote} onVote={handleVote} />
        </div>
        <CommentsSection />
      </div>
    </div>
  );
}
