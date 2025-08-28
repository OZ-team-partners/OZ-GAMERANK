import { supabase } from "./supabase";
import {
  GameRanking,
  PlatformType,
  GameRankJoinResult,
} from "../types/gameRanking";

// 테이블 이름 매핑
const getTableName = (platform: PlatformType): string => {
  switch (platform) {
    case "mobile_ios":
      return "game_rank_ios";
    case "mobile_android":
      return "game_rank_android";
    case "pc_steam":
      return "game_rank_steam";
    case "pc_online":
      return "game_rank_online";
    case "console_nintendo":
      return "game_rank_nintendo";
    case "console_playstation":
      return "game_rank_playstation";
    default:
      return "game_rank_android"; // 기본값
  }
};

// JOIN을 사용하는 게임 순위 가져오기 함수
export async function getGameRankingsWithJoin(
  platform: PlatformType,
  limit: number = 100
): Promise<GameRanking[]> {
  try {
    const tableName = getTableName(platform);

    // JOIN 쿼리로 게임 정보와 순위 정보를 함께 가져오기
    const { data, error } = await supabase
      .from(tableName)
      .select(
        `
          ranking_date,
          rank,
          score,
          game_id,
          game!inner (
            id,
            title,
            description,
            main_image_url,
            trailer_url,
            age_rating,
            genre,
            platform,
            release_date,
            created_at,
            updated_at
          )
        `
      )
      .order("rank", { ascending: true })
      .limit(limit);

    if (error) {
      console.error("게임 순위 데이터 가져오기 오류:", error);
      throw error;
    }

    // 데이터 구조 변환 (타입 안전하게)
    const transformedData: GameRanking[] =
      (data as unknown as GameRankJoinResult[])?.map((item) => ({
        id: item.game_id,
        platform: platform,
        rank_position: item.rank_position,
        game_name: Array.isArray(item.game)
          ? item.game[0]?.title
          : item.game.title,
        game_image_url: item.game.main_image_url,
        game_description: item.game.description,
        release_date: item.game.release_date,
        genre: item.game.genre,
        developer: null, // game 테이블에 developer 컬럼이 없음
        publisher: null, // game 테이블에 publisher 컬럼이 없음
        rating: null, // game 테이블에 rating 컬럼이 없음
        review_count: 0, // game 테이블에 review_count 컬럼이 없음
        created_at: item.game.created_at,
        updated_at: item.game.updated_at,
      })) || [];

    console.log("변환된 데이터:", transformedData);
    return transformedData;
  } catch (error) {
    console.error("게임 순위 데이터 가져오기 실패:", error);
    return [];
  }
}

// 기존 함수들 (단일 테이블용)
export async function getGameRankings(
  platform: PlatformType,
  limit: number = 100
): Promise<GameRanking[]> {
  try {
    const tableName = getTableName(platform);
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .order("rank_position", { ascending: true })
      .limit(limit);

    if (error) {
      console.error("게임 순위 데이터 가져오기 오류:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("게임 순위 데이터 가져오기 실패:", error);
    return [];
  }
}

export async function getGameRankingByPosition(
  platform: PlatformType,
  position: number
): Promise<GameRanking | null> {
  try {
    const tableName = getTableName(platform);
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("rank_position", position)
      .single();

    if (error) {
      console.error("특정 순위 게임 데이터 가져오기 오류:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("특정 순위 게임 데이터 가져오기 실패:", error);
    return null;
  }
}

export async function getTopGames(
  platform: PlatformType,
  limit: number = 10
): Promise<GameRanking[]> {
  return getGameRankings(platform, limit);
}

// iOS 전용 함수 (필요시 사용)
export async function getIOSGameRankings(
  limit: number = 100
): Promise<GameRanking[]> {
  return getGameRankings("mobile_ios", limit);
}

// Nintendo 전용 함수 (JOIN 사용)
export async function getNintendoGameRankings(
  limit: number = 100
): Promise<GameRanking[]> {
  return getGameRankingsWithJoin("console_nintendo", limit);
}
