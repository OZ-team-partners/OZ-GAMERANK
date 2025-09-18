"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  ChevronRight
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 상단 섹션 - 4개 컬럼 */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* 회사 정보 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-bangers text-3xl bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                GAME RANK
              </span>
            </div>
            <p className="text-slate-400 text-sm">
              모든 게임 순위를 한곳에서 확인하세요.
              PC, 콘솔, 모바일 게임의 최신 랭킹 정보를 제공합니다.
            </p>
            {/* 소셜 미디어 링크 */}
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="text-slate-400 hover:text-purple-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-pink-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-red-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/25"
                aria-label="Youtube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* 게임 플랫폼 */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">게임 플랫폼</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/rank/pc/steam"
                  className="text-slate-400 hover:text-blue-400 transition-all duration-300 text-sm flex items-center gap-1 group hover:bg-blue-500/10 hover:border-blue-500/30 rounded-lg px-2 py-1 border border-transparent"
                >
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-all duration-300 group-hover:text-blue-300" />
                  Steam 게임
                </Link>
              </li>
              <li>
                <Link
                  href="/rank/pc/online"
                  className="text-slate-400 hover:text-green-400 transition-all duration-300 text-sm flex items-center gap-1 group hover:bg-green-500/10 hover:border-green-500/30 rounded-lg px-2 py-1 border border-transparent"
                >
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-all duration-300 group-hover:text-green-300" />
                  온라인 게임
                </Link>
              </li>
              <li>
                <Link
                  href="/rank/mobile/ios"
                  className="text-slate-400 hover:text-purple-400 transition-all duration-300 text-sm flex items-center gap-1 group hover:bg-purple-500/10 hover:border-purple-500/30 rounded-lg px-2 py-1 border border-transparent"
                >
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-all duration-300 group-hover:text-purple-300" />
                  모바일 게임
                </Link>
              </li>
              <li>
                <Link
                  href="/rank/console/nintendo"
                  className="text-slate-400 hover:text-orange-400 transition-all duration-300 text-sm flex items-center gap-1 group hover:bg-orange-500/10 hover:border-orange-500/30 rounded-lg px-2 py-1 border border-transparent"
                >
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-all duration-300 group-hover:text-orange-300" />
                  콘솔 게임
                </Link>
              </li>
            </ul>
          </div>

          {/* 커뮤니티 */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">커뮤니티</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/community"
                  className="text-slate-400 hover:text-cyan-400 transition-all duration-300 text-sm flex items-center gap-1 group hover:bg-cyan-500/10 hover:border-cyan-500/30 rounded-lg px-2 py-1 border border-transparent"
                >
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-all duration-300 group-hover:text-cyan-300" />
                  커뮤니티
                </Link>
              </li>
              <li>
                <Link
                  href="/small_contents/game_mbti"
                  className="text-slate-400 hover:text-pink-400 transition-all duration-300 text-sm flex items-center gap-1 group hover:bg-pink-500/10 hover:border-pink-500/30 rounded-lg px-2 py-1 border border-transparent"
                >
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-all duration-300 group-hover:text-pink-300" />
                  게임 MBTI
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/newsletter"
                  className="text-slate-400 hover:text-yellow-400 transition-all duration-300 text-sm flex items-center gap-1 group hover:bg-yellow-500/10 hover:border-yellow-500/30 rounded-lg px-2 py-1 border border-transparent"
                >
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-all duration-300 group-hover:text-yellow-300" />
                  뉴스레터
                </Link>
              </li>
              <li>
                <Link
                  href="/notice"
                  className="text-slate-400 hover:text-indigo-400 transition-all duration-300 text-sm flex items-center gap-1 group hover:bg-indigo-500/10 hover:border-indigo-500/30 rounded-lg px-2 py-1 border border-transparent"
                >
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-all duration-300 group-hover:text-indigo-300" />
                  공지사항
                </Link>
              </li>
            </ul>
          </div>

          {/* 고객 지원 */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">고객 지원</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-slate-400 hover:text-emerald-400 transition-all duration-300 text-sm flex items-center gap-1 group hover:bg-emerald-500/10 hover:border-emerald-500/30 rounded-lg px-2 py-1 border border-transparent"
                >
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-all duration-300 group-hover:text-emerald-300" />
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-400 hover:text-violet-400 transition-all duration-300 text-sm flex items-center gap-1 group hover:bg-violet-500/10 hover:border-violet-500/30 rounded-lg px-2 py-1 border border-transparent"
                >
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-all duration-300 group-hover:text-violet-300" />
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-teal-400 transition-all duration-300 text-sm flex items-center gap-1 group hover:bg-teal-500/10 hover:border-teal-500/30 rounded-lg px-2 py-1 border border-transparent"
                >
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-all duration-300 group-hover:text-teal-300" />
                  문의하기
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-slate-400 hover:text-amber-400 transition-all duration-300 text-sm flex items-center gap-1 group hover:bg-amber-500/10 hover:border-amber-500/30 rounded-lg px-2 py-1 border border-transparent"
                >
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-all duration-300 group-hover:text-amber-300" />
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 뉴스레터 구독 섹션 */}
        <div className="py-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h4 className="text-white font-semibold mb-2">게임 뉴스레터 구독</h4>
              <p className="text-slate-400 text-sm">최신 게임 순위와 소식을 이메일로 받아보세요</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 flex-1 md:w-64"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors duration-200 flex items-center gap-2">
                <Mail size={16} />
                구독
              </button>
            </div>
          </div>
        </div>

        {/* 하단 섹션 - 저작권 */}
        <div className="py-6 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm text-center sm:text-left">
              © 2025 GAME RANK. Crafted with ❤️ by <span className="text-purple-400 font-semibold">Team 장용식</span>
            </p>
            <p className="text-slate-500 text-xs text-center sm:text-right">
              본 사이트의 모든 게임 순위 정보는 실시간으로 업데이트됩니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;