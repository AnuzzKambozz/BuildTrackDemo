"use client";

import { poppins } from "@/app/fonts";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FilterDropdownProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
  }


  // FilterDropdown Component
const FilterDropdown: React.FC<FilterDropdownProps> = ({
    label,
    value,
    options,
    onChange
  }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="relative">
<button
  onClick={() => setIsOpen(!isOpen)}
  className="flex items-center justify-between gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px] w-full"
>
  <span className="text-sm flex gap-1 flex-wrap">
    <span className={`${poppins.className} antialiased font-semibold text-[13] text-[#323B5B]`}>{label}:</span>
    <span className={`${poppins.className} antialiased font-medium text-[13] text-[#323B5B]`}>{value}</span>
  </span>
  <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
</button>

        
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default FilterDropdown;