export interface DropdownOption {
  name: string;
  path: string;
  description: string;
}

export interface Category {
  name: string;
  icon: React.ReactNode;
  path?: string;
}

export interface DropdownItemProps {
  title: string;
  description: string;
  path: string;
  onClick?: () => void;
  isLast?: boolean;
}

export type DropdownState = {
  pc: boolean;
  console: boolean;
  mobile: boolean;
  newsletter: boolean;
  profile: boolean;
};

export type ButtonVariant = 'primary' | 'success';

export interface UserProfile {
  id: string;
  email: string;
  username?: string;
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
}