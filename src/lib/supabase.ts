import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

// Helper functions for community features
export const communityApi = {
  // Posts
  async getPosts(filters?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    let query = supabase
      .from('posts')
      .select(`
        *,
        author:profiles(id, username, avatar_url)
      `)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false });

    if (filters?.category && filters.category !== '온라인게임') {
      query = query.eq('category', filters.category);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
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
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:profiles(id, username, avatar_url, bio),
        comments(
          *,
          author:profiles(id, username, avatar_url)
        )
      `)
      .eq('id', id)
      .eq('is_deleted', false)
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
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('posts')
      .insert({
        ...post,
        author_id: user.id,
      })
      .select(`
        *,
        author:profiles(id, username, avatar_url)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async updatePost(id: number, updates: {
    title?: string;
    content?: string;
    category?: string;
    image_url?: string;
  }) {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        author:profiles(id, username, avatar_url)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async deletePost(id: number) {
    const { error } = await supabase
      .from('posts')
      .update({ is_deleted: true })
      .eq('id', id);

    if (error) throw error;
  },

  // Comments
  async createComment(comment: {
    post_id: number;
    parent_id?: number;
    content: string;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('comments')
      .insert({
        ...comment,
        author_id: user.id,
      })
      .select(`
        *,
        author:profiles(id, username, avatar_url)
      `)
      .single();

    if (error) throw error;

    // Update comment count
    const { data: post } = await supabase
      .from('posts')
      .select('comment_count')
      .eq('id', comment.post_id)
      .single();
      
    if (post) {
      await supabase
        .from('posts')
        .update({ comment_count: post.comment_count + 1 })
        .eq('id', comment.post_id);
    }

    return data;
  },

  // Likes
  async toggleLike(post_id: number) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: existingLike } = await supabase
      .from('likes')
      .select()
      .eq('user_id', user.id)
      .eq('post_id', post_id)
      .single();

    if (existingLike) {
      // Remove like
      await supabase
        .from('likes')
        .delete()
        .eq('user_id', user.id)
        .eq('post_id', post_id);

      // Decrement like count
      const { data: post } = await supabase
        .from('posts')
        .select('like_count')
        .eq('id', post_id)
        .single();
        
      if (post) {
        await supabase
          .from('posts')
          .update({ like_count: Math.max(0, post.like_count - 1) })
          .eq('id', post_id);
      }

      return false;
    } else {
      // Add like
      await supabase
        .from('likes')
        .insert({ user_id: user.id, post_id });

      // Increment like count
      const { data: post } = await supabase
        .from('posts')
        .select('like_count')
        .eq('id', post_id)
        .single();
        
      if (post) {
        await supabase
          .from('posts')
          .update({ like_count: post.like_count + 1 })
          .eq('id', post_id);
      }

      return true;
    }
  },

  // View count
  async incrementViewCount(post_id: number) {
    const { data: post } = await supabase
      .from('posts')
      .select('view_count')
      .eq('id', post_id)
      .single();
      
    if (post) {
      await supabase
        .from('posts')
        .update({ view_count: post.view_count + 1 })
        .eq('id', post_id);
    }
  },

  // Profile
  async getProfile(user_id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', user_id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateProfile(user_id: string, updates: {
    username?: string;
    avatar_url?: string;
    bio?: string;
  }) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user_id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Check if user liked a post
  async checkUserLiked(post_id: number) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data } = await supabase
      .from('likes')
      .select()
      .eq('user_id', user.id)
      .eq('post_id', post_id)
      .single();

    return !!data;
  },
};