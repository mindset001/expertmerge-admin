import React, { useState } from 'react';
import Avatar from '@/assets/matcap.jpeg';
import Frame from '@/assets/Frame.png';
import Image from 'next/image';
import ExpertButton from '@/components/buttons/ExpertButton';
import { Switch, Typography, Modal, Button, message } from "antd";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { blockUser, toggleView } from '@/app/api/services/endpoints/signup';

const { Text } = Typography;

function General() {
  const [checked, setChecked] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal state
  const { user } = useSelector((state: RootState) => state.profileSlice);

  function formatDOB(dob: string): string {
    const date = new Date(dob);
    return date.toLocaleDateString('en-US', { month: 'long', day: '2-digit' });
  }

  const handleToggleChange = async (checked: boolean) => {
    setChecked(checked);
    console.log('Toggle switch is:', checked ? 'On' : 'Off');

    // Call toggleView with the updated user settings
    const result = await toggleView({
      id: user.id,
      allowedToViewAll: checked,
    });

    if (result.response) {
      console.log("View status updated successfully");
      setIsModalVisible(true); // Show success modal
    } else {
      console.error("Failed to update view status:", result.error);
    }
  };

  // Function to handle closing the modal
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleBlockUser = async () => {
    const result = await blockUser({ userId: user.id });
    if (result.response) {
      console.log("User blocked successfully.");
      message.success("User has been blocked.");
    } else {
      console.error("Failed to block user:", result.error);
      message.error("Failed to block the user. Please try again.", result.error);
    }
  };

  return (
    <div className='flex gap-10'>
      {/* Success Modal */}
      <Modal
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={400}
      >
        <div className="flex flex-col items-center text-center">
          <h2 className="text-[#1D2739] text-[18px] font-[500]">
            {checked ? 'Approval Enabled' : 'Approval Disabled'}
          </h2>
          <p className="text-[#645D5D] text-[14px] font-[400] mt-2">
            {checked
              ? "New users will now require approval to access ExpertsMerge."
              : "New users can now access ExpertsMerge without approval."}
          </p>
          <ExpertButton text="Close" onClick={handleModalClose} fullWidth />
        </div>
      </Modal>

      <div className='w-[30%] flex flex-col items-center gap-4'>
        <div>
          <div>
            <Image src={user.bannerUrl} alt='frame' className='w-full h-[150px] z-0' width={200} height={200} />
          </div>
          <div className='mt-[-15%] ml-[25%] rounded-full w-[175px] h-[175px] bg-[white] flex justify-center items-center'>
            <Image src={user.imageUrl} alt='avatar' className='rounded-full w-[90%] h-[90%]' width={200} height={200} />
          </div>
        </div>
        <div className="w-[80%] flex items-center justify-between border rounded-[100px] border-[#0A424A] p-2">
          <Text className="mr-2">Allow to view all members</Text>
          <div className='flex items-center gap-2'>
            <p>On</p>
            <Switch
              checked={checked}
              onChange={handleToggleChange}
              className="ml-auto"
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-6 w-[60%]'>
        <div className='flex gap-6'>
          <div>
            <h3 className='text-[14px] font-[500] text-[#101928]'>Full Name</h3>
            <p className='text-[18px] font-[400] text-[#98A2B3]'>{user.name}</p>
          </div>
          <div>
            <h3 className='text-[14px] font-[500] text-[#101928]'>Date of Birth</h3>
            <p className='text-[18px] font-[400] text-[#98A2B3]'>{formatDOB(user.dob)}</p>
          </div>
          <div>
            <h3 className='text-[14px] font-[500] text-[#101928]'>Location</h3>
            <p className='text-[18px] font-[400] text-[#98A2B3]'>{user.address}</p>
          </div>
        </div>
        <div>
          <h3 className='text-[14px] font-[500] text-[#101928]'>Headline</h3>
          <p className='text-[18px] font-[400] text-[#98A2B3]'>
          {user.headline}
          </p>
        </div>
        <div>
          <h3 className='text-[14px] font-[500] text-[#101928]'>About</h3>
          <p className='text-[18px] font-[400] text-[#98A2B3]'>
          {user.about}
          </p>
        </div>

        <div>
          <ExpertButton
            text={`Block ${user?.name || "User"}`}
            onClick={handleBlockUser}
          />
        </div>
      </div>
    </div>
  );
}

export default General;
