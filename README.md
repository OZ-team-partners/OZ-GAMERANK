# OZ-GAMERANK 🎮

게임 랭킹과 정보를 제공하는 웹 서비스입니다.

## 🚀 주요 기능

- **게임 랭킹**: PC/콘솔/모바일 플랫폼별 게임 순위
- **게임 정보**: 상세한 게임 정보 및 리뷰
- **커뮤니티**: 게이머들을 위한 커뮤니티 게시판
- **게임 MBTI**: 게이밍 성향 테스트
- **뉴스레터**: 게임 관련 최신 소식

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 15.4.5 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: TailwindCSS 4.x
- **UI Components**: Material-UI (@mui/material)
- **Icons**: Lucide React, MUI Icons
- **Font**: Press Start 2P (게이밍 테마)

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **API**: Next.js API Routes

## 🏗️ 프로젝트 구조

```
src/
├── app/
│   ├── auth/           # 인증 (로그인, 회원가입)
│   │   └── components/ # 인증 관련 컴포넌트
│   ├── rank/           # 게임 랭킹 (PC, 콘솔, 모바일)
│   ├── game_info/      # 게임 정보 페이지
│   │   └── components/ # 게임 정보 컴포넌트
│   ├── community/      # 커뮤니티 게시판
│   ├── small_contents/ # MBTI 테스트
│   ├── blog/          # 뉴스레터
│   ├── header/        # 공통 헤더 컴포넌트
│   │   ├── components/ # 헤더 서브 컴포넌트
│   │   ├── hooks/     # 커스텀 훅
│   │   ├── styles/    # 공통 스타일
│   │   └── types/     # 타입 정의
│   └── profile/       # 사용자 프로필
└── shared/            # 전역 공유 자원
    ├── components/    # 재사용 가능한 컴포넌트
    ├── contexts/      # React Context
    ├── services/      # API 서비스 (gameRankingService)
    ├── lib/          # 설정 및 유틸리티 (supabase)
    └── types/        # 전역 타입 정의
docs/                 # 문서화 파일들
├── ANDROID_RANKING_SETUP.md
└── MANUAL_DB_SETUP.md
```

## 🚦 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.local` 파일을 생성하고 다음 내용을 추가하세요:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 개발 서버 실행
```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 결과를 확인하세요.

## 📝 개발 명령어

```bash
npm run dev      # 개발 서버 시작 (Turbopack)
npm run build    # 프로덕션 빌드
npm start        # 프로덕션 서버 시작
npm run lint     # ESLint 실행
```

## 🗄️ 데이터베이스

Supabase를 사용하여 PostgreSQL 데이터베이스를 관리합니다.

### 마이그레이션 실행
```bash
npx supabase db push
```

### 로컬 개발 환경
```bash
npx supabase start  # 로컬 Supabase 시작
npx supabase stop   # 로컬 Supabase 중지
```

## 🎨 디자인 시스템

- **테마**: 다크 모드 (slate 색상 계열)
- **반응형**: 모바일 퍼스트 디자인
- **게이밍 스타일**: 그라데이션 배경, 호버 효과

## 📚 문서

프로젝트 관련 상세 문서는 `docs/` 폴더에서 확인하세요:

- [Android 랭킹 시스템 설정](./docs/ANDROID_RANKING_SETUP.md)
- [데이터베이스 수동 설정](./docs/MANUAL_DB_SETUP.md)
- [Claude Code 개발 가이드](./CLAUDE.md)

## 👥 팀

오즈코딩스쿨 팀 프로젝트

---

*OZ-GAMERANK - 게이머를 위한, 게이머에 의한 랭킹 서비스* 🎮