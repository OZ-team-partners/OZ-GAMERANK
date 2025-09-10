'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/shared/lib/supabase';
import type { User } from '@supabase/supabase-js';
import type { CommunityPost, Category, PostFormData } from '../types';
import { 
  filterPostsByCategory, 
  filterPostsBySearch, 
  paginatePosts
} from '../utils';

interface CommunityContextType {
  // State
  posts: CommunityPost[];
  currentPost: CommunityPost | null;
  searchTerm: string;
  selectedCategory: Category;
  currentPage: number;
  user: User | null;
  showLoginPrompt: boolean;
  isLoading: boolean;
  showDetailView: boolean;
  showWriteView: boolean;
  showEditView: boolean;
  showDeleteModal: boolean;
  postToDelete: number | null;
  
  // Computed
  paginatedPosts: CommunityPost[];
  totalPages: number;
  
  // Actions
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: Category) => void;
  setCurrentPage: (page: number) => void;
  openPostDetail: (post: CommunityPost) => void;
  backToList: () => void;
  handleWriteClick: () => void;
  openDeleteModal: (id: number) => void;
  closeDeleteModal: () => void;
  switchToEditMode: () => void;
  handlePostSubmit: (formData: PostFormData, imagePreview: string) => Promise<void>;
  handleLogin: () => void;
  handleSignup: () => void;
  setShowLoginPrompt: (show: boolean) => void;
}

const CommunityContext = createContext<CommunityContextType | null>(null);

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunity must be used within CommunityProvider');
  }
  return context;
};

interface CommunityProviderProps {
  children: ReactNode;
}

