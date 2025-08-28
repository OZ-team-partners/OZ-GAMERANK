export interface GameRanking {
  id: number;
  platform: string;
  rank_position: number;
  game_name: string;
  game_image_url: string | null;
  game_description: string | null;
  release_date: string | null;
  genre: string | null;
  developer: string | null;
  publisher: string | null;
  rating: number | null;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export type PlatformType =
  | "mobile_ios"
  | "mobile_android"
  | "pc_steam"
  | "pc_online"
  | "console_nintendo"
  | "console_playstation";

// JOIN 쿼리 결과를 위한 타입 정의
export interface GameRankJoinResult {
  rank_position: number;
  game_id: number;
  games: {
    id: number;
    name: string;
    description: string | null;
    image_url: string | null;
    release_date: string | null;
    genre: string | null;
    developer: string | null;
    publisher: string | null;
    rating: number | null;
    review_count: number;
    created_at: string;
    updated_at: string;
  };
}
