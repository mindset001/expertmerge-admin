'use client';
import { useState, FC } from 'react';

// Define the props type for the Toggle component
interface ToggleProps {
  label: string;
  description?: string;
  isEnabled: boolean;
  onToggle: () => void; // Function type for onToggle
}

const Toggle: FC<ToggleProps> = ({ label, description, isEnabled, onToggle }) => {
  return (
    <div className="flex justify-between items-center py-2 border-b">
      <div>
      <span className="text-[14px] font-[400] text-[#667185]">{label}</span>
      {description && <p className="text-[9px] text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="flex items-center">
        {/* Show the label based on the toggle state */}
        <span className={`text-sm ${isEnabled ? 'text-[#667185]' : 'text-[#667185]'}`}>
          {isEnabled ? 'On' : 'Off'}
        </span>
        <button
          onClick={onToggle}
          className={`relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none mx-2 ${
            isEnabled ? 'bg-[#00626F]' : 'bg-[#667185]' // Custom colors for on and off states
          }`}
        >
          <span
            className={`${
              isEnabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </button>
      </div>
    </div>
  );
};

const NotificationPreferences: FC = () => {
  const [preferences, setPreferences] = useState({
    systemSecurityNotifications: true,
    newAdminCreation: true,
    adminAccountDeletion: true,
    adminRoleChanges: true,
    adminContentModeration: true,
    inAppNotifications: true,
    pushNotifications: false,
    emailNotifications: true,
  });

  const togglePreference = (preferenceKey: keyof typeof preferences) => {
    setPreferences((prevState) => ({
      ...prevState,
      [preferenceKey]: !prevState[preferenceKey],
    }));
  };

  return (
    <div className="w-full max-h-[500px] overflow-auto scrollbar-hide p-6 bg-white  rounded-[14px]">
      <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>

      <div className="space-y-4">
        {/* Notification Toggle */}
        <Toggle
          label="System and Security Notifications"
          isEnabled={preferences.systemSecurityNotifications}
          onToggle={() => togglePreference('systemSecurityNotifications')}
        />

        <Toggle
          label="New Admin Accounts Creation"
          isEnabled={preferences.newAdminCreation}
          onToggle={() => togglePreference('newAdminCreation')}
        />

        <Toggle
          label="Admin Account deletion"
          isEnabled={preferences.adminAccountDeletion}
          onToggle={() => togglePreference('adminAccountDeletion')}
        />

        <Toggle
          label="Admin Role Changes"
          isEnabled={preferences.adminRoleChanges}
          onToggle={() => togglePreference('adminRoleChanges')}
        />

        <Toggle
          label="Admin Content Moderation Actions"
          isEnabled={preferences.adminContentModeration}
          onToggle={() => togglePreference('adminContentModeration')}
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
          isEnabled={preferences.emailNotifications}
          onToggle={() => togglePreference('emailNotifications')}
        />
      </div>
    </div>
  );
};

export default NotificationPreferences;
