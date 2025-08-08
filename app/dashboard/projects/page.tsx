"use client";
import React, { useEffect } from 'react';
import ProjectPage from "@/app/components/projects";
import { useHeaderConfig } from '@/app/context/HeaderContext';
export default function Page() {

    const updateHeader = useHeaderConfig();

    useEffect(() => {
        // Update header config for this specific page
        updateHeader({
          title: "Projects",
          showSearch: true,
          searchPlaceholder: "Search projects...",
          breadcrumbs: [
            { label: "Dashboard", href: "/dashboard" },
            { label: "Projects", href: "/dashboard/projects" }
          ],
          notificationCount: 5
        });
      }, [updateHeader]);

return (
<div className="flex w-full h-full bg-[#f6f6f6]">
    <ProjectPage/>
</div>
);

}