'use client';

import React from 'react';
import { X, FileText } from 'lucide-react';
import Image from 'next/image';
import { AttachmentModel } from '@/app/models/common';

interface AttachmentPreviewProps {
  attachment: AttachmentModel;
  onRemove: () => void;
}

const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({ attachment, onRemove }) => {
  const isImage = attachment.type.startsWith('image/');

  return (
    <div className="relative inline-block mr-2 mb-2">
      {isImage ? (
        <div className="w-20 h-20 rounded-lg overflow-hidden border relative">
          <Image
            src={attachment.preview || '/placeholder.png'} // ensure fallback src
            alt={attachment.name}
            fill
            className="object-cover"
            sizes="80px"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.png';
            }}
          />
        </div>
      ) : (
        <div className="w-20 h-20 rounded-lg border flex items-center justify-center bg-gray-100">
          <FileText size={24} className="text-gray-500" />
        </div>
      )}

      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
      >
        <X size={12} />
      </button>

      <p className="text-xs text-gray-600 mt-1 truncate w-20">{attachment.name}</p>
    </div>
  );
};

export default AttachmentPreview;
