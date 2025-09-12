-- 기존 테이블 이름을 game_rank_android로 변경
ALTER TABLE game_rankings RENAME TO game_rank_android;

-- 인덱스 이름도 변경
ALTER INDEX idx_game_rankings_platform RENAME TO idx_game_rank_android_platform;
ALTER INDEX idx_game_rankings_position RENAME TO idx_game_rank_android_position;

-- 트리거 이름도 변경
ALTER TRIGGER update_game_rankings_updated_at ON game_rank_android RENAME TO update_game_rank_android_updated_at; 