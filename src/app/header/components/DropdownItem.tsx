import Link from "next/link";

interface DropdownItemProps {
  title: string;
  description: string;
  path: string;
  onClick?: () => void;
  isLast?: boolean;
}

const DropdownItem = ({
  title,
  description,
  path,
  onClick,
  isLast = false,
}: DropdownItemProps) => {
  const handleClick = () => {
    // 드롭다운 닫기 함수 실행
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      href={path}
      style={{ display: "block", marginBottom: isLast ? "0" : "8px" }}
    >
      <div
        onClick={handleClick}
        className="group relative p-4 rounded-xl bg-slate-800/50 hover:bg-gradient-to-r hover:from-purple-900/30 hover:to-indigo-900/30 
                   transition-all duration-300 border border-transparent hover:border-purple-500/40 cursor-pointer
                   hover:shadow-lg hover:shadow-purple-500/10 backdrop-blur-sm hover:translate-x-1"
      >
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h4 className="font-bold text-white group-hover:text-purple-300 transition-colors text-base mb-1">
              {title}
            </h4>
            <p className="text-sm text-slate-400 group-hover:text-slate-300 leading-relaxed transition-colors">
              {description}
            </p>
          </div>
          
          {/* 화살표 아이콘 */}
          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DropdownItem;