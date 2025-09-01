"use client";

import { Search } from "lucide-react";
import { FilterState } from "../types/procurement";
import { inter } from "@/app/fonts";
import React from "react";
import FilterDropdown from "@/app/components/dropdowns/title_dropdown";


// FilterBar Component
interface FilterBarProps {
    filters: FilterState;
    onFiltersChange: (filters: Partial<FilterState>) => void;
  }
  
  const FilterBar: React.FC<FilterBarProps> = ({ filters, onFiltersChange }) => {

    // const [statusFilter, setStatusFilter] = useState('All');
    // const [sortFilter, setSortFilter] = useState('Newest');
    // const [dateFilter, setDateFilter] = useState('All');
    // const [typeFilter, setTypeFilter] = useState('All');


    

    const statusOptions = ['All', 'Draft', 'Pending Approval', 'Approved', 'Ordered', 'Received'];



    return (
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md  bg-[#F9FAFC]">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                type="text"
                placeholder="Search procurement order..."
                value={filters.searchTerm}
                onChange={(e) => onFiltersChange({ searchTerm: e.target.value })}
                className={`${inter.className} antialiased font-normal text-[13px] text-[#98989C] h-[42px]  w-full pl-12 pr-4 py-3 bg-[#F9FAFC] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
            </div>

            <div className="min-w-[150px]">
            <FilterDropdown
                    label="Status "
                    value={filters.statusFilter}
                    options={statusOptions}
                    onChange={(value) => onFiltersChange({ statusFilter: value as FilterState['statusFilter'] })}
                  />
            </div>
            

        </div>
      </div>
    );
  };
export default FilterBar;





