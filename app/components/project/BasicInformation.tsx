import React from 'react';
import { ComponentProps } from '@/app/types/project.type';
import InputField from '@/app/components/textField';
import Dropdown from '@/app/components/dropdowns/dropdown_new';

const BasicInformation: React.FC<ComponentProps> = ({ data, updateData, onAddClient }) => {

const clients = ['Client 1', 'Client 2'];
const projectTypes = ['New Construction', 'Renovation', 'Addition'];
// var sizes = ['1-10', '11-50', '51-200', '201-1000', '1000+'];

  const handleSelectChange = (name: string, value: string): void => {
    updateData({ [name]: value });
  };  
  const handleInputChange = (field: keyof typeof data, value: string): void => {
    updateData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-[18px] font-semibold text-primaryColor mb-4">Basic Information</h2>
      
      {/* Project Name */}
      <div>

        <InputField
                      name=""
                      label="Project Name"
                      placeholder="Enter project name"
                      onChange={(e) => handleInputChange('projectName', e.target.value)}
                      value={data.projectName}
                      type="text"
                      className="h-[48px] rounded-md"
                      mandatory={true}
                    />
      </div>

      {/* Client and Project Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Dropdown
                name="client"
                value={data.client}
                options={clients}
                onChange={(value: string | number) => handleSelectChange('client', String(value))}
                label="Client"
                placeholder="Select Client"
                mandatory={true}
                searchable={true}
                showAddButton={true}
                addButtonText='+ Add Client'
                onAddItem={() => {
                  onAddClient?.();
                  console.log('Add Client clicked');
                }}
                searchPlaceholder="Search client..."
              />
        </div>
        
        <div>


          <Dropdown
                name="projectType"
                value={data.projectType}
                options={projectTypes}
                onChange={(value: string | number) => handleSelectChange('projectType', String(value))}
                label="Project Type"
                placeholder="Select Project Type"
                mandatory={true}
                searchable={false}
                showAddButton={false}
                // addButtonText='+ Add Client'
                // onAddItem={() => {
                //   console.log('Add Client clicked');
                // }}
                // searchPlaceholder="Search client..."
              />
        </div>
      </div>

      {/* Project Address */}
      <div>
        {/* <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Address*
        </label>
        <input
          type="text"
          value={data.projectAddress}
          onChange={(e) => handleInputChange('projectAddress', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter project address"
        /> */}

                <InputField
                      name="projectAddress"
                      label="Project Address"
                      placeholder="Enter project address"
                      onChange={(e) => handleInputChange('projectAddress', e.target.value)}
                      value={data.projectAddress}
                      type="text"
                      className="h-[48px] rounded-md"
                      mandatory={true}
                    />
      </div>

      {/* City, State, ZIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            City*
          </label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="City"
          /> */}

           <InputField
                      name="city"
                      label="City"
                      placeholder="City"
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      value={data.city}
                      type="text"
                      className="h-[48px] rounded-md"
                      mandatory={true}
                    />
        
        </div>

        
        
        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            State*
          </label>
          <input
            type="text"
            value={data.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="State"
          /> */}

           <InputField
                      name="state"
                      label="State"
                      placeholder="State"
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      value={data.state}
                      type="text"
                      className="h-[48px] rounded-md"
                      mandatory={true}
                    />
        
        </div>
        
        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            ZIP*
          </label>
          <input
            type="text"
            value={data.zip}
            onChange={(e) => handleInputChange('zip', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="ZIP"
          /> */}

                   <InputField
                      name="zip"
                      label="ZIP"
                      placeholder="ZIP"
                      onChange={(e) => handleInputChange('zip', e.target.value)}
                      value={data.zip}
                      type="text"
                      className="h-[48px] rounded-md"
                      mandatory={true}
                    />
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;