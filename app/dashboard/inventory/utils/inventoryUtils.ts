// utils/inventoryUtils.ts
import { InventoryItem, Status, DashboardStats, NewItemForm, Category, Unit } from '../types/inventory';

export const calculateDashboardStats = (items: InventoryItem[]): DashboardStats => {
  const totalItems = items.reduce((sum, item) => sum + item.currentStock, 0);
  const totalValue = items.reduce((sum, item) => sum + (item.currentStock * item.unitCost), 0);
  const lowStockItems = items.filter(item => 
    item.currentStock > 0 && item.currentStock <= item.reorderPoint
  ).length;
  const outOfStockItems = items.filter(item => item.currentStock === 0).length;

  return {
    totalItems,
    totalValue,
    lowStockItems,
    outOfStockItems
  };
};

export const filterItems = (
  items: InventoryItem[],
  searchTerm: string,
  selectedCategory: string,
  selectedStatus: string
): InventoryItem[] => {
  return items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All Status' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });
};

export const generateItemId = (category: string, existingItemsLength: number): string => {
  const prefix = category.substring(0, 3).toUpperCase();
  const number = String(existingItemsLength + 1).padStart(3, '0');
  return `${prefix}-${number}`;
};

export const determineItemStatus = (currentStock: number, reorderPoint: number): Status => {
  if (currentStock === 0) {
    return 'Out of Stock';
  } else if (currentStock <= reorderPoint) {
    return 'Low Stock';
  } else {
    return 'In Stock';
  }
};

export const createInventoryItem = (formData: NewItemForm, existingItemsLength: number): InventoryItem => {
  const id = generateItemId(formData.category, existingItemsLength);
  
  // Use minimumStockLevel as reorderPoint and determine status
  const reorderPoint = formData.minimumStockLevel;
  const status = formData.status || determineItemStatus(formData.currentStock, reorderPoint);

  return {
    id,
    name: formData.name,
    description: formData.description,
    category: formData.category as Category,
    currentStock: formData.currentStock,
    unit: formData.unit as Unit,
    reorderPoint: reorderPoint,
    unitCost: formData.unitCost,
    status: status as Status,
    // Additional fields from the new form
    skuPartNumber: formData.skuPartNumber,
    minimumStockLevel: formData.minimumStockLevel,
    supplier: formData.supplier,
    location: formData.location
  };
};

export const exportToCSV = (items: InventoryItem[]): void => {
  const headers = [
    'Item Code',
    'Name',
    'Description',
    'Category',
    'SKU/Part Number',
    'Current Stock',
    'Unit',
    'Minimum Stock Level',
    'Reorder Point',
    'Unit Cost',
    'Supplier',
    'Location',
    'Status',
    'Total Value'
  ];

  const csvContent = [
    headers.join(','),
    ...items.map(item => [
      item.id,
      `"${item.name}"`,
      `"${item.description}"`,
      item.category,
      `"${item.skuPartNumber || ''}"`,
      item.currentStock,
      item.unit,
      item.minimumStockLevel || item.reorderPoint,
      item.reorderPoint,
      item.unitCost.toFixed(2),
      `"${item.supplier || ''}"`,
      `"${item.location || ''}"`,
      item.status,
      (item.currentStock * item.unitCost).toFixed(2)
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `inventory-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const mockInventoryData: InventoryItem[] = [
  {
    id: 'STL-001',
    name: 'Steel Rebar #4',
    description: 'Grade 60, 20ft length',
    category: 'Materials',
    currentStock: 2450,
    unit: 'pieces',
    reorderPoint: 500,
    unitCost: 12.50,
    status: 'In Stock',
    skuPartNumber: 'RB-4-20',
    minimumStockLevel: 500,
    supplier: 'Steel Corp',
    location: 'Warehouse A, Section 1'
  },
  {
    id: 'CON-002',
    name: 'Portland Cement',
    description: 'Type I, 94lb bags',
    category: 'Materials',
    currentStock: 85,
    unit: 'bags',
    reorderPoint: 100,
    unitCost: 8.75,
    status: 'Low Stock',
    skuPartNumber: 'PC-T1-94',
    minimumStockLevel: 100,
    supplier: 'Cement Co',
    location: 'Warehouse B, Bay 3'
  },
  {
    id: 'TLS-003',
    name: 'Power Drill Set',
    description: '18V Cordless with bits',
    category: 'Tools',
    currentStock: 0,
    unit: 'sets',
    reorderPoint: 5,
    unitCost: 185.00,
    status: 'Out of Stock',
    skuPartNumber: 'PD-18V-SET',
    minimumStockLevel: 5,
    supplier: 'Tool Supply Inc',
    location: 'Tool Room, Shelf A'
  },
  {
    id: 'SAF-004',
    name: 'Safety Helmets',
    description: 'ANSI Z89.1 compliant',
    category: 'Safety',
    currentStock: 156,
    unit: 'pieces',
    reorderPoint: 50,
    unitCost: 24.99,
    status: 'In Stock',
    skuPartNumber: 'SH-ANSI-WH',
    minimumStockLevel: 50,
    supplier: 'Safety First',
    location: 'Safety Storage, Rack 2'
  },
  {
    id: 'STL-005',
    name: 'Steel Rebar #5',
    description: 'Grade 60, 20ft length',
    category: 'Materials',
    currentStock: 1850,
    unit: 'pieces',
    reorderPoint: 400,
    unitCost: 15.75,
    status: 'In Stock',
    skuPartNumber: 'RB-5-20',
    minimumStockLevel: 400,
    supplier: 'Steel Corp',
    location: 'Warehouse A, Section 2'
  },
  {
    id: 'CON-006',
    name: 'Concrete Mix',
    description: 'Ready mix, 80lb bags',
    category: 'Materials',
    currentStock: 65,
    unit: 'bags',
    reorderPoint: 80,
    unitCost: 6.25,
    status: 'Low Stock',
    skuPartNumber: 'CM-RM-80',
    minimumStockLevel: 80,
    supplier: 'Cement Co',
    location: 'Warehouse B, Bay 4'
  },
  {
    id: 'TLS-007',
    name: 'Impact Wrench',
    description: '1/2" Drive, Air Powered',
    category: 'Tools',
    currentStock: 0,
    unit: 'sets',
    reorderPoint: 3,
    unitCost: 125.00,
    status: 'Out of Stock',
    skuPartNumber: 'IW-12-AIR',
    minimumStockLevel: 3,
    supplier: 'Tool Supply Inc',
    location: 'Tool Room, Shelf B'
  },
  {
    id: 'SAF-008',
    name: 'Safety Vests',
    description: 'High visibility, Class 2',
    category: 'Safety',
    currentStock: 89,
    unit: 'pieces',
    reorderPoint: 30,
    unitCost: 18.50,
    status: 'In Stock',
    skuPartNumber: 'SV-HV-C2',
    minimumStockLevel: 30,
    supplier: 'Safety First',
    location: 'Safety Storage, Rack 1'
  }
];