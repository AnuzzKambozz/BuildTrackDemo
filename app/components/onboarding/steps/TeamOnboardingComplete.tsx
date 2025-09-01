'use client';

import React from 'react';
// import { Button } from '@/app/ui/button';
import { CheckCircle, Users, Mail, Settings } from 'lucide-react';
import { TeamOnboardingData } from '../TeamOnboardingWizard';
import { BTButton } from '../../buttons/BTButton';

interface Department {
    name: string;
    description?: string;
    manager_id?: number;
}

interface Invitation {
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    department?: number;
}

interface TeamOnboardingCompleteProps {
  data: TeamOnboardingData;
  createdDepartments: Department[];
  sentInvitations: Invitation[];
  onComplete?: () => void;
}

export default function TeamOnboardingComplete({
  data,
  createdDepartments,
  sentInvitations,
  onComplete,
}: TeamOnboardingCompleteProps) {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="p-4 bg-green-100 rounded-full">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Team Onboarding Setup Complete!
        </h2>
        <p className="text-lg text-gray-600">
          Your team structure and onboarding process have been successfully configured.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Departments Created
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {createdDepartments.length}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {createdDepartments.map(dept => dept.name).join(', ')}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Invitations Sent
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {sentInvitations.length}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Team members will receive email invitations
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Settings className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Onboarding Steps
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            {data.onboarding_config.custom_steps.length}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Custom steps configured for new members
          </p>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 p-6 rounded-lg mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What&apos;s Next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">For Team Members:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Check their email for invitation links</li>
              <li>• Create their accounts and complete onboarding</li>
              <li>• Access role-specific training materials</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">For Administrators:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Monitor onboarding progress in the team dashboard</li>
              <li>• Assign mentors and review completion status</li>
              <li>• Customize onboarding steps as needed</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 pt-6">
        <BTButton
          type='primary'
          onClick={onComplete}
          text=" Go to Team Dashboard"
        />

        <BTButton
          type="outline_blue"
          onClick={() => window.location.href = '/dashboard/team'}
          text=" View Team Management"   
        />

      </div>
    </div>
  );
} 