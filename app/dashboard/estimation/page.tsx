"use client";
import React, { useEffect } from 'react';
import { useHeaderConfig } from '@/app/context/HeaderContext';
import EstimationDashboard from './components/EstimationDashboard';
export default function Page() {

    const updateHeader = useHeaderConfig();

    useEffect(() => {
        // Update header config for this specific page
        updateHeader({
          title: "Estimation",
          showSearch: false,
          searchPlaceholder: "Search projects...",
          breadcrumbs: [
            { label: "Dashboard", href: "/dashboard" },
            { label: "Estimation", href: "" }
          ],
          notificationCount: 5
        });
      }, [updateHeader]);

return (
<div className="flex w-full h-full bg-[#f6f6f6]">
    <EstimationDashboard/>
</div>
);

}