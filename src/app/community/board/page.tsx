"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// 게시글 타입 정의
interface Post {
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

// 카테고리 타입
type Category =
  | "온라인게임"
  | "steam"
  | "PS"
  | "닌텐도"
  | "모바일"
  | "유머/정보"
  | "디지털/컴퓨터/폰"
  | "게임공략"
  | "핫딜";

export default function BoardPage() {
  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("온라인게임");
  const [currentPage, setCurrentPage] = useState(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // 폼 상태
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    author: string;
    category: Category;
  }>({
    title: "",
    content: "",
    author: "",
    category: "온라인게임",
  });

  // 초기 더미 데이터
  useEffect(() => {
    try {
      const dummyPosts: Post[] = [
        {
          id: 1,
          title: "스팀 신작 게임 추천해요!",
          content:
            "최근에 출시된 스팀 신작 게임들을 소개합니다. 그래픽도 좋고 게임성도 훌륭해요.",
          author: "게임러버",
          category: "steam",
          imageUrl:
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
          viewCount: 123,
          createdAt: "2025-01-15",
        },
        {
          id: 2,
          title: "PS5 독점 게임 리뷰",
          content: "플레이스테이션 5 독점 게임들의 상세한 리뷰를 작성했습니다.",
          author: "콘솔마스터",
          category: "PS",
          imageUrl:
            "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=300&fit=crop",
          viewCount: 87,
          createdAt: "2025-01-14",
        },
        {
          id: 3,
          title: "닌텐도 스위치 추천 게임",
          content:
            "가족과 함께 즐길 수 있는 닌텐도 스위치 게임들을 추천합니다.",
          author: "패밀리게이머",
          category: "닌텐도",
          viewCount: 54,
          createdAt: "2025-01-13",
        },
        {
          id: 4,
          title: "모바일 게임 공략 가이드",
          content: "인기 모바일 게임들의 공략과 팁을 정리했습니다.",
          author: "모바일전문가",
          category: "모바일",
          imageUrl:
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
          viewCount: 45,
          createdAt: "2025-01-12",
        },
      ];
      setPosts(dummyPosts);
    } catch (error) {
      console.error("게시글 데이터 로딩 중 오류:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 검색된 게시글 필터링
  const filteredPosts = posts.filter(
    (post) =>
      (selectedCategory === "온라인게임" ||
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
    try {
      if (post) {
        setCurrentPost(post);
        setIsEditMode(true);
        setFormData({
          title: post.title,
          content: post.content,
          author: post.author,
          category: post.category,
        });
        setImagePreview(post.imageUrl || "");
      } else {
        setCurrentPost(null);
        setIsEditMode(false);
        setFormData({
          title: "",
          content: "",
          author: "",
          category: "온라인게임",
        });
        setImagePreview("");
      }
      setIsModalOpen(true);
    } catch (error) {
      console.error("모달 열기 중 오류:", error);
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
    setIsEditMode(false);
    setFormData({
      title: "",
      content: "",
      author: "",
      category: "온라인게임",
    });
    setImageFile(null);
    setImagePreview("");
  };

  // 폼 입력 처리
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        category: value as Category,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // 이미지 파일 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (file) {
        // 파일 크기 체크 (5MB 제한)
        if (file.size > 5 * 1024 * 1024) {
          alert("파일 크기는 5MB 이하여야 합니다.");
          return;
        }

        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.onerror = () => {
          console.error("이미지 파일 읽기 오류");
          alert("이미지 파일을 읽을 수 없습니다.");
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("이미지 처리 중 오류:", error);
      alert("이미지 처리 중 오류가 발생했습니다.");
    }
  };

  // 게시글 저장
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newPost: Post = {
        id: isEditMode ? currentPost!.id : Date.now(),
        title: formData.title,
        content: formData.content,
        author: formData.author,
        category: formData.category,
        imageUrl: imagePreview || undefined,
        viewCount: isEditMode ? currentPost!.viewCount : 0,
        createdAt: isEditMode
          ? currentPost!.createdAt
          : new Date().toISOString().split("T")[0],
        updatedAt: isEditMode
          ? new Date().toISOString().split("T")[0]
          : undefined,
      };

      if (isEditMode) {
        setPosts((prev) =>
          prev.map((post) => (post.id === currentPost!.id ? newPost : post))
        );
      } else {
        setPosts((prev) => [newPost, ...prev]);
      }

      closeModal();
    } catch (error) {
      console.error("게시글 저장 중 오류:", error);
      alert("게시글 저장 중 오류가 발생했습니다.");
    }
  };

  // 게시글 삭제
  const handleDelete = (id: number) => {
    try {
      if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
        setPosts((prev) => prev.filter((post) => post.id !== id));
        closeModal();
      }
    } catch (error) {
      console.error("게시글 삭제 중 오류:", error);
      alert("게시글 삭제 중 오류가 발생했습니다.");
    }
  };

  // 조회수 증가
  const handleViewPost = (post: Post) => {
    try {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id ? { ...p, viewCount: p.viewCount + 1 } : p
        )
      );
      // 여기서 상세 페이지로 이동하거나 상세 모달을 열 수 있습니다
      alert(`게시글 "${post.title}"을(를) 조회합니다.`);
    } catch (error) {
      console.error("게시글 조회 중 오류:", error);
    }
  };

  // 로딩 중 표시
  if (isLoading) {
    return (
      <div className="m-0 font-sans bg-slate-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>게시판을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="m-0 font-sans bg-slate-900 text-white min-h-screen">
      <div className="max-w-[1100px] mx-auto my-7 px-4 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Top filters (zig-zag dropdowns with icons) */}
        <div className="col-span-1 lg:col-span-4 flex gap-3 py-3 pb-5 flex-wrap items-start">
          <div className="w-19 flex flex-col items-center gap-1.5 text-xs text-center">
            <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              🎮
            </div>
            <select
              className="w-full p-1.5 border border-gray-300 rounded bg-white text-sm text-black cursor-pointer hover:border-gray-400 focus:outline-none focus:border-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category)}
              style={{ color: "black", backgroundColor: "white" }}
            >
              <option
                value="온라인게임"
                style={{ color: "black", backgroundColor: "white" }}
              >
                온라인게임
              </option>
              <option
                value="steam"
                style={{ color: "black", backgroundColor: "white" }}
              >
                steam
              </option>
              <option
                value="PS"
                style={{ color: "black", backgroundColor: "white" }}
              >
                PS
              </option>
              <option
                value="닌텐도"
                style={{ color: "black", backgroundColor: "white" }}
              >
                닌텐도
              </option>
              <option
                value="모바일"
                style={{ color: "black", backgroundColor: "white" }}
              >
                모바일
              </option>
              <option
                value="유머/정보"
                style={{ color: "black", backgroundColor: "white" }}
              >
                유머/정보
              </option>
              <option
                value="디지털/컴퓨터/폰"
                style={{ color: "black", backgroundColor: "white" }}
              >
                디지털/컴퓨터/폰
              </option>
              <option
                value="게임공략"
                style={{ color: "black", backgroundColor: "white" }}
              >
                게임공략
              </option>
              <option
                value="핫딜"
                style={{ color: "black", backgroundColor: "white" }}
              >
                핫딜
              </option>
            </select>
          </div>
          {/* 나머지 필터들은 동일하게 유지 */}
          <div className="w-19 flex flex-col items-center gap-1.5 text-xs text-center translate-y-2">
            <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              🕹️
            </div>
            <select className="w-full p-1.5 border border-gray-300 rounded bg-white text-sm">
              <option>steam</option>
            </select>
          </div>
          <div className="w-19 flex flex-col items-center gap-1.5 text-xs text-center">
            <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              🎮
            </div>
            <select className="w-full p-1.5 border border-gray-300 rounded bg-white text-sm">
              <option>PS</option>
            </select>
          </div>
          <div className="w-19 flex flex-col items-center gap-1.5 text-xs text-center translate-y-2">
            <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              📱
            </div>
            <select className="w-full p-1.5 border border-gray-300 rounded bg-white text-sm">
              <option>닌텐도</option>
            </select>
          </div>
          <div className="w-19 flex flex-col items-center gap-1.5 text-xs text-center">
            <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              🔍
            </div>
            <select className="w-full p-1.5 border border-gray-300 rounded bg-white text-sm">
              <option>모바일</option>
            </select>
          </div>
          <div className="w-19 flex flex-col items-center gap-1.5 text-xs text-center translate-y-2">
            <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              ⭐
            </div>
            <select className="w-full p-1.5 border border-gray-300 rounded bg-white text-sm">
              <option>유머/정보</option>
            </select>
          </div>
          <div className="w-19 flex flex-col items-center gap-1.5 text-xs text-center">
            <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              🗂️
            </div>
            <select className="w-full p-1.5 border border-gray-300 rounded bg-white text-sm">
              <option>디지털/컴퓨터/폰</option>
            </select>
          </div>
          <div className="w-19 flex flex-col items-center gap-1.5 text-xs text-center translate-y-2">
            <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              🗂️
            </div>
            <select className="w-full p-1.5 border border-gray-300 rounded bg-white text-sm">
              <option>게임공략</option>
            </select>
          </div>
          <div className="w-19 flex flex-col items-center gap-1.5 text-xs text-center">
            <div className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              🗂️
            </div>
            <select className="w-full p-1.5 border border-gray-300 rounded bg-white text-sm">
              <option>핫딜</option>
            </select>
          </div>
        </div>

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
              className="w-full p-2 rounded-md border-none outline-none"
            />
          </div>

          <div className="w-full h-[420px] border-2 border-gray-300 rounded-md flex items-center justify-center text-xl text-gray-500">
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
                className="p-2 border border-gray-300 rounded-md text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="p-2 px-3 rounded-md border border-gray-300 bg-white text-black cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => openModal()}
              >
                글쓰기
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-1.5">
            {paginatedPosts.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>게시글이 없습니다.</p>
              </div>
            ) : (
              paginatedPosts.map((post) => (
                <div key={post.id}>
                  <div className="flex items-center gap-3 p-3 px-2 hover:bg-gray-800 transition-colors cursor-pointer">
                    <div className="w-[42px] h-[42px] rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 font-semibold overflow-hidden">
                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          width={42}
                          height={42}
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            target.nextElementSibling!.textContent = "Img";
                          }}
                        />
                      ) : (
                        "Img"
                      )}
                    </div>
                    <div
                      className="flex items-center gap-3 flex-1"
                      onClick={() => handleViewPost(post)}
                    >
                      <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[420px] text-sm">
                        {post.title}
                      </div>
                      <div className="h-px bg-gray-300 flex-1 opacity-60"></div>
                    </div>
                    <div className="w-40 text-right text-gray-500 text-xs">
                      {post.createdAt} &nbsp; · &nbsp; 조회수 {post.viewCount}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(post);
                        }}
                        className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        수정
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(post.id);
                        }}
                        className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                  <div className="h-px bg-gray-200 ml-[60px]"></div>
                </div>
              ))
            )}
          </div>

          {/* 페이지네이션 영역 */}
          {totalPages > 1 && (
            <div className="mt-[18px] flex justify-center gap-2">
              <button
                className="p-2 px-3 border border-gray-300 rounded-md bg-white text-black hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                &laquo;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`p-2 px-3 rounded-md border ${
                      currentPage === page
                        ? "bg-indigo-500 text-white border-none"
                        : "border-gray-300 bg-white text-black hover:bg-gray-100"
                    } transition-colors`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                className="p-2 px-3 border border-gray-300 rounded-md bg-white text-black hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                &raquo;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 게시글 작성/수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {isEditMode ? "게시글 수정" : "새 게시글 작성"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  카테고리
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black cursor-pointer hover:border-gray-400 focus:outline-none focus:border-blue-500"
                  style={{ color: "black", backgroundColor: "white" }}
                >
                  <option
                    value="온라인게임"
                    style={{ color: "black", backgroundColor: "white" }}
                  >
                    온라인게임
                  </option>
                  <option
                    value="steam"
                    style={{ color: "black", backgroundColor: "white" }}
                  >
                    steam
                  </option>
                  <option
                    value="PS"
                    style={{ color: "black", backgroundColor: "white" }}
                  >
                    PS
                  </option>
                  <option
                    value="닌텐도"
                    style={{ color: "black", backgroundColor: "white" }}
                  >
                    닌텐도
                  </option>
                  <option
                    value="모바일"
                    style={{ color: "black", backgroundColor: "white" }}
                  >
                    모바일
                  </option>
                  <option
                    value="유머/정보"
                    style={{ color: "black", backgroundColor: "white" }}
                  >
                    유머/정보
                  </option>
                  <option
                    value="디지털/컴퓨터/폰"
                    style={{ color: "black", backgroundColor: "white" }}
                  >
                    디지털/컴퓨터/폰
                  </option>
                  <option
                    value="게임공략"
                    style={{ color: "black", backgroundColor: "white" }}
                  >
                    게임공략
                  </option>
                  <option
                    value="핫딜"
                    style={{ color: "black", backgroundColor: "white" }}
                  >
                    핫딜
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">제목</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">작성자</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">내용</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full p-2 border border-gray-300 rounded-md resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  이미지 첨부
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <Image
                      src={imagePreview}
                      alt="미리보기"
                      width={200}
                      height={150}
                      className="rounded-md object-cover"
                      onError={() => {
                        setImagePreview("");
                        alert("이미지를 불러올 수 없습니다.");
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  {isEditMode ? "수정하기" : "작성하기"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
