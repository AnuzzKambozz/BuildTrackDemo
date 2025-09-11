"use client";
import React, { useState, useCallback, useMemo } from 'react';
import { Trash2 } from 'lucide-react';
import ModalBackdrop from '@/app/components/modal_backdrop';
import InputField from '@/app/components/textField';
import TextAreaField from '@/app/components/textAreaField';
import {BTButton} from '@/app/components/buttons/BTButton';

interface EstimateItem {
  id: number;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  costPer: number;
  subTotal: number;
}

interface EstimateDetails {
  client: string;
  contact: string;
  email: string;
  estimator: string;
  project: string;
  location: string;
  planDate: string;
  revision: string;
  drawings: string;
  scope: string;
  notes: string;
  items: EstimateItem[];
  categoryTotals: Record<string, number>;
}

interface EstimateData {
  id: number;
  name: string;
  project_type: string;
  status: string;
  total_cost: number;
  created_date: string;
  client: string;
  materials_cost: number;
  labor_cost: number;
  equipment_cost: number;
  overhead: number;
  profit_margin: number;
  estimate_details: EstimateDetails;
}

interface AddEstimationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (estimateData: EstimateData) => void;
}

// Define types for unit properties
interface UnitProperties {
  value: string;
  label: string;
  type: 'discrete' | 'area' | 'linear' | 'volume' | 'weight' | 'time' | 'lumpsum';
  step: number;
  min: number;
}

interface Category {
  value: string;
  label: string;
}

const AddEstimationModal: React.FC<AddEstimationModalProps> = ({ isOpen, onClose, onSave }) => {
  const [estimate, setEstimate] = useState({
    client: '',
    contact: '',
    email: '',
    estimator: '',
    project: '',
    location: '',
    planDate: '',
    revision: '',
    drawings: '',
    scope: '',
    notes: ''
  });

  const [items, setItems] = useState<EstimateItem[]>([
    { id: 1, description: '', category: 'Materials', quantity: 1, unit: 'pcs', costPer: 0, subTotal: 0 }
  ]);

  const categories: Category[] = useMemo(() => [
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
  
  const units: UnitProperties[] = useMemo(() => [
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

  // Helper functions
  const getUnitProperties = useCallback((unitValue: string): UnitProperties => {
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

  const handleEstimateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEstimate(prev => ({ ...prev, [name]: value }));
  };

  const addItem = useCallback(() => {
    const newId = Math.max(...items.map(item => item.id), 0) + 1;
    setItems(prev => [...prev, {
      id: newId,
      description: '',
      category: 'Materials',
      quantity: 1,
      unit: 'pcs',
      costPer: 0,
      subTotal: 0
    }]);
  }, [items]);

  const removeItem = useCallback((id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateItem = useCallback((id: number, field: keyof EstimateItem, value: string | number) => {
    setItems(prev => prev.map(item => {
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
    }));
  }, [getUnitProperties]);

  const totalEstimate = items.reduce((sum, item) => sum + item.subTotal, 0);

  const handleSave = () => {
    // Calculate category totals for the estimate
    const categoryTotals = categories.reduce((acc: Record<string, number>, category) => {
      const total = items
        .filter(item => item.category === category.value)
        .reduce((sum, item) => sum + item.subTotal, 0);
      if (total > 0) {
        acc[category.value.toLowerCase().replace(' ', '_') + '_cost'] = total;
      }
      return acc;
    }, {} as Record<string, number>);

    const estimateData = {
      id: Date.now(),
      name: estimate.project || 'Untitled Project',
      project_type: 'commercial',
      status: 'draft',
      total_cost: totalEstimate,
      created_date: new Date().toISOString().split('T')[0],
      client: estimate.client,
      materials_cost: categoryTotals.materials_cost || 0,
      labor_cost: categoryTotals.labor_cost || 0,
      equipment_cost: categoryTotals.equipment_cost || 0,
      overhead: categoryTotals.general_conditions_cost || 0,
      profit_margin: 15,
      estimate_details: {
        ...estimate,
        items,
        categoryTotals
      }
    };

    onSave(estimateData);
  };

  if (!isOpen) return null;

  return (
    <ModalBackdrop isOpen={isOpen} onClose={() => {}}>
      <div className="w-full max-w-6xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200 rounded-t-2xl flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">Add Estimation</h2>
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
              <InputField
                label="Client"
                name="client"
                value={estimate.client}
                onChange={handleEstimateChange}
                placeholder="Client name"
              />
              <InputField
                label="Contact"
                name="contact"
                value={estimate.contact}
                onChange={handleEstimateChange}
                placeholder="Contact person"
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                value={estimate.email}
                onChange={handleEstimateChange}
                placeholder="contact@email.com"
              />
              <InputField
                label="Estimator"
                name="estimator"
                value={estimate.estimator}
                onChange={handleEstimateChange}
                placeholder="Your name"
              />
              <InputField
                label="Project"
                name="project"
                value={estimate.project}
                onChange={handleEstimateChange}
                placeholder="Project name"
              />
              <InputField
                label="Location"
                name="location"
                value={estimate.location}
                onChange={handleEstimateChange}
                placeholder="Project location"
              />
              <InputField
                label="Plan Date"
                name="planDate"
                type="date"
                value={estimate.planDate}
                onChange={handleEstimateChange}
              />
            </div>

            <div className="mt-4">
              <TextAreaField
                label="Notes"
                name="notes"
                value={estimate.notes}
                onChange={handleEstimateChange}
                placeholder="Additional notes or special conditions"
                rows={3}
              />
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Estimation Items</h3>

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
                    <th className="p-3 text-left text-sm font-medium text-gray-700 min-w-[200px]">Description</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Category</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Quantity</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Unit</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Cost Per</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Sub Total</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                    <ItemRow 
                        key={item.id}
                        item={item} 
                        index={index}
                        updateItem={updateItem}
                        removeItem={removeItem}
                        items={items}
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
                ${totalEstimate.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            <BTButton
                text="Save Estimate" 
                size="medium" 
                onClick={handleSave}
               />
               <BTButton
                text="Cancel" 
                size="medium" 
                type='outline_blue'
                onClick={onClose}
               />
          </div>
        </div>
      </div>
    </ModalBackdrop>
  );
};

export default AddEstimationModal;

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
  item: EstimateItem; 
  index: number; 
  updateItem: (id: number, field: keyof EstimateItem, value: string | number) => void;
  removeItem: (id: number) => void;
  items: EstimateItem[];
  getUnitProperties: (unitValue: string) => UnitProperties;
  formatQuantityPlaceholder: (unitValue: string) => string;
  categories: Category[];
  units: UnitProperties[];
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
          onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || unitProps.min)}
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
          min="0"
          step="0.01"
          placeholder={unitProps.type === 'lumpsum' ? 'Total cost' : 'Cost per unit'}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
        />
      </td>
      <td className="p-2 text-right font-medium">
        ${item.subTotal.toFixed(2)}
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