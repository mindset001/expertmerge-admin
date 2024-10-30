import React, { useState, useEffect } from 'react';
import { SearchOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { Pagination, Input, Button, Table, Rate, Modal, Divider } from 'antd';
import Image from 'next/image';
import Avatar from '@/assets/matcap.jpeg';
import Icon from '@/components/icons/Icon';
import ExpertButton from '@/components/buttons/ExpertButton';
import { getReport } from '@/app/api/services/endpoints/reports';

interface Message {
  id: number;
  user: string;
  message: string;
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

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await getReport();
      if (response) {
        const dataWithKeys = response.data.map((user: any, index: number) => ({
          key: index + 1,
          user: `${user.firstName} ${user.lastName}`,
          message: user.message || "No message provided",
          time: user.time || "No time available",
          date: user.date || "No date available",
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

  const handleReport = (message: Message) => {
    setSelectedMessage(message);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
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
      dataIndex: 'user',
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
            {record.message}
            <strong>{record.date}</strong>
          </span>
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
        {selectedMessage && (
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
                <p className="text-[#98A2B3] font-normal text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas alias ipsa similique pariatur rerum quisquam.
                </p>
              </div>
            </div>
            <Divider />
            <div className="mt-6">
              <h2 className="font-medium text-[#101928] text-lg mb-4">Reported User:</h2>
              <div className="flex gap-2">
                <Image src={Avatar} alt="" className="rounded-full w-[60px] h-[60px]" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[#667185] font-medium text-xl">{selectedMessage.user}</p>
                    <Icon name="blue-check" />
                  </div>
                  <p className="text-[#98A2B3] font-normal text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
            <Divider />
            <div className="mt-6">
              <h2 className="font-medium text-[#101928] text-lg mb-4">Reported Reason:</h2>
              <p className="text-[#98A2B3] font-normal text-sm">{selectedMessage.message}, {selectedMessage.date}</p>
            </div>
            <Divider />
            <div className="flex gap-2 mt-4">
              <ExpertButton text="Suspend" onClick={closeModal} />
              <ExpertButton outlined text="Ignore" onClick={closeModal} />
              <button className="text-[#D42620] font-normal text-xs">
                warn {selectedMessage.user}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
