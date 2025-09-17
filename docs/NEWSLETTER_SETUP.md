# 뉴스레터 발송 기능 설정 가이드

## 개요

이 가이드는 Supabase users 테이블의 이메일 주소로 뉴스레터를 발송하는 기능의 설정 방법을 설명합니다.

## 기능

- ✅ 테스트 이메일 발송
- ✅ 모든 등록 사용자에게 뉴스레터 발송
- ✅ 사용자 통계 조회
- ✅ 발송 결과 상세 확인
- ✅ 반응형 관리자 인터페이스

## 파일 구조

```
src/
├── app/
│   ├── api/send-newsletter/route.ts    # 뉴스레터 발송 API
│   └── admin/newsletter/page.tsx       # 관리자 페이지
├── hooks/
│   └── useNewsletter.ts                # 뉴스레터 Hook
└── lib/
    └── newsletterService.ts            # 뉴스레터 서비스
```

## 환경 변수 설정

`.env.local` 파일에 다음 환경변수들을 설정해주세요:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# 이메일 발송 설정 (Gmail 예시)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# 사이트 URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Gmail 설정 방법

1. **2단계 인증 활성화**

   - Google 계정 설정 → 보안 → 2단계 인증 활성화

2. **앱 비밀번호 생성**
   - Google 계정 설정 → 보안 → 앱 비밀번호
   - "메일" 선택 후 "기타" 입력
   - 생성된 16자리 비밀번호를 `EMAIL_PASSWORD`에 설정

## 사용 방법

### 1. 관리자 페이지 접근

```
http://localhost:3000/admin/newsletter
```

### 2. 테스트 이메일 발송

1. "테스트 이메일 발송" 섹션에서 이메일 주소 입력
2. "테스트 발송" 버튼 클릭
3. 발송 결과 확인

### 3. 전체 사용자 발송

1. "전체 사용자 발송" 섹션에서 "전체 발송" 버튼 클릭
2. 확인 대화상자에서 "확인" 클릭
3. 발송 진행 상황 및 결과 확인

## API 엔드포인트

### POST /api/send-newsletter

뉴스레터 발송 APIIIIIII

**요청 본문:**

```json
{
  "testEmail": "test@example.com" // 테스트 이메일 (선택사항)
}
```

또는

```json
{
  "sendToAll": true // 모든 사용자에게 발송
}
```

**응답:**

```json
{
  "message": "뉴스레터 발송 완료: 성공 5건, 실패 0건",
  "results": [
    {
      "email": "user@example.com",
      "success": true,
      "messageId": "message-id"
    }
  ],
  "totalSent": 5,
  "totalFailed": 0
}
```

## 이메일 템플릿

뉴스레터는 HTML 형식으로 발송되며, 다음 내용을 포함합니다:

- 헤더 (제목, 발행일, 호수)
- 메인 콘텐츠 (게임 뉴스)
- 하이라이트 박스 (주요 내용)
- CTA 버튼 (전체 기사 보기)
- 푸터 (저작권, 구독 해지)

## 보안 고려사항

1. **서비스 역할 키**: Supabase 서비스 역할 키는 서버 사이드에서만 사용
2. **이메일 인증**: Gmail 앱 비밀번호 사용으로 보안 강화
3. **RLS 정책**: Supabase Row Level Security 정책 준수
4. **환경변수**: 민감한 정보는 환경변수로 관리

## 문제 해결

### 이메일 발송 실패

1. **환경변수 확인**: 모든 필수 환경변수가 설정되었는지 확인
2. **Gmail 설정**: 2단계 인증 및 앱 비밀번호 설정 확인
3. **Supabase 권한**: 서비스 역할 키 권한 확인
4. **네트워크**: 방화벽 및 네트워크 연결 확인

### 사용자 데이터 조회 실패

1. **Supabase 연결**: Supabase URL 및 키 확인
2. **RLS 정책**: Row Level Security 정책 확인
3. **권한**: 서비스 역할 키 권한 확인

## 확장 가능성

- 이메일 템플릿 커스터마이징
- 발송 스케줄링
- 구독 관리 기능
- 이메일 통계 및 분석
- A/B 테스트 기능

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
