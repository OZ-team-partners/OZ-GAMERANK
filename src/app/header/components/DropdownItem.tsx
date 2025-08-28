import React from "react";
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
}: DropdownItemProps) => (
  <Link
    href={path}
    style={{ display: "block", marginBottom: isLast ? "0" : "8px" }}
  >
    <div
      onClick={onClick}
      className="group p-4 rounded-xl hover:bg-slate-50/80 transition-all duration-150 
                       border border-transparent hover:border-slate-200/60 cursor-pointer
                       hover:shadow-md backdrop-blur-sm"
    >
      <div className="flex-1">
        <h4 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors text-base">
          {title}
        </h4>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed font-semibold">
          {description}
        </p>
      </div>
    </div>
  </Link>
);

export default DropdownItem;