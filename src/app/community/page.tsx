'use client';

import { useState, useEffect } from 'react';
import { Post, Category } from '@/shared/data/dummyData';
import CategoryFilter from './components/CategoryFilter';
import PostModal from './components/PostModal';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import LoginPrompt from './components/LoginPrompt';
import { Search, PenSquare, Mail, TrendingUp, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export default function BoardPage() {
  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<Category>('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // 인증 상태 확인
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    // 인증 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // 게시글 로드 (실제 데이터베이스에서)
  useEffect(() => {
    const loadPosts = async () => {
      console.log('🔄 게시글 로딩 시작...');
      try {
        // 단순한 쿼리부터 시작해서 테이블 존재 여부 확인
        console.log('📡 Supabase 쿼리 실행 중...');
        // 삭제되지 않은 게시글만 조회 (is_deleted가 null이거나 false인 것)
        const { data: posts, error } = await supabase
          .from('commu_post')
          .select('*')
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

        // posts가 성공적으로 로드되면 profiles 정보 조인 (일단 간단하게)
        if (posts && posts.length > 0) {
          // profiles 테이블 조인 없이 일단 표시
          const postsWithFakeAuthors = posts.map(post => ({
            ...post,
            author: {
              id: post.user_id,
              username: 'Unknown User', // 나중에 실제 사용자명으로 교체
              avatar_url: null,
              bio: null,
              created_at: post.created_at,
              updated_at: post.created_at,
            },
          }));
          console.log('로드된 게시글들:', postsWithFakeAuthors);
          setPosts(postsWithFakeAuthors);
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
  const filteredPosts = posts.filter(
    (post) =>
      post && // post가 존재하는지 확인
      (selectedCategory === '전체' ||
        post.category === selectedCategory) &&
      ((post.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.content || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.author?.username || '').toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 페이지네이션
  const postsPerPage = 10;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  // 수정 모달 열기
  const openModal = (post: Post) => {
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
    formData: {
      title: string;
      content: string;
      category: Category;
    },
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
          .select('*')
          .single();

        if (error) throw error;

        // 로컬 상태 업데이트
        if (updatedPost) {
          setPosts((prev) =>
            prev.map((post) => (post.id === currentPost.id ? updatedPost : post))
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
          })
          .select('*')
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
      console.error('Error details:', {
        message: (error as any)?.message,
        code: (error as any)?.code,
        details: (error as any)?.details,
        hint: (error as any)?.hint,
      });
      alert(`게시글 저장에 실패했습니다: ${(error as any)?.message || '알 수 없는 오류'}`);
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


  return (
    <div className="m-0 font-sans bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-2 sm:px-4 lg:px-6">
        {/* 헤더 섹션 */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Game Community
          </h1>
          <p className="text-slate-400">게임을 사랑하는 사람들의 모임</p>
        </div>

        {/* 카테고리 필터 */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* LEFT: 사이드바 */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            {/* 구독 카드 */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-5 rounded-2xl shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-5 h-5" />
                <h4 className="font-semibold text-lg">뉴스레터 구독</h4>
              </div>
              <p className="text-sm mb-4 opacity-90">
                최신 게임 소식을 받아보세요
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="이메일 주소"
                  className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-sm placeholder-white/70 text-white border border-white/30 focus:outline-none focus:border-white"
                />
                <button className="w-full p-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-white/90 transition-all cursor-pointer">
                  구독하기
                </button>
              </div>
            </div>

            {/* 트렌딩 카드 */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-5 rounded-2xl border border-slate-700 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <h4 className="font-semibold">인기 토픽</h4>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-slate-700/50 rounded-lg text-sm hover:bg-slate-700 transition-colors cursor-pointer">
                  #발더스게이트3
                </div>
                <div className="p-2 bg-slate-700/50 rounded-lg text-sm hover:bg-slate-700 transition-colors cursor-pointer">
                  #스팀세일
                </div>
                <div className="p-2 bg-slate-700/50 rounded-lg text-sm hover:bg-slate-700 transition-colors cursor-pointer">
                  #PS5신작
                </div>
              </div>
            </div>

            {/* 광고 영역 */}
            <div className="h-[350px] bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-2xl shadow-2xl overflow-hidden relative">
              {/* 배경 패턴 */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent rotate-45 transform translate-x-[-100%] animate-pulse"></div>
              </div>
              
              {/* 광고 모집 문구 */}
              <div className="absolute top-4 left-0 right-0 text-center z-10">
                <div className="inline-block bg-black/70 backdrop-blur-sm px-5 py-2.5 rounded-full">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📢</span>
                    <span className="text-yellow-300 text-base font-bold tracking-wider">광고 모집 중</span>
                    <span className="text-xl">📢</span>
                  </div>
                </div>
              </div>
              
              {/* 메인 광고 컨텐츠 */}
              <div className="relative h-full flex flex-col justify-center items-center p-8 text-center">
                <div className="flex flex-col items-center gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Star className="w-6 h-6 text-yellow-300" />
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">소중한 광고주</h3>
                    <Star className="w-6 h-6 text-yellow-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">모십니다!</h3>
                </div>
                
                {/* 장식 아이콘들 */}
                <Star className="absolute top-16 right-6 w-5 h-5 text-yellow-300 opacity-80 animate-ping" />
                <Star className="absolute bottom-16 left-6 w-4 h-4 text-white opacity-60 animate-pulse" />
                <Star className="absolute top-28 left-4 w-3 h-3 text-yellow-200 opacity-50 animate-bounce" />
                <Star className="absolute top-20 right-2 w-3 h-3 text-yellow-400 opacity-40 animate-pulse" />
              </div>
              
              {/* 테두리 네온 효과 */}
              <div className="absolute inset-0 rounded-2xl border-4 border-yellow-300/50 animate-pulse"></div>
            </div>
          </div>

          {/* RIGHT: 메인 콘텐츠 */}
          <div className="lg:col-span-3">
            {/* 검색 및 글쓰기 바 */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-700 mb-6 shadow-xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="게시글 검색..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 rounded-xl text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => {
                    if (!user) {
                      setShowLoginPrompt(true);
                    } else {
                      setCurrentPost(null);
                      setIsEditMode(false);
                      setIsModalOpen(true);
                    }
                  }}
                >
                  <PenSquare className="w-5 h-5" />
                  <span>글쓰기</span>
                </button>
              </div>
            </div>

            <PostList
              posts={paginatedPosts}
              onEditPost={openModal}
              onDeletePost={handleDelete}
              isAuthenticated={!!user}
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
        currentPost={currentPost}
        user={user}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
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
