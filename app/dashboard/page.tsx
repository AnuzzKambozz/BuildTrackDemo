"use client";

import React, { useEffect } from 'react';
// import ProjectPage from "../components/projects";
import { useHeaderConfig } from '@/app/context/HeaderContext';
import { TrendingUp, Clock, Zap } from 'lucide-react';
import ProjectDashboard from './components/project_dashboard';
import { ProjectDashboardProps } from './types/dashborad';


export default function Page() {

    const updateHeader = useHeaderConfig();
    
        useEffect(() => {
            // Update header config for this specific page
            updateHeader({
              title: "Dashboard",
              showSearch: true,
              searchPlaceholder: "Search ...",
              breadcrumbs: [
                { label: "", href: "" },
              ],
              notificationCount: 5
            });
            

          }, [updateHeader]);

        useEffect(() => {
        
        requestToGetMasterData()
   
   
          // Whenever the notes prop changes, update the local state
       },[] );


      const requestToGetMasterData = async () => {
         // Simulate API request for OTP
   
         const response = await fetch('/api/enums/main-master', {
           method: "GET",
         });
   
         const result = await response.json();
   
         if (result.success) {
           // setUserMessage1(data.message);
           // setshowInvalidAlert(true);
           localStorage.setItem("masterData", JSON.stringify(result.data));
         } 
         // Assuming the OTP request is successful:
          // Go to the next step (OTP input)
       };



          const sampleData: ProjectDashboardProps = {
            projectName: "Spethman Renovation",
            projectAddress: "17357 Benton Boulevard, Elkhorn NE 673648",
            completionPercentage: 45,
            status: "In Progress",
            tasks: [
              {
                id: "1",
                title: "Invoice #1028 Over Due",
                description: "Due 5 days ago • $4,320.00",
                type: "overdue",
                actionLabel: "Resolve"
              },
              {
                id: "2",
                title: "4 Subcontractors Certificates Expiring",
                description: "Insurance Certificates Expires in 7 days",
                type: "warning",
                actionLabel: "Review"
              },
              {
                id: "3",
                title: "Invoice #1028 Over Due",
                description: "Added Feb 18 • $1,250.00",
                type: "pending",
                actionLabel: "Approve"
              }
            ],
            schedule: [
              {
                date: 19,
                day: "Monday",
                month: "Feb",
                year: 2025,
                activities: [
                  { title: "Framing", time: "7:30 AM", type: "framing" }
                ]
              },
              {
                date: 20,
                day: "Tuesday",
                month: "Feb",
                year: 2025,
                activities: [
                  { title: "Framing", time: "7:30 AM", type: "framing" }
                ]
              },
              {
                date: 21,
                day: "Wednesday",
                month: "Feb",
                year: 2025,
                activities: [
                  { title: "Framing", time: "7:30 AM", type: "framing" }
                ]
              },
              {
                date: 22,
                day: "Thursday",
                month: "Feb",
                year: 2025,
                activities: [
                  { title: "Rough Electrical", time: "9:30 AM", type: "electrical" }
                ]
              },
              {
                date: 23,
                day: "Friday",
                month: "Feb",
                year: 2025,
                activities: [
                  { title: "Install Insulation", time: "All Day", type: "insulation" }
                ]
              }
            ],
            teamMembers: [
              {
                id: "1",
                name: "Clarke Smith",
                role: "Client",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b407?w=40&h=40&fit=crop&crop=face"
              },
              {
                id: "2",
                name: "Steven Robert",
                role: "Project Manager",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              },
              {
                id: "3",
                name: "Daniel James",
                role: "Site Supervisor",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
              }
            ],
            insights: [
              {
                type: "cost",
                title: "Cost Variance",
                value: "+4.3% Above Budget",
                description: "Primarily in electrical materials",
                icon: <TrendingUp size={16} className="text-blue-600" />
              },
              {
                type: "schedule",
                title: "Schedule Risk",
                value: "Medium Risk",
                description: "Potential 3-day delay in plumbing",
                icon: <Clock size={16} className="text-yellow-600" />
              },
              {
                type: "recommendation",
                title: "AI Recommendation",
                value: "",
                description: "Consider expediting plumbing materials order and review electrical material usage across project",
                icon: <Zap size={16} className="text-white" />
              }
            ]
          };
        
          // return <ProjectDashboard {...sampleData} />;


         

return (
<div className="flex w-full h-full bg-[#f6f6f6]">
<ProjectDashboard {...sampleData} />
</div>
);

}