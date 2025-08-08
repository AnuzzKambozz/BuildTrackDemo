"use client";
import React from 'react';
import Avatar from '@/app/components/Avatar/Avatar';
import { ChatModel } from '@/app/models/common';
import { Edit2, MoreVertical } from 'lucide-react';


// Chat Header Component Props
interface ChatHeaderProps {
    activeChat: ChatModel | null;
    onEditGroup: (chat: ChatModel) => void;
  }
  
  const ChatHeader: React.FC<ChatHeaderProps> = ({ activeChat, onEditGroup }) => {
    if (!activeChat) return null;
  
    return (
      <div className="bg-[#EBEFFF] border-b px-6 py-4 flex items-center justify-between rounded-t-lg shadow-sm">
        <div className="flex items-center">
          <Avatar 
            src={activeChat.avatar} 
            alt={activeChat.name} 
            isOnline={activeChat.isOnline}
            isGroup={activeChat.isGroup}
          />
          <div className="ml-3">
            <h2 className="text-lg font-semibold text-gray-900">{activeChat.name}</h2>
            <p className="text-sm text-green-500">
              {activeChat.isGroup 
                ? `${activeChat.members?.length || 0} members`
                : activeChat.isOnline ? 'Online' : 'Offline'
              }
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {activeChat.isGroup && (
            <button 
              onClick={() => onEditGroup(activeChat)}
              className="text-gray-400 hover:text-gray-600 p-2"
              title="Edit Group"
            >
              <Edit2 size={18} />
            </button>
          )}
          <button className="text-gray-400 hover:text-gray-600 p-2">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
    );
  };
  
  export default ChatHeader;