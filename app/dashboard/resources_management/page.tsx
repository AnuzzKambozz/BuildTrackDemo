"use client";
import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import EquipmentTab from '@/app/components/resource_management/equipment';
import HumanResourcesTab from '@/app/components/resource_management/human_resource';
import useWindowSize from '@/app/hooks/useWindowSize';

export default function Page() {
  const [activeTab, setActiveTab] = useState('equipment');
  const {  height } = useWindowSize();

  // New state for dropdown and selected project
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Sample project list
  const projects = ['Project A', 'Project B', 'Project C'];

  const handleSelectProject = (project: string) => {
    setSelectedProject(project);
    setDropdownOpen(false);
    console.log("Selected Project:", project);
  };

  const handleAllocateResources = () => {
    if (!selectedProject) {
      alert("Please select a project first.");
      return;
    }
    // Replace this with your logic
    console.log(`Allocating resources to: ${selectedProject}`);
  };

  return (
    <div className="bg-gray-50" style={{ minHeight: height - 115 }}>
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 flex items-center justify-between">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('humanResources')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'humanResources'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Human Resources
              </button>
              <button
                onClick={() => setActiveTab('equipment')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'equipment'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Equipment
              </button>
            </nav>

            <div className="relative flex items-center space-x-4 mb-4">
              {/* Dropdown */}
              <div className="relative">
                <div
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center space-x-2 px-4 py-2 border rounded-lg bg-white cursor-pointer"
                >
                  <span className="text-sm">
                    {selectedProject || 'Select Project'}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                {dropdownOpen && (
                  <div className="absolute z-10 mt-1 w-48 bg-white border rounded shadow-lg">
                    {projects.map((project) => (
                      <div
                        key={project}
                        onClick={() => handleSelectProject(project)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {project}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Button */}
              <button
                onClick={handleAllocateResources}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Allocate Resources</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'equipment' && <EquipmentTab />}
        {activeTab === 'humanResources' && <HumanResourcesTab />}
      </div>
    </div>
  );
}
