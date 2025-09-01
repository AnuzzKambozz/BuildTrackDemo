'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Step Components
import UserInvitationStep from './steps/UserInvitationStep';
import DepartmentSetupStep from './steps/DepartmentSetupStep';
import OnboardingConfigStep from './steps/OnboardingConfigStep';
import TeamOnboardingComplete from './steps/TeamOnboardingComplete';

// Define proper types instead of any
interface Department {
  id?: number;
  name: string;
  description?: string;
  manager_id?: number;
}

interface Invitation {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  department?: number;
}

export interface TeamOnboardingData {
  // User Invitations
  invitations: Array<{
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    department?: number;
  }>;
  
  // Departments
  departments: Array<{
    name: string;
    description?: string;
    manager_id?: number;
  }>;
  
  // Onboarding Configuration
  onboarding_config: {
    welcome_message: string;
    estimated_duration_days: number;
    auto_assign_mentor: boolean;
    require_completion: boolean;
    custom_steps: Array<{
      title: string;
      description: string;
      required: boolean;
    }>;
  };
}

// Simple Button component to replace BTButton
interface ButtonProps {
  type?: 'primary' | 'outline_blue';
  text: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  type = 'primary', 
  text, 
  onClick, 
  disabled = false, 
  loading = false, 
  loadingText = 'Loading...' 
}) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const primaryClasses = "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300";
  const outlineClasses = "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 disabled:border-blue-300 disabled:text-blue-300";
  
  const classes = `${baseClasses} ${type === 'primary' ? primaryClasses : outlineClasses}`;
  
  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? loadingText : text}
    </button>
  );
};

const steps = [
  { id: 'departments', title: 'Department Setup', component: DepartmentSetupStep },
  { id: 'invitations', title: 'Invite Team Members', component: UserInvitationStep },
  { id: 'configuration', title: 'Onboarding Configuration', component: OnboardingConfigStep },
  { id: 'complete', title: 'Setup Complete', component: TeamOnboardingComplete },
];

export default function TeamOnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [teamData, setTeamData] = useState<TeamOnboardingData>({
    invitations: [],
    departments: [],
    onboarding_config: {
      welcome_message: 'Welcome to our team! We\'re excited to have you on board.',
      estimated_duration_days: 7,
      auto_assign_mentor: true,
      require_completion: true,
      custom_steps: [
        {
          title: 'Company Overview',
          description: 'Learn about our company culture and values',
          required: true,
        },
        {
          title: 'Role-Specific Training',
          description: 'Complete training specific to your role',
          required: true,
        },
        {
          title: 'Team Introduction',
          description: 'Meet your team members and understand collaboration',
          required: false,
        },
      ],
    },
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdDepartments] = useState<Department[]>([]);
  const [sentInvitations] = useState<Invitation[]>([]);
  const router = useRouter();

  const updateTeamData = (updates: Partial<TeamOnboardingData>) => {
    setTeamData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepComplete = async (stepData: Partial<TeamOnboardingData>) => {
    updateTeamData(stepData);
    
    // Handle step-specific actions
    if (currentStep === 0) { // Department setup
      await createDepartments();
    } else if (currentStep === 1) { // User invitations
      await sendInvitations();
    } else if (currentStep === 2) { // Configuration
      await saveOnboardingConfig();
    }
    
    nextStep();
  };

  const createDepartments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // const departments = [];
      // for (const dept of teamData.departments) {
      //   const response = await apiClient.createTeamDepartment({
      //     name: dept.name,
      //     description: dept.description,
      //     manager_id: dept.manager_id,
      //   });
      //   departments.push(response.data);
      // }
      // setCreatedDepartments(departments);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create departments';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendInvitations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // const invitations = [];
      // for (const invitation of teamData.invitations) {
      //   const response = await apiClient.createUserInvitation({
      //     email: invitation.email,
      //     first_name: invitation.first_name,
      //     last_name: invitation.last_name,
      //     role: invitation.role,
      //     department: invitation.department,
      //   });
      //   invitations.push(response.data);
      // }
      // setSentInvitations(invitations);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send invitations';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const saveOnboardingConfig = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // await apiClient.createTeamOnboarding({
      //   welcome_message: teamData.onboarding_config.welcome_message,
      //   estimated_duration_days: teamData.onboarding_config.estimated_duration_days,
      //   auto_assign_mentor: teamData.onboarding_config.auto_assign_mentor,
      //   require_completion: teamData.onboarding_config.require_completion,
      //   custom_steps: teamData.onboarding_config.custom_steps,
      // });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save onboarding configuration';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => {
    // Redirect to team dashboard
    router.push('/dashboard/team');
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Team Onboarding Setup
          </h1>
          <p className="text-lg text-gray-600">
            Set up your team structure and onboarding process
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <span
                key={step.id}
                className={`text-xs font-medium ${
                  steps[currentStep].id === step.id
                    ? 'text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <CurrentStepComponent
            data={teamData}
            onUpdate={updateTeamData}
            onComplete={(stepData?: Partial<TeamOnboardingData>) => {
              if (currentStep === steps.length - 1) {
                handleComplete();
              } else if (stepData) {
                handleStepComplete(stepData);
              }
            }}
            loading={loading}
            createdDepartments={createdDepartments}
            sentInvitations={sentInvitations}
          />

          {/* Navigation */}
          {currentStep < steps.length - 1 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                type="outline_blue"
                text="Previous"
                onClick={prevStep}
                disabled={currentStep === 0}
              />
              
              <Button
                onClick={() => handleStepComplete({})}
                disabled={loading}
                text="Next"
                loading={loading}
                type="primary"
                loadingText='Processing...'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}