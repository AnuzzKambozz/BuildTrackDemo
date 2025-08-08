"use client";


// components/TabNavigation.tsx
import React from 'react';
import { TabConfig } from '../types/client-portal';

interface TabNavigationProps {
  tabs: TabConfig[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'primary' | 'secondary';
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'primary'
}) => {
  const baseClasses = "flex space-x-8 overflow-x-auto";
  const tabBaseClasses = "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200";
  
  const getTabClasses = (tabId: string, isDefault?: boolean) => {
    const isActive = isDefault || activeTab === tabId;
    
    if (variant === 'secondary') {
      return `${tabBaseClasses} ${
        isActive
          ? 'border-blue-500 text-blue-600 bg-blue-50 px-4 py-2 rounded-t-lg border-b-0'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`;
    }
    
    return `${tabBaseClasses} ${
      isActive
        ? 'border-blue-500 text-blue-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`;
  };

  return (
    <nav className={baseClasses}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={getTabClasses(tab.id, tab.isActive)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};