"use client";
import React, { useState } from 'react';
import {   MoreVertical } from 'lucide-react';
import {  ProjectDashboardProps } from '../types/dashborad';
import { inter } from '@/app/fonts';
import { BTButton } from '@/app/components/buttons/BTButton';

import SettingsIcon from "@/app/public/settings_icon.svg"
import DocumentsIcon from "@/app/public/documents_icon.svg"
import AddCircleIcon from '@/app/public/add_circle.svg'; // Assuming you have an SVG icon for Plus
import AddBlueCircleIcon from '@/app/public/add_circle_blue_icon.svg'; // Assuming you have an SVG icon for Plus
import Avatar from '@/app/components/Avatar/Avatar';
import { useRouter } from "next/navigation";
import AddTaskModal from '../tasks/components/addtaskmodel';
import { sampleAssignees, sampleMilestones, sampleProjects } from '../tasks/utils/sampale_data';
import EmployeeModal from '@/app/components/resource_management/add_member_modal';



  
  const ProjectDashboard: React.FC<ProjectDashboardProps> = ({
    projectName,
    projectAddress,
    completionPercentage,
    status,
    tasks,
    schedule,
    teamMembers,
    insights
  }) => {

      const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    
    const getTaskBorderColor = (type: string) => {
      switch (type) {
        case 'overdue': return 'border-l-red-400';
        case 'warning': return 'border-l-yellow-400';
        case 'pending': return 'border-l-purple-400';
        default: return 'border-l-gray-400';
      }
    };

    const getTaskBackgroundColor = (type: string) => {
        switch (type) {
          case 'overdue': return 'bg-red-50';
          case 'warning': return 'bg-yellow-50';
          case 'pending': return 'bg-purple-50';
          default: return 'bg-gray-50';
        }
      };

    const mapBorderToBg = (borderClass: string): string => {
        return borderClass
          .replace('border-', 'bg-')     // border-red-500 → bg-red-500
          .replace(/-\d+$/, '-50');      // bg-red-500 → bg-red-50
      };
  
    const getActionButtonColor = (type: string) => {
      switch (type) {
        case 'overdue': return 'border-red-400 text-red-600 hover:bg-red-50';
        case 'warning': return 'border-yellow-400 text-yellow-600 hover:bg-yellow-50';
        case 'pending': return 'border-purple-400 text-purple-600 hover:bg-purple-50';
        default: return 'border-gray-400 text-gray-600 hover:bg-gray-50';
      }
    };
  
    const getScheduleColor = (type: string) => {
      switch (type) {
        case 'framing': return 'border-r-green-400';
        case 'electrical': return 'border-r-blue-400';
        case 'insulation': return 'border-r-orange-400';
        default: return 'border-r-gray-400';
      }
    };
    const [addTaskModalOpen, setAddTaskModalOpen] = useState<boolean>(false);

    
    const router = useRouter();  
    return (
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className={`${inter.className} antialiased text-[24px] font-semibold text-[#171E34]`}>{projectName}</h1>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                  {status}
                </span>
              </div>
              <p className={`${inter.className} antialiased text-[14px] font-medium text-[#525252]`}>{projectAddress}</p>
            </div>
            <div className="flex gap-3 flex-wrap">
                <BTButton text="Document" icon={DocumentsIcon} type='outline_gray' onClick={()=>{
                   router.push(`/dashboard/documents`);
                }}/>
                <BTButton text="Settings" icon={SettingsIcon} type='outline_gray' onClick={()=>{
                    router.push(`/dashboard/settings`);
                }}/>
                <BTButton text='Add Task' icon={AddCircleIcon} loading={false} size='medium' onClick={() => {
                  // Perform login logic here 
                  console.log("Add Tasks clicked");
                  setAddTaskModalOpen(true);

                }  

                }/>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
          <p className={`${inter.className} antialiased text-center text-[#525252] font-medium text-[14px]`}>{completionPercentage}% Completed</p>
        </div>
  
        <div className="grid grid-cols-2 lg:flex-row gap-6 pb-6">
          {/* Left Column */}
          <div className="w-full  space-y-6">
            {/* Tasks Needing Attention */}
            <div className="bg-white rounded-lg shadow-sm p-6  ">
              <h2 className={`${inter.className} antialiased text-[#171E34] font-semibold text-[18px] mb-4`}>Task Needing Attention</h2>
              <div className='border-b-[1px] border-[#EEEEEE] mb-4' />
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div 
                    key={task.id}
                    className={`border-l-4 rounded-lg ${getTaskBorderColor(task.type)} ${getTaskBackgroundColor(task.type)}  p-4 rounded-r-lg`}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div className="flex-1">
                        <h3 className={`${inter.className} antialiased font-semibold text-[#272727] text-[16px] mb-1`}>{task.title}</h3>
                        <p className={`${inter.className} antialiased font-normal text-[#313030] text-[14px]`}>{task.description}</p>
                      </div>
                      <button 
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${getActionButtonColor(task.type)} ${mapBorderToBg(getActionButtonColor(task.type))} self-start`}
                      >
                        {task.actionLabel}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex flex-row items-center justify-center pt-4'>
              <button className={`${inter.className} antialiased text-blue-600 text-[13px] font-medium hover:underline`} onClick={()=>{
                router.push(`/dashboard/tasks`);}}>
                View All
              </button>
              </div>
              
            </div>
  
            {/* This Week's Schedule */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`${inter.className} antialiased text-[18px] font-semibold text-[#171E34]`}>This Week&rsquo;s Schedule</h2>
                <button className={`${inter.className} antialiased text-blue-600 text-[13px] font-medium hover:underline`} onClick={()=>{
                  router.push(`/dashboard/schedule`);}}>
                  View Calendar
                </button>
              </div>
              <div className='border-b-[1px] border-[#EEEEEE] mb-4' />
              <div className="space-y-4">
                {schedule.map((day, index) => (
                    <div key={index} className='flex flex-col' >
                        <div key={index} className="flex flex-row  justify-between">
                    <div className="flex flex-row justify-start items-start  min-w-[60px] gap-3">
                      <div className="text-[18px] font-semibold text-[#000000] w-[50px] h-[42px] text-center flex items-center justify-center rounded-md bg-[#EEF2FE]">{day.date}</div>
                      <div className="flex flex-col justify-start items-start   gap-0">
                        <div className={`${inter.className} antialiased text-[14px] text-[#272727] font-semibold`}>{day.day}</div>
                        <div className={`${inter.className} antialiased text-[14px] text-[#313030] font-normal`}>{day.month} {day.year}</div>
                      </div>
                    </div>
                    <div className='mx-auto' />
                    <div className="flex flex-row justify-start">
                      {day.activities.map((activity, actIndex) => (
                        <div 
                          key={actIndex}
                          className={`border-r-4 ${getScheduleColor(activity.type)} pr-4 py-2`}
                        >
                          <div className="flex flex-col justify-start items-start">
                            <span className="font-medium text-gray-900">{activity.title}</span>
                            <span className="text-gray-600 text-sm">{activity.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                 <div className='border-b-[1px] border-[#EEEEEE] mb-4' />


                    </div>
                  
                  
                ))}
              </div>
            </div>
          </div>
  
          {/* Right Column */}
          <div className="w-full space-y-6">
            {/* All Insights */}
            <div className="bg-white rounded-lg shadow-sm p-6 h-[418px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`${inter.className} antialiased text-[#171E34] font-semibold text-[18px]`}>All Insights</h2>
                <button className={`${inter.className} antialiased text-blue-600 text-[13px] font-medium hover:underline`}>
                  View Analytics
                </button>
              </div>
              <div className='border-b-[1px] border-[#EEEEEE] mb-4' />
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className={` rounded-lg ${insight.type === 'recommendation' ? 'bg-blue-600 text-white p-2' : 'bg-white text-[#272727]'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${insight.type === 'recommendation' ? 'bg-blue-500' : 'bg-white'}`}>
                        {insight.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`${inter.className} antialiased text-[14px] font-medium ${insight.type !== 'recommendation' ? 'text-[#375DED]' : "text-white"}`}>{insight.title}</span>
                        </div>
                        {insight.value && (
                          <div className={`${inter.className} antialiased text-[16px] font-bold `}>{insight.value}</div>
                        )}
                        <p className={`${inter.className} antialiased text-[14px] font-normal `}>{insight.description}</p>
                      </div>
                    </div>
                    {(insight.type !== 'recommendation') && <div className='border-b-[1px] border-[#EEEEEE] mt-4 mb-4' />}
                    

                  </div>
                ))}
              </div>
            </div>
  
            {/* Project Team */}
            <div className="bg-white rounded-lg shadow-sm p-6 h-[558px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`${inter.className} antialiased text-[#171E34] font-semibold text-[18px] mb-4`}>Project Team</h2>
                <button className={`${inter.className} antialiased text-blue-600 text-[13px] font-medium hover:underline`} onClick={()=>{
                  router.push(`/dashboard/resources_management`);
                }}>
                  Manage Team
                </button>
              </div>
              <div className='border-b-[1px] border-[#EEEEEE] mb-4' />
              <div className="space-y-4">
                {teamMembers.map((member) => (

                    <div key={member.name} className='flex flex-col '>
                    <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar src={""} alt={member.name} size='sm' />

                      {/* <img 
                        src={"member.avatar"} 
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover bg-gray-200"
                      /> */}
                      <div>
                        <div className={`${inter.className} antialiased font-bold text-[#272727] text-[16px]`}>{member.name}</div>
                        <div className={`${inter.className} antialiased font-normal text-[#313030] text-[14px]`}>{member.role}</div>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </div>
                  <div className='border-b-[1px] border-[#EEEEEE] mt-4 mb-4' />

                    </div>
                ))}
              </div>
              <div className='flex flex-col items-center justify-end my-auto mt-5'>
              <BTButton  text="Add New Member" icon= {AddBlueCircleIcon} type="outline_blue" onClick={() => setShowAddMemberModal(true)}/>
              </div>


            </div>
          </div>
        </div>

        <AddTaskModal
          isOpen={addTaskModalOpen}
          onClose={() => setAddTaskModalOpen(false)}
          projects={sampleProjects}
          milestones={sampleMilestones}
          assignees={sampleAssignees}
          onSubmit={()=> {}}
          columnId={null}
        />

         {/* Employee Modal */}
        <EmployeeModal
          isOpen={showAddMemberModal}
          onClose={() => setShowAddMemberModal(false)}
          onSubmit={() => {
            // Handle new employee addition logic here
            setShowAddMemberModal(false);
          }}
        />
      </div>
    );
  };
export default ProjectDashboard;  