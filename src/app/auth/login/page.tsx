"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Alert, Slide } from "@mui/material";
import { Mail, UserPlus, Key, Lock } from "lucide-react";
import { useAuth } from "@/shared/contexts/AuthContext";
import AuthLayout from "../components/AuthLayout";
import AuthHeader from "../components/AuthHeader";
import AuthInput from "../components/AuthInput";

const GameRankLogin = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState("");
    
    const { signIn } = useAuth();

    const handleEmailLogin = async () => {
        setError("");
        
        // 유효성 검사
        if (!email.trim()) {
            setError("이메일을 입력해주세요.");
            return;
        }
        if (!password.trim()) {
            setError("비밀번호를 입력해주세요.");
            return;
        }

        setIsLoading(true);
        
        try {
            const { user, error } = await signIn(email, password);

            if (error) {
                setError(error);
                return;
            }

            if (user) {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    router.push('/');
                }, 1500);
            }
        } catch {
            setError("로그인 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <AuthLayout>
            {/* 성공 알림 */}
            <Slide direction="down" in={showSuccess} mountOnEnter unmountOnExit>
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
                    <Alert severity="success" className="shadow-2xl backdrop-blur-sm">
                        로그인 완료! 메인페이지로 이동합니다 🎮
                    </Alert>
                </div>
            </Slide>

            {/* 에러 알림 */}
            <Slide direction="down" in={!!error} mountOnEnter unmountOnExit>
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
                    <Alert severity="error" className="shadow-2xl backdrop-blur-sm" onClose={() => setError("")}>
                        {error}
                    </Alert>
                </div>
            </Slide>

            {/* 헤더 */}
            <AuthHeader
                title="GAME RANK"
                subtitle="게임 순위의 모든 것을 한곳에서"
                chipLabel="안전한 로그인"
            />

            {/* 로그인 폼 */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-slate-800/90 via-slate-800/80 to-slate-900/90 rounded-3xl p-8 border border-slate-600/30 shadow-2xl">
                <div className="space-y-4">
                    <AuthInput
                        type="email"
                        label="이메일"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={setEmail}
                        icon={<Mail className="text-slate-400" size={20} />}
                    />

                    <AuthInput
                        type="password"
                        label="비밀번호"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={setPassword}
                        showPassword={showPassword}
                        onTogglePassword={() => setShowPassword(!showPassword)}
                        icon={<Lock className="text-slate-400" size={20} />}
                    />

                    <Button
                        onClick={handleEmailLogin}
                        disabled={isLoading}
                        fullWidth
                        size="large"
                        className="h-14"
                        sx={{
                            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
                            color: "white",
                            borderRadius: "12px",
                            textTransform: "none",
                            fontSize: "16px",
                            fontWeight: 600,
                            mt: 4,
                            "&:hover": {
                                background: "linear-gradient(135deg, #5b5cf1 0%, #7c3aed 50%, #c026d3 100%)",
                            },
                            "&:disabled": {
                                background: "linear-gradient(135deg, #475569 0%, #64748b 100%)",
                            },
                        }}
                    >
                        {isLoading ? "로그인 중..." : "로그인"}
                    </Button>

                    {/* 눈에 띄는 회원가입 버튼 */}
                    <Button
                        onClick={() => router.push("/auth/signup")}
                        fullWidth
                        size="large"
                        startIcon={<UserPlus size={20} />}
                        sx={{
                            background: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
                            color: "white",
                            borderRadius: "12px",
                            textTransform: "none",
                            fontSize: "16px",
                            fontWeight: 600,
                            height: "56px",
                            mt: 3,
                            "&:hover": {
                                background: "linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)",
                            },
                        }}
                    >
                        회원가입하기
                    </Button>

                    <div className="mt-4 text-center">
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Key size={16} />}
                            onClick={() => router.push("/auth/forgot_password")}
                            sx={{
                                borderColor: "rgba(148, 163, 184, 0.3)",
                                color: "#cbd5e1",
                                textTransform: "none",
                                "&:hover": {
                                    borderColor: "rgba(148, 163, 184, 0.5)",
                                    bgcolor: "rgba(148, 163, 184, 0.1)",
                                },
                            }}
                        >
                            비밀번호 재설정
                        </Button>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default GameRankLogin;
