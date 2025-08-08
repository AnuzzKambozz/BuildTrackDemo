import React, { useState } from 'react';
import { ComponentProps, Milestone } from '@/app/types/project.type';

const ProjectTimeline: React.FC<ComponentProps> = ({ data, updateData }) => {
  const [newMilestone, setNewMilestone] = useState<{ name: string; targetDate: string }>({ 
    name: '', 
    targetDate: '' 
  });

  const handleInputChange = (field: keyof typeof data, value: string): void => {
    updateData({ [field]: value });
  };

  const handleStatusChange = (status: string): void => {
    updateData({ projectStatus: status });
  };

  const addMilestone = (): void => {
    if (newMilestone.name && newMilestone.targetDate) {
      const updatedMilestones: Milestone[] = [
        ...data.milestones, 
        { ...newMilestone, id: Date.now() }
      ];
      updateData({ milestones: updatedMilestones });
      setNewMilestone({ name: '', targetDate: '' });
    }
  };

  const removeMilestone = (id: number): void => {
    const updatedMilestones = data.milestones.filter(m => m.id !== id);
    updateData({ milestones: updatedMilestones });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-[18px] font-semibold text-primaryColor mb-4">Project Timeline</h2>
      
      {/* Start Date and Estimate End Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date*
          </label>
          <input
            type="date"
            value={data.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimate End Date*
          </label>
          <input
            type="date"
            value={data.estimateEndDate}
            onChange={(e) => handleInputChange('estimateEndDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Project Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Project Status
        </label>
        <div className="flex gap-2">
          {['Planning', 'In Progress', 'On Hold'].map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                data.projectStatus === status
                  ? status === 'Planning'
                    ? 'bg-blue-200 text-blue-800'
                    : status === 'In Progress'
                    ? 'bg-green-200 text-green-800'
                    : 'bg-red-200 text-red-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Key Milestones */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Key Milestones
        </label>
        
        {/* Add New Milestone */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              value={newMilestone.name}
              onChange={(e) => setNewMilestone(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Milestone Name*"
            />
          </div>
          <div className="w-48">
            <input
              type="date"
              value={newMilestone.targetDate}
              onChange={(e) => setNewMilestone(prev => ({ ...prev, targetDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={addMilestone}
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Add
          </button>
        </div>

        {/* Milestone List */}
        {data.milestones.length > 0 && (
          <div className="space-y-2">
            {data.milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex-1">
                  <span className="font-medium">{milestone.name}</span>
                  <span className="text-gray-500 ml-2">- {milestone.targetDate}</span>
                </div>
                <button
                  onClick={() => removeMilestone(milestone.id)}
                  className="px-3 py-1 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTimeline;