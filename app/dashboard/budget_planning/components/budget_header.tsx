"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { inter } from '@/app/fonts';

interface BudgetHeaderProps {
  title?: string;
  subtitle?: string;
  selectedProject: string;
  onProjectChange: (project: string) => void;
  projects?: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs?: string[];
}

const BudgetHeader: React.FC<BudgetHeaderProps> = ({ 
  title = "Budget Planning", 
  subtitle = "Lorem Ipsum is a dummy text",
  selectedProject,
  onProjectChange,
  projects = ["Spethman Renovation", "Downtown Office", "Warehouse Project"],
  activeTab,
  onTabChange,
  tabs = ['Budget Planning', 'Cost Tracking', 'Invoices', 'Reports']
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 pt-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`${inter.className} antialiased text-[#171E34] font-semibold text-[24px] `}>{title}</h1>
          <p className={`${inter.className} antialiased text-[#525252] font-medium text-[14px] mt-1 `}>{subtitle}</p>
        </div>
        <div className="relative">
          <select 
            value={selectedProject}
            onChange={(e) => onProjectChange(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none "
          >
            {projects.map((project) => (
              <option key={project} value={project}>{project}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-8 mt-6">
        {tabs.map((tab) => (
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
};

export default BudgetHeader;