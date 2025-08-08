"use clients";

import { inter } from "@/app/fonts";
import Image from "next/image";

interface StatsCardProps {
    icon: string;
    title: string;
    value: string | number;
    subtitle: string;
    subtitleColor?: 'green' | 'blue' | 'red' | 'gray';
  }

  
  // StatsCard Component
const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  subtitleColor = 'gray'
}) => {
  const getSubtitleColorClass = () => {
    switch (subtitleColor) {
      case 'green':
        return 'text-[#0FBC81]';
      case 'blue':
        return 'text-[#375DED]';
      case 'red':
        return 'text-[#FC3A3A]';
      default:
        return 'text-[#4CAB02]';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-3">
        <Image src={icon} alt="" width={24} height={24} className="center"/>
        <span className={`${inter.className} antialiased text-[#313030] text-[16ps] font-medium`}>{title}</span>
      </div>
      <div className={`${inter.className} antialiased text-[30px] font-bold text-[#1F2546] mb-1 text-wrap overflow-hidden whitespace-nowrap`}>
        {value}
      </div>
      <div className={`${inter.className} antialiased text-[14px] font-normal ${getSubtitleColorClass()}`}>
        {subtitle}
      </div>
    </div>
  );
};

export default StatsCard;