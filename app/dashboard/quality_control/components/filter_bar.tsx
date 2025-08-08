"use client";

import { Dropdown, DropdownOption } from '@/app/components/dropdowns/dropdown';
import { BTButton } from "@/app/components/buttons/BTButton";
import AddCircleIcon from '@/app/public/add_circle.svg'; // Assuming you have an SVG icon for Plus
import React from "react";
import AddIssueModal from './add_issue_modal';

// FilterBar Component
interface FilterBarProps {
  onSearch: (value: string) => void;
  onStatusFilter: (value: string) => void;
  onSeverityFilter: (value: string) => void;
  onAssigneeFilter: (value: string) => void;
  onPhaseFilter: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onSearch,
  onStatusFilter,
  onSeverityFilter,
  onAssigneeFilter,
  onPhaseFilter
}) => {

  const [isModalOpen, setIsModalOpen] = React.useState(false);
//   const [modalDefaultStatus, setModalDefaultStatus] = React.useState('Open');
  const [statusFilter, setStatusFilter] = React.useState('Status : All');
  const [severityFilter, setSeverityFilter] = React.useState('Severity : All');
  const [assigneeFilter, setAssigneeFilter] = React.useState('Assignee : All');
  const [phaseFilter, setPhaseFilter] = React.useState('Phase : All');



  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="flex-1 min-w-[200px] max-w-[300px]">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search Issues"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 bg-[#F9FAFC] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className='w-[140px]'>
        <Dropdown
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
            // Extract the actual filter value (everything after " : ")
            const filterValue = value === 'Status : All' ? '' : value.replace('Status : ', '');
            onStatusFilter(filterValue);
          }}
          placeholder=""
        >
          <DropdownOption value="Status : All">Status : All</DropdownOption>
          <DropdownOption value="Status : Open">Open</DropdownOption>
          <DropdownOption value="Status : In Progress">In Progress</DropdownOption>
          <DropdownOption value="Status : Under Review">Under Review</DropdownOption>
          <DropdownOption value="Status : Resolved">Resolved</DropdownOption>
        </Dropdown>
      </div>

      <div className='w-[130px]'>
        <Dropdown
          value={severityFilter}
          onValueChange={(value) => {
            setSeverityFilter(value)
            // Extract the actual filter value (everything after " : ")
            const filterValue = value === 'Severity : All' ? '' : value.replace('Severity : ', '');
            onSeverityFilter(filterValue);
          }}
          placeholder=""
        >
          <DropdownOption value="Severity : All">Severity : All</DropdownOption>
          <DropdownOption value="Severity : Critical">Critical</DropdownOption>
          <DropdownOption value="Severity : Medium">In Medium</DropdownOption>
          <DropdownOption value="Severity : Low">Low</DropdownOption>
        </Dropdown>
      </div>


      <div className='w-[160px]'>
        <Dropdown
          value={assigneeFilter}
          onValueChange={(value) => {
            setAssigneeFilter(value)
            // Extract the actual filter value (everything after " : ")
            const filterValue = value === 'Assignee : All' ? '' : value.replace('Assignee : ', '');
            onAssigneeFilter(filterValue);
          }}
          placeholder=""
        >
          <DropdownOption value="Assignee : All">Assignee : All</DropdownOption>
          <DropdownOption value="Assignee : Daniel James">Daniel James</DropdownOption>
          <DropdownOption value="Assignee : Jake Matthews">Jake Matthews</DropdownOption>
        </Dropdown>
      </div>

      <div className='w-[140px]'>
        <Dropdown
          value={phaseFilter}
          onValueChange={(value) => {
            setPhaseFilter(value)
            // Extract the actual filter value (everything after " : ")
            const filterValue = value === 'Review : All' ? '' : value.replace('Phase : ', '');
            onPhaseFilter(filterValue);
          }}
          placeholder=""
        >
          <DropdownOption value="Phase : All">Phase : All</DropdownOption>
          <DropdownOption value="Phase : Planning">Planning</DropdownOption>
          <DropdownOption value="Phase : Execution">Execution</DropdownOption>
          <DropdownOption value="Phase : Review">Review</DropdownOption>

        </Dropdown>
      </div>





      {/* <select 
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
        onChange={(e) => onPhaseFilter(e.target.value)}
      >
        <option value="">Phase : All</option>
        <option value="Planning">Planning</option>
        <option value="Execution">Execution</option>
        <option value="Review">Review</option>
      </select> */}
      
      <div className="flex flex-row justify-end ml-auto">
        <BTButton 
          text='Add Issue' 
          icon={AddCircleIcon} 
          loading={false} 
          size='medium' 
          onClick={() => {
            // Perform login logic here 
            setIsModalOpen(true)
          }} 
        />
      </div>

      {isModalOpen && (
        <AddIssueModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={(issue) => {
            // Handle issue submission logic here
            console.log(issue);
            setIsModalOpen(false);
          }} 
        //   defaultStatus={modalDefaultStatus}
        />
      )}
    </div>
  );
};

export default FilterBar;