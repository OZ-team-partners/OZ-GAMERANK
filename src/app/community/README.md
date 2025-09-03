# Community 모듈 구조

## 📁 폴더 구조

```
src/app/community/
├── components/           # UI 컴포넌트들
│   ├── CategoryFilter.tsx       # 카테고리 필터
│   ├── CommunityHeader.tsx      # 페이지 헤더
│   ├── CommunitySidebar.tsx     # 사이드바 (구독, 트렌딩, 광고)
│   ├── LoginPrompt.tsx          # 로그인 프롬프트 모달
│   ├── Pagination.tsx           # 페이지네이션
│   ├── PostList.tsx            # 게시글 목록
│   ├── PostModal.tsx           # 게시글 작성/수정/보기 모달
│   └── SearchAndWriteBar.tsx   # 검색 및 글쓰기 바
├── types/               # TypeScript 타입 정의
│   └── index.ts                # 모든 타입 정의
├── utils/               # 유틸리티 함수들
│   └── index.ts                # 공통 함수들
├── page.tsx            # 메인 페이지 컴포넌트
└── README.md           # 이 문서
```

## 🔧 컴포넌트 설명

### Core Components

- **`page.tsx`**: 메인 커뮤니티 페이지, 상태 관리 및 데이터 처리
- **`PostModal.tsx`**: 게시글 CRUD 기능을 담당하는 모달
- **`PostList.tsx`**: 게시글 목록 표시 및 권한 관리

### UI Components

- **`CommunityHeader.tsx`**: 페이지 제목과 설명
- **`CommunitySidebar.tsx`**: 뉴스레터, 트렌딩, 광고 영역
- **`SearchAndWriteBar.tsx`**: 검색 입력과 글쓰기 버튼
- **`CategoryFilter.tsx`**: 게임 카테고리 필터
- **`Pagination.tsx`**: 페이지 네비게이션

### Utility Components

- **`LoginPrompt.tsx`**: 비로그인 사용자 안내 모달

## 📝 타입 시스템

### 주요 타입들

```typescript
// 게시글 타입
interface CommunityPost {
  post_id?: number;
  id: number;
  user_id: string;
  title: string;
  content: string;
  category: Category;
  // ... 기타 필드들
}

// 카테고리 타입
type Category = "온라인게임" | "steam" | "PS" | "닌텐도" | "모바일" | ...

// 폼 데이터 타입
interface PostFormData {
  title: string;
  content: string;
  category: Category;
}
```

## 🛠 유틸리티 함수들

### 데이터 처리
- `filterPostsByCategory()`: 카테고리별 필터링
- `filterPostsBySearch()`: 검색어 필터링
- `paginatePosts()`: 페이지네이션 처리

### 권한 관리
- `isPostAuthor()`: 작성자 권한 확인

### 폼 처리
- `createEmptyPostFormData()`: 빈 폼 데이터 생성
- `hasFormChanges()`: 변경사항 확인

### 파일 검증
- `validateFileSize()`: 파일 크기 검증
- `validateImageFile()`: 이미지 파일 검증

### 날짜 포맷팅
- `formatKoreanDate()`: 한국어 날짜 포맷

## 🔄 데이터 플로우

1. **페이지 로드**: Supabase에서 게시글 목록 조회
2. **필터링**: 카테고리/검색어로 게시글 필터링
3. **페이지네이션**: 필터링된 결과를 페이지별로 분할
4. **권한 확인**: 사용자별 수정/삭제 권한 체크
5. **CRUD 작업**: 게시글 생성/조회/수정/삭제

## 🔐 권한 시스템

- **게시글 보기**: 모든 사용자
- **게시글 작성**: 로그인한 사용자
- **게시글 수정/삭제**: 작성자 본인만

## 🚀 사용법

```tsx
// 메인 페이지에서 사용
import BoardPage from '@/app/community/page';

// 컴포넌트 개별 사용
import PostList from '@/app/community/components/PostList';
import PostModal from '@/app/community/components/PostModal';

// 유틸리티 함수 사용
import { filterPostsByCategory } from '@/app/community/utils';
```

## 🎨 스타일링

- **디자인 시스템**: TailwindCSS 사용
- **색상 팔레트**: Slate 계열 (slate-900, slate-800, slate-700)
- **테마**: 다크 테마 기본
- **반응형**: 모바일 우선 설계

## 🔧 개발 가이드

### 새 컴포넌트 추가 시
1. `components/` 폴더에 컴포넌트 생성
2. 필요한 타입을 `types/index.ts`에 추가
3. 유틸리티 함수는 `utils/index.ts`에 추가
4. 메인 페이지에서 import 및 사용

### 타입 안전성
- 모든 props에 대해 TypeScript 인터페이스 정의
- `any` 타입 사용 금지
- Supabase 응답 타입 명시적 정의

### 성능 최적화
- React.memo 활용 (필요시)
- useCallback, useMemo 적절히 사용
- 컴포넌트 분리로 리렌더링 최소화