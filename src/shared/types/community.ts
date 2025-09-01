// Supabase 통합을 위한 커뮤니티 타입 정의
export type Category =
  | "전체"
  | "온라인게임"
  | "steam"
  | "PS"
  | "닌텐도"
  | "모바일"
  | "유머/정보"
  | "디지털/컴퓨터/폰"
  | "게임공략"
  | "핫딜";

export interface Profile {
  id: string; // UUID
  username: string;
  avatar_url?: string | null;
  bio?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author_id: string; // UUID
  category: Category;
  image_url?: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  is_pinned: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  // 관계 데이터 (JOIN 시)
  author?: Profile;
  comments?: Comment[];
  user_liked?: boolean;
  user_bookmarked?: boolean;
}

export interface Comment {
  id: number;
  post_id: number;
  author_id: string; // UUID
  parent_id?: number;
  content: string;
  like_count: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  // 관계 데이터
  author?: Profile;
  replies?: Comment[];
  user_liked?: boolean;
}

export interface Like {
  user_id: string;
  post_id: number;
  created_at: string;
}

export interface Bookmark {
  user_id: string;
  post_id: number;
  created_at: string;
}

// API 요청/응답 타입
export interface CreatePostRequest {
  title: string;
  content: string;
  category: Category;
  image_url?: string;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  category?: Category;
  image_url?: string;
}

export interface CreateCommentRequest {
  post_id: number;
  parent_id?: number;
  content: string;
}

export interface PostFilters {
  category?: Category;
  search?: string;
  author_id?: string;
  is_pinned?: boolean;
}

export interface PostPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PostsResponse {
  data: Post[];
  pagination: PostPagination;
}

// Database row types (Supabase generated types와 호환)
export type PostRow = {
  id: number;
  title: string;
  content: string;
  author_id: string;
  category: string;
  image_url: string | null;
  view_count: number;
  like_count: number;
  comment_count: number;
  is_pinned: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
};

export type CommentRow = {
  id: number;
  post_id: number;
  author_id: string;
  parent_id: number | null;
  content: string;
  like_count: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
};

export type ProfileRow = {
  id: string;
  username: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
};