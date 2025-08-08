<!DOCTYPE html>
<html lang="ko" class="bg-slate-900 text-white">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Image Layout Clone - Tailwind</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="m-0 font-sans flex flex-col md:flex-row min-h-screen">
    <!-- 사이드바 -->
    <aside
      class="w-full md:w-52 bg-slate-800 border-slate-700 border-b md:border-b-0 md:border-r p-5 flex flex-col gap-5 text-white"
    >
      <div class="text-sm leading-relaxed">
        <strong class="block mb-2">Lesson & Article</strong>
        <div>2025</div>
        <div>2024</div>
        <div>2023</div>
      </div>
      <div class="flex-grow"></div>
      <div
        class="h-48 border border-slate-700 flex items-center justify-center"
      >
        광고
      </div>
    </aside>

    <!-- 메인 영역 -->
    <main class="flex-1 p-5">
      <div
        class="ad-banner bg-slate-800 border border-slate-700 h-20 flex items-center justify-center mb-5"
      >
        광고
      </div>

      <div class="flex gap-2.5 mb-5">
        <select
          class="bg-slate-800 border border-slate-700 text-white text-sm p-1.5"
        >
          <option>언어</option>
        </select>
        <select
          class="bg-slate-800 border border-slate-700 text-white text-sm p-1.5"
        >
          <option>정렬</option>
        </select>
        <input
          type="text"
          placeholder="검색"
          class="bg-slate-800 border border-slate-700 text-white text-sm p-1.5 flex-grow"
        />
      </div>

      <div
        class="card bg-slate-800 border border-slate-700 flex items-center p-2.5 mb-2.5 gap-2.5"
      >
        <div
          class="card-img w-12 h-12 bg-slate-700 flex items-center justify-center text-xl rounded"
        >
          🖼
        </div>
        <div class="card-text">
          <p class="card-title font-bold m-0 text-white">Card Title</p>
          <p class="card-subtitle text-slate-400 text-xs">Secondary text</p>
        </div>
      </div>

      <div
        class="card bg-slate-800 border border-slate-700 flex items-center p-2.5 mb-2.5 gap-2.5"
      >
        <div
          class="card-img w-12 h-12 bg-slate-700 flex items-center justify-center text-xl rounded"
        >
          🖼
        </div>
        <div class="card-text">
          <p class="card-title font-bold m-0 text-white">Card Title</p>
          <p class="card-subtitle text-slate-400 text-xs">Secondary text</p>
        </div>
      </div>

      <div class="mt-5 flex gap-2.5">
        <button
          class="bg-indigo-500 text-white rounded-md py-2 px-4 cursor-pointer"
        >
          더 많은 랭킹 보기
        </button>
        <button
          class="bg-transparent border border-indigo-500 text-indigo-500 rounded-md py-2 px-4 cursor-pointer"
        >
          필터 설정
        </button>
      </div>
    </main>
  </body>
</html>
