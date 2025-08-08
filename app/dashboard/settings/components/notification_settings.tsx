"use client";

import { NotificationStateModel } from "@/app/models/common";



interface NotificationSettingsProps {
    notifications: NotificationStateModel;
    handleNotificationToggle: (type: keyof NotificationStateModel) => void;
  }



  // Notification Component
 const NotificationSettings: React.FC<NotificationSettingsProps> = ({ 
  notifications, 
  handleNotificationToggle 
}) => {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Notification
      </h2>
      <div className='border-b mb-6'/>    
      <div className="grid grid-cols-2 gap-12">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-gray-800 text-sm mb-1">
              Email Notifications
            </h3>
            <p className="text-xs text-gray-500">
              Receive updates via email
            </p>
          </div>
          <button
            onClick={() => handleNotificationToggle('email')}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ml-4 ${
              notifications.email ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                notifications.email ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-gray-800 text-sm mb-1">
              Push Notifications
            </h3>
            <p className="text-xs text-gray-500">
              Receive push notification on your device
            </p>
          </div>
          <button
            onClick={() => handleNotificationToggle('push')}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ml-4 ${
              notifications.push ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                notifications.push ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotificationSettings;