import React, { useState } from 'react';
// import { Button } from '@/app/ui/button';
// import { Input } from '@/app/components/ui/input';
// import { Textarea } from '@/app/components/ui/textarea';
// import { Dropdown, DropdownOption } from '@/app/components/ui/dropdown';
import type { TenantData } from '../TenantOnboardingWizard';
import InputField from '@/app/components/textField';
import TextAreaField from '@/app/components/textAreaField';
import Dropdown from '@/app/components/dropdowns/dropdown_new';

interface Props {
  data: TenantData;
  onUpdate: (data: Partial<TenantData>) => void;
  onComplete: (data: Partial<TenantData>) => void;
  loading: boolean;
}

const industries = ['Construction', 'Real Estate', 'Engineering', 'Other'];
const sizes = ['1-10', '11-50', '51-200', '201-1000', '1000+'];

export default function CompanyBasicInfo({ data, onUpdate, onComplete }: Props) {
  const [form, setForm] = useState({
    name: data.name || '',
    industry: data.industry || '',
    size: data.size || '',
    website: data.website || '',
    phone: data.phone || '',
    address: data.address || '',
    city: data.city || '',
    state: data.state || '',
    zip: data.zip || '',
    description: data.description || '',
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
    onUpdate({ [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
    onUpdate({ [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <InputField
                      name=""
                      label="Company Name"
                      placeholder="Enter Company Name"
                      onChange={(e) => handleChange('name', e.target.value)}
                      value={form.name}
                      type="text"
                      className="h-[48px] rounded-md"
                      mandatory={true}
                    />
      </div>
      <div>
        {/* <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label> */}
        {/* <Dropdown
          value={form.industry}
          onValueChange={(value) => handleSelectChange('industry', value)}
          placeholder="Select Industry"
          className="w-full"
        >
          <DropdownOption value="">Select Industry</DropdownOption>
          {industries.map((ind) => (
            <DropdownOption key={ind} value={ind}>{ind}</DropdownOption>
          ))}
        </Dropdown> */}


            <Dropdown
                name="industry"
                value={form.industry}
                options={industries}
                onChange={(value: string | number) => handleSelectChange('industry', String(value))}
                label="Industry"
                placeholder="Select Industry"
                mandatory={true}
                searchable={false}
                showAddButton={false}
                searchPlaceholder="Search industry..."
              />




      </div>
      <div>
        {/* <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
        <Dropdown
          value={form.size}
          onValueChange={(value) => handleSelectChange('size', value)}
          placeholder="Select Size"
          className="w-full"
        >
          <DropdownOption value="">Select Size</DropdownOption>
          {sizes.map((sz) => (
            <DropdownOption key={sz} value={sz}>{sz}</DropdownOption>
          ))}
        </Dropdown> */}

                    <Dropdown
                name="size"
                value={form.size}
                options={sizes}
                onChange={(value: string | number) => handleSelectChange('size', String(value))}
                label="Company Size"
                placeholder="Select Size"
                mandatory={true}
                searchable={false}
                showAddButton={false}
                searchPlaceholder="Search industry..."
              />
      </div>
      <div>
        {/* <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
        <Input
        className=""
          type="text"
          placeholder="https://example.com"
          value={form.website}
          onChange={(value: string) => handleChange('website', value)}  
        /> */}
        <InputField
                      name=""
                      label="Website"
                      placeholder="https://example.com"
                      onChange={(e) => handleChange('website', e.target.value)}
                      value={form.website}
                      type="text"
                      className="h-[48px] rounded-md"
                      mandatory={false}
                    />
      </div>
      <div>
        <InputField
                      name=""
                      label="Phone"
                      placeholder="Enter phone number"
                      onChange={(e) => handleChange('phone', e.target.value)}
                      value={form.phone}
                      type="text"
                      className="h-[48px] rounded-md"
                      mandatory={true}
                    />
      </div>
      <div>
        <InputField
                      name=""
                      label="Address Line 1"
                      placeholder="Enter company address line 1"
                      onChange={(e) => handleChange('address', e.target.value)}
                      value={form.address}
                      type="text"
                      className="h-[48px] rounded-md"
                      mandatory={true}
                    />



                  

      </div>
                    <div className='flex flex-row gap-4'>         
                       <InputField
                      name=""
                      label="City"
                      placeholder="Enter city name"
                      onChange={(e) => handleChange('city', e.target.value)}
                      value={form.city}
                      type="text"
                      className="h-[48px] rounded-md"
                      mandatory={true}
                    />

                            <InputField
                      name=""
                      label="State"
                      placeholder="Enter state name"
                      onChange={(e) => handleChange('state', e.target.value)}
                      value={form.state}
                      type="text"
                      className="h-[48px] rounded-md"
                      mandatory={true}
                    />

                            <InputField
                      name=""
                      label="Zip"
                      placeholder="Enter zip code"
                      onChange={(e) => handleChange('zip', e.target.value)}
                      value={form.zip}
                      type="text"
                      className="h-[48px] rounded-md"
                      mandatory={true}
                    /></div>
      <div>
        <TextAreaField
                          label="Description"
                          name=""
                          value={form.description}
                          placeholder="Enter company description"
                          rows={4}
                          onChange={(e) => handleChange('description', e.target.value)}
                          mandatory={false}
                          className='w-full px-3 py-2'
          />
      </div>
      {/* <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          Next
        </Button>
      </div> */}
    </form>
  );
} 