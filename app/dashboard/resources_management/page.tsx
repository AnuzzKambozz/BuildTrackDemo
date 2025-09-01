"use client";
import React, { useState } from 'react';
// import { ChevronDown, Plus } from 'lucide-react';
import EquipmentTab from '@/app/components/resource_management/equipment';
import HumanResourcesTab from '@/app/components/resource_management/human_resource';
// import useWindowSize from '@/app/hooks/useWindowSize';
import { BTButton } from '@/app/components/buttons/BTButton';
import { inter } from '@/app/fonts';
import  AddCircleIcon  from '@/app/public/add_circle.svg';
import TabNavigation from './components/tab_navigation';

export default function Page() {
  const [activeTab, setActiveTab] = useState('humanResources');
  // const {  height } = useWindowSize();

  // New state for dropdown and selected project
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Sample project list
  // const projects = ['Project A', 'Project B', 'Project C'];

  // const handleSelectProject = (project: string) => {
  //   setSelectedProject(project);
  //   setDropdownOpen(false);
  //   console.log("Selected Project:", project);
  // };

  // const handleAllocateResources = () => {
  //   if (!selectedProject) {
  //     alert("Please select a project first.");
  //     return;
  //   }
  //   // Replace this with your logic
  //   console.log(`Allocating resources to: ${selectedProject}`);
  // };

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <div className="max-w-7xl mx-auto bg-[#f6f6f6]  ">
                {/* Header */}
        <div className="bg-white rounded-lg mb-6">
            <div className="px-6 py-4 ">
                <div className="flex items-center justify-between">
                <div>
                    <h1 className={`${inter.className} antialiased text-[24px] font-semibold text-[#171E34] mb-2`}>Resource Management</h1>
                    <p className={`${inter.className} antialiased text-[#525252] font-medium text-[14px]`}>Assign and track human resources and equipment</p>
                </div>
                <BTButton text='Allocate Resources' icon={AddCircleIcon} loading={false} size='medium' onClick={() => {
                  // Perform login logic here 
                  // setShowAddModal(true)
                }  }/>
                </div>
            </div>
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
           {/* Tab Content */}
        {activeTab === 'equipment' && <EquipmentTab />}
        {activeTab === 'humanResources' && <HumanResourcesTab />}
      </div>

      </div>

  );
}
