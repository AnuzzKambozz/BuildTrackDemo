"use client";

import { ExpenseModel } from "@/app/models/common";
import ActionMenu from "./action_menu";


interface ExpenseRowProps {
    expense: ExpenseModel;
    onEdit: (expense: ExpenseModel) => void;
    onDelete: (id: number) => void;
    onStatusChange: (id: number, status: 'pending' | 'approved' | 'rejected') => void;
  }



  const ExpenseRow: React.FC<ExpenseRowProps> = ({ expense, onEdit, onDelete, onStatusChange }) => {
    const getStatusColor = (status: string): string => {
      switch (status) {
        case 'pending': return 'bg-orange-100 text-orange-800';
        case 'approved': return 'bg-green-100 text-green-800';
        case 'rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
  
    const getStatusText = (status: string): string => {
      return status.charAt(0).toUpperCase() + status.slice(1);
    };
  
    return (
      <tr className="border-b border-gray-100 hover:bg-gray-50">
        <td className="px-6 py-4 text-sm text-gray-900">{expense.description}</td>
        <td className="px-6 py-4 text-sm text-gray-600">{expense.project}</td>
        <td className="px-6 py-4 text-sm text-gray-600">{expense.category}</td>
        <td className="px-6 py-4 text-sm text-red-600 font-medium">
          +${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </td>
        <td className="px-6 py-4 text-sm text-gray-600">{expense.date}</td>
        <td className="px-6 py-4 text-sm text-gray-600">{expense.submittedBy}</td>
        <td className="px-6 py-4">
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(expense.status)}`}>
            {getStatusText(expense.status)}
          </span>
        </td>
        <td className="px-6 py-4">
          <ActionMenu
            expense={expense}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        </td>
      </tr>
    );
  };
  
  export default ExpenseRow;