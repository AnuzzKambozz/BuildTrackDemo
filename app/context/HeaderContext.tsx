import React, { createContext, useContext, useState, useCallback } from 'react';
import { HeaderContextType, HeaderProviderProps, HeaderConfig } from '@/app/types/header.type';

// Create Header Context
const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

// Header Context Provider Component
export const HeaderProvider: React.FC<HeaderProviderProps> = ({ 
  children,
  defaultTitle = "Project",
  defaultShowSearch = true,
  defaultSearchPlaceholder = "Search project",
  defaultBreadcrumbs = [{ label: "Dashboard", href: "/dashboard" }],
  defaultUserImage = "",
  defaultUserName = "Juleha",
  defaultUserEmail = "julehahaha@gmail.com",
  defaultNotificationCount = 0,
  onSearch = () => {},
  onNotificationClick = () => {},
  onUserMenuClick = () => {}
}) => {
  // Header configuration state
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>({
    title: defaultTitle,
    showSearch: defaultShowSearch,
    searchPlaceholder: defaultSearchPlaceholder,
    breadcrumbs: defaultBreadcrumbs,
    userImage: defaultUserImage,
    userName: defaultUserName,
    userEmail: defaultUserEmail,
    notificationCount: defaultNotificationCount
  });

  // Local component state
  const [searchValue, setSearchValue] = useState<string>('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  // Update header configuration
  const updateHeaderConfig = useCallback((newConfig: Partial<HeaderConfig>): void => {
    setHeaderConfig(prev => ({ ...prev, ...newConfig }));
  }, []); 

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  // Context value object
  const contextValue: HeaderContextType = {
    ...headerConfig,
    searchValue,
    isUserMenuOpen,
    setSearchValue,
    setIsUserMenuOpen,
    updateHeaderConfig,
    handleSearchChange,
    onNotificationClick,
    onUserMenuClick
  };

  return (
    <HeaderContext.Provider value={contextValue}>
      {children}
    </HeaderContext.Provider>
  );
};

// Custom hook to use Header Context
export const useHeader = (): HeaderContextType => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};

// Hook for updating header configuration
export const useHeaderConfig = () => {
  const { updateHeaderConfig } = useHeader();
  return updateHeaderConfig;
};