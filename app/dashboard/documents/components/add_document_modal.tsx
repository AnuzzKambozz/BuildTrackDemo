"use client";

import { CategoryModel } from "@/app/models/common";
import { X, File } from "lucide-react";


// Add Document Modal Component
interface AddDocumentModalProps {
    isOpen: boolean;
    onClose: () => void;
    documentName: string;
    onDocumentNameChange: (name: string) => void;
    documentCategory: string;
    onDocumentCategoryChange: (category: string) => void;
    documentFile: File | null;
    onDocumentFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    categories: CategoryModel[];
    onSubmit: () => void;
  }
  
  const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
    isOpen,
    onClose,
    documentName,
    onDocumentNameChange,
    documentCategory,
    onDocumentCategoryChange,
    documentFile,
    onDocumentFileChange,
    categories,
    onSubmit
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Add New Document</h3>
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
                Upload File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  onChange={onDocumentFileChange}
                  className="hidden"
                  id="document-file-input"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label htmlFor="document-file-input" className="cursor-pointer">
                  <File className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    {documentFile ? documentFile.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC, DOCX, JPG, PNG up to 10MB
                  </p>
                </label>
              </div>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Name
              </label>
              <input
                type="text"
                value={documentName}
                onChange={(e) => onDocumentNameChange(e.target.value)}
                placeholder="Enter document name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={documentCategory}
                onChange={(e) => onDocumentCategoryChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
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
              disabled={!documentName.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Add Document
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default AddDocumentModal;