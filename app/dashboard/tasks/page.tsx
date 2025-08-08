"use client";
import React, { useEffect } from 'react';
import { useHeaderConfig } from '@/app/context/HeaderContext';
import KanbanBoard from './components/kanbanboard';
export default function Page() {

    const updateHeader = useHeaderConfig();

    useEffect(() => {
        // Update header config for this specific page
        updateHeader({
          title: "Task Management",
          showSearch: true,
          searchPlaceholder: "Search tasks...",
          breadcrumbs: [
            { label: "Dashboard", href: "/dashboard" },
            { label: "Task Management", href: "" }
          ],
          notificationCount: 5
        });
      }, [updateHeader]);

return (
<div className="flex w-full h-full bg-[#f6f6f6]">
<KanbanBoard 
  className="custom-kanban"
  initialTasks={[]}
  onTaskCreate={(task) => console.log('Created:', task)}
  onTaskUpdate={(task) => console.log('Updated:', task)}
  onTaskDelete={(id) => console.log('Deleted:', id)}
/>
</div>
);

}