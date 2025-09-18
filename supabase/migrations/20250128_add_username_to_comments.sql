-- game_info_user_comment 테이블에 username 컬럼 추가
ALTER TABLE game_info_user_comment 
ADD COLUMN username VARCHAR(50);

-- 기존 댓글들의 username 업데이트
UPDATE game_info_user_comment 
SET username = (
  SELECT u.username 
  FROM users u 
  WHERE u.id = game_info_user_comment.user_id
);

-- username 컬럼을 NOT NULL로 변경 (기존 데이터 업데이트 후)
ALTER TABLE game_info_user_comment 
ALTER COLUMN username SET NOT NULL;

-- 인덱스 추가 (성능 최적화)
CREATE INDEX idx_comment_username ON game_info_user_comment(username);

-- 컬럼 코멘트 추가
COMMENT ON COLUMN game_info_user_comment.username IS '댓글 작성자명 (users 테이블에서 복사)';
