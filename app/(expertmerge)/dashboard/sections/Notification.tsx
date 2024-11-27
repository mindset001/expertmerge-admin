'use client';

import { useState, useEffect, FC } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline'; // Import an icon for the 'X' button
import Link from 'next/link';
import { getAllNotification } from '@/app/api/services/endpoints/content';

interface Notification {
  id: number;
  title: string;
  description: string;
}

const NotificationItem: FC<{ notification: Notification; onDismiss: (id: number) => void }> = ({ notification, onDismiss }) => {
  return (
    <div className="w-full flex items-start gap-4">
      <div className="w-full flex justify-between mb-4 p-4 bg-white rounded-lg border border-[#E4E7EC] border-l-4 border-l-[#00626F]">
        <div>
          <h3 className="font-[500] text-[14px] text-[#101928]">
          {new Date(notification.title).toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(',', ' /')}
          </h3>
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
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { response, error } = await getAllNotification();
        if (response) {
          console.log('Fetched notifications:', response);
          const formattedNotifications = response.data.map((item: any) => ({
            id: item.id,
            title: item.createdAt || 'No Title',
            description: item.data || 'No Description',
          }));
          setNotifications(formattedNotifications);
        } else {
          console.error('API Error:', error);
        }
      } catch (err) {
        console.error('Unexpected Error:', err);
      }
    };

    fetchData();
  }, []);

  const handleDismiss = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <div className="w-[30%] p-4 bg-gray-50 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4 gap-4">
        <h2 className="text-[24px] font-[700] text-[#101928]">Admin Notifications</h2>
        <Link href="/notification" className="text-[#00626F] text-sm hover:underline">
          View all
        </Link>
      </div>

      <div>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onDismiss={handleDismiss}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;
