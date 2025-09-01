"use client";

import React from "react";
import Image from "next/image";
import { Post } from "@/shared/data/dummyData";

interface PostListProps {
  posts: Post[];
  onEditPost: (post: Post) => void;
  onDeletePost: (id: number) => void;
}

export default function PostList({ posts, onEditPost, onDeletePost }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 pt-1.5">
      {posts.map((post) => (
        <div key={post.id}>
          <div className="flex items-center gap-3 p-3 px-2 hover:bg-slate-800 transition-colors cursor-pointer">
            <div className="w-[42px] h-[42px] rounded-md bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-400 font-semibold overflow-hidden">
              {post.imageUrl ? (
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={42}
                  height={42}
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                "Img"
              )}
            </div>
            <div
              className="flex items-center gap-3 flex-1 cursor-pointer"
              onClick={() => onEditPost(post)}
            >
              <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[420px] text-sm">
                {post.title}
              </div>
              <div className="flex-1 opacity-60 ">{post.content}</div>
            </div>
            <div className="w-40 text-right text-slate-400 text-xs">
              {post.createdAt} &nbsp; · &nbsp; 조회수 {post.viewCount}
            </div>
            <div className="flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditPost(post);
                }}
                className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                수정
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeletePost(post.id);
                }}
                className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
          <div className="h-px bg-slate-600 ml-[60px]"></div>
        </div>
      ))}
    </div>
  );
}