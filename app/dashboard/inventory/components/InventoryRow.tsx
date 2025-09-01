// components/InventoryRow.tsx
import React from 'react';
import ActionsDropdown from './ActionsDropdown';
import { InventoryRowProps, Category, Status } from '../types/inventory';
// import UpdateStockModal from './UpdateStockModal';

interface InventoryRowComponentProps extends InventoryRowProps {
  openDropdown: string | null;
  onToggleDropdown: (itemId: string) => void;
  onUpdateStock: () => void;
  onCloseDropdown: () => void;
}

const InventoryRow: React.FC<InventoryRowComponentProps> = ({
  item,
  openDropdown,
  onToggleDropdown,
  onUpdateStock,
  onCloseDropdown
}) => {
  const getStatusColor = (status: Status): string => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: Category): string => {
    switch (category) {
      case 'Materials':
        return 'bg-green-100 text-green-800';
      case 'Tools':
        return 'bg-blue-100 text-blue-800';
      case 'Safety':
        return 'bg-orange-100 text-orange-800';
      case 'Equipment':
        return 'bg-purple-100 text-purple-800';
      case 'Hardware':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleToggleDropdown = () => {
    onToggleDropdown(item.id);
  };

  return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {item.id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{item.name}</div>
          <div className="text-sm text-gray-500">{item.description}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(item.category)}`}>
            {item.category}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {item.currentStock.toLocaleString()}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {item.unit}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {item.reorderPoint}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          ${item.unitCost.toFixed(2)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
            {item.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <ActionsDropdown
            item={item}
            isOpen={openDropdown === item.id}
            onToggle={handleToggleDropdown}
            onUpdateStocks={() => {onUpdateStock()}}
            onClose={onCloseDropdown}
          />
        </td>
      </tr>


    

  );
};

export default InventoryRow;