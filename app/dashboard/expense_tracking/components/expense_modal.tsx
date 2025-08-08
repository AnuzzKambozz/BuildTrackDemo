"use client";

import { ExpenseModel } from "@/app/models/common";
import { X } from "lucide-react";
import { useState, useEffect } from "react";


interface ExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (expense: ExpenseModel | Omit<ExpenseModel, 'id'>) => void;
    expense?: ExpenseModel;
    mode: 'add' | 'edit';
  }




const ExpenseModal: React.FC<ExpenseModalProps> = ({ isOpen, onClose, onSubmit, expense, mode }) => {
    const [formData, setFormData] = useState<{
      description: string;
      project: string;
      category: 'Materials' | 'Equipments' | 'Labor';
      amount: number;
      submittedBy: string;
      status: 'pending' | 'approved' | 'rejected';
    }>({
      description: '',
      project: '',
      category: 'Materials',
      amount: 0,
      submittedBy: '',
      status: 'pending',
    });
  
    useEffect(() => {
      if (expense && mode === 'edit') {
        setFormData({
          description: expense.description,
          project: expense.project,
          category: expense.category,
          amount: expense.amount,
          submittedBy: expense.submittedBy,
          status: expense.status,
        });
      } else {
        setFormData({
          description: '',
          project: '',
          category: 'Materials',
          amount: 0,
          submittedBy: '',
          status: 'pending',
        });
      }
    }, [expense, mode]);
  
    const handleSubmit = () => {
      if (mode === 'edit' && expense) {
        onSubmit({
          ...expense,
          ...formData,
        });
      } else {
        onSubmit({
          ...formData,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        });
      }
      onClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {mode === 'edit' ? 'Edit Expense' : 'Add New Expense'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
              <input
                type="text"
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as 'Materials' | 'Equipments' | 'Labor' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Materials">Materials</option>
                <option value="Equipments">Equipments</option>
                <option value="Labor">Labor</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Submitted By</label>
              <input
                type="text"
                value={formData.submittedBy}
                onChange={(e) => setFormData({ ...formData, submittedBy: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
  
            {mode === 'edit' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'approved' | 'rejected' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            )}
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {mode === 'edit' ? 'Update Expense' : 'Add Expense'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
export default ExpenseModal;  