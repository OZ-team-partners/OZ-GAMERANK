'use client';

import React, { useState } from 'react';
import { supabase } from '@/shared/lib/supabase';
import CategoryFilter from './CategoryFilter';
import PostList from './PostList';
import PostDetailView from './PostDetailView';
import PostWriteView from './PostWriteView';
import PostEditView from './PostEditView';
import DeleteConfirmModal from './DeleteConfirmModal';
import Pagination from './Pagination';
import LoginPrompt from './LoginPrompt';
import CommunityHeader from './CommunityHeader';
import CommunitySidebar from './CommunitySidebar';
import SearchAndWriteBar from './SearchAndWriteBar';
import { useCommunity } from './CommunityProvider';

export default function CommunityContainer() {
  const {
    // State
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
    handleLike,
    isPostLiked,
    handleLogin,
    handleSignup,
    setShowLoginPrompt,
  } = useCommunity();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 삭제 확인
  const confirmDelete = async () => {
    if (!user || !postToDelete || !supabase) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('commu_post')
        .update({ is_deleted: true })
        .eq('post_id', postToDelete);

      if (error) throw error;

      // 로컬 상태에서 제거 (페이지 새로고침으로 처리)
      
      // 현재 보고 있는 게시글이 삭제된 경우 목록으로 돌아가기
      if (currentPost && (currentPost.post_id || currentPost.id) === postToDelete) {
        backToList();
      }
      
      closeDeleteModal();
      
      // 페이지 새로고침하여 최신 데이터 로드
      window.location.reload();
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="min-h-screen bg-slate-900">
      <CommunityHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                onLike={handleLike}
                isLiked={isPostLiked(currentPost.post_id || currentPost.id)}
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
                onSubmit={handlePostSubmit}
              />
            ) : (
              /* 게시글 목록 */
              <>
                <SearchAndWriteBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onWriteClick={handleWriteClick}
                />

                <PostList
                  posts={paginatedPosts}
                  onViewPost={openPostDetail}
                  onEditPost={switchToEditMode}
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


      {/* 삭제 확인 모달 */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
        isDeleting={isSubmitting}
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