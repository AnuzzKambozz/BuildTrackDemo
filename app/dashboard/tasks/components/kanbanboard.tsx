"use client"
import React, { useState } from 'react';
// import { Plus, Filter, FilterIcon } from 'lucide-react';
import {ColumnModel, TaskModel, TaskStatus } from "@/app/models/common"
import Column from './column';
import AddTaskModal from './addtaskmodel';
import { inter } from '@/app/fonts';
import { BTButton } from '@/app/components/buttons/BTButton';
// import router from 'next/router';
import AddCircleIcon from '@/app/public/add_circle.svg';
import filterIcon from '@/app/public/filter_icon.svg';


export interface KanbanBoardProps {
    className?: string;
    initialTasks?: TaskModel[];
    onTaskCreate?: (task: TaskModel) => void;
    onTaskUpdate?: (task: TaskModel) => void;
    onTaskDelete?: (taskId: number) => void;
  }
  

const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
    className = '',
    initialTasks = [],
    onTaskCreate,
    onTaskUpdate,
  }) => {
    const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [activeColumn, setActiveColumn] = useState<TaskStatus | null>(null);
  
    const [columns] = useState<ColumnModel[]>([
      { id: 'todo', title: 'To Do' },
      { id: 'in-progress', title: 'In Progress' },
      { id: 'review', title: 'Under Review' },
      { id: 'done', title: 'Completed' }
    ]);
  
    const [tasks, setTasks] = useState<TaskModel[]>(initialTasks.length > 0 ? initialTasks : [
      {
        id: 1,
        title: 'Foundation Inspection',
        description: 'Schedule city inspector for foundation inspection and approval',
        status: 'todo',
        assignee: 'Clarke James',
        dueDate: '2025-05-29'
      },
      {
        id: 2,
        title: 'Foundation Inspection',
        description: 'Schedule city inspector for foundation inspection and approval',
        status: 'todo',
        assignee: 'Clarke James',
        dueDate: '2025-05-29'
      },
      {
        id: 3,
        title: 'Framing Phase',
        description: 'Schedule city inspector for foundation inspection and approval',
        status: 'in-progress',
        assignee: 'Clarke James',
        dueDate: '2025-05-29'
      },
      {
        id: 4,
        title: 'Site Preparation',
        description: 'Schedule city inspector for foundation inspection and approval',
        status: 'done',
        assignee: 'Clarke James',
        completedDate: '2025-05-29'
      }
    ]);
  
    const handleDrop = (task: TaskModel, newStatus: TaskStatus): void => {
      if (task.status === newStatus) return;
      
      const updatedTask: TaskModel = {
        ...task,
        status: newStatus,
        completedDate: newStatus === 'done' ? new Date().toISOString() : null
      };
  
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === task.id ? updatedTask : t
        )
      );
      
      setDragOverColumn(null);
      onTaskUpdate?.(updatedTask);
    };
  
    const handleAddTask = (columnId: TaskStatus): void => {
      setActiveColumn(columnId);
      setModalOpen(true);
    };
  
    const handleGlobalAddTask = (): void => {
      setActiveColumn('todo');
      setModalOpen(true);
    };
  
    const handleTaskSubmit = (taskData: Omit<TaskModel, 'id'>): void => {
      const newTask: TaskModel = {
        id: Date.now(),
        ...taskData
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
      onTaskCreate?.(newTask);
    };
  
    const getTasksByStatus = (status: TaskStatus): TaskModel[] => {
      return tasks.filter(task => task.status === status);
    };
  
    return (
      <div className={`min-h-screen bg-[#f6f6f6] ${className}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 p-[38px] h-[100px] rounded-md border-b shadow-sm bg-white">
            <div>
              <div className={`${inter.className} antialiased text-[24px] font-semibold mb-2 text-[#171E34]` }>Tasks</div>
              <p className={`${inter.className} antialiased text-[14px] font-medium text-[#525252]` }>Lorem ipsum is a dummy text to fill space</p>
            </div>
            
            <div className="flex space-x-3">
              <BTButton text='Filter' icon={filterIcon} loading={false} size='medium' type='outline_gray'  onClick={handleGlobalAddTask} />
              <BTButton text='Add Task' icon={AddCircleIcon} loading={false} size='medium' onClick={handleGlobalAddTask} />
            </div>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-6">
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={getTasksByStatus(column.id)}
                onDrop={handleDrop}
                onDragOver={setDragOverColumn}
                onAddTask={handleAddTask}
                isDragOver={dragOverColumn}
              />
            ))}
          </div>
        </div>
        
        <AddTaskModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleTaskSubmit}
          columnId={activeColumn}
        />
      </div>
    );
  };
  
  export default KanbanBoard;
  
  
