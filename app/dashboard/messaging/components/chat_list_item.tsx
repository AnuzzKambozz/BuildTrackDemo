"use client";
import React from 'react';
import Avatar from '@/app/components/Avatar/Avatar';
import { ChatModel } from '@/app/models/common';
// Chat List Item Component Props
interface ChatListItemProps {
  chat: ChatModel;
  isActive: boolean;
  onClick: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isActive, onClick }) => {
  return (
    <div
      className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
        isActive ? 'bg-blue-50 border-r-2 border-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <Avatar 
        src={chat.avatar} 
        alt={chat.name} 
        isOnline={chat.isOnline} 
        isGroup={chat.isGroup}
      />
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {chat.name}
            {chat.isGroup && (
              <span className="ml-1 text-xs text-gray-500">({chat.members?.length || 0})</span>
            )}
          </h3>
          <span className="text-xs text-gray-500">{chat.time}</span>
        </div>
        <p className="text-sm text-gray-600 truncate mt-1">{chat.lastMessage}</p>
      </div>
      {chat.unreadCount && (
        <div className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {chat.unreadCount}
        </div>
      )}
    </div>
  );
};

export default ChatListItem;