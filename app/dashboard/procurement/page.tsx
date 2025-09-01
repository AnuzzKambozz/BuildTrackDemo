"use client";

import { useState, useMemo, useEffect } from "react";
import PurchaseOrderTable from "./components/procurement_table";
import FilterBar from "./components/filter_bar";
import KPICard from "./components/stats_card";
// import AddChangeOrderModal from "./components/modal/add_change_order_modal";
// import TabNavigation from "./components/tab_navigation";
import { FilterState, PurchaseOrder } from "./types/procurement";
import TotalProjectsIcon from '@/app/public/total_projects_icon.svg';
import InProgressProjectsIcon from '@/app/public/in_progress_projects_icon.svg';
import OnScheduleProjectsIcon from '@/app/public/on_schedule_projects_icon.svg';
import NeedsAttentionProjectsIcon from '@/app/public/needs_attention_icon.svg';
import Pagination from "@/app/components/pagination";
import { inter } from "@/app/fonts";
import { BTButton } from "@/app/components/buttons/BTButton";
import AddCircleIcon from '@/app/public/add_circle.svg'; 
import { useHeaderConfig } from '@/app/context/HeaderContext';
import AddPurchaseOrder from "./components/AddPurchaseOrder";


// Main ChangeOrdersManagement Component
const ProcurementPage: React.FC = () => {
  // State management
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    statusFilter: 'All',
  });

  const updateHeader = useHeaderConfig();
  
    useEffect(() => {
            // Update header config for this specific page
            updateHeader({
              title: "Procurement Management",
              showSearch: false,
              searchPlaceholder: "Search projects...",
              breadcrumbs: [
                { label: "Dashboard", href: "/dashboard" },
                { label: "Procurements", href: "" }
              ],
              notificationCount: 5
            });
        }, [updateHeader]);

  // Sample data
//   const [changeOrders, setChangeOrders] = useState<ChangeOrder[]>([
//     {
//       id: 'CO-12',
//       description: 'Additional recessed lighting in kitchen',
//       type: 'Client',
//       requestor: 'Clarke Smith',
//       costImpact: 4250,
//       timeImpact: 1,
//       status: 'Pending',
//       date: 'Mar 28 2025'
//     },
//     {
//       id: 'CO-13',
//       description: 'Upgrade bathroom fixtures to premium finish',
//       type: 'Client',
//       requestor: 'Clarke Smith',
//       costImpact: 4250,
//       timeImpact: 2,
//       status: 'Pending',
//       date: 'Mar 28 2025'
//     },
//     {
//       id: 'CO-14',
//       description: 'Additional electrical outlets in home office',
//       type: 'Client',
//       requestor: 'Clarke Smith',
//       costImpact: 4250,
//       timeImpact: 3,
//       status: 'Pending',
//       date: 'Mar 28 2025'
//     },
//     {
//       id: 'CO-15',
//       description: 'Structural reinforcement due to code update',
//       type: 'Required',
//       requestor: 'Steven Robert',
//       costImpact: 4250,
//       timeImpact: 4,
//       status: 'Approved',
//       date: 'Mar 28 2025'
//     },
//     {
//       id: 'CO-16',
//       description: 'Custom kitchen island with wine storage',
//       type: 'Client',
//       requestor: 'Clarke Smith',
//       costImpact: 8460,
//       timeImpact: 5,
//       status: 'Approved',
//       date: 'Mar 28 2025'
//     }
//   ]);

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([
    {
      id: "PO-2024-001",
      supplier: "Steel Works LLC",
      project: "Downtown Office Complex",
      items: "Steel Rebar, Beams",
      amount: "$125,000",
      status: "Approved",
      date: "Dec 10, 2024",
    },
    {
      id: "PO-2024-002",
      supplier: "Concrete Masters Inc",
      project: "Residential Tower",
      items: "Ready-Mix Concrete",
      amount: "$85,000",
      status: "Pending Approval",
      date: "Dec 12, 2024",
    },
    {
      id: "PO-2024-003",
      supplier: "Heavy Equipment Rentals",
      project: "Industrial Warehouse",
      items: "Excavator, Crane",
      amount: "$45,000",
      status: "Ordered",
      date: "Dec 8, 2024",
    },
  ]);



  // const [formData, setFormData] = useState<AddChangeOrderForm>({
  //   description: '',
  //   type: 'Client',
  //   requestor: '',
  //   costImpact: '',
  //   timeImpact: '',
  //   priority: 'Medium',
  //   reason: ''
  // });

  // Calculate KPIs
  // const kpiData: KPIData = useMemo(() => {
  //   const pending =  10
  //   const totalBudgetImpact = 12
  //   const totalTimeImpact = 14
    
  //   return {
  //     totalChangeOrders: 11,
  //     pendingApproval: pending,
  //     budgetImpact: totalBudgetImpact,
  //     scheduleImpact: totalTimeImpact,
  //     budgetPercentage: 3.2
  //   };
  // }, [purchaseOrders]);

  // Filter and sort change orders
  const filteredOrders = useMemo(() => {
    const filtered = purchaseOrders.filter(order => {
      const matchesSearch = order.project.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           order.items.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           order.id.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesStatus = filters.statusFilter === 'All' || order.status === filters.statusFilter;
      
      return matchesSearch && matchesStatus ;
    });



    return filtered;
  }, [purchaseOrders, filters]);

  // Handlers
  const handleFiltersChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setPurchaseOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    );
    
    // Optional: Make API call to update status in backend
    // updateOrderStatusAPI(orderId, newStatus);
  };

