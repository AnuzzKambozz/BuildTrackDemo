// components/ActionsDropdown.tsx
import React from 'react';
import { MoreVertical } from 'lucide-react';
import { ActionsDropdownProps} from '../types/inventory';//Status 

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({
  // item,
  isOpen,
  onUpdateStocks,
  onToggle,
  // onClose
}) => {
  // const getNextStatus = (currentStatus: Status): Status => {
  //   switch (currentStatus) {
  //     case 'Out of Stock':
  //       return 'Low Stock';
  //     case 'Low Stock':
  //       return 'In Stock';
  //     case 'In Stock':
  //       return 'Out of Stock';
  //     default:
  //       return 'In Stock';
  //   }
  // };

  // const handleUpdateStocks= () => {
  //   console.log('Viewing details for:', item.id);
  //   onClose();
  // };

  // const handleStatusChange = () => {
  //   const nextStatus = getNextStatus(item.status);
  //   onStatusChange(item.id, nextStatus);
  //   onClose();
  // };

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Actions menu"
      >
        <MoreVertical className="h-4 w-4 text-gray-600" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-8 w-48 bg-white rounded-md shadow-xl border border-gray-200 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="py-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdateStocks();
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
            >
              
              Update Stocks
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default ActionsDropdown;