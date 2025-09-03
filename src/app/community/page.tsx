'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

import CategoryFilter from './components/CategoryFilter';
import PostModal from './components/PostModal';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import LoginPrompt from './components/LoginPrompt';
import CommunityHeader from './components/CommunityHeader';
import CommunitySidebar from './components/CommunitySidebar';
import SearchAndWriteBar from './components/SearchAndWriteBar';

import type { CommunityPost, Category, PostFormData, SupabaseError } from './types';
import { 
  filterPostsByCategory, 
  filterPostsBySearch, 
  paginatePosts
} from './utils';

export default function BoardPage() {
  // 상태 관리
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [currentPost, setCurrentPost] = useState<CommunityPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // 인증 상태 확인
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      
      // 로그인한 사용자가 users 테이블에 있는지 확인하고 없으면 추가
      if (user) {
        const { data: existingUser } = await supabase
          .from('users')
          .select('user_id')
          .eq('user_id', user.id)
          .single();
        
        if (!existingUser) {
          console.log('users 테이블에 사용자 정보가 없습니다. 추가합니다.');
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              user_id: user.id,
              username: user.user_metadata?.username || user.email?.split('@')[0] || 'Unknown User',
              email: user.email,
              password_hash: 'supabase_auth_managed',
              avatar_url: user.user_metadata?.avatar_url || null,
              join_date: user.created_at,
              role: 'user',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
          
          if (insertError) {
            console.error('users 테이블에 사용자 추가 실패:', insertError);
          } else {
            console.log('users 테이블에 사용자 추가 성공');
          }
        }
      }
    };

    getUser();

    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      setUser(session?.user ?? null);
      
      // 세션 변경 시에도 users 테이블 확인
      if (session?.user) {
        const { data: existingUser } = await supabase
          .from('users')
          .select('user_id')
          .eq('user_id', session.user.id)
          .single();
        
        if (!existingUser) {
          await supabase
            .from('users')
            .insert({
              user_id: session.user.id,
              username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'Unknown User',
              email: session.user.email,
              password_hash: 'supabase_auth_managed',
              avatar_url: session.user.user_metadata?.avatar_url || null,
              join_date: session.user.created_at,
              role: 'user',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 게시글 로드 (실제 데이터베이스에서)
  useEffect(() => {
    const loadPosts = async () => {
      console.log('🔄 게시글 로딩 시작...');
      try {
        // 단순한 쿼리부터 시작해서 테이블 존재 여부 확인
        console.log('📡 Supabase 쿼리 실행 중...');
        // 삭제되지 않은 게시글과 작성자 정보를 함께 조회
        const { data: posts, error } = await supabase
          .from('commu_post')
          .select(
            `
            *,
            author:users(*)
          `
          )
          .or('is_deleted.is.null,is_deleted.eq.false')
          .order('created_at', { ascending: false })
          .limit(10);

        console.log('📋 필터링된 게시글 조회 결과:', posts);

        console.log('📊 쿼리 결과:', { posts, error });

        if (error) {
          console.error('Supabase 쿼리 오류:', {
            message: error.message,
            code: error.code,
            details: error.details,
          });

          // 테이블이 존재하지 않거나 오류 발생 시 빈 배열
          setPosts([]);
          return;
        }

        // posts가 성공적으로 로드되면 상태에 저장
        if (posts && posts.length > 0) {
          console.log('로드된 게시글들 (작성자 정보 포함):', posts);
          setPosts(posts);
        } else {
          console.log('게시글이 없음');
          setPosts([]);
        }
      } catch (error) {
        console.error('게시글 로딩 실패:', error);
        setPosts([]);
      }
    };

    loadPosts();
  }, []);

  // 검색된 게시글 필터링
  const categoryFilteredPosts = filterPostsByCategory(posts, selectedCategory);
  const searchFilteredPosts = filterPostsBySearch(categoryFilteredPosts, searchTerm);
  
  // 페이지네이션
  const { paginatedPosts, totalPages } = paginatePosts(searchFilteredPosts, currentPage, 10);

  // 게시글 보기 모달 열기
  const openViewModal = (post: CommunityPost) => {
    setCurrentPost(post);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  // 보기 모드에서 수정 모드로 전환
  const switchToEditMode = () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    setIsEditMode(true);
  };

  // 게시글 수정 모달 열기
  const openEditModal = (post: CommunityPost) => {
    // 비로그인 사용자가 수정하려고 할 때도 로그인 프롬프트 표시
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    setCurrentPost(post);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
    setIsEditMode(false);
  };

  // 게시글 저장
  const handleSubmit = async (
    formData: PostFormData,
    imagePreview: string
  ) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      if (isEditMode && currentPost) {
        // 게시글 수정
        const { data: updatedPost, error } = await supabase
          .from('commu_post')
          .update({
            title: formData.title,
            content: formData.content,
            category: formData.category,
            image_url: imagePreview || null,
            updated_at: new Date().toISOString(),
          })
          .eq('post_id', currentPost.id)
          .eq('user_id', user.id) // 작성자만 수정 가능
          .select(`
            *,
            author:users(*)
          `)
          .single();

        if (error) throw error;

        // 로컬 상태 업데이트
        if (updatedPost) {
          setPosts((prev) =>
            prev.map((post) =>
              post.id === currentPost.id ? updatedPost : post
            )
          );
        }
      } else {
        // 새 게시글 작성
        const { data: newPost, error } = await supabase
          .from('commu_post')
          .insert({
            title: formData.title,
            content: formData.content,
            category: formData.category,
            image_url: imagePreview || null,
            user_id: user.id,
            created_at: new Date().toISOString(),
          })
          .select(`
            *,
            author:users(*)
          `)
          .single();

        if (error) throw error;

        // 로컬 상태 업데이트
        if (newPost) {
          setPosts((prev) => [newPost, ...prev]);
        }
      }

      closeModal();
    } catch (error) {
      console.error('게시글 저장 실패:', error);
      const supabaseError = error as SupabaseError;
      console.error('Error details:', {
        message: supabaseError?.message,
        code: supabaseError?.code,
        details: supabaseError?.details,
        hint: supabaseError?.hint,
      });
      alert(
        `게시글 저장에 실패했습니다: ${
          supabaseError?.message || '알 수 없는 오류'
        }`
      );
    }
  };

  // 로그인/회원가입 처리
  const handleLogin = () => {
    setShowLoginPrompt(false);
    // TODO: 로그인 페이지로 리다이렉트 또는 로그인 모달 띄우기
    window.location.href = '/auth/login';
  };

  const handleSignup = () => {
    setShowLoginPrompt(false);
    // TODO: 회원가입 페이지로 리다이렉트 또는 회원가입 모달 띄우기
    window.location.href = '/auth/signup';
  };

  // 게시글 삭제
  const handleDelete = async (id: number) => {
    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const { error } = await supabase
        .from('commu_post')
        .update({ is_deleted: true })
        .eq('post_id', id)
        .eq('user_id', user.id); // 작성자만 삭제 가능

      if (error) throw error;

      // 로컬 상태에서 제거
      setPosts((prev) => prev.filter((post) => post.id !== id));
      closeModal();
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleWriteClick = () => {
    if (!user) {
      setShowLoginPrompt(true);
    } else {
      setCurrentPost(null);
      setIsEditMode(false);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="m-0 font-sans bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-2 sm:px-4 lg:px-6">
        
        <CommunityHeader />
        
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <CommunitySidebar />

          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-3">
            <SearchAndWriteBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onWriteClick={handleWriteClick}
            />

            <PostList
              posts={paginatedPosts}
              onViewPost={openViewModal}
              onEditPost={openEditModal}
              onDeletePost={handleDelete}
              isAuthenticated={!!user}
              currentUserId={user?.id}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* 게시글 작성/수정 모달 */}
      <PostModal
        isOpen={isModalOpen}
        isEditMode={isEditMode}
        isViewMode={!isEditMode && !!currentPost} // 수정 모드가 아니고 게시글이 있으면 보기 모드
        currentPost={currentPost}
        user={user}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onEdit={switchToEditMode}
      />

      {/* 로그인 프롬프트 */}
      <LoginPrompt
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </div>
  );
}
