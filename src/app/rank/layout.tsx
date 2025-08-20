export default function RankLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-900 min-h-screen">  {/* 전체 배경 */}
      <div className="max-w-[1200px] mx-auto p-4">
        {children}
      </div>
    </div>
  );
}