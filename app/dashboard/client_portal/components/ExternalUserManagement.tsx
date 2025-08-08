"use client";

// components/ExternalUserManagement.tsx
import React from 'react';
import { User } from '../types/client-portal';

interface ExternalUserManagementProps {
  users: User[];
  onAddUser: () => void;
  onUserRoleChange: (userId: string, newRole: User['role']) => void;
}

export const ExternalUserManagement: React.FC<ExternalUserManagementProps> = ({
  users,
  onAddUser,
  onUserRoleChange
}) => {
  const getStatusBadge = (status: User['status']) => {
    const statusStyles = {
      Active: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Inactive: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    onUserRoleChange(userId, newRole as User['role']);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            External User Management
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage individual users for this client
          </p>
        </div>
        <button
          onClick={onAddUser}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add User
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 px-4 py-3 bg-gray-50 rounded-lg text-xs font-medium text-gray-700 uppercase tracking-wider mb-4">
        <div>User</div>
        <div>Role</div>
        <div>Status</div>
        <div>Last Login</div>
        <div>Actions</div>
      </div>

      {/* User List */}
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="grid grid-cols-5 gap-4 items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            {/* User Info */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs font-semibold text-white">
                {user.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Role Dropdown */}
            <div className="relative">
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="Owner">Owner</option>
                <option value="Designer">Designer</option>
                <option value="Admin">Admin</option>
                <option value="Viewer">Viewer</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Status */}
            <div>
              {getStatusBadge(user.status)}
            </div>

            {/* Last Login */}
            <div className="text-sm text-gray-600">
              {user.lastLogin || 'Never'}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new user to manage client access.
          </p>
        </div>
      )}
    </div>
  );
};