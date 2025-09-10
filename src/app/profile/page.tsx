"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Button,
    TextField,
    Alert,
    Card,
    CardContent,
    Avatar,
    Divider,
    Chip,
    Fade,
    CircularProgress,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import {
    User,
    Mail,
    Calendar,
    Shield,
    Camera,
    Save,
    ArrowLeft,
} from "lucide-react";
import { supabase } from "@/shared/lib/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

const ProfilePage = () => {
    const router = useRouter();
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [userProfile, setUserProfile] = useState<{id: string, username?: string, avatar_url?: string, email: string, role?: string} | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    // 폼 상태
    const [username, setUsername] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [showAvatarDialog, setShowAvatarDialog] = useState(false);
    const [tempAvatarUrl, setTempAvatarUrl] = useState("");

    // 사용자 정보 로드
    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                // 현재 사용자 확인
                if (!supabase) {
                    router.push('/auth/login');
                    return;
                }
                
                const { data: { session } } = await supabase.auth.getSession();
                
                if (!session?.user) {
                    router.push('/auth/login');
                    return;
                }

                setUser(session.user);

                // users 테이블에서 프로필 정보 가져오기
                const { data: profile, error: profileError } = await supabase
                    .from('users')
                    .select('*')
                    .eq('email', session.user.email)
                    .single();

                if (profileError && profileError.code !== 'PGRST116') {
                    console.error('프로필 로드 오류:', profileError);
                }

                if (profile) {
                    setUserProfile(profile);
                    setUsername(profile.username || '');
                    setAvatarUrl(profile.avatar_url || '');
                } else {
                    // 메타데이터에서 초기값 설정
                    setUsername(session.user.user_metadata?.username || '');
                    setAvatarUrl(session.user.user_metadata?.avatar_url || '');
                }
            } catch (err) {
                console.error('사용자 정보 로드 오류:', err);
                setError('사용자 정보를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        loadUserProfile();
    }, [router]);

    // 프로필 업데이트
    const handleSaveProfile = async () => {
        setError("");
        setSaving(true);

        try {
            if (!user || !supabase) return;

            // users 테이블 업데이트 (password_hash 제외)
            const { error: updateError } = await supabase
                .from('users')
                .update({
                    username: username,
                    avatar_url: avatarUrl,
                })
                .eq('email', user.email);

            if (updateError) {
                setError(updateError.message);
                return;
            }

            setSuccess('프로필이 성공적으로 업데이트되었습니다!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : '프로필 업데이트 중 오류가 발생했습니다.');
        } finally {
            setSaving(false);
        }
    };

    // 아바타 변경 다이얼로그 열기
    const handleAvatarClick = () => {
        setTempAvatarUrl(avatarUrl);
        setShowAvatarDialog(true);
    };

    // 아바타 URL 적용
    const handleAvatarSave = () => {
        setAvatarUrl(tempAvatarUrl);
        setShowAvatarDialog(false);
    };

    // 아바타 다이얼로그 취소
    const handleAvatarCancel = () => {
        setTempAvatarUrl("");
        setShowAvatarDialog(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center">
                <div className="flex items-center space-x-3 text-white">
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                    <span>프로필 로딩중...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* 뒤로 가기 버튼 */}
                <Button
                    onClick={() => router.back()}
                    startIcon={<ArrowLeft size={16} />}
                    sx={{
                        color: 'white',
                        mb: 3,
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }
                    }}
                >
                    뒤로 가기
                </Button>

                {/* 알림 메시지 */}
                {error && (
                    <Fade in timeout={300}>
                        <Alert 
                            severity="error" 
                            onClose={() => setError("")}
                            sx={{ mb: 3 }}
                        >
                            {error}
                        </Alert>
                    </Fade>
                )}

                {success && (
                    <Fade in timeout={300}>
                        <Alert 
                            severity="success" 
                            onClose={() => setSuccess("")}
                            sx={{ mb: 3 }}
                        >
                            {success}
                        </Alert>
                    </Fade>
                )}

                <Card 
                    sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.95)', 
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">
                                프로필 설정
                            </h1>
                            <p className="text-slate-600">
                                게임 랭킹 사이트에서 사용할 프로필을 설정하세요
                            </p>
                        </div>

                        {/* 메인 컨텐츠 레이아웃 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            {/* 프로필 이미지 섹션 */}
                            <div className="flex flex-col items-center justify-center">
                                <div className="relative">
                                    <Avatar
                                        src={avatarUrl}
                                        sx={{ 
                                            width: 180, 
                                            height: 180,
                                            bgcolor: 'indigo.500',
                                            fontSize: '3rem'
                                        }}
                                    >
                                        {username ? username[0].toUpperCase() : user?.email?.[0].toUpperCase()}
                                    </Avatar>
                                    <Button
                                        size="small"
                                        onClick={handleAvatarClick}
                                        sx={{
                                            position: 'absolute',
                                            bottom: 8,
                                            right: 8,
                                            minWidth: 48,
                                            height: 48,
                                            borderRadius: '50%',
                                            bgcolor: 'indigo.600',
                                            '&:hover': { bgcolor: 'indigo.700' },
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                                        }}
                                    >
                                        <Camera size={20} />
                                    </Button>
                                </div>
                            </div>

                            {/* 정보 섹션 */}
                            <div className="space-y-8">
                                {/* 기본 정보 */}
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                                        <User size={20} className="mr-2 text-indigo-600" />
                                        기본 정보
                                    </h3>
                                    
                                    <div>
                                        <TextField
                                            fullWidth
                                            label="닉네임"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="닉네임을 입력하세요"
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <User size={20} className="text-slate-500" />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    transition: "none",
                                                },
                                                "& .MuiInputLabel-root": {
                                                    transition: "none",
                                                },
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* 계정 정보 */}
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                                        <Mail size={20} className="mr-2 text-indigo-600" />
                                        계정 정보
                                    </h3>
                                    
                                    <div className="space-y-6">
                                        <TextField
                                            fullWidth
                                            label="이메일"
                                            value={user?.email || ''}
                                            disabled
                                            helperText="이메일은 변경할 수 없습니다"
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Mail size={20} className="text-slate-500" />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    transition: "none",
                                                },
                                                "& .MuiInputLabel-root": {
                                                    transition: "none",
                                                },
                                            }}
                                        />
                                        
                                        <div className="flex items-center space-x-2">
                                            <Calendar size={16} className="text-slate-500" />
                                            <span className="text-sm text-slate-600">
                                                가입일: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Shield size={16} className="text-slate-500" />
                                            <Chip 
                                                label={userProfile?.role || 'user'} 
                                                size="small"
                                                color={userProfile?.role === 'admin' ? 'error' : 'default'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Divider sx={{ my: 3 }} />

                        {/* 저장 버튼 */}
                        <div className="flex justify-end">
                            <Button
                                onClick={handleSaveProfile}
                                disabled={saving}
                                startIcon={saving ? <CircularProgress size={16} /> : <Save size={16} />}
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: 'indigo.600',
                                    '&:hover': { bgcolor: 'indigo.700' },
                                    px: 4,
                                    py: 1.5
                                }}
                            >
                                {saving ? '저장 중...' : '프로필 저장'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* 아바타 변경 다이얼로그 */}
                <Dialog 
                    open={showAvatarDialog} 
                    onClose={handleAvatarCancel}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>프로필 이미지 변경</DialogTitle>
                    <DialogContent>
                        <div className="flex flex-col items-center space-y-4 pt-4">
                            {/* 미리보기 */}
                            <Avatar
                                src={tempAvatarUrl}
                                sx={{ 
                                    width: 100, 
                                    height: 100,
                                    bgcolor: 'indigo.500',
                                    fontSize: '2rem'
                                }}
                            >
                                {username ? username[0].toUpperCase() : user?.email?.[0].toUpperCase()}
                            </Avatar>
                            
                            {/* URL 입력 */}
                            <TextField
                                fullWidth
                                label="이미지 URL"
                                value={tempAvatarUrl}
                                onChange={(e) => setTempAvatarUrl(e.target.value)}
                                placeholder="프로필 이미지 URL을 입력하세요"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Camera size={20} className="text-slate-500" />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        transition: "none",
                                    },
                                    "& .MuiInputLabel-root": {
                                        transition: "none",
                                    },
                                }}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAvatarCancel}>취소</Button>
                        <Button 
                            onClick={handleAvatarSave} 
                            variant="contained"
                            sx={{
                                bgcolor: 'indigo.600',
                                '&:hover': { bgcolor: 'indigo.700' }
                            }}
                        >
                            적용
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default ProfilePage;