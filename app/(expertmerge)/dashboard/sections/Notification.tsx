'use client';
import { useState, FC } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline'; // Import an icon for the 'X' button

interface Notification {
  id: number;
  title: string;
  description: string;
}

const NotificationItem: FC<{ notification: Notification; onDismiss: (id: number) => void }> = ({ notification, onDismiss }) => {
  return (
    <div className='w-full flex items-start gap-4'>
        <div className="w-full flex justify-between mb-4 p-4 bg-white rounded-lg border border-[#E4E7EC] border-l-4 border-l-[#00626F]">
      <div className=''>
        <h3 className="font-[500] text-[14px] text-[#101928]">{notification.title}</h3>
        <p className="text-[14px] font-[400] text-[#475367]">{notification.description}</p>
      </div>
      <button onClick={() => onDismiss(notification.id)}>
        <XMarkIcon className="h-5 w-5 text-[#000000] hover:text-gray-600" />
      </button>
    </div>
    </div>
  );
};

const AdminNotifications: FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: 'Admin Activity Notifications', description: 'A new admin account has been created on Expertsmerge.' },
    { id: 2, title: 'Recent Login to Window XER', description: 'A new admin account has been created on Expertsmerge.' },
    { id: 3, title: 'Admin Role Changes', description: 'A new admin account has been created on Expertsmerge.' },
  ]);

  const handleDismiss = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <div className=" w-[30%] p-4 bg-gray-50 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4 gap-4">
        <h2 className="text-[24px] font-[700] text-[#101928]">Admin Notifications</h2>
        <a href="#" className="text-[#00626F] text-sm hover:underline">View all</a>
      </div>

      <div>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onDismiss={handleDismiss}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminNotifications;
