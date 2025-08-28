# Android 게임 순위 시스템 설정 가이드

## 개요
Android 플랫폼의 게임 앱 1위~100위 순위를 Supabase에서 가져와서 화면에 표시하는 시스템입니다.

## 구현된 기능

### 1. 데이터베이스 구조
- **테이블**: `game_rank_andriod`
- **플랫폼**: `mobile_android`
- **데이터 범위**: 1위~100위 (현재 15개 샘플 데이터 포함)

### 2. 주요 기능
- ✅ **실시간 데이터 로딩**: Supabase에서 Android 게임 순위 데이터 가져오기
- ✅ **검색 기능**: 게임 이름과 설명으로 검색
- ✅ **순위 표시**: 1위~3위는 특별한 색상으로 표시
- ✅ **로딩 상태**: 데이터 로딩 중 스피너 표시
- ✅ **에러 처리**: 오류 발생 시 사용자 친화적 메시지
- ✅ **반응형 디자인**: 모바일과 데스크톱 모두 지원

### 3. 화면 구성
- **헤더**: Android 게임 순위 제목과 설명
- **검색바**: 게임 검색 기능
- **게임 목록**: 순위별 게임 카드 표시
- **사이드바**: 광고 및 메뉴 영역

## Supabase 설정

### 1. 환경 변수 설정
`.env.local` 파일에 다음을 추가하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. 데이터베이스 마이그레이션 실행
```bash
# Supabase CLI 사용
supabase db push

# 또는 Supabase 대시보드에서 직접 실행
```

### 3. 테이블 구조
```sql
CREATE TABLE game_rankings (
    id SERIAL PRIMARY KEY,
    platform VARCHAR(50) NOT NULL,
    rank_position INTEGER NOT NULL,
    game_name VARCHAR(255) NOT NULL,
    game_image_url TEXT,
    game_description TEXT,
    release_date DATE,
    genre VARCHAR(100),
    developer VARCHAR(255),
    publisher VARCHAR(255),
    rating DECIMAL(3,1),
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(platform, rank_position)
);
```

## 파일 구조

```
src/
├── types/
│   └── gameRanking.ts          # 타입 정의
├── lib/
│   ├── supabase.ts            # Supabase 클라이언트
│   └── gameRankingService.ts  # 데이터 가져오기 함수
├── components/
│   └── GameRankingCard.tsx    # 게임 카드 컴포넌트
└── app/rank/mobile/android/
    └── page.tsx               # Android 순위 페이지
```

## 사용법

### 1. 데이터 가져오기
```typescript
import { getGameRankings } from '@/lib/gameRankingService';

// Android 상위 100개 게임 가져오기
const rankings = await getGameRankings('mobile_android', 100);
```

### 2. 특정 순위 게임 가져오기
```typescript
// 1위 게임 가져오기
const topGame = await getGameRankingByPosition('mobile_android', 1);
```

### 3. 데이터 업데이트
```sql
-- 새 게임 추가
INSERT INTO game_rankings (platform, rank_position, game_name, game_description, genre, developer, publisher, rating, review_count) 
VALUES ('mobile_android', 16, '새로운 게임', '게임 설명', 'Action', '개발사', '배급사', 4.5, 5000);

-- 순위 업데이트
UPDATE game_rankings 
SET rank_position = 5 
WHERE platform = 'mobile_android' AND game_name = '게임명';
```

## 샘플 데이터

현재 포함된 Android 게임 데이터:
1. **Genshin Impact** - 오픈월드 액션 RPG
2. **PUBG Mobile** - 배틀 로얄 슈팅 게임
3. **Free Fire** - 배틀 로얄 게임
4. **Call of Duty Mobile** - FPS 모바일 게임
5. **Mobile Legends: Bang Bang** - MOBA 모바일 게임
6. **Arena of Valor** - MOBA 게임
7. **Clash of Clans** - 전략 시뮬레이션 게임
8. **Clash Royale** - 실시간 전략 게임
9. **Brawl Stars** - 액션 슈팅 게임
10. **Subway Surfers** - 무한 러닝 게임
11. **Temple Run 2** - 무한 러닝 게임
12. **Candy Crush Saga** - 퍼즐 매치 게임
13. **Fruit Ninja** - 액션 슬라이싱 게임
14. **Angry Birds** - 물리 퍼즐 게임
15. **Minecraft** - 샌드박스 게임

## 커스터마이징

### 1. 디자인 변경
- `page.tsx`에서 카드 레이아웃 수정
- `GameRankingCard.tsx`에서 카드 스타일 변경

### 2. 기능 추가
- 필터링 기능 (장르별, 평점별)
- 정렬 기능 (평점순, 리뷰수순)
- 페이지네이션 (대량 데이터 처리)

### 3. 데이터 확장
- 더 많은 게임 데이터 추가
- 추가 필드 (가격, 다운로드 수 등)

## 문제 해결

### 데이터가 표시되지 않는 경우
1. Supabase 연결 확인
2. 환경 변수 설정 확인
3. 데이터베이스에 `mobile_android` 플랫폼 데이터 존재 확인
4. 브라우저 콘솔에서 오류 확인

### 성능 최적화
1. 이미지 최적화 (Next.js Image 컴포넌트 사용)
2. 데이터 캐싱 (React Query, SWR 등)
3. 페이지네이션 구현
4. 데이터베이스 인덱스 최적화

## 다음 단계

1. **실제 데이터 연동**: Google Play Store API 연동
2. **실시간 업데이트**: 주기적 순위 업데이트
3. **사용자 상호작용**: 좋아요, 북마크 기능
4. **분석 기능**: 순위 변화 추이, 통계 등 