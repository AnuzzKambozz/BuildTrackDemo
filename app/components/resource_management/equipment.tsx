"use client";
import React from 'react';
import {  Search, Filter, Download, MoreHorizontal } from 'lucide-react';
import useWindowSize from '@/app/hooks/useWindowSize';



const EquipmentTab = () => {
    const {  height } = useWindowSize();
    const equipmentData = [
      {
        id: '#123',
        name: 'Air Compressor -60 Gallon',
        type: 'Air Equipment',
        status: 'In Use',
        project: 'Baca Roof-Sliding',
        condition: 'Good'
      },
      {
        id: '#261',
        name: 'Concrete Mixer - 9cu ft',
        type: 'Medium Equipment',
        status: 'Available',
        project: 'Dorgan Custom Home',
        condition: 'Good'
      },
      {
        id: '#524',
        name: 'Excavator- CAT 320',
        type: 'Heavy Equipment',
        status: 'In Use',
        project: 'Spethman Renovation',
        condition: 'Good'
      },
      {
        id: '#276',
        name: 'Generator - 7500 W',
        type: 'Power Equipment',
        status: 'In Use',
        project: 'Spethman Renovation',
        condition: 'Need Service'
      },
      {
        id: '#263',
        name: 'Scissor Lift -26ft',
        type: 'Ariel Equipment',
        status: 'In Use',
        project: 'Adamson Washroom',
        condition: 'Good'
      }
    ];
  
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'Available': return 'bg-green-100 text-green-800';
        case 'In Use': return 'bg-orange-100 text-orange-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
  
    const getConditionColor = (condition: string) => {
      switch (condition) {
        case 'Good': return 'bg-green-100 text-green-800';
        case 'Need Service': return 'bg-red-100 text-red-800';
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
                <p className="text-sm text-gray-600">Total Equipment</p>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-blue-600">+15.2% Increase from last month</p>
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
                <p className="text-2xl font-bold">1</p>
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
                <p className="text-sm text-gray-600">In Use</p>
                <p className="text-2xl font-bold">4</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">80%</p>
              </div>
            </div>
          </div>
  
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <div className="w-6 h-6 bg-purple-500 rounded"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">In Maintenance</p>
                <p className="text-2xl font-bold">0</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">0%</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Equipment List */}
        <div className="bg-white rounded-lg border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Equipment List</h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search Equipments..."
                    className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm">
                  <span>Select</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {equipmentData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.project}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getConditionColor(item.condition)}`}>
                        {item.condition}
                      </span>
                    </td>
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
        </div>
      </div>
    );
  };
  
  export default EquipmentTab;