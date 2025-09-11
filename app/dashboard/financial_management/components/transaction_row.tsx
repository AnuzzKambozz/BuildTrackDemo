"use client";

import React, { useState } from "react";
import { Transaction } from "@/app/models/common";
import { MoreVertical, Edit, Eye } from "lucide-react";

interface TransactionRowProps {
  transaction: Transaction;
  onView: (transaction: Transaction) => void;
  onEdit: (transaction: Transaction) => void;
  isLastRow: boolean;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ 
  transaction, 
  onView, 
  onEdit, 
  isLastRow,
}) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');

  const toggleDropdown = (): void => {
    // const buttonRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    // const viewportHeight = window.innerHeight;
    // const dropdownHeight = 120; // Approximate height of dropdown
    
    // Check if there's enough space below the button
    // const spaceBelow = viewportHeight - buttonRect.bottom;
    // const shouldShowAbove = spaceBelow < dropdownHeight && buttonRect.top > dropdownHeight;
    console.log(isLastRow)
    
    setDropdownPosition(isLastRow ? 'top' : 'bottom');
    setOpenDropdown(!openDropdown);
  };

  const closeDropdown = (): void => {
    setOpenDropdown(false);
  };

  const handleView = () => {
    onView(transaction);
    closeDropdown();
  };

  const handleEdit = () => {
    onEdit(transaction);
    closeDropdown();
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-4 py-3">
        <div>
          <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
          <div className="text-sm text-blue-600 font-medium">{transaction.invoiceId}</div>
          <div className="text-xs text-gray-500">Ref: {transaction.reference}</div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="text-sm font-medium text-gray-900">{transaction.client}</div>
        <div className="text-sm text-blue-600 font-medium">{transaction.description}</div>
      </td>
      <td className="px-4 py-3">
        <div className="text-sm font-medium text-gray-900">{transaction.project}</div>
      </td>
      <td className="px-4 py-3">
        <div>
          <div className="text-sm font-bold text-gray-900">${transaction.amount.toFixed(2)}</div>
          <div className="text-xs text-gray-600">{transaction.paymentMethod}</div>
          {transaction.fees > 0 && (
            <div className="text-xs text-gray-500">
              Net: ${transaction.netAmount.toFixed(2)}
            </div>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(transaction.paymentDate).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-lg transition-colors"
            title="More actions"
            type="button"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {/* Dropdown Menu */}
          {openDropdown && (
            <>
              {/* Backdrop to close dropdown */}
              <div 
                className="fixed inset-0 z-10" 
                onClick={closeDropdown}
              />
              
              {/* Dropdown content - positioned dynamically */}
              <div className={`absolute right-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20 ${
                dropdownPosition === 'top' 
                  ? 'bottom-full mb-1' 
                  : 'top-full mt-1'
              }`}>
                <div className="py-1">
                  <button
                    onClick={handleView}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                    type="button"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                    type="button"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Transaction
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TransactionRow;