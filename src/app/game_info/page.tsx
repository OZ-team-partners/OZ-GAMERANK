"use client";

import React from "react";

export default function GameInfoPage() {
    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                        업청난 게임 정보!
                    </h1>
                    <p className="text-xl text-slate-300">
                        게임에 대한 모든 것을 알아보세요
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* 왼쪽: 게임 이미지 */}
                    <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="h-64 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mb-4">게임 스크린샷</h2>
                                <p className="text-lg opacity-80">게임 이미지 영역</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-4 text-yellow-400">게임 아이디</h3>
                            <div className="space-y-3 text-slate-300">
                                <p>• 장르: RPG, 액션 어드벤처</p>
                                <p>• 개발자: 게릴라 게임즈</p>
                                <p>• 출시일: 2025년 상반기</p>
                                <p>• 플랫폼: PS5, PC</p>
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽: 게임 정보 */}
                    <div className="space-y-8">
                        {/* 시스템 요구사항 */}
                        <div className="bg-slate-800 rounded-2xl p-6 shadow-xl">
                            <h3 className="text-2xl font-bold mb-6 text-yellow-400">시스템 요구 사항</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* 최소 요구사항 */}
                                <div className="bg-slate-700/50 rounded-lg p-4">
                                    <h4 className="text-lg font-semibold mb-4 text-green-400">최소</h4>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <p><span className="font-medium text-white">운영체제:</span> Windows10 64bit</p>
                                        <p><span className="font-medium text-white">프로세서:</span> Intel Core i5-2400/AMD Ryzen 5 1600</p>
                                        <p><span className="font-medium text-white">메모리:</span> 16 GB RAM</p>
                                        <p><span className="font-medium text-white">그래픽:</span> NVIDIA GeForce GTX 1060 6GB/AMD Radeon RX 580 8GB</p>
                                        <p><span className="font-medium text-white">DirectX:</span> 버전 12</p>
                                        <p><span className="font-medium text-white">네트워크:</span> 광대역 인터넷 연결</p>
                                        <p><span className="font-medium text-white">저장공간:</span> 60 GB 사용 가능 공간</p>
                                    </div>
                                </div>

                                {/* 권장 요구사항 */}
                                <div className="bg-slate-700/50 rounded-lg p-4">
                                    <h4 className="text-lg font-semibold mb-4 text-blue-400">권장</h4>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <p><span className="font-medium text-white">운영체제:</span> Windows11 64bit</p>
                                        <p><span className="font-medium text-white">프로세서:</span> Intel Core i7-4770/AMD Ryzen 5 3600</p>
                                        <p><span className="font-medium text-white">메모리:</span> 16 GB RAM</p>
                                        <p><span className="font-medium text-white">그래픽:</span> NVIDIA GeForce RTX 2070/AMD Radeon RX 3700 XT/Intel Arc A750</p>
                                        <p><span className="font-medium text-white">DirectX:</span> 버전 12</p>
                                        <p><span className="font-medium text-white">네트워크:</span> 광대역 인터넷 연결</p>
                                        <p><span className="font-medium text-white">저장공간:</span> 80 GB 사용 가능 공간. SSD Recommended. The above specifications were based on DLSS/FSR enabled.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 광고 영역 */}
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-center shadow-xl">
                            <h3 className="text-2xl font-bold mb-2">광고</h3>
                            <p className="text-lg opacity-90">게임 관련 광고 영역</p>
                        </div>
                    </div>
                </div>

                {/* 게임 정보 링크들 */}
                <div className="bg-slate-800 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-2xl font-bold mb-6 text-yellow-400">게임에 대한 자세한 정보로 공유</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <a href="#" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                            <div className="text-center">
                                <p className="text-sm font-medium">🎮 스팀리뷰 | 나 좋음 혼합갓게임 호평덕슌</p>
                            </div>
                        </a>

                        <a href="#" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                            <div className="text-center">
                                <p className="text-sm font-medium">🎯 메타345+ 좋맨 명작 못한 게임들 중 최고작</p>
                            </div>
                        </a>

                        <a href="#" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                            <div className="text-center">
                                <p className="text-sm font-medium">📱 안드로이드 | 아슈 최고의 모바일 게임</p>
                            </div>
                        </a>

                        <a href="#" className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                            <div className="text-center">
                                <p className="text-sm font-medium">🏆 뛰긋100 | 시대 초심전 공식 번갈 많천단 선인</p>
                            </div>
                        </a>

                        <a href="#" className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                            <div className="text-center">
                                <p className="text-sm font-medium">📺 방송인 | 쀼루 방송</p>
                            </div>
                        </a>

                        <a href="#" className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                            <div className="text-center">
                                <p className="text-sm font-medium">🎬 유튜브 | 스룡 유튜버</p>
                            </div>
                        </a>

                        <a href="#" className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                            <div className="text-center">
                                <p className="text-sm font-medium">📰 언보이 | 초네픈 출시</p>
                            </div>
                        </a>

                        <a href="#" className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                            <div className="text-center">
                                <p className="text-sm font-medium">🎯 뛰로렷 | 순천 최신 업식</p>
                            </div>
                        </a>

                        <a href="#" className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                            <div className="text-center">
                                <p className="text-sm font-medium">💝 터뷰가 | 느울 응사</p>
                            </div>
                        </a>
                    </div>
                </div>

                {/* 하단 공간 */}
                <div className="mt-12 text-center">
                    <p className="text-slate-400">
                        게임에 대한 더 많은 정보를 원하시면 위의 링크들을 확인해보세요!
                    </p>
                </div>
            </div>
        </div>
    );
}