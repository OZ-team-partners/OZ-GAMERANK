"use client";

import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = "선택하세요",
  className = ""
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* 드롭다운 헤더 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gradient-to-r from-slate-800/90 to-slate-800/70 border border-slate-600/50 text-slate-200 text-sm
          pl-4 pr-10 py-2.5 rounded-xl backdrop-blur-sm shadow-lg shadow-slate-900/50
          hover:from-slate-700/90 hover:to-slate-700/70 hover:border-slate-500/50
          focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400/50
          transition-all duration-200 cursor-pointer font-medium
          flex items-center justify-between"
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-orange-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 드롭다운 리스트 */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-slate-800/95 border border-slate-600/50 rounded-xl shadow-2xl shadow-black/50 backdrop-blur-md overflow-hidden">
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-150
                  ${value === option.value
                    ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 font-medium border-l-2 border-orange-400'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }
                  flex items-center justify-between group
                `}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}