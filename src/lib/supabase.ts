import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Only create client if both environment variables are available
// During build time, these might not be available yet
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
        },
      })
    : (null as unknown as ReturnType<typeof createClient>);

// 서비스 역할 키를 사용하는 클라이언트 (서버 사이드에서만 사용)
export const supabaseAdmin =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : (null as unknown as ReturnType<typeof createClient>);

// Helper functions for community features
export const communityApi = {
  // Posts
  async getPosts(filters?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    if (!supabase) {
      console.warn("Supabase client is not initialized");
      return {
        data: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      };
    }
    let query = supabase
      .from("posts")
      .select(
        `
        *,
        author:profiles(id, username, avatar_url)
      `
      )
      .eq("is_deleted", false)
      .order("created_at", { ascending: false });

    if (filters?.category && filters.category !== "온라인게임") {
      query = query.eq("category", filters.category);
    }

    if (filters?.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`
      );
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query.range(from, to);

    if (error) throw error;

    return {
      data: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    };
  },

  async getPostById(id: number) {
    if (!supabase) {
      console.warn("Supabase client is not initialized");
      throw new Error("Supabase client is not initialized");
    }
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        author:profiles(id, username, avatar_url, bio),
        comments(
          *,
          author:profiles(id, username, avatar_url)
        )
      `
      )
      .eq("id", id)
      .eq("is_deleted", false)
      .single();

    if (error) throw error;
    return data;
  },

  async createPost(post: {
    title: string;
    content: string;
    category: string;
    image_url?: string;
  }) {
    if (!supabase) {
      console.warn("Supabase client is not initialized");
      throw new Error("Supabase client is not initialized");
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("posts")
      .insert({
        ...post,
        author_id: user.id,
      })
      .select(
        `
        *,
        author:profiles(id, username, avatar_url)
      `
      )
      .single();

    if (error) throw error;
    return data;
  },

  async updatePost(
    id: number,
    updates: {
      title?: string;
      content?: string;
      category?: string;
      image_url?: string;
    }
  ) {
    if (!supabase) {
      console.warn("Supabase client is not initialized");
      throw new Error("Supabase client is not initialized");
    }
    const { data, error } = await supabase
      .from("posts")
      .update(updates)
      .eq("id", id)
      .select(
        `
        *,
        author:profiles(id, username, avatar_url)
      `
      )
      .single();

    if (error) throw error;
    return data;
  },

  async deletePost(id: number) {
    if (!supabase) {
      console.warn("Supabase client is not initialized");
      throw new Error("Supabase client is not initialized");
    }
    const { error } = await supabase
      .from("posts")
      .update({ is_deleted: true })
      .eq("id", id);

    if (error) throw error;
  },

  // Comments
  async createComment(comment: {
    post_id: number;
    parent_id?: number;
    content: string;
  }) {
    if (!supabase) {
      console.warn("Supabase client is not initialized");
      throw new Error("Supabase client is not initialized");
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("comments")
      .insert({
        ...comment,
        author_id: user.id,
      })
      .select(
        `
        *,
        author:profiles(id, username, avatar_url)
      `
      )
      .single();

    if (error) throw error;

    // Update comment count
    const { data: post } = await supabase
      .from("posts")
      .select("comment_count")
      .eq("id", comment.post_id)
      .single();

    if (post) {
      await supabase
        .from("posts")
        .update({ comment_count: post.comment_count + 1 })
        .eq("id", comment.post_id);
    }

    return data;
  },

  // Likes
  async toggleLike(post_id: number) {
    if (!supabase) {
      console.warn("Supabase client is not initialized");
      throw new Error("Supabase client is not initialized");
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data: existingLike } = await supabase
      .from("likes")
      .select()
      .eq("user_id", user.id)
      .eq("post_id", post_id)
      .single();

    if (existingLike) {
      // Remove like
      await supabase
        .from("likes")
        .delete()
        .eq("user_id", user.id)
        .eq("post_id", post_id);

      // Decrement like count
      const { data: post } = await supabase
        .from("posts")
        .select("like_count")
        .eq("id", post_id)
        .single();

      if (post) {
        await supabase
          .from("posts")
          .update({ like_count: Math.max(0, post.like_count - 1) })
          .eq("id", post_id);
      }

      return false;
    } else {
      // Add like
      await supabase.from("likes").insert({ user_id: user.id, post_id });

      // Increment like count
      const { data: post } = await supabase
        .from("posts")
        .select("like_count")
        .eq("id", post_id)
        .single();

      if (post) {
        await supabase
          .from("posts")
          .update({ like_count: post.like_count + 1 })
          .eq("id", post_id);
      }

      return true;
    }
  },

  // View count
  async incrementViewCount(post_id: number) {
    if (!supabase) {
      console.warn("Supabase client is not initialized");
      throw new Error("Supabase client is not initialized");
    }
    const { data: post } = await supabase
      .from("posts")
      .select("view_count")
      .eq("id", post_id)
      .single();

    if (post) {
      await supabase
        .from("posts")
        .update({ view_count: post.view_count + 1 })
        .eq("id", post_id);
    }
  },

  // Profile
  async getProfile(user_id: string) {
    if (!supabase) {
      console.warn("Supabase client is not initialized");
      throw new Error("Supabase client is not initialized");
    }
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user_id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateProfile(
    user_id: string,
    updates: {
      username?: string;
      avatar_url?: string;
      bio?: string;
    }
  ) {
    if (!supabase) {
      console.warn("Supabase client is not initialized");
      throw new Error("Supabase client is not initialized");
    }
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user_id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Check if user liked a post
  async checkUserLiked(post_id: number) {
    if (!supabase) {
      console.warn("Supabase client is not initialized");
      return false;
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;

    const { data } = await supabase
      .from("likes")
      .select()
      .eq("user_id", user.id)
      .eq("post_id", post_id)
      .single();

    return !!data;
  },
};

// 닌텐도 랭킹 관련 API (rank_game 테이블 사용)
export const nintendoRankingApi = {
  // 최신 랭킹 데이터 조회
  async getLatestRanking() {
    if (!supabase) {
      console.warn("Supabase client is not initialized");
      return { data: [], error: "Supabase client is not initialized" };
    }

    const { data, error } = await supabase
      .from("rank_game")
      .select("*")
      .eq("platform", "nintendo")
      .order("rank", { ascending: true });

    if (error) {
      console.error("닌텐도 랭킹 조회 오류:", error);
      return { data: [], error: error.message };
    }

    return { data: data || [], error: null };
  },

  // 특정 날짜의 랭킹 데이터 조회
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getRankingByDate(_date: string) {
    if (!supabase) {
      console.warn("Supabase client is not initialized");
      return { data: [], error: "Supabase client is not initialized" };
    }

    const { data, error } = await supabase
      .from("rank_game")
      .select("*")
      .eq("platform", "nintendo")
      .order("rank", { ascending: true });

    if (error) {
      console.error("닌텐도 랭킹 조회 오류:", error);
      return { data: [], error: error.message };
    }

    return { data: data || [], error: null };
  },

  // 랭킹 데이터 저장 (크롤링 후 호출)
  async saveRankingData(
    rankingData: Array<{
      rank_position: number;
      title: string;
      subtitle?: string;
      img_url?: string;
      developer?: string;
    }>
  ) {
    if (!supabaseAdmin) {
      console.warn("Supabase admin client is not initialized");
      return { error: "Supabase admin client is not initialized" };
    }

    try {
      // 닌텐도 플랫폼의 기존 데이터 삭제
      const { error: deleteError } = await supabaseAdmin
        .from("rank_game")
        .delete()
        .eq("platform", "nintendo");

      if (deleteError) {
        console.error("기존 데이터 삭제 오류:", deleteError);
        return { error: deleteError.message };
      }

      // 새 데이터 삽입 (rank_game 테이블 구조에 맞게 변환)
      const insertData = rankingData.map((game) => ({
        platform: "nintendo",
        game_title: game.title,
        game_subtitle: game.subtitle || game.developer || "",
        image_url: game.img_url || null,
        rank: game.rank_position,
        update_when: new Date(),
      }));

      const { error: insertError } = await supabaseAdmin
        .from("rank_game")
        .insert(insertData);

      if (insertError) {
        console.error("랭킹 데이터 삽입 오류:", insertError);
        return { error: insertError.message };
      }

      console.log(`닌텐도 랭킹 데이터 ${rankingData.length}개 저장 완료`);
      return { error: null };
    } catch (error) {
      console.error("닌텐도 랭킹 데이터 저장 중 오류:", error);
      return {
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },

  // 랭킹 히스토리 조회 (최근 7일)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getRankingHistory(_days: number = 7) {
    if (!supabase) {
      console.warn("Supabase client is not initialized");
      return { data: [], error: "Supabase client is not initialized" };
    }

    const { data, error } = await supabase
      .from("rank_game")
      .select("*")
      .eq("platform", "nintendo")
      .order("rank", { ascending: true });

    if (error) {
      console.error("닌텐도 랭킹 히스토리 조회 오류:", error);
      return { data: [], error: error.message };
    }

    return { data: data || [], error: null };
  },
};

// 공통: 임의 플랫폼의 rank_game 저장 헬퍼
export async function saveRankGameForPlatform(
  platform: "nintendo" | "steam" | "android" | "ios" | "online",
  rankingData: Array<{
    rank_position: number;
    title: string;
    subtitle?: string;
    img_url?: string;
    developer?: string;
  }>
) {
  if (!supabaseAdmin) {
    console.warn("Supabase admin client is not initialized");
    return { error: "Supabase admin client is not initialized" };
  }

  try {
    // 해당 플랫폼 기존 데이터 삭제
    const { error: deleteError } = await supabaseAdmin
      .from("rank_game")
      .delete()
      .eq("platform", platform);

    if (deleteError) {
      console.error("기존 데이터 삭제 오류:", deleteError);
      return { error: deleteError.message };
    }

    // 새 데이터 삽입
    const insertData = rankingData.map((game) => ({
      platform,
      game_title: game.title,
      game_subtitle: game.subtitle || game.developer || "",
      image_url: game.img_url || null,
      rank: game.rank_position,
      update_when: new Date(),
    }));

    const { error: insertError } = await supabaseAdmin
      .from("rank_game")
      .insert(insertData);

    if (insertError) {
      console.error("랭킹 데이터 삽입 오류:", insertError);
      return { error: insertError.message };
    }

    console.log(`${platform} 랭킹 데이터 ${rankingData.length}개 저장 완료`);
    return { error: null };
  } catch (error) {
    console.error("랭킹 데이터 저장 중 오류:", error);
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
}
