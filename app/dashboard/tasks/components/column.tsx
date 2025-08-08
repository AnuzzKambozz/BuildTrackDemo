"use client"
import React from 'react';
import {ColumnModel, TaskModel, TaskStatus } from "@/app/models/common"
import TaskCard from './task';
import { inter } from '@/app/fonts';


export interface ColumnProps {
    column: ColumnModel;
    tasks: TaskModel[];
    onDrop: (task: TaskModel, newStatus: TaskStatus) => void;
    onDragOver: (columnId: TaskStatus | null) => void;
    onAddTask: (columnId: TaskStatus) => void;
    isDragOver: TaskStatus | null;
  }


const Column = ({ column, tasks, onDrop, onDragOver, onAddTask, isDragOver }: ColumnProps) => {
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const taskData = JSON.parse(e.dataTransfer.getData('text/plain'));
      onDrop(taskData, column.id);
    };
  
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      onDragOver(column.id);
    };
  
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      onDragOver(null);
    };
  
    const getColumnHeaderColor = (status: string) => {
      switch (status) {
        case 'todo': return 'bg-[#CAD5FF] text-[#375DED]';
        case 'in-progress': return 'bg-[#FFDEDA] text-[#FF5038]';
        case 'review': return 'bg-[#FFBCBC] text-[#EA5050]';
        case 'done': return 'bg-[#CEFFE2] text-green-800';
        default: return 'bg-gray-200 text-[#09A249]';
      }
    };
  
    return (
      <div className="flex-1 min-w-[250]">
        <div className={`rounded-lg p-[11px] mb-2 max-h-[46px] ${getColumnHeaderColor(column.id)}`}>
          <h2 className={`${inter.className} antialiased font-semibold text-center text-[14px]`}>
            {column.title} ({tasks.length})
          </h2>
        </div>
        
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`min-h-96 p-2 transition-colors duration-200 ${
            isDragOver === column.id 
              ? 'bg-gray-100 rounded-lg' 
              : ''
          }`}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={() => {}}
              onDragEnd={() => {}}
            />
          ))}
          
          <button
            onClick={() => onAddTask(column.id)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Add Task
          </button>
        </div>
      </div>
    );
  };

  export default Column;