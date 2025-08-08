"use client";

interface AccountSettingsProps {
    setShowPasswordModal: (show: boolean) => void;
  }


// Account Settings Component
 const AccountSettings: React.FC<AccountSettingsProps> = ({ 
    setShowPasswordModal 
  }) => {
    return (
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Account Settings
        </h2>
        <div className='border-b mb-6'/>

        <div>
          <label className="block text-sm text-gray-600 mb-3">
            Change Password
          </label>
          <button 
            onClick={() => setShowPasswordModal(true)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
          >
            Change your password
          </button>
        </div>
      </section>
    );
  };

  export default AccountSettings;