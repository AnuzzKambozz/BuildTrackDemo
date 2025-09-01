"use client";

import React, { useEffect } from 'react';
import DashboardStats from './components/DashboardStats';
import FilterControls from './components/FilterControls';
import InventoryTable from './components/InventoryTable';
import AddItemModal from './components/AddItemModal';
import { useInventory, useModal } from './hooks/useInventory';
import { exportToCSV } from './utils/inventoryUtils';
import { InventoryItem, NewItemForm } from './types/inventory';
import { inter } from '@/app/fonts';
import { BTButton } from '@/app/components/buttons/BTButton';
import AddCircleIcon from '@/app/public/add_circle.svg';
import UpdateStockModal, { StockUpdateData } from './components/UpdateStockModal';
import { useHeaderConfig } from '@/app/context/HeaderContext';

const InventoryManagement: React.FC = () => {
  // Custom hooks for state management
  const {
    filteredItems,
    dashboardStats,
    filters,
    addItem,
    updateItemStatus,
    updateFilters
  } = useInventory();

  const {
    isOpen: isAddModalOpen,
    openModal: openAddModal,
    closeModal: closeAddModal
  } = useModal();

  const {
    isOpen: isUpdateModalOpen,
    openModal: openUpdateModal,
    closeModal: closeUpdateModal
  } = useModal();

  const [itemToUpdate, setItemToUpdate] = React.useState<InventoryItem | null>(null);

    const updateHeader = useHeaderConfig();
    
      useEffect(() => {
              // Update header config for this specific page
              updateHeader({
                title: "Inventory Management",
                showSearch: false,
                searchPlaceholder: "Search projects...",
                breadcrumbs: [
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "Inventory", href: "" }
                ],
                notificationCount: 5
              });
          }, [updateHeader]);

  // Handler functions
  const handleAddItem = (formData: NewItemForm): void => {
    addItem(formData);
    closeAddModal();
  };

  const handleExport = (): void => {
    exportToCSV(filteredItems);
  };

  const handleSearchChange = (searchTerm: string): void => {
    updateFilters({ searchTerm });
  };

  const handleCategoryChange = (selectedCategory: string): void => {
    updateFilters({ selectedCategory });
  };

  const handleStatusFilterChange = (selectedStatus: string): void => {
    updateFilters({ selectedStatus });
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6]">

        {/* Dashboard Statistics */}
        <DashboardStats stats={dashboardStats} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}

          <div className="flex justify-between items-center mb-8 p-[38px] h-[100px] rounded-md border-b shadow-sm bg-white">
            <div>
              <div className={`${inter.className} antialiased text-[24px] font-semibold mb-2 text-[#171E34]` }>Inventory Management</div>
              <p className={`${inter.className} antialiased text-[14px] font-medium text-[#525252]` }>Track materials, equipment, and stock levels with reorder points</p>
            </div>
            
            <div className="flex space-x-3">
              <BTButton text='Add Inventory Item' icon={AddCircleIcon} loading={false} size='medium' onClick={openAddModal} />
            </div>
          </div>



        {/* Filter Controls */}
        <FilterControls
          searchTerm={filters.searchTerm}
          selectedCategory={filters.selectedCategory}
          selectedStatus={filters.selectedStatus}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onStatusChange={handleStatusFilterChange}
          onAddItem={openAddModal}
          onExport={handleExport}
        />



        {/* Inventory Table */}
        <InventoryTable 
            items={filteredItems} 
            onStatusChange={updateItemStatus} 
            onUpdateStock={(item) => {
              console.log('Updating stock for', item.id);
              setItemToUpdate(item); // ✅ triggers re-render
              openUpdateModal();
            }}
          />


        {/* Add Item Modal */}
        <AddItemModal
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          onSubmit={handleAddItem}
        />
        <UpdateStockModal
          isOpen={isUpdateModalOpen}
          onClose={closeUpdateModal}
          onSubmit={(updateData: StockUpdateData) => {
            console.log('Stock update submitted:', updateData);
            closeUpdateModal();
          }}
          item={itemToUpdate}
        />
      </div>
    </div>
  );
};

export default InventoryManagement;
