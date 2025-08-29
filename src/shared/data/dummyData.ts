// 게시글 타입 정의
export interface Post {
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
export type Category =
  | "온라인게임"
  | "steam"
  | "PS"
  | "닌텐도"
  | "모바일"
  | "유머/정보"
  | "디지털/컴퓨터/폰"
  | "게임공략"
  | "핫딜";
  
export const dummyPosts: Post[] = [
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
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=300&fit=crop",
    viewCount: 456,
    createdAt: "2025-01-14",
  },
  {
    id: 3,
    title: "닌텐도 스위치 신작 소식",
    content: "닌텐도에서 공개한 새로운 게임들입니다.",
    author: "닌텐도팬",
    category: "닌텐도",
    imageUrl:
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=300&fit=crop",
    viewCount: 89,
    createdAt: "2025-01-13",
  },
  {
    id: 4,
    title: "모바일 게임 추천",
    content: "재밌는 모바일 게임들을 추천합니다.",
    author: "모바일게이머",
    category: "모바일",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
    viewCount: 234,
    createdAt: "2025-01-12",
  },
  {
    id: 5,
    title: "온라인 게임 공략",
    content: "인기 온라인 게임 공략법을 정리했습니다.",
    author: "게임마스터",
    category: "온라인게임",
    imageUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    viewCount: 345,
    createdAt: "2025-01-11",
  },
];