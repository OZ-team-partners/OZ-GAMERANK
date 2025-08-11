"use client";

import React, { useState } from "react";
import { Button, TextField, Alert, Fade, Slide, Grow } from "@mui/material";
import { Mail, Trophy, Gamepad2, Star } from "lucide-react";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2500);
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center relative overflow-hidden p-6">
            <Slide direction="down" in={showSuccess} mountOnEnter unmountOnExit>
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
                    <Alert severity="success">메일을 확인해주세요!</Alert>
                </div>
            </Slide>

            {/* 동적 배경 요소들 */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-32 left-40 w-40 h-40 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
                <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>

                {/* 떠다니는 게임 아이콘들 */}
                <div className="absolute top-32 left-1/4 animate-float">
                    <img
                        src="/icon/page_icon/mainUpperIcon1.png"
                        alt="Nintendo"
                        className="w-6 h-6 opacity-30"
                    />
                </div>
                <div className="absolute bottom-40 right-1/4 animate-float-delayed">
                    <img
                        src="/icon/page_icon/mainUpperIcon2.png"
                        alt="Steam"
                        className="w-7 h-7 opacity-30"
                    />
                </div>
                <div className="absolute top-1/3 right-1/5 animate-float-slow">
                    <img
                        src="/icon/page_icon/mainUpperIcon3.png"
                        alt="Xbox"
                        className="w-5 h-5 opacity-30"
                    />
                </div>
                <div className="absolute top-20 right-32 animate-float">
                    <img
                        src="/icon/page_icon/mainUpperIcon4.png"
                        alt="PS4"
                        className="w-6 h-6 opacity-25"
                    />
                </div>
                <div className="absolute bottom-28 left-32 animate-float-delayed">
                    <img
                        src="/icon/page_icon/mainUpperIcon6.png"
                        alt="Epic"
                        className="w-5 h-5 opacity-30"
                    />
                </div>
                <div className="absolute top-2/3 left-1/5 animate-float-slow">
                    <img
                        src="/icon/page_icon/mainUpperIcon7.png"
                        alt="Discord"
                        className="w-6 h-6 opacity-25"
                    />
                </div>
                <div className="absolute bottom-72 right-1/3 animate-float-delayed">
                    <img
                        src="/icon/page_icon/mainUpperIcon8.png"
                        alt="App Store"
                        className="w-6 h-6 opacity-30 filter brightness-75"
                    />
                </div>
            </div>

            <Grow in timeout={800}>
                <div className="w-full max-w-md bg-slate-800/80 border border-slate-600/30 rounded-2xl p-6 shadow-xl relative z-10 backdrop-blur-xl">
                    <h1 className="text-white text-2xl font-semibold mb-2">
                        비밀번호 재설정
                    </h1>
                    <p className="text-slate-300 text-sm mb-6">
                        가입된 이메일로 비밀번호 재설정 링크를 보내드립니다.
                    </p>

                    <TextField
                        fullWidth
                        type="email"
                        label="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일을 입력하세요"
                        InputProps={{
                            startAdornment: (
                                <span className="pl-2 text-slate-400">
                                    <Mail size={18} />
                                </span>
                            ),
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                bgcolor: "rgba(51, 65, 85, 0.6)",
                                borderRadius: "12px",
                                "& fieldset": {
                                    borderColor: "rgba(148, 163, 184, 0.3)",
                                },
                                "&:hover fieldset": {
                                    borderColor: "rgba(148, 163, 184, 0.5)",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#6366f1",
                                },
                            },
                            "& .MuiInputLabel-root": { color: "#94a3b8" },
                            "& .MuiInputBase-input": { color: "white" },
                        }}
                    />

                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading || !email}
                        fullWidth
                        sx={{
                            mt: 3,
                            background:
                                "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
                            color: "white",
                            borderRadius: "12px",
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, #5b5cf1 0%, #7c3aed 50%, #c026d3 100%)",
                            },
                        }}
                    >
                        {isLoading ? "전송 중..." : "재설정 링크 보내기"}
                    </Button>

                    <Button
                        onClick={() => router.push("/auth/login")}
                        fullWidth
                        variant="text"
                        sx={{ mt: 1, color: "#a5b4fc", textTransform: "none" }}
                    >
                        로그인으로 돌아가기
                    </Button>
                </div>
            </Grow>
            <style jsx>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
                @keyframes float-delayed {
                    0%,
                    100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-15px) rotate(5deg);
                    }
                }
                @keyframes float-slow {
                    0%,
                    100% {
                        transform: translateY(0px) scale(1);
                    }
                    50% {
                        transform: translateY(-10px) scale(1.1);
                    }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float-delayed 8s ease-in-out infinite;
                }
                .animate-float-slow {
                    animation: float-slow 10s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default ForgotPasswordPage;
