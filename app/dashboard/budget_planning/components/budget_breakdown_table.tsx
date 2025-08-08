"use client";

import React from 'react';
import { BTButton } from '@/app/components/buttons/BTButton';
import FilterBlackIcon from '@/app/public/filter_black_icon.svg';
import DownloadIcon from '@/app/public/export_white_icon.svg';

export interface BudgetItem {
  category: string;
  budgeted: number;
  actual: number;
  remaining: number;
  percentage: number;
  status: 'On Track' | 'Over' | 'Under';
}

interface BudgetBreakdownTableProps {
  budgetData: BudgetItem[];
  onFilter: () => void;
  onExport: () => void;
}

const BudgetBreakdownTable: React.FC<BudgetBreakdownTableProps> = ({ 
  budgetData = [],
  onFilter,
  onExport
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    return status === 'On Track' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Budget Breakdown</h2>
        <div className="flex space-x-4">
            <BTButton text='Filter' icon={FilterBlackIcon} type='outline_gray' onClick={onFilter} size='medium'/>
            <BTButton text='Export ' icon={DownloadIcon} type='primary' onClick={onExport} size='medium'/>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budgeted</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {budgetData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.budgeted)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.actual)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.remaining)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.percentage}%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetBreakdownTable;