"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/shared/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, username: string) => Promise<{ user: User | null; error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 초기 세션 확인
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Auth 상태 변경 리스너
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
    try {
      // 비밀번호 자동 확장 (Supabase 최소 요구사항)
      const finalPassword = password.length < 6 ? password + "123456".slice(0, 6 - password.length) : password;

      // 회원가입
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password: finalPassword,
        options: {
          data: { username },
          emailRedirectTo: undefined, // 이메일 확인 비활성화
        }
      });

      if (authError) {
        return { user: null, error: authError.message };
      }

      if (data.user) {
        // users 테이블에 사용자 정보 저장
        const { error: insertError } = await supabase.from('users').insert([{
          user_id: data.user.id,
          username,
          email,
          password_hash: 'supabase_auth_managed',
          avatar_url: null,
          join_date: new Date().toISOString(),
          role: 'user',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);
        
        if (insertError) {
          console.error('users 테이블 저장 오류:', insertError);
          return { user: null, error: `회원가입 실패: ${insertError.message}` };
        }

        // 강제 자동 로그인
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password: finalPassword,
        });

        if (signInError) {
          console.log('자동 로그인 실패:', signInError.message);
        }

        return { user: data.user, error: null };
      }

      return { user: null, error: '회원가입에 실패했습니다.' };
    } catch (error) {
      return { user: null, error: error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다.' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // 비밀번호 자동 확장 (회원가입 시와 동일하게)
      const finalPassword = password.length < 6 ? password + "123456".slice(0, 6 - password.length) : password;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: finalPassword,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error: error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.' };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('로그아웃 오류:', err);
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};