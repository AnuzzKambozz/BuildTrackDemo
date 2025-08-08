"use client";
import React from 'react';
import { ChevronDown, Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import useWindowSize from '@/app/hooks/useWindowSize';

const HumanResourcesTab = () => {
    const {  height } = useWindowSize();

    const teamData = [
      {
        id: '#123',
        name: 'Steven Robert',
        role: 'Project Manager',
        status: 'Assigned',
        project: 'Spethman Renovation',
        certification: 'PMP',
        date: '28 Mar,2025'
      },
      {
        id: '#261',
        name: 'Daniel James',
        role: 'Site Supervisor',
        status: 'Available',
        project: 'Spethman Renovation',
        certification: 'OSHA-30',
        date: '28 Mar,2025'
      },
      {
        id: '#524',
        name: 'Juleha Ahana',
        role: 'Project Coordinator',
        status: 'Assigned',
        project: 'Spethman Renovation',
        certification: 'PMP',
        date: '28 Mar,2025'
      },
      {
        id: '#276',
        name: 'Carlos Lopez',
        role: 'Carpenter',
        status: 'Available',
        project: 'Spethman Renovation',
        certification: 'Expiring',
        date: '28 Mar,2025'
      }
    ];
  
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'Available': return 'bg-green-100 text-green-800';
        case 'Assigned': return 'bg-blue-100 text-blue-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
  
    const getCertificationColor = (certification: string) => {
      switch (certification) {
        case 'PMP': return 'bg-green-100 text-green-800';
        case 'OSHA-30': return 'bg-green-100 text-green-800';
        case 'Expiring': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
  
    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Team Members</p>
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-green-600">+2 hired this month</p>
              </div>
            </div>
          </div>
  
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold">4</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">20%</p>
              </div>
            </div>
          </div>
  
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <div className="w-6 h-6 bg-orange-500 rounded"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Assigned</p>
                <p className="text-2xl font-bold">14</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">80%</p>
              </div>
            </div>
          </div>
  
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <div className="w-6 h-6 bg-red-500 rounded"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expiring Certifications</p>
                <p className="text-2xl font-bold text-red-600">2</p>
                <p className="text-sm text-red-600">Action Required</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Team Members List */}
        <div className="bg-white rounded-lg border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Team Members</h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search members"
                    className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <div className="flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm">
                  <span>Role</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                  <Plus className="w-4 h-4" />
                  <span>Add Team Members</span>
                </button>
              </div>
            </div>
          </div>
  
          <div className="overflow-x-auto" style={{ maxHeight: height - 580 }}>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lorem Ipsum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teamData.map((member) => (
                  <tr key={member.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.role}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.project}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCertificationColor(member.certification)}`}>
                        {member.certification}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      <button className="hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          {/* Pagination */}
          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-center space-x-2">
              <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">1</button>
              <span className="px-3 py-2 text-sm text-gray-600">of 10</span>
              <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default HumanResourcesTab;