"use client";
import { PersonalInformationDataModel } from '@/app/models/common';
// import { useState } from 'react';


 interface PersonalInformationProps {
    formData: PersonalInformationDataModel;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }


  const PersonalInformation: React.FC<PersonalInformationProps> = ({ 
    formData, 
    handleInputChange 
  }) => {
    return (
      <section className="mb-10 ">
        <h1 className="text-xl font-semibold text-gray-800 mb-6 ">
          Personal Information
        </h1>
        <div className='border-b mb-6'/>
        
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>
      </section>
    );
  };
  

  export default PersonalInformation;