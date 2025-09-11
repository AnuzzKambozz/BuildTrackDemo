"use client";

import React, { useState } from "react";
import { InvoiceModal } from "@/app/models/common";
import { 
  MoreVertical,
  Eye, 
  Edit, 

} from 'lucide-react';

interface InvoiceRowProps {
  invoice: InvoiceModal;
  onView: (invoice: InvoiceModal) => void;
  onEdit: (invoice: InvoiceModal) => void;
  isLastRow: boolean;
}

const InvoiceRow: React.FC<InvoiceRowProps> = ({ 
  invoice, 
  onView, 
  onEdit, 
  isLastRow,
}) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');



      const getStatusColor = (status: string) => {
      switch (status) {
        case 'draft': return 'bg-gray-100 text-gray-800';
        case 'sent': return 'bg-blue-100 text-blue-800';
        case 'paid': return 'bg-green-100 text-green-800';
        case 'overdue': return 'bg-red-100 text-red-800';
        case 'cancelled': return 'bg-gray-100 text-gray-600';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

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
    onView(invoice);
    closeDropdown();
  };

  const handleEdit = () => {
    onEdit(invoice);
    closeDropdown();
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-4 py-3">
        <div>
          <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
          <div className="text-xs text-gray-500">Issued: {new Date(invoice.issueDate).toLocaleDateString()}</div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="text-sm font-medium text-gray-900">{invoice.client}</div>
        <div className="text-sm text-gray-500 font-medium">{invoice.clientEmail}</div>
      </td>
      <td className="px-4 py-3">
        <div className="text-sm font-medium text-gray-900">{invoice.projectName}</div>
      </td>
      <td className="px-4 py-3">
        <div className="text-sm font-medium text-gray-900">{`${invoice.amount.toFixed(2)}`}</div>
      </td>
      <td className="px-4 py-3">
        <div>
        <span className={`inline-flex px-4 py-1 font-medium text-[11px] rounded-md ${getStatusColor(invoice.status)}`}>
                    {invoice.status.toUpperCase()}
        </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(invoice.dueDate).toLocaleDateString()}
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
                    Edit Invoice
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

export default InvoiceRow;