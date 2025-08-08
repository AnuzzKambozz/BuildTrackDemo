"use client";
import {  Search} from 'lucide-react';
import {  useEffect, useState } from 'react';
import FilterDropdown from '../../components/dropdowns/title_dropdown';
import Pagination from './components/pagination';
import StatsCard from './components/stats_card';
import ClientCard from './components/client_card';


import TotalProjectsIcon from '@/app/public/total_projects_icon.svg';
import InProgressProjectsIcon from '@/app/public/in_progress_projects_icon.svg';
import OnScheduleProjectsIcon from '@/app/public/on_schedule_projects_icon.svg';
import NeedsAttentionProjectsIcon from '@/app/public/needs_attention_icon.svg';
import { inter } from '@/app/fonts';
import { BTButton } from '@/app/components/buttons/BTButton';
import AddCircleIcon from '@/app/public/add_circle.svg'; 
import { Client } from '@/app/models/common';
import  AddClientModal  from '../client_management/components/add_client_modal';
import { useHeaderConfig } from '@/app/context/HeaderContext';

// Main SupplierManagement Component
const ClientOverview: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [clientType, setClientType] = useState('');
    const [projectType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);

    const clientTypeOptions = ['Residential Client', 'Commercial Client'];
    // const projectTypeOptions = ['Renovation', 'New Construction', 'Maintenance'];
    const updateHeader = useHeaderConfig();
      
        useEffect(() => {
                // Update header config for this specific page
                updateHeader({
                  title: "Client Management",
                  showSearch: false,
                  searchPlaceholder: "Search projects...",
                  breadcrumbs: [
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Client Management", href: "" }
                  ],
                  notificationCount: 5
                });
            }, [updateHeader]);
    
  
    const sampleClients: Client[] = [
        {
          id: '1',
          name: 'Clarke Smith',
          email: 'Smithclarke@gmail.com',
          phone: '(555-243-7893)',
          project: 'Spethman Renovation',
          clientType: 'Residential Client',
          projectType: 'Residential Client',
          status: 'Active',
          initials: 'CS',
          initialsColor: 'bg-blue-100 text-blue-600'
        },
        {
          id: '2',
          name: 'James Taylor',
          email: 'Taylor@gmail.com',
          phone: '(555-243-7893)',
          project: 'Spethman Renovation',
          clientType: 'Residential Client',
          projectType: 'Residential Client',
          status: 'Active',
          initials: 'JT',
          initialsColor: 'bg-blue-100 text-blue-600'
        },
        {
          id: '3',
          name: 'Steven Robert',
          email: 'Robertsteven@gmail.com',
          phone: '(555-243-7893)',
          project: 'Spethman Renovation',
          clientType: 'Residential Client',
          projectType: 'Residential Client',          
          status: 'Active',
          initials: 'SR',
          initialsColor: 'bg-blue-100 text-blue-600'
        },
        {
          id: '4',
          name: 'Daniel Sams',
          email: 'Danielsams@gmail.com',
          phone: '(555-243-7893)',
          project: 'Spethman Renovation',
          clientType: 'Residential Client',
          projectType: 'Residential Client',
          status: 'Active',
          initials: 'DS',
          initialsColor: 'bg-blue-100 text-blue-600'
        }
      ];

  
    const getFilteredClients = () => {
      let filtered = sampleClients;
      
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.projectType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.clientType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.status.toLowerCase().includes(searchTerm.toLowerCase()) 
        );
      }


      // Apply clientType filter
      if (clientType !== '') {
        filtered = filtered.filter(item => {
          return item.clientType === clientType || item.clientType.includes(clientType);
        });
      }

      // Apply clientType filter
      if (projectType !== '') {
        filtered = filtered.filter(item => {
            return item.projectType === projectType || item.projectType.includes(projectType);

        });
      }

      return filtered;
    };
  

  
    const clients = getFilteredClients();
  
    return (
      <div className="min-h-screen bg-[#f6f6f6]">
        <div className="max-w-7xl mx-auto">

  
          {/* Supplier Management Header Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="px-8 pt-8">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className={`${inter.className} antialiased text-[24px] font-semibold text-[#171E34] mb-2`}>Client Overview</h2>
                  <p className={`${inter.className} antialiased text-[#525252] font-medium text-[14px]`}>Lorem ipsum is a dummy text to fill space</p>
                </div>

                {/* <BTButton text='Add New Client' icon={AddCircleIcon} loading={false} size='medium' onClick={() => {
                  // Perform login logic here 
                  setShowAddModal(true)
                }  }/> */}
              </div>
            </div>
          </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-4 gap-6 mb-8">
            <StatsCard
              icon={TotalProjectsIcon}
              title="Total Clients"
              value="24"
              subtitle=""
              subtitleColor="gray"
            />
            <StatsCard
              icon={InProgressProjectsIcon}
              title="Active Projects"
              value="12"
              subtitle=""
              subtitleColor="blue"
            />
            <StatsCard
              icon={OnScheduleProjectsIcon}
              title="Potential Projects"
              value="8"
              subtitle=""
              subtitleColor="gray"
            />
            <StatsCard
              icon={NeedsAttentionProjectsIcon}
              title="Client Satisfaction"
              value="92%"
              subtitle=""
              subtitleColor="red"
            />
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
                    label="Client Type"
                    value={clientType}
                    options={clientTypeOptions}
                    onChange={setClientType}
                  />
                  {/* <FilterDropdown
                    label="Project Type"
                    value={projectType}
                    options={projectTypeOptions}
                    onChange={setProjectType}
                  /> */}
                   <BTButton text='Add New Client' icon={AddCircleIcon} loading={false} size='medium' onClick={() => {
                  // Perform login logic here 
                  setShowAddModal(true)
                }  }/>
                </div>
              </div>
            </div>
          </div>
  
          {/* Client Cards Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-8">
              <div className="grid grid-cols-2 gap-8">
                {clients.map((client, index) => (
                  <ClientCard
                    key={index}
                    client={client}
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
  
          {/* Add Client Modal */}
          {showAddModal && (
            <AddClientModal
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
              onSubmit={() => {
                // Handle new client addition logic here
                setShowAddModal(false);
              }}
            />
          )}
        </div>
      </div>
    );
  };
  
  export default ClientOverview;