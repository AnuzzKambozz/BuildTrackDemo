"use client";

import { inter } from "@/app/fonts";
import { Client } from "@/app/models/common";


const ClientCard: React.FC<{ client: Client }> = ({ client }) => (
    <div className={`${inter.className} antialiased bg-white rounded-lg p-6 shadow-sm border border-gray-100`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-7">
          <div className={`w-[60px] h-[60px] rounded-full ${client.initialsColor} flex items-center justify-center text-[20px] font-semibold`}>
            {client.initials}
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-[#313030] text-[16px]">{client.name}</h3>
            <p className="text-[#9B9B9D] text-[13px] font-medium">{client.clientType}</p>
          </div>
        </div>
        <span className="bg-[#DBFFCE] text-[#4CAB02] px-4 py-2 rounded-lg text-[13px] font-medium">
          {client.status}
        </span>
      </div>
      <div className={`h-[1px] bg-[#E6E5E5] space-y-2 mb-6`}/>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-[#375DED] font-semibold text-[13px]">Email :</span>
          <span className="text-[#000000] text-[13px] font-medium">{client.email}</span>
          <span className="text-[#375DED] font-semibold text-[13px]  ml-auto">Phone :</span>
          <span className="text-[#000000] text-[13px] font-medium">{client.phone}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[#375DED] font-semibold text-[13px]">Project:</span>
          <span className="text-[#000000] text-[13px] font-medium">{client.project}</span>
        </div>
      </div>
    </div>
  );

  export default ClientCard;