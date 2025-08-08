"use client";

import React, { useState } from 'react';
import FilterBar from './filter_bar';
import KanbanColumn from './kanban_column';
import { IssueModel } from '@/app/models/common';
// import { Inter } from 'next/font/google';




// Main Dashboard Component
const QualityIssues: React.FC = () => {

    const [issues, setIssues] = useState<IssueModel[]>([
      {
        id: '1',
        code: 'QI-102',
        title: 'Incorrect Plumbing Fitting Used',
        description: 'All bathroom fitting need to be all copper, but PVC was used in master bathroom.',
        severity: 'Critical',
        status: 'Open',
        assignee: 'Daniel James',
        assigneeInitials: 'DJ',
        createdDate: 'May 29, 2025'
      },
      {
        id: '2',
        code: 'QI-102',
        title: 'Electrical Wiring Violation',
        description: 'All bathroom fitting need to be all copper, but PVC was used in master bathroom.',
        severity: 'Critical',
        status: 'In Progress',
        assignee: 'Jake Matthews',
        assigneeInitials: 'JM',
        createdDate: 'May 29, 2025'
      },
      {
        id: '3',
        code: 'QI-102',
        title: 'Electrical Wiring Violation',
        description: 'All bathroom fitting need to be all copper, but PVC was used in master bathroom.',
        severity: 'Critical',
        status: 'Under Review',
        assignee: 'Jake Matthews',
        assigneeInitials: 'JM',
        createdDate: 'May 29, 2025'
      },
      {
        id: '4',
        code: 'QI-102',
        title: 'Paint Color Mismatch',
        description: 'All bathroom fitting need to be all copper, but PVC was used in master bathroom.',
        severity: 'Low',
        status: 'Resolved',
        assignee: 'Jake Matthews',
        assigneeInitials: 'JM',
        createdDate: 'May 29, 2025'
      },
      {
        id: '5',
        code: 'QI-102',
        title: 'Incorrect Plumbing Fitting Used',
        description: 'All bathroom fitting need to be all copper, but PVC was used in master bathroom.',
        severity: 'Critical',
        status: 'Open',
        assignee: 'Daniel James',
        assigneeInitials: 'DJ',
        createdDate: 'May 29, 2025'
      },
      {
        id: '6',
        code: 'QI-102',
        title: 'Drywall Finishing Issue',
        description: 'All bathroom fitting need to be all copper, but PVC was used in master bathroom.',
        severity: 'Medium',
        status: 'In Progress',
        assignee: 'Daniel James',
        assigneeInitials: 'DJ',
        createdDate: 'May 29, 2025'
      },
      {
        id: '7',
        code: 'QI-102',
        title: 'Drywall Finishing Issue',
        description: 'All bathroom fitting need to be all copper, but PVC was used in master bathroom.',
        severity: 'Medium',
        status: 'Under Review',
        assignee: 'Daniel James',
        assigneeInitials: 'DJ',
        createdDate: 'May 29, 2025'
      },
      {
        id: '8',
        code: 'QI-102',
        title: 'Drywall Finishing Issue',
        description: 'All bathroom fitting need to be all copper, but PVC was used in master bathroom.',
        severity: 'Medium',
        status: 'Resolved',
        assignee: 'Daniel James',
        assigneeInitials: 'DJ',
        createdDate: 'May 29, 2025'
      },
      {
        id: '9',
        code: 'QI-102',
        title: 'Incorrect Plumbing Fitting Used',
        description: 'All bathroom fitting need to be all copper, but PVC was used in master bathroom.',
        severity: 'Medium',
        status: 'Open',
        assignee: 'Daniel James',
        assigneeInitials: 'DJ',
        createdDate: 'May 29, 2025'
      }
    ]);
  
    const [filters, setFilters] = useState({
      search: '',
      status: '',
      severity: '',
      assignee: '',
      phase: ''
    });
  
    const handleDrop = (issueId: string, newStatus: string) => {
      setIssues(prevIssues =>
        prevIssues.map(issue =>
          issue.id === issueId ? { ...issue, status: newStatus as IssueModel['status'] } : issue
        )
      );
    };
  
    const filteredIssues = issues.filter(issue => {
      return (
        (!filters.search || issue.title.toLowerCase().includes(filters.search.toLowerCase())) &&
        (!filters.status || issue.status === filters.status) &&
        (!filters.severity || issue.severity === filters.severity) &&
        (!filters.assignee || issue.assignee === filters.assignee)
      );
    });
  
    const getIssuesByStatus = (status: string) => 
      filteredIssues.filter(issue => issue.status === status);
  
  

  
    return (
      <div className="min-h-screen bg-[#f6f6f6]">  
          {/* Main Content Container - Second Section */}
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">

                {/* Filter Bar */}
                <FilterBar
                  onSearch={(value) => setFilters(prev => ({ ...prev, search: value }))}
                  onStatusFilter={(value) => setFilters(prev => ({ ...prev, status: value }))}
                  onSeverityFilter={(value) => setFilters(prev => ({ ...prev, severity: value }))}
                  onAssigneeFilter={(value) => setFilters(prev => ({ ...prev, assignee: value }))}
                  onPhaseFilter={(value) => setFilters(prev => ({ ...prev, phase: value }))}
                />
  
                {/* Kanban Board */}
                <div className="flex gap-6 overflow-x-auto pb-6">
                  <KanbanColumn
                    title="Open"
                    status="Open"
                    issues={getIssuesByStatus('Open')}
                    count={getIssuesByStatus('Open').length}
                    onDrop={handleDrop}
                    bgColor="bg-[#CAD5FF]"
                    style='bg-[#CAD5FF] text-[#375DED]'
                  />
                  <KanbanColumn
                    title="In Progress"
                    status="In Progress"
                    issues={getIssuesByStatus('In Progress')}
                    count={getIssuesByStatus('In Progress').length}
                    onDrop={handleDrop}
                    bgColor="bg-[#FFDEDA]"
                    style='bg-[#FFDEDA] text-[#FF5038]'
                  />
                  <KanbanColumn
                    title="Under Review"
                    status="Under Review"
                    issues={getIssuesByStatus('Under Review')}
                    count={getIssuesByStatus('Under Review').length}
                    onDrop={handleDrop}
                    bgColor="bg-[#FFBCBC]"
                    style='bg-[#FFBCBC] text-[#EA5050]'
                  />
                  <KanbanColumn
                    title="Resolved"
                    status="Resolved"
                    issues={getIssuesByStatus('Resolved')}
                    count={getIssuesByStatus('Resolved').length}
                    onDrop={handleDrop}
                    bgColor="bg-[#CEFFE2]"
                    style='bg-[#CEFFE2] text-[#09A249]'
                  />
                </div>
              </div>
      </div>
    );
  };
  
  export default QualityIssues;