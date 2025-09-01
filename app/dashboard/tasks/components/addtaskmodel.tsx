"use client"
import React, { useState } from 'react';
import { TaskModel, TaskStatus } from "@/app/models/common";
import InputField from "@/app/components/textField";
import Dropdown from "@/app/components/dropdowns/dropdown_new";
import TextAreaField from "@/app/components/textAreaField";
import ModalBackdrop from '@/app/components/modal_backdrop';
import { X } from 'lucide-react';

export interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (taskData: Omit<TaskModel, 'id'>) => void;
    columnId: TaskStatus | null;
    // Add these props to pass data from parent component
    projects?: Array<{ id: string; name: string }>;
    milestones?: Array<{ id: string; name: string; projectId?: string }>;
    assignees?: Array<{ id: string; name: string }>;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    columnId,
    projects = [],
    milestones = [],
    assignees = []
}) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [assignee, setAssignee] = useState<string | number>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [projectId, setProjectId] = useState<string | number>('');
    const [milestoneId, setMilestoneId] = useState<string | number>('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Convert arrays to dropdown format
    const projectOptions = projects.map(project => ({
        value: project.id,
        label: project.name
    }));

    const assigneeOptions = assignees.map(assignee => ({
        value: assignee.id,
        label: assignee.name
    }));

    // Filter milestones based on selected project
    const filteredMilestones = projectId 
        ? milestones.filter(milestone => milestone.projectId === projectId)
        : milestones;
    
    const milestoneOptions = filteredMilestones.map(milestone => ({
        value: milestone.id,
        label: milestone.name
    }));

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        
        if (!title.trim()) {
            newErrors.title = 'Title is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (): void => {
        if (!validateForm() || !columnId) return;
        
        const taskData: Omit<TaskModel, 'id'> = {
            title: title.trim(),
            description: description.trim(),
            assignee: assignee ? assignee.toString() : undefined,
            status: columnId,
            dueDate: dueDate || undefined,
            completedDate: columnId === 'done' ? new Date().toISOString() : null,
        };
        
        // You can still use projectId and milestoneId in your component logic
        // but they won't be part of the task data sent to the parent
        console.log('Selected project:', projectId);
        console.log('Selected milestone:', milestoneId);
        
        onSubmit(taskData);
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setAssignee('');
        setDueDate('');
        setProjectId('');
        setMilestoneId('');
        setErrors({});
    };

    const handleCancel = () => {
        resetForm();
        onClose();
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        if (errors.title) {
            setErrors(prev => ({ ...prev, title: '' }));
        }
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(e.target.value);
    };

    const handleProjectChange = (value: string | number) => {
        setProjectId(value);
        // Reset milestone when project changes
        setMilestoneId('');
    };

    const handleMilestoneChange = (value: string | number) => {
        setMilestoneId(value);
    };

    const handleAssigneeChange = (value: string | number) => {
        setAssignee(value);
    };

    if (!isOpen) return null;

    return (
        <ModalBackdrop isOpen={isOpen} onClose={onClose}>

        {/* <div className="fixed inset-0 flex items-center justify-center z-50"> */}
              <div className="inline-block w-[600px]  p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                       {/* Modal Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Add New Task</h3>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    </div>

                    {/* Modal Body - Scrollable */}
        <div className="mt-4 max-h-[500px] overflow-y-auto pr-2">
          <div className="space-y-4">
 <InputField
                        label="Title"
                        name="title"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Enter task title"
                        mandatory={true}
                        error={errors.title}
                    />
                    
                    {/* Description Field */}
                    <TextAreaField
                        label="Description"
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Schedule city inspector for foundation..."
                        rows={3}
                    />

                    {/* Project Dropdown */}
                    <Dropdown
                        label="Project"
                        name="project"
                        value={projectId}
                        options={projectOptions}
                        onChange={handleProjectChange}
                        placeholder="Select Project"
                        searchable={true}
                        clearable={true}
                    />

                    {/* Milestone Dropdown */}
                    <Dropdown
                        label="Milestone"
                        name="milestone"
                        value={milestoneId}
                        options={milestoneOptions}
                        onChange={handleMilestoneChange}
                        placeholder="Select Milestone"
                        searchable={true}
                        clearable={true}
                        disabled={!projectId}
                        helperText={!projectId ? "Please select a project first" : undefined}
                    />
                    
                    {/* Assignee Dropdown */}
                    <Dropdown
                        label="Assignee"
                        name="assignee"
                        value={assignee}
                        options={assigneeOptions}
                        onChange={handleAssigneeChange}
                        placeholder="Select Assignee"
                        searchable={true}
                        clearable={true}
                    />
                    
                    {/* Due Date Field */}
                    <InputField
                        label="Due Date"
                        type="date"
                        name="dueDate"
                        value={dueDate}
                        onChange={handleDueDateChange}
                    />
          </div>

        </div>

                {/* Modal Footer */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 mt-4">
                           <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!title.trim()}
                    >
                        Add Task
                    </button>
        </div>


                        </div>

        {/* </div> */}
            
        </ModalBackdrop>

    );
};

export default AddTaskModal;