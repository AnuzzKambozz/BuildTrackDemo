"use client";

import { useState, useMemo, useEffect } from "react";
import ChangeOrderTable from "./components/change_order_table";
import FilterBar from "./components/filter_bar";
import KPICard from "./components/kpi_card";
import AddChangeOrderModal from "./components/modal/add_change_order_modal";
import TabNavigation from "./components/tab_navigation";
import { FilterState, ChangeOrder, AddChangeOrderForm, KPIData } from "./types/change-orders";
import TotalProjectsIcon from '@/app/public/total_projects_icon.svg';
import InProgressProjectsIcon from '@/app/public/in_progress_projects_icon.svg';
import OnScheduleProjectsIcon from '@/app/public/on_schedule_projects_icon.svg';
import NeedsAttentionProjectsIcon from '@/app/public/needs_attention_icon.svg';
import Pagination from "@/app/components/pagination";
import { inter } from "@/app/fonts";
import { BTButton } from "@/app/components/buttons/BTButton";
import AddCircleIcon from '@/app/public/add_circle.svg'; 
import { useHeaderConfig } from '@/app/context/HeaderContext';


// Main ChangeOrdersManagement Component
const ChangeOrdersManagement: React.FC = () => {
  // State management
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'templates'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    statusFilter: 'All',
    typeFilter: 'All',
    dateFilter: 'All',
    sortBy: 'Newest'
  });

  const updateHeader = useHeaderConfig();
  
    useEffect(() => {
            // Update header config for this specific page
            updateHeader({
              title: "Change Orders",
              showSearch: false,
              searchPlaceholder: "Search projects...",
              breadcrumbs: [
                { label: "Dashboard", href: "/dashboard" },
                { label: "Change Orders", href: "" }
              ],
              notificationCount: 5
            });
        }, [updateHeader]);

  // Sample data
  const [changeOrders, setChangeOrders] = useState<ChangeOrder[]>([
    {
      id: 'CO-12',
      description: 'Additional recessed lighting in kitchen',
      type: 'Client',
      requestor: 'Clarke Smith',
      costImpact: 4250,
      timeImpact: 1,
      status: 'Pending',
      date: 'Mar 28 2025'
    },
    {
      id: 'CO-13',
      description: 'Upgrade bathroom fixtures to premium finish',
      type: 'Client',
      requestor: 'Clarke Smith',
      costImpact: 4250,
      timeImpact: 2,
      status: 'Pending',
      date: 'Mar 28 2025'
    },
    {
      id: 'CO-14',
      description: 'Additional electrical outlets in home office',
      type: 'Client',
      requestor: 'Clarke Smith',
      costImpact: 4250,
      timeImpact: 3,
      status: 'Pending',
      date: 'Mar 28 2025'
    },
    {
      id: 'CO-15',
      description: 'Structural reinforcement due to code update',
      type: 'Required',
      requestor: 'Steven Robert',
      costImpact: 4250,
      timeImpact: 4,
      status: 'Approved',
      date: 'Mar 28 2025'
    },
    {
      id: 'CO-16',
      description: 'Custom kitchen island with wine storage',
      type: 'Client',
      requestor: 'Clarke Smith',
      costImpact: 8460,
      timeImpact: 5,
      status: 'Approved',
      date: 'Mar 28 2025'
    }
  ]);

  const [formData, setFormData] = useState<AddChangeOrderForm>({
    description: '',
    type: 'Client',
    requestor: '',
    costImpact: '',
    timeImpact: '',
    priority: 'Medium',
    reason: ''
  });

  // Calculate KPIs
  const kpiData: KPIData = useMemo(() => {
    const pending = changeOrders.filter(co => co.status === 'Pending').length;
    const totalBudgetImpact = changeOrders.reduce((sum, co) => sum + co.costImpact, 0);
    const totalTimeImpact = changeOrders.reduce((sum, co) => sum + co.timeImpact, 0);
    
    return {
      totalChangeOrders: changeOrders.length,
      pendingApproval: pending,
      budgetImpact: totalBudgetImpact,
      scheduleImpact: totalTimeImpact,
      budgetPercentage: 3.2
    };
  }, [changeOrders]);

  // Filter and sort change orders
  const filteredOrders = useMemo(() => {
    const filtered = changeOrders.filter(order => {
      const matchesSearch = order.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           order.requestor.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           order.id.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesStatus = filters.statusFilter === 'All' || order.status === filters.statusFilter;
      const matchesType = filters.typeFilter === 'All' || order.type === filters.typeFilter;
      const matchesTab = activeTab === 'all' || order.status.toLowerCase() === activeTab;
      
      return matchesSearch && matchesStatus && matchesType && matchesTab;
    });

    // Sort orders
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'Newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'Oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'Cost High to Low':
          return b.costImpact - a.costImpact;
        case 'Cost Low to High':
          return a.costImpact - b.costImpact;
        default:
          return 0;
      }
    });

    return filtered;
  }, [changeOrders, filters, activeTab]);

  // Handlers
  const handleFiltersChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleFormDataChange = (newData: Partial<AddChangeOrderForm>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleSubmit = () => {
    const newOrder: ChangeOrder = {
      id: `CO-${changeOrders.length + 17}`,
      description: formData.description,
      type: formData.type,
      requestor: formData.requestor,
      costImpact: parseFloat(formData.costImpact) || 0,
      timeImpact: parseInt(formData.timeImpact) || 0,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    };

    setChangeOrders(prev => [...prev, newOrder]);
    setShowAddModal(false);
    setFormData({
      description: '',
      type: 'Client',
      requestor: '',
      costImpact: '',
      timeImpact: '',
      priority: 'Medium',
      reason: ''
    });
  };

  const handleStatusChange = (orderId: string, newStatus: 'Approved' | 'Rejected') => {
    setChangeOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <div className="max-w-7xl mx-auto bg-[#f6f6f6] ">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <KPICard
            icon={TotalProjectsIcon}
            title="Total Change Orders"
            value={kpiData.totalChangeOrders}
            subtitle="Since Project Start"
            subtitleColor="text-[#0FBC81]"
          />
          <KPICard
            icon={InProgressProjectsIcon}
            title="Pending Approval"
            value={kpiData.pendingApproval}
            subtitle="Reviews Needed"
            subtitleColor="text-[#FF6621]"
          />
          <KPICard
            icon={OnScheduleProjectsIcon}
            title="Budget Impact"
            value={`+$${kpiData.budgetImpact.toLocaleString()}`}
            subtitle={`+${kpiData.budgetPercentage} of base`}
            subtitleColor="text-[#FC3A3A]"
          />
          <KPICard
            icon={NeedsAttentionProjectsIcon}
            title="Schedule Impact"
            value={`+${kpiData.scheduleImpact} days`}
            subtitle="Moderate Risk"
            subtitleColor="text-[#FFBC13]"
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col  gap-6">
        {/* Header */}
          <div className="bg-white rounded-lg ">
            <div className="px-6 py-4 ">
                <div className="flex items-center justify-between">
                <div>
                    <h1 className={`${inter.className} antialiased text-[24px] font-semibold text-[#171E34] mb-2`}>Change Orders Management</h1>
                    <p className={`${inter.className} antialiased text-[#525252] font-medium text-[14px]`}>Lorem ipsum is a dummy text to fill space</p>
                </div>
                <BTButton text='New Change Order' icon={AddCircleIcon} loading={false} size='medium' onClick={() => {
                  // Perform login logic here 
                  setShowAddModal(true)
                }  }/>
                </div>
            </div>
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        {/* Filter & Table & Pagination*/}
          <div className="bg-white rounded-lg">
            <FilterBar filters={filters} onFiltersChange={handleFiltersChange} />
            <ChangeOrderTable orders={filteredOrders} onStatusChange={handleStatusChange} />
            <div className="mb-6">
            <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </div>
            
         </div>  
       
        </div>



        <AddChangeOrderModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          formData={formData}
          onFormDataChange={handleFormDataChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ChangeOrdersManagement;