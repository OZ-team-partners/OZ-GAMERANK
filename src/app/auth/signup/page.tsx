"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Button,
    TextField,
    IconButton,
    InputAdornment,
    Alert,
    Divider,
    Chip,
    Fade,
    Grow,
    Slide,
} from "@mui/material";
import {
    Trophy,
    Mail,
    Eye,
    EyeOff,
    Gamepad2,
    Shield,
    User,
    Key,
} from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const GameRankSignup = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSocialSignup = async (provider: string) => {
        setError("");
        setIsLoading(provider);
        
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: provider as 'discord' | 'google',
                options: {
                    redirectTo: `${window.location.origin}/`
                }
            });

            if (error) {
                setError(error.message);
            }
        } catch (err) {
            setError("소셜 로그인 중 오류가 발생했습니다.");
        } finally {
            setIsLoading("");
        }
    };

    const handleEmailSignup = async () => {
        setError("");
        
        // 유효성 검사
        if (!username.trim()) {
            setError("사용자명을 입력해주세요.");
            return;
        }
        if (!email.trim()) {
            setError("이메일을 입력해주세요.");
            return;
        }
        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (password.length < 6) {
            setError("비밀번호는 최소 6자 이상이어야 합니다.");
            return;
        }

        setIsLoading("email");
        
        try {
            // Supabase Auth로 회원가입
            const { data, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username: username,
                    }
                }
            });

            if (authError) {
                setError(authError.message);
                return;
            }

            if (data.user) {
                // users 테이블에 사용자 정보 저장 (새로운 테이블 구조에 맞춰)
                try {
                    const { error: insertError } = await supabase
                        .from('users')
                        .insert([
                            {
                                username: username,
                                email: email,
                                password_hash: 'supabase_auth_managed', // Supabase Auth가 비밀번호 처리
                                avatar_url: null,
                                role: 'user'
                            }
                        ]);

                    if (insertError) {
                        console.error('사용자 정보 저장 오류:', insertError);
                        // 사용자 정보 저장 실패해도 Auth는 성공했으므로 계속 진행
                    }
                } catch (profileError) {
                    console.error('사용자 정보 저장 중 오류:', profileError);
                }

                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    router.push('/auth/login');
                }, 2000);
            }
        } catch (err: any) {
            setError(err.message || "회원가입 중 오류가 발생했습니다.");
        } finally {
            setIsLoading("");
        }
    };

    const socialButtons = [
        {
            name: "discord",
            label: "Discord로 회원가입",
            color: "#5865F2",
            hoverColor: "#4752C4",
            icon: (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
            ),
            popular: true,
        },
        {
            name: "google",
            label: "Google로 회원가입",
            color: "#ffffff",
            textColor: "#374151",
            border: true,
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                </svg>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center relative overflow-hidden">
            {/* 성공 알림 */}
            <Slide direction="down" in={showSuccess} mountOnEnter unmountOnExit>
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
                    <Alert
                        severity="success"
                        className="shadow-2xl backdrop-blur-sm"
                        sx={{
                            bgcolor: "rgba(34, 197, 94, 0.1)",
                            color: "#22c55e",
                            border: "1px solid rgba(34, 197, 94, 0.3)",
                            "& .MuiAlert-icon": { color: "#22c55e" },
                        }}
                    >
                        회원가입이 완료되었습니다! 🎮
                    </Alert>
                </div>
            </Slide>

            {/* 에러 알림 */}
            <Slide direction="down" in={!!error} mountOnEnter unmountOnExit>
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
                    <Alert
                        severity="error"
                        className="shadow-2xl backdrop-blur-sm"
                        onClose={() => setError("")}
                        sx={{
                            bgcolor: "rgba(239, 68, 68, 0.1)",
                            color: "#ef4444",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            "& .MuiAlert-icon": { color: "#ef4444" },
                        }}
                    >
                        {error}
                    </Alert>
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
                    <Image
                        src="/icon/page_icon/mainUpperIcon1.png"
                        alt="Nintendo"
                        width={24}
                        height={24}
                        className="opacity-30"
                    />
                </div>
                <div className="absolute bottom-40 right-1/4 animate-float-delayed">
                    <Image
                        src="/icon/page_icon/mainUpperIcon2.png"
                        alt="Steam"
                        width={28}
                        height={28}
                        className="opacity-30"
                    />
                </div>
                <div className="absolute top-1/3 right-1/5 animate-float-slow">
                    <Image
                        src="/icon/page_icon/mainUpperIcon3.png"
                        alt="Xbox"
                        width={20}
                        height={20}
                        className="opacity-30"
                    />
                </div>
                <div className="absolute top-20 right-32 animate-float">
                    <Image
                        src="/icon/page_icon/mainUpperIcon4.png"
                        alt="PS4"
                        width={24}
                        height={24}
                        className="opacity-25"
                    />
                </div>
                <div className="absolute bottom-28 left-32 animate-float-delayed">
                    <Image
                        src="/icon/page_icon/mainUpperIcon6.png"
                        alt="Epic"
                        width={20}
                        height={20}
                        className="opacity-30"
                    />
                </div>
                <div className="absolute top-2/3 left-1/5 animate-float-slow">
                    <Image
                        src="/icon/page_icon/mainUpperIcon7.png"
                        alt="Discord"
                        width={24}
                        height={24}
                        className="opacity-25"
                    />
                </div>
                <div className="absolute bottom-72 right-1/3 animate-float-delayed">
                    <Image
                        src="/icon/page_icon/mainUpperIcon8.png"
                        alt="App Store"
                        width={24}
                        height={24}
                        className="opacity-30 filter brightness-75"
                    />
                </div>
            </div>

            <Grow in timeout={800}>
                <div className="w-full max-w-md p-6 relative z-10">
                    {/* 로고 & 브랜딩 섹션 */}
                    <Fade in timeout={1000}>
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl mb-6 shadow-2xl shadow-indigo-500/25 relative">
                                <Trophy className="text-white" size={36} />
                            </div>
                            <h1 className="text-5xl font-bold font-bangers bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3 drop-shadow-lg">
                                GAME RANK
                            </h1>
                            <p className="text-slate-300 text-base font-medium">
                                게임 순위의 모든 것을 한곳에서
                            </p>
                            <Chip
                                icon={<Shield size={14} />}
                                label="안전한 회원가입"
                                size="small"
                                className="mt-3"
                                sx={{
                                    bgcolor: "rgba(99, 102, 241, 0.2)",
                                    color: "#c7d2fe",
                                    border: "1px solid rgba(99, 102, 241, 0.3)",
                                    "& .MuiChip-icon": { color: "#c7d2fe" },
                                }}
                            />
                        </div>
                    </Fade>

                    {/* 메인 회원가입 카드 */}
                    <Fade in timeout={1200}>
                        <div className="backdrop-blur-xl bg-gradient-to-br from-slate-800/90 via-slate-800/80 to-slate-900/90 rounded-3xl p-8 border border-slate-600/30 shadow-2xl shadow-slate-900/50">
                            {/* 소셜 회원가입 버튼들 */}
                            <div className="space-y-4 mb-6">
                                {socialButtons.map((social, index) => (
                                    <Grow
                                        key={social.name}
                                        in
                                        timeout={1000 + index * 200}
                                    >
                                        <div className="relative">
                                            {social.popular && (
                                                <Chip
                                                    label="인기"
                                                    size="small"
                                                    className="absolute -top-2 -right-2 z-10"
                                                    sx={{
                                                        bgcolor:
                                                            "rgba(34, 197, 94, 0.9)",
                                                        color: "white",
                                                        fontSize: "10px",
                                                        height: "20px",
                                                    }}
                                                />
                                            )}
                                            <Button
                                                onClick={() =>
                                                    handleSocialSignup(
                                                        social.name
                                                    )
                                                }
                                                disabled={!!isLoading}
                                                startIcon={
                                                    isLoading === social.name
                                                        ? null
                                                        : social.icon
                                                }
                                                fullWidth
                                                size="large"
                                                className="h-14"
                                                sx={{
                                                    bgcolor: social.color,
                                                    color:
                                                        social.textColor ||
                                                        "white",
                                                    border: social.border
                                                        ? "1px solid #e5e7eb"
                                                        : "none",
                                                    borderRadius: "12px",
                                                    textTransform: "none",
                                                    fontSize: "16px",
                                                    fontWeight: 600,
                                                    boxShadow:
                                                        "0 4px 14px 0 rgba(0,0,0,0.2)",
                                                    transition:
                                                        "all 0.2s ease-in-out",
                                                    "&:hover": {
                                                        bgcolor:
                                                            social.hoverColor ||
                                                            social.color,
                                                        transform:
                                                            "translateY(-2px)",
                                                        boxShadow:
                                                            "0 8px 25px 0 rgba(0,0,0,0.3)",
                                                    },
                                                    "&:active": {
                                                        transform:
                                                            "translateY(0px)",
                                                    },
                                                    "&:disabled": {
                                                        bgcolor: "#475569",
                                                        color: "#94a3b8",
                                                        transform: "none",
                                                    },
                                                }}
                                            >
                                                {isLoading === social.name ? (
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                                        <span>연결 중...</span>
                                                    </div>
                                                ) : (
                                                    social.label
                                                )}
                                            </Button>
                                        </div>
                                    </Grow>
                                ))}
                            </div>

                            {/* 구분선 */}
                            <Divider
                                className="my-6"
                                sx={{
                                    "&::before, &::after": {
                                        borderColor: "rgba(148, 163, 184, 0.3)",
                                    },
                                }}
                            >
                                <Chip
                                    label="또는"
                                    size="small"
                                    sx={{
                                        bgcolor: "transparent",
                                        color: "#94a3b8",
                                        fontSize: "14px",
                                    }}
                                />
                            </Divider>

                            {/* 이메일 회원가입 폼 */}
                            <Fade in timeout={1400}>
                                <div className="space-y-0 mt-6">
                                    <TextField
                                        fullWidth
                                        type="text"
                                        label="사용자명"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        placeholder="사용자명을 입력하세요"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <User
                                                        className="text-slate-400"
                                                        size={20}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                bgcolor:
                                                    "rgba(51, 65, 85, 0.6)",
                                                borderRadius: "12px",
                                                "& fieldset": {
                                                    borderColor:
                                                        "rgba(148, 163, 184, 0.3)",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor:
                                                        "rgba(148, 163, 184, 0.5)",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#6366f1",
                                                },
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: "#94a3b8",
                                            },
                                            "& .MuiInputBase-input": {
                                                color: "white",
                                            },
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        type="email"
                                        label="이메일"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="이메일을 입력하세요"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Mail
                                                        className="text-slate-400"
                                                        size={20}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                bgcolor:
                                                    "rgba(51, 65, 85, 0.6)",
                                                borderRadius: "12px",
                                                "& fieldset": {
                                                    borderColor:
                                                        "rgba(148, 163, 184, 0.3)",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor:
                                                        "rgba(148, 163, 184, 0.5)",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#6366f1",
                                                },
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: "#94a3b8",
                                            },
                                            "& .MuiInputBase-input": {
                                                color: "white",
                                            },
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        label="비밀번호"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="비밀번호를 입력하세요"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
                                                        edge="end"
                                                        sx={{
                                                            color: "#94a3b8",
                                                        }}
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff size={20} />
                                                        ) : (
                                                            <Eye size={20} />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            mt: 3,
                                            "& .MuiOutlinedInput-root": {
                                                bgcolor:
                                                    "rgba(51, 65, 85, 0.6)",
                                                borderRadius: "12px",
                                                "& fieldset": {
                                                    borderColor:
                                                        "rgba(148, 163, 184, 0.3)",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor:
                                                        "rgba(148, 163, 184, 0.5)",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#6366f1",
                                                },
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: "#94a3b8",
                                            },
                                            "& .MuiInputBase-input": {
                                                color: "white",
                                            },
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        label="비밀번호 확인"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        placeholder="비밀번호를 다시 입력하세요"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setShowConfirmPassword(
                                                                !showConfirmPassword
                                                            )
                                                        }
                                                        edge="end"
                                                        sx={{
                                                            color: "#94a3b8",
                                                        }}
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff size={20} />
                                                        ) : (
                                                            <Eye size={20} />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            mt: 3,
                                            "& .MuiOutlinedInput-root": {
                                                bgcolor:
                                                    "rgba(51, 65, 85, 0.6)",
                                                borderRadius: "12px",
                                                "& fieldset": {
                                                    borderColor:
                                                        "rgba(148, 163, 184, 0.3)",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor:
                                                        "rgba(148, 163, 184, 0.5)",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#6366f1",
                                                },
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: "#94a3b8",
                                            },
                                            "& .MuiInputBase-input": {
                                                color: "white",
                                            },
                                        }}
                                    />

                                    <Button
                                        onClick={handleEmailSignup}
                                        disabled={isLoading === "email"}
                                        fullWidth
                                        size="large"
                                        className="h-14"
                                        sx={{
                                            mt: 3,
                                            background:
                                                "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
                                            color: "white",
                                            borderRadius: "12px",
                                            textTransform: "none",
                                            fontSize: "16px",
                                            fontWeight: 600,
                                            boxShadow:
                                                "0 4px 14px 0 rgba(99, 102, 241, 0.4)",
                                            transition: "all 0.2s ease-in-out",
                                            "&:hover": {
                                                background:
                                                    "linear-gradient(135deg, #5b5cf1 0%, #7c3aed 50%, #c026d3 100%)",
                                                transform: "translateY(-2px)",
                                                boxShadow:
                                                    "0 8px 25px 0 rgba(99, 102, 241, 0.6)",
                                            },
                                            "&:active": {
                                                transform: "translateY(0px)",
                                            },
                                            "&:disabled": {
                                                background:
                                                    "linear-gradient(135deg, #475569 0%, #64748b 100%)",
                                                transform: "none",
                                            },
                                        }}
                                    >
                                        {isLoading === "email" ? (
                                            <div className="flex items-center space-x-3">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>가입 중...</span>
                                            </div>
                                        ) : (
                                            "이메일로 회원가입"
                                        )}
                                    </Button>
                                </div>
                            </Fade>

                            {/* 추가 옵션들 */}
                            <Fade in timeout={1600}>
                                <div className="mt-8 space-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<User size={16} />}
                                            onClick={() =>
                                                router.push("/auth/login")
                                            }
                                            sx={{
                                                borderColor:
                                                    "rgba(148, 163, 184, 0.3)",
                                                color: "#cbd5e1",
                                                textTransform: "none",
                                                fontSize: "14px",
                                                "&:hover": {
                                                    borderColor:
                                                        "rgba(148, 163, 184, 0.5)",
                                                    bgcolor:
                                                        "rgba(148, 163, 184, 0.1)",
                                                    color: "#fff",
                                                },
                                            }}
                                        >
                                            로그인으로 이동
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<Key size={16} />}
                                            onClick={() =>
                                                router.push(
                                                    "/auth/forgot_password"
                                                )
                                            }
                                            sx={{
                                                borderColor:
                                                    "rgba(148, 163, 184, 0.3)",
                                                color: "#cbd5e1",
                                                textTransform: "none",
                                                fontSize: "14px",
                                                "&:hover": {
                                                    borderColor:
                                                        "rgba(148, 163, 184, 0.5)",
                                                    bgcolor:
                                                        "rgba(148, 163, 184, 0.1)",
                                                    color: "#fff",
                                                },
                                            }}
                                        >
                                            비밀번호 재설정
                                        </Button>
                                    </div>

                                    <Button
                                        startIcon={<Gamepad2 size={18} />}
                                        fullWidth
                                        variant="outlined"
                                        className="h-12"
                                        sx={{
                                            borderColor:
                                                "rgba(148, 163, 184, 0.3)",
                                            color: "#cbd5e1",
                                            borderRadius: "12px",
                                            textTransform: "none",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            transition: "all 0.2s ease-in-out",
                                            "&:hover": {
                                                borderColor:
                                                    "rgba(148, 163, 184, 0.5)",
                                                bgcolor:
                                                    "rgba(148, 163, 184, 0.1)",
                                                color: "white",
                                                transform: "translateY(-1px)",
                                            },
                                        }}
                                    >
                                        게스트로 둘러보기
                                    </Button>
                                </div>
                            </Fade>
                        </div>
                    </Fade>

                    {/* 하단 안내 */}
                    <Fade in timeout={1800}>
                        <div className="text-center mt-6">
                            <p className="text-xs text-slate-400 leading-relaxed">
                                회원가입 시{" "}
                                <span className="text-indigo-400 font-medium">
                                    이용약관
                                </span>{" "}
                                및{" "}
                                <span className="text-indigo-400 font-medium">
                                    개인정보처리방침
                                </span>
                                에 동의한 것으로 간주됩니다
                            </p>
                        </div>
                    </Fade>
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

export default GameRankSignup;
