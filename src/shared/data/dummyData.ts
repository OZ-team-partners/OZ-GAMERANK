// Import types from new structure
import type { Post, Category } from '../types/community';

// Legacy interface for backward compatibility
export interface LegacyPost {
  id: number;
  title: string;
  content: string;
  author: string;
  category: Category;
  imageUrl?: string;
  viewCount: number;
  createdAt: string;
  updatedAt?: string;
}

// Re-export types
export type { Post, Category };
  
// Sample posts for development/fallback (empty for production)
export const dummyPosts: Post[] = [];

// Helper function to convert legacy post to new format (for migration)
export function convertLegacyPost(legacyPost: LegacyPost): Post {
  return {
    id: legacyPost.id,
    title: legacyPost.title,
    content: legacyPost.content,
    author_id: `legacy-${legacyPost.author}`,
    category: legacyPost.category,
    image_url: legacyPost.imageUrl || undefined,
    view_count: legacyPost.viewCount,
    like_count: 0,
    comment_count: 0,
    is_pinned: false,
    is_deleted: false,
    created_at: legacyPost.createdAt,
    updated_at: legacyPost.updatedAt || legacyPost.createdAt,
    author: {
      id: `legacy-${legacyPost.author}`,
      username: legacyPost.author,
      avatar_url: null,
      bio: null,
      created_at: legacyPost.createdAt,
      updated_at: legacyPost.createdAt,
    },
  };
}