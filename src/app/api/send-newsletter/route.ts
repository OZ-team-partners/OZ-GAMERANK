import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

// Supabase 클라이언트 생성 (서버 사이드에서만 service role key 사용)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 이메일 발송 설정
const transporter = nodemailer.createTransport({
  service: "gmail", // Gmail 사용 (다른 서비스로 변경 가능)
  auth: {
    user: process.env.EMAIL_USER, // 환경변수에서 이메일 주소
    pass: process.env.EMAIL_PASSWORD, // 환경변수에서 앱 비밀번호
  },
});

// 뉴스레터 HTML 템플릿
const getNewsletterHTML = () => {
  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>렙업 소식통 - 제29호</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .container {
                background-color: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(135deg, #374151, #1f2937);
                color: white;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 2.5em;
                font-weight: bold;
            }
            .header p {
                margin: 10px 0 0 0;
                font-size: 1.1em;
                opacity: 0.9;
            }
            .content {
                padding: 30px;
            }
            .main-title {
                font-size: 1.8em;
                font-weight: bold;
                color: #1f2937;
                margin-bottom: 20px;
            }
            .article-content {
                font-size: 1.1em;
                line-height: 1.8;
                margin-bottom: 20px;
            }
            .highlight-box {
                background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
                border-left: 4px solid #6b7280;
                padding: 20px;
                margin: 20px 0;
                border-radius: 5px;
            }
            .highlight-box ul {
                margin: 10px 0;
                padding-left: 20px;
            }
            .highlight-box li {
                margin: 5px 0;
            }
            .footer {
                background-color: #f9fafb;
                padding: 20px;
                text-align: center;
                border-top: 1px solid #e5e7eb;
            }
            .footer p {
                margin: 0;
                color: #6b7280;
                font-size: 0.9em;
            }
            .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #374151, #1f2937);
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>렙업 소식통</h1>
                <p>게임랭킹 사이트 공식 뉴스레터</p>
                <p style="font-size: 0.9em; margin-top: 10px;">2025년 8월 11일 - 제29호</p>
            </div>
            
            <div class="content">
                <h2 class="main-title">이번 주 플레이 스테이션 진영 초기대작 출시!</h2>
                
                <div class="article-content">
                    <p>호라이즌 제로 던 시리즈의 새 시리즈 호라이즌 제로 던3을 출시한다고 게릴라 게임즈가 공식 발표를 했습니다.</p>
                    
                    <div class="highlight-box">
                        <p style="font-weight: bold; margin-bottom: 10px;">🏆 이번 호 주요 내용</p>
                        <ul>
                            <li>• 레벨 업 가이드</li>
                            <li>• 아이템 위치 안내</li>
                            <li>• 보스 공략법</li>
                        </ul>
                    </div>
                    
                    <p>다음 뉴스레터도 알찬 소식과 공략으로 꽉 채워서 돌아오겠습니다!</p>
                </div>
                
                <div style="text-align: center;">
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/blog/newsletter" class="cta-button">
                        전체 기사 보기
                    </a>
                </div>
            </div>
            
            <div class="footer">
                <p>© 2025 게임랭킹 모든 권리 보유.</p>
                <p>이 이메일을 더 이상 받고 싶지 않으시면 <a href="#">구독 해지</a>를 클릭해주세요.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
  try {
    // 요청 본문에서 발송 옵션 확인
    const body = await request.json();
    const { sendToAll = false, testEmail } = body;

    let emails: string[] = [];

    if (testEmail) {
      // 테스트 이메일 발송
      emails = [testEmail];
    } else if (sendToAll) {
      // 모든 사용자에게 발송
      const { data: users, error } = await supabase.auth.admin.listUsers();

      if (error) {
        console.error("사용자 목록 조회 오류:", error);
        return NextResponse.json(
          { error: "사용자 목록을 가져올 수 없습니다." },
          { status: 500 }
        );
      }

      emails = users
        .map((user: { email?: string }) => user.email)
        .filter((email: string) => email);
    } else {
      return NextResponse.json(
        { error: "sendToAll 또는 testEmail 중 하나를 제공해야 합니다." },
        { status: 400 }
      );
    }

    if (emails.length === 0) {
      return NextResponse.json(
        { error: "발송할 이메일이 없습니다." },
        { status: 400 }
      );
    }

    // 이메일 발송
    const results = [];
    for (const email of emails) {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "렙업 소식통 - 제29호 | 게임랭킹 공식 뉴스레터",
          html: getNewsletterHTML(),
        };

        const result = await transporter.sendMail(mailOptions);
        results.push({ email, success: true, messageId: result.messageId });
        console.log(`이메일 발송 성공: ${email}`);
      } catch (error) {
        console.error(`이메일 발송 실패 (${email}):`, error);
        results.push({
          email,
          success: false,
          error: (error as Error).message,
        });
      }
    }

    const successCount = results.filter((r) => r.success).length;
    const failCount = results.filter((r) => !r.success).length;

    return NextResponse.json({
      message: `뉴스레터 발송 완료: 성공 ${successCount}건, 실패 ${failCount}건`,
      results,
      totalSent: successCount,
      totalFailed: failCount,
    });
  } catch (error) {
    console.error("뉴스레터 발송 오류:", error);
    return NextResponse.json(
      { error: "뉴스레터 발송 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
