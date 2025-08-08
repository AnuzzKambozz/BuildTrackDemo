"use client";

import { inter } from "@/app/fonts";
import { useState } from "react";

import BinRedIcon from "@/app/public/bin-red-icon.svg"
import DownloadIcon from "@/app/public/download-arrow-icon.svg"
import XIcon from "@/app/public/x-square.png"
import MoveFolderIcon from "@/app/public/move-folder-icon.svg"
import Image from 'next/image';




interface BulkActionsBarProps {
  selectedCount: number;
  onDownload: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

const BulkActionsBar: React.FC<BulkActionsBarProps> = ({
  selectedCount,
  onDownload,
  onDelete,
  onCancel,
}) => {
  const [checked, setChecked] = useState(true);

  if (selectedCount === 0) return null;

  return (
    <div
  className={`${inter.className} fixed bottom-6 left-[65%] transform -translate-x-1/2 border-[1px] bg-white text-[#375DED] px-6 py-3 rounded-lg drop-shadow-2xl shadow-lg flex items-center space-x-2 min-w-[550px] max-w-[700px]`}
>

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <span className="text-[12px] font-medium text-[#375DED]">
        {selectedCount} Selected
      </span>
      <div className="py-4 w-[1px] bg-[#DCDCDC]" />
      <button
        className="px-3 py-1 text-[12px] text-[#2E2E2E] font-medium flex"
        onClick={onDownload}
      >
        <Image src={DownloadIcon} alt="info" width={18} height={18} className="center mr-1"/>
        Download
      </button>
      <div className="py-4 w-[1px] bg-[#DCDCDC]" />
      <button
        className="px-3 py-1 text-[12px] text-[#2E2E2E] font-medium flex"
        onClick={onDownload}
      >
       <Image src={MoveFolderIcon} alt="info" width={18} height={18} className="center mr-1"/>
        Move To
      </button>
      <div className="py-4 w-[1px] bg-[#DCDCDC]" />
      <button
        className="px-3 py-1 text-[12px] text-[#EA5050] font-medium flex"
        onClick={onDelete}
      >
        <Image src={BinRedIcon} alt="info" width={18} height={18} className="center mr-1"/>
        Delete
      </button>
      <div className="py-4 w-[1px] bg-[#DCDCDC]" />
      <button
        className="px-3 py-1 text-[12px] text-[#2E2E2E] font-medium"
        onClick={onCancel}
      >
      <Image src={XIcon} alt="info" width={26} height={26} className="center mr-1"/>
      </button>
    </div>
  );
};

export default BulkActionsBar;
