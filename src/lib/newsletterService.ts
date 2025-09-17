import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 생성 (클라이언트 사이드에서 anon key 사용)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface NewsletterSendResult {
  success: boolean;
  message: string;
  totalSent?: number;
  totalFailed?: number;
  results?: Array<{
    email: string;
    success: boolean;
    messageId?: string;
    error?: string;
  }>;
}

export class NewsletterService {
  /**
   * 테스트 이메일 발송
   */
  static async sendTestEmail(testEmail: string): Promise<NewsletterSendResult> {
    try {
      const response = await fetch("/api/send-newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ testEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "테스트 이메일 발송 실패");
      }

      return {
        success: true,
        message: "테스트 이메일이 성공적으로 발송되었습니다.",
        ...data,
      };
    } catch (error) {
      console.error("테스트 이메일 발송 오류:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "테스트 이메일 발송 중 오류가 발생했습니다.",
      };
    }
  }

  /**
   * 모든 사용자에게 뉴스레터 발송
   */
  static async sendToAllUsers(): Promise<NewsletterSendResult> {
    try {
      const response = await fetch("/api/send-newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sendToAll: true }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "뉴스레터 발송 실패");
      }

      return {
        success: true,
        message: `뉴스레터 발송 완료: 성공 ${data.totalSent}건, 실패 ${data.totalFailed}건`,
        ...data,
      };
    } catch (error) {
      console.error("뉴스레터 발송 오류:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "뉴스레터 발송 중 오류가 발생했습니다.",
      };
    }
  }

  /**
   * 등록된 사용자 수 조회
   */
  static async getUserCount(): Promise<number> {
    try {
      const response = await fetch("/api/get-user-stats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("사용자 수 조회 오류:", response.statusText);
        return 0;
      }

      const data = await response.json();
      return data.userCount || 0;
    } catch (error) {
      console.error("사용자 수 조회 오류:", error);
      return 0;
    }
  }

  /**
   * 이메일 주소 목록 조회 (이메일이 있는 사용자만)
   */
  static async getEmailList(): Promise<string[]> {
    try {
      const response = await fetch("/api/get-user-stats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("이메일 목록 조회 오류:", response.statusText);
        return [];
      }

      const data = await response.json();
      return data.emailList || [];
    } catch (error) {
      console.error("이메일 목록 조회 오류:", error);
      return [];
    }
  }
}
