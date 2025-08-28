-- 게임 순위 테이블 생성
CREATE TABLE game_rank_android (
    id SERIAL PRIMARY KEY,
    platform VARCHAR(50) NOT NULL, -- 'mobile_ios', 'mobile_android', 'pc_steam', 'pc_online', 'console_nintendo', 'console_playstation'
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

-- 인덱스 생성
CREATE INDEX idx_game_rank_android_platform ON game_rank_android(platform);
CREATE INDEX idx_game_rank_android_position ON game_rank_android(rank_position);

-- 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_game_rank_android_updated_at 
    BEFORE UPDATE ON game_rank_android 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 샘플 데이터 삽입 (예시)
INSERT INTO game_rank_android (platform, rank_position, game_name, game_image_url, game_description, release_date, genre, developer, publisher, rating, review_count) VALUES
-- Mobile iOS
('mobile_ios', 1, 'Genshin Impact', '/images/mobile/ios/genshin_impact.jpg', '오픈월드 액션 RPG', '2020-09-28', 'RPG', 'miHoYo', 'miHoYo', 4.5, 15000),
('mobile_ios', 2, 'PUBG Mobile', '/images/mobile/ios/pubg_mobile.jpg', '배틀 로얄 슈팅 게임', '2018-03-19', 'Action', 'PUBG Corporation', 'PUBG Corporation', 4.3, 12000),
('mobile_ios', 3, 'Call of Duty Mobile', '/images/mobile/ios/cod_mobile.jpg', 'FPS 모바일 게임', '2019-10-01', 'FPS', 'TiMi Studios', 'Activision', 4.4, 11000),

-- Mobile Android (더 많은 데이터 추가)
('mobile_android', 1, 'Genshin Impact', '/images/mobile/android/genshin_impact.jpg', '오픈월드 액션 RPG', '2020-09-28', 'RPG', 'miHoYo', 'miHoYo', 4.5, 18000),
('mobile_android', 2, 'PUBG Mobile', '/images/mobile/android/pubg_mobile.jpg', '배틀 로얄 슈팅 게임', '2018-03-19', 'Action', 'PUBG Corporation', 'PUBG Corporation', 4.3, 15000),
('mobile_android', 3, 'Free Fire', '/images/mobile/android/free_fire.jpg', '배틀 로얄 게임', '2017-12-04', 'Action', 'Garena', 'Garena', 4.2, 14000),
('mobile_android', 4, 'Call of Duty Mobile', '/images/mobile/android/cod_mobile.jpg', 'FPS 모바일 게임', '2019-10-01', 'FPS', 'TiMi Studios', 'Activision', 4.4, 13000),
('mobile_android', 5, 'Mobile Legends: Bang Bang', '/images/mobile/android/mlbb.jpg', 'MOBA 모바일 게임', '2016-07-14', 'MOBA', 'Moonton', 'Moonton', 4.1, 12000),
('mobile_android', 6, 'Arena of Valor', '/images/mobile/android/aov.jpg', 'MOBA 게임', '2016-10-14', 'MOBA', 'TiMi Studios', 'Tencent', 4.0, 11000),
('mobile_android', 7, 'Clash of Clans', '/images/mobile/android/coc.jpg', '전략 시뮬레이션 게임', '2012-08-02', 'Strategy', 'Supercell', 'Supercell', 4.6, 10000),
('mobile_android', 8, 'Clash Royale', '/images/mobile/android/cr.jpg', '실시간 전략 게임', '2016-03-02', 'Strategy', 'Supercell', 'Supercell', 4.5, 9500),
('mobile_android', 9, 'Brawl Stars', '/images/mobile/android/bs.jpg', '액션 슈팅 게임', '2018-12-12', 'Action', 'Supercell', 'Supercell', 4.4, 9000),
('mobile_android', 10, 'Subway Surfers', '/images/mobile/android/subway.jpg', '무한 러닝 게임', '2012-05-24', 'Arcade', 'Kiloo', 'Kiloo', 4.3, 8500),
('mobile_android', 11, 'Temple Run 2', '/images/mobile/android/temple_run.jpg', '무한 러닝 게임', '2013-01-16', 'Arcade', 'Imangi Studios', 'Imangi Studios', 4.2, 8000),
('mobile_android', 12, 'Candy Crush Saga', '/images/mobile/android/candy_crush.jpg', '퍼즐 매치 게임', '2012-04-12', 'Puzzle', 'King', 'King', 4.1, 7500),
('mobile_android', 13, 'Fruit Ninja', '/images/mobile/android/fruit_ninja.jpg', '액션 슬라이싱 게임', '2010-04-21', 'Arcade', 'Halfbrick Studios', 'Halfbrick Studios', 4.0, 7000),
('mobile_android', 14, 'Angry Birds', '/images/mobile/android/angry_birds.jpg', '물리 퍼즐 게임', '2009-12-11', 'Puzzle', 'Rovio Entertainment', 'Rovio Entertainment', 4.3, 6500),
('mobile_android', 15, 'Minecraft', '/images/mobile/android/minecraft.jpg', '샌드박스 게임', '2011-11-18', 'Adventure', 'Mojang Studios', 'Microsoft', 4.4, 6000),

-- PC Steam
('pc_steam', 1, 'Counter-Strike 2', '/images/pc/steam/cs2.jpg', 'FPS 팀 기반 전술 슈팅', '2023-09-27', 'FPS', 'Valve', 'Valve', 4.6, 25000),
('pc_steam', 2, 'Dota 2', '/images/pc/steam/dota2.jpg', 'MOBA 게임', '2013-07-09', 'MOBA', 'Valve', 'Valve', 4.5, 22000),
('pc_steam', 3, 'PUBG: BATTLEGROUNDS', '/images/pc/steam/pubg.jpg', '배틀 로얄 게임', '2017-12-21', 'Action', 'PUBG Studios', 'Krafton', 4.4, 20000),

-- PC Online
('pc_online', 1, 'League of Legends', '/images/pc/online/lol.jpg', 'MOBA 게임', '2009-10-27', 'MOBA', 'Riot Games', 'Riot Games', 4.7, 30000),
('pc_online', 2, 'Overwatch 2', '/images/pc/online/overwatch2.jpg', '팀 기반 FPS', '2022-10-04', 'FPS', 'Blizzard Entertainment', 'Blizzard Entertainment', 4.3, 18000),
('pc_online', 3, 'Valorant', '/images/pc/online/valorant.jpg', '전술적 FPS', '2020-06-02', 'FPS', 'Riot Games', 'Riot Games', 4.5, 20000),

-- Console Nintendo
('console_nintendo', 1, 'The Legend of Zelda: Breath of the Wild', '/images/console/nintendo/zelda_botw.jpg', '오픈월드 액션 어드벤처', '2017-03-03', 'Adventure', 'Nintendo', 'Nintendo', 4.9, 5000),
('console_nintendo', 2, 'Super Mario Odyssey', '/images/console/nintendo/mario_odyssey.jpg', '3D 플랫폼 게임', '2017-10-27', 'Platformer', 'Nintendo', 'Nintendo', 4.8, 4500),
('console_nintendo', 3, 'Animal Crossing: New Horizons', '/images/console/nintendo/animal_crossing.jpg', '생활 시뮬레이션', '2020-03-20', 'Simulation', 'Nintendo', 'Nintendo', 4.7, 4000),

-- Console PlayStation
('console_playstation', 1, 'God of War Ragnarök', '/images/console/playstation/god_of_war.jpg', '액션 어드벤처', '2022-11-09', 'Action', 'Santa Monica Studio', 'Sony Interactive Entertainment', 4.9, 3500),
('console_playstation', 2, 'Spider-Man 2', '/images/console/playstation/spiderman2.jpg', '액션 어드벤처', '2023-10-20', 'Action', 'Insomniac Games', 'Sony Interactive Entertainment', 4.8, 3000),
('console_playstation', 3, 'Final Fantasy XVI', '/images/console/playstation/ff16.jpg', '액션 RPG', '2023-06-22', 'RPG', 'Square Enix', 'Square Enix', 4.7, 2800); 