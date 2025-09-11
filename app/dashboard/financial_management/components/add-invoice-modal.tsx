"use client";

import { InvoiceModal, InvoiceItemModal } from "@/app/models/common";
import {Trash2} from 'lucide-react';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import  Dropdown  from "@/app/components/dropdowns/dropdown_new";
import ModalBackdrop from '@/app/components/modal_backdrop';
import InputField from '@/app/components/textField';
// import TextAreaField from '@/app/components/textAreaField';
import {BTButton} from '@/app/components/buttons/BTButton';

// Define proper types for unit and category options
interface UnitOption {
  value: string;
  label: string;
  type: 'discrete' | 'area' | 'linear' | 'volume' | 'weight' | 'time' | 'lumpsum';
  step: number;
  min: number;
}

interface CategoryOption {
  value: string;
  label: string;
}

interface AddInvoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (invoice: InvoiceModal | Omit<InvoiceModal, 'id'>) => void;
    invoice?: InvoiceModal;
    mode: 'add' | 'edit';
}



const AddInvoiceModal: React.FC<AddInvoiceModalProps> = ({ isOpen, onClose, onSubmit, invoice, mode }) => {
    const [formData, setFormData] = useState<{
      client: string;
      clientEmail: string;
      projectName: string; // Fixed: Remove undefined from union
      items: InvoiceItemModal[];   
      status: string;
      amount: number; // Added: Missing from interface
      issueDate: string; // Added: Missing from interface
      dueDate: string;
    }>({
      client: '',  
      clientEmail: '',
      projectName: '',
      items: [],
      status: 'draft',
      amount: 0, 
      issueDate: '', 
      dueDate: '', 

    });

    // Define categories and units with proper typing and memoization
    const categories: CategoryOption[] = useMemo(() => [
      { value: 'Materials', label: 'Materials' },
      { value: 'Tools', label: 'Tools' },
      { value: 'Safety', label: 'Safety' },
      { value: 'Hardware', label: 'Hardware' },
      { value: 'Service', label: 'Service' },
      { value: 'Labor', label: 'Labor' },
      { value: 'Equipment', label: 'Equipment' },
      { value: 'General Conditions', label: 'General Conditions' },
      { value: 'Other', label: 'Other' }
    ], []);
    
    const units: UnitOption[] = useMemo(() => [
      { value: 'pcs', label: 'pcs', type: 'discrete', step: 1, min: 1 },
      { value: 'sq ft', label: 'sq ft', type: 'area', step: 0.01, min: 0.01 },
      { value: 'sq m', label: 'sq m', type: 'area', step: 0.01, min: 0.01 },
      { value: 'lin ft', label: 'lin ft', type: 'linear', step: 0.01, min: 0.01 },
      { value: 'lin m', label: 'lin m', type: 'linear', step: 0.01, min: 0.01 },
      { value: 'cu ft', label: 'cu ft', type: 'volume', step: 0.01, min: 0.01 },
      { value: 'cu m', label: 'cu m', type: 'volume', step: 0.01, min: 0.01 },
      { value: 'lbs', label: 'lbs', type: 'weight', step: 0.1, min: 0.1 },
      { value: 'kg', label: 'kg', type: 'weight', step: 0.1, min: 0.1 },
      { value: 'hrs', label: 'hrs', type: 'time', step: 0.25, min: 0.25 },
      { value: 'days', label: 'days', type: 'time', step: 0.5, min: 0.5 },
      { value: 'ls', label: 'ls (lump sum)', type: 'lumpsum', step: 1, min: 1 }
    ], []);

    const projectOptions = [
        { value: 'Spethman Renovation', label: 'Spethman Renovation' },
        { value: 'Steven Kitchen', label: 'Steven Kitchen' },
        { value: 'Asian Zone Spec Home', label: 'Asian Zone Spec Home' },
        { value: 'Bruke Roof Siding', label: 'Bruke Roof Siding' },
    ];

   const clientOptions = [
        { value: 'XYZ Corp', label: 'XYZ Corp' },
        { value: 'ABC Enterprise', label: 'ABC Enterprise' },
        { value: 'Google Inc.', label: 'Google Inc.' },
        { value: 'Amazon Inc.', label: 'Amazon Inc.' },
    ];

    const statusOptions = [
        { value: 'draft', label: 'Draft' },
        { value: 'sent', label: 'Sent' },
        { value: 'paid', label: 'Paid' },
        { value: 'overdue', label: 'Overdue' },
    ];




    // Helper functions with proper typing
    const getUnitProperties = useCallback((unitValue: string): UnitOption => {
      return units.find(u => u.value === unitValue) || units[0];
    }, [units]);

    const formatQuantityPlaceholder = useCallback((unitValue: string): string => {
      const unit = getUnitProperties(unitValue);
      switch (unit.type) {
        case 'discrete':
          return 'e.g., 10 pieces';
        case 'area':
          return 'e.g., 150.25';
        case 'linear':
          return 'e.g., 25.5';
        case 'volume':
          return 'e.g., 12.75';
        case 'weight':
          return 'e.g., 50.5';
        case 'time':
          return unit.value === 'hrs' ? 'e.g., 8.5' : 'e.g., 3.5';
        case 'lumpsum':
          return '1 (fixed)';
        default:
          return 'Enter quantity';
      }
    }, [getUnitProperties]);
  
    useEffect(() => {
      if (invoice && mode === 'edit') {
        setFormData({

      client: invoice.client,  
      clientEmail: invoice.clientEmail,
      projectName: invoice.projectName,
      items: invoice.items,
      status: invoice.status,
      amount: invoice.amount, 
      issueDate: invoice.issueDate, 
      dueDate: invoice.dueDate, 
        });
      } else {
        setFormData({
      client: '',  
      clientEmail: '',
      projectName: '',
      items: [{
            id: 1,
            description: '',
            category: 'Materials',
            quantity: 1,
            unit: 'pcs',
            costPer: 0,
            subTotal: 0
            }],
      status: 'draft',
      amount: 0, 
      issueDate: '', 
      dueDate: '', 
        });
      }
    }, [invoice, mode]);
  
    const handleSubmit = () => {
      if (mode === 'edit' && invoice) {
        onSubmit({
          ...invoice,
        client: invoice.client,  
        clientEmail: invoice.clientEmail,
        projectName: invoice.projectName,
        items: invoice.items,
        status: invoice.status,
        amount: invoice.amount, 
        issueDate: invoice.issueDate, 
        dueDate: invoice.dueDate, 
        });
      } else {
        onSubmit({

      client: formData.client,  
      clientEmail: formData.clientEmail,
      projectName: formData.projectName,
      items: formData.items,
      status: formData.status,
      amount: totalAmount, 
      issueDate: formData.issueDate, 
      dueDate: formData.dueDate, 
      projectCode: ""


         
        });
      }
      onClose();
    };
   const totalAmount = formData.items.reduce((sum, item) => sum + item.subTotal, 0);

const addItem = useCallback(() => {
  const newId = Math.max(...formData.items.map(item => item.id), 0) + 1;
  setFormData(prev => ({
    ...prev,
    items: [...prev.items, {
         id: newId,
            description: '',
            category: 'Materials',
            quantity: 1,
            unit: 'pcs',
            costPer: 0,
            subTotal: 0,

    }]
  }));
}, [formData.items]);

const removeItem = useCallback((id: number) => {
  setFormData(prev => ({
    ...prev,
    items: prev.items.filter(item => item.id !== id)
  }));
}, []);

const updateItem = useCallback((id: number, field: keyof InvoiceItemModal, value: string | number) => {
  setFormData(prev => ({
    ...prev,
    items: prev.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Handle unit change - adjust quantity if needed
        if (field === 'unit') {
          const unitProps = getUnitProperties(value as string);
          if (unitProps.type === 'lumpsum') {
            updatedItem.quantity = 1;
          } else if (unitProps.type === 'discrete' && updatedItem.quantity % 1 !== 0) {
            updatedItem.quantity = Math.ceil(updatedItem.quantity);
          }
        }
        
        // Handle quantity validation based on unit type
        if (field === 'quantity') {
          const unitProps = getUnitProperties(updatedItem.unit);
          if (unitProps.type === 'discrete') {
            updatedItem.quantity = Math.max(1, Math.round(value as number));
          } else if (unitProps.type === 'lumpsum') {
            updatedItem.quantity = 1;
          } else {
            updatedItem.quantity = Math.max(unitProps.min, value as number);
          }
        }
        
        if (field === 'quantity' || field === 'costPer' || field === 'unit') {
          updatedItem.subTotal = Number(updatedItem.quantity) * Number(updatedItem.costPer);
        }
        return updatedItem;
      }
      return item;
    })
  }));
}, [getUnitProperties]); // Added missing dependency

    if (!isOpen) return null;
  
    return (


          <ModalBackdrop isOpen={isOpen} onClose={() => {}}>
      <div className="w-full max-w-6xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200 rounded-t-2xl flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">{mode === 'edit' ? 'Edit Invoice' : 'Add New Invoice'}</h2>
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
                  label="Client"
                  name="client"
                  placeholder="Select Client"
                  options={clientOptions}
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: String(e) })}
                  mandatory
                />

                <InputField
                label="Client Email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                placeholder="Contact person"
              />


              <Dropdown
                  label="Project"
                  name="project"
                  placeholder="Select Project"
                  options={projectOptions}
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: String(e) })}
                  mandatory
                />

             <InputField
                label="Issue Date"
                name="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                placeholder="Contact person"
              />

            <InputField
                label="Due Date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                placeholder="Contact person"
              />

              <Dropdown
                  label="Status"
                  name="status"
                  placeholder="Select Status"
                  options={statusOptions}
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: String(e) })}
                  mandatory
                />


                {/* <Dropdown
                  label="Category"
                  name="category"
                  placeholder="Select Category"
                  options={categories}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: String(e) })}
                  mandatory
                /> */}
              {/* <InputField
                label="Category"
                name="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Contact person"
              /> */}

            </div>
            

            {/* <div className="mt-4">
              <TextAreaField
                label="Description"
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Additional notes or special conditions"
                rows={3}
              />
            </div> */}
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Invoice Items</h3>

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
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Category</th>
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
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Total Estimate</h3>
              <div className="text-3xl font-bold text-blue-600">
                ${totalAmount.toFixed(2)}
              </div>
            </div>
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
              {categories.map(category => {
                const categoryTotal = items
                  .filter(item => item.category === category.value)
                  .reduce((sum, item) => sum + item.subTotal, 0);
                return categoryTotal > 0 ? (
                  <div key={category.value} className="flex justify-between">
                    <span>{category.label}:</span>
                    <span className="font-medium">${categoryTotal.toFixed(2)}</span>
                  </div>
                ) : null;
              })}
            </div> */}
          </div>

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
                text="Save Invoice" 
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

