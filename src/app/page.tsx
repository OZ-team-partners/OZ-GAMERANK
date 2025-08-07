import GameRankHeader from "./header/header_bar";

export default function Home() {
    return (
        <div>
            <GameRankHeader />
            <main className="min-h-screen bg-slate-900">
                {/* 콘텐츠 추가할 공간 */}
            </main>
        </div>
    );
}
