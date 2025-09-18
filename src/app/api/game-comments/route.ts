import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET - 특정 게임의 댓글 목록 조회
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const game_id = searchParams.get("game_id");

  if (!game_id) {
    return NextResponse.json({ error: "game_id is required" }, { status: 400 });
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookieStore = await cookies();
          return cookieStore.get(name)?.value;
        },
        async set(name: string, value: string, options: CookieOptions) {
          const cookieStore = await cookies();
          cookieStore.set(name, value, options);
        },
        async remove(name: string, options: CookieOptions) {
          const cookieStore = await cookies();
          cookieStore.set(name, "", { ...options, maxAge: 0 });
        },
      },
    }
  );

  // 이제 users 테이블 조인 없이 댓글만 조회
  const { data, error } = await supabase
    .from("game_info_user_comment")
    .select("id, content, rating, created_at, user_id, username")
    .eq("game_id", game_id)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 데이터 구조를 기존과 호환되도록 변환
  const formattedData = data.map((comment) => ({
    id: comment.id,
    content: comment.content,
    rating: comment.rating,
    created_at: comment.created_at,
    users: {
      id: comment.user_id,
      username: comment.username,
    },
  }));

  return NextResponse.json(formattedData);
}

// POST - 새 댓글 작성
export async function POST(request: Request) {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          async get(name: string) {
            const cookieStore = await cookies();
            return cookieStore.get(name)?.value;
          },
          async set(name: string, value: string, options: CookieOptions) {
            const cookieStore = await cookies();
            cookieStore.set(name, value, options);
          },
          async remove(name: string, options: CookieOptions) {
            const cookieStore = await cookies();
            cookieStore.set(name, "", { ...options, maxAge: 0 });
          },
        },
      }
    );

    // Authorization 헤더에서 토큰 확인
    const authHeader = request.headers.get("Authorization");
    let session = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      console.log(
        "Token from Authorization header:",
        token.substring(0, 20) + "..."
      );

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser(token);

      if (userError) {
        console.error("Token validation error:", userError);
      } else if (user) {
        session = {
          user,
          access_token: token,
        };
        console.log("Valid token found, user:", user.id);
      }
    }

    if (!session) {
      const {
        data: { session: cookieSession },
        error: sessionError,
      } = await supabase.auth.getSession();

      console.log("Session check:", {
        hasSession: !!cookieSession,
        userId: cookieSession?.user?.id,
        sessionError: sessionError?.message,
      });

      if (sessionError) {
        console.error("Session error:", sessionError);
        return NextResponse.json(
          {
            error: `Session error: ${sessionError.message}`,
          },
          { status: 401 }
        );
      }

      session = cookieSession;
    }

    if (!session) {
      console.log("No session found");
      return NextResponse.json(
        {
          error: "Unauthorized - No valid session found",
        },
        { status: 401 }
      );
    }

    const { game_id, content, rating } = await request.json();

    if (!game_id || !content || rating === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user_id = session.user.id;

    // 사용자명 조회 - RLS 정책을 우회하기 위해 서비스 역할 키 사용
    let username = "사용자";

    try {
      // 현재 세션의 사용자 정보에서 username 가져오기
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("username")
        .eq("id", user_id)
        .single();

      if (!userError && userData?.username) {
        username = userData.username;
      } else {
        console.log(
          "Could not fetch username from users table:",
          userError?.message
        );
        // 대안: auth.users에서 이메일의 @ 앞부분을 사용
        const email = session.user.email;
        if (email) {
          username = email.split("@")[0];
        }
      }
    } catch (error) {
      console.error("Error fetching username:", error);
      // 대안: 이메일에서 사용자명 추출
      const email = session.user.email;
      if (email) {
        username = email.split("@")[0];
      }
    }

    console.log("Creating comment for user:", user_id, "username:", username);

    const { data, error } = await supabase
      .from("game_info_user_comment")
      .insert([
        {
          user_id,
          game_id,
          content,
          rating,
          username,
        },
      ])
      .select();

    if (error) {
      console.error("Error creating comment:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Comment created successfully:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error in POST:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// PUT - 댓글 수정
export async function PUT(request: Request) {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          async get(name: string) {
            const cookieStore = await cookies();
            return cookieStore.get(name)?.value;
          },
          async set(name: string, value: string, options: CookieOptions) {
            const cookieStore = await cookies();
            cookieStore.set(name, value, options);
          },
          async remove(name: string, options: CookieOptions) {
            const cookieStore = await cookies();
            cookieStore.set(name, "", { ...options, maxAge: 0 });
          },
        },
      }
    );

    // Authorization 헤더에서 토큰 확인 (POST와 동일한 방식)
    const authHeader = request.headers.get("Authorization");
    let session = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      console.log(
        "Token from Authorization header:",
        token.substring(0, 20) + "..."
      );

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser(token);

      if (userError) {
        console.error("Token validation error:", userError);
      } else if (user) {
        session = {
          user,
          access_token: token,
        };
        console.log("Valid token found, user:", user.id);
      }
    }

    // 토큰이 없거나 유효하지 않으면 쿠키에서 세션 확인
    if (!session) {
      const {
        data: { session: cookieSession },
        error: sessionError,
      } = await supabase.auth.getSession();

      console.log("Session check:", {
        hasSession: !!cookieSession,
        userId: cookieSession?.user?.id,
        sessionError: sessionError?.message,
      });

      if (sessionError) {
        console.error("Session error:", sessionError);
        return NextResponse.json(
          {
            error: `Session error: ${sessionError.message}`,
          },
          { status: 401 }
        );
      }

      session = cookieSession;
    }

    if (!session) {
      console.log("No session found");
      return NextResponse.json(
        {
          error: "Unauthorized - No valid session found",
        },
        { status: 401 }
      );
    }

    const { comment_id, content, rating } = await request.json();

    if (!comment_id || !content || rating === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user_id = session.user.id;

    // 댓글 작성자 확인
    const { data: comment, error: commentError } = await supabase
      .from("game_info_user_comment")
      .select("user_id")
      .eq("id", comment_id)
      .eq("is_deleted", false)
      .single();

    if (commentError || !comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.user_id !== user_id) {
      return NextResponse.json(
        { error: "Unauthorized - You can only edit your own comments" },
        { status: 403 }
      );
    }

    // 댓글 수정
    const { data, error } = await supabase
      .from("game_info_user_comment")
      .update({ content, rating, updated_at: new Date().toISOString() })
      .eq("id", comment_id)
      .eq("user_id", user_id)
      .select();

    if (error) {
      console.error("Error updating comment:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error in PUT:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// DELETE - 댓글 삭제 (논리적 삭제)
export async function DELETE(request: Request) {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          async get(name: string) {
            const cookieStore = await cookies();
            return cookieStore.get(name)?.value;
          },
          async set(name: string, value: string, options: CookieOptions) {
            const cookieStore = await cookies();
            cookieStore.set(name, value, options);
          },
          async remove(name: string, options: CookieOptions) {
            const cookieStore = await cookies();
            cookieStore.set(name, "", { ...options, maxAge: 0 });
          },
        },
      }
    );

    // Authorization 헤더에서 토큰 확인 (POST와 동일한 방식)
    const authHeader = request.headers.get("Authorization");
    let session = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      console.log(
        "Token from Authorization header:",
        token.substring(0, 20) + "..."
      );

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser(token);

      if (userError) {
        console.error("Token validation error:", userError);
      } else if (user) {
        session = {
          user,
          access_token: token,
        };
        console.log("Valid token found, user:", user.id);
      }
    }

    // 토큰이 없거나 유효하지 않으면 쿠키에서 세션 확인
    if (!session) {
      const {
        data: { session: cookieSession },
        error: sessionError,
      } = await supabase.auth.getSession();

      console.log("Session check:", {
        hasSession: !!cookieSession,
        userId: cookieSession?.user?.id,
        sessionError: sessionError?.message,
      });

      if (sessionError) {
        console.error("Session error:", sessionError);
        return NextResponse.json(
          {
            error: `Session error: ${sessionError.message}`,
          },
          { status: 401 }
        );
      }

      session = cookieSession;
    }

    if (!session) {
      console.log("No session found");
      return NextResponse.json(
        {
          error: "Unauthorized - No valid session found",
        },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const comment_id = searchParams.get("comment_id");

    if (!comment_id) {
      return NextResponse.json(
        { error: "comment_id is required" },
        { status: 400 }
      );
    }

    const user_id = session.user.id;

    // 댓글 작성자 확인
    const { data: comment, error: commentError } = await supabase
      .from("game_info_user_comment")
      .select("user_id")
      .eq("id", comment_id)
      .eq("is_deleted", false)
      .single();

    if (commentError || !comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.user_id !== user_id) {
      return NextResponse.json(
        { error: "Unauthorized - You can only delete your own comments" },
        { status: 403 }
      );
    }

    // 댓글 논리적 삭제
    const { error } = await supabase
      .from("game_info_user_comment")
      .update({ is_deleted: true, updated_at: new Date().toISOString() })
      .eq("id", comment_id)
      .eq("user_id", user_id)
      .select();

    if (error) {
      console.error("Error deleting comment:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Unexpected error in DELETE:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
