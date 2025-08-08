"use client";
import React, {useState}  from 'react';
import Avatar from '@/app/components/Avatar/Avatar';
import { GroupData, UserModel } from '@/app/models/common';
import { X } from 'lucide-react';


// Create Group Modal Component Props
interface CreateGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateGroup: (groupData: GroupData) => void;
  }
  
  const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose, onCreateGroup }) => {
    const [groupName, setGroupName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<UserModel[]>([]);
    
    const availableUsers: UserModel[] = [
      { id: 1, name: 'Clarke Smith', avatar: null },
      { id: 2, name: 'Daniel James', avatar: null },
      { id: 3, name: 'Jeremy Robert', avatar: null },
      { id: 4, name: 'Sarah Wilson', avatar: null },
      { id: 5, name: 'Mike Johnson', avatar: null },
    ];
  
    const handleUserSelect = (user: UserModel) => {
      setSelectedUsers(prev => 
        prev.find(u => u.id === user.id)
          ? prev.filter(u => u.id !== user.id)
          : [...prev, user]
      );
    };
  
    const handleCreate = () => {
      if (groupName.trim() && selectedUsers.length > 0) {
        onCreateGroup({
          name: groupName,
          members: selectedUsers,
          isGroup: true
        });
        setGroupName('');
        setSelectedUsers([]);
        onClose();
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Create Group</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter group name"
            />
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Members ({selectedUsers.length} selected)
            </label>
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md">
              {availableUsers.map(user => (
                <div
                  key={user.id}
                  className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 ${
                    selectedUsers.find(u => u.id === user.id) ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleUserSelect(user)}
                >
                  <input
                    type="checkbox"
                    checked={selectedUsers.find(u => u.id === user.id) ? true : false}
                    onChange={() => handleUserSelect(user)}
                    className="mr-3"
                  />
                  <Avatar src={user.avatar} alt={user.name} size="sm" />
                  <span className="ml-3 text-sm">{user.name}</span>
                </div>
              ))}
            </div>
          </div>
  
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!groupName.trim() || selectedUsers.length === 0}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Group
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default CreateGroupModal;