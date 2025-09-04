"use client";

import { ExpenseModel, ExpenseItem } from "@/app/models/common";
import {Trash2} from 'lucide-react';
import React, { useState, useEffect } from 'react';//useCallback
import  Dropdown  from "@/app/components/dropdowns/dropdown_new";

import ModalBackdrop from '@/app/components/modal_backdrop';
import InputField from '@/app/components/textField';
import TextAreaField from '@/app/components/textAreaField';
import {BTButton} from '@/app/components/buttons/BTButton';

// Define proper types for unit properties
interface UnitProperties {
  value: string;
  label: string;
  type: 'discrete' | 'area' | 'linear' | 'volume' | 'weight' | 'time' | 'lumpsum';
  step: number;
  min: number;
}

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
      category: string; // Fixed: Remove undefined from union
      purchaseOrder: string
      invoiceId: string;
      invoiceAmount:number;
      invoiceDate:string;
      items: ExpenseItem[];  
      invoiceDocument: string; 
      status: 'pending' | 'approved' | 'rejected';
      amount: number; // Added: Missing from interface
      submittedBy: string; // Added: Missing from interface
    }>({
      description: '',
      project: '',
      category: 'Purchase Order', // Fixed: Always have a default value
      purchaseOrder: '',
      invoiceId:'',
      invoiceAmount:0,
      invoiceDate:"",
      invoiceDocument:'',
      items: [],
      status: 'pending',
      amount: 0, // Added: Default value
      submittedBy: '', // Added: Default value
    });
  
    useEffect(() => {
      if (expense && mode === 'edit') {
        console.log(expense)
        setFormData({
          description: expense.description,
          project: expense.project,
          category: "Purchase Order",
          purchaseOrder: expense.purchaseOrder || '',
          invoiceId: expense.invoiceId || '',
          invoiceAmount: expense.invoiceAmount || 0,
          invoiceDate: expense.invoiceDate || '',
          invoiceDocument: expense.invoiceDocument || '',
          items: expense.items as ExpenseItem[],
          status: expense.status,
          amount: 0, // You'll need to calculate this from items or add to ExpenseModel
          submittedBy: '', // You'll need to add this to ExpenseModel or get from elsewhere
        });
      } else {
        setFormData({
          description: '',
          project: '',
          category: 'Purchase Order',
          purchaseOrder: '',
          invoiceId:  '',
          invoiceAmount:  0,
          invoiceDate: '',
          invoiceDocument:  '',
          items: [],
          status: 'pending',
          amount: 0,
          submittedBy: '',
        });
      }
    }, [expense, mode]);
  
    const handleSubmit = () => {
      if (mode === 'edit' && expense) {
        onSubmit({
          ...expense,
          description: formData.description,
          project: formData.project,
          category: formData.category,
          purchaseOrder: formData.purchaseOrder || '',
          invoiceId: formData.invoiceId || '',
          invoiceAmount: formData.invoiceAmount || 0,
          invoiceDate: formData.invoiceDate || '',
          invoiceDocument: formData.invoiceDocument || '',
          items: formData.items,
          status: formData.status,
          amount: formData.invoiceAmount
        });
      } else {
        onSubmit({
          description: formData.description,
          project: formData.project,
          category: formData.category,
          purchaseOrder: formData.purchaseOrder || '',
          invoiceId: formData.invoiceId || '',
          invoiceAmount: formData.invoiceAmount || 0,
          invoiceDate: formData.invoiceDate || '',
          invoiceDocument: formData.invoiceDocument || '',
          items: formData.items,
          submittedBy: "Anuj Kamboj",
          amount: formData.invoiceAmount,
          status: formData.status,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        });
      }
      onClose();
    };
//    const totalEstimate = formData.items.reduce((sum, item) => sum + item.subTotal, 0);

//      const categories = [
//     { value: 'Materials', label: 'Materials' },
//     { value: 'Tools', label: 'Tools' },
//     { value: 'Safety', label: 'Safety' },
//     { value: 'Hardware', label: 'Hardware' },
//     { value: 'Service', label: 'Service' },
//     { value: 'Labor', label: 'Labor' },
//     { value: 'Equipment', label: 'Equipment' },
//     { value: 'General Conditions', label: 'General Conditions' },
//     { value: 'Other', label: 'Other' }
//   ];

const purchaseOrders = [
    { value: 'PO-2024-001', label: 'PO-2024-001' },
    { value: 'PO-2024-002', label: 'PO-2024-002' },
    { value: 'PO-2024-003', label: 'PO-2024-003' },
    { value: 'PO-2024-004', label: 'PO-2024-004' },
  ];
  
