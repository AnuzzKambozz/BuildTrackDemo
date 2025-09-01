// hooks/useInventory.ts
"use client";

import {  useMemo } from 'react';
import { 
  InventoryItem, 
  Status, 
  NewItemForm, 
  FilterOptions,
  DashboardStats 
} from '../types/inventory';
import {
  calculateDashboardStats,
  filterItems,
  createInventoryItem,
  mockInventoryData
} from '../utils/inventoryUtils';

interface UseInventoryReturn {
  items: InventoryItem[];
  filteredItems: InventoryItem[];
  dashboardStats: DashboardStats;
  filters: FilterOptions;
  addItem: (formData: NewItemForm) => void;
  updateItemStatus: (itemId: string, newStatus: Status) => void;
  updateFilters: (newFilters: Partial<FilterOptions>) => void;
  clearFilters: () => void;
}

export const useInventory = (initialData: InventoryItem[] = mockInventoryData): UseInventoryReturn => {
  const [items, setItems] = useState<InventoryItem[]>(initialData);
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    selectedCategory: 'All Categories',
    selectedStatus: 'All Status'
  });

  // Memoized filtered items
  const filteredItems = useMemo(() => {
    return filterItems(
      items,
      filters.searchTerm,
      filters.selectedCategory,
      filters.selectedStatus
    );
  }, [items, filters]);

  // Memoized dashboard stats
  const dashboardStats = useMemo(() => {
    return calculateDashboardStats(items);
  }, [items]);

  // Add new item
  const addItem = useCallback((formData: NewItemForm) => {
    const newItem = createInventoryItem(formData, items.length);
    setItems(prevItems => [...prevItems, newItem]);
  }, [items.length]);

  // Update item status
  const updateItemStatus = useCallback((itemId: string, newStatus: Status) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      searchTerm: '',
      selectedCategory: 'All Categories',
      selectedStatus: 'All Status'
    });
  }, []);

  return {
    items,
    filteredItems,
    dashboardStats,
    filters,
    addItem,
    updateItemStatus,
    updateFilters,
    clearFilters
  };
};

// hooks/useModal.ts
import { useState, useCallback } from 'react';

interface UseModalReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

export const useModal = (initialState: boolean = false): UseModalReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  };
};