export default AddInvoiceModal;

// Move ItemRow outside the main component and memoize it
const ItemRow = React.memo(({ 
  item, 
  index, 
  updateItem, 
  removeItem, 
  items, 
  getUnitProperties, 
  formatQuantityPlaceholder, 
  categories, 
  units 
}: { 
  item: InvoiceItemModal; 
  index: number; 
  updateItem: (id: number, field: keyof InvoiceItemModal, value: string | number) => void;
  removeItem: (id: number) => void;
  items: InvoiceItemModal[];
  getUnitProperties: (unitValue: string) => UnitOption;
  formatQuantityPlaceholder: (unitValue: string) => string;
  categories: CategoryOption[];
  units: UnitOption[];
}) => {
  const unitProps = getUnitProperties(item.unit);
  
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="p-2 text-sm text-gray-600 text-center">{index + 1}</td>
      <td className="p-2">
        <input
          type="text"
          value={item.description}
          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
          placeholder="Item description"
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
        />
      </td>
      <td className="p-2">
        <select
          value={item.category}
          onChange={(e) => updateItem(item.id, 'category', e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </td>
      <td className="p-2">
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target?.value) || 0)}
        //   min={unitProps.min}
        //   step={unitProps.step}
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
          value={item?.costPer}
          onChange={(e) => updateItem(item.id, 'costPer', parseFloat(e.target?.value) || 0)}
        //   min="0"
        //   step="0.01"
          placeholder={unitProps.type === 'lumpsum' ? 'Total cost' : 'Cost per unit'}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
        />
      </td>
      <td className="p-2 text-right font-medium">
        ${item.subTotal?.toFixed(2) || 0}
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