"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import onlineRequests08 from "./onlineRequests";
import Image from "next/image";

interface GameData {
  rank: string;
  name: string;
  company: string;
  img?: string;
}

interface Item {
  id: number;
  title: string;
  subtitle: string;
  img?: string;
  fit: string;
}

export default function SectionPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data: GameData[] = await onlineRequests08(); // 온라인 랭킹 데이터 불러오기
      const mapped: Item[] = data.map((game, index) => ({
        id: index + 1,
        title: game.name,
        subtitle: game.company,
        img: game.img, // 👈 placeholder 이미지
        fit: "object-cover",
      }));
      setItems(mapped);
    }
    fetchData();
  }, []);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.subtitle.toLowerCase().includes(q)
    );
  }, [searchQuery, items]);

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <div className="m-0 font-sans flex flex-col md:flex-row min-h-screen">
        {/* 사이드바 */}
        <aside className="w-full md:w-52 bg-slate-800 border-slate-700 border-b md:border-b-0 md:border-r p-5 flex flex-col gap-5 text-white">
          <div className="text-sm leading-relaxed">
            <strong className="block mb-2">Lesson & Article</strong>
            <div>2025</div>
            <div>2024</div>
            <div>2023</div>
          </div>
          <div className="h-48 border border-slate-700 flex items-center justify-center">
            광고
          </div>
          <div className="flex-grow"></div>
        </aside>

        {/* 메인 영역 */}
        <main className="flex-1 p-5">
          <Link href="/blog/newsletter" className="block">
            <div className="ad-banner bg-slate-800 border border-slate-700 h-20 flex items-center justify-center mb-5 cursor-pointer hover:opacity-90 transition-opacity">
              광고
            </div>
          </Link>

          <div className="flex gap-2.5 mb-5">
            <select className="bg-slate-800 border border-slate-700 text-white text-sm p-1.5">
              <option>언어</option>
            </select>
            <select className="bg-slate-800 border border-slate-700 text-white text-sm p-1.5">
              <option>정렬</option>
            </select>
            <input
              type="text"
              placeholder="검색 (제목/설명)"
              className="bg-slate-800 border border-slate-700 text-white text-sm p-1.5 flex-grow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="card bg-slate-800 border border-slate-700 flex items-center p-2.5 mb-2.5 gap-2.5"
            >
              <div className="card-img w-64 h-64 bg-slate-700 flex items-center justify-center text-xl rounded overflow-hidden">
                <Image
                  src={item.img || "/icon/rank_icon/placeholder.jpeg"}
                  alt={item.title}
                  width={256} // w-64
                  height={256} // h-64
                  className={`w-full h-full ${item.fit} rounded`}
                  placeholder="empty"
                />
              </div>
              <div className="card-text">
                <p className="card-title font-bold m-0 text-white text-2xl">
                  {item.id}. {item.title}
                </p>
                <br />
                <p className="card-subtitle text-slate-400 text-sm">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}

          <div className="mt-5 flex gap-2.5">
            <button className="bg-indigo-500 text-white rounded-md py-2 px-4 cursor-pointer hover:bg-indigo-600 transition-colors">
              더 많은 랭킹 보기
            </button>
            <button className="bg-transparent border border-indigo-500 text-indigo-500 rounded-md py-2 px-4 cursor-pointer hover:bg-indigo-500 hover:text-white transition-colors">
              필터 설정
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
