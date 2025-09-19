import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 생성 (서버 사이드에서 service role key 사용)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    // 모든 사용자 조회
    const { data: users, error } = await supabase.auth.admin.listUsers();

    if (error) {
      console.error("사용자 목록 조회 오류:", error);
      return NextResponse.json(
        { error: "사용자 목록을 가져올 수 없습니다." },
        { status: 500 }
      );
    }

    // 이메일이 있는 사용자만 필터링
    const emailList = users
      .map((user: { email?: string }) => user.email)
      .filter((email): email is string => email && email.trim() !== "");

    return NextResponse.json({
      userCount: users.length,
      emailList,
      totalEmails: emailList.length,
    });
  } catch (error) {
    console.error("사용자 통계 조회 오류:", error);
    return NextResponse.json(
      { error: "사용자 통계 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
