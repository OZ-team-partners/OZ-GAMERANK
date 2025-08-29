'use client';

import { useState, useEffect } from 'react';
import { Post, Category, dummyPosts } from '@/shared/data/dummyData';
import CategoryFilter from './components/CategoryFilter';
import PostModal from './components/PostModal';
import PostList from './components/PostList';
import Pagination from './components/Pagination';

export default function BoardPage() {
  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<Category>('온라인게임');
  const [currentPage, setCurrentPage] = useState(1);
  const [nextId, setNextId] = useState(1000);

  // 초기 더미 데이터
  useEffect(() => {
    setPosts(dummyPosts);
  }, []);

  // 검색된 게시글 필터링
  const filteredPosts = posts.filter(
    (post) =>
      (selectedCategory === '온라인게임' ||
        post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 페이지네이션
  const postsPerPage = 10;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  // 모달 열기
  const openModal = (post?: Post) => {
    if (post) {
      setCurrentPost(post);
      setIsEditMode(true);
    } else {
      setCurrentPost(null);
      setIsEditMode(false);
    }
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
    setIsEditMode(false);
  };

  // 게시글 저장
  const handleSubmit = (
    formData: {
      title: string;
      content: string;
      author: string;
      category: Category;
    },
    imagePreview: string
  ) => {
    const newPost: Post = {
      id: isEditMode ? currentPost!.id : nextId,
      title: formData.title,
      content: formData.content,
      author: formData.author,
      category: formData.category,
      imageUrl: imagePreview || undefined,
      viewCount: isEditMode ? currentPost!.viewCount : 0,
      createdAt: isEditMode
        ? currentPost!.createdAt
        : new Date().toISOString().split('T')[0],
      updatedAt: isEditMode
        ? new Date().toISOString().split('T')[0]
        : undefined,
    };

    if (isEditMode) {
      setPosts((prev) =>
        prev.map((post) => (post.id === currentPost!.id ? newPost : post))
      );
    } else {
      setPosts((prev) => [newPost, ...prev]);
      setNextId((prev) => prev + 1);
    }

    closeModal();
  };

  // 게시글 삭제
  const handleDelete = (id: number) => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      setPosts((prev) => prev.filter((post) => post.id !== id));
      closeModal();
    }
  };


  return (
    <div className="m-0 font-sans bg-slate-900 text-white min-h-screen">
      <div className="max-w-[1100px] mx-auto my-7 px-4 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* 카테고리 필터 */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* LEFT: small card + big vertical ad */}
        <div className="lg:col-span-1 flex flex-col gap-4 items-center order-2 lg:order-1">
          <div className="w-full bg-indigo-500 text-white p-3.5 rounded-lg flex flex-col gap-2 items-start shadow-lg">
            <h4 className="m-0 text-sm">Subscribe</h4>
            <div className="text-xs opacity-95">
              Get our latest posts and news
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded-md border-none outline-none text-black"
            />
          </div>

          <div className="w-full h-[420px] border-2 border-slate-600 bg-slate-800 rounded-md flex items-center justify-center text-xl text-slate-400">
            광고
          </div>
        </div>

        {/* RIGHT: 게시판 리스트 */}
        <div className="lg:col-span-3 bg-transparent order-1 lg:order-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="m-0">커뮤니티 게시판</h3>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="제목/내용/작성자"
                className="p-2 border border-slate-600 rounded-md bg-slate-700 text-white placeholder-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="p-2 px-3 rounded-md border border-slate-600 bg-slate-700 text-white cursor-pointer hover:bg-slate-600 transition-colors"
                onClick={() => openModal()}
              >
                글쓰기
              </button>
            </div>
          </div>

          <PostList
            posts={paginatedPosts}
            onEditPost={openModal}
            onDeletePost={handleDelete}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* 게시글 작성/수정 모달 */}
      <PostModal
        isOpen={isModalOpen}
        isEditMode={isEditMode}
        currentPost={currentPost}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </div>
  );
}
