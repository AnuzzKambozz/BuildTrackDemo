"use client";

import React, { useEffect, useState } from 'react';
import StatsCard from './components/status_card';
import NavigationTabs from './components/navigation_tabs';
// import { Inter } from 'next/font/google';
import QualityIssues from './components/quality_issues';

import TotalProjectsIcon from '@/app/public/total_projects_icon.svg';
import InProgressProjectsIcon from '@/app/public/in_progress_projects_icon.svg';
import OnScheduleProjectsIcon from '@/app/public/on_schedule_projects_icon.svg';
import NeedsAttentionProjectsIcon from '@/app/public/needs_attention_icon.svg';
import { useHeaderConfig } from '@/app/context/HeaderContext';
import { BTButton } from '@/app/components/buttons/BTButton';

import AddCircleIcon from '@/app/public/add_circle.svg'; // Assuming you have an SVG icon for Plus

// Main Dashboard Component
const QualityDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Quality Issues');

  

  
    const totalInspections = 24;
    const passedInspections = 18;
    const openIssues = 5;
    const criticalIssues = 2;
    const upcomingInspections = 3;
    const qualityScore = 92;


        const updateHeader = useHeaderConfig();
    
        useEffect(() => {
            // Update header config for this specific page
            updateHeader({
              title: "Quality Control",
              showSearch: true,
              searchPlaceholder: "Search tasks...",
              breadcrumbs: [
                { label: "Dashboard", href: "/dashboard" },
                { label: "Quality Control", href: "" }
              ],
              notificationCount: 5
            });
          }, [updateHeader]);
  
  
    return (
      <div className="flex w-full h-full bg-[#f6f6f6]">
        <div className="space-y-6 w-full">
          
          {/* Stats Cards Row - First Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 w-full">
            <StatsCard
              title="Total Inspections"
              value={totalInspections}
              subtitle={`${passedInspections} Passed`}
              subtitleColor="text-green-600"
              icon={TotalProjectsIcon}
            />
            <StatsCard
              title="Open Issues"
              value={openIssues}
              subtitle={`${criticalIssues} Critical`}
              subtitleColor="text-red-600"
              icon={InProgressProjectsIcon}
            />
            <StatsCard
              title="Upcoming Inspections"
              value={upcomingInspections}
              subtitle="Next : Apr 2"
              subtitleColor="text-blue-600"
              icon={OnScheduleProjectsIcon}
            />
            <StatsCard
              title="Quality Score"
              value={`${qualityScore}%`}
              trend="+3 from last month"
              icon={NeedsAttentionProjectsIcon}
            />
          </div>
  
          {/* Main Content Container - Second Section */}
          <div className="bg-[#f6f6f6] rounded-lg">

            <div className="bg-white rounded-lg shadow-sm border ">
                {/* Header with Title and Button */}
                <div className="flex items-center justify-between p-6 pb-0">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Quality Issues Control</h1>
                        <p className="text-gray-600 mt-1">Lorem ipsum is a dummy text to fill space</p>
                    </div>
                    <BTButton text='Create New Inspection' icon={AddCircleIcon} loading={false} size='medium' onClick={() => {
                  // Perform login logic here 
                  console.log("Create New Inspection clicked");
                  
                }  

                }/>
                    </div>
                    {/* Navigation Tabs */}
                <div className="px-6 pt-6">
                <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
                </div>
            </div>
            
            
            
  
            {/* Content based on selected tab */}
            {activeTab === 'Quality Issues' && (
              <div className="py-6">
                 <QualityIssues/>
              </div>
            )}
  
            {/* Placeholder content for other tabs */}
            {activeTab !== 'Quality Issues' && (
              <div className="p-6">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{activeTab}</h3>
                  <p className="text-gray-500">Content for {activeTab} will be displayed here.</p>
                </div>
              </div>
            )}
  
          </div>
        </div>
      </div>
    );
  };
  
  export default QualityDashboard;