export function CommunityProvider({ children }: CommunityProviderProps) {
  const searchParams = useSearchParams();
  
  // 상태 관리
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [currentPost, setCurrentPost] = useState<CommunityPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetailView, setShowDetailView] = useState(false);
  const [showWriteView, setShowWriteView] = useState(false);
  const [showEditView, setShowEditView] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  // 검색된 게시글 필터링
  const categoryFilteredPosts = filterPostsByCategory(posts, selectedCategory);
  const searchFilteredPosts = filterPostsBySearch(categoryFilteredPosts, searchTerm);
  
  // 페이지네이션
  const { paginatedPosts, totalPages } = paginatePosts(searchFilteredPosts, currentPage, 10);

  // 인증 상태 확인
  useEffect(() => {
    if (!supabase) {
      console.warn('Supabase client is not initialized in CommunityProvider');
      return;
    }

    const getUser = async () => {
      try {
        if (supabase) {
          const { data: { user } } = await supabase.auth.getUser();
          setUser(user);
        }
      } catch (error) {
        console.error('Failed to get user:', error);
      }
    };
    getUser();

    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  // 게시글 로드
  useEffect(() => {
    const loadPosts = async () => {
      if (!supabase) {
        console.warn('Supabase client is not initialized, cannot load posts');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      console.log('🔄 게시글 로딩 시작...');
      
      try {
        console.log('📡 Supabase 쿼리 실행 중...');
        
        if (!supabase) {
          throw new Error('Supabase client is not available');
        }
        
        const { data: posts, error } = await supabase
          .from('commu_post')
          .select(`
            *,
            author:users(*)
          `)
          .or('is_deleted.is.null,is_deleted.eq.false')
          .order('created_at', { ascending: false })
          .limit(10);

        console.log('📊 쿼리 결과:', { posts, error });

        if (error) {
          console.error('❌ Supabase 쿼리 오류:', error);
          setPosts([]);
          return;
        }

        if (posts) {
          console.log('✅ 게시글 로드 성공:', posts.length, '개');
          setPosts(posts);
        } else {
          console.log('📝 게시글 없음');
          setPosts([]);
        }
        
      } catch (error) {
        console.error('❌ 게시글 로딩 실패:', error);
        setPosts([]);
      } finally {
        console.log('✅ 로딩 완료 - isLoading을 false로 설정');
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  // URL 매개변수 확인하여 뷰 상태 초기화
  useEffect(() => {
    const postId = searchParams.get('post');
    const writeParam = searchParams.get('write');
    const editParam = searchParams.get('edit');

    if (postId && posts.length > 0) {
      const post = posts.find(p => (p.post_id || p.id).toString() === postId);
      if (post) {
        setCurrentPost(post);
        if (editParam === 'true') {
          setShowEditView(true);
          setShowDetailView(false);
        } else {
          setShowDetailView(true);
          setShowEditView(false);
        }
        setShowWriteView(false);
      }
    } else if (writeParam === 'true') {
      setShowWriteView(true);
      setShowDetailView(false);
      setShowEditView(false);
      setCurrentPost(null);
    } else {
      // 기본 상태로 리셋
      setShowDetailView(false);
      setShowWriteView(false);
      setShowEditView(false);
      setCurrentPost(null);
    }
  }, [searchParams, posts]);

  // 브라우저 뒤로가기 처리
  useEffect(() => {
    const handlePopState = () => {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      const postId = url.searchParams.get('post');
      const writeParam = url.searchParams.get('write');
      const editParam = url.searchParams.get('edit');

      if (postId && posts.length > 0) {
        const post = posts.find(p => (p.post_id || p.id).toString() === postId);
        if (post) {
          setCurrentPost(post);
          if (editParam === 'true') {
            setShowEditView(true);
            setShowDetailView(false);
          } else {
            setShowDetailView(true);
            setShowEditView(false);
          }
          setShowWriteView(false);
        }
      } else if (writeParam === 'true') {
        setShowWriteView(true);
        setShowDetailView(false);
        setShowEditView(false);
      } else {
        setShowDetailView(false);
        setShowWriteView(false);
        setShowEditView(false);
        setCurrentPost(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [posts]);

  // 조회수 증가 함수 (세션당 한 번만)
  const incrementViewCount = async (postId: number) => {
    if (!supabase) {
      console.warn('Supabase client is not initialized, cannot increment view count');
      return;
    }

    try {
      const viewedPostsKey = 'community_viewed_posts';
      const viewedPostsStr = sessionStorage.getItem(viewedPostsKey);
      const viewedPostsSet = viewedPostsStr ? new Set<number>(JSON.parse(viewedPostsStr)) : new Set<number>();
      
      if (viewedPostsSet.has(postId)) {
        console.log(`게시글 ${postId}는 이미 조회함 - 조회수 증가 안함`);
        return;
      }

      if (!supabase) return;
      
      const { data: currentPost } = await supabase
        .from('commu_post')
        .select('view_count')
        .eq('post_id', postId)
        .single();
      
      const newViewCount = (currentPost?.view_count || 0) + 1;
      await supabase
        .from('commu_post')
        .update({ view_count: newViewCount })
        .eq('post_id', postId);

      setPosts(prev => prev.map(p => 
        (p.post_id || p.id) === postId 
          ? { ...p, view_count: newViewCount }
          : p
      ));

      // 세션 스토리지에 조회한 게시글 추가
      viewedPostsSet.add(postId);
      sessionStorage.setItem(viewedPostsKey, JSON.stringify([...viewedPostsSet]));
      
      console.log(`게시글 ${postId} 조회수 증가: ${newViewCount}`);
    } catch (error) {
      console.error('조회수 증가 실패:', error);
    }
  };

  // Actions
  const openPostDetail = (post: CommunityPost) => {
    const postId = post.post_id || post.id;
    setCurrentPost(post);
    setShowDetailView(true);
    
    const newUrl = `/community?post=${postId}`;
    window.history.pushState({ postId }, '', newUrl);
    
    incrementViewCount(postId);
  };

  const backToList = () => {
    setShowDetailView(false);
    setShowWriteView(false);
    setShowEditView(false);
    setCurrentPost(null);
    window.history.pushState({}, '', '/community');
  };

  const handleWriteClick = () => {
    if (!user) {
      setShowLoginPrompt(true);
    } else {
      setShowWriteView(true);
      const newUrl = '/community?write=true';
      window.history.pushState({ write: true }, '', newUrl);
    }
  };

  const openDeleteModal = (id: number) => {
    setPostToDelete(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  const switchToEditMode = () => {
    if (currentPost) {
      const postId = currentPost.post_id || currentPost.id;
      setShowEditView(true);
      setShowDetailView(false);
      const newUrl = `/community?post=${postId}&edit=true`;
      window.history.pushState({ postId, edit: true }, '', newUrl);
    }
  };

  const handlePostSubmit = async (formData: PostFormData, imagePreview: string) => {
    if (!user || !supabase) return;

    try {
      if (showEditView && currentPost && supabase) {
        // 수정 로직
        const { error } = await supabase
          .from('commu_post')
          .update({
            title: formData.title,
            content: formData.content,
            category: formData.category,
            image_url: imagePreview || null,
            updated_at: new Date().toISOString()
          })
          .eq('post_id', currentPost.post_id || currentPost.id);

        if (error) throw error;

        // 로컬 상태 업데이트
        const updatedPost = { 
          ...currentPost, 
          ...formData, 
          image_url: imagePreview || undefined 
        } as CommunityPost;
        setPosts(prev => prev.map(p => 
          (p.post_id || p.id) === (currentPost.post_id || currentPost.id)
            ? updatedPost 
            : p
        ));
        setCurrentPost(updatedPost);
        
        // 상세 보기로 전환
        setShowEditView(false);
        setShowDetailView(true);
        const newUrl = `/community?post=${currentPost.post_id || currentPost.id}`;
        window.history.pushState({ postId: currentPost.post_id || currentPost.id }, '', newUrl);
      } else if (supabase) {
        // 새 게시글 작성 로직
        const { data, error } = await supabase
          .from('commu_post')
          .insert([{
            title: formData.title,
            content: formData.content,
            category: formData.category,
            user_id: user.id,
            image_url: imagePreview || null,
            created_at: new Date().toISOString()
          }])
          .select('*, author:users(*)')
          .single();

        if (error) throw error;

        if (data) {
          setPosts(prev => [data, ...prev]);
          backToList();
        }
      }
    } catch (error) {
      console.error('게시글 처리 실패:', error);
      alert('게시글 처리 중 오류가 발생했습니다.');
    }
  };

  const handleLogin = () => {
    window.location.href = '/auth/login';
  };

  const handleSignup = () => {
    window.location.href = '/auth/signup';
  };


  const contextValue: CommunityContextType = {
    // State
    posts,
    currentPost,
    searchTerm,
    selectedCategory,
    currentPage,
    user,
    showLoginPrompt,
    isLoading,
    showDetailView,
    showWriteView,
    showEditView,
    showDeleteModal,
    postToDelete,
    
    // Computed
    paginatedPosts,
    totalPages,
    
    // Actions
    setSearchTerm,
    setSelectedCategory,
    setCurrentPage,
    openPostDetail,
    backToList,
    handleWriteClick,
    openDeleteModal,
    closeDeleteModal,
    switchToEditMode,
    handlePostSubmit,
    handleLogin,
    handleSignup,
    setShowLoginPrompt,
  };

  return (
    <CommunityContext.Provider value={contextValue}>
      {children}
    </CommunityContext.Provider>
  );
}