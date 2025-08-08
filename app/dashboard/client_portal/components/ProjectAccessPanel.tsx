"use client";

// components/ProjectAccessPanel.tsx
import React from 'react';
import { Client, ProjectAccess } from '../types/client-portal';

interface ProjectAccessPanelProps {
  client: Client;
  projectAccess: ProjectAccess;
  onProjectAccessChange: (access: ProjectAccess) => void;
}

export const ProjectAccessPanel: React.FC<ProjectAccessPanelProps> = ({
  client,
  projectAccess,
  onProjectAccessChange
}) => {
  const handleToggle = (field: keyof ProjectAccess) => {
    if (typeof projectAccess[field] === 'boolean') {
      onProjectAccessChange({
        ...projectAccess,
        [field]: !projectAccess[field]
      });
    }
  };

  const handleDateChange = (date: string) => {
    onProjectAccessChange({
      ...projectAccess,
      accessExpires: date
    });
  };

  const handleNeverExpire = () => {
    onProjectAccessChange({
      ...projectAccess,
      accessExpires: null
    });
  };

  const ToggleSwitch: React.FC<{ 
    enabled: boolean; 
    onChange: () => void;
    disabled?: boolean;
  }> = ({ enabled, onChange, disabled = false }) => (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        disabled 
          ? 'bg-gray-200 cursor-not-allowed' 
          : enabled 
            ? 'bg-blue-600' 
            : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {client.name} - Project Access
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage access details for this client
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Name
          </label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600">
            {projectAccess.projectName}
          </div>
        </div>

        {/* Enable Project Portal */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Enable Project Portal
            </label>
          </div>
          <ToggleSwitch
            enabled={projectAccess.enableProjectPortal}
            onChange={() => handleToggle('enableProjectPortal')}
          />
        </div>

        {/* Access Expires */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Access Expires
          </label>
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <input
                type="date"
                value={projectAccess.accessExpires || ''}
                onChange={(e) => handleDateChange(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={!projectAccess.enableProjectPortal}
              />
            </div>
            <button
              onClick={handleNeverExpire}
              disabled={!projectAccess.enableProjectPortal}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                !projectAccess.enableProjectPortal
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Never
            </button>
          </div>
        </div>

        {/* Visibility Access */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">Visibility Access</h3>
          
          <div className="space-y-4 pl-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Timeline & Progress</label>
              <ToggleSwitch
                enabled={projectAccess.timelineProgress}
                onChange={() => handleToggle('timelineProgress')}
                disabled={!projectAccess.enableProjectPortal}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Project Photos</label>
              <ToggleSwitch
                enabled={projectAccess.projectPhotos}
                onChange={() => handleToggle('projectPhotos')}
                disabled={!projectAccess.enableProjectPortal}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Financial Information</label>
              <ToggleSwitch
                enabled={projectAccess.financialInformation}
                onChange={() => handleToggle('financialInformation')}
                disabled={!projectAccess.enableProjectPortal}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Documents & Files</label>
              <ToggleSwitch
                enabled={projectAccess.documentsFiles}
                onChange={() => handleToggle('documentsFiles')}
                disabled={!projectAccess.enableProjectPortal}
              />
            </div>
          </div>
        </div>

        {/* Disabled State Message */}
        {!projectAccess.enableProjectPortal && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-800">
                  Project Portal Disabled
                </h3>
                <div className="mt-2 text-sm text-gray-600">
                  <p>Enable the project portal to configure access permissions and expiration settings.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};