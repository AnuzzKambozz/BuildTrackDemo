'use client';

import React, { useState } from 'react';
// import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Checkbox } from '@/app/components/ui/checkbox';
// import { Plus, Trash2 } from 'lucide-react';
import { TeamOnboardingData } from '../TeamOnboardingWizard';
import { BTButton } from '../../buttons/BTButton';

interface OnboardingConfigStepProps {
  data: TeamOnboardingData;
  onUpdate: (updates: Partial<TeamOnboardingData>) => void;
  onComplete: (stepData: Partial<TeamOnboardingData>) => void;
  loading: boolean;
}

export default function OnboardingConfigStep({
  data,
  onUpdate,
  // onComplete,
  // loading,
}: OnboardingConfigStepProps) {
  const [newStep, setNewStep] = useState({
    title: '',
    description: '',
    required: false,
  });

  const addCustomStep = () => {
    if (newStep.title.trim()) {
      const updatedSteps = [...data.onboarding_config.custom_steps, { ...newStep }];
      onUpdate({
        onboarding_config: {
          ...data.onboarding_config,
          custom_steps: updatedSteps,
        },
      });
      setNewStep({ title: '', description: '', required: false });
    }
  };

  const removeCustomStep = (index: number) => {
    const updatedSteps = data.onboarding_config.custom_steps.filter((_, i) => i !== index);
    onUpdate({
      onboarding_config: {
        ...data.onboarding_config,
        custom_steps: updatedSteps,
      },
    });
  };

  const updateConfig = (updates: Partial<TeamOnboardingData['onboarding_config']>) => {
    onUpdate({
      onboarding_config: {
        ...data.onboarding_config,
        ...updates,
      },
    });
  };

  // const handleComplete = () => {
  //   onComplete({});
  // };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Onboarding Configuration
        </h2>
        <p className="text-gray-600">
          Configure the onboarding process for new team members. Set up welcome messages, duration, and custom steps.
        </p>
      </div>

      {/* Welcome Message */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Welcome Message</h3>
        <Textarea
        className=""
          placeholder="Welcome message for new team members..."
          value={data.onboarding_config.welcome_message}
          onChange={(value: string) => updateConfig({ welcome_message: value })}
          rows={4}
        />
      </div>

      {/* Duration and Settings */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Onboarding Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Duration (days)
            </label>
            <Input
            className=""
              type="number"
              value={data.onboarding_config.estimated_duration_days.toString()}
              onChange={(value: string) => updateConfig({ estimated_duration_days: parseInt(value) })}
            />
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
            className=""
              id="auto-assign-mentor"
              checked={data.onboarding_config.auto_assign_mentor}
              onCheckedChange={(checked: boolean) => updateConfig({ auto_assign_mentor: checked })}
            />
            <label htmlFor="auto-assign-mentor" className="text-sm font-medium text-gray-700">
              Automatically assign a mentor to new team members
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
            className=""
              id="require-completion"
              checked={data.onboarding_config.require_completion}
              onCheckedChange={(checked: boolean) => updateConfig({ require_completion: checked as boolean })}
            />
            <label htmlFor="require-completion" className="text-sm font-medium text-gray-700">
              Require completion of onboarding before full access
            </label>
          </div>
        </div>
      </div>

      {/* Custom Steps */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Custom Onboarding Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Step Title *
            </label>
            <Input
            className=""
              type="text"
              placeholder="e.g., Company Overview"
              value={newStep.title}
              onChange={(value: string) => setNewStep(prev => ({ ...prev, title: value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Input
            className=""
              type="text"
              placeholder="Brief description of the step"
              value={newStep.description}
              onChange={(value: string) => setNewStep(prev => ({ ...prev, description: value }))}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <Checkbox
            className=""
              id="step-required"
              checked={newStep.required}
              onCheckedChange={(checked: boolean) => setNewStep(prev => ({ ...prev, required: checked as boolean }))}
            />
            <label htmlFor="step-required" className="text-sm font-medium text-gray-700">
              Required step
            </label>
          </div>
          <BTButton
            onClick={addCustomStep}
            disabled={!newStep.title.trim()}
            type="primary"
            text='Add Step'
          />
        </div>

        {/* Existing Steps */}
        {data.onboarding_config.custom_steps.length > 0 && (
          <div className="space-y-3">
            {data.onboarding_config.custom_steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{step.title}</h4>
                  {step.description && (
                    <p className="text-sm text-gray-600">{step.description}</p>
                  )}
                  <span className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                    step.required 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {step.required ? 'Required' : 'Optional'}
                  </span>
                </div>
                <BTButton
                  type="outline_blue"
                  onClick={() => removeCustomStep(index)}
                  className="text-red-600 hover:text-red-700"
                  text='Remove'
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      {/* <div className="flex justify-end pt-6">
        <Button
          onClick={handleComplete}
          disabled={loading}
        >
          {loading ? 'Saving Configuration...' : 'Save Configuration'}
        </Button>
      </div> */}
    </div>
  );
} 