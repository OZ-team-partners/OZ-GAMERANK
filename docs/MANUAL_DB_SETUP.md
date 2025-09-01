# Supabase 데이터베이스 수동 설정 가이드

현재 users 테이블이 Supabase Auth와 호환되지 않는 구조로 생성되어 있습니다.
아래 단계를 따라 Supabase 대시보드에서 직접 수정해주세요.

## 1. Supabase 대시보드 접속
- https://supabase.com/dashboard
- 프로젝트: tcrmxwxtocryjvecdgib

## 2. 기존 users 테이블 삭제
```sql
DROP TABLE IF EXISTS users CASCADE;
```

## 3. 새로운 users 테이블 생성
```sql
-- Supabase Auth와 호환되는 users 테이블 생성
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  full_name TEXT,
  avatar_url VARCHAR(500),
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 데이터만 읽기 가능
CREATE POLICY "Users can view own profile" ON users 
FOR SELECT USING (auth.uid() = id);

-- 사용자는 자신의 데이터만 업데이트 가능
CREATE POLICY "Users can update own profile" ON users 
FOR UPDATE USING (auth.uid() = id);

-- 새 사용자가 회원가입할 때 자동으로 users 테이블에 레코드 생성
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, username, full_name, avatar_url)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Auth 테이블의 새 사용자 생성 시 트리거 실행
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- updated_at 자동 업데이트를 위한 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 인덱스 생성
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
```

## 4. 실행 순서
1. Supabase Dashboard → SQL Editor
2. 위의 SQL을 차례대로 실행
3. 회원가입 테스트

## 5. 확인 방법
- 회원가입 후 Table Editor에서 users 테이블 확인
- auth.users와 public.users 모두에 데이터가 있는지 확인

## 주요 변경점
- `user_id SERIAL` → `id UUID` (Supabase Auth 표준)
- `auth.users` 테이블과 Foreign Key 연결
- RLS 정책으로 보안 강화
- 자동 트리거로 사용자 생성 시 프로필 자동 생성