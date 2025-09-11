"use client";

import React, { useEffect, useState } from "react";
import { Transaction } from "@/app/models/common";
import { Edit, Eye } from "lucide-react";

interface TransactionDropdownProps {
  transaction: Transaction | null;
  buttonElement: HTMLElement | null;
  onView: (transaction: Transaction) => void;
  onEdit: (transaction: Transaction) => void;
  onClose: () => void;
}

const TransactionDropdown: React.FC<TransactionDropdownProps> = ({
  transaction,
  buttonElement,
  onView,
  onEdit,
  onClose
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');

  useEffect(() => {
    if (buttonElement && transaction) {
      const rect = buttonElement.getBoundingClientRect();
      const dropdownHeight = 120; // Approximate dropdown height
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      
      // Determine if dropdown should appear above or below
      const shouldShowAbove = spaceBelow < dropdownHeight && rect.top > dropdownHeight;
      
      setDropdownPosition(shouldShowAbove ? 'top' : 'bottom');
      
      // Calculate position
      const top = shouldShowAbove 
        ? rect.top - dropdownHeight - 8 // 8px margin
        : rect.bottom + 8; // 8px margin
      
      const left = Math.max(16, rect.right - 224); // 224px = dropdown width, 16px min margin
      
      setPosition({ top, left });
    }
  }, [buttonElement, transaction]);

  if (!transaction || !buttonElement) return null;

  const handleView = () => {
    onView(transaction);
    onClose();
  };

  const handleEdit = () => {
    onEdit(transaction);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-10" 
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div 
        className="fixed z-20 w-56 bg-white rounded-lg shadow-lg border border-gray-200"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
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
  );
};

export default TransactionDropdown;