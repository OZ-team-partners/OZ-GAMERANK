"use client";

import { useState } from "react";
import Image from "next/image";
import GameRankHeader from "./header/header_bar";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Avatar,
    Typography,
} from "@mui/material";

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentSmallSlide] = useState(0);

    const mainSlides = [
        {
            id: 1,
            title: "ICE-BREAKING",
            image: "/icon/page_icon/mainSlides1.png",
        },
        { id: 2, title: "콘솔 게임", image: "/icon/page_icon/mainSlides2.png" },
        {
            id: 3,
            title: "모바일 게임",
            image: "/icon/page_icon/mainSlides3.png",
        },
        { id: 4, title: "인디 게임", image: "/icon/page_icon/mainSlides4.png" },
    ];

    const smallSlides = [
        {
            id: 1,
            title: "디지털 heal 판매중!",
            smallSlides_text: "지금이 제일 저렴할때!",
            image: "/action.jpg",
        },
        {
            id: 2,
            title: "게임특전",
            smallSlides_text: "지금이 제일 할인률이 높은거 아시죠?",
            image: "/rpg.jpg",
        },
        {
            id: 3,
            title: "ads",
            smallSlides_text: "S&P 500은 언제가 제일 싸다?",
            image: "/strategy.jpg",
        },
        {
            id: 4,
            title: "game-bti",
            smallSlides_text: "게임도 적성검사가 있는거 아세요?",
            image: "/sports.jpg",
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % mainSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide(
            (prev) => (prev - 1 + mainSlides.length) % mainSlides.length
        );
    };

    return (
        <div className="min-h-screen bg-slate-900">
            {/* 히어로 섹션 */}
            <section className="relative h-20 bg-gradient-to-r from-purple to-purple flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-40">
                    <Image
                        src="/icon/page_icon/mainUpperIcon1.png"
                        alt="게임 아이콘 1"
                        width={48}
                        height={48}
                        className="absolute top-[20%] left-[10%] rotate-[-20deg] drop-shadow-[0_2px_8px_rgba(255,,255,0.7)]"
                    />
                    <Image
                        src="/icon/page_icon/mainUpperIcon2.png"
                        alt="게임 아이콘 2"
                        width={48}
                        height={48}
                        className="absolute top-[10%] left-[30%] rotate-[15deg] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]"
                    />
                    <Image
                        src="/icon/page_icon/mainUpperIcon3.png"
                        alt="게임 아이콘 3"
                        width={48}
                        height={48}
                        className="absolute top-[25%] right-[10%] rotate-[15deg] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]"
                    />
                    <Image
                        src="/icon/page_icon/mainUpperIcon4.png"
                        alt="게임 아이콘 4"
                        width={100}
                        height={48}
                        className="absolute top-[-1%] right-[35%] rotate-[10deg] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]"
                    />
                    <Image
                        src="/icon/page_icon/mainUpperIcon5.png"
                        alt="게임 아이콘 5"
                        width={48}
                        height={48}
                        className="absolute top-[10%] right-[20%] rotate-[10deg] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]"
                    />
                    <Image
                        src="/icon/page_icon/mainUpperIcon6.png"
                        alt="게임 아이콘 6"
                        width={48}
                        height={48}
                        className="absolute top-[40%] left-[20%] rotate-[10deg] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]"
                    />
                </div>
                <div className="relative z-10 text-center text-white">
                    <h2 className="text-2xl font-bold mb-2">
                        흩어져 있는 순위, 이제 한곳에서 모아보자
                    </h2>
                    <h3 className="text-1xl font-semibold font-bangers">
                        [GAME RANK]
                    </h3>
                </div>
            </section>

            {/* 메인 슬라이더 */}
            <section className="py-10 bg-slate-900">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ]">
                    <div className="relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-500"
                            style={{
                                width: `${mainSlides.length * 100}%`,
                                transform: `translateX(-${
                                    currentSlide * (100 / mainSlides.length)
                                }%)`,
                                gap: "1rem",
                            }}
                        >
                            {mainSlides.map((slide, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0"
                                    style={{
                                        width: `${100 / mainSlides.length}%`,
                                    }}
                                >
                                    <div
                                        className="rounded-lg overflow-hidden relative cursor-pointer h-110"
                                        onClick={() => setCurrentSlide(index)}
                                    >
                                        <Image
                                            src={slide.image}
                                            alt={slide.title}
                                            width={800}
                                            height={320}
                                            className="object-cover w-full h-full"
                                        />
                                        <div className="absolute inset-0  from-indigo-500 to-purple-600 bg-opacity-50 flex flex-col justify-end p-4 text-white">
                                            <h3 className="text-2xl font-bold">
                                                {slide.title}
                                            </h3>
                                            <p>
                                                8월은 너무 더우니 시원한
                                                Cool-GAME!!!{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 좌우 버튼 */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-indigo-400"
                            style={{
                                background: "transparent",
                                border: "none",
                                padding: 0,
                            }}
                            aria-label="이전 슬라이드"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-indigo-400"
                            style={{
                                background: "transparent",
                                border: "none",
                                padding: 0,
                            }}
                            aria-label="다음 슬라이드"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                        {/* 인디케이터 - 사진 내부 하단 중앙 */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {mainSlides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`w-3 h-3 rounded-full ${
                                        idx === currentSlide
                                            ? "bg-indigo-500"
                                            : "bg-slate-600"
                                    }`}
                                    aria-label={`Slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 작은 슬라이더 (4개) */}
            <section className="py-7 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative">
                        <div className="flex items-center justify-between">
                            {/* 좌우 페이지 버튼이동 구현 안함 */}
                            {/* <button
                onClick={prevSmallSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-slate-700 rounded-full p-2 shadow-lg hover:bg-slate-600 text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button> */}

                            <div className="flex-1 mx-16">
                                <div className="grid grid-cols-4 gap-4">
                                    {smallSlides
                                        .slice(
                                            currentSmallSlide,
                                            currentSmallSlide + 4
                                        )
                                        .map((slide) => (
                                            <div
                                                key={slide.id}
                                                className="bg-slate-600 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                            >
                                                <div className="h-70 flex flex-col justify-end items-start p-4">
                                                    <h3
                                                        className={`font-semibold ${
                                                            slide.title ===
                                                            "game-bti"
                                                                ? "font-bangers text-xl"
                                                                : ""
                                                        }`}
                                                    >
                                                        {slide.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-300 mt-1">
                                                        {/* 작은 내용 넣기, 필요하면 slide에 추가 */}
                                                        {slide.smallSlides_text}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            {/* 좌우 페이지 버튼이동 구현 안함 */}
                            {/* <button
                onClick={nextSmallSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-slate-700 rounded-full p-2 shadow-lg hover:bg-slate-600 text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* 순위 차트 */}
            <section className="py-12 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold font-mono text-center mb-8 text-white">
                        플랫폼 별 TOP 3 : 이번 달의 POWER RANKER
                    </h2>

                    {/* 새로운 플랫폼별 순위 차트 */}
                    <TableContainer
                        component={Paper}
                        sx={{
                            maxWidth: 1100,
                            mx: "auto",
                            backgroundColor: "#1e293b", // slate-800에 해당하는 어두운 배경
                            border: "1px solidrgb(71, 105, 93)", // slate-600 테두리
                            borderRadius: 10,
                            boxShadow: "0 10px 25px rgba(137, 23, 23, 0.3)",
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "1.1rem",
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#334155", // slate-700
                                            color: "white",
                                            borderBottom: "2px solid #475569",
                                            width: "10%", // 순위 열 너비 고정
                                        }}
                                    >
                                        순위
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "1.1rem",
                                            backgroundColor: "#334155", // slate-700
                                            borderRight: "2px solid #475569",
                                            color: "white",
                                            borderBottom: "2px solid #475569",
                                            width: "30%", // 각 플랫폼 열 너비 동일하게
                                        }}
                                    >
                                        STEAM
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "1.1rem",
                                            backgroundColor: "#334155", // slate-700
                                            borderRight: "2px solid #475569",
                                            color: "white",
                                            borderBottom: "2px solid #475569",
                                            width: "30%", // 각 플랫폼 열 너비 동일하게
                                        }}
                                    >
                                        X BOX
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "1.1rem",
                                            backgroundColor: "#334155", // slate-700
                                            color: "white",
                                            borderBottom: "2px solid #475569",
                                            width: "30%", // 각 플랫폼 열 너비 동일하게
                                        }}
                                    >
                                        NINTENDO
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* 1위 */}
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "1.2rem",
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#1e40af", // blue-800 (순위 열 강조)
                                            color: "white",
                                            width: "10%", // 순위 열 너비 고정
                                        }}
                                    >
                                        <Chip
                                            label="1"
                                            sx={{
                                                bgcolor: "#FFD700",
                                                color: "black",
                                                fontWeight: "bold",
                                                fontSize: "1rem",
                                                width: 40,
                                                height: 40,
                                                boxShadow:
                                                    "0 2px 8px rgba(255, 215, 0, 0.3)",
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#1e293b", // slate-800
                                            color: "white",
                                            width: "30%", // 각 플랫폼 열 너비 동일하게
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <Avatar
                                                src="/icon/page_icon/mainSlides1.png"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: "2px solid #475569",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0, 0, 0, 0.3)",
                                                }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "white",
                                                    }}
                                                >
                                                    League of Legends
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#94a3b8" }}
                                                >
                                                    MOBA
                                                </Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#1e293b", // slate-800
                                            color: "white",
                                            width: "28.33%", // 각 플랫폼 열 너비 동일하게
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <Avatar
                                                src="/icon/page_icon/mainSlides2.png"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: "2px solid #475569",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0, 0, 0, 0.3)",
                                                }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "white",
                                                    }}
                                                >
                                                    FIFA 24
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#94a3b8" }}
                                                >
                                                    Sports
                                                </Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#1e293b",
                                            color: "white",
                                            width: "30%", // 30%로 변경
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <Avatar
                                                src="/icon/page_icon/mainSlides3.png"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: "2px solid #475569",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0, 0, 0, 0.3)",
                                                }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "white",
                                                    }}
                                                >
                                                    PUBG Mobile
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#94a3b8" }}
                                                >
                                                    Battle Royale
                                                </Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>

                                {/* 2위 */}
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "1.2rem",
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#1e40af", // blue-800
                                            color: "white",
                                            width: "10%", // 순위 열 너비 고정
                                        }}
                                    >
                                        <Chip
                                            label="2"
                                            sx={{
                                                bgcolor: "#C0C0C0",
                                                color: "black",
                                                fontWeight: "bold",
                                                fontSize: "1rem",
                                                width: 40,
                                                height: 40,
                                                boxShadow:
                                                    "0 2px 8px rgba(192, 192, 192, 0.3)",
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#1e293b",
                                            color: "white",
                                            width: "30%", // 30%로 변경
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <Avatar
                                                src="/icon/page_icon/mainSlides4.png"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: "2px solid #475569",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0, 0, 0, 0.3)",
                                                }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "white",
                                                    }}
                                                >
                                                    Valorant
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#94a3b8" }}
                                                >
                                                    FPS
                                                </Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#1e293b",
                                            color: "white",
                                            width: "30%", // 30%로 변경
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <Avatar
                                                src="/icon/page_icon/mainUpperIcon1.png"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: "2px solid #475569",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0, 0, 0, 0.3)",
                                                }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "white",
                                                    }}
                                                >
                                                    God of War
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#94a3b8" }}
                                                >
                                                    Action-Adventure
                                                </Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#1e293b",
                                            color: "white",
                                            width: "30%", // 30%로 변경
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <Avatar
                                                src="/icon/page_icon/mainUpperIcon2.png"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: "2px solid #475569",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0, 0, 0, 0.3)",
                                                }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "white",
                                                    }}
                                                >
                                                    Genshin Impact
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#94a3b8" }}
                                                >
                                                    RPG
                                                </Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>

                                {/* 3위 */}
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "1.2rem",
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#1e40af", // blue-800
                                            color: "white",
                                            width: "10%", // 순위 열 너비 고정
                                        }}
                                    >
                                        <Chip
                                            label="3"
                                            sx={{
                                                bgcolor: "#CD7F32",
                                                color: "white",
                                                fontWeight: "bold",
                                                fontSize: "1rem",
                                                width: 40,
                                                height: 40,
                                                boxShadow:
                                                    "0 2px 8px rgba(205, 127, 50, 0.3)",
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#1e293b",
                                            color: "white",
                                            width: "30%", // 30%로 변경
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <Avatar
                                                src="/icon/page_icon/mainUpperIcon3.png"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: "2px solid #475569",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0, 0, 0, 0.3)",
                                                }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "white",
                                                    }}
                                                >
                                                    Minecraft
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#94a3b8" }}
                                                >
                                                    Sandbox
                                                </Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#1e293b",
                                            color: "white",
                                            width: "30%", // 30%로 변경
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <Avatar
                                                src="/icon/page_icon/mainUpperIcon4.png"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: "2px solid #475569",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0, 0, 0, 0.3)",
                                                }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "white",
                                                    }}
                                                >
                                                    The Last of Us
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#94a3b8" }}
                                                >
                                                    Survival Horror
                                                </Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#1e293b",
                                            color: "white",
                                            width: "30%", // 30%로 변경
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <Avatar
                                                src="/icon/page_icon/mainUpperIcon5.png"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: "2px solid #475569",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0, 0, 0, 0.3)",
                                                }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "white",
                                                    }}
                                                >
                                                    Clash of Clans
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#94a3b8" }}
                                                >
                                                    Strategy
                                                </Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* 두 번째 순위 차트 (기존 테이블과 간격 추가) */}
                    <TableContainer
                        component={Paper}
                        sx={{
                            maxWidth: 1100,
                            mx: "auto",
                            mt: 4, // 위쪽 간격 32px
                            backgroundColor: "#1e293b", // slate-800에 해당하는 어두운 배경
                            border: "1px solidrgb(71, 105, 93)", // slate-600 테두리
                            borderRadius: 10,
                            boxShadow: "0 10px 25px rgba(36, 195, 46, 0.5)",
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "1.1rem",
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#334155", // slate-700
                                            color: "white",
                                            borderBottom: "2px solid #475569",
                                            width: "10%", // 순위 열 너비 고정
                                        }}
                                    >
                                        순위
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "1.1rem",
                                            backgroundColor: "#334155", // slate-700
                                            borderRight: "2px solid #475569",
                                            color: "white",
                                            borderBottom: "2px solid #475569",
                                            width: "30%", // 각 플랫폼 열 너비 동일하게
                                        }}
                                    >
                                        Android
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "1.1rem",
                                            backgroundColor: "#334155", // slate-700
                                            borderRight: "2px solid #475569",
                                            color: "white",
                                            borderBottom: "2px solid #475569",
                                            width: "30%", // 각 플랫폼 열 너비 동일하게
                                        }}
                                    >
                                        App Store
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "1.1rem",
                                            backgroundColor: "#334155", // slate-700
                                            color: "white",
                                            borderBottom: "2px solid #475569",
                                            width: "30%", // 각 플랫폼 열 너비 동일하게
                                        }}
                                    >
                                        나하 뭐하지
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* 1위 */}
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "1.2rem",
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#1e40af", // blue-800 (순위 열 강조)
                                            color: "white",
                                            width: "10%", // 순위 열 너비 고정
                                        }}
                                    >
                                        <Chip
                                            label="1"
                                            sx={{
                                                bgcolor: "#FFD700",
                                                color: "black",
                                                fontWeight: "bold",
                                                fontSize: "1rem",
                                                width: 40,
                                                height: 40,
                                                boxShadow:
                                                    "0 2px 8px rgba(255, 215, 0, 0.3)",
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#1e293b", // slate-800
                                            color: "white",
                                            width: "30%", // 각 플랫폼 열 너비 동일하게
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <Avatar
                                                src="/icon/page_icon/mainUpperIcon6.png"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: "2px solid #475569",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0, 0, 0, 0.3)",
                                                }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "white",
                                                    }}
                                                >
                                                    Counter-Strike 2
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#94a3b8" }}
                                                >
                                                    FPS
                                                </Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#1e293b", // slate-800
                                            color: "white",
                                            width: "30%", // 각 플랫폼 열 너비 동일하게
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <Avatar
                                                src="/icon/page_icon/mainUpperIcon7.png"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: "2px solid #475569",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0, 0, 0, 0.3)",
                                                }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "white",
                                                    }}
                                                >
                                                    Spider-Man 2
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#94a3b8" }}
                                                >
                                                    Action-Adventure
                                                </Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#1e293b",
                                            color: "white",
                                            width: "30%", // 30%로 변경
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <Avatar
                                                src="/icon/page_icon/mainUpperIcon8.png"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: "2px solid #475569",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0, 0, 0, 0.3)",
                                                }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "white",
                                                    }}
                                                >
                                                    Call of Duty Mobile
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#94a3b8" }}
                                                >
                                                    FPS
                                                </Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>

                                {/* 2위 */}
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "1.2rem",
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#1e40af", // blue-800
                                            color: "white",
                                            width: "10%", // 순위 열 너비 고정
                                        }}
                                    >
                                        <Chip
                                            label="2"
                                            sx={{
                                                bgcolor: "#C0C0C0",
                                                color: "black",
                                                fontWeight: "bold",
                                                fontSize: "1rem",
                                                width: 40,
                                                height: 40,
                                                boxShadow:
                                                    "0 2px 8px rgba(192, 192, 192, 0.3)",
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#1e293b",
                                            color: "white",
                                            width: "30%", // 30%로 변경
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <Avatar
                                                src="/icon/page_icon/mainSlides1.png"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: "2px solid #475569",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0, 0, 0, 0.3)",
                                                }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "white",
                                                    }}
                                                >
                                                    Overwatch 2
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#94a3b8" }}
                                                >
                                                    Hero Shooter
                                                </Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#1e293b",
                                            color: "white",
                                            width: "30%", // 30%로 변경
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <Avatar
                                                src="/icon/page_icon/mainSlides2.png"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: "2px solid #475569",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0, 0, 0, 0.3)",
                                                }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "white",
                                                    }}
                                                >
                                                    Elden Ring
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#94a3b8" }}
                                                >
                                                    Action RPG
                                                </Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#1e293b",
                                            color: "white",
                                            width: "30%", // 30%로 변경
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <Avatar
                                                src="/icon/page_icon/mainSlides3.png"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: "2px solid #475569",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0, 0, 0, 0.3)",
                                                }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "white",
                                                    }}
                                                >
                                                    Among Us
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#94a3b8" }}
                                                >
                                                    Social Deduction
                                                </Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>

                                {/* 3위 */}
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "1.2rem",
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#1e40af", // blue-800
                                            color: "white",
                                            width: "10%", // 순위 열 너비 고정
                                        }}
                                    >
                                        <Chip
                                            label="3"
                                            sx={{
                                                bgcolor: "#CD7F32",
                                                color: "white",
                                                fontWeight: "bold",
                                                fontSize: "1rem",
                                                width: 40,
                                                height: 40,
                                                boxShadow:
                                                    "0 2px 8px rgba(205, 127, 50, 0.3)",
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#1e293b",
                                            color: "white",
                                            width: "30%", // 30%로 변경
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <Avatar
                                                src="/icon/page_icon/mainSlides4.png"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: "2px solid #475569",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0, 0, 0, 0.3)",
                                                }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "white",
                                                    }}
                                                >
                                                    Fortnite
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#94a3b8" }}
                                                >
                                                    Battle Royale
                                                </Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderRight: "2px solid #475569",
                                            backgroundColor: "#1e293b",
                                            color: "white",
                                            width: "30%", // 30%로 변경
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <Avatar
                                                src="/icon/page_icon/mainUpperIcon1.png"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: "2px solid #475569",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0, 0, 0, 0.3)",
                                                }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "white",
                                                    }}
                                                >
                                                    Red Dead Redemption 2
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#94a3b8" }}
                                                >
                                                    Western
                                                </Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#1e293b",
                                            color: "white",
                                            width: "30%", // 30%로 변경
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <Avatar
                                                src="/icon/page_icon/mainUpperIcon2.png"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: "2px solid #475569",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0, 0, 0, 0.3)",
                                                }}
                                            />
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "white",
                                                    }}
                                                >
                                                    Candy Crush Saga
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#94a3b8" }}
                                                >
                                                    Puzzle
                                                </Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </section>

            {/* HOT ISSUE 섹션 */}
            <section className="py-12 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white font-bangers">
                        GAME RANK : HOT ISSUE
                    </h2>
                    <div className="grid grid-cols-3 gap-6">
                        {/* 2행 3열의 글 페이지들 */}
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                            >
                                <div className="h-24 bg-gradient-to-br from-emerald-500 to-indigo-500 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <svg
                                            className="w-8 h-8 mx-auto mb-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                        <p className="text-xs">이슈 {item}</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-semibold mb-3 text-white text-lg">
                                        게임 이슈 제목 {item}
                                    </h4>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        게임 관련 최신 소식과 이슈를
                                        확인해보세요. 다양한 게임 커뮤니티에서
                                        화제가 되고 있는 내용들을 한눈에 볼 수
                                        있습니다. 업데이트 소식부터 새로운 게임
                                        출시 정보까지 모든 것을 확인하세요.
                                    </p>
                                    <div className="mt-4 flex items-center text-emerald-400 text-xs">
                                        <span>조회수 1.2K</span>
                                        <span className="mx-2">•</span>
                                        <span>2시간 전</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
