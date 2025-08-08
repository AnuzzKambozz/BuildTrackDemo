"use client";

import { CategoryModel } from "@/app/models/common";
import { Search } from "lucide-react";
import useWindowSize from '@/app/hooks/useWindowSize';                 

// Sidebar Component
interface SidebarProps {
    categories: CategoryModel[];
    selectedCategory: string;
    onCategorySelect: (category: string) => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    categoryCounts: Record<string, number>;
    totalDocuments: number;
  }
  
  const Sidebar: React.FC<SidebarProps> = ({
    categories,
    selectedCategory,
    onCategorySelect,
    searchTerm,
    onSearchChange,
    categoryCounts,
    totalDocuments
  }) => {
    const categoryOptions = ['All Documents', ...categories.map(cat => cat.name)];
    const {  height } = useWindowSize();

  
    return (
      <div className="w-64  bg-white rounded-lg p-4 overflow-hidden shadow-sm" style={{ height: height - 260 }}>
        <div className="mb-6">
          <div className="relative ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search documents"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#F9FAFC] pl-10 pr-4 py-2 text-[13px] font-normal text-[#98989C]  rounded-lg "
            />
          </div>
        </div>
  
        <nav className="space-y-3 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 ">
          {categoryOptions.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>{category}</span>
              {category !== 'All Documents' && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  selectedCategory === category
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {categoryCounts[category] || 0}
                </span>
              )}
              {category === 'All Documents' && (
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                  {totalDocuments}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    );
  };
export default Sidebar;  