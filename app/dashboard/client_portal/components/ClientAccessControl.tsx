"use client";

// components/ClientAccessControl.tsx
import React from 'react';
import { Client } from '../types/client-portal';

interface ClientAccessControlProps {
  clients: Client[];
  selectedClient: Client | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClientSelect: (client: Client) => void;
  onAddClient: () => void;
}

export const ClientAccessControl: React.FC<ClientAccessControlProps> = ({
  clients,
  selectedClient,
  searchQuery,
  onSearchChange,
  onClientSelect,
  onAddClient
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Client Access Control
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage client access to specific projects
          </p>
        </div>
        <button
          onClick={onAddClient}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Client Access
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search clients"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Client List Header */}
      <div className="grid grid-cols-2 gap-4 px-4 py-2 bg-gray-50 rounded-lg text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200 mb-2">
        <div>Client</div>
        <div>Projects</div>
      </div>

      {/* Client List */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {clients.map((client) => (
          <button
            key={client.id}
            onClick={() => onClientSelect(client)}
            className={`w-full grid grid-cols-2 gap-4 p-4 rounded-lg text-left transition-colors duration-200 border ${
              selectedClient?.id === client.id
                ? 'bg-blue-50 border-blue-200'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white ${
                client.type === 'Residential Client' ? 'bg-blue-600' : 'bg-green-600'
              }`}>
                {client.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {client.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {client.type}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-900">
                {client.projectCount}
              </span>
            </div>
          </button>
        ))}
      </div>

      {clients.length === 0 && (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No clients found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery ? 'Try adjusting your search criteria.' : 'Get started by adding a new client.'}
          </p>
        </div>
      )}
    </div>
  );
};