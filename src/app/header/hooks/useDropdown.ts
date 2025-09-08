import { useState, useEffect, useCallback } from 'react';

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  // ESC 키로 드롭다운 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  // 외부 클릭시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // 드롭다운 관련 요소들을 찾기 (클래스명 기반으로 변경)
      const isDropdownButton = target.closest('.dropdown-button');
      const isDropdownContent = target.closest('.dropdown-content');
      
      // 버튼이나 드롭다운 내용 클릭이 아닌 경우에만 닫기
      if (!isDropdownButton && !isDropdownContent && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // 더 긴 딜레이로 이벤트 충돌 방지
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside, { capture: true });
      }, 150);
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside, { capture: true });
      };
    }
  }, [isOpen]);

  return {
    isOpen,
    toggle,
    close,
    open,
  };
};