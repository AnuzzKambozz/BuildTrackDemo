"use client";


import React, { useEffect, useState } from 'react';
import BudgetHeader from '@/app/dashboard/budget_planning/components/budget_header';
import BudgetSummary from './components/budget_summary';
import BudgetBreakdownTable, { BudgetItem } from './components/budget_breakdown_table';
// import  { AdjustmentFormData } from './components/budget_adjustment_form';
import { useHeaderConfig } from '@/app/context/HeaderContext';

const BudgetPlanningDashboard: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>('Spethman Renovation');
  const [activeTab, setActiveTab] = useState<string>('Budget Planning');
  const updateHeader = useHeaderConfig();

  useEffect(() => {
          // Update header config for this specific page
          updateHeader({
            title: "Budget Planning",
            showSearch: true,
            searchPlaceholder: "Search projects...",
            breadcrumbs: [
              { label: "Dashboard", href: "/dashboard" },
              { label: "Budget Planning", href: "" }
            ],
            notificationCount: 5
          });
      }, [updateHeader]);

  // Mock data - in real app, this would come from API/state management
  const budgetData: BudgetItem[] = [
    {
      category: 'Materials',
      budgeted: 275000,
      actual: 235000,
      remaining: 39250,
      percentage: 85.7,
      status: 'On Track' as const
    },
    {
      category: 'Labors',
      budgeted: 275000,
      actual: 235000,
      remaining: 39250,
      percentage: 85.7,
      status: 'On Track' as const
    },
    {
      category: 'Subcontractors',
      budgeted: 275000,
      actual: 235000,
      remaining: 39250,
      percentage: 85.7,
      status: 'Over' as const
    },
    {
      category: 'Equipment',
      budgeted: 275000,
      actual: 235000,
      remaining: 39250,
      percentage: 85.7,
      status: 'On Track' as const
    },
    {
      category: 'Permits & Fees',
      budgeted: 275000,
      actual: 235000,
      remaining: 39250,
      percentage: 85.7,
      status: 'Over' as const
    }
  ];

  const handleProjectChange = (project: string): void => {
    setSelectedProject(project);
    // In real app, fetch new data based on project
  };

  const handleTabChange = (tab: string): void => {
    setActiveTab(tab);
    // In real app, navigate to different tab content
  };

  const handleFilter = (): void => {
    console.log('Filter clicked');
    // Implement filter functionality
  };

  const handleExport = (): void => {
    console.log('Export clicked');
    // Implement export functionality
  };

  const handleBudgetDetailsClick = (): void => {
    console.log('Budget details clicked');
    // Navigate to detailed budget view
  };

  // const handleAdjustmentSubmit = (formData: AdjustmentFormData): void => {
  //   console.log('Adjustment submitted:', formData);
  //   // Submit adjustment request to API
  // };

  // const handleAdjustmentCancel = (): void => {
  //   console.log('Adjustment cancelled');
  //   // Reset form or close modal
  // };

  return (
    <div className="min-h-screen">
      <BudgetHeader
        selectedProject={selectedProject}
        onProjectChange={handleProjectChange}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

            {(activeTab === 'Budget Planning') &&<div className="flex gap-6">
                <div className=" pt-6 ">
                        <div className="">
                            <BudgetSummary
                                onBudgetDetailsClick={handleBudgetDetailsClick}
                            />

                        </div>

                </div>

                    <div className="flex-1 pt-6">
                    <div className="space-y-6  ">
                        <BudgetBreakdownTable
                        budgetData={budgetData}
                        onFilter={handleFilter}
                        onExport={handleExport}
                        />

                        {/* <BudgetAdjustmentForm
                        onSubmit={handleAdjustmentSubmit}
                        onCancel={handleAdjustmentCancel}
                        /> */}
                    </div>
                    </div>
                </div>}
    </div>
  );
};

export default BudgetPlanningDashboard;