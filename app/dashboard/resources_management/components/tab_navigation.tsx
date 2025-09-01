"use client";

import { inter } from "@/app/fonts";

// TabNavigation Component
interface TabNavigationProps {
    activeTab: string;
    onTabChange: (tab: 'humanResources' | 'equipment' ) => void;
  }
  
  const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
    const tabs = [
      { key: 'humanResources' as const, label: 'Human Resources' },
      { key: 'equipment' as const, label: 'Equipment' },
      // { key: 'templates' as const, label: 'Templates' }
    ];
  
    return (
      <div className="px-6 ">
        <div className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`${inter.className} antialiased pb-2 text-[14px]  transition-colors ${
                              activeTab === tab.key
                                ? 'text-[#375DED] border-b-2 border-[#375DED] font-semibold'
                                : 'text-gray-600 hover:text-[#272727] font-normal'
                            }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    );
  };
export default TabNavigation;  