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

const roles = [
  { id: 'admin', name: 'Admin' },
  { id: 'owner', name: 'Owner' },
];

export default function AdminUserSetup({ data, onUpdate, onComplete }: Props) {
  const [form, setForm] = useState({
    admin_email: data.admin_email || '',
    admin_password: data.admin_password || '',
    admin_first_name: data.admin_first_name || '',
    admin_last_name: data.admin_last_name || '',
    admin_role: data.admin_role || 'admin',
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
    onUpdate({ [name]: value });
  };

  const handleRoleChange = (value: string) => {
    setForm({ ...form, admin_role: value });
    onUpdate({ admin_role: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
        <Input
          className=""
          type="email"
          placeholder="Enter admin email"
          value={form.admin_email}
          onChange={(value: string) => handleChange('admin_email', value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <Input
        className=""
          type="password"
          placeholder="Enter password"
          value={form.admin_password}
          onChange={(value: string) => handleChange('admin_password', value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <Input
          className=""
            type="text"
            placeholder="Enter first name"
            value={form.admin_first_name}
            onChange={(value: string) => handleChange('admin_first_name', value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <Input
          className=""
            type="text"
            placeholder="Enter last name"
            value={form.admin_last_name}
            onChange={(value: string) => handleChange('admin_last_name', value)}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <Dropdown
          value={form.admin_role}
          onValueChange={handleRoleChange}
          placeholder="Select Role"
          className="w-full"
        >
          {roles.map((role) => (
            <DropdownOption key={role.id} value={role.id}>{role.name}</DropdownOption>
          ))}
        </Dropdown>
      </div>
      {/* <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          Complete Setup
        </Button>
      </div> */}
    </form>
  );
} 