// components/Header.tsx
import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useHeader } from "../../context/HeaderContext";
import { Breadcrumb } from '../../types/header.type';
// import Image from 'next/image';
import { inter } from '@/app/fonts';
import Avatar from '../Avatar/Avatar';

export const Header: React.FC = () => {
  const {
    title,
    showSearch,
    searchPlaceholder,
    breadcrumbs,
    userImage,
    userName,
    userEmail,
    notificationCount,
    searchValue,
    isUserMenuOpen,
    setIsUserMenuOpen,
    handleSearchChange,
    onNotificationClick,
    onUserMenuClick
  } = useHeader();

  
  

  return (
    <header className="px-6 py-4 bg-[#f6f6f6]">
      <div className="flex items-start justify-between">
        {/* Left Section - Page Title and Breadcrumbs */}
        <div className="flex flex-col space-y-1 gap-2">
          {/* Page Title */}
          <h1 className={`${inter.className} antialiased text-[26px] font-bold text-[#252E50]`}>{title}</h1>
          
          {/* Breadcrumbs */}
          <nav className={`${inter.className} antialiased text-[14px] font-medium flex items-center space-x-2 text-sm text-gray-500`}>
            {/* Render Breadcrumbs */}
            {breadcrumbs.map((crumb: Breadcrumb, index: number) => (
              <React.Fragment key={index}>
                <a 
                  href={crumb.href} 
                  className={`hover:text-gray-700 transition-colors flex items-center ${
                    index === breadcrumbs.length - 1 ? 'text-primaryColor' : ''
                  }`}
                  onClick={crumb.href === '' ? (e) => e.preventDefault() : undefined}
                >
                  {crumb.label}
                </a>
                {index < breadcrumbs.length - 1 && (
                  <span className="text-gray-700 font-medium">›</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Center Section - Search Bar */}
        {showSearch && (
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative top-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={handleSearchChange}
                className={`${inter.className} antialiased text-[13px] font-normal text-[#98989C] w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white hover:bg-white transition-colors`}
              />
            </div>
          </div>
        )}

        {/* Right Section - Notifications and User Menu */}
        <div className="flex items-start space-x-3 flex-shrink-0">
          {/* Notification Bell */}
          <button
            onClick={onNotificationClick}
            className="relative p-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 " />
            {notificationCount > 0 && (
              <span className="absolute -top-[-3] -right-[-1] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setIsUserMenuOpen(!isUserMenuOpen);
                onUserMenuClick();
              }}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              type="button"
              aria-label="User menu"
            >
              <Avatar src={userImage} alt={userName} size="sm" />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">{userName}</div>
                <div className="text-xs text-gray-500">{userEmail}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="text-sm font-medium text-gray-900">{userName}</div>
                  <div className="text-xs text-gray-500">{userEmail}</div>
                </div>
                <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </a>
                <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </a>
                <div className="border-t border-gray-100 mt-2">
                  <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </div>
          </div>

      </div>
    </header>
  );
};