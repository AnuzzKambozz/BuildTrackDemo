"use client";

import { getCategoryColor } from "@/app/utility/common_utils";
import { X } from "lucide-react";

// New Category Modal Component

interface NewCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    categoryName: string;
    onCategoryNameChange: (name: string) => void;
    categoryColor: string;
    onCategoryColorChange: (color: string) => void;
    onSubmit: () => void;
  }
  
  const NewCategoryModal: React.FC<NewCategoryModalProps> = ({
    isOpen,
    onClose,
    categoryName,
    onCategoryNameChange,
    categoryColor,
    onCategoryColorChange,
    onSubmit
  }) => {
    if (!isOpen) return null;
  
    const colorOptions = ['blue', 'green', 'purple', 'orange', 'pink', 'red', 'yellow', 'indigo'];
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Create New Category</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => onCategoryNameChange(e.target.value)}
                placeholder="Enter category name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Theme
              </label>
              <div className="flex space-x-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => onCategoryColorChange(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      categoryColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                    } ${getCategoryColor(color).split(' ')[1]}`}
                  />
                ))}
              </div>
            </div>
  
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(categoryColor)}`}>
                {categoryName || 'Category Name'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={!categoryName.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Create Category
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default NewCategoryModal;