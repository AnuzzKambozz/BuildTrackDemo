"use client";
import React, { useState, useEffect } from 'react';
import { NewItemForm } from '../types/inventory';
import InputField from '@/app/components/textField'; // Update path as needed
import Dropdown from '@/app/components/dropdowns/dropdown_new'; // Update path as needed
import { Building2 } from 'lucide-react';
import TextAreaField from '@/app/components/textAreaField';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: NewItemForm) => void;
}

interface FormErrors {
  name?: string;
  category?: string;
  skuPartNumber?: string;
  unit?: string;
  currentStock?: string;
  minimumStockLevel?: string;
  unitCost?: string;
  supplier?: string;
  location?: string;
  status?: string;
  description?: string;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<NewItemForm>({
    name: '',
    category: '',
    skuPartNumber: '',
    unit: '',
    currentStock: 0,
    minimumStockLevel: 0,
    unitCost: 0,
    supplier: '',
    location: '',
    status: 'In Stock',
    description: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSupplierName, setNewSupplierName] = useState('');

  // Dynamic options that can be updated
  const [categoryOptions, setCategoryOptions] = useState([
    'Electronics',
    'Materials',
    'Equipment',
    'Tools',
    'Supplies',
    'Safety',
    'Hardware'
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [supplierOptions, setSupplierOptions] = useState([
    { value: 'supplier-a', label: 'Supplier A Corp', description: '' },
    { value: 'supplier-b', label: 'Supplier B Ltd', description: '' },
    { value: 'supplier-c', label: 'Supplier C Inc', description: '' },
  ]);

  const unitOptions = [
    { value: 'pieces', label: 'Pieces (pcs)', description: 'Individual items' },
    { value: 'pcs', label: 'Pcs', description: 'Short for pieces' },
    { value: 'kg', label: 'Kilograms (kg)', description: 'Weight measurement' },
    { value: 'lbs', label: 'Pounds (lbs)', description: 'Imperial weight' },
    { value: 'm', label: 'Meters (m)', description: 'Length measurement' },
    { value: 'ft', label: 'Feet (ft)', description: 'Imperial length' },
    { value: 'L', label: 'Liters (L)', description: 'Volume measurement' },
    { value: 'gal', label: 'Gallons (gal)', description: 'Imperial volume' },
    { value: 'bags', label: 'Bags', description: 'Bagged items' },
    { value: 'box', label: 'Box', description: 'Boxed items' },
    { value: 'pack', label: 'Pack', description: 'Packaged items' },
    { value: 'sets', label: 'Sets', description: 'Set of items' },
    { value: 'rolls', label: 'Rolls', description: 'Rolled materials' },
    { value: 'tons', label: 'Tons', description: 'Large weight measurement' }
  ];

  const statusOptions = [
    { value: 'In Stock', label: 'In Stock', description: 'Available for use' },
    { value: 'Low Stock', label: 'Low Stock', description: 'Below minimum level' },
    { value: 'Out of Stock', label: 'Out of Stock', description: 'Not available' },
    // { value: 'On Order', label: '📦 On Order', description: 'Being replenished' },
    // { value: 'Discontinued', label: '🚫 Discontinued', description: 'No longer available' }
  ];

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        category: '',
        skuPartNumber: '',
        unit: '',
        currentStock: 0,
        minimumStockLevel: 0,
        unitCost: 0,
        supplier: '',
        location: '',
        status: 'In Stock',
        description: ''
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'currentStock' || name === 'minimumStockLevel' || name === 'unitCost'
        ? parseFloat(value) || 0
        : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Handle dropdown changes
  const handleDropdownChange = (name: keyof NewItemForm) => (value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user makes selection
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Item name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.skuPartNumber.trim()) newErrors.skuPartNumber = 'SKU/Part number is required';
    if (!formData.unit) newErrors.unit = 'Unit is required';
    if (formData.currentStock < 0) newErrors.currentStock = 'Current stock must be 0 or greater';
    if (formData.minimumStockLevel < 0) newErrors.minimumStockLevel = 'Minimum stock level must be 0 or greater';
    // if (formData.unitCost <= 0) newErrors.unitCost = 'Unit cost must be greater than 0';
    // if (!formData.supplier.trim()) newErrors.supplier = 'Supplier is required';
    // if (!formData.location.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle adding new category
  const handleAddCategory = () => {
    setShowAddCategoryModal(true);
  };

  const handleSaveCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = newCategoryName.trim();
      setCategoryOptions(prev => [...prev, newCategory]);
      setFormData(prev => ({ ...prev, category: newCategory }));
      setNewCategoryName('');
      setShowAddCategoryModal(false);
    }
  };

  // Handle adding new supplier
  // const handleAddSupplier = () => {
  //   setShowAddSupplierModal(true);
  // };

  const handleSaveSupplier = () => {
    if (newSupplierName.trim()) {
      const newSupplierId = `supplier-${Date.now()}`;
      const newSupplier = {
        value: newSupplierId,
        label: newSupplierName.trim(),
        description: 'Custom supplier'
      };
      setSupplierOptions(prev => [...prev, newSupplier]);
      setFormData(prev => ({ ...prev, supplier: newSupplierId }));
      setNewSupplierName('');
      setShowAddSupplierModal(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add New Item</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Item Name */}
            <div>
              <InputField
                label="Item Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                mandatory={true}
                error={errors.name}
                highlight={!!errors.name}
              />
            </div>

            {/* Category */}
            <div>
              <Dropdown
                name="category"
                value={formData.category}
                options={categoryOptions}
                onChange={handleDropdownChange('category')}
                label="Category"
                placeholder="Select a category"
                mandatory={true}
                searchable={true}
                showAddButton={true}
                addButtonText="Add Category"
                addButtonIcon={<Building2 className="w-4 h-4" />}
                onAddItem={handleAddCategory}
                error={errors.category}
                highlight={!!errors.category}
                searchPlaceholder="Search categories..."
                helperText="Select existing or add new category"
              />
            </div>

            {/* SKU/Part Number */}
            <div>
              <InputField
                label="SKU/Part Number"
                name="skuPartNumber"
                value={formData.skuPartNumber}
                onChange={handleInputChange}
                mandatory={true}
                error={errors.skuPartNumber}
                highlight={!!errors.skuPartNumber}
              />
            </div>

            {/* Unit */}
            <div>
              <Dropdown
                name="unit"
                value={formData.unit}
                options={unitOptions}
                onChange={handleDropdownChange('unit')}
                label="Unit"
                placeholder="Select a unit"
                mandatory={true}
                searchable={true}
                error={errors.unit}
                highlight={!!errors.unit}
                searchPlaceholder="Search units..."
                helperText="Choose measurement unit"
              />
            </div>

            {/* Current Stock */}
            <div>
              <InputField
                label="Current Stock"
                type="number"
                name="currentStock"
                value={formData.currentStock}
                onChange={handleInputChange}
                mandatory={true}
                error={errors.currentStock}
                highlight={!!errors.currentStock}
                min="0"
              />
            </div>

            {/* Minimum Stock Level */}
            <div>
              <InputField
                label="Minimum Stock Level"
                type="number"
                name="minimumStockLevel"
                value={formData.minimumStockLevel}
                onChange={handleInputChange}
                mandatory={true}
                error={errors.minimumStockLevel}
                highlight={!!errors.minimumStockLevel}
                min="0"
              />
            </div>

            {/* Unit Cost */}
            {/* <div>
              <InputField
                label="Unit Cost"
                type="number"
                name="unitCost"
                value={formData.unitCost}
                onChange={handleInputChange}
                mandatory={true}
                error={errors.unitCost}
                highlight={!!errors.unitCost}
                min="0"
              />
            </div> */}

            {/* Supplier */}
            {/* <div>
              <Dropdown
                name="supplier"
                value={formData.supplier}
                options={supplierOptions}
                onChange={handleDropdownChange('supplier')}
                label="Supplier"
                placeholder="Select a supplier"
                mandatory={true}
                searchable={true}
                showAddButton={true}
                addButtonText="Add Supplier"
                addButtonIcon={<User className="w-4 h-4" />}
                onAddItem={handleAddSupplier}
                error={errors.supplier}
                highlight={!!errors.supplier}
                searchPlaceholder="Search suppliers..."
                helperText="Select existing or add new supplier"
              />
            </div> */}

            {/* Location */}
            {/* <div>
              <InputField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Warehouse A, Shelf 3"
                mandatory={true}
                error={errors.location}
                highlight={!!errors.location}
              />
            </div> */}

            {/* Status */}
            <div>
              <Dropdown
                name="status"
                value={formData.status}
                options={statusOptions}
                onChange={handleDropdownChange('status')}
                label="Status"
                placeholder="Select status"
                searchable={false}
                clearable={false}
                helperText="Current inventory status"
              />
            </div>
          </div>

          {/* Description - Full Width */}
          <div className="mt-6">
            {/* <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Detailed description of the item"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            /> */}
                      <TextAreaField
                          label="Description"
                          name="description"
                          value={formData.description}
                          placeholder="Detailed description of the item"
                          rows={4}
                          onChange={handleInputChange}
                          mandatory={false}
                          className='w-full px-3 py-2'
          />
          </div>



          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Item
            </button>
          </div>
        </form>

        {/* Add Category Modal */}
        {showAddCategoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSaveCategory()}
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddCategoryModal(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCategory}
                  disabled={!newCategoryName.trim()}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Supplier Modal */}
        {showAddSupplierModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Add New Supplier</h3>
              <input
                type="text"
                value={newSupplierName}
                onChange={(e) => setNewSupplierName(e.target.value)}
                placeholder="Enter supplier name"
                className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSaveSupplier()}
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddSupplierModal(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSupplier}
                  disabled={!newSupplierName.trim()}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                >
                  Add Supplier
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddItemModal;