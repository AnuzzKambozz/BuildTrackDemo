"use client";
import {inter} from "@/app/fonts"

interface NavigationTabsProps {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
  }


  const NavigationTabs: React.FC<NavigationTabsProps> = ({ tabs, activeTab, onTabChange }) => (
      <div className="">
        <div className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`${inter.className} antialiased pb-2 text-[14px]  transition-colors ${
                              activeTab === tab
                                ? 'text-[#375DED] border-b-2 border-[#375DED] font-semibold'
                                : 'text-gray-600 hover:text-[#272727] font-normal'
                            }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
  );

  
export default NavigationTabs;  