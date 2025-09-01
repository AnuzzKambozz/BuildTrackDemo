import React from 'react';
import { ComponentProps } from '@/app/types/project.type';
import InputField from '@/app/components/textField';
import Dropdown from '@/app/components/dropdowns/dropdown_new';

const FinancialInformation: React.FC<ComponentProps> = ({ data, updateData }) => {
  // var projectTypes = ['New Construction', 'Renovation', 'Addition'];
  const budgetTemplates = ['Standard Residential', 'Commercial'];
  const projectTemplates = ['New Home Construction', 'Renovation', 'Addition'];
  const costCodeStructures = ['Standard Codes', 'Custom Codes', 'CSI Codes'];
  const paymentTermsOptions = ['Net 30', 'Net 15', 'Net 60', 'Due on Receipt'];
  const handleInputChange = (field: keyof typeof data, value: string): void => {
    updateData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-[18px] font-semibold text-primaryColor mb-4">Financial Information</h2>
      
      {/* Project Budget and Budget Template */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Budget*
          </label>
          <input
            type="text"
            value={data.projectBudget}
            onChange={(e) => handleInputChange('projectBudget', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="$ 0.00"
          /> */}

                  <InputField
                      name="projectBudget"
                      label="Project Budget"
                      placeholder="Enter project budget"
                      onChange={(e) => handleInputChange('projectBudget', e.target.value)}
                      value={data.projectBudget}
                      type="number"
                      className="h-[48px] rounded-md"
                      mandatory={true}
                    />
        </div>
        
        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget Template*
          </label>
          <select
            value={data.budgetTemplate}
            onChange={(e) => handleInputChange('budgetTemplate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Standard Residential">Standard Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Custom">Custom</option>
          </select> */}

          <Dropdown
                name="budgetTemplate"
                value={data.budgetTemplate}
                options={budgetTemplates}
                onChange={(value: string | number) => handleInputChange('budgetTemplate', String(value))}
                label="Budget Template"
                placeholder="Select Budget Template"
                mandatory={true}
                searchable={false}
                showAddButton={false}
                // addButtonText='+ Add Budget Template'
                // onAddItem={() => {
                //   console.log('Add Client clicked');
                // }}
                // searchPlaceholder="Search client..."
              />
        </div>
      </div>

      {/* Project Template and Cost Code Structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Template*
          </label>
          <select
            value={data.projectTemplate}
            onChange={(e) => handleInputChange('projectTemplate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="New Home Construction">New Home Construction</option>
            <option value="Renovation">Renovation</option>
            <option value="Addition">Addition</option>
          </select> */}


            <Dropdown
                name="projectTemplate"
                value={data.projectTemplate}
                options={projectTemplates}
                onChange={(value: string | number) => handleInputChange('projectTemplate', String(value))}
                label="Project Template"
                placeholder="Select Project Template"
                mandatory={true}
                searchable={false}
                showAddButton={false}
                // addButtonText='+ Add Budget Template'
                // onAddItem={() => {
                //   console.log('Add Client clicked');
                // }}
                // searchPlaceholder="Search client..."
              />
        </div>
        
        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            Cost Code Structure*
          </label>
          <select
            value={data.costCodeStructure}
            onChange={(e) => handleInputChange('costCodeStructure', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Standard Codes">Standard Codes</option>
            <option value="Custom Codes">Custom Codes</option>
            <option value="CSI Codes">CSI Codes</option>
          </select> */}
          <Dropdown
                name="costCodeStructure"
                value={data.costCodeStructure}
                options={costCodeStructures}
                onChange={(value: string | number) => handleInputChange('costCodeStructure', String(value))}
                label="Cost Code Structure"
                placeholder="Select Cost Code Structure"
                mandatory={true}
                searchable={false}
                showAddButton={false}
                // addButtonText='+ Add Budget Template'
                // onAddItem={() => {
                //   console.log('Add Client clicked');
                // }}
                // searchPlaceholder="Search client..."
              />
        </div>
      </div>

      {/* Payment Terms */}
      <div>
        {/* <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Terms*
        </label>
        <select
          value={data.paymentTerms}
          onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Net 30">Net 30</option>
          <option value="Net 15">Net 15</option>
          <option value="Net 60">Net 60</option>
          <option value="Due on Receipt">Due on Receipt</option>
        </select> */}
         <Dropdown
                name="paymentTerms"
                value={data.paymentTerms}
                options={paymentTermsOptions}
                onChange={(value: string | number) => handleInputChange('paymentTerms', String(value))}
                label="Payment Terms"
                placeholder="Select Payment Terms"
                mandatory={true}
                searchable={false}
                showAddButton={false}
                // addButtonText='+ Add Budget Template'
                // onAddItem={() => {
                //   console.log('Add Client clicked');
                // }}
                // searchPlaceholder="Search client..."
              />
      </div>
    </div>
  );
};

export default FinancialInformation;