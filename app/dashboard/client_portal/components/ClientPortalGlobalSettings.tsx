"use client";
// components/ClientPortalGlobalSettings.tsx
import React from 'react';
import { ClientPortalSettings } from '../types/client-portal';
type ProjectVisibility = "Limited Access" | "Full Access" | "No Access";


interface ClientPortalGlobalSettingsProps {
  settings: ClientPortalSettings;
  onSettingsChange: (settings: ClientPortalSettings) => void;
}

export const ClientPortalGlobalSettings: React.FC<ClientPortalGlobalSettingsProps> = ({
  settings,
  onSettingsChange
}) => {
  const handleToggle = () => {
    onSettingsChange({
      ...settings,
      enableClientPortal: !settings.enableClientPortal
    });
  };

  const handleVisibilityChange = (value: ProjectVisibility) => {
    onSettingsChange({
      ...settings,
      defaultProjectVisibility: value
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Client Portal Global Settings
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Configure default settings for all client access
      </p>

      <div className="space-y-6">
        {/* Enable Client Portal Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Enable Client Portal
            </label>
          </div>
          <button
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              settings.enableClientPortal ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                settings.enableClientPortal ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Default Project Visibility */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Project Visibility
          </label>
          <div className="relative">
            <select
              value={settings.defaultProjectVisibility}
              onChange={(e) => handleVisibilityChange(e.target.value as ProjectVisibility)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="Limited Access">Limited Access</option>
              <option value="Full Access">Full Access</option>
              <option value="No Access">No Access</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};