"use client";
import React from 'react';
import Avatar from '@/app/components/Avatar/Avatar';
import { MessageModel } from '@/app/models/common';
import MessageAttachment from './message_attachment';
import { inter } from '@/app/fonts';


// Message Component Props
interface MessageProps {
  message: MessageModel;
  isOwn: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isOwn }) => {
  return (
    <div className={`flex mb-4 gap-3 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      {!isOwn && (
        <Avatar src={message.avatar} alt={message.sender} size="sm" />
      )}
      <div className={`max-w-xs lg:max-w-md px-4 py-4 rounded-lg ${
        isOwn 
          ? 'bg-[#375DED] text-white ml-2' 
          : 'bg-[#EEEFF1] text-gray-800 mr-2 ml-2'
      }`}>
        {/* {!isOwn && message.sender !== 'System' && (
          <p className={`${inter.className} antialiased text-[14px] font-semibold mb-1 opacity-75`}>{message.sender}</p>
        )} */}
        <p className={`${inter.className} antialiased text-[14px] font-semibold`}>{message.text}</p>
        {message.attachments && message.attachments.map((attachment, index) => (
          <MessageAttachment key={index} attachment={attachment} />
        ))}
        <p className={`${inter.className} antialiased text-[8px] font-medium mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
          {message.time}
        </p>
      </div>
      {isOwn && (
        <Avatar src={message.avatar} alt={message.sender} size="sm" />
      )}
    </div>
  );
};

export default Message;