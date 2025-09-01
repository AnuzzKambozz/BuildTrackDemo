"use client";

import { inter } from "@/app/fonts";
import Image from "next/image";

// KPICard Component
interface KPICardProps {
    icon: string;
    title: string;
    value: string | number;
    subtitle: string;
    subtitleColor: string;
  }
  
  const StatsCard: React.FC<KPICardProps> = ({ 
    icon, 
    title, 
    value, 
    subtitle, 
    subtitleColor 
  }) => {
      return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <Image src={icon} alt="" width={24} height={24} className="center"/>
            <span className={`${inter.className} antialiased text-[#313030] text-[16ps] font-medium`}>{title}</span>
          </div>
          <div className={`${inter.className} antialiased text-[30px] font-bold text-[#1F2546] mb-1 ml-[36px] text-wrap overflow-hidden whitespace-nowrap`}>
            {value}
          </div>
          <div className={`${inter.className} antialiased text-[14px] ml-[36px] font-normal ${subtitleColor}`}>
            {subtitle}
          </div>
        </div>
      );
  };
export default StatsCard;  