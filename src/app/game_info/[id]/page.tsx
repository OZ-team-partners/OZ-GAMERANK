"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import CommentsSection from "../components/CommentsSection";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";

type RankGameRow = {
  id: number;
  platform: string | null;
  rank: number | null;
  game_title: string;
  game_subtitle: string | null;
  image_url: string | null;
  update_when: string | null;
};

export default function GameInfoDetailPage() {
  const params = useParams<{ id: string }>();
  const idParam = params?.id ?? "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [game, setGame] = useState<RankGameRow | null>(null);
  const [userVote, setUserVote] = useState<number | null>(null);

  const isNumericId = useMemo(() => /^\d+$/.test(idParam), [idParam]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [idParam]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const query = supabase
          .from("rank_game")
          .select(
            "id, platform, rank, game_title, game_subtitle, image_url, update_when"
          );

        const { data, error } = isNumericId
          ? await query.eq("id", Number(idParam)).limit(1).maybeSingle()
          : await query
              .eq("game_title", decodeURIComponent(idParam))
              .limit(1)
              .maybeSingle();

        if (error) throw error;
        if (!mounted) return;
        setGame((data as RankGameRow) || null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "게임 정보를 불러오지 못했습니다."
        );
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [idParam, isNumericId]);

  const handleVote = (rating: number) => {
    setUserVote((prev) => (prev === rating ? null : rating));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-slate-300">게임 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-slate-400">게임 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
              <div className="flex items-start gap-5">
                <div className="bg-slate-700 rounded-lg overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={game.image_url || "/icon/rank_icon/steam1.jpeg"}
                    alt={game.game_title}
                    className="max-w-110 h-auto"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-slate-400 mb-1">
                    {game.platform || "Platform"}{" "}
                    {game.rank ? `• #${game.rank}` : ""}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {game.game_title}
                  </h1>
                  <p className="text-slate-300">
                    {game.game_subtitle || "설명이 등록되지 않았습니다."}
                  </p>
                  {game.update_when && (
                    <div className="text-xs text-slate-500 mt-3">
                      마지막 업데이트:{" "}
                      {new Date(game.update_when).toLocaleString("ko-KR")}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <MainContent platform={game.platform || ""} />

            {/* 댓글 */}
            <CommentsSection />
          </div>

          {/* 사이드바 */}
          <Sidebar
            userVote={userVote}
            onVote={handleVote}
            imageUrl={game.image_url}
            title={game.game_title}
            platform={game.platform || ""}
          />
        </div>
      </div>
    </div>
  );
}
