import { useState, useEffect } from 'react';
import { supabase } from '@/shared/lib/supabase';

export const useSupabaseConnection = () => {
  const [connectionStatus, setConnectionStatus] = useState<{
    isConnected: boolean;
    isLoading: boolean;
    error: string | null;
  }>({
    isConnected: false,
    isLoading: true,
    error: null,
  });

  const testConnection = async () => {
    try {
      setConnectionStatus(prev => ({ ...prev, isLoading: true, error: null }));

      if (!supabase) {
        throw new Error("Supabase 클라이언트가 초기화되지 않았습니다.");
      }
      
      const { data, error } = await supabase
        .from("test")
        .select("*")
        .limit(1);

      if (error) {
        throw error;
      }

      console.log("Supabase 연결 성공!", data);
      setConnectionStatus({
        isConnected: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "연결 실패";
      console.log("Supabase 테스트 중 오류:", errorMessage);
      
      setConnectionStatus({
        isConnected: false,
        isLoading: false,
        error: errorMessage,
      });
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  const retryConnection = () => {
    testConnection();
  };

  return {
    ...connectionStatus,
    retryConnection,
  };
};