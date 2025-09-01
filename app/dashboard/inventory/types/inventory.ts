// types/inventory.ts
export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  category: Category;
  skuPartNumber: string;        // New field
  currentStock: number;
  unit: Unit;
  minimumStockLevel: number;    // New field
  reorderPoint: number;         // Keep for backward compatibility
  unitCost: number;
  supplier: string;             // New field
  location: string;             // New field
  status: Status;
  lastUpdated?: string;
}

export type Category = 'Materials' | 'Tools' | 'Safety' | 'Equipment' | 'Hardware' | 'Electronics' | 'Supplies';
export type Status = 'In Stock' | 'Low Stock' | 'Out of Stock' | 'On Order' | 'Discontinued';
export type Unit = 'pieces' | 'bags' | 'sets' | 'boxes' | 'rolls' | 'gallons' | 'tons' | 'feet' | 'pcs' | 'kg' | 'lbs' | 'm' | 'ft' | 'L' | 'gal' | 'box' | 'pack';

export interface DashboardStats {
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
}

export interface StockUpdateData {
  /** Type of stock update operation */
  updateType: 'add' | 'subtract' | 'set' | 'adjustment';
  /** Quantity to add, subtract, set, or adjust */
  quantity: number;
  /** Reason for the stock update */
  reason: string;
  /** Optional additional notes */
  notes?: string;
  /** Location where stock is updated */
  location?: string;
  /** Reference number (PO, invoice, job number, etc.) */
  reference?: string;
  /** User who performed the update */
  updatedBy?: string;
  /** Timestamp when update was performed */
  timestamp?: string;
}

export interface FilterOptions {
  searchTerm: string;
  selectedCategory: string;
  selectedStatus: string;
}

export interface NewItemForm {
  name: string;
  category: string;
  skuPartNumber: string;
  unit: string;
  currentStock: number;
  minimumStockLevel: number;
  unitCost: number;
  supplier: string;
  location: string;
  status: string;
  description: string;
}

// Props interfaces for components
export interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  trend?: string;
  trendColor?: 'green' | 'orange' | 'red';
}

export interface InventoryTableProps {
  items: InventoryItem[];
  onStatusChange: (itemId: string, newStatus: Status) => void; // Status not string
  onUpdateStock: (itemId: InventoryItem) => void;
  loading?: boolean;
}

export interface InventoryRowProps {
  item: InventoryItem;
  onStatusChange: (itemId: string, newStatus: Status) => void;
}

export interface ActionsDropdownProps {
  item: InventoryItem;
  isOpen: boolean;
  onUpdateStocks: () => void;
  onToggle: () => void;
  onClose: () => void;
}

export interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: NewItemForm) => void;
}

export interface FilterControlsProps {
  searchTerm: string;
  selectedCategory: string;
  selectedStatus: string;
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  onAddItem: () => void;
  onExport: () => void;
}

export interface DashboardStatsProps {
  stats: DashboardStats;
}