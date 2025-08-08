'use client';

import React from 'react';
import Image from 'next/image';
import { FileText, Download } from 'lucide-react';
import { AttachmentModel } from '@/app/models/common';

interface MessageAttachmentProps {
  attachment: AttachmentModel;
}

const MessageAttachment: React.FC<MessageAttachmentProps> = ({ attachment }) => {
  const isImage = attachment.type.startsWith('image/');

  if (isImage) {
    return (
      <div className="mt-2 max-w-xs relative aspect-auto rounded-lg overflow-hidden cursor-pointer hover:opacity-90">
        <Image
          src={attachment.url || attachment.preview || '/placeholder.png'}
          alt={attachment.name}
          width={300}
          height={200}
          className="rounded-lg object-cover"
          onClick={() => window.open(attachment.url, '_blank')}
        />
      </div>
    );
  }

  return (
    <div className="mt-2 p-3 bg-white bg-opacity-20 rounded-lg flex items-center space-x-3 max-w-xs">
      <FileText size={20} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{attachment.name}</p>
        <p className="text-xs opacity-75">{(attachment.size / 1024).toFixed(1)} KB</p>
      </div>
      <button
        onClick={() => window.open(attachment.url, '_blank')}
        className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
      >
        <Download size={16} />
      </button>
    </div>
  );
};

export default MessageAttachment;
