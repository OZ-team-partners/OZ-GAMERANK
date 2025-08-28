"use client";

import React, { useState, useEffect } from "react";
import { User, ChevronDown, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

const UserMenu = () => {
  const router = useRouter();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { user, loading, signOut } = useAuth();

  // 사용자 프로필 정보 로드
  useEffect(() => {
    const loadUserProfile = async () => {
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
    };

    loadUserProfile();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
      setShowProfileDropdown(false);
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };

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
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          aria-label="프로필 메뉴 열기"
          className="
            flex items-center space-x-2 px-4 py-2 
            bg-gradient-to-r from-indigo-600 to-blue-600 
            text-white rounded-lg font-semibold text-sm
            hover:from-indigo-700 hover:to-blue-700
            transition-all duration-150 ease-out
            shadow-md hover:shadow-lg hover:shadow-indigo-500/15
            cursor-pointer backdrop-blur-sm
          "
        >
          {userProfile?.avatar_url ? (
            <img 
              src={userProfile.avatar_url} 
              alt="프로필" 
              className="w-4 h-4 rounded-full object-cover border border-white/20"
            />
          ) : (
            <User size={16} />
          )}
          <span>프로필</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-150 ${
              showProfileDropdown ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {showProfileDropdown && (
          <div
            className="absolute top-full right-0 mt-3 w-56 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
            data-dropdown
          >
            <div className="bg-white/98 backdrop-blur-xl border border-slate-200/40 rounded-2xl shadow-lg overflow-hidden ring-1 ring-slate-900/5">
              <div className="p-2">
                <div className="px-4 py-3 border-b border-slate-200/60">
                  <div className="flex items-center space-x-3">
                    {userProfile?.avatar_url ? (
                      <img 
                        src={userProfile.avatar_url} 
                        alt="프로필" 
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
                  onClick={() => {
                    router.push('/profile');
                    setShowProfileDropdown(false);
                  }}
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
      className="
        flex items-center space-x-2 px-4 py-2 
        bg-gradient-to-r from-indigo-600 to-blue-600 
        text-white rounded-lg font-semibold text-sm
        hover:from-indigo-700 hover:to-blue-700
        transition-all duration-150 ease-out
        shadow-md hover:shadow-lg hover:shadow-indigo-500/15
        cursor-pointer backdrop-blur-sm
      "
    >
      <User size={16} />
      <span>로그인</span>
    </button>
  );
};

export default UserMenu;