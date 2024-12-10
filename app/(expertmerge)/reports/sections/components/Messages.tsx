import React, { useState, useEffect } from 'react';
import { SearchOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { Pagination, Input, Button, Table, Rate, Modal, Divider, message } from 'antd';
import Image from 'next/image';
import Avatar from '@/assets/matcap.jpeg';
import Icon from '@/components/icons/Icon';
import ExpertButton from '@/components/buttons/ExpertButton';
import { getReport, getSingleReport, suspendUser } from '@/app/api/services/endpoints/reports';

interface Message {
  name: string;
  id: string;
  user: string;
  text: string;
  time: string;
  date: string;
}

export default function MessagesList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalMessages, setTotalMessages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [details, setDetails] = useState<Message[]>([]);
  const [singleReport, setSingleReport] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      
      
      const { response, error } = await getReport();
      console.log('Reports', response.data);
      if (response) {
        const dataWithKeys = response.data.map((user: any, index: number) => ({
          key: index + 1,
          id: user._id,
          name: `${user.userReported?.firstName || ''} ${user.userReported?.lastName || ''}`,
          text: user.text || "No message provided",
          time: user.updatedAt ? new Date(user.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "No time available",
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
    // Add search filtering logic here if needed
  };

  const handleReport = async (message: Message) => {
    setSelectedMessage(message);
    setIsModalVisible(true);

    // Fetch single report using the _id
    const { response, error } = await getSingleReport({ reportId: message.id });

    if (response) {
      console.log(response.result, 'single report');
      
      setSingleReport(response.result); // Store fetched report details
    } else {
      console.error("Failed to fetch single report:", error);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSingleReport(null); // Clear report details when closing the modal
  };

  const handleSuspend = async () => {
    if (!singleReport || !singleReport._id) {
      console.error("No user selected for suspension");
      return;
    }
  
    try {
      const { response, error } = await suspendUser({ userId: singleReport.userReported._id });
  
      if (response) {
        console.log("User suspended successfully:", response);
        message.success("User suspended successfully:")
        // Close the modal and optionally refresh data
        setIsModalVisible(false);
      } else if (error) {
        console.error("Error suspending user:", error);
        message.error("Suspending User Failed:", error)
        // Provide error feedback (e.g., notification or toast)
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      // Provide error feedback
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
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleSearch}
          prefix={<SearchOutlined />}
          className="w-full max-w-lg"
        />

        <div className="flex items-center gap-2">
          <div className="text-sm">
            Showing {pageSize * (currentPage - 1) + 1}-{Math.min(pageSize * currentPage, totalMessages)} of {totalMessages}
          </div>
          <Pagination
            current={currentPage}
            total={totalMessages}
            pageSize={pageSize}
            onChange={onPageChange}
            showSizeChanger={false}
          />
          <div className="flex items-center gap-2 bg-[#F5F7FA] p-2 rounded-lg border">
            <Button icon={<DownloadOutlined />} size="large" />
            <div className="border-l border-gray-300" />
            <Button icon={<DeleteOutlined />} size="large" danger />
          </div>
        </div>
      </div>

      <Table dataSource={messages} columns={columns} rowKey="id" pagination={false} />

      <Modal
  title="Report"
  open={isModalVisible}
  onCancel={closeModal}
  footer={null}
  width={700}
>
  {singleReport ? (
    <div className="px-10">
      <Divider />
      <h2 className="font-medium text-[#101928] text-lg mb-4">Reporting User:</h2>
      <div className="flex gap-2">
        <Image src={Avatar} alt="" className="rounded-full w-[60px] h-[60px]" />
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[#667185] font-medium text-xl">{singleReport.reporter.firstName} {singleReport.reporter.lastName}</p>
            <Icon name="blue-check" />
          </div>
          <p className="text-[#98A2B3] font-normal text-sm">
            {singleReport.reporter.firstName || "No description available."}
          </p>
        </div>
      </div>
      <Divider />

      <h2 className="font-medium text-[#101928] text-lg mb-4">Reported User:</h2>
      <div className="flex gap-2">
        <Image src={Avatar} alt="" className="rounded-full w-[60px] h-[60px]" />
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[#667185] font-medium text-xl">{singleReport.userReported.firstName} {singleReport.userReported.lastName}</p>
            <Icon name="blue-check" />
          </div>
          <p className="text-[#98A2B3] font-normal text-sm">
            {singleReport.userReported.firstName || "No description available."}
          </p>
        </div>
      </div>
      <Divider />

      <h2 className="font-medium text-[#101928] text-lg mb-4">Reported Reason:</h2>
      <p className="text-[#98A2B3] font-normal text-sm">
        {singleReport.text || "No reason provided."}
      </p>
      <Divider />

      <h2 className="font-medium text-[#101928] text-lg mb-4">Report Details:</h2>
      <p className="text-[#98A2B3] font-normal text-sm">
        this report was made on {singleReport.updatedAt
    ? new Date(singleReport.updatedAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }) +
      ' at ' +
      new Date(singleReport.updatedAt).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    : "No additional details available."}
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
