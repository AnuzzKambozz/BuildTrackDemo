"use client"
import React from 'react';
import { TaskModel } from "@/app/models/common"
import { inter } from '@/app/fonts';

export interface TaskProps {
    task: TaskModel;
    onDragStart: (task: TaskModel) => void;
    onDragEnd: () => void;
  }

// Task Component
const TaskCard = ({ task, onDragStart, onDragEnd }: TaskProps) => {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData('text/plain', JSON.stringify(task));
      onDragStart(task);
    };
  
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'todo': return 'border-l-[#375DED]';
        case 'in-progress': return 'border-l-[#FF5038]';
        case 'review': return 'border-l-[#EA5050]';
        case 'done': return 'border-l-[#09A249]';
        default: return 'border-l-gray-500';
      }
    };
  
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    };
  
    return (
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={onDragEnd}
        className={`bg-white rounded-lg shadow-sm border-l-4 ${getStatusColor(task.status)} p-4 mb-4 cursor-move hover:shadow-md transition-shadow duration-200`}
      >
        <h3 className={`${inter.className} antialiased font-semibold text-[#000000] text-[14px] mb-2`}>{task.title}</h3>
        <p className={`${inter.className} antialiased font-normal text-[13px] text-[#98989C] mb-3`}>{task.description}</p>
        
        <div className="space-y-1">
          {task.dueDate && (
            <div className="flex items-center text-sm">
              <span className="text-red-600 font-medium">Due :</span>
              <span className="text-gray-700 ml-1">{formatDate(task.dueDate)}</span>
            </div>
          )}
          
          {task.completedDate && (
            <div className="flex items-center text-sm">
              <span className="text-[#09A249] font-medium">Completed :</span>
              <span className="text-gray-700 ml-1">{formatDate(task.completedDate)}</span>
            </div>
          )}
          
          {task.assignee && (
            <div className="flex items-center text-sm">
              <span className="text-blue-600 font-medium">Assigned :</span>
              <span className="text-gray-700 ml-1">{task.assignee}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default TaskCard;