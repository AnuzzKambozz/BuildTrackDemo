'use client';

import React, { useState } from 'react';
import { ProjectFormData } from '@/app/types/project.type';
import BasicInformation from '@/app/components/project/BasicInformation';
import ProjectTimeline from '@/app/components/project/ProjectTimeline';
import FinancialInformation from '@/app/components/project/FinancialInformation';
import ProjectTeam from '@/app/components/project/ProjectTeam';
import PermitsApprovals from '@/app/components/project/PermitsApprovals';
import useWindowSize from '@/app/hooks/useWindowSize';                 
import AddClientModal from '@/app/dashboard/client_management/components/add_client_modal';
import EmployeeModal from '@/app/components/resource_management/add_member_modal';


const CreateProjectForm: React.FC = () => {

  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);


  const [formData, setFormData] = useState<ProjectFormData>({
    // Basic Information
    projectName: '',
    client: '',
    projectType: 'New Construction',
    projectAddress: '',
    city: '',
    state: '',
    zip: '',
    
    // Project Timeline
    startDate: '',
    estimateEndDate: '',
    projectStatus: 'Planning',
    milestones: [],
    
    // Financial Information
    projectBudget: '',
    budgetTemplate: 'Standard Residential',
    projectTemplate: 'New Home Construction',
    costCodeStructure: 'Standard Codes',
    paymentTerms: 'Net 30',
    
    // Project Team
    projectManager: 'New Home Construction',
    siteSupervisor: '',
    additionalTeamMembers: [],
    
    // Permits & Approvals
    permits: {
      buildingPermit: false,
      electricalPermit: false,
      plumbingPermit: false,
      hvacPermit: false,
      historicDistrict: false,
      environmentalAssessment: false
    }
  });

  const { height } = useWindowSize();


  const updateFormData = (data: Partial<ProjectFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };

  // const handleSaveAsDraft = (): void => {
  //   console.log('Saving as draft:', formData);
  //   // Implement save as draft logic
  // };

  const handleCreateProject = (): void => {
    console.log('Creating project:', formData);
    // Implement create project logic
  };

  // const handleCancel = (): void => {
  //   console.log('Canceling form');
  //   // Implement cancel logic
  // };

  return (
    <div className=" w-full overflow-y-auto bg-white" style={{maxHeight: height - 150}}>
        <div className="w-full px-5 py-5">
            <div className="w-full max-w-none">
            <h1 className="text-[16px] font-semibold text-gray-900 mb-8">Create New Project</h1>
            <div className="space-y-6">
                <BasicInformation 
                data={formData} 
                updateData={updateFormData} 
                onAddClient={() => setShowAddClientModal(true)}
                />
                
                <ProjectTimeline 
                data={formData} 
                updateData={updateFormData} 
                />
                
                <FinancialInformation 
                data={formData} 
                updateData={updateFormData} 
                />
                
                <ProjectTeam 
                data={formData} 
                updateData={updateFormData} 
                onAddTeamMember={() => setShowAddMemberModal(true)}
                />
                
                <PermitsApprovals 
                data={formData} 
                updateData={updateFormData} 
                />
            </div>
        </div>
    </div>
        {/* Form Actions */}
        <div className="mt-8 flex justify-end space-x-4 pb-6">
            {/* <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            
            <button
              type="button"
              onClick={handleSaveAsDraft}
              className="px-6 py-2 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save as Draft
            </button> */}
            
            <button
              type="button"
              onClick={handleCreateProject}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Project
            </button>
        </div>

        {/* Add Client Modal */}
          {showAddClientModal && (
            <AddClientModal
              isOpen={showAddClientModal}
              onClose={() => setShowAddClientModal(false)}
              onSubmit={() => {
                // Handle new client addition logic here
                setShowAddClientModal(false);
              }}
            />
          )}

           {/* Employee Modal */}
        <EmployeeModal
          isOpen={showAddMemberModal}
          onClose={() => setShowAddMemberModal(false)}
          onSubmit={() => {
            // Handle new employee addition logic here
            setShowAddMemberModal(false);
          }}
        />
    </div>
  );
};

export default CreateProjectForm;