//   const handleFormDataChange = (newData: Partial<AddChangeOrderForm>) => {
//     setFormData(prev => ({ ...prev, ...newData }));
//   };

//   const handleSubmit = () => {
//     const newOrder: PurchaseOrder = {
//       id: `CO-${purchaseOrders.length + 17}`,
//       type: formData.type,
//       requestor: formData.requestor,
//       costImpact: parseFloat(formData.costImpact) || 0,
//       timeImpact: parseInt(formData.timeImpact) || 0,
//       status: 'Pending',
//       date: new Date().toLocaleDateString('en-US', { 
//         month: 'short', 
//         day: 'numeric', 
//         year: 'numeric' 
//       })
//     };

//     setChangeOrders(prev => [...prev, newOrder]);
//     setShowAddModal(false);
//     setFormData({
//       description: '',
//       type: 'Client',
//       requestor: '',
//       costImpact: '',
//       timeImpact: '',
//       priority: 'Medium',
//       reason: ''
//     });
//   };

//   const handleStatusChange = (orderId: string, newStatus: 'Approved' | 'Rejected') => {
//     setPurchaseOrders(prev => 
//       prev.map(order => 
//         order.id === orderId ? { ...order, status: newStatus } : order
//       )
//     );
//   };

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <div className="max-w-7xl mx-auto bg-[#f6f6f6] ">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <KPICard
            icon={TotalProjectsIcon}
            title="Active POs"
            value={18}
            subtitle="+3 this week"
            subtitleColor="text-[#0FBC81]"
          />
          <KPICard
            icon={InProgressProjectsIcon}
            title="Total Value"
            value={"$485K"}
            subtitle="+$45K this month"
            subtitleColor="text-[#0FBC81]"
          />
          <KPICard
            icon={OnScheduleProjectsIcon}
            title="Pending Approval"
            value={`5`}
            subtitle={`Needs attention`}
            subtitleColor="text-[#FC3A3A]"
          />
          <KPICard
            icon={NeedsAttentionProjectsIcon}
            title="This Month"
            value={`12`}
            subtitle="+25% vs last month"
            subtitleColor="text-[#0FBC81]"
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col  gap-6">
        {/* Header */}
          <div className="bg-white rounded-lg ">
            <div className="px-6 py-4 ">
                <div className="flex items-center justify-between">
                <div>
                    <h1 className={`${inter.className} antialiased text-[24px] font-semibold text-[#171E34] mb-2`}>Procurement Management</h1>
                    <p className={`${inter.className} antialiased text-[#525252] font-medium text-[14px]`}>Manage purchase orders, vendor selection, and procurement workflows</p>
                </div>
                <BTButton text='Create PO' icon={AddCircleIcon} loading={false} size='medium' onClick={() => {
                  // Perform login logic here 
                  setShowAddModal(true)
                }  }/>
                </div>
            </div>
            {/* <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} /> */}
          </div>
        {/* Filter & Table & Pagination*/}
          <div className="bg-white rounded-lg">
            <FilterBar filters={filters} onFiltersChange={handleFiltersChange} />
            <PurchaseOrderTable 
                        orders={filteredOrders} 
                        onStatusChange={handleStatusChange}
/>
            <div className="mb-6">
            <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </div>
            
         </div>  
       
        </div>

        <AddPurchaseOrder
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        //   formData={formData}
        //   onFormDataChange={handleFormDataChange}
        //   onSubmit={handleSubmit}
        /> 

      </div>
    </div>
  );
};

export default ProcurementPage;