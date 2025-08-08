"use client";

import { BTButton } from "@/app/components/buttons/BTButton";
import { inter } from "@/app/fonts";
import { ViewMode, SortOrder } from "@/app/models/common";
import { Search, List, Grid3X3, ChevronDown } from "lucide-react";

import FilterIcon from "@/app/public/filter_black_icon.svg"

// Toolbar Component
interface ToolbarProps {
    selectedCategory: string;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    sortOrder: SortOrder;
    onSortOrderChange: (order: SortOrder) => void;
    showFilter: boolean;
    onFilterToggle: () => void;
  }
  
  const Toolbar: React.FC<ToolbarProps> = ({
    selectedCategory,
    searchTerm,
    onSearchChange,
    viewMode,
    onViewModeChange,
    sortOrder,
    onSortOrderChange,
    // showFilter,
    onFilterToggle
  }) => {




    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col items-start justify-between gap-4">
          <div className="flex items-start space-x-4 w-full">
            <h2 className={`${inter.className} antialiased text-[18px] font-semibold text-[#171E34] whitespace-nowrap`}>
              {selectedCategory}
            </h2>

            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />

              <input
                type="text"
                placeholder="Search within documents..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`${inter.className} antialiased w-full pl-10 pr-4 py-2 text-[13px] font-normal text-[#98989C] bg-[#F9FAFC] rounded-lg`}
              />
            </div>
          </div>

  
          <div className="flex items-end justify-end space-x-3 w-full">
            
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => onViewModeChange('list')}
                className={`px-4 py-2.5 rounded-l-xl ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('grid')}
                className={`px-4 py-2.5 rounded-r-xl ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
  
            <BTButton text="Filter" icon={FilterIcon} type="outline_gray" size="medium_sm" onClick={onFilterToggle}/>
      
  
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
                className="text-sm appearance-none bg-white border-[1px] border-gray-300 rounded-lg px-4 py-2 pr-8"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="size-asc">Size Small-Large</option>
                <option value="size-desc">Size Large-Small</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Toolbar;