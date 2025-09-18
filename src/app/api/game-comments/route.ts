
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET - 특정 게임의 댓글 목록 조회
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const game_id = searchParams.get('game_id');

  if (!game_id) {
    return NextResponse.json({ error: 'game_id is required' }, { status: 400 });
  }

  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase
    .from('game_info_user_comment')
    .select(`
      id,
      content,
      rating,
      created_at,
      users (
        id,
        username,
        avatar_url
      )
    `)
    .eq('game_id', game_id)
    .eq('is_deleted', false)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST - 새 댓글 작성
export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  // 먼저 사용자 세션 정보 확인
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { game_id, content, rating } = await request.json();

  if (!game_id || !content || rating === undefined) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const user_id = session.user.id;

  const { data, error } = await supabase
    .from('game_info_user_comment')
    .insert([
      { user_id, game_id, content, rating }
    ])
    .select();

  if (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
