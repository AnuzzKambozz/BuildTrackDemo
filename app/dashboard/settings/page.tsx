"use client";
import { PasswordDataModel, PersonalInformationDataModel, NotificationStateModel } from '@/app/models/common';
import { JSX, useEffect, useState } from 'react';
import AccountSettings from './components/account_settings';
import AppPreferences from './components/app_preferences';
import NotificationSettings from './components/notification_settings';
import PersonalInformation from './components/personal_information';
import useWindowSize from '@/app/hooks/useWindowSize';                 
import { useHeaderConfig } from '@/app/context/HeaderContext';
import { inter } from '@/app/fonts';

import Avatar from '@/app/components/Avatar/Avatar';

// Main Settings Page Component
const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('Personal Information');
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const updateHeader = useHeaderConfig();
  const {  height } = useWindowSize();
  
  const [formData, setFormData] = useState<PersonalInformationDataModel>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [passwordData, setPasswordData] = useState<PasswordDataModel>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState<NotificationStateModel>({
    email: true,
    push: false
  });

  const [theme, setTheme] = useState<string>('Light');
  const [language, setLanguage] = useState<string>('English');

  const sidebarItems: string[] = [
    'Personal Information',
    'Account Settings',
    'Notification',
    'Apps Preferences'
  ];

  useEffect(() => {
          // Update header config for this specific page
          updateHeader({
            title: "Settings",
            showSearch: false,
            searchPlaceholder: "Search projects...",
            breadcrumbs: [
              { label: "Dashboard", href: "/dashboard" },
              { label: "Settings", href: "" }
            ],
            notificationCount: 5
          });
      }, [updateHeader]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    console.log('Password change requested');
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    alert('Password changed successfully!');
  };

  const handleNotificationToggle = (type: keyof NotificationStateModel): void => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Render the active component based on selection
  const renderActiveComponent = (): JSX.Element => {
    switch (activeSection) {
      case 'Personal Information':
        return (
          <PersonalInformation 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />
        );
      case 'Account Settings':
        return (
          <AccountSettings 
            setShowPasswordModal={setShowPasswordModal} 
          />
        );
      case 'Notification':
        return (
          <NotificationSettings 
            notifications={notifications} 
            handleNotificationToggle={handleNotificationToggle} 
          />
        );
      case 'Apps Preferences':
        return (
          <AppPreferences 
            theme={theme} 
            setTheme={setTheme} 
            language={language} 
            setLanguage={setLanguage} 
          />
        );
      default:
        return (
          <PersonalInformation 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />
        );
    }
  };

  return (
    <div className="flex space-x-6 bg-gray-100 w-full overflow-hidden py-4" style={{ height: height - 150 }}>
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-sm py rounded-lg">
        {/* Profile Section */}
        <div className="bg-[#375DED] px-6 py-8 text-white text-center rounded-t-lg">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-white">
          <Avatar 
            src={""} 
            alt={"Juleha Ahana"} 
            isOnline={true}
            isGroup={false}
            size='xl'
          />

          </div>
          <h2 className={`${inter.className} antialiased font-bold text-[16px] text-[#FFFFFF]`}>Juleha Ahana</h2>
          <p className={`${inter.className} antialiased font-medium text-[14px] text-[#FFFFFF] underline cursor-pointer`}>
            Julehaahana@gmail.com
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="py-2">
          {sidebarItems.map((item: string) => (
            <div className='px-2' key={item}>
            <div
              key={item}
              onClick={() => setActiveSection(item)}
              className={`px-6 py-3 cursor-pointer text-sm transition-colors rounded-lg ${
                activeSection === item
                  ? 'bg-blue-50 text-blue-700 border-r-3 border-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item}
            </div>


            </div>

          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-white ml-1 rounded-lg shadow-sm overflow-y-auto">
        <div className="max-w-5xl">
          {/* Render Active Component */}
          {renderActiveComponent()}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 mt-8  border-gray-200">
            <button className="px-6 py-2.5 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium">
              Cancel
            </button>
            <button className="px-6 py-2.5 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Change Password
            </h3>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;