-- game_info_user_comment 테이블 생성
CREATE TABLE game_info_user_comment (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  game_id INTEGER REFERENCES public.rank_game(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  rating SMALLINT CHECK (rating >= 1 AND rating <= 5),
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_comment_user_id ON game_info_user_comment(user_id);
CREATE INDEX idx_comment_game_id ON game_info_user_comment(game_id);

-- RLS (Row Level Security) 활성화
ALTER TABLE game_info_user_comment ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 댓글을 읽을 수 있도록 정책 설정
CREATE POLICY "Anyone can view comments" ON game_info_user_comment
FOR SELECT USING (is_deleted = false);

-- 인증된 사용자는 댓글을 작성할 수 있도록 정책 설정
CREATE POLICY "Authenticated users can create comments" ON game_info_user_comment
FOR INSERT WITH CHECK (auth.role() = '''authenticated''');

-- 사용자는 자신의 댓글만 수정할 수 있도록 정책 설정
CREATE POLICY "Users can update their own comments" ON game_info_user_comment
FOR UPDATE USING (auth.uid() = user_id);

-- 사용자는 자신의 댓글만 (논리적으로) 삭제할 수 있도록 정책 설정
CREATE POLICY "Users can delete their own comments" ON game_info_user_comment
FOR UPDATE USING (auth.uid() = user_id)
WITH CHECK (is_deleted = true);

-- updated_at 자동 업데이트를 위한 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language '''plpgsql''';

-- 트리거 생성
CREATE TRIGGER update_game_info_user_comment_updated_at
    BEFORE UPDATE ON game_info_user_comment
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 테이블 및 컬럼 코멘트 추가
COMMENT ON TABLE game_info_user_comment IS '''게임 상세 정보 페이지의 사용자 리뷰 및 댓글''';
COMMENT ON COLUMN game_info_user_comment.id IS '''댓글 고유 ID''';
COMMENT ON COLUMN game_info_user_comment.user_id IS '''작성자 ID (users 테이블 참조)''';
COMMENT ON COLUMN game_info_user_comment.game_id IS '''게임 ID (rank_game 테이블 참조)''';
COMMENT ON COLUMN game_info_user_comment.content IS '''댓글 내용''';
COMMENT ON COLUMN game_info_user_comment.rating IS '''사용자 평점 (1-5)''';
COMMENT ON COLUMN game_info_user_comment.is_deleted IS '''논리적 삭제 여부''';
COMMENT ON COLUMN game_info_user_comment.created_at IS '''생성 시각''';
COMMENT ON COLUMN game_info_user_comment.updated_at IS '''수정 시각''';
