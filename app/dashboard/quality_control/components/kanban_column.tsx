"use client";

import React from "react";
import IssueCard from "./issue_card";
import { IssueModel } from "@/app/models/common";
import AddIssueModal from "./add_issue_modal";
import { BTButton } from "@/app/components/buttons/BTButton";
import AddCircleIcon from '@/app/public/add_circle.svg'; // Assuming you have an SVG icon for Plus
import { inter } from "@/app/fonts";


// KanbanColumn Component
interface KanbanColumnProps {
    title: string;
    status: string;
    issues: IssueModel[];
    count: number;
    onDrop: (issueId: string, newStatus: string) => void;
    bgColor: string;
    style: string;
  }
  
  const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
    title, 
    status, 
    issues, 
    count, 
    onDrop, 
    bgColor, 
    style, 
  }) => {
    const [isDragOver, setIsDragOver] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    // const [modalDefaultStatus, setModalDefaultStatus] = React.useState('Open');
  
    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
    };
  
    const handleDragLeave = (e: React.DragEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      
      if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
        setIsDragOver(false);
      }
    };
  
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const issueId = e.dataTransfer.getData('text/plain');
      onDrop(issueId, status);
    };
  
    return (
      <div className="flex-1 min-w-[250px]">
        <div className={`${bgColor} ${style} rounded-lg p-4 mb-4 text-center shadow-sm`}>
          <h3 className={`${inter.className} antialiased ${style} font-semibold  text-[14px]`}>
            {title} ({count})
          </h3>
        </div>
        
        <div 
          className={`min-h-[500px] p-3 rounded-lg transition-all duration-200 ${
            isDragOver 
              ? 'bg-blue-50 border-2 border-blue-300 border-dashed' 
              : 'bg-gray-50 border border-gray-200'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-4 ">
            {issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
            <div className="flex flex-col items-center justify-center">
            <BTButton text='Add Issue' icon={AddCircleIcon} loading={false} size='medium' onClick={() => {
                  // Perform login logic here 
                  setIsModalOpen(true)
                  
                } } />
            </div>
             
            
          </div>
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
            // defaultStatus={modalDefaultStatus}
          />
        )}
      </div>
    );
  };

  export default KanbanColumn;
  