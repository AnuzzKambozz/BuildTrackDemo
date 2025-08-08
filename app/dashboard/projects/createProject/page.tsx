"use client";
import React, { useEffect } from 'react';
import CreateProject from "@/app/components/project/ProjectForm";
import { useHeaderConfig } from '@/app/context/HeaderContext';
export default function Page() {

    const updateHeader = useHeaderConfig();

    useEffect(() => {
        // Update header config for this specific page
        updateHeader({
          title: "Create Project",
          showSearch: false,
          searchPlaceholder: "Search projects...",
          breadcrumbs: [
            // { label: "Dashboard", href: "/dashboard" },
            { label: "Projects", href: "/dashboard/projects" },
            { label: "Create Project", href: "" }
          ],
          notificationCount: 5
        });
      }, [updateHeader]);

return (
<div className="flex w-full h-full">
    <CreateProject/>
</div>
);

}