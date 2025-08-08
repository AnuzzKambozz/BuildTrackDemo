"use client";

import { X, Plus } from "lucide-react";
import { AddChangeOrderForm } from "../../types/change-orders";


// AddChangeOrderModal Component
interface AddChangeOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: AddChangeOrderForm;
    onFormDataChange: (data: Partial<AddChangeOrderForm>) => void;
    onSubmit: () => void;
  }
  
  const AddChangeOrderModal: React.FC<AddChangeOrderModalProps> = ({
    isOpen,
    onClose,
    formData,
    onFormDataChange,
    onSubmit
  }) => {
    if (!isOpen) return null;
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.description.trim() || !formData.requestor.trim()) {
        alert('Please fill in all required fields');
        return;
      }
      onSubmit();
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Add New Change Order</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => onFormDataChange({ description: e.target.value })}
                placeholder="Describe the change order in detail..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={3}
              />
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => onFormDataChange({ type: e.target.value as 'Client' | 'Required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Client">Client Request</option>
                  <option value="Required">Required Change</option>
                </select>
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => onFormDataChange({ priority: e.target.value as 'Low' | 'Medium' | 'High' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requestor *
              </label>
              <input
                required
                type="text"
                value={formData.requestor}
                onChange={(e) => onFormDataChange({ requestor: e.target.value })}
                placeholder="Enter requestor name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost Impact ($)
                </label>
                <input
                  type="number"
                  value={formData.costImpact}
                  onChange={(e) => onFormDataChange({ costImpact: e.target.value })}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Impact (days)
                </label>
                <input
                  type="number"
                  value={formData.timeImpact}
                  onChange={(e) => onFormDataChange({ timeImpact: e.target.value })}
                  placeholder="0"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason/Justification
              </label>
              <textarea
                value={formData.reason}
                onChange={(e) => onFormDataChange({ reason: e.target.value })}
                placeholder="Explain why this change is needed and any relevant details..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={3}
              />
            </div>
  
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Change Order
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default AddChangeOrderModal;