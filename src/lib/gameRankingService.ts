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
          rank_position,
          game_id,
          games!inner (
            id,
            name,
            description,
            image_url,
            release_date,
            genre,
            developer,
            publisher,
            rating,
            review_count,
            created_at,
            updated_at
          )
        `
      )
      .order("rank_position", { ascending: true })
      .limit(limit);

    if (error) {
      console.error("게임 순위 데이터 가져오기 오류:", error);
      throw error;
    }

    // 데이터 구조 변환 (타입 안전하게)
    const transformedData: GameRanking[] =
      (data as GameRankJoinResult[])?.map((item) => ({
        id: item.game_id,
        platform: platform,
        rank_position: item.rank_position,
        game_name: item.games.name,
        game_image_url: item.games.image_url,
        game_description: item.games.description,
        release_date: item.games.release_date,
        genre: item.games.genre,
        developer: item.games.developer,
        publisher: item.games.publisher,
        rating: item.games.rating,
        review_count: item.games.review_count,
        created_at: item.games.created_at,
        updated_at: item.games.updated_at,
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
