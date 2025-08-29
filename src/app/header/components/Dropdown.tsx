import React from 'react';
import { ChevronDown } from 'lucide-react';
import { dropdownStyles, buttonVariants } from '../styles/dropdownStyles';
import { useDropdown } from '../hooks/useDropdown';
import { ButtonVariant, DropdownOption } from '../types';
import DropdownItem from './DropdownItem';

interface DropdownProps {
  label: string;
  icon: React.ReactNode;
  options: DropdownOption[];
  variant?: ButtonVariant;
  ariaLabel: string;
  position?: 'left' | 'right';
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  icon,
  options,
  variant = 'primary',
  ariaLabel,
  position = 'left'
}) => {
  const { isOpen, toggle, close } = useDropdown();

  const positionClass = position === 'right' ? 'right-0' : 'left-0';

  return (
    <div className="relative" data-dropdown>
      <button
        onClick={toggle}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        className={`${dropdownStyles.buttonBase} ${buttonVariants[variant]}`}
      >
        {icon}
        <span>{label}</span>
        <ChevronDown
          size={14}
          className={`${dropdownStyles.chevron} ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`${dropdownStyles.container} ${positionClass}`}
          data-dropdown
        >
          <div className={dropdownStyles.content}>
            <div className={dropdownStyles.padding}>
              {options.map((option, index) => (
                <DropdownItem
                  key={option.name}
                  title={option.name}
                  description={option.description}
                  path={option.path}
                  isLast={index === options.length - 1}
                  onClick={close}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;