"use client";

import { IssueModel } from "@/app/models/common";
import { useState } from "react";

interface AddIssueModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (issue: Omit<IssueModel, 'id' | 'code' | 'createdDate'>) => void;
    defaultStatus?: string;
  }


  // AddIssueModal Component
const AddIssueModal: React.FC<AddIssueModalProps> = ({ isOpen, onClose, onSubmit, defaultStatus = 'Open' }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'Medium' as IssueModel['severity'],
    status: defaultStatus as IssueModel['status'],
    assignee: '',
    assigneeInitials: ''
  });

  const assigneeOptions = [
    { name: 'Daniel James', initials: 'DJ' },
    { name: 'Jake Matthews', initials: 'JM' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.assignee) {
      onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        severity: 'Medium',
        status: defaultStatus as IssueModel['status'],
        assignee: '',
        assigneeInitials: ''
      });
      onClose();
    }
  };

  const handleAssigneeChange = (assigneeName: string) => {
    const selectedAssignee = assigneeOptions.find(a => a.name === assigneeName);
    setFormData(prev => ({
      ...prev,
      assignee: assigneeName,
      assigneeInitials: selectedAssignee?.initials || ''
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add New Issue</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter issue title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe the issue in detail"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity
              </label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData(prev => ({ ...prev, severity: e.target.value as IssueModel['severity'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as IssueModel['status'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Under Review">Under Review</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assignee *
            </label>
            <select
              required
              value={formData.assignee}
              onChange={(e) => handleAssigneeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select assignee</option>
              {assigneeOptions.map(assignee => (
                <option key={assignee.name} value={assignee.name}>
                  {assignee.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIssueModal;