// components/ClientPortal.tsx
'use client';

import React, { useState } from 'react';
import { TabNavigation } from './TabNavigation';
import { ClientPortalGlobalSettings } from './ClientPortalGlobalSettings';
import { ClientAccessControl } from './ClientAccessControl';
import { ProjectAccessPanel } from './ProjectAccessPanel';
import { ExternalUserManagement } from './ExternalUserManagement';
import { AddClientModal } from './modals/AddClientModal';
import { AddUserModal } from './modals/AddUserModal';
import { 
  Client, 
  User, 
  ProjectAccess, 
  ClientPortalSettings,
  TabConfig 
} from '../types/client-portal';

const mainTabs: TabConfig[] = [
  { id: 'company', label: 'Company' },
  { id: 'user-accounts', label: 'User Accounts' },
  { id: 'roles-permissions', label: 'Roles & Permissions' },
  { id: 'integration', label: 'Integration' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'client-portal', label: 'Client Portal', isActive: true },
];

const subTabs: TabConfig[] = [
  { id: 'account-management', label: 'Account Management', isActive: true },
  { id: 'branding', label: 'Branding' },
  { id: 'customization', label: 'Customization' },
  { id: 'analytics', label: 'Analytics' },
];

// Mock data
const initialClients: Client[] = [
  {
    id: '1',
    name: 'Clarke Smith',
    email: 'smithclarke@gmail.com',
    type: 'Residential Client',
    projectCount: 1,
    initials: 'CS'
  },
  {
    id: '2',
    name: 'Asian Zone Corp',
    email: 'contact@asianzone.com',
    type: 'Commercial Client',
    projectCount: 2,
    initials: 'AZ'
  },
  {
    id: '3',
    name: 'Bruke Enterprises',
    email: 'info@bruke.com',
    type: 'Residential Client',
    projectCount: 1,
    initials: 'BE'
  },
  {
    id: '4',
    name: 'Nerolac Developments',
    email: 'dev@nerolac.com',
    type: 'Residential Client',
    projectCount: 4,
    initials: 'ND'
  },
];

const initialUsers: User[] = [
  {
    id: '1',
    name: 'Clarke Smith',
    email: 'smithclarke@gmail.com',
    role: 'Owner',
    status: 'Active',
    lastLogin: 'Mar 28, 2025',
    initials: 'CS'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'doejohn@gmail.com',
    role: 'Designer',
    status: 'Pending',
    lastLogin: null,
    initials: 'JD'
  },
];

const initialProjectAccess: ProjectAccess = {
  clientId: '1',
  clientName: 'Clarke Smith',
  projectName: 'Spethman Renovation',
  enableProjectPortal: true,
  accessExpires: '2025-04-30',
  visibilityAccess: true,
  timelineProgress: true,
  projectPhotos: true,
  financialInformation: false,
  documentsFiles: true,
};

const initialSettings: ClientPortalSettings = {
  enableClientPortal: true,
  defaultProjectVisibility: 'Limited Access',
};

export const ClientPortal: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState('client-portal');
  const [activeSubTab, setActiveSubTab] = useState('account-management');
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedClient, setSelectedClient] = useState<Client | null>(clients[0]);
  const [projectAccess, setProjectAccess] = useState<ProjectAccess>(initialProjectAccess);
  const [settings, setSettings] = useState<ClientPortalSettings>(initialSettings);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const handleAddClient = (clientData: { name: string; email: string; type: 'Residential Client' | 'Commercial Client' }) => {
    const newClient: Client = {
      id: Date.now().toString(),
      name: clientData.name,
      email: clientData.email,
      type: clientData.type,
      projectCount: 0,
      initials: clientData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
    };
    setClients([...clients, newClient]);
    setShowAddClientModal(false);
  };

  const handleAddUser = (userData: { name: string; email: string; role: 'Owner' | 'Designer' | 'Admin' | 'Viewer' }) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: 'Pending',
      lastLogin: null,
      initials: userData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
    };
    setUsers([...users, newUser]);
    setShowAddUserModal(false);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <TabNavigation
            tabs={mainTabs}
            activeTab={activeMainTab}
            onTabChange={setActiveMainTab}
          />
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <TabNavigation
            tabs={subTabs}
            activeTab={activeSubTab}
            onTabChange={setActiveSubTab}
            variant="secondary"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Settings and Client List */}
            <div className="lg:col-span-1 space-y-8">
              <ClientPortalGlobalSettings
                settings={settings}
                onSettingsChange={setSettings}
              />

              <ClientAccessControl
                clients={filteredClients}
                selectedClient={selectedClient}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onClientSelect={setSelectedClient}
                onAddClient={() => setShowAddClientModal(true)}
              />

              <ExternalUserManagement
                users={users}
                onAddUser={() => setShowAddUserModal(true)}
                onUserRoleChange={(userId, newRole) => {
                  setUsers(users.map(user => 
                    user.id === userId ? { ...user, role: newRole } : user
                  ));
                }}
              />
            </div>

            {/* Right Column - Project Access Panel */}
            <div className="lg:col-span-2">
              {selectedClient && (
                <ProjectAccessPanel
                  client={selectedClient}
                  projectAccess={projectAccess}
                  onProjectAccessChange={setProjectAccess}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddClientModal
        isOpen={showAddClientModal}
        onClose={() => setShowAddClientModal(false)}
        onAdd={handleAddClient}
      />

      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onAdd={handleAddUser}
      />
    </div>
  );
};
export default ClientPortal;