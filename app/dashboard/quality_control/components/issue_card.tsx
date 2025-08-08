"use client";

import Avatar from "@/app/components/Avatar/Avatar";
import { inter } from "@/app/fonts";
import { IssueModel } from "@/app/models/common";

// IssueCard Component
interface IssueCardProps {
    issue: IssueModel;
    isDragging?: boolean;
  }
  
  const IssueCard: React.FC<IssueCardProps> = ({ issue, isDragging }) => {
    const getSeverityColor = (severity: string) => {
      switch (severity) {
        case 'Critical': return 'border-l-red-500';
        case 'Medium': return 'border-l-orange-400';
        case 'Low': return 'border-l-green-500';
        default: return 'border-l-gray-500';
      }
    };
  
    const getSeverityBadgeColor = (severity: string) => {
      switch (severity) {
        case 'Critical': return 'text-[#FC3A3A]';
        case 'Medium': return ' text-[#F5A11B]';
        case 'Low': return ' text-green-700';
        default: return ' text-gray-[#FC3A3A]';
      }
    };
  
    return (
      <div 
        className={`bg-white rounded-lg border-l-4 ${getSeverityColor(issue.severity)} p-4 shadow-sm hover:shadow-md transition-all cursor-move ${isDragging ? 'opacity-50 rotate-2' : ''} border border-gray-100`}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData('text/plain', issue.id);
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <span className={` px-2 py-1 ${inter.className} antialiased text-[14px] font-semibold  ${getSeverityBadgeColor(issue.severity)}`}>
            {issue.code} • {issue.severity}
          </span>
        </div>
        
        <h3 className={`${inter.className} antialiased font-semibold text-[14px] text-[#000000] mb-2  leading-tight`}>
          {issue.title}
        </h3>
        
        <p className={`text-[#98989C] text-[13px] mb-4 leading-relaxed font-normal ${inter.className} antialiased`}>
          {issue.description}
        </p>
        
        <div className={`${inter.className} antialiased flex flex-col items-start justify-between text-xs gap-2`}>
          <span className="text-gray-500">
            <span className="text-[#375DED] text-[13px] font-medium">Created :</span> {issue.createdDate}
          </span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
            <Avatar 
            src={""} 
            alt={issue.assignee} 
            size="sm"
          />
            </div>
            <span className="text-gray-700 font-normal text-[14px]">{issue.assignee}</span>
          </div>
        </div>
      </div>
    );
  };
export default IssueCard;  