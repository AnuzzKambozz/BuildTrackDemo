"use client";

import { Search } from "lucide-react";
import { FilterState } from "../types/change-orders";
import { inter } from "@/app/fonts";
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


    

    const statusOptions = ['All', 'Pending', 'Approved', 'Rejected'];
    const dateOptions = ['All', 'This Week', 'This Month', 'Last 3 Months'];
    const sortOptions = ['Newest', 'Oldest', 'Cost High to Low', 'Cost Low to High'];   
    const typeOptions = ['All', 'Client', 'Required'];


    return (
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 max-w-md  bg-[#F9FAFC]">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                type="text"
                placeholder="Search Suppliers"
                value={filters.searchTerm}
                onChange={(e) => onFiltersChange({ searchTerm: e.target.value })}
                className={`${inter.className} antialiased font-normal text-[13px] text-[#98989C] h-[42px]  w-full pl-12 pr-4 py-3 bg-[#F9FAFC] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
            </div>

            
            <FilterDropdown
                    label="Status :"
                    value={filters.statusFilter}
                    options={statusOptions}
                    onChange={(value) => onFiltersChange({ statusFilter: value as FilterState['statusFilter'] })}
                  />

            <FilterDropdown
                    label="Type :"
                    value={filters.typeFilter}
                    options={typeOptions}
                    onChange={(value) => onFiltersChange({ typeFilter: value as FilterState['typeFilter'] })}
                  />

            <FilterDropdown
                    label="DateRange :"
                    value={filters.dateFilter}
                    options={dateOptions}
                    onChange={(value) => onFiltersChange({ dateFilter: value  })}
                  />

            <FilterDropdown
                    label="Sort :"
                    value={filters.sortBy}
                    options={sortOptions}
                    onChange={(value) => onFiltersChange({ sortBy: value })}
                  />

        </div>
      </div>
    );
  };
export default FilterBar;


