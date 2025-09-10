-- 기존 rank_game 테이블 삭제 (있다면)
DROP TABLE IF EXISTS rank_game CASCADE;

-- rank_game 테이블 생성
CREATE TABLE rank_game (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(50) NOT NULL,
  game_title VARCHAR(200) NOT NULL,
  game_subtitle VARCHAR(200),
  image_url TEXT,
  rank INTEGER NOT NULL,
  update_when TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_rank_game_platform ON rank_game(platform);
CREATE INDEX idx_rank_game_rank ON rank_game(rank);
CREATE INDEX idx_rank_game_platform_rank ON rank_game(platform, rank);
CREATE INDEX idx_rank_game_update_when ON rank_game(update_when);

-- RLS (Row Level Security) 활성화
ALTER TABLE rank_game ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 랭킹 데이터를 읽을 수 있도록 정책 설정
CREATE POLICY "Anyone can view ranking data" ON rank_game 
FOR SELECT USING (true);

-- 서비스 역할로 랭킹 데이터를 삽입/업데이트/삭제할 수 있도록 정책 설정
CREATE POLICY "Service role can manage ranking data" ON rank_game 
FOR ALL USING (true);

-- 또는 인증된 사용자만 랭킹 데이터를 삽입/업데이트/삭제할 수 있도록 정책 설정
-- CREATE POLICY "Authenticated users can manage ranking data" ON rank_game 
-- FOR ALL USING (auth.role() = 'authenticated');

-- 테이블에 대한 코멘트 추가
COMMENT ON TABLE rank_game IS '게임 랭킹 데이터를 저장하는 테이블';
COMMENT ON COLUMN rank_game.id IS '랭킹 데이터 고유 ID (Primary Key)';
COMMENT ON COLUMN rank_game.platform IS '플랫폼 (nintendo, steam, android, ios 등)';
COMMENT ON COLUMN rank_game.game_title IS '게임 제목';
COMMENT ON COLUMN rank_game.game_subtitle IS '게임 부제목 또는 개발사 정보';
COMMENT ON COLUMN rank_game.image_url IS '게임 대표 이미지의 원격 URL';
COMMENT ON COLUMN rank_game.rank IS '랭킹 순위';
COMMENT ON COLUMN rank_game.update_when IS '데이터 업데이트 시각 (TIMESTAMP WITH TIME ZONE)';