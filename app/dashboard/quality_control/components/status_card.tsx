"use client";

import { inter } from "@/app/fonts";
import Image from "next/image";


interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: string;
    trend?: string;
    subtitleColor?: string;
  }
  
  // StatsCard Component
  const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle, icon, trend, subtitleColor = "text-green-600" }) => {
    return (


        // <div className="bg-white w-full rounded-md shadow-sm p-6 flex flex-col items-start gap-4">
        //   <div className="flex flex-row items-start gap-1">
        //      <Image src={icon} alt="info" width={24} height={24} className="center"/>
        //      <p className={`${inter.className} antialiased text-[16px] font-medium text-[#313030]`}>Total Projects</p>
        //   </div>
        //   <div className="flex flex-row items-start gap-1">
        //      <div className='w-6 h-6'/>
        //      <p className={`${inter.className} antialiased text-[30px] text-[#1F2546] font-bold`}>24</p>
        //   </div>
        // </div>

      <div className="bg-white w-full rounded-md shadow-sm p-6 flex flex-col items-start gap-4">
        <div className="flex flex-row items-start gap-1">
        <Image src={icon} alt="info" width={24} height={24} className="center"/>
          <span className={`${inter.className} antialiased text-[16px] font-medium text-[#313030]`}>{title}</span>
        </div>
        <div className={`${inter.className} antialiased text-[30px] text-[#1F2546] font-bold mb-2`}>
          {value}
        </div>
        {subtitle && (
          <div className={`text-sm ${subtitleColor} font-medium`}>
            {subtitle}
          </div>
        )}
        {trend && (
          <div className="text-sm text-green-600 mt-1 font-medium">
            {trend}
          </div>
        )}
      </div>
    );
  };

export default StatsCard;