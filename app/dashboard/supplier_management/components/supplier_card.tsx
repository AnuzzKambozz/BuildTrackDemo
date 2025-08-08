"use client";

import { inter, poppins } from "@/app/fonts";
import { Star, StarHalf } from "lucide-react";


interface SupplierCardProps {
    id: string;
    name: string;
    type: string;
    rating: number;
    contact: string;
    phone: string;
    email: string;
    tags: string[];
    bgColor: string;
    textColor: string;
    category?: string;
    orderNumber?: string;
  }


  // SupplierCard Component
const SupplierCard: React.FC<SupplierCardProps> = ({
    id,
    name,
    type,
    rating,
    contact,
    phone,
    email,
    tags,
    bgColor,
    textColor,
    category,
    orderNumber
  }) => {
    const renderStars = (rating: number) => {
        if (rating === 0) return null;
      
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const totalStars = 5;
      
        return (
          <div className="flex items-center gap-1">
            {Array.from({ length: totalStars }, (_, index) => {
              if (index < fullStars) {
                return (
                  <Star
                    key={index}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                );
              } else if (index === fullStars && hasHalfStar) {
                return (
                  <StarHalf
                    key={index}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                );
              } else {
                return (
                  <Star
                    key={index}
                    className="w-4 h-4 text-gray-300"
                  />
                );
              }
            })}
            <span className="ml-2 text-sm font-bold text-gray-900">{rating}</span>
          </div>
        );
      };
  
    const getTagColors = (tag: string) => {
      const colorMap: { [key: string]: string } = {
        'Lumber': 'bg-blue-100 text-blue-700',
        'Hardware': 'bg-orange-100 text-orange-700',
        'Preferred': 'bg-blue-100 text-blue-700',
        'Electrical': 'bg-purple-100 text-purple-700',
        'Licensed': 'bg-pink-100 text-pink-700',
        'Tools': 'bg-orange-100 text-orange-700',
        'Emergency': 'bg-red-100 text-red-700',
        'Commercial': 'bg-indigo-100 text-indigo-700',
        'Residential': 'bg-green-100 text-green-700',
        'Weather-proof': 'bg-cyan-100 text-cyan-700',
        'Warranty': 'bg-yellow-100 text-yellow-700',
        'Heavy Machinery': 'bg-gray-100 text-gray-700',
        'Daily Rental': 'bg-teal-100 text-teal-700',
        'Delivery': 'bg-blue-100 text-blue-700',
        'Power Tools': 'bg-orange-100 text-orange-700',
        'Professional': 'bg-purple-100 text-purple-700',
        'Crane Services': 'bg-indigo-100 text-indigo-700',
        'Certified': 'bg-green-100 text-green-700',
        'Safety': 'bg-red-100 text-red-700',
        'Safety Gear': 'bg-orange-100 text-orange-700',
        'Compliance': 'bg-blue-100 text-blue-700',
        'Training': 'bg-purple-100 text-purple-700',
        'Urgent': 'bg-red-100 text-red-700',
        'Large Order': 'bg-yellow-100 text-yellow-700',
        'Installation': 'bg-purple-100 text-purple-700',
        'Rental': 'bg-gray-100 text-gray-700',
        'Weekly': 'bg-teal-100 text-teal-700',
        'Heavy Equipment': 'bg-gray-100 text-gray-700',
        'Bulk': 'bg-green-100 text-green-700',
        'Roofing': 'bg-cyan-100 text-cyan-700',
        'Materials': 'bg-blue-100 text-blue-700',
        'Insured': 'bg-green-100 text-green-700',
        'Plumbing': 'bg-cyan-100 text-cyan-700',
      };
      return colorMap[tag] || 'bg-gray-100 text-gray-700';
    };
  
    const isOrder = category === 'Orders';
  
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#C6C3C3] hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`${poppins.className} antialiased font-semibold text-[18px] w-14 h-14 rounded-full ${bgColor} ${textColor} flex items-center justify-center`}>
              {isOrder ? '#' : id}
            </div>
            <div>
              {isOrder && orderNumber && (
                <div className="text-sm text-gray-500 mb-1">{orderNumber}</div>
              )}
              <h3 className={`${poppins.className} antialiased font-medium text-[#313030] text-[16px] mb-1`}>{name}</h3>
              <p className={`${poppins.className} antialiased text-[#9B9B9D] text-[13px] font-medium`}>{type}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {renderStars(rating)}
          </div>
        </div>
  
        <div className="space-y-3 mb-6">

            <div className="flex items-start gap-3 text-sm">
                <div className="flex items-start gap-2 text-sm">
                <span className={`${inter.className} antialiased font-semibold text-[#375DED] text-[13px] min-w-[60px]`}>{isOrder ? 'Supplier' : 'Contact'} :</span>
                <span className={`${inter.className} antialiased font-medium text-[#000000] text-[13px] `}>{contact}</span>
                </div>
                <div className="flex items-start gap-2 text-sm mx-auto">
                    <span className={`${inter.className} antialiased font-semibold text-[#375DED] text-[13px] min-w-[60px]`}>{isOrder ? 'Due Date' : 'Phone'} :</span>
                    <span className={`${inter.className} antialiased font-medium text-[#000000] text-[13px] `}>{phone}</span>
                </div>
            </div>

          <div className="flex items-start gap-2 text-sm">
            <span className={`${inter.className} antialiased font-semibold text-[#375DED] text-[13px] min-w-[60px]`}>{isOrder ? 'Status' : 'Email'} :</span>
            <span className={`${inter.className} antialiased font-medium text-[#000000] text-[13px] `}>{email}</span>
          </div>
        </div>
  
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1.5 rounded-md ${inter.className} antialiased text-[11px] text-[#375DED] font-medium ${getTagColors(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  };

  export default SupplierCard;
  