//   const units = [
//     { value: 'pcs', label: 'pcs', type: 'discrete', step: 1, min: 1 },
//     { value: 'sq ft', label: 'sq ft', type: 'area', step: 0.01, min: 0.01 },
//     { value: 'sq m', label: 'sq m', type: 'area', step: 0.01, min: 0.01 },
//     { value: 'lin ft', label: 'lin ft', type: 'linear', step: 0.01, min: 0.01 },
//     { value: 'lin m', label: 'lin m', type: 'linear', step: 0.01, min: 0.01 },
//     { value: 'cu ft', label: 'cu ft', type: 'volume', step: 0.01, min: 0.01 },
//     { value: 'cu m', label: 'cu m', type: 'volume', step: 0.01, min: 0.01 },
//     { value: 'lbs', label: 'lbs', type: 'weight', step: 0.1, min: 0.1 },
//     { value: 'kg', label: 'kg', type: 'weight', step: 0.1, min: 0.1 },
//     { value: 'hrs', label: 'hrs', type: 'time', step: 0.25, min: 0.25 },
//     { value: 'days', label: 'days', type: 'time', step: 0.5, min: 0.5 },
//     { value: 'ls', label: 'ls (lump sum)', type: 'lumpsum', step: 1, min: 1 }
//   ];

  const projectOptions = [
      { value: 'Spethman Renovation', label: 'Spethman Renovation' },
      { value: 'Steven Kitchen', label: 'Steven Kitchen' },
      { value: 'Asian Zone Spec Home', label: 'Asian Zone Spec Home' },
      { value: 'Bruke Roof Siding', label: 'Bruke Roof Siding' },
    ];
  
    // Helper functions
//   const getUnitProperties = (unitValue: string) => {
//     return units.find(u => u.value === unitValue) || units[0];
//   };

//   const formatQuantityPlaceholder = (unitValue: string) => {
//     const unit = getUnitProperties(unitValue);
//     switch (unit.type) {
//       case 'discrete':
//         return 'e.g., 10 pieces';
//       case 'area':
//         return 'e.g., 150.25';
//       case 'linear':
//         return 'e.g., 25.5';
//       case 'volume':
//         return 'e.g., 12.75';
//       case 'weight':
//         return 'e.g., 50.5';
//       case 'time':
//         return unit.value === 'hrs' ? 'e.g., 8.5' : 'e.g., 3.5';
//       case 'lumpsum':
//         return '1 (fixed)';
//       default:
//         return 'Enter quantity';
//     }
//   };


// const addItem = useCallback(() => {
//   const newId = Math.max(...formData.items.map(item => item.id), 0) + 1;
//   setFormData(prev => ({
//     ...prev,
//     items: [...prev.items, {
//       id: newId,
//       name: '',
//       category: 'Materials',
//       quantity: 1,
//       unit: 'pcs',
//       costPer: 0,
//       subTotal: 0
//     }]
//   }));
// }, [formData.items]);

// const removeItem = useCallback((id: number) => {
//   setFormData(prev => ({
//     ...prev,
//     items: prev.items.filter(item => item.id !== id)
//   }));
// }, []);

// const updateItem = useCallback(<K extends keyof ExpenseItem>(id: number, field: K, value: ExpenseItem[K]) => {
//   setFormData(prev => ({
//     ...prev,
//     items: prev.items.map(item => {
//       if (item.id === id) {
//         const updatedItem = { ...item, [field]: value };
        
//         // Handle unit change - adjust quantity if needed
//         if (field === 'unit') {
//           const unitProps = getUnitProperties(value as string);
//           if (unitProps.type === 'lumpsum') {
//             updatedItem.quantity = 1;
//           } else if (unitProps.type === 'discrete' && updatedItem.quantity % 1 !== 0) {
//             updatedItem.quantity = Math.ceil(updatedItem.quantity);
//           }
//         }
        
//         // Handle quantity validation based on unit type
//         if (field === 'quantity') {
//           const unitProps = getUnitProperties(updatedItem.unit);
//           if (unitProps.type === 'discrete') {
//             updatedItem.quantity = Math.max(1, Math.round(value as number));
//           } else if (unitProps.type === 'lumpsum') {
//             updatedItem.quantity = 1;
//           } else {
//             updatedItem.quantity = Math.max(unitProps.min, value as number);
//           }
//         }
        
