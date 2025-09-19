import { useState, useCallback } from "react";
import {
  NewsletterService,
  NewsletterSendResult,
} from "@/lib/newsletterService";

export interface UseNewsletterReturn {
  isLoading: boolean;
  result: NewsletterSendResult | null;
  sendTestEmail: (email: string) => Promise<void>;
  sendToAllUsers: () => Promise<void>;
  clearResult: () => void;
  userCount: number;
  emailList: string[];
  refreshUserData: () => Promise<void>;
}

export function useNewsletter(): UseNewsletterReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<NewsletterSendResult | null>(null);
  const [userCount, setUserCount] = useState(0);
  const [emailList, setEmailList] = useState<string[]>([]);

  const sendTestEmail = useCallback(async (email: string) => {
    if (!email.trim()) {
      setResult({
        success: false,
        message: "이메일 주소를 입력해주세요.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await NewsletterService.sendTestEmail(email);
      setResult(result);
    } catch (_error) {
      setResult({
        success: false,
        message: "테스트 이메일 발송 중 오류가 발생했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendToAllUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await NewsletterService.sendToAllUsers();
      setResult(result);

      // 발송 후 사용자 데이터 새로고침
      await refreshUserData();
    } catch (_error) {
      setResult({
        success: false,
        message: "뉴스레터 발송 중 오류가 발생했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshUserData = useCallback(async () => {
    try {
      const [count, emails] = await Promise.all([
        NewsletterService.getUserCount(),
        NewsletterService.getEmailList(),
      ]);

      setUserCount(count);
      setEmailList(emails);
    } catch (error) {
      console.error("사용자 데이터 새로고침 오류:", error);
    }
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
  }, []);

  return {
    isLoading,
    result,
    sendTestEmail,
    sendToAllUsers,
    clearResult,
    userCount,
    emailList,
    refreshUserData,
  };
}
