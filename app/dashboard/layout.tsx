// app/someFolder/layout.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/components/sidebar';
import { HeaderProvider } from '@/app/context/HeaderContext';
import { Header } from '@/app/components/Header/header';
import { isOnboardingDone } from '@/app/utility/common_utils'
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);

  const handleSearch = (query: string): void => {
    console.log('Search query:', query);
    // Handle search logic here
  };

  const handleNotification = (): void => {
    console.log('Notification clicked');
    // Handle notification click logic here
  };

  const handleUserMenu = (): void => {
    console.log('User menu clicked');
    // Handle user menu logic here
  };

  useEffect(() => {
    // Set client flag and check onboarding status
    setIsClient(true);
    const onboardingStatus = isOnboardingDone();
    setOnboardingComplete(onboardingStatus);
    
    console.log('Onboarding status:', onboardingStatus);

    if (onboardingStatus === false) {
      router.push(`/tenant_onboarding`);
    }
  }, [router]);

  // Show loading or empty state during hydration
  if (!isClient || onboardingComplete === null) {
    return <div></div>;
  }

  // Redirect case - show empty div while redirecting
  if (onboardingComplete === false) {
    return <div></div>;
  }

  return (
    <HeaderProvider
      defaultTitle=""
      defaultShowSearch={true}
      defaultSearchPlaceholder="Search project"
      defaultBreadcrumbs={[{ label: "", href: "/dashboard" }]}
      defaultUserName="Juleha"
      defaultUserEmail="julehahaha@gmail.com"
      defaultNotificationCount={3}
      onSearch={handleSearch}
      onNotificationClick={handleNotification}
      onUserMenuClick={handleUserMenu}
    >
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-[#f6f6f6]">
          {/* Header */}
          <Header />
          
          {/* Page Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </HeaderProvider>
  );
};

export default Layout;