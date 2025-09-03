// Community 관련 타입 정의

import type { User } from '@supabase/supabase-js';

export interface Author {
  user_id: string;
  username: string;
  email: string;
  avatar_url?: string;
  join_date: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface CommunityPost {
  post_id?: number;
  id: number;
  user_id: string;
  title: string;
  content: string;
  category: Category;
  image_url?: string;
  view_count?: number;
  like_count?: number;
  comment_count?: number;
  is_pinned?: boolean;
  is_deleted?: boolean;
  created_at: string;
  updated_at: string;
  author?: Author;
}

export type Category = 
  | "온라인게임" 
  | "steam" 
  | "PS" 
  | "닌텐도" 
  | "모바일" 
  | "유머/정보" 
  | "디지털/컴퓨터/폰" 
  | "게임공략" 
  | "핫딜" 
  | "전체";

export interface PostFormData {
  title: string;
  content: string;
  category: Category;
}

export interface PostModalProps {
  isOpen: boolean;
  isEditMode: boolean;
  isViewMode?: boolean;
  currentPost: CommunityPost | null;
  user: User | null;
  onClose: () => void;
  onSubmit: (formData: PostFormData, imagePreview: string) => void;
  onDelete?: (id: number) => void;
  onEdit?: () => void;
}

export interface PostListProps {
  posts: CommunityPost[];
  onViewPost: (post: CommunityPost) => void;
  onEditPost: (post: CommunityPost) => void;
  onDeletePost: (id: number) => void;
  isAuthenticated?: boolean;
  currentUserId?: string;
}

export interface SupabaseError {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
}