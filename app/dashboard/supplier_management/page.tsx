"use client";
import {  Search, X } from 'lucide-react';
import {  useEffect, useState } from 'react';
import FilterDropdown from '../../components/dropdowns/title_dropdown';
import Pagination from './components/pagination';
import StatsCard from './components/stats_card';
import SupplierCard from './components/supplier_card';


import TotalProjectsIcon from '@/app/public/total_projects_icon.svg';
import InProgressProjectsIcon from '@/app/public/in_progress_projects_icon.svg';
import OnScheduleProjectsIcon from '@/app/public/on_schedule_projects_icon.svg';
import NeedsAttentionProjectsIcon from '@/app/public/needs_attention_icon.svg';
import { inter } from '@/app/fonts';
import { BTButton } from '@/app/components/buttons/BTButton';
import AddCircleIcon from '@/app/public/add_circle.svg'; 
import { useHeaderConfig } from '@/app/context/HeaderContext';
// Main SupplierManagement Component
const SupplierManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState('All Suppliers');
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [ratingFilter, setRatingFilter] = useState('All');
    const [locationFilter, setLocationFilter] = useState('All');
    const [sortBy, setSortBy] = useState('Name');
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newSupplier, setNewSupplier] = useState({
      name: '',
      type: '',
      contact: '',
      phone: '',
      email: '',
      category: 'Materials',
      tags: ''
    });
  
    const tabs = ['All Suppliers', 'Materials', 'Subcontractors', 'Equipment', 'Orders'];
    const typeOptions = ['All', 'Materials', 'Subcontractors', 'Equipment'];
    const ratingOptions = ['All', '5 Stars', '4+ Stars', '3+ Stars'];
    const locationOptions = ['All', 'Local', 'Regional', 'National'];
    const sortOptions = ['Name', 'Rating', 'Recent'];

    const updateHeader = useHeaderConfig();
        
          useEffect(() => {
                  // Update header config for this specific page
                  updateHeader({
                    title: "Supplier Management",
                    showSearch: false,
                    searchPlaceholder: "Search projects...",
                    breadcrumbs: [
                      { label: "Dashboard", href: "/dashboard" },
                      { label: "Supplier Management", href: "" }
                    ],
                    notificationCount: 5
                  });
              }, [updateHeader]);
  
    const allSuppliers = [
      {
        id: 'ABC',
        name: 'ABC Materials',
        type: 'Materials Supplier',
        rating: 4.8,
        contact: 'John Smith',
        phone: '(555-243-7893)',
        email: 'Smithjohn@gmail.com',
        tags: ['Lumber', 'Hardware', 'Preferred'],
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-700',
        category: 'Materials'
      },
      {
        id: 'EE',
        name: 'Elite Electric',
        type: 'Materials Supplier',
        rating: 4.8,
        contact: 'John Smith',
        phone: '(555-243-7893)',
        email: 'Smithjohn@gmail.com',
        tags: ['Electrical', 'Licensed'],
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-700',
        category: 'Materials'
      },
      {
        id: 'HR',
        name: 'Hardware Retailers',
        type: 'Materials Supplier',
        rating: 4.8,
        contact: 'John Smith',
        phone: '(555-243-7893)',
        email: 'Smithjohn@gmail.com',
        tags: ['Hardware', 'Tools'],
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-700',
        category: 'Materials'
      },
      {
        id: 'RM',
        name: 'Rustic Millwork',
        type: 'Materials Supplier',
        rating: 4.8,
        contact: 'John Smith',
        phone: '(555-243-7893)',
        email: 'Smithjohn@gmail.com',
        tags: ['Lumber', 'Hardware', 'Preferred'],
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        category: 'Materials'
      },
      // Subcontractors
      {
        id: 'PC',
        name: 'Premier Construction',
        type: 'General Contractor',
        rating: 4.9,
        contact: 'Mike Johnson',
        phone: '(555-876-5432)',
        email: 'mike@premierconstruction.com',
        tags: ['Licensed', 'Insured', 'Preferred'],
        bgColor: 'bg-indigo-100',
        textColor: 'text-indigo-700',
        category: 'Subcontractors'
      },
      {
        id: 'SP',
        name: 'Skilled Plumbing',
        type: 'Plumbing Contractor',
        rating: 4.7,
        contact: 'Sarah Wilson',
        phone: '(555-234-5678)',
        email: 'sarah@skilledplumbing.com',
        tags: ['Plumbing', 'Emergency', 'Licensed'],
        bgColor: 'bg-cyan-100',
        textColor: 'text-cyan-700',
        category: 'Subcontractors'
      },
      {
        id: 'AE',
        name: 'Alpha Electrical',
        type: 'Electrical Contractor',
        rating: 4.6,
        contact: 'David Brown',
        phone: '(555-345-6789)',
        email: 'david@alphaelectrical.com',
        tags: ['Electrical', 'Commercial', 'Residential'],
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-700',
        category: 'Subcontractors'
      },
      {
        id: 'MR',
        name: 'Metro Roofing',
        type: 'Roofing Contractor',
        rating: 4.8,
        contact: 'Lisa Davis',
        phone: '(555-456-7890)',
        email: 'lisa@metroroofing.com',
        tags: ['Roofing', 'Weather-proof', 'Warranty'],
        bgColor: 'bg-red-100',
        textColor: 'text-red-700',
        category: 'Subcontractors'
      },
      // Equipment
      {
        id: 'HR',
        name: 'Heavy Rentals',
        type: 'Equipment Rental',
        rating: 4.5,
        contact: 'Tom Anderson',
        phone: '(555-567-8901)',
        email: 'tom@heavyrentals.com',
        tags: ['Heavy Machinery', 'Daily Rental', 'Delivery'],
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-700',
        category: 'Equipment'
      },
      {
        id: 'PE',
        name: 'Precision Equipment',
        type: 'Tool Supplier',
        rating: 4.7,
        contact: 'Jennifer Lee',
        phone: '(555-678-9012)',
        email: 'jennifer@precisionequipment.com',
        tags: ['Power Tools', 'Professional', 'Warranty'],
        bgColor: 'bg-teal-100',
        textColor: 'text-teal-700',
        category: 'Equipment'
      },
      {
        id: 'CR',
        name: 'Crane Rentals Pro',
        type: 'Crane Services',
        rating: 4.9,
        contact: 'Robert Chen',
        phone: '(555-789-0123)',
        email: 'robert@cranerentalspro.com',
        tags: ['Crane Services', 'Certified', 'Safety'],
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-700',
        category: 'Equipment'
      },
      {
        id: 'SE',
        name: 'Safety Equipment Co',
        type: 'Safety Supplier',
        rating: 4.6,
        contact: 'Amanda White',
        phone: '(555-890-1234)',
        email: 'amanda@safetyequipment.com',
        tags: ['Safety Gear', 'Compliance', 'Training'],
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-700',
        category: 'Equipment'
      }
    ];
  
    const orders = [
      {
        id: '#',
        name: 'Lumber Order #1234',
        type: 'Material Order',
        rating: 0,
        contact: 'ABC Materials',
        phone: 'Due: Dec 15, 2024',
        email: 'Status: In Progress',
        tags: ['Urgent', 'Large Order', 'Lumber'],
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-700',
        category: 'Orders',
        orderNumber: 'Order #1234'
      },
      {
        id: '#',
        name: 'Electrical Installation',
        type: 'Service Order',
        rating: 0,
        contact: 'Elite Electric',
        phone: 'Due: Dec 20, 2024',
        email: 'Status: Scheduled',
        tags: ['Electrical', 'Installation', 'Commercial'],
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-700',
        category: 'Orders',
        orderNumber: 'Order #1235'
      },
      {
        id: '#',
        name: 'Tool Rental Package',
        type: 'Equipment Order',
        rating: 0,
        contact: 'Heavy Rentals',
        phone: 'Due: Dec 18, 2024',
        email: 'Status: Confirmed',
        tags: ['Rental', 'Weekly', 'Heavy Equipment'],
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-700',
        category: 'Orders',
        orderNumber: 'Order #1236'
      },
      {
        id: '#',
        name: 'Roofing Project Materials',
        type: 'Bulk Order',
        rating: 0,
        contact: 'Rustic Millwork',
        phone: 'Due: Dec 22, 2024',
        email: 'Status: Processing',
        tags: ['Bulk', 'Roofing', 'Materials'],
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        category: 'Orders',
        orderNumber: 'Order #1237'
      }
    ];
  
    const getFilteredSuppliers = () => {
      let filtered = [];
      
      if (activeTab === 'All Suppliers') {
        filtered = allSuppliers;
      } else if (activeTab === 'Orders') {
        filtered = orders;
      } else {
        filtered = allSuppliers.filter(supplier => supplier.category === activeTab);
      }
  
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
  
      // Apply type filter
      if (typeFilter !== 'All') {
        filtered = filtered.filter(item => {
          if (typeFilter === 'Materials') return item.category === 'Materials' || item.type.includes('Materials');
          if (typeFilter === 'Subcontractors') return item.category === 'Subcontractors' || item.type.includes('Contractor');
          if (typeFilter === 'Equipment') return item.category === 'Equipment' || item.type.includes('Equipment') || item.type.includes('Rental');
          return true;
        });
      }
  
      // Apply rating filter
      if (ratingFilter !== 'All' && activeTab !== 'Orders') {
        filtered = filtered.filter(item => {
          if (ratingFilter === '5 Stars') return item.rating >= 5;
          if (ratingFilter === '4+ Stars') return item.rating >= 4;
          if (ratingFilter === '3+ Stars') return item.rating >= 3;
          return true;
        });
      }
  
      // Apply sorting
      if (sortBy === 'Rating' && activeTab !== 'Orders') {
        filtered = filtered.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'Name') {
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
      }
  
      return filtered;
    };
  
    const handleAddSupplier = () => {
      if (newSupplier.name && newSupplier.contact && newSupplier.email) {
        const supplier = {
          id: newSupplier.name.substring(0, 2).toUpperCase(),
          name: newSupplier.name,
          type: newSupplier.type || 'Supplier',
          rating: 0,
          contact: newSupplier.contact,
          phone: newSupplier.phone,
          email: newSupplier.email,
          tags: newSupplier.tags ? newSupplier.tags.split(',').map(tag => tag.trim()) : [],
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          category: newSupplier.category
        };
        
        allSuppliers.push(supplier);
        setShowAddModal(false);
        setNewSupplier({
          name: '',
          type: '',
          contact: '',
          phone: '',
          email: '',
          category: 'Materials',
          tags: ''
        });
      }
    };
  
    const suppliers = getFilteredSuppliers();
  
    return (
      <div className="min-h-screen bg-[#f6f6f6]">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatsCard
              icon={TotalProjectsIcon}
              title="Total Suppliers"
              value="43"
              subtitle="+3 this month"
              subtitleColor="green"
            />
            <StatsCard
              icon={InProgressProjectsIcon}
              title="Active Orders"
              value="12"
              subtitle="$87,250 total"
              subtitleColor="blue"
            />
            <StatsCard
              icon={OnScheduleProjectsIcon}
              title="Top Supplier"
              value="Abc Materials Inc."
              subtitle="25k YTD"
              subtitleColor="gray"
            />
            <StatsCard
              icon={NeedsAttentionProjectsIcon}
              title="Spending this month"
              value="$43,750"
              subtitle="+12% vs last month"
              subtitleColor="red"
            />
          </div>
  
          {/* Supplier Management Header Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="px-8 pt-8">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className={`${inter.className} antialiased text-[24px] font-semibold text-[#171E34] mb-2`}>Supplier Management</h2>
                  <p className={`${inter.className} antialiased text-[#525252] font-medium text-[14px]`}>Lorem ipsum is a dummy text to fill space</p>
                </div>

                <BTButton text='Add Supplier' icon={AddCircleIcon} loading={false} size='medium' onClick={() => {
                  // Perform login logic here 
                  setShowAddModal(true)
                }  }/>
              </div>
  
              {/* Tabs */}
              <div className="flex space-x-8 border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${inter.className} antialiased pb-2 text-[14px]  transition-colors ${
                      activeTab === tab
                        ? 'text-[#375DED] border-b-2 border-[#375DED] font-semibold'
                        : 'text-gray-600 hover:text-[#272727] font-normal'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
  
          {/* Search and Filters Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="p-6">
              <div className="flex items-center justify-between gap-6">
                <div className="relative flex-1 max-w-md  bg-[#F9FAFC]">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search Suppliers"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`${inter.className} antialiased font-normal text-[13px] text-[#98989C] h-[42px]  w-full pl-12 pr-4 py-3 bg-[#F9FAFC] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
                
                <div className="flex gap-3">
                  <FilterDropdown
                    label="Type"
                    value={typeFilter}
                    options={typeOptions}
                    onChange={setTypeFilter}
                  />
                  <FilterDropdown
                    label="Rating"
                    value={ratingFilter}
                    options={ratingOptions}
                    onChange={setRatingFilter}
                  />
                  <FilterDropdown
                    label="Location"
                    value={locationFilter}
                    options={locationOptions}
                    onChange={setLocationFilter}
                  />
                  <FilterDropdown
                    label="Sort By"
                    value={sortBy}
                    options={sortOptions}
                    onChange={setSortBy}
                  />
                </div>
              </div>
            </div>
          </div>
  
          {/* Supplier Cards Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-8">
              <div className="grid grid-cols-2 gap-8">
                {suppliers.map((supplier, index) => (
                  <SupplierCard
                    key={index}
                    {...supplier}
                  />
                ))}
              </div>
  
              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
  
          {/* Add Supplier Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Add New Supplier</h3>
                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={newSupplier.name}
                      onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <input
                      type="text"
                      value={newSupplier.type}
                      onChange={(e) => setNewSupplier({...newSupplier, type: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Materials Supplier"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newSupplier.category}
                      onChange={(e) => setNewSupplier({...newSupplier, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Materials">Materials</option>
                      <option value="Subcontractors">Subcontractors</option>
                      <option value="Equipment">Equipment</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                    <input
                      type="text"
                      value={newSupplier.contact}
                      onChange={(e) => setNewSupplier({...newSupplier, contact: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Contact person name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="text"
                      value={newSupplier.phone}
                      onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={newSupplier.email}
                      onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="contact@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={newSupplier.tags}
                      onChange={(e) => setNewSupplier({...newSupplier, tags: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Licensed, Hardware, Tools"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddSupplier}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
  
  export default SupplierManagement;