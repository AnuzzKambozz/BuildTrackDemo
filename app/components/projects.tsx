'use client';

// import useWindowSize from '@/app/hooks/useWindowSize';                 
import { useRouter } from "next/navigation";


import React from 'react';
import {
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { BTButton } from './buttons/BTButton';
import AddCircleIcon from '@/app/public/add_circle.svg'; // Assuming you have an SVG icon for Plus
import Image from 'next/image';
import { inter } from '@/app/fonts';

import TotalProjectsIcon from '@/app/public/total_projects_icon.svg';
import InProgressProjectsIcon from '@/app/public/in_progress_projects_icon.svg';
import OnScheduleProjectsIcon from '@/app/public/on_schedule_projects_icon.svg';
import NeedsAttentionProjectsIcon from '@/app/public/needs_attention_icon.svg';


interface ProjectData {
  name: string;
  subtext?: string;
  client: string;
  status: 'In Progress' | 'Planning' | 'Completed';
  dueDate: string;
  progress: number;
  health: 'Good' | 'At Risk';
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let bgColor = 'bg-[#DFE5FF] text-[#375DED]';
  
  if (status === 'Planning') {
    bgColor = 'bg-[#FFE4D1] text-[#722A31]';
  } else if (status === 'Completed') {
    bgColor = 'bg-green-100 text-green-700';
  }
  
  return (
    <span className={`px-[12px] py-2 rounded-md text-[11px] font-medium ${inter.className} antialiased ${bgColor}`}>
      {status}
    </span>
  );
};

const HealthBadge: React.FC<{ health: string }> = ({ health }) => {
  const bgColor = health === 'Good' 
    ? 'bg-[#DBFFCE] text-[#4CAB02]' 
    : 'bg-[#FFD2D2] text-[#FC3A3A]';
  
  return (
    <span className={`px-[12px] py-2 rounded-md text-[11px] font-medium ${inter.className} antialiased ${bgColor}`}>
      {health}
    </span>
  );
};

const ProjectPage: React.FC = () => {
  const projectsData: ProjectData[] = [
    { 
      name: 'Spethman Renovation',
      subtext: 'Residential Renovation',
      client: 'Clarke Smith',
      status: 'In Progress',
      dueDate: 'Mar 28 2025',
      progress: 30,
      health: 'Good'
    },
    // { 
    //   name: 'Kitchen appliances',
    //   client: "Steven's Kitchen",
    //   status: 'In Progress',
    //   dueDate: 'Mar 28 2025',
    //   progress: 60,
    //   health: 'Good'
    // },
    { 
      name: 'Concrete delivery',
      client: 'Nerolac Custom Home',
      status: 'Planning',
      dueDate: 'Mar 28 2025',
      progress: 0,
      health: 'Good'
    },
    { 
      name: 'window installation labor',
      client: 'Bruke Roof Sliding',
      status: 'In Progress',
      dueDate: 'Mar 28 2025',
      progress: 78,
      health: 'At Risk'
    },
    { 
      name: 'Electrical supplies',
      client: 'Asian Zone Spec Home',
      status: 'In Progress',
      dueDate: 'Mar 28 2025',
      progress: 65,
      health: 'At Risk'
    },

    // { 
    //   name: 'Spethman Renovation',
    //   subtext: 'Residential Renovation',
    //   client: 'Clarke Smith',
    //   status: 'In Progress',
    //   dueDate: 'Mar 28 2025',
    //   progress: 30,
    //   health: 'Good'
    // },
    // { 
    //   name: 'Kitchen appliances',
    //   client: "Steven's Kitchen",
    //   status: 'In Progress',
    //   dueDate: 'Mar 28 2025',
    //   progress: 60,
    //   health: 'Good'
    // },
    // { 
    //   name: 'Concrete delivery',
    //   client: 'Nerolac Custom Home',
    //   status: 'Planning',
    //   dueDate: 'Mar 28 2025',
    //   progress: 0,
    //   health: 'Good'
    // },
    // { 
    //   name: 'window installation labor',
    //   client: 'Bruke Roof Sliding',
    //   status: 'In Progress',
    //   dueDate: 'Mar 28 2025',
    //   progress: 78,
    //   health: 'At Risk'
    // },
    // { 
    //   name: 'Electrical supplies',
    //   client: 'Asian Zone Spec Home',
    //   status: 'In Progress',
    //   dueDate: 'Mar 28 2025',
    //   progress: 65,
    //   health: 'At Risk'
    // },
  ];

  // const { width, height } = useWindowSize();
  const router = useRouter();


  return (
    <div className="space-y-6 w-full " >
      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 w-full">
        <div className="bg-white w-full rounded-md shadow-sm p-6 flex flex-col items-start gap-4">
          <div className="flex flex-row items-start gap-1">
             <Image src={TotalProjectsIcon} alt="info" width={24} height={24} className="center"/>
             <p className={`${inter.className} antialiased text-[16px] font-medium text-[#313030]`}>Total Projects</p>
          </div>
          <div className="flex flex-row items-start gap-1">
             <div className='w-6 h-6'/>
             <p className={`${inter.className} antialiased text-[30px] text-[#1F2546] font-bold`}>24</p>
          </div>
        </div>
        <div className="bg-white w-full rounded-md shadow-sm p-6 flex flex-col items-start gap-4">
          <div className="flex flex-row items-start gap-1">
             <Image src={InProgressProjectsIcon} alt="info" width={24} height={24} className="center"/>
             <p className={`${inter.className} antialiased text-[16px] font-medium text-[#313030]`}>In Progress</p>
          </div>
          <div className="flex flex-row items-start gap-1">
             <div className='w-6 h-6'/>
             <p className={`${inter.className} antialiased text-[30px] text-[#1F2546] font-bold`}>12</p>
          </div>
        </div>
        <div className="bg-white w-full rounded-md shadow-sm p-6 flex flex-col items-start gap-4">
          <div className="flex flex-row items-start gap-3">
             <Image src={OnScheduleProjectsIcon} alt="info" width={24} height={24} className="center"/>
             <p className={`${inter.className} antialiased text-[16px] font-medium text-[#313030]`}>On Schedule</p>
          </div>
          <div className="flex flex-row items-start gap-3">
             <div className='w-6 h-6'/>
             <p className={`${inter.className} antialiased text-[30px] text-[#1F2546] font-bold`}>9</p>
          </div>
        </div>
        <div className="bg-white w-full rounded-md shadow-sm p-6 flex flex-col items-start gap-4">
          <div className="flex flex-row items-start gap-3">
             <Image src={NeedsAttentionProjectsIcon} alt="info" width={24} height={24} className="center"/>
             <p className={`${inter.className} antialiased text-[16px] font-medium text-[#313030]`}>Needs Attention</p>
          </div>
          <div className="flex flex-row items-start gap-3">
             <div className='w-6 h-6'/>
             <p className={`${inter.className} antialiased text-[30px] text-[#FC3A3A] font-bold`}>3</p>
          </div>
       </div>
      </div>

      {/* Project List */}
      <div className="bg-white rounded-md shadow-sm " >
        <div className="flex justify-between items-center p-6  w-min-[84px]">
          <div className={`${inter.className} antialiased text-[18px] font-semibold`}>Project List</div>
          <div className="flex space-x-3">
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700">
                <option>Project Type</option>
                <option>Residential</option>
                <option>Commercial</option>
                <option>Industrial</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={16} />
              </div>
            </div>
            <BTButton text='New Project' icon={AddCircleIcon} loading={false} size='medium' onClick={() => {
                  // Perform login logic here 
                  console.log("Login clicked");
                  localStorage.setItem("isLogin", 'true')
                  router.push(`/dashboard/projects/createProject`);
                }  

                }/>
          </div>
        </div>

        {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full  border-spacing-y-3 border-spacing-x-4">
          <thead className="top-0 bg-[#FBFBFB] z-10 text-left text-sm text-[#9B9B9D] font-medium tracking-wide">
            <tr>
              <th className="px-3 py-2">Project Name</th>
              <th className="px-3 py-2">Client</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Due Date</th>
              <th className="px-3 py-2">Progress</th>
              <th className="px-3 py-2">Health</th>
              <th className="px-3 py-2 w-1 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className={`${inter.className} antialiased text-[14px] font-normal text-[#272727] `}>
            {projectsData.map((project, index) => (
              <tr key={index} className="bg-white rounded-md shadow-sm">
                <td className="px-3 py-3 rounded-l-md">
                  <div className="flex flex-col gap-0.5 max-w-[200px]">
                    <div className={`${inter.className} antialiased text-[14px] font-normal text-[#272727] `}>{project.name}</div>
                    {project.subtext && (
                      <span className={`${inter.className} antialiased text-[13px] font-normal text-[#98989C] `}>{project.subtext}</span>
                    )}
                  </div>
                </td>
                <td className="px-3 py-3">{project.client}</td>
                <td className="px-3 py-3">
                  <StatusBadge status={project.status} />
                </td>
                <td className="px-3 py-3 whitespace-nowrap">{project.dueDate}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{project.progress}%</span>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <HealthBadge health={project.health} />
                </td>
                <td className="px-3 py-3 text-center rounded-r-md">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-end">
          <div className="flex space-x-2 items-center justify-center">
            <div className="px-2 py-1 rounded-md bg-gray-200 text-gray-700 min-w-[32px] text-center">
              1
            </div>
            <div className='w-1'></div>
          </div>

          <span className="text-sm text-gray-700 mr-4"> of 10</span>
          <div className="flex space-x-2">
            <button className="p-2 rounded-md bg-gray-200 text-gray-700">
              <ChevronLeft size={16} />
            </button>
            <button className="p-2 rounded-md bg-blue-600 text-white">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div className='bg-[#f6f6f6] h-6'/>
      </div>

      </div>
  );
};

export default ProjectPage;