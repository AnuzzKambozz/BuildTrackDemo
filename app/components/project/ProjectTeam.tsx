import React from 'react';
import { ComponentProps } from '@/app/types/project.type';
import Dropdown from '@/app/components/dropdowns/dropdown_new';

const ProjectTeam: React.FC<ComponentProps> = ({ data, updateData, onAddTeamMember }) => {
  // const [newTeamMember, setNewTeamMember] = useState<{ name: string; role: string }>({ 
  //   name: '', 
  //   role: '' 
  // });

  const projectManagers = [ 'John Smith', 'Jane Doe'];
  const siteSupervisors = ['Mike Johnson', 'Sarah Wilson'];

  const handleInputChange = (field: keyof typeof data, value: string): void => {
    updateData({ [field]: value });
  };

  // const addTeamMember = (): void => {
  //   if (newTeamMember.name && newTeamMember.role) {
  //     const updatedTeamMembers: TeamMember[] = [
  //       ...data.additionalTeamMembers, 
  //       { ...newTeamMember, id: Date.now() }
  //     ];
  //     updateData({ additionalTeamMembers: updatedTeamMembers });
  //     setNewTeamMember({ name: '', role: '' });
  //   }
  // };

  // const removeTeamMember = (id: number): void => {
  //   const updatedTeamMembers = data.additionalTeamMembers.filter(member => member.id !== id);
  //   updateData({ additionalTeamMembers: updatedTeamMembers });
  // };

  return (
    <div className="space-y-6">
      <h2 className="text-[18px] font-semibold text-primaryColor mb-4">Project Team</h2>
      
      {/* Project Manager and Site Supervisor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
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
          </select> */}

            <Dropdown
                name="projectManager"
                value={data.projectManager}
                options={projectManagers}
                onChange={(value: string | number) => handleInputChange('projectManager', String(value))}
                label="Project Manager"
                placeholder="Select Project Manager"
                mandatory={true}
                searchable={true}
                showAddButton={true}
                addButtonText='+ Add Team member'
                onAddItem={() => {
                  onAddTeamMember?.();
                  console.log('Add Project Manager clicked');
                }}
                searchPlaceholder="Search team member..."
              />
        </div>
        
        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
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
          </select> */}
          <Dropdown
                name="siteSupervisor"
                value={data.siteSupervisor}
                options={siteSupervisors}
                onChange={(value: string | number) => handleInputChange('siteSupervisor', String(value))}
                label="Site Supervisor"
                placeholder="Select Site Supervisor"
                mandatory={true}
                searchable={true}
                showAddButton={true}
                addButtonText='+ Add Team member'
                onAddItem={() => {
                                    onAddTeamMember?.();
                  console.log('Add Site Supervisor clicked');
                }}
                searchPlaceholder="Search team member..."
              />
        </div>
      </div>


    </div>
  );
};

export default ProjectTeam;