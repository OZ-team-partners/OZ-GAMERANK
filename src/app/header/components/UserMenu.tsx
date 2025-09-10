"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { User, ChevronDown, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/contexts/AuthContext";
import { supabase } from "@/shared/lib/supabase";
import { useDropdown } from "../hooks/useDropdown";
import { dropdownStyles, buttonVariants } from "../styles/dropdownStyles";
import { UserProfile } from "../types";

const UserMenu = () => {
  const router = useRouter();
  const profileDropdown = useDropdown();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { user, loading, signOut } = useAuth();

  // 사용자 프로필 정보 로드
  const loadUserProfile = useCallback(async () => {
    if (user?.email) {
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();
      
      if (profile) {
        setUserProfile(profile);
      }
    }
  }, [user?.email]);

  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      router.push('/');
      profileDropdown.close();
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  }, [signOut, router, profileDropdown]);

  const handleProfileClick = useCallback(() => {
    router.push('/profile');
    profileDropdown.close();
  }, [router, profileDropdown]);

  if (loading) {
    return (
      <div className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-slate-400 rounded-lg text-sm">
        <User size={16} />
        <span>로딩중...</span>
      </div>
    );
  }

  if (user) {
    return (
      <div className="relative" data-dropdown>
        <button
          onClick={profileDropdown.toggle}
          aria-label="프로필 메뉴 열기"
          aria-expanded={profileDropdown.isOpen}
          className={`${dropdownStyles.buttonBase} ${buttonVariants.primary} user-menu-button`}
        >
          {userProfile?.avatar_url ? (
            <Image 
              src={userProfile.avatar_url} 
              alt="프로필" 
              width={16}
              height={16}
              className="w-4 h-4 rounded-full object-cover border border-white/20"
            />
          ) : (
            <User size={16} />
          )}
          <span className="user-menu-label">프로필</span>
          <ChevronDown
            size={14}
            className={`${dropdownStyles.chevron} user-menu-chevron ${
              profileDropdown.isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {profileDropdown.isOpen && (
          <div
            className="absolute top-full right-0 mt-3 w-56 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
            data-dropdown
          >
            <div className={dropdownStyles.content}>
              <div className={dropdownStyles.padding}>
                <div className="px-4 py-3 border-b border-slate-200/60">
                  <div className="flex items-center space-x-3">
                    {userProfile?.avatar_url ? (
                      <Image 
                        src={userProfile.avatar_url} 
                        alt="프로필" 
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {(userProfile?.username || user.email)?.[0]?.toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {userProfile?.username || user.user_metadata?.username || '사용자'}
                      </p>
                      <p className="text-xs text-slate-600 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleProfileClick}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors rounded-xl"
                >
                  <Settings size={16} className="text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">프로필 설정</span>
                </button>
                
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors rounded-xl"
                >
                  <LogOut size={16} className="text-red-500" />
                  <span className="text-sm font-medium text-red-700">로그아웃</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => router.push("/auth/login")}
      aria-label="로그인 페이지로 이동"
      className={`${dropdownStyles.buttonBase} ${buttonVariants.primary} user-menu-button`}
    >
      <User size={16} />
      <span className="user-menu-label">로그인</span>
    </button>
  );
};

export default UserMenu;