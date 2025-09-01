"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Alert, Slide } from "@mui/material";
import { Mail, User, UserPlus, Lock, ShieldCheck } from "lucide-react";
import { useAuth } from "@/shared/contexts/AuthContext";
import AuthLayout from "../components/AuthLayout";
import AuthHeader from "../components/AuthHeader";
import AuthInput from "../components/AuthInput";

const GameRankSignup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const { signUp } = useAuth();

  const handleEmailSignup = async () => {
    setError("");

    // 기본 검증
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("모든 필드를 입력해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);

    try {
      const { user, error } = await signUp(email, password, username);

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
      setError("회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* 알림 메시지들 */}
      <Slide direction="down" in={showSuccess} mountOnEnter unmountOnExit>
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Alert severity="success" className="shadow-2xl backdrop-blur-sm">
            회원가입 완료! 메인페이지로 이동합니다 🎮
          </Alert>
        </div>
      </Slide>

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
        chipLabel="안전한 회원가입"
      />

      {/* 회원가입 폼 */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-slate-800/90 via-slate-800/80 to-slate-900/90 rounded-3xl p-8 border border-slate-600/30 shadow-2xl">
        <div className="space-y-4">
          <AuthInput
            type="text"
            label="닉네임"
            placeholder="닉네임을 입력하세요"
            value={username}
            onChange={setUsername}
            icon={<User className="text-slate-400" size={20} />}
          />

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

          <AuthInput
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={setConfirmPassword}
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            icon={<ShieldCheck className="text-slate-400" size={20} />}
          />

          <Button
            onClick={handleEmailSignup}
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
            {isLoading ? "가입 중..." : "회원가입"}
          </Button>

          <div className="mt-6 text-center">
            <Button
              variant="outlined"
              size="small"
              startIcon={<UserPlus size={16} />}
              onClick={() => router.push("/auth/login")}
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
              로그인으로 이동
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default GameRankSignup;