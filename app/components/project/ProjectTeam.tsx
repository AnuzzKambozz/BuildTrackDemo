import React, { useState } from 'react';
import { ComponentProps, TeamMember } from '@/app/types/project.type';

const ProjectTeam: React.FC<ComponentProps> = ({ data, updateData }) => {
  const [newTeamMember, setNewTeamMember] = useState<{ name: string; role: string }>({ 
    name: '', 
    role: '' 
  });

  const handleInputChange = (field: keyof typeof data, value: string): void => {
    updateData({ [field]: value });
  };

  const addTeamMember = (): void => {
    if (newTeamMember.name && newTeamMember.role) {
      const updatedTeamMembers: TeamMember[] = [
        ...data.additionalTeamMembers, 
        { ...newTeamMember, id: Date.now() }
      ];
      updateData({ additionalTeamMembers: updatedTeamMembers });
      setNewTeamMember({ name: '', role: '' });
    }
  };

  const removeTeamMember = (id: number): void => {
    const updatedTeamMembers = data.additionalTeamMembers.filter(member => member.id !== id);
    updateData({ additionalTeamMembers: updatedTeamMembers });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-[18px] font-semibold text-primaryColor mb-4">Project Team</h2>
      
      {/* Project Manager and Site Supervisor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Manager*
          </label>
          <select
            value={data.projectManager}
            onChange={(e) => handleInputChange('projectManager', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="New Home Construction">New Home Construction</option>
            <option value="John Smith">John Smith</option>
            <option value="Jane Doe">Jane Doe</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Supervisor*
          </label>
          <select
            value={data.siteSupervisor}
            onChange={(e) => handleInputChange('siteSupervisor', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Supervisor</option>
            <option value="Mike Johnson">Mike Johnson</option>
            <option value="Sarah Wilson">Sarah Wilson</option>
          </select>
        </div>
      </div>

      {/* Additional Team Members */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Additional Team Members*
        </label>
        
        {/* Add New Team Member */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              value={newTeamMember.name}
              onChange={(e) => setNewTeamMember(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Team Member Name"
            />
          </div>
          <div className="w-48">
            <input
              type="text"
              value={newTeamMember.role}
              onChange={(e) => setNewTeamMember(prev => ({ ...prev, role: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Role"
            />
          </div>
          <button
            onClick={addTeamMember}
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Add
          </button>
        </div>

        {/* Team Members List */}
        {data.additionalTeamMembers.length > 0 && (
          <div className="space-y-2">
            {data.additionalTeamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex-1">
                  <span className="font-medium">{member.name}</span>
                  <span className="text-gray-500 ml-2">- {member.role}</span>
                </div>
                <button
                  onClick={() => removeTeamMember(member.id)}
                  className="px-3 py-1 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        
        {data.additionalTeamMembers.length === 0 && (
          <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-md">
            No additional team members added yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTeam;