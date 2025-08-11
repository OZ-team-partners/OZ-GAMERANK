import React from "react";

export default function BoardPage() {
  return (
    <div className="m-0 font-sans bg-slate-900 text-white min-h-screen">
      <div className="max-w-[1100px] mx-auto my-7 px-4 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Top filters (zig-zag dropdowns with icons) */}
        <div className="col-span-1 lg:col-span-4 flex gap-3 py-3 pb-5 flex-wrap items-start">
          <div className="w-19 flex flex-col items-center gap-1.5 text-xs text-center">
            <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              🎮
            </div>
            <select className="w-full p-1.5 border border-gray-300 rounded bg-white text-sm">
              <option>온라인게임</option>
            </select>
          </div>
          <div className="w-19 flex flex-col items-center gap-1.5 text-xs text-center translate-y-2">
            <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              🕹️
            </div>
            <select className="w-full p-1.5 border border-gray-300 rounded bg-white text-sm">
              <option>steam</option>
            </select>
          </div>
          <div className="w-19 flex flex-col items-center gap-1.5 text-xs text-center">
            <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              🎮
            </div>
            <select className="w-full p-1.5 border border-gray-300 rounded bg-white text-sm">
              <option>PS</option>
            </select>
          </div>
          <div className="w-19 flex flex-col items-center gap-1.5 text-xs text-center translate-y-2">
            <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              📱
            </div>
            <select className="w-full p-1.5 border border-gray-300 rounded bg-white text-sm">
              <option>닌텐도</option>
            </select>
          </div>
          <div className="w-19 flex flex-col items-center gap-1.5 text-xs text-center">
            <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              🔍
            </div>
            <select className="w-full p-1.5 border border-gray-300 rounded bg-white text-sm">
              <option>모바일</option>
            </select>
          </div>
          <div className="w-19 flex flex-col items-center gap-1.5 text-xs text-center translate-y-2">
            <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              ⭐
            </div>
            <select className="w-full p-1.5 border border-gray-300 rounded bg-white text-sm">
              <option>유머/정보</option>
            </select>
          </div>
          <div className="w-19 flex flex-col items-center gap-1.5 text-xs text-center">
            <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              🗂️
            </div>
            <select className="w-full p-1.5 border border-gray-300 rounded bg-white text-sm">
              <option>디지털/컴퓨터/폰</option>
            </select>
          </div>
          <div className="w-19 flex flex-col items-center gap-1.5 text-xs text-center translate-y-2">
            <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              🗂️
            </div>
            <select className="w-full p-1.5 border border-gray-300 rounded bg-white text-sm">
              <option>게임공략</option>
            </select>
          </div>
          <div className="w-19 flex flex-col items-center gap-1.5 text-xs text-center">
            <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              🗂️
            </div>
            <select className="w-full p-1.5 border border-gray-300 rounded bg-white text-sm">
              <option>핫딜</option>
            </select>
          </div>
        </div>

        {/* LEFT: small card + big vertical ad */}
        <div className="lg:col-span-1 flex flex-col gap-4 items-center order-2 lg:order-1">
          <div className="w-full bg-indigo-500 text-white p-3.5 rounded-lg flex flex-col gap-2 items-start shadow-lg">
            <h4 className="m-0 text-sm">Subscribe</h4>
            <div className="text-xs opacity-95">
              Get our latest posts and news
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded-md border-none outline-none"
            />
          </div>

          <div className="w-full h-[420px] border-2 border-gray-300 rounded-md flex items-center justify-center text-xl text-gray-500">
            광고
          </div>
        </div>

        {/* RIGHT: 게시판 리스트 */}
        <div className="lg:col-span-3 bg-transparent order-1 lg:order-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="m-0">커뮤니티 게시판</h3>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="제목/내용/작성자"
                className="p-2 border border-gray-300 rounded-md"
              />
              <button className="p-2 px-3 rounded-md border border-gray-300 bg-white cursor-pointer">
                글쓰기
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-1.5">
            {/* 반복 항목: 썸네일 + 제목 + 가로 선 */}
            <div>
              <div className="flex items-center gap-3 p-3 px-2">
                <div className="w-[42px] h-[42px] rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                  Img
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[420px] text-sm">
                    이것은 (커뮤니티 홈페이지)의 글 제목입니다
                  </div>
                  <div className="h-px bg-gray-300 flex-1 opacity-60"></div>
                </div>
                <div className="w-40 text-right text-gray-500 text-xs">
                  2025-08-08 &nbsp; · &nbsp; 조회수 123
                </div>
              </div>
              <div className="h-px bg-gray-200 ml-[60px]"></div>
            </div>

            <div>
              <div className="flex items-center gap-3 p-3 px-2">
                <div className="w-[42px] h-[42px] rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                  Img
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[420px] text-sm">
                    이것은 (커뮤니티 홈페이지)의 글 제목입니다
                  </div>
                  <div className="h-px bg-gray-300 flex-1 opacity-60"></div>
                </div>
                <div className="w-40 text-right text-gray-500 text-xs">
                  2025-08-07 &nbsp; · &nbsp; 조회수 87
                </div>
              </div>
              <div className="h-px bg-gray-200 ml-[60px]"></div>
            </div>

            {/* 더미 항목 여러개 */}
            <div>
              <div className="flex items-center gap-3 p-3 px-2">
                <div className="w-[42px] h-[42px] rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                  Img
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[420px] text-sm">
                    이것은 (커뮤니티 홈페이지)의 글 제목입니다
                  </div>
                  <div className="h-px bg-gray-300 flex-1 opacity-60"></div>
                </div>
                <div className="w-40 text-right text-gray-500 text-xs">
                  2025-08-05 &nbsp; · &nbsp; 조회수 54
                </div>
              </div>
              <div className="h-px bg-gray-200 ml-[60px]"></div>
            </div>

            <div>
              <div className="flex items-center gap-3 p-3 px-2">
                <div className="w-[42px] h-[42px] rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                  Img
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[420px] text-sm">
                    이것은 (커뮤니티 홈페이지)의 글 제목입니다
                  </div>
                  <div className="h-px bg-gray-300 flex-1 opacity-60"></div>
                </div>
                <div className="w-40 text-right text-gray-500 text-xs">
                  2025-08-03 &nbsp; · &nbsp; 조회수 45
                </div>
              </div>
              <div className="h-px bg-gray-200 ml-[60px]"></div>
            </div>
          </div>

          {/* 페이지네이션 영역 */}
          <div className="mt-[18px] flex justify-center gap-2">
            <button className="p-2 px-3 border border-gray-300 rounded-md bg-white">
              &laquo;
            </button>
            <button className="p-2 px-3 rounded-md bg-indigo-500 text-white border-none">
              1
            </button>
            <button className="p-2 px-3 border border-gray-300 rounded-md bg-white">
              2
            </button>
            <button className="p-2 px-3 border border-gray-300 rounded-md bg-white">
              3
            </button>
            <button className="p-2 px-3 border border-gray-300 rounded-md bg-white">
              &raquo;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
