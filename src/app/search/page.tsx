import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/shared/lib/supabase";

type SearchResultGame = {
  id?: number;
  platform?: string | null;
  game_title: string;
  game_subtitle?: string | null;
  image_url?: string | null;
  rank?: number | null;
};

type SearchResultPost = {
  id: number;
  title: string;
  content: string;
  created_at?: string;
};

type CommuPostRow = {
  post_id: number;
  title: string;
  content: string;
  created_at?: string;
  is_deleted: boolean | null;
};

async function fetchResults(query: string) {
  const trimmed = query.trim();
  if (!trimmed) {
    return { games: [], posts: [] } as {
      games: SearchResultGame[];
      posts: SearchResultPost[];
    };
  }

  // rank_game 검색
  const { data: games } = await supabase
    .from("rank_game")
    .select("id, platform, game_title, game_subtitle, image_url, rank")
    .or(`game_title.ilike.%${trimmed}%,game_subtitle.ilike.%${trimmed}%`)
    .limit(20);

  // commu_post 우선, 없으면 posts 테이블 검색
  let posts: SearchResultPost[] = [];
  const { data: commuPosts, error: commuErr } = await supabase
    .from("commu_post")
    .select("post_id, title, content, created_at, is_deleted")
    .or(`title.ilike.%${trimmed}%,content.ilike.%${trimmed}%`)
    .neq("is_deleted", true)
    .order("created_at", { ascending: false })
    .limit(20);

  if (!commuErr && commuPosts) {
    const rows: CommuPostRow[] =
      (commuPosts as unknown as CommuPostRow[]) || [];
    posts = rows
      .filter((p) => p.is_deleted === null || p.is_deleted === false)
      .map((p) => ({
        id: p.post_id,
        title: p.title,
        content: p.content,
        created_at: p.created_at,
      }));
  } else {
    const { data: fallbackPosts } = await supabase
      .from("posts")
      .select("id, title, content, created_at")
      .or(`title.ilike.%${trimmed}%,content.ilike.%${trimmed}%`)
      .limit(20);
    posts = (fallbackPosts || []) as SearchResultPost[];
  }

  return {
    games: (games || []) as SearchResultGame[],
    posts,
  };
}

function ResultSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-slate-200 mb-3">{title}</h2>
      <div className="bg-slate-800/60 border border-slate-200/60 rounded-lg p-4">
        {children}
      </div>
    </section>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const q = (params?.q || "").toString();
  const { games, posts } = await fetchResults(q);

  return (
    <main className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-slate-100 mb-2">검색 결과</h1>
        <p className="text-slate-400 mb-6">검색어: &quot;{q}&quot;</p>

        <Suspense>
          <ResultSection title="게임 랭킹에서 검색">
            {games.length === 0 ? (
              <p className="text-slate-400 text-sm">
                일치하는 게임이 없습니다.
              </p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((g) => (
                  <Link key={g.id} href={`/game_info/${g.id}`}>
                    <li
                      className="flex items-center gap-4 p-4 bg-slate-900/40 rounded border border-slate-700/60 h-full"
                    >
                                            <Image
                        src={g.image_url || "/icon/rank_icon/console1.jpeg"}
                        alt={g.game_title}
                        width={80}
                        height={80}
                        className="object-cover rounded shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-slate-300 font-medium truncate">
                          {g.game_title}
                        </div>
                        {g.game_subtitle ? (
                          <div className="text-slate-500 text-sm truncate">
                            {g.game_subtitle}
                          </div>
                        ) : null}
                        <div className="text-slate-400 text-xs mt-1">
                          {g.platform ? `플랫폼: ${g.platform}` : null}
                          {g.rank ? ` · 랭크: ${g.rank}` : null}
                        </div>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>

            )}
          </ResultSection>

          <ResultSection title="커뮤니티에서 검색">
            {posts.length === 0 ? (
              <p className="text-slate-400 text-sm">
                일치하는 게시글이 없습니다.
              </p>
            ) : (
              <ul className="space-y-4">
                {posts.map((p) => (
                  <Link key={p.id} href={`/community?post=${p.id}`}>
                    <li
                      className="p-4 bg-slate-900/40 rounded border border-slate-700/60 cursor-pointer hover:bg-slate-800/80"
                    >
                      <div className="text-slate-200 font-semibold truncate">
                        {p.title}
                      </div>
                      <div className="text-slate-500 text-sm line-clamp-2">
                        {p.content}
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </ResultSection>
        </Suspense>
      </div>
    </main>
  );
}
