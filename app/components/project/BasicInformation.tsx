import React from 'react';
import { ComponentProps } from '@/app/types/project.type';

const BasicInformation: React.FC<ComponentProps> = ({ data, updateData }) => {
  const handleInputChange = (field: keyof typeof data, value: string): void => {
    updateData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-[18px] font-semibold text-primaryColor mb-4">Basic Information</h2>
      
      {/* Project Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Name*
        </label>
        <input
          type="text"
          value={data.projectName}
          onChange={(e) => handleInputChange('projectName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter project name"
        />
      </div>

      {/* Client and Project Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Client*
          </label>
          <select
            value={data.client}
            onChange={(e) => handleInputChange('client', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Client</option>
            <option value="client1">Client 1</option>
            <option value="client2">Client 2</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Type*
          </label>
          <select
            value={data.projectType}
            onChange={(e) => handleInputChange('projectType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="New Construction">New Construction</option>
            <option value="Renovation">Renovation</option>
            <option value="Addition">Addition</option>
          </select>
        </div>
      </div>

      {/* Project Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Address*
        </label>
        <input
          type="text"
          value={data.projectAddress}
          onChange={(e) => handleInputChange('projectAddress', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter project address"
        />
      </div>

      {/* City, State, ZIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City*
          </label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="City"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State*
          </label>
          <input
            type="text"
            value={data.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="State"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ZIP*
          </label>
          <input
            type="text"
            value={data.zip}
            onChange={(e) => handleInputChange('zip', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="ZIP"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;