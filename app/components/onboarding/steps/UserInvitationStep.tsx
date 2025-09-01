'use client';

import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Dropdown, DropdownOption } from '@/app/components/ui/dropdown';
import {  Trash2, Mail } from 'lucide-react';//Plus,
import { TeamOnboardingData } from '../TeamOnboardingWizard';
import { BTButton } from '../../buttons/BTButton';

interface Department {
    name: string;
    id?: number;
}

// interface Invitation {
//     email: string;
//     first_name: string;
//     last_name: string;
//     role: string;
//     department?: number;
// }

interface UserInvitationStepProps {
  data: TeamOnboardingData;
  onUpdate: (updates: Partial<TeamOnboardingData>) => void;
  onComplete: (stepData: Partial<TeamOnboardingData>) => void;
  loading: boolean;
  createdDepartments: Department[];
}

export default function UserInvitationStep({
  data,
  onUpdate,
  // onComplete,
  // loading,
  createdDepartments,
}: UserInvitationStepProps) {
  const [newInvitation, setNewInvitation] = useState({
    email: '',
    first_name: '',
    last_name: '',
    role: 'member',
    department: undefined as number | undefined,
  });

  const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'member', label: 'Team Member' },
    { value: 'viewer', label: 'Viewer' },
  ];

  const addInvitation = () => {
    if (newInvitation.email.trim() && newInvitation.first_name.trim() && newInvitation.last_name.trim()) {
      const updatedInvitations = [...data.invitations, { ...newInvitation }];
      onUpdate({ invitations: updatedInvitations });
      setNewInvitation({
        email: '',
        first_name: '',
        last_name: '',
        role: 'member',
        department: undefined,
      });
    }
  };

  const removeInvitation = (index: number) => {
    const updatedInvitations = data.invitations.filter((_, i) => i !== index);
    onUpdate({ invitations: updatedInvitations });
  };

  // const handleComplete = () => {
  //   onComplete({});
  // };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Invite Team Members
        </h2>
        <p className="text-gray-600">
          Invite team members to join your organization. They will receive email invitations to create their accounts.
        </p>
      </div>

      {/* Add New Invitation */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add Team Member</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <Input
            className={""}
              type="text"
              placeholder="John"
              value={newInvitation.first_name}
              onChange={(value:string) => setNewInvitation(prev => ({ ...prev, first_name: value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <Input
            className={""}
              type="text"
              placeholder="Doe"
              value={newInvitation.last_name}
              onChange={(value:string) => setNewInvitation(prev => ({ ...prev, last_name: value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <Input
            className={""}
              type="email"
              placeholder="john.doe@company.com"
              value={newInvitation.email}
              onChange={(value:string) => setNewInvitation(prev => ({ ...prev, email: value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <Dropdown
              value={newInvitation.role}
              onValueChange={(value) => setNewInvitation(prev => ({ ...prev, role: value }))}
              placeholder="Select role"
            >
              {roles.map((role) => (
                <DropdownOption key={role.value} value={role.value}>
                  {role.label}
                </DropdownOption>
              ))}
            </Dropdown>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <Dropdown
              value={newInvitation.department?.toString() || ''}
              onValueChange={(value) => setNewInvitation(prev => ({ 
                ...prev, 
                department: value ? parseInt(value) : undefined 
              }))}
              placeholder="Select department"
            >
              <DropdownOption value="">No Department</DropdownOption>
              {createdDepartments.map((dept, index) => (
                <DropdownOption key={dept.id || `dept-${index}`} value={(dept.id || '').toString()}>
                  {dept.name}
                </DropdownOption>
              ))}
            </Dropdown>
          </div>
        </div>
        <BTButton
          onClick={addInvitation}
          disabled={!newInvitation.email.trim() || !newInvitation.first_name.trim() || !newInvitation.last_name.trim()}
          className="mt-4"
          type="outline_blue"
          text='Add Invitation'
        />
      </div>

      {/* Existing Invitations */}
      {data.invitations.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Pending Invitations</h3>
          <div className="space-y-3">
            {data.invitations.map((invitation, index) => (
              <div
                key={`invitation-${index}-${invitation.email}`}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {invitation.first_name} {invitation.last_name}
                    </h4>
                    <p className="text-sm text-gray-600">{invitation.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {roles.find(r => r.value === invitation.role)?.label}
                      </span>
                      {invitation.department && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {createdDepartments.find(d => d.id === invitation.department)?.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeInvitation(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      {/* <div className="flex justify-end pt-6">
        <Button
          onClick={handleComplete}
          disabled={loading || data.invitations.length === 0}
        >
          {loading ? 'Sending Invitations...' : 'Send Invitations'}
        </Button>
      </div> */}
    </div>
  );
} 