import React from 'react';
import { ComponentProps, Permits } from '@/app/types/project.type';

const PermitsApprovals: React.FC<ComponentProps> = ({ data, updateData }) => {
  const handlePermitChange = (permitType: keyof Permits, checked: boolean): void => {
    updateData({
      permits: {
        ...data.permits,
        [permitType]: checked
      }
    });
  };

  const permitOptions = [
    { key: 'buildingPermit' as keyof Permits, label: 'Building Permit Required' },
    { key: 'electricalPermit' as keyof Permits, label: 'Electrical Permit Required' },
    { key: 'plumbingPermit' as keyof Permits, label: 'Plumbing Permit Required' },
    { key: 'hvacPermit' as keyof Permits, label: 'HVAC Permit Required' },
    { key: 'historicDistrict' as keyof Permits, label: 'Historic District Review' },
    { key: 'environmentalAssessment' as keyof Permits, label: 'Environmental Assessment' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-[18px] font-semibold text-primaryColor mb-4">Permits & Approvals</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {permitOptions.map((option) => (
          <div key={option.key} className="flex items-center">
            <input
              type="checkbox"
              id={option.key}
              checked={data.permits[option.key]}
              onChange={(e) => handlePermitChange(option.key, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor={option.key} className="ml-2 text-sm text-gray-700">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermitsApprovals;