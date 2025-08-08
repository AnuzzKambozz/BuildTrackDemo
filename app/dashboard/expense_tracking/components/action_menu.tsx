"use client";

import { ExpenseModel } from "@/app/models/common";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { useState } from "react";


interface ActionMenuProps {
    expense: ExpenseModel;
    onEdit: (expense: ExpenseModel) => void;
    onDelete: (id: number) => void;
    onStatusChange: (id: number, status: 'pending' | 'approved' | 'rejected') => void;
  }




const ActionMenu: React.FC<ActionMenuProps> = ({ expense, onEdit, onDelete, onStatusChange }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-gray-600 p-1"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-40">
            <button
              onClick={() => {
                onEdit(expense);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => {
                onStatusChange(expense.id, 'approved');
                setIsOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-green-600"
            >
              Approve
            </button>
            <button
              onClick={() => {
                onStatusChange(expense.id, 'rejected');
                setIsOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600"
            >
              Reject
            </button>
            <button
              onClick={() => {
                onDelete(expense.id);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600 last:rounded-b-lg"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  export default ActionMenu;
  