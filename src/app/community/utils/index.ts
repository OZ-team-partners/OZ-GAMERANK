// Community 관련 유틸리티 함수들

import type { CommunityPost, Category, PostFormData } from '../types';

/**
 * 게시글을 카테고리별로 필터링
 */
export const filterPostsByCategory = (posts: CommunityPost[], category: Category): CommunityPost[] => {
  if (category === '전체') return posts;
  return posts.filter(post => post.category === category);
};

/**
 * 게시글을 검색어로 필터링
 */
export const filterPostsBySearch = (posts: CommunityPost[], searchTerm: string): CommunityPost[] => {
  if (!searchTerm.trim()) return posts;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  return posts.filter(post => 
    post.title?.toLowerCase().includes(lowerSearchTerm) ||
    post.content?.toLowerCase().includes(lowerSearchTerm) ||
    post.author?.username?.toLowerCase().includes(lowerSearchTerm)
  );
};

/**
 * 게시글 목록을 페이지네이션
 */
export const paginatePosts = (
  posts: CommunityPost[], 
  currentPage: number, 
  postsPerPage: number = 10
): { paginatedPosts: CommunityPost[], totalPages: number, startIndex: number } => {
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = posts.slice(startIndex, startIndex + postsPerPage);
  
  return { paginatedPosts, totalPages, startIndex };
};

/**
 * 날짜를 한국어 형식으로 포맷
 */
export const formatKoreanDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('ko-KR');
  } catch {
    return '알 수 없음';
  }
};

/**
 * 게시글 작성자 권한 확인
 */
export const isPostAuthor = (post: CommunityPost | null, currentUserId?: string): boolean => {
  return !!(post && currentUserId && post.user_id === currentUserId);
};

/**
 * 빈 게시글 폼 데이터 생성
 */
export const createEmptyPostFormData = () => ({
  title: "",
  content: "",
  category: "온라인게임" as Category,
});

/**
 * 게시글에서 폼 데이터 생성
 */
export const createPostFormDataFromPost = (post: CommunityPost) => ({
  title: post.title,
  content: post.content,
  category: post.category,
});

/**
 * 파일 크기 검증
 */
export const validateFileSize = (file: File, maxSizeMB: number = 5): { isValid: boolean, errorMessage?: string } => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      errorMessage: `파일 크기는 ${maxSizeMB}MB 이하여야 합니다.`
    };
  }
  return { isValid: true };
};

/**
 * 이미지 파일 유효성 검사
 */
export const validateImageFile = (file: File): { isValid: boolean, errorMessage?: string } => {
  // 파일 타입 검증
  if (!file.type.startsWith('image/')) {
    return {
      isValid: false,
      errorMessage: '이미지 파일만 업로드 가능합니다.'
    };
  }
  
  // 파일 크기 검증
  return validateFileSize(file);
};

/**
 * 폼 데이터 변경사항 확인
 */
export const hasFormChanges = (
  currentFormData: PostFormData,
  currentImagePreview: string,
  originalPost?: CommunityPost | null
): boolean => {
  if (!originalPost) {
    // 새 게시글 작성 시
    return currentFormData.title.trim() !== "" || 
           currentFormData.content.trim() !== "" || 
           currentImagePreview !== "";
  } else {
    // 게시글 수정 시
    return (
      currentFormData.title !== originalPost.title ||
      currentFormData.content !== originalPost.content ||
      currentFormData.category !== originalPost.category ||
      currentImagePreview !== (originalPost.image_url || "")
    );
  }
};