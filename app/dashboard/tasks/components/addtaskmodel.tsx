"use client"
import React, { useState } from 'react';
import {TaskModel, TaskStatus } from "@/app/models/common"


export interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (taskData: Omit<TaskModel, 'id'>) => void;
    columnId: TaskStatus | null;
  }


  const AddTaskModal: React.FC<AddTaskModalProps> = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    columnId 
  }) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [assignee, setAssignee] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
  
    const handleSubmit = (): void => {
      if (!title.trim() || !columnId) return;
      
      const taskData: Omit<TaskModel, 'id'> = {
        title: title.trim(),
        description: description.trim(),
        assignee: assignee.trim() || undefined,
        status: columnId,
        dueDate: dueDate || undefined,
        completedDate: columnId === 'done' ? new Date().toISOString() : null
      };
      
      onSubmit(taskData);
      
      setTitle('');
      setDescription('');
      setAssignee('');
      setDueDate('');
      onClose();
    };
  
    const handleInputChange = (
      setter: React.Dispatch<React.SetStateAction<string>>
    ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={handleInputChange(setTitle)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={handleInputChange(setDescription)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Schedule city inspector for foundation..."
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignee
              </label>
              <input
                type="text"
                value={assignee}
                onChange={handleInputChange(setAssignee)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Clarke James"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={handleInputChange(setDueDate)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default AddTaskModal;
