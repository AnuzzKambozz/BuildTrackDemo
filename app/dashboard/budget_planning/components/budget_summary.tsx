"use client";
import { inter } from '@/app/fonts';
import React from 'react';

interface BudgetSummaryProps {
  totalBudget?: number;
  spentToDate?: number;
  remaining?: number;
  projectFinal?: number;
  contingencyRemaining?: number;
  onBudgetDetailsClick: () => void;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ 
  totalBudget = 875000,
  spentToDate = 539750,
  remaining = 335250,
  projectFinal = 894250,
  contingencyRemaining = 42000,
  onBudgetDetailsClick
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const calculatePercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  const overAmount = projectFinal - totalBudget;
  const overPercentage = ((overAmount / totalBudget) * 100).toFixed(1);

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6 rounded-lg shadow-sm">
      <div className="space-y-6">
        <div>
          <h3 className={`${inter.className} antialiased text-[#171E34] text-[18px] font-semibold mb-[24px] ml-[24px]`}>Budget Summary</h3>
          <div className={`h-[1px] bg-[#E6E5E5] mb-[24px]`}/>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1 ml-[24px]">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900 mb-[24px] ml-[24px]">{formatCurrency(totalBudget)}</p>
              <div className={`h-[1px] bg-[#E6E5E5] mb-[24px]`}/>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1 ml-[24px]">Spent to Date</p>
              <p className="text-2xl font-bold text-gray-900 ml-[24px]">{formatCurrency(spentToDate)}</p>
              <p className="text-sm text-teal-600 mb-[24px] ml-[24px]">{calculatePercentage(spentToDate, totalBudget)}% of total budget</p>
              <div className={`h-[1px] bg-[#E6E5E5] mb-[24px]`}/>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1 ml-[24px]">Remaining</p>
              <p className="text-2xl font-bold text-gray-900 ml-[24px]">{formatCurrency(remaining)}</p>
              <p className="text-sm text-teal-600 mb-[24px] ml-[24px]">{calculatePercentage(remaining, totalBudget)}% of total budget</p>
              <div className={`h-[1px] bg-[#E6E5E5] mb-[24px]`}/>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1 ml-[24px]">Project Final</p>
              <p className="text-2xl font-bold text-red-600 ml-[24px]">{formatCurrency(projectFinal)}</p>
              <p className="text-sm text-red-600 mb-[24px] ml-[24px]">+{formatCurrency(overAmount)} ({overPercentage}% over)</p>
              <div className={`h-[1px] bg-[#E6E5E5] mb-[24px]`}/>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1 ml-[24px]">Contingency Remaining</p>
              <p className="text-2xl font-bold text-gray-900 ml-[24px]">{formatCurrency(contingencyRemaining)}</p>
              <p className="text-sm text-teal-600 mb-[24px] ml-[24px]">70% of total budget</p>
              <div className={`h-[1px] bg-[#E6E5E5] mb-[24px]`}/>
            </div>
          </div>
          <div className={`h-[8px]  mb-[24px]`}/>
          <button 
            onClick={onBudgetDetailsClick}
            className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Budget Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;