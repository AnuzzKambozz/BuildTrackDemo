"use client";
import React, { useEffect } from 'react';
import { useHeaderConfig } from '@/app/context/HeaderContext';
import Calendar from './components/calendar';
export default function Page() {

    const updateHeader = useHeaderConfig();

    useEffect(() => {
        // Update header config for this specific page
        updateHeader({
          title: "Schedule",
          showSearch: true,
          searchPlaceholder: "Search projects...",
          breadcrumbs: [
            { label: "Dashboard", href: "/dashboard" },
            { label: "Schedule", href: "" }
          ],
          notificationCount: 5
        });
      }, [updateHeader]);

return (
<div className="flex w-full h-full bg-[#f6f6f6]">
    <Calendar/>
</div>
);

}