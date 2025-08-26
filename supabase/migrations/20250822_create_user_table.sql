-- User 테이블 생성
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500),
  join_date DATE DEFAULT CURRENT_DATE,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);

-- updated_at 자동 업데이트를 위한 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_at 트리거 생성
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 테이블에 대한 코멘트 추가
COMMENT ON TABLE users IS '사용자 정보를 저장하는 테이블';
COMMENT ON COLUMN users.user_id IS '사용자 고유 ID (Primary Key)';
COMMENT ON COLUMN users.username IS '사용자명 (최대 50자)';
COMMENT ON COLUMN users.email IS '이메일 주소 (유니크)';
COMMENT ON COLUMN users.password_hash IS '암호화된 비밀번호';
COMMENT ON COLUMN users.avatar_url IS '프로필 이미지 URL';
COMMENT ON COLUMN users.join_date IS '가입일';
COMMENT ON COLUMN users.role IS '사용자 권한 (user, admin, moderator)';
COMMENT ON COLUMN users.created_at IS '생성일시';
COMMENT ON COLUMN users.updated_at IS '수정일시';
COMMENT ON COLUMN users.deleted_at IS '탈퇴일시 (소프트 삭제)';