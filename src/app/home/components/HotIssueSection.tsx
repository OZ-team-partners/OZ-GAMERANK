"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { HotIssueCard, HotIssueListItem } from "../types";

const hotIssueCards: HotIssueCard[] = [
  {
    id: 1,
    image: "https://cdn.akamai.steamstatic.com/steam/apps/2933620/header.jpg",
    title: "블랙 미스 2 개발 중단 공식 발표",
    description: "크라우드 펀딩 프로젝트의 갑작스런 중단 소식",
  },
  {
    id: 2,
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg",
    title: "발더스 게이트 3 GOTY 수상",
    description: "2024년 최고의 게임으로 선정된 화제작",
  },
  {
    id: 3,
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1623730/header.jpg",
    title: "팰월드 신규 업데이트 예고",
    description: "새로운 팰과 지역 추가 예정, 유저들 기대감 상승",
  },
  {
    id: 4,
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg",
    title: "레드 데드 리뎀션 PC 출시",
    description: "콘솔 독점작이 드디어 PC로 이식 확정",
  },
];

const hotIssueListItems: HotIssueListItem[] = [
  {
    id: 1,
    image: "https://cdn.akamai.steamstatic.com/steam/apps/2357570/header.jpg",
    title: "League of Legends 월드 챔피언십 2024 개최 확정",
    subtitle: "올해도 전 세계 게이머들의 축제가 열립니다",
    topic: "e 스포츠",
    time: "14:20",
  },
  {
    id: 2,
    image: "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg",
    title: "Valorant 새로운 요원 'Neon' 공개",
    subtitle: "한국 출신 요원으로 게임 메타 변화 예상",
    topic: "e 스포츠",
    time: "14:20",
  },
  {
    id: 3,
    image: "https://play-lh.googleusercontent.com/JRd05pyBH41qjgsJuWduRJpDeZG0Hnb0yjf2nWqO7VaGKL10-G5UIygxED-WNOc3pg",
    title: "PUBG Mobile 글로벌 챔피언십 2024",
    subtitle: "모바일 배틀로얄의 최고 권위 대회",
    topic: "e 스포츠",
    time: "14:20",
  },
  {
    id: 4,
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
    title: "Genshin Impact 4.0 업데이트 소식",
    subtitle: "새로운 지역과 캐릭터 추가 예정",
    topic: "업데이트",
    time: "19:11",
  },
  {
    id: 5,
    image: "https://cdn.akamai.steamstatic.com/steam/apps/2195250/header.jpg",
    title: "FIFA 24 e스포츠 리그 개막",
    subtitle: "전 세계 최고의 FIFA 플레이어들이 모입니다",
    topic: "기타",
    time: "209:20",
  },
];

export default function HotIssueSection() {
  const router = useRouter();

  return (
    <section className="py-16 bg-slate-900">
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200"></div>
            </div>
            <span className="text-orange-400 text-sm font-medium uppercase tracking-wider">
              Hot Issue
            </span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200"></div>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent font-bangers">
            GAME RANK : HOT ISSUE
          </h2>
          <p className="text-lg text-slate-300 font-light">
            지금 가장 뜨거운 게임 이슈들 🔥
          </p>
          
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mt-6 rounded-full"></div>
        </div>

        {/* 상단 4개 피처드 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {hotIssueCards.map((item) => (
            <div
              key={item.id}
              className="group relative backdrop-blur-sm bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl shadow-2xl overflow-hidden border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => router.push("/community")}
            >
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={item.image ?? "/default.png"}
                  alt={item.title}
                  width={320}
                  height={128}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-3 right-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-orange-400 font-bold uppercase">HOT</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-bold text-white text-base mb-2 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
              
            </div>
          ))}
        </div>

        {/* 메인 게시판 형태의 리스트 */}
        <div className="backdrop-blur-sm bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden shadow-xl">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              최신 핫 이슈
            </h3>
          </div>
          
          <div className="divide-y divide-white/10">
            {hotIssueListItems.map((item) => (
              <div
                key={item.id}
                className="group flex items-center p-4 hover:bg-slate-700/30 transition-all duration-200 cursor-pointer"
                onClick={() => router.push("/community")}
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-700/50">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={64}
                      height={48}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      item.topic === 'e 스포츠' 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                        : item.topic === '업데이트'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    }`}>
                      {item.topic}
                    </span>
                    <div className="flex items-center text-xs text-slate-400">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item.time}
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-white text-base mb-1 truncate group-hover:text-orange-400 transition-colors duration-200">
                    {item.title}
                  </h4>
                  <p className="text-slate-400 text-xs truncate">
                    {item.subtitle}
                  </p>
                </div>
                
                <div className="flex-shrink-0 ml-4">
                  <div className="w-8 h-8 rounded-full bg-orange-600/20 flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-300">
                    <svg className="w-4 h-4 text-orange-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
            <button 
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-lg text-white font-medium transition-all duration-300"
              onClick={() => router.push("/community")}
            >
              더 많은 이슈 보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}