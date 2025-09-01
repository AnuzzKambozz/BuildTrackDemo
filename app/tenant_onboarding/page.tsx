'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/app/contexts/AuthContext';
// import TeamOnboardingWizard from '@/app/components/onboarding/TeamOnboardingWizard';
import TenantOnboardingWizard from '@/app/components/onboarding/TenantOnboardingWizard';


export default function OnboardingPage() {
//   const { user, loading, isAuthenticated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !isAuthenticated) {
//       router.push('/');
//     }
//   }, [loading, isAuthenticated, router]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return null; // Will redirect to login
//   }

  return <TenantOnboardingWizard />;
} 