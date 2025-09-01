import React from 'react';
import { BTButton } from '../../buttons/BTButton';
// import { Button } from '@/app/c/ui/button';

export default function OnboardingComplete() {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold mb-2">Setup Complete!</h2>
      <p className="text-gray-600 mb-6">Your company and admin account have been created. You can now log in and start using BuildTrack.</p>
      <BTButton type="primary" onClick={() => window.location.href = '/dashboard'} text=' Go to Dashboard'/>
       
    </div>
  );
} 