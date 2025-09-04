'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

import CategoryFilter from './components/CategoryFilter';
import PostModal from './components/PostModal';
import PostList from './components/PostList';
import PostDetailView from './components/PostDetailView';
import PostWriteView from './components/PostWriteView';
import PostEditView from './components/PostEditView';
import DeleteConfirmModal from './components/DeleteConfirmModal';
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
  const router = useRouter();
  const searchParams = useSearchParams();
  
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
  const [isLoading, setIsLoading] = useState(true);
  const [showDetailView, setShowDetailView] = useState(false);
  const [showWriteView, setShowWriteView] = useState(false);
  const [showEditView, setShowEditView] = useState(false);
  const [viewedPosts, setViewedPosts] = useState<Set<number>>(new Set());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
      setIsLoading(true);
      console.log('🔄 게시글 로딩 시작...');
      
      try {
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

    // 모든 뷰 초기화
    setShowDetailView(false);
    setShowWriteView(false);
    setShowEditView(false);
    setCurrentPost(null);

    if (writeParam === 'true') {
      // 글쓰기 뷰
      setShowWriteView(true);
    } else if (editParam && posts.length > 0) {
      // 수정 뷰
      const post = posts.find(p => (p.post_id || p.id).toString() === editParam);
      if (post) {
        setCurrentPost(post);
        setShowEditView(true);
      }
    } else if (postId && posts.length > 0) {
      // 상세 뷰
      const post = posts.find(p => (p.post_id || p.id).toString() === postId);
      if (post) {
        setCurrentPost(post);
        setShowDetailView(true);
        // URL에서 직접 접근했을 때만 조회수 증가 (페이지 새로고침 등)
        const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navEntry?.type === 'navigate') {
          incrementViewCount(post.post_id || post.id);
        }
      }
    }
  }, [searchParams, posts]);

  // 브라우저 뒤로가기/앞으로가기 처리
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const postId = urlParams.get('post');
      const writeParam = urlParams.get('write');
      const editParam = urlParams.get('edit');

      // 모든 뷰 초기화
      setShowDetailView(false);
      setShowWriteView(false);
      setShowEditView(false);
      setCurrentPost(null);

      if (writeParam === 'true') {
        setShowWriteView(true);
      } else if (editParam && posts.length > 0) {
        const post = posts.find(p => (p.post_id || p.id).toString() === editParam);
        if (post) {
          setCurrentPost(post);
          setShowEditView(true);
        }
      } else if (postId && posts.length > 0) {
        const post = posts.find(p => (p.post_id || p.id).toString() === postId);
        if (post) {
          setCurrentPost(post);
          setShowDetailView(true);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [posts]);

  // 검색된 게시글 필터링
  const categoryFilteredPosts = filterPostsByCategory(posts, selectedCategory);
  const searchFilteredPosts = filterPostsBySearch(categoryFilteredPosts, searchTerm);
  
  // 페이지네이션
  const { paginatedPosts, totalPages } = paginatePosts(searchFilteredPosts, currentPage, 10);

  // 게시글 상세 보기
  const openPostDetail = (post: CommunityPost) => {
    const postId = post.post_id || post.id;
    setCurrentPost(post);
    setShowDetailView(true);
    
    // URL 업데이트 (브라우저 히스토리에 추가)
    const newUrl = `/community?post=${postId}`;
    window.history.pushState({ postId }, '', newUrl);
    
    // 조회수 증가
    incrementViewCount(postId);
  };

  // 조회수 증가 함수 (세션당 한 번만)
  const incrementViewCount = async (postId: number) => {
    try {
      // 세션 스토리지에서 이미 조회한 게시글 목록 확인
      const viewedPostsKey = 'community_viewed_posts';
      const viewedPostsStr = sessionStorage.getItem(viewedPostsKey);
      const viewedPostsSet = viewedPostsStr ? new Set<number>(JSON.parse(viewedPostsStr)) : new Set<number>();
      
      // 이미 조회한 게시글이면 조회수 증가하지 않음
      if (viewedPostsSet.has(postId)) {
        console.log(`게시글 ${postId}는 이미 조회함 - 조회수 증가 안함`);
        return;
      }

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

      // 로컬 상태도 업데이트
      setPosts(prev => prev.map(p => 
        (p.post_id || p.id) === postId 
          ? { ...p, view_count: newViewCount }
          : p
      ));

      // 세션 스토리지에 조회한 게시글 추가
      viewedPostsSet.add(postId);
      setViewedPosts(viewedPostsSet);
      sessionStorage.setItem(viewedPostsKey, JSON.stringify([...viewedPostsSet]));
      
      console.log(`게시글 ${postId} 조회수 증가: ${newViewCount}`);
    } catch (error) {
      console.error('조회수 증가 실패:', error);
    }
  };

  // 뷰에서 목록으로 돌아가기
  const backToList = () => {
    setShowDetailView(false);
    setShowWriteView(false);
    setShowEditView(false);
    setCurrentPost(null);
    
    // URL에서 매개변수 제거 (브라우저 히스토리에 추가)
    const newUrl = '/community';
    window.history.pushState({}, '', newUrl);
  };

  // 상세 보기에서 수정 뷰로 전환
  const switchToEditMode = () => {
    if (!user || !currentPost) {
      setShowLoginPrompt(true);
      return;
    }
    setShowDetailView(false);
    setShowEditView(true);
    
    // URL을 수정 모드로 변경
    const postId = currentPost.post_id || currentPost.id;
    const newUrl = `/community?edit=${postId}`;
    window.history.pushState({ editId: postId }, '', newUrl);
  };

  // 게시글 수정 뷰 열기
  const openEditView = (post: CommunityPost) => {
    // 비로그인 사용자가 수정하려고 할 때도 로그인 프롬프트 표시
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    // 권한 확인 (작성자만 수정 가능)
    if (post.user_id !== user.id) {
      alert('본인이 작성한 게시글만 수정할 수 있습니다.');
      return;
    }

    setCurrentPost(post);
    setShowEditView(true);
    
    // URL을 수정 모드로 변경
    const postId = post.post_id || post.id;
    const newUrl = `/community?edit=${postId}`;
    window.history.pushState({ editId: postId }, '', newUrl);
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

  // 삭제 모달 열기 (목록에서)
  const openDeleteModal = (id: number) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    const post = posts.find(p => (p.post_id || p.id) === id);
    if (post && post.user_id !== user.id) {
      alert('본인이 작성한 게시글만 삭제할 수 있습니다.');
      return;
    }

    setPostToDelete(id);
    setShowDeleteModal(true);
  };

  // 삭제 모달 닫기
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
    setIsDeleting(false);
  };

  // 게시글 삭제 확인
  const confirmDelete = async () => {
    if (!user || !postToDelete) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('commu_post')
        .update({ is_deleted: true })
        .eq('post_id', postToDelete)
        .eq('user_id', user.id);

      if (error) throw error;

      // 로컬 상태에서 제거
      setPosts((prev) => prev.filter((post) => (post.post_id || post.id) !== postToDelete));
      
      // 상세 보기에서 삭제한 경우 목록으로 돌아가기
      if (showDetailView && currentPost && (currentPost.post_id || currentPost.id) === postToDelete) {
        backToList();
      }

      closeDeleteModal();
      alert('게시글이 삭제되었습니다.');
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsDeleting(false);
    }
  };


  const handleWriteClick = () => {
    if (!user) {
      setShowLoginPrompt(true);
    } else {
      setShowWriteView(true);
      setCurrentPost(null);
      
      // URL을 글쓰기 모드로 변경
      const newUrl = '/community?write=true';
      window.history.pushState({ write: true }, '', newUrl);
    }
  };

  // 게시글 작성 처리
  const handlePostSubmit = async (formData: PostFormData, imagePreview: string) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      // 새 게시글 생성
      const { data, error } = await supabase
        .from('commu_post')
        .insert({
          user_id: user.id,
          title: formData.title,
          content: formData.content,
          category: formData.category,
          image_url: imagePreview || null,
          view_count: 0,
          like_count: 0,
          comment_count: 0,
          is_pinned: false,
          is_deleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select('*, author:users(*)')
        .single();

      if (error) throw error;

      // 로컬 상태에 새 게시글 추가
      setPosts(prev => [data, ...prev]);
      
      // 목록으로 돌아가기
      backToList();
      
      alert('게시글이 작성되었습니다!');
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      alert('게시글 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 게시글 수정 처리
  const handlePostEdit = async (formData: PostFormData, imagePreview: string) => {
    if (!user || !currentPost) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const postId = currentPost.post_id || currentPost.id;
      
      // 게시글 수정
      const { data, error } = await supabase
        .from('commu_post')
        .update({
          title: formData.title,
          content: formData.content,
          category: formData.category,
          image_url: imagePreview || null,
          updated_at: new Date().toISOString()
        })
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .select('*, author:users(*)')
        .single();

      if (error) throw error;

      // 로컬 상태 업데이트
      setPosts(prev => prev.map(p => 
        (p.post_id || p.id) === postId ? data : p
      ));
      
      // 목록으로 돌아가기
      backToList();
      
      alert('게시글이 수정되었습니다!');
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      alert('게시글 수정에 실패했습니다. 다시 시도해주세요.');
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
            {showDetailView && currentPost ? (
              /* 게시글 상세 보기 */
              <PostDetailView
                post={currentPost}
                user={user}
                onBack={backToList}
                onEdit={switchToEditMode}
                onDelete={openDeleteModal}
              />
            ) : showWriteView ? (
              /* 게시글 작성 뷰 */
              <PostWriteView
                user={user}
                onBack={backToList}
                onSubmit={handlePostSubmit}
              />
            ) : showEditView && currentPost ? (
              /* 게시글 수정 뷰 */
              <PostEditView
                post={currentPost}
                user={user}
                onBack={backToList}
                onSubmit={handlePostEdit}
              />
            ) : (
              /* 게시글 목록 보기 */
              <>
                <SearchAndWriteBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onWriteClick={handleWriteClick}
                />

                <PostList
                  posts={paginatedPosts}
                  onViewPost={openPostDetail}
                  onEditPost={openEditView}
                  onDeletePost={openDeleteModal}
                  isAuthenticated={!!user}
                  currentUserId={user?.id}
                  isLoading={isLoading}
                />

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
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
        onDelete={openDeleteModal}
        onEdit={switchToEditMode}
      />

      {/* 삭제 확인 모달 */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
        isDeleting={isDeleting}
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
