// components/FilterControls.tsx
"use client";

import React from 'react';
import { Search } from 'lucide-react';
import { FilterControlsProps } from '../types/inventory';
import FilterDropdown from '@/app/components/dropdowns/title_dropdown';
import { inter } from '@/app/fonts';
import DownloadIcon from '@/app/public/export_white_icon.svg';
import { BTButton } from '@/app/components/buttons/BTButton';

const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm,
  selectedCategory,
  selectedStatus,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  // onAddItem,
  onExport
}) => {
  const categories = ['All Categories', 'Materials', 'Tools', 'Safety', 'Equipment', 'Hardware'];
  const statuses = ['All Status', 'In Stock', 'Low Stock', 'Out of Stock'];

  return (
    // <div className="flex flex-col sm:flex-row gap-4 mb-6">
    //   <div className="flex-1 relative">
    //     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
    //     <input
    //       type="text"
    //       placeholder="Search inventory..."
    //       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //       value={searchTerm}
    //       onChange={(e) => onSearchChange(e.target.value)}
    //     />
    //   </div>

    //   <select
    //     className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //     value={selectedCategory}
    //     onChange={(e) => onCategoryChange(e.target.value)}
    //   >
    //     {categories.map(category => (
    //       <option key={category} value={category}>{category}</option>
    //     ))}
    //   </select>

    //   <select
    //     className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //     value={selectedStatus}
    //     onChange={(e) => onStatusChange(e.target.value)}
    //   >
    //     {statuses.map(status => (
    //       <option key={status} value={status}>{status}</option>
    //     ))}
    //   </select>

    //   <button 
    //     onClick={onExport}
    //     className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
    //   >
    //     <Download className="h-4 w-4" />
    //     Export
    //   </button>
    // </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
    <div className="p-6">
      <div className="flex items-center justify-between gap-6">
        <div className="relative flex-1 max-w-md  bg-[#F9FAFC]">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search inventory item..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`${inter.className} antialiased font-normal text-[13px] text-[#98989C] h-[42px]  w-full pl-12 pr-4 py-3 bg-[#F9FAFC] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>
        
        <div className="flex gap-3">
          <FilterDropdown
            label="Category"
            value={selectedCategory}
            options={categories}
            onChange={(value) => onCategoryChange(value)}
          />
          <FilterDropdown
            label="Status"
            value={selectedStatus}
            options={statuses}
            onChange={(value) => onStatusChange(value)}
          />

          <BTButton text='Export' icon={DownloadIcon} type='primary' onClick={onExport} size='medium'/>      
         
        </div>
      </div>
    </div>
  </div>
  );
};

export default FilterControls;