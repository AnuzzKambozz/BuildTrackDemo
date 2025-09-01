import React, { useState } from 'react';
// import { Button } from '@/app/ui/button';
import { Input } from '@/app/components/ui/input';
import { Dropdown, DropdownOption } from '@/app/components/ui/dropdown';
import type { TenantData } from '../TenantOnboardingWizard';

interface Props {
  data: TenantData;
  onUpdate: (data: Partial<TenantData>) => void;
  onComplete: (data: Partial<TenantData>) => void;
  loading: boolean;
}

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'IN', name: 'India' },
  // Add more as needed
];
const currencies = ['USD', 'CAD', 'INR'];
const timezones = ['America/New_York', 'America/Los_Angeles', 'Asia/Kolkata'];

export default function CompanyDetails({ data, onUpdate, onComplete }: Props) {
  const [form, setForm] = useState({
    country: data.country || 'US',
    currency: data.currency || 'USD',
    timezone: data.timezone || 'America/New_York',
    ein: data.ein || '',
    bn: data.bn || '',
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
        <Dropdown
          value={form.country}
          onValueChange={(value) => handleSelectChange('country', value)}
          placeholder="Select Country"
          className="w-full"
        >
          {countries.map((c) => (
            <DropdownOption key={c.code} value={c.code}>{c.name}</DropdownOption>
          ))}
        </Dropdown>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
        <Dropdown
          value={form.currency}
          onValueChange={(value) => handleSelectChange('currency', value)}
          placeholder="Select Currency"
          className="w-full"
        >
          {currencies.map((cur) => (
            <DropdownOption key={cur} value={cur}>{cur}</DropdownOption>
          ))}
        </Dropdown>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
        <Dropdown
          value={form.timezone}
          onValueChange={(value) => handleSelectChange('timezone', value)}
          placeholder="Select Timezone"
          className="w-full"
        >
          {timezones.map((tz) => (
            <DropdownOption key={tz} value={tz}>{tz}</DropdownOption>
          ))}
        </Dropdown>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">EIN (optional)</label>
        <Input
        className=""
          type="text"
          placeholder="Enter EIN"
          value={form.ein}
          onChange={(value: string) => handleChange('ein', value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">BN (optional)</label>
        <Input
        className=""
          type="text"
          placeholder="Enter BN"
          value={form.bn}
          onChange={(value: string) => handleChange('bn', value)}
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