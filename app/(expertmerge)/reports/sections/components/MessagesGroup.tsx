import React, { useState, useEffect } from 'react';
import { SearchOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { Pagination, Input, Button, Table, Rate, Modal, Divider, message } from 'antd';
import Image from 'next/image';
import Avatar from '@/assets/matcap.jpeg';
import Icon from '@/components/icons/Icon';
import ExpertButton from '@/components/buttons/ExpertButton';
import { getGroupReport, getSingleReport, suspendUser } from '@/app/api/services/endpoints/reports';
import { blockGroup } from '@/app/api/services/endpoints/content';

interface Message {
  name: string;
  id: string;
  user: string;
  text: string;
  time: string;
  date: string;
  groupReported: {name:string}
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalMessages, setTotalMessages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [details, setDetails] = useState<Message[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await getGroupReport();
      console.log('Group Reports', response);
      if (response) {
        const dataWithKeys = response.map((user: any, index: number) => ({
          key: index + 1,
          id: user._id,
          name: user.groupReported?.name || '',
          user: `${user.reporter?.firstName || ''} ${user.reporter?.lastName || ''}`.trim(),
          text: user.text || "No message provided",
          time: user.updatedAt
            ? new Date(user.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : "No time available",
          date: user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "No date available",
        }));
        setDetails(dataWithKeys);
        setTotalMessages(dataWithKeys.length);
        setMessages(dataWithKeys.slice(0, pageSize)); // Initial pagination
      } else {
        console.log("API Error:", error);
      }
    };
    fetchData();
  }, [pageSize]);

  const onPageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    const startIndex = (page - 1) * pageSize;
    setMessages(details.slice(startIndex, startIndex + pageSize));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleReport = (message: Message) => {
    setSelectedMessage(message);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedMessage(null); // Clear selected message when closing the modal
  };

  const handleSuspend = async () => {
    if (!selectedMessage || !selectedMessage.id) {
      console.error("No group selected for suspension");
      return;
    }
  
    try {
      const { response, error } = await blockGroup(selectedMessage.id); // Pass groupId directly
  
      if (response) {
        console.log("Group suspended successfully:", response);
        message.success("Group suspended successfully");
        setIsModalVisible(false);
      } else if (error) {
        console.error("Error suspending group:", error);
        message.error(`Suspending Group Failed: ${error}`);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      message.error("An unexpected error occurred while suspending the group.");
    }
  };
  

  const columns = [
    {
      title: '',
      dataIndex: 'star',
      render: () => <input type="checkbox" />,
      width: '2%',
    },
    {
      title: '',
      dataIndex: 'star',
      render: () => <Rate count={1} />,
      width: '2%',
    },
    {
      dataIndex: 'name',
      render: (text: string) => (
        <span className="flex items-center gap-2 p-2">
          <span className="rounded-full bg-[#E3EFFC] text-[#1671D9] font-bold w-[24px] h-[24px] flex justify-center items-center">
            {text.charAt(0)}
          </span>{' '}
          {text}
        </span>
      ),
      width: '15%',
    },
    {
      title: '',
      dataIndex: 'report',
      render: (_: any, record: Message) => (
        <Button
          onClick={() => handleReport(record)}
          className="bg-orange-100 text-[#FD9A56] px-3 rounded-md border-none"
        >
          Report
        </Button>
      ),
      width: '5%',
    },
    {
      render: (_: any, record: Message) => (
        <span className="flex items-center gap-2 p-2">
          <span>
            {record.text}
          </span>
          <strong>{record.date}</strong>
        </span>
      ),
      width: '40%',
    },
    {
      dataIndex: 'time',
      width: '10%',
    },
  ];

  return (
    <div className="w-full p-4">
      <div>
        <h1>Reported Groups</h1>
      </div>
      <Table dataSource={messages} columns={columns} rowKey="id" pagination={false} />

      <Modal
        title="Report"
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width={700}
      >
        {selectedMessage ? (
          <div className="px-10">
            <Divider />
            <h2 className="font-medium text-[#101928] text-lg mb-4">Reporting User:</h2>
            <div className="flex gap-2">
              <Image src={Avatar} alt="" className="rounded-full w-[60px] h-[60px]" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[#667185] font-medium text-xl">{selectedMessage.user}</p>
                  <Icon name="blue-check" />
                </div>
              </div>
            </div>
            <Divider />

            <h2 className="font-medium text-[#101928] text-lg mb-4">Reported Reason:</h2>
            <p className="text-[#98A2B3] font-normal text-sm">
              {selectedMessage.text || "No reason provided."}
            </p>
            <Divider />

            <h2 className="font-medium text-[#101928] text-lg mb-4">Report Details:</h2>
            <p className="text-[#98A2B3] font-normal text-sm">
              This report was made on {selectedMessage.date || "No date available."}
            </p>
            <Divider />

            <div className="flex gap-2 mt-4">
              <ExpertButton text="Suspend" onClick={handleSuspend} />
              <ExpertButton outlined text="Ignore" onClick={closeModal} />
            </div>
          </div>
        ) : (
          <p>Loading report details...</p>
        )}
      </Modal>
    </div>
  );
}

