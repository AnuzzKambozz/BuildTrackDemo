'use client';
import { Search, Users } from "lucide-react";
import { useState, useEffect } from "react";
import ChatHeader from "./components/chat_header";
import ChatListItem from "./components/chat_list_item";
import CreateGroupModal from "./components/create_group_modal";
import EditGroupModal from "./components/edit_group_modal";
import Message from "./components/message";
import { GroupData, ChatModel, MessageModel, AttachmentModel } from '@/app/models/common';
import MessageInput from "./components/message_input";
import { useHeaderConfig } from '@/app/context/HeaderContext';
import useWindowSize from '@/app/hooks/useWindowSize';                 

// Main Chat App Component
const ChatApp = () => {
    const [chats, setChats] = useState<ChatModel[]>([
      {
        id: 1,
        name: 'Steven Robert',
        lastMessage: 'Meeting Scheduled for tomorrow...',
        time: '2:36 PM',
        avatar: null,
        isOnline: true,
        unreadCount: 4,
        messages: [
          {
            id: 1,
            text: 'Hi Juleha, Can we schedule a meeting for tomorrow morning for 10 AM ?',
            sender: 'Steven Robert',
            time: '2:36 PM',
            isOwn: false,
            avatar: null
          },
          {
            id: 2,
            text: 'Sure, 10AM works for me, see you then!',
            sender: 'You',
            time: '2:36 PM',
            isOwn: true,
            avatar: null
          },
          {
            id: 3,
            text: 'Great! I\'ll send the agenda soon',
            sender: 'Steven Robert',
            time: '2:45 PM',
            isOwn: false,
            avatar: null
          }
        ]
      },
      {
        id: 2,
        name: 'Project Team',
        lastMessage: 'Let\'s finalize the timeline',
        time: '1:20 PM',
        avatar: null,
        isOnline: false,
        isGroup: true,
        members: [
          { id: 1, name: 'Clarke Smith', avatar: null },
          { id: 2, name: 'Daniel James', avatar: null },
          { id: 3, name: 'Jeremy Robert', avatar: null }
        ],
        messages: [
          {
            id: 1,
            text: 'Let\'s finalize the project timeline today',
            sender: 'Clarke Smith',
            time: '1:20 PM',
            isOwn: false,
            avatar: null
          }
        ]
      },
      {
        id: 3,
        name: 'Clarke Smith',
        lastMessage: 'Can we Discuss about the Budget...',
        time: '2:36 PM',
        avatar: null,
        isOnline: false,
        messages: [
          {
            id: 1,
            text: 'Can we discuss about the budget for next quarter?',
            sender: 'Clarke Smith',
            time: '2:36 PM',
            isOwn: false,
            avatar: null
          }
        ]
      },
      {
        id: 4,
        name: 'Daniel James',
        lastMessage: 'Site Inspection Time...',
        time: '2:36 PM',
        avatar: null,
        isOnline: false,
        messages: [
          {
            id: 1,
            text: 'What time should we schedule the site inspection?',
            sender: 'Daniel James',
            time: '2:36 PM',
            isOwn: false,
            avatar: null
          }
        ]
      },
      {
        id: 5,
        name: 'Steven Robert',
        lastMessage: 'Meeting Scheduled for tomorrow...',
        time: '2:36 PM',
        avatar: null,
        isOnline: true,
        unreadCount: 4,
        messages: [
          {
            id: 1,
            text: 'Hi Juleha, Can we schedule a meeting for tomorrow morning for 10 AM ?',
            sender: 'Steven Robert',
            time: '2:36 PM',
            isOwn: false,
            avatar: null
          },
          {
            id: 2,
            text: 'Sure, 10AM works for me, see you then!',
            sender: 'You',
            time: '2:36 PM',
            isOwn: true,
            avatar: null
          },
          {
            id: 3,
            text: 'Great! I\'ll send the agenda soon',
            sender: 'Steven Robert',
            time: '2:45 PM',
            isOwn: false,
            avatar: null
          }
        ]
      },
      {
        id: 6,
        name: 'Project Team',
        lastMessage: 'Let\'s finalize the timeline',
        time: '1:20 PM',
        avatar: null,
        isOnline: false,
        isGroup: true,
        members: [
          { id: 1, name: 'Clarke Smith', avatar: null },
          { id: 2, name: 'Daniel James', avatar: null },
          { id: 3, name: 'Jeremy Robert', avatar: null }
        ],
        messages: [
          {
            id: 1,
            text: 'Let\'s finalize the project timeline today',
            sender: 'Clarke Smith',
            time: '1:20 PM',
            isOwn: false,
            avatar: null
          }
        ]
      },
      {
        id: 7,
        name: 'Clarke Smith',
        lastMessage: 'Can we Discuss about the Budget...',
        time: '2:36 PM',
        avatar: null,
        isOnline: false,
        messages: [
          {
            id: 1,
            text: 'Can we discuss about the budget for next quarter?',
            sender: 'Clarke Smith',
            time: '2:36 PM',
            isOwn: false,
            avatar: null
          }
        ]
      },
      {
        id: 8,
        name: 'Daniel James',
        lastMessage: 'Site Inspection Time...',
        time: '2:36 PM',
        avatar: null,
        isOnline: false,
        messages: [
          {
            id: 1,
            text: 'What time should we schedule the site inspection?',
            sender: 'Daniel James',
            time: '2:36 PM',
            isOwn: false,
            avatar: null
          }
        ]
      }
    ]);
  
    const [activeChat, setActiveChat] = useState<ChatModel | null>(chats[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [showEditGroup, setShowEditGroup] = useState(false);
    const [editingGroup, setEditingGroup] = useState<ChatModel | null>(null);

    const updateHeader = useHeaderConfig();
    const {  height } = useWindowSize();

    useEffect(() => {
        // Update header config for this specific page
        updateHeader({
          title: "Messaging",
          showSearch: false,
          searchPlaceholder: "Search projects...",
          breadcrumbs: [
            { label: "Dashboard", href: "/dashboard" },
            { label: "Messaging", href: "" }
          ],
          notificationCount: 5
        });
    }, [updateHeader]);
  
    const filteredChats = chats.filter(chat =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const handleSendMessage = (messageText: string, attachments: AttachmentModel[] = []) => {
        const newMessage: MessageModel = {
          id: Date.now(),
          text: messageText,
          sender: 'You',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: true,
          avatar: null,
          attachments: attachments.length > 0 ? attachments : undefined,
        };
      
        setChats(prevChats =>
          prevChats.map(chat =>
            chat.id === activeChat?.id
              ? {
                  ...chat,
                  messages: [...chat.messages, newMessage],
                  lastMessage: messageText,
                  time: newMessage.time,
                }
              : chat
          )
        );
      
        if (activeChat) {
          setActiveChat({
            ...activeChat,
            messages: [...activeChat.messages, newMessage],
            lastMessage: messageText,
            time: newMessage.time,
          });
        }
    };
  
    const handleCreateGroup = (groupData: GroupData) => {
      const newGroup = {
        id: Date.now(),
        name: groupData.name,
        lastMessage: 'Group created',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: null,
        isOnline: true,
        isGroup: true,
        members: groupData.members,
        messages: [
          {
            id: 1,
            text: `Group "${groupData.name}" has been created with ${groupData.members.length} members`,
            sender: 'System',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: false,
            avatar: null
          }
        ]
      };
  
      setChats(prev => [newGroup, ...prev]);
      setActiveChat(newGroup);
    };
  
    const handleEditGroup = (group: ChatModel) => {
      setEditingGroup(group);
      setShowEditGroup(true);
    };
  
    const handleUpdateGroup = (updatedGroup: ChatModel) => {
        setChats(prev =>
          prev.map(chat => chat.id === updatedGroup.id ? updatedGroup : chat)
        );
      
        if (activeChat?.id === updatedGroup.id) {
          setActiveChat(updatedGroup);
        }
    };
  
    const handleDeleteGroup = (groupId: number) => {
        setChats(prev => {
          const updated = prev.filter(chat => chat.id !== groupId);
          if (activeChat?.id === groupId) {
            setActiveChat(updated.length > 0 ? updated[0] : null);
          }
          return updated;
        });
    };
  
    return (
      <div className=" flex space-x-6 bg-gray-100 w-full overflow-hidden py-4" style={{ height: height - 150 }}>
        {/* Sidebar - Fixed width with full height */}
        <div className="w-80 bg-white border-r rounded-lg shadow-sm flex flex-col h-full">
          {/* Search Header - Fixed at top */}
          <div className="flex-shrink-0 p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
              <button
                onClick={() => setShowCreateGroup(true)}
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                title="Create Group"
              >
                <Users size={16} />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search Messages"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
  
          {/* Chat List - Scrollable area */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="space-y-1 p-2">
              {filteredChats.map(chat => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  isActive={activeChat?.id === chat.id}
                  onClick={() => setActiveChat(chat)}
                />
              ))}
            </div>
          </div>
        </div>
  
        {/* Main Chat Area - Takes remaining width and full height */}
        <div className="flex-1 flex flex-col h-full rounded-lg" >
          {activeChat ? (
            <>
              {/* Chat Header - Fixed at top */}
              <div className="flex-shrink-0 ">
                <ChatHeader 
                  activeChat={activeChat} 
                  onEditGroup={handleEditGroup}
                />
              </div>
              
              {/* Messages Area - Scrollable with flex-1 to take remaining space */}
              <div className="flex-1 overflow-y-auto bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="p-4 space-y-4 min-h-full flex flex-col justify-end">
                  {activeChat.messages.map(message => (
                    <Message
                      key={message.id}
                      message={message}
                      isOwn={message.isOwn}
                    />
                  ))}
                </div>
              </div>
  
              {/* Message Input - Fixed at bottom */}
              <div className="flex-shrink-0 border-t border-gray-200 bg-white">
                <MessageInput onSendMessage={handleSendMessage} />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="text-gray-400 mb-4">
                  <Users size={64} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Welcome to Messages
                </h3>
                <p className="text-gray-600">
                  Select a conversation to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
  
        {/* Create Group Modal */}
        <CreateGroupModal
          isOpen={showCreateGroup}
          onClose={() => setShowCreateGroup(false)}
          onCreateGroup={handleCreateGroup}
        />
  
        {/* Edit Group Modal */}
        <EditGroupModal
          isOpen={showEditGroup}
          onClose={() => setShowEditGroup(false)}
          group={editingGroup}
          onUpdateGroup={handleUpdateGroup}
          onDeleteGroup={handleDeleteGroup}
        />
      </div>
    );
};
  
export default ChatApp;