# 커뮤니티 페이지 Supabase 마이그레이션 가이드

## 📋 완료된 작업

### 1. ✅ TypeScript 타입 업데이트
- `/src/shared/types/community.ts` - 새로운 Supabase 호환 타입 생성
- `/src/shared/data/dummyData.ts` - 기존 더미 데이터를 새 구조로 변환
- 기존 컴포넌트들의 타입 참조 업데이트

### 2. ✅ Supabase 클라이언트 설정
- `/src/lib/supabase.ts` - Supabase 클라이언트 및 API 헬퍼 함수 생성
- 게시글 CRUD 작업을 위한 `communityApi` 생성
- 댓글, 좋아요, 북마크 기능 포함

### 3. ✅ 컴포넌트 업데이트
- `PostList.tsx` - 새로운 데이터 구조에 맞게 수정
- `PostModal.tsx` - 작성자 정보 처리 방식 변경
- 좋아요, 댓글 수, 고정 게시글 표시 추가

### 4. ✅ SQL 마이그레이션 파일 생성
- `/supabase/migrations/001_community_tables.sql` - 데이터베이스 스키마 생성 스크립트

## 🚀 실행해야 할 작업

### 1. 환경 변수 설정
`.env.local` 파일에 Supabase 설정 추가:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase 테이블 생성
1. Supabase 대시보드의 SQL Editor에 접속
2. `/supabase/migrations/001_community_tables.sql` 파일 내용을 복사
3. SQL 에디터에 붙여넣고 실행

### 3. 사용자 인증 설정
Supabase Auth를 통해 사용자 가입 시 자동으로 프로필이 생성되도록 트리거 추가:

```sql
-- 사용자 가입 시 프로필 자동 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 트리거 생성
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 4. 메인 페이지 수정
`/src/app/community/page.tsx`에서 Supabase API 사용하도록 수정:

```typescript
// 기존 더미 데이터 대신 Supabase에서 데이터 fetch
const [posts, setPosts] = useState<Post[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchPosts() {
    try {
      const { data } = await communityApi.getPosts({
        category: selectedCategory,
        search: searchTerm,
        page: currentPage,
      });
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }
  
  fetchPosts();
}, [selectedCategory, searchTerm, currentPage]);
```

## 📊 데이터베이스 스키마 개요

### 주요 테이블:
- **profiles**: 사용자 프로필 정보
- **posts**: 게시글 데이터
- **comments**: 댓글 (대댓글 지원)
- **likes**: 좋아요 정보
- **bookmarks**: 북마크 정보

### 핵심 기능:
- ✅ Row Level Security (RLS) 정책
- ✅ 실시간 업데이트 지원
- ✅ 관계형 데이터 구조
- ✅ 인덱스 최적화
- ✅ 자동 타임스탬프 업데이트

## 🔄 마이그레이션 후 변경사항

### Before (기존):
```typescript
interface Post {
  author: string;           // 단순 문자열
  createdAt: string;        // 날짜 문자열
  viewCount: number;        // 조회수만
}
```

### After (Supabase):
```typescript
interface Post {
  author_id: string;        // UUID 참조
  author?: Profile;         // 관계 데이터
  created_at: string;       // ISO 타임스탬프
  view_count: number;       // 조회수
  like_count: number;       // 좋아요 수
  comment_count: number;    // 댓글 수
  is_pinned: boolean;       // 고정 여부
}
```

## ⚠️ 주의사항

1. **사용자 인증**: Supabase Auth 설정 완료 후 테스트
2. **RLS 정책**: 보안 정책이 올바르게 작동하는지 확인
3. **실시간 기능**: 필요시 Realtime 구독 추가
4. **이미지 업로드**: Supabase Storage 연동 필요

## 📝 다음 단계

1. 환경 변수 설정
2. SQL 마이그레이션 실행
3. 사용자 인증 테스트
4. 게시글 CRUD 기능 테스트
5. 실시간 기능 추가 (선택사항)

이제 커뮤니티 페이지가 완전히 Supabase와 연동되어 실제 데이터베이스를 사용할 준비가 완료되었습니다! 🎉