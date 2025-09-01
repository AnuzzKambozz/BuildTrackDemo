'use client';

import React, { useState } from 'react';
// import { Button } from '@/app/components/ui/button';
// import { apiClient } from '@/app/services/api';
import CompanyBasicInfo from './steps/CompanyBasicInfo';
// import CompanyDetails from './steps/CompanyDetails';
// import ComplianceInfo from './steps/ComplianceInfo';
import SubscriptionPlan from './steps/SubscriptionPlan';
// import AdminUserSetup from './steps/AdminUserSetup';
import OnboardingComplete from './steps/OnboardingComplete';
import { BTButton } from '../buttons/BTButton';
import { Check } from 'lucide-react';
import {inter} from '../../fonts';


// Define the program account type
export interface ProgramAccount {
  id: string;
  name: string;
  type: string;
  provider?: string;
  accountNumber?: string;
  isActive: boolean;
}

export interface TenantData {
  // Basic Info
  name: string;
  industry: string;
  size: string;
  website?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string; 
  description?: string;
  
  // Details
  country: string;
  currency: string;
  timezone: string;
  ein?: string;
  bn?: string;
  
  // Compliance
  osha_compliant: boolean;
  wsib_compliant: boolean;
  address_provider?: string;
  program_accounts: ProgramAccount[];
  
  // Subscription
  subscription_plan: string;
  
  // Admin User
  admin_email: string;
  admin_password: string;
  admin_first_name: string;
  admin_last_name: string;
  admin_role: string;
}

const steps = [
  { id: 'basic-info', title: 'Company Details', component: CompanyBasicInfo },
  // { id: 'details', title: 'Other Information', component: CompanyDetails },
  // { id: 'compliance', title: 'Compliance & Safety', component: ComplianceInfo },
  { id: 'subscription', title: 'Subscription Plan', component: SubscriptionPlan },
  // { id: 'admin', title: 'Admin User Setup', component: AdminUserSetup },
  { id: 'complete', title: 'Setup Complete', component: OnboardingComplete },
];

