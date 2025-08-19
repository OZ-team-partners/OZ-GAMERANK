"use client";

import React, { useMemo, useState } from "react";

export default function SectionPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const items = [
    {
      id: 1,
      title: "안드로이드 세븐나이츠 키우기",
      subtitle: "육성게임계의 부동의 1위!",
      img: "/icon/rank_icon/mobile1.jpeg",
      fit: "object-contain",
    },
    {
      id: 2,
      title: "몬스터 길들이기",
      subtitle: "몬스터를 길들여서 미지의 세계를 탐험하자!",
      img: "/icon/rank_icon/mobile2.jpeg",
      fit: "object-contain",
    },
    {
      id: 3,
      title: "클래쉬 오브 클랜",
      subtitle: "클랜을 만들어 경쟁하고 승리하자!",
      img: "/icon/rank_icon/mobile3.jpeg",
      fit: "object-contain",
    },
  ];

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.subtitle.toLowerCase().includes(q)
    );
  }, [searchQuery]);
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
          <div className="ad-banner bg-slate-800 border border-slate-700 h-20 flex items-center justify-center mb-5">
            광고
          </div>

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
                <img
                  src={item.img}
                  alt={item.title}
                  className={`w-full h-full ${item.fit}`}
                />
              </div>
              <div className="card-text">
                <p className="card-title font-bold m-0 text-white text-2xl">
                  {item.title}
                </p>
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
