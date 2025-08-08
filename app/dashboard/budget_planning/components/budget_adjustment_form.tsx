"use client";
import React, { useState, FormEvent } from 'react';

export interface AdjustmentFormData {
  category: string;
  amount: string;
  reason: string;
}

interface BudgetAdjustmentFormProps {
  onSubmit: (formData: AdjustmentFormData) => void;
  onCancel: () => void;
  categories?: string[];
  initialData?: AdjustmentFormData;
}

const BudgetAdjustmentForm: React.FC<BudgetAdjustmentFormProps> = ({ 
  onSubmit,
  onCancel,
  categories = ['Subcontractors', 'Materials', 'Labors', 'Equipment', 'Permits & Fees'],
  initialData = {
    category: 'Subcontractors',
    amount: '20,000.00',
    reason: 'Additional electrical work required due to code updates and inspection findings'
  }
}) => {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof AdjustmentFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Budget Adjustment Request</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select 
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input 
              type="text"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="$20,000.00"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
          <textarea 
            value={formData.reason}
            onChange={(e) => handleInputChange('reason', e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Provide reason for budget adjustment"
            required
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button 
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetAdjustmentForm;