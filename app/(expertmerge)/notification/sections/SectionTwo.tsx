'use client'
import React, { useState, FC } from 'react';
import { toggleNotPref } from '@/app/api/services/endpoints/signup'; // Assuming this is the correct path

interface ToggleProps {
  label: string;
  description?: string;
  isEnabled: boolean;
  onToggle: () => void;
}

const Toggle: FC<ToggleProps> = ({ label, description, isEnabled, onToggle }) => {
  return (
    <div className="flex justify-between items-center py-2 border-b">
      <div>
        <span className="text-[14px] font-[400] text-[#667185]">{label}</span>
        {description && <p className="text-[9px] text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="flex items-center">
        <span className={`text-sm ${isEnabled ? 'text-[#667185]' : 'text-[#667185]'}`}>
          {isEnabled ? 'On' : 'Off'}
        </span>
        <button
          onClick={onToggle}
          className={`relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none mx-2 ${isEnabled ? 'bg-[#00626F]' : 'bg-[#667185]'}`}
        >
          <span className={`${isEnabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
        </button>
      </div>
    </div>
  );
};

const SuccessModal: FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
        <h2 className="text-lg font-semibold text-center">Success!</h2>
        <p className="mt-2 text-center">Your notification preference has been successfully updated.</p>
        <div className="mt-4 text-center">
          <button onClick={onClose} className="bg-[#00626F] text-white py-2 px-4 rounded-md">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationPreferences: FC = () => {
  const [preferences, setPreferences] = useState({
    sysAndSecurity: true,
    newAdmin: true,
    deletedAdmin: true,
    roleChange: true,
    adminContent: true,
    inAppNotifications: true,
    pushNotifications: false,
    email: true,
  });
  
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const togglePreference = async (preferenceKey: keyof typeof preferences) => {
    const newPreferenceState = !preferences[preferenceKey];
    setPreferences((prevState) => ({
      ...prevState,
      [preferenceKey]: newPreferenceState,
    }));
  
    const result = await toggleNotPref(preferenceKey, newPreferenceState);
    if (result.error) {
      console.error("Failed to update preference:", result.error);
      alert(`Error: ${result.error}`);
      setPreferences((prevState) => ({
        ...prevState,
        [preferenceKey]: !newPreferenceState,
      }));
    } else {
      console.log("Preference updated successfully:", result.response);
      setIsSuccessModalOpen(true);  // Open the success modal on success
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);  // Close the success modal
  };

  return (
    <div className="w-full max-h-[500px] overflow-auto scrollbar-hide p-6 bg-white rounded-[14px]">
      <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>

      <div className="space-y-4">
        <Toggle
          label="System and Security Notifications"
          isEnabled={preferences.sysAndSecurity}
          onToggle={() => togglePreference('sysAndSecurity')}
        />

        <Toggle
          label="New Admin Accounts Creation"
          isEnabled={preferences.newAdmin}
          onToggle={() => togglePreference('newAdmin')}
        />

        <Toggle
          label="Admin Account deletion"
          isEnabled={preferences.deletedAdmin}
          onToggle={() => togglePreference('deletedAdmin')}
        />

        <Toggle
          label="Admin Role Changes"
          isEnabled={preferences.roleChange}
          onToggle={() => togglePreference('roleChange')}
        />

        <Toggle
          label="Admin Content Moderation Actions"
          isEnabled={preferences.adminContent}
          onToggle={() => togglePreference('adminContent')}
        />

        <Toggle
          label="In-app notifications"
          description="Delivered inside the app"
          isEnabled={preferences.inAppNotifications}
          onToggle={() => togglePreference('inAppNotifications')}
        />

        <Toggle
          label="Push notifications"
          description="Pushed to your device immediately"
          isEnabled={preferences.pushNotifications}
          onToggle={() => togglePreference('pushNotifications')}
        />

        <Toggle
          label="Email"
          description="Sent on your primary email"
          isEnabled={preferences.email}
          onToggle={() => togglePreference('email')}
        />
      </div>

      <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
    </div>
  );
};

export default NotificationPreferences;