//         if (field === 'quantity' || field === 'costPer' || field === 'unit') {
//           updatedItem.subTotal = Number(updatedItem.quantity) * Number(updatedItem.costPer);
//         }
//         return updatedItem;
//       }
//       return item;
//     })
//   }));
// }, []);

    if (!isOpen) return null;
  
    return (


          <ModalBackdrop isOpen={isOpen} onClose={() => {}}>
      <div className="w-full max-w-6xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200 rounded-t-2xl flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">{mode === 'edit' ? 'Edit Expense' : 'Add New Expense'}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Project Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Project Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">


              <Dropdown
                  label="Project"
                  name="project"
                  placeholder="Select Project"
                  options={projectOptions}
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: String(e) })}
                  mandatory
                />

                <Dropdown
                  label="Purchase Order"
                  name="purchaseOrder"
                  placeholder="Select Purchase Order"
                  options={purchaseOrders}
                  value={formData.purchaseOrder}
                  onChange={(e) => setFormData({ ...formData, purchaseOrder: String(e) })}
                  mandatory
                />
              <InputField
                label="Invoice Number"
                name="invoiceId"
                value={formData.invoiceId}
                onChange={(e) => setFormData({ ...formData, invoiceId: e.target.value })}
                placeholder="# Invoice Number"
              />

            <InputField
                label="Invoice Amount"
                name="invoiceAmount"
                value={formData.invoiceAmount}
                onChange={(e) => setFormData({ ...formData, invoiceAmount: Number(e.target.value) })}
                placeholder="Enter Invoice Amount"
                type="number"
              />

               <InputField
                label="Invoice Date"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
                placeholder="Enter Invoice Date"
                type="date"
              />

            <InputField
                label="Attach Invoice File"
                name="invoiceDocument"
                value={""}
                onChange={(e) => setFormData({ ...formData, invoiceDocument: e.target.value })}
                placeholder="Attach..."
                type="file"
              />                
            </div>
            

            <div className="mt-4">
              <TextAreaField
                label="Description"
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Additional notes or special conditions"
                rows={3}
              />
            </div>
          </div>

          {/* Items Table */}
          {/* <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Expense Items</h3>

            <BTButton
                 text="+ Add Item" 
                 onClick={addItem}
                />

            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left text-sm font-medium text-gray-700">#</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-700 min-w-[200px]">Name</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Quantity</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Unit</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Cost Per</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Sub Total</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {formData.items.map((item, index) => (
                    <ItemRow 
                        key={item.id}
                        item={item} 
                        index={index}
                        updateItem={updateItem}
                        removeItem={removeItem}
                        items={formData.items}
                        getUnitProperties={getUnitProperties}
                        formatQuantityPlaceholder={formatQuantityPlaceholder}
                        categories={categories}
                        units={units}
                    />
                    ))}
                </tbody>
              </table>
            </div>
          </div> */}

          {/* Summary */}
          {/* <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Total Estimate</h3>
              <div className="text-3xl font-bold text-blue-600">
                ${totalEstimate.toFixed(2)}
              </div>
            </div>
          </div> */}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            {/* <button
              onClick={exportEstimate}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Download size={16} />
              Export Estimate
            </button> */}
            <BTButton
                text="Save Estimate" 
                size="medium" 
                onClick={handleSubmit}
               />
               <BTButton
                text="Cancel" 
                size="medium" 
                type='outline_blue'
                onClick={onClose}
               />
            {/* <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Save size={16} />
              Save Estimate
            </button> */}
            {/* <button
              onClick={onClose}
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Close
            </button> */}
          </div>
        </div>
      </div>
    </ModalBackdrop>
    );
};

export default ExpenseModal;

// Move ItemRow outside the main component and memoize it
const ItemRow = React.memo(({ 
  item, 
  index, 
  updateItem, 
  removeItem, 
  items, 
  getUnitProperties, 
  formatQuantityPlaceholder, 
//   categories,
  units 
}: { 
  item: ExpenseItem; 
  index: number; 
  updateItem: <K extends keyof ExpenseItem>(id: number, field: K, value: ExpenseItem[K]) => void;
  removeItem: (id: number) => void;
  items: ExpenseItem[];
  getUnitProperties: (unitValue: string) => UnitProperties;
  formatQuantityPlaceholder: (unitValue: string) => string;
  categories: Array<{ value: string; label: string }>;
  units: UnitProperties[];
}) => {
  const unitProps = getUnitProperties(item.unit);
  
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="p-2 text-sm text-gray-600 text-center">{index + 1}</td>
      <td className="p-2">
        <input
          type="text"
          value={item.name}
          onChange={(e) => updateItem(item.id, 'name', e.target.value)}
          placeholder="Item description"
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
        />
      </td>
      {/* <td className="p-2">
        <select
          value={item.category}
          onChange={(e) => updateItem(item.id, 'category', e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </td> */}
      <td className="p-2">
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
          min={unitProps.min}
          step={unitProps.step}
          disabled={unitProps.type === 'lumpsum'}
          placeholder={formatQuantityPlaceholder(item.unit)}
          className={`w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 ${
            unitProps.type === 'lumpsum' ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
          title={unitProps.type === 'lumpsum' ? 'Quantity is fixed at 1 for lump sum items' : ''}
        />
      </td>
      <td className="p-2">
        <select
          value={item.unit}
          onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
        >
          {units.map(unit => (
            <option key={unit.value} value={unit.value}>{unit.label}</option>
          ))}
        </select>
      </td>
      <td className="p-2">
        <input
          type="number"
          value={item.costPer}
          onChange={(e) => updateItem(item.id, 'costPer', parseFloat(e.target.value) || 0)}
          min={0}
          step={0.01}
          placeholder={unitProps.type === 'lumpsum' ? 'Total cost' : 'Cost per unit'}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
        />
      </td>
      <td className="p-2 text-right font-medium">
        ${item.subTotal?.toFixed(2) || '0.00'}
      </td>
      <td className="p-2 text-center">
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700 transition-colors p-1"
          disabled={items.length <= 1}
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
});

ItemRow.displayName = 'ItemRow';