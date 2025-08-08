"use client";

interface NavigationTabsProps {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
  }


  const NavigationTabs: React.FC<NavigationTabsProps> = ({ tabs, activeTab, onTabChange }) => (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
export default NavigationTabs;  