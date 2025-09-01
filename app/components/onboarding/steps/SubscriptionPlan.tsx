import React, { useState } from 'react';
// import { Button } from '@/app/ui/button';
import type { TenantData } from '../TenantOnboardingWizard';

interface Props {
  data: TenantData;
  onUpdate: (data: Partial<TenantData>) => void;
  onComplete: (data: Partial<TenantData>) => void;
  loading: boolean;
}

const plans = [
  { id: 'starter', name: 'Starter', description: 'Basic features for small teams', price: '$0/mo' },
  { id: 'pro', name: 'Pro', description: 'Advanced features for growing companies', price: '$49/mo' },
  { id: 'enterprise', name: 'Enterprise', description: 'Custom solutions for large organizations', price: 'Contact us' },
];

export default function SubscriptionPlan({ data, onUpdate, onComplete }: Props) {
  const [selected, setSelected] = useState(data.subscription_plan || 'starter');

  const handleSelect = (id: string) => {
    setSelected(id);
    onUpdate({ subscription_plan: id });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ subscription_plan: selected });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map(plan => (
          <div
            key={plan.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${selected === plan.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}
            onClick={() => handleSelect(plan.id)}
          >
            <div className="font-bold text-lg mb-2">{plan.name}</div>
            <div className="text-gray-600 mb-2">{plan.description}</div>
            <div className="text-blue-600 font-semibold">{plan.price}</div>
          </div>
        ))}
      </div>
      {/* <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          Next
        </Button>
      </div> */}
    </form>
  );
} 