export default function TenantOnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [tenantData, setTenantData] = useState<TenantData>({
    name: '',
    industry: '',
    size: '',
    website: '',
    phone: '',
    address: '',
    description: '',
    country: 'US',
    currency: 'USD',
    timezone: 'America/New_York',
    ein: '',
    bn: '',
    osha_compliant: false,
    wsib_compliant: false,
    address_provider: '',
    program_accounts: [],
    subscription_plan: 'starter',
    admin_email: '',
    admin_password: '',
    admin_first_name: '',
    admin_last_name: '',
    admin_role: 'admin',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [tenantId, setTenantId] = useState<number | null>(null);

  const updateTenantData = (updates: Partial<TenantData>) => {
    setTenantData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // If we're on the last step, redirect to dashboard
      window.location.href = '/dashboard';
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepComplete = async (stepData: Partial<TenantData>) => {
    updateTenantData(stepData);
    
    // If this is the final step, create the tenant
    if (currentStep === steps.length - 2) { // Admin setup step
      await createTenant();
    } else {
      nextStep();
    }
  };

  const createTenant = async () => {
    setLoading(true);
    setError(null);
    
    // try {
    //   // Create tenant
    //   const tenantResponse = await apiClient.createTenant({
    //     name: tenantData.name,
    //     industry: tenantData.industry,
    //     size: tenantData.size,
    //     website: tenantData.website,
    //     phone: tenantData.phone,
    //     address: tenantData.address,
    //     description: tenantData.description,
    //     country: tenantData.country,
    //     currency: tenantData.currency,
    //     timezone: tenantData.timezone,
    //     ein: tenantData.ein,
    //     bn: tenantData.bn,
    //     osha_compliant: tenantData.osha_compliant,
    //     wsib_compliant: tenantData.wsib_compliant,
    //     address_provider: tenantData.address_provider,
    //     program_accounts: tenantData.program_accounts,
    //   });

    //   if (tenantResponse.status === 'success') {
    //     // Handle the response data safely
    //     const responseData = tenantResponse.data as unknown as { id?: number; message?: string };
        
    //     if (responseData.id) {
    //       setTenantId(responseData.id);
    //     } else {
    //       // If no ID in response, use a default or handle appropriately
    //       console.warn('No tenant ID in response, using default');
    //       setTenantId(1); // Default tenant ID for demo purposes
    //     }
        
    //     // Create admin user
    //     const adminResponse = await apiClient.signup({
    //       username: tenantData.admin_email,
    //       email: tenantData.admin_email,
    //       password1: tenantData.admin_password,
    //       password2: tenantData.admin_password,
    //       first_name: tenantData.admin_first_name,
    //       last_name: tenantData.admin_last_name,
    //       company_name: tenantData.name,
    //       role: tenantData.admin_role,
    //     });

    //     if (adminResponse.status === 'success') {
    //       // Handle admin response data safely
    //       const adminData = adminResponse.data as unknown as { user?: { id: number }; message?: string };
          
    //       // Complete onboarding
    //       const tenantId = (tenantResponse.data as unknown as { id?: number }).id || 1;
    //       const adminUserId = adminData.user?.id || 1;
          
    //       await apiClient.completeTenantOnboarding(tenantId, {
    //         subscription_plan: tenantData.subscription_plan,
    //         admin_user_id: adminUserId,
    //       });
          
    //       nextStep(); // Go to completion step
    //     }
    //   }
    // } catch (err: any) {
    //   setError(err.message || 'Failed to create tenant');
    // } finally {
    //   setLoading(false);
    // }
  };

  const CurrentStepComponent = steps[currentStep].component;
    const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`${inter.className} antialiased text-3xl font-bold text-gray-900 mb-2 `}>
            Welcome to BuildTrack
          </h1>
          <p className="text-lg text-gray-600">
            Let&apos;s get your company set up in just a few steps
          </p>
        </div>

        {/* Progress Bar */}
      <div className="relative mb-8">
        {/* Connection Lines */}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            
            return (
              <div key={step.id} className="flex flex-col items-center group cursor-pointer"
                   onClick={() => { 
                    // setCurrentStep(index);
                   } }>
                
                {/* Step Circle */}
                <div className={`
                  relative w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold
                  transition-all duration-300 ease-out transform group-hover:scale-110
                  ${status === 'completed' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25' 
                    : status === 'current'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 ring-4 ring-blue-100' 
                    : 'bg-white border-2 border-gray-300 text-gray-400 group-hover:border-gray-400'
                  }
                `}>
                  {status === 'completed' ? (
                    <Check className="w-6 h-6 animate-in zoom-in duration-200" />
                  ) : (
                    <span className="animate-in fade-in duration-200">{index + 1}</span>
                  )}
                  
                  {/* Pulse animation for current step */}
                  {status === 'current' && (
                    <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20" />
                  )}
                </div>

                {/* Step Content */}
                <div className="mt-3 text-center max-w-[120px]">
                  <h3 className={`
                    text-sm font-semibold transition-colors duration-200
                    ${status === 'completed' 
                      ? 'text-green-700' 
                      : status === 'current'
                      ? 'text-blue-700' 
                      : 'text-gray-500 group-hover:text-gray-700'
                    }
                  `}>
                    {step.title}
                  </h3>
                  <p className={`
                    text-xs mt-1 transition-colors duration-200
                    ${status === 'completed' 
                      ? 'text-green-600' 
                      : status === 'current'
                      ? 'text-blue-600' 
                      : 'text-gray-400'
                    }
                  `}>
                    {""}
                  </p>
                </div>

                {/* Step Indicator */}
                {status === 'current' && (
                  <div className="absolute -bottom-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <CurrentStepComponent
            data={tenantData}
            onUpdate={updateTenantData}
            onComplete={handleStepComplete}
            loading={loading}
          />

          {/* Navigation */}
          {currentStep < steps.length - 1 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <BTButton
                type="outline_blue"
                onClick={prevStep}
                disabled={currentStep === 0}
                text="Previous"
             />

              
              <BTButton
                onClick={nextStep}
                disabled={loading}
                loading={loading}
                type="primary"
                text={currentStep === steps.length - 2 ? 'Complete Setup' : 'Next'}
              />
                          
          </div>
          )}
        </div>
      </div>
    </div>
  );
}