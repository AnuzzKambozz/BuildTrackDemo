import { ReactNode } from 'react';

// Breadcrumb interface
export interface Breadcrumb {
  label: string;
  href: string;
}

// Header configuration interface
export interface HeaderConfig {
  title: string;
  showSearch: boolean;
  searchPlaceholder: string;
  breadcrumbs: Breadcrumb[];
  userImage: string;
  userName: string;
  userEmail: string;
  notificationCount: number;
}

// Header context type extending configuration
export interface HeaderContextType extends HeaderConfig {
  searchValue: string;
  isUserMenuOpen: boolean;
  setSearchValue: (value: string) => void;
  setIsUserMenuOpen: (isOpen: boolean) => void;
  updateHeaderConfig: (config: Partial<HeaderConfig>) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNotificationClick: () => void;
  onUserMenuClick: () => void;
}

// Header provider props interface
export interface HeaderProviderProps {
  children: ReactNode;
  defaultTitle?: string;
  defaultShowSearch?: boolean;
  defaultSearchPlaceholder?: string;
  defaultBreadcrumbs?: Breadcrumb[];
  defaultUserImage?: string;
  defaultUserName?: string;
  defaultUserEmail?: string;
  defaultNotificationCount?: number;
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
  onUserMenuClick?: () => void;
}