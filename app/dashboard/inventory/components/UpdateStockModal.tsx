"use client";

import React, { useState, useEffect } from 'react';
import InputField from '@/app/components/textField'; // Update path as needed
// import Dropdown from '@/app/components/dropdowns/dropdown_new'; // Update path as needed
import { Package,  AlertTriangle, CheckCircle } from 'lucide-react';//Info , TrendingUp, TrendingDown, RotateCcw

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  category: string;
  skuPartNumber: string;
  currentStock: number;
  unit: string;
  minimumStockLevel: number;
  reorderPoint: number;
  unitCost: number;
  supplier: string;
  location: string;
  status: string;
}

export interface StockUpdateData {
  updateType: 'add' | 'subtract' | 'set' | 'adjustment';
  quantity: number;
  reason: string;
  notes?: string;
  location?: string;
  reference?: string; // PO number, invoice number, etc.
  updatedBy?: string;
}

export interface UpdateStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updateData: StockUpdateData) => void;
  item: InventoryItem | null;
  loading?: boolean;
}

interface FormErrors {
  quantity?: string;
  reason?: string;
  reference?: string;
  notes?: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const UpdateStockModal: React.FC<UpdateStockModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  item,
  loading = false
}) => {
  // ============================================================================
  // STATE
  // ============================================================================
  
  const [formData, setFormData] = useState<StockUpdateData>({
    updateType: 'add',
    quantity: 0,
    reason: '',
    notes: '',
    location: '',
    reference: '',
    updatedBy: 'Current User' // This would come from auth context
  });

  const [errors, setErrors] = useState<FormErrors>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [calculatedNewStock, setCalculatedNewStock] = useState<number>(0);

  // ============================================================================
  // OPTIONS DATA
  // ============================================================================

  // const updateTypeOptions = [
  //   { 
  //     value: 'add', 
  //     label: '➕ Add Stock', 
  //     description: 'Increase inventory (receiving goods)',
  //     icon: <TrendingUp className="w-4 h-4" />
  //   },
  //   { 
  //     value: 'subtract', 
  //     label: '➖ Remove Stock', 
  //     description: 'Decrease inventory (usage, sales)',
  //     icon: <TrendingDown className="w-4 h-4" />
  //   },
  //   { 
  //     value: 'set', 
  //     label: '🎯 Set Stock', 
  //     description: 'Set exact stock level',
  //     icon: <RotateCcw className="w-4 h-4" />
  //   },
  //   { 
  //     value: 'adjustment', 
  //     label: '📊 Stock Adjustment', 
  //     description: 'Correction due to count discrepancy',
  //     icon: <Package className="w-4 h-4" />
  //   }
  // ];

  // const reasonOptions = {
  //   add: [
  //     { value: 'purchase_order', label: '📦 Purchase Order Received', description: 'Goods received from supplier' },
  //     { value: 'return_to_stock', label: '↩️ Return to Stock', description: 'Items returned to inventory' },
  //     { value: 'transfer_in', label: '📥 Transfer In', description: 'Stock transferred from another location' },
  //     { value: 'production', label: '🏭 Production Complete', description: 'Manufactured items added to stock' },
  //     { value: 'found_items', label: '🔍 Found Items', description: 'Previously missing items found' }
  //   ],
  //   subtract: [
  //     { value: 'sale', label: '💰 Sale/Usage', description: 'Items sold or used' },
  //     { value: 'waste', label: '🗑️ Waste/Damaged', description: 'Items damaged or wasted' },
  //     { value: 'transfer_out', label: '📤 Transfer Out', description: 'Stock transferred to another location' },
  //     { value: 'lost', label: '❌ Lost Items', description: 'Items missing or lost' },
  //     { value: 'expired', label: '⏰ Expired', description: 'Items past expiration date' }
  //   ],
  //   set: [
  //     { value: 'physical_count', label: '📋 Physical Count', description: 'Stock count verification' },
  //     { value: 'system_correction', label: '💻 System Correction', description: 'Correcting system error' },
  //     { value: 'opening_balance', label: '🏁 Opening Balance', description: 'Setting initial stock level' }
  //   ],
  //   adjustment: [
  //     { value: 'count_discrepancy', label: '🔍 Count Discrepancy', description: 'Physical vs system count difference' },
  //     { value: 'shrinkage', label: '📉 Shrinkage', description: 'Natural loss or theft' },
  //     { value: 'data_correction', label: '🔧 Data Correction', description: 'Correcting incorrect data entry' }
  //   ]
  // };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen && item) {
      setFormData({
        updateType: 'add',
        quantity: 0,
        reason: '',
        notes: '',
        location: item.location,
        reference: '',
        updatedBy: 'Current User'
      });
      setErrors({});
      setCalculatedNewStock(item.currentStock);
    }
  }, [isOpen, item]);

  // Calculate new stock level when quantity or type changes
  useEffect(() => {
    if (!item) return;

    let newStock = item.currentStock;
    const quantity = formData.quantity || 0;

    switch (formData.updateType) {
      case 'add':
        newStock = item.currentStock + quantity;
        break;
      case 'subtract':
        newStock = Math.max(0, item.currentStock - quantity);
        break;
      case 'set':
        newStock = quantity;
        break;
      case 'adjustment':
        newStock = item.currentStock + quantity; // Can be negative for adjustments
        break;
    }

    setCalculatedNewStock(Math.max(0, newStock));
  }, [formData.quantity, formData.updateType, item]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseFloat(value) || 0 : value
    }));

    // Clear errors
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // const handleDropdownChange = (name: keyof StockUpdateData) => (value: string | number) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value,
  //     // Clear reason when update type changes
  //     ...(name === 'updateType' && { reason: '' })
  //   }));

  //   if (errors[name as keyof FormErrors]) {
  //     setErrors(prev => ({
  //       ...prev,
  //       [name]: undefined
  //     }));
  //   }
  // };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }

    if (!formData.reason) {
      newErrors.reason = 'Reason is required';
    }

    if (formData.updateType === 'subtract' && formData.quantity > (item?.currentStock || 0)) {
      newErrors.quantity = `Cannot remove more than current stock (${item?.currentStock})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getStockLevelIndicator = (stock: number) => {
    if (!item) return null;

    if (stock === 0) {
      return { color: 'text-red-600 bg-red-100', icon: <AlertTriangle className="w-4 h-4" />, text: 'Out of Stock' };
    } else if (stock <= item.minimumStockLevel) {
      return { color: 'text-yellow-600 bg-yellow-100', icon: <AlertTriangle className="w-4 h-4" />, text: 'Low Stock' };
    } else {
      return { color: 'text-green-600 bg-green-100', icon: <CheckCircle className="w-4 h-4" />, text: 'In Stock' };
    }
  };

  // const stockIndicator = getStockLevelIndicator(calculatedNewStock);

  if (!isOpen || !item) return null;

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-blue-50">
          <div className="flex items-center space-x-3">
            <Package className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Update Stock</h2>
              <p className="text-sm text-gray-600">{item.name} - {item.skuPartNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Item Info */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Current Stock</p>
              <p className="text-2xl font-bold text-gray-900">{item.currentStock} {item.unit}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Minimum Level</p>
              <p className="text-lg font-semibold text-gray-700">{item.minimumStockLevel} {item.unit}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Location</p>
              <p className="text-sm text-gray-700">{item.location}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Current Status</p>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStockLevelIndicator(item.currentStock)?.color}`}>
                {getStockLevelIndicator(item.currentStock)?.icon}
                <span className="ml-1">{getStockLevelIndicator(item.currentStock)?.text}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Update Type */}
            {/* <div className="md:col-span-2">
              <Dropdown
                name="updateType"
                value={formData.updateType}
                options={updateTypeOptions}
                onChange={handleDropdownChange('updateType')}
                label="Update Type"
                placeholder="Select update type"
                mandatory={true}
                searchable={false}
                helperText="Choose how you want to update the stock"
              />
            </div> */}

            {/* Quantity */}
            <div>
              <InputField
                label={`Quantity ${formData.updateType === 'set' ? '(Final Stock Level)' : formData.updateType === 'adjustment' ? '(+/- Change)' : `(${formData.updateType === 'add' ? 'Add' : 'Remove'})`}`}
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder={`Enter ${formData.updateType === 'set' ? 'final stock level' : 'quantity'}`}
                mandatory={true}
                error={errors.quantity}
                highlight={!!errors.quantity}
                min="0"
                // step="0.01"
              />
            </div>

            {/* Reason */}
            {/* <div>
              <Dropdown
                name="reason"
                value={formData.reason}
                options={reasonOptions[formData.updateType] || []}
                onChange={handleDropdownChange('reason')}
                label="Reason"
                placeholder="Select reason for update"
                mandatory={true}
                searchable={true}
                error={errors.reason}
                highlight={!!errors.reason}
                searchPlaceholder="Search reasons..."
                helperText="Why is the stock being updated?"
              />
            </div> */}

            {/* Reference Number */}
            {/* <div>
              <InputField
                label="Reference Number"
                name="reference"
                value={formData.reference}
                onChange={handleInputChange}
                placeholder="PO#, Invoice#, Job#, etc."
                error={errors.reference}
                // helperText="Optional reference (PO, invoice, job number)"
              />
            </div> */}

            {/* Location */}
            {/* <div>
              <InputField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Storage location"
                // helperText="Where is this stock located?"
              />
            </div> */}

            {/* Notes */}
            {/* <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any additional information about this stock update..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div> */}
          </div>

          {/* Stock Level Preview */}
          {/* {formData.quantity > 0 && ( */}
             {/* <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"> */}
              {/* <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Stock Level Preview</span>
                </div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${stockIndicator?.color}`}>
                  {stockIndicator?.icon}
                  <span className="ml-1">{stockIndicator?.text}</span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">
                    Current: <span className="font-semibold">{item.currentStock} {item.unit}</span>
                  </span>
                  <span className="text-gray-400">→</span>
                  <span className="text-blue-600">
                    New: <span className="font-semibold text-blue-800">{calculatedNewStock} {item.unit}</span>
                  </span>
                </div>
                <span className={`font-semibold ${
                  calculatedNewStock > item.currentStock 
                    ? 'text-green-600' 
                    : calculatedNewStock < item.currentStock 
                    ? 'text-red-600' 
                    : 'text-gray-600'
                }`}>
                  {calculatedNewStock > item.currentStock && '+'}
                  {calculatedNewStock - item.currentStock !== 0 && (calculatedNewStock - item.currentStock)} {item.unit}
                </span>
              </div> */}
              
              {/* Warning for low stock */}
              {/* {calculatedNewStock <= item.minimumStockLevel && calculatedNewStock > 0 && (
                <div className="mt-2 flex items-center space-x-2 text-yellow-700 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Warning: New stock level will be below minimum threshold ({item.minimumStockLevel} {item.unit})</span>
                </div>
              )}
               */}
              {/* Warning for zero stock */}
              {/* {calculatedNewStock === 0 && (
                <div className="mt-2 flex items-center space-x-2 text-red-700 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Warning: This will result in zero stock (out of stock condition)</span>
                </div>
              )} */}
            {/* </div> */}
          {/* )} */}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center space-x-2"
            >
              {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <Package className="w-4 h-4" />
              <span>Update Stock</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStockModal;