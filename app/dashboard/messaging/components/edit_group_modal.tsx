"use client";
import React, {useState}  from 'react';
import Avatar from '@/app/components/Avatar/Avatar';
import { ChatModel, UserModel } from '@/app/models/common';
import { X, UserPlus, UserMinus, Plus } from 'lucide-react';


// Edit Group Modal Component Props
interface EditGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    group: ChatModel | null;
    onUpdateGroup: (group: ChatModel) => void;
    onDeleteGroup: (groupId: number) => void;
  }



const EditGroupModal: React.FC<EditGroupModalProps> = ({ 
    isOpen, 
    onClose, 
    group, 
    onUpdateGroup, 
    onDeleteGroup 
  }) => {
    const [groupName, setGroupName] = useState(group?.name || '');
    const [groupMembers, setGroupMembers] = useState<UserModel[]>(group?.members || []);
    const [showAddMembers, setShowAddMembers] = useState(false);
    
    const availableUsers: UserModel[] = [
      { id: 1, name: 'Clarke Smith', avatar: null },
      { id: 2, name: 'Daniel James', avatar: null },
      { id: 3, name: 'Jeremy Robert', avatar: null },
      { id: 4, name: 'Sarah Wilson', avatar: null },
      { id: 5, name: 'Mike Johnson', avatar: null },
      { id: 6, name: 'Emma Davis', avatar: null },
      { id: 7, name: 'John Smith', avatar: null },
    ].filter(user => !groupMembers.find(member => member.id === user.id));
  
    const handleRemoveMember = (memberId: number) => {
      setGroupMembers(prev => prev.filter(member => member.id !== memberId));
    };
  
    const handleAddMember = (user: UserModel) => {
      setGroupMembers(prev => [...prev, user]);
      setShowAddMembers(false);
    };
  
    const handleUpdate = () => {
      if (group && groupName.trim() && groupMembers.length > 0) {
        onUpdateGroup({
          ...group,
          name: groupName,
          members: groupMembers
        });
        onClose();
      }
    };
  
    const handleDelete = () => {
      if (group && window.confirm('Are you sure you want to delete this group?')) {
        onDeleteGroup(group.id);
        onClose();
      }
    };
  
    if (!isOpen || !group) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Edit Group</h2>
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
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Members ({groupMembers.length})
              </label>
              <button
                onClick={() => setShowAddMembers(true)}
                className="text-blue-500 hover:text-blue-600 text-sm flex items-center"
              >
                <UserPlus size={16} className="mr-1" />
                Add
              </button>
            </div>
            
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {groupMembers.map(member => (
                <div key={member.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <Avatar src={member.avatar} alt={member.name} size="sm" />
                    <span className="ml-2 text-sm">{member.name}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <UserMinus size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
  
          {showAddMembers && (
            <div className="mb-4 p-3 border rounded-md">
              <h4 className="text-sm font-medium mb-2">Add Members</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {availableUsers.map(user => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => handleAddMember(user)}
                  >
                    <div className="flex items-center">
                      <Avatar src={user.avatar} alt={user.name} size="sm" />
                      <span className="ml-2 text-sm">{user.name}</span>
                    </div>
                    <Plus size={16} className="text-green-500" />
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowAddMembers(false)}
                className="mt-2 text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          )}
  
          <div className="flex justify-between">
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50"
            >
              Delete Group
            </button>
            <div className="space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={!groupName.trim() || groupMembers.length === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Group
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default EditGroupModal;