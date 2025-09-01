'use client';

import React, { useState } from 'react';
// import { Button } from '@/app/ui/button';
import { Input } from '@/app/components/ui/input';
// import { Textarea } from '@/app/components/ui/textarea';
// import { Plus, Trash2 } from 'lucide-react';
import { TeamOnboardingData } from '../TeamOnboardingWizard';
import { BTButton } from '../../buttons/BTButton';

interface DepartmentSetupStepProps {
  data: TeamOnboardingData;
  onUpdate: (updates: Partial<TeamOnboardingData>) => void;
  onComplete: (stepData: Partial<TeamOnboardingData>) => void;
  loading: boolean;
}

export default function DepartmentSetupStep({
  data,
  onUpdate,
  // onComplete,
}: DepartmentSetupStepProps) {
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    description: '',
  });

  const addDepartment = () => {
    if (newDepartment.name.trim()) {
      const updatedDepartments = [
        ...data.departments,
        { ...newDepartment, manager_id: undefined }
      ];
      onUpdate({ departments: updatedDepartments });
      setNewDepartment({ name: '', description: '' });
    }
  };

  const removeDepartment = (index: number) => {
    const updatedDepartments = data.departments.filter((_, i) => i !== index);
    onUpdate({ departments: updatedDepartments });
  };

  // const handleComplete = () => {
  //   onComplete({});
  // };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Set Up Departments
        </h2>
        <p className="text-gray-600">
          Create departments to organize your team structure. You can add team members to these departments during the invitation process.
        </p>
      </div>

      {/* Add New Department */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add Department</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department Name *
            </label>
            <Input
            className=""
              type="text"
              placeholder="e.g., Engineering, Sales, Marketing"
              value={newDepartment.name}
              onChange={(value: string) => setNewDepartment(prev => ({ ...prev, name: value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Input
            className=""
              type="text"
              placeholder="Brief description of the department"
              value={newDepartment.description}
              onChange={(value: string) => setNewDepartment(prev => ({ ...prev, description: value }))}
            />
          </div>
        </div>
        <BTButton
          onClick={addDepartment}
          disabled={!newDepartment.name.trim()}
          className="mt-4"
          type="primary"
          text='Add Department'
        />

      {/* Existing Departments */}
      {data.departments.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Departments</h3>
          <div className="space-y-3">
            {data.departments.map((dept, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{dept.name}</h4>
                  {dept.description && (
                    <p className="text-sm text-gray-600">{dept.description}</p>
                  )}
                </div>
                <BTButton
                  type="outline_blue"
                  onClick={() => removeDepartment(index)}
                  className="text-red-600 hover:text-red-700"
                  text='Remove'
                />

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      {/* <div className="flex justify-end pt-6">
        <Button
          onClick={handleComplete}
          disabled={loading || data.departments.length === 0}
        >
          {loading ? 'Processing...' : 'Continue'}
        </Button>
      </div> */}
    </div>
    </div>
  );
}