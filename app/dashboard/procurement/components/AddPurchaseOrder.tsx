import  Dropdown  from "@/app/components/dropdowns/dropdown_new";
import InputField from "@/app/components/textField";
// import { div } from "framer-motion/client";
import { X, Trash2, Plus } from "lucide-react";
import { useState } from "react";
// import { PurchaseOrder } from "../types/procurement";


interface PurchaseOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
//   onSubmit: (formData: PurchaseOrder) => void;
}

const PurchaseOrderModal: React.FC<PurchaseOrderModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
      purchaseOrderNumber: '',
      supplier: '',
      project: '',
      orderDate: '',
      expectedDelivery: '',
      priority: 'Low',
      taxRate: '8.5',
      specialInstructions: ''
    });
  
    const [items, setItems] = useState([
      { id: 1, itemName: '', quantity: '', unitPrice: '' }
    ]);
  
    // Options for dropdowns
    const supplierOptions = [
      { value: 'supplier1', label: 'ABC Supplies Inc.' },
      { value: 'supplier2', label: 'XYZ Materials Ltd.' },
      { value: 'supplier3', label: 'Tech Solutions Corp.' },
      { value: 'supplier4', label: 'Industrial Parts Co.' },
      { value: 'supplier5', label: 'Office Depot' }
    ];
  
    const projectOptions = [
      { value: 'project1', label: 'Website Redesign' },
      { value: 'project2', label: 'Mobile App Development' },
      { value: 'project3', label: 'Data Migration' },
      { value: 'project4', label: 'Security Upgrade' },
      { value: 'project5', label: 'Infrastructure Expansion' }
    ];
  
    const priorityOptions = [
      { value: 'Low', label: 'Low' },
      { value: 'Medium', label: 'Medium' },
      { value: 'High', label: 'High' },
      { value: 'Urgent', label: 'Urgent' }
    ];
  
    const addItem = () => {
      const newId = Math.max(...items.map(item => item.id)) + 1;
      setItems([...items, { id: newId, itemName: '', quantity: '', unitPrice: '' }]);
    };
  
    const removeItem = (id: number) => {
      if (items.length > 1) {
        setItems(items.filter(item => item.id !== id));
      }
    };
  
    const updateItem = (id: number, field: string, value: string) => {
      setItems(items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      ));
    };
  
    const updateFormData = (field: keyof typeof formData, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };
  
    const calculateSubtotal = () => {
      return items.reduce((sum, item) => {
        const quantity = parseFloat(item.quantity) || 0;
        const unitPrice = parseFloat(item.unitPrice) || 0;
        return sum + (quantity * unitPrice);
      }, 0);
    };
  
    const calculateTaxAmount = () => {
      const subtotal = calculateSubtotal();
      const taxRate = parseFloat(formData.taxRate) || 0;
      return (subtotal * taxRate) / 100;
    };
  
    const calculateTotal = () => {
      return calculateSubtotal() + calculateTaxAmount();
    };
  
    const handleSubmit = () => {
      // const purchaseOrderData = {
      //   ...formData,
      //   items,
      //   subtotal: calculateSubtotal(),
      //   taxAmount: calculateTaxAmount(),
      //   totalAmount: calculateTotal()
      // };
      
    //   onSubmit?.(purchaseOrderData);
      onClose?.();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
          {/* Header - Fixed */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0">
            <h2 className="text-2xl font-semibold text-gray-900">Create Purchase Order</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
  
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Purchase Order Number"
                  name="purchaseOrderNumber"
                  placeholder="Enter PO number"
                  value={formData.purchaseOrderNumber}
                  onChange={(e) => updateFormData('purchaseOrderNumber', e.target.value)}
                  mandatory
                />
                <Dropdown
                  label="Supplier"
                  name="supplier"
                  placeholder="Select Supplier"
                  options={supplierOptions}
                  value={formData.supplier}
                  onChange={(value) => updateFormData('supplier', value as string)}
                />
              </div>
  
              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Dropdown
                  label="Project"
                  name="project"
                  placeholder="Select Project"
                  options={projectOptions}
                  value={formData.project}
                  onChange={(value) => updateFormData('project', value as string)}
                  mandatory
                />
                <InputField
                  label="Order Date"
                  name="orderDate"
                  type="date"
                  value={formData.orderDate}
                  onChange={(e) => updateFormData('orderDate', e.target.value)}
                  mandatory
                />
              </div>
  
              {/* Third Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Expected Delivery"
                  name="expectedDelivery"
                  type="date"
                  value={formData.expectedDelivery}
                  onChange={(e) => updateFormData('expectedDelivery', e.target.value)}
                  mandatory
                />
                <Dropdown
                  label="Priority"
                  name="priority"
                  options={priorityOptions}
                  value={formData.priority}
                  onChange={(value) => updateFormData('priority', value as string)}
                />
              </div>
  
              {/* Items Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Items</h3>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <InputField
                          label="Item Name"
                          name={`itemName-${item.id}`}
                          placeholder="Enter item name"
                          value={item.itemName}
                          onChange={(e) => updateItem(item.id, 'itemName', e.target.value)}
                          mandatory
                        />
                        <InputField
                          label="Quantity"
                          name={`quantity-${item.id}`}
                          type="number"
                          placeholder="Enter quantity"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                          min="0"
                          mandatory
                        />
                        <InputField
                          label="Unit Price"
                          name={`unitPrice-${item.id}`}
                          type="number"
                          placeholder="Enter unit price"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, 'unitPrice', e.target.value)}
                          min="0"
                          mandatory
                        />
                      </div>
                      {items.length > 1 && (
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                        >
                          <Trash2 size={16} />
                          Remove Item
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={addItem}
                  className="flex items-center gap-2 mt-4 px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors text-sm"
                >
                  <Plus size={16} />
                  Add Item
                </button>
              </div>
  
              {/* Financial Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Subtotal"
                  name="subtotal"
                  value={`$${calculateSubtotal().toFixed(2)}`}
                  onChange={() => {}}
                  disabled
                />
                <InputField
                  label="Tax Rate (%)"
                  name="taxRate"
                  type="number"
                  value={formData.taxRate}
                  onChange={(e) => updateFormData('taxRate', e.target.value)}
                  min="0"
                  max="100"
                  highlight
                />
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Tax Amount"
                  name="taxAmount"
                  value={`$${calculateTaxAmount().toFixed(2)}`}
                  onChange={() => {}}
                  disabled
                />
                <InputField
                  label="Total Amount"
                  name="totalAmount"
                  value={`$${calculateTotal().toFixed(2)}`}
                  onChange={() => {}}
                  disabled
                  className="font-semibold"
                />
              </div>
  
              {/* Special Instructions */}
              <div>
                <label className="block text-[#7E7E7E] text-[16px] font-medium leading-tight pl-[10px] mb-3">
                  Special Instructions
                </label>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={(e) => updateFormData('specialInstructions', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-vertical text-base"
                  placeholder="Any special delivery or quality requirements"
                />
              </div>
            </div>
          </div>
  
          {/* Footer - Fixed */}
          <div className="flex justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl flex-shrink-0">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create Purchase Order
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default PurchaseOrderModal;