import React, { useState, useEffect } from 'react';
import { SearchOutlined, DeleteOutlined, DownloadOutlined, } from '@ant-design/icons'; // Ant Design icons
import { Pagination, Input, Button, Table, Rate, Modal, Divider } from 'antd';
import Image from 'next/image';
import Avatar from '@/assets/matcap.jpeg'
import Icon from '@/components/icons/Icon';
import ExpertButton from '@/components/buttons/ExpertButton';


// Define the message structure
interface Message {
  id: number;
  user: string;
  message: string;
  time: string;
  date: string
}

// Sample data
const messagesData: Message[] = [
  { id: 1, user: 'Minerva Barnett', message: 'From Reported User Morgan on ', date: '2024-05-18 14:30:00', time: '8:13 AM' },
  { id: 2, user: 'John Doe', message: 'From Reported User Morgan on ', date: '2024-05-18 14:30:00', time: '9:45 AM' },
  { id: 3, user: 'Jane Smith', message: 'From Reported User Morgan on ', date: '2024-05-18 14:30:00', time: '10:30 AM' },
  { id: 4, user: 'Emma Watson', message: 'From Reported User Morgan on ', date: '2024-05-18 14:30:00', time: '11:15 AM' },
  { id: 5, user: 'Robert Brown', message: 'From Reported User Morgan on ', date: '2024-05-18 14:30:00', time: '12:00 PM' },
  { id: 6, user: 'Michael Scott', message: 'From Reported User Morgan on ', date: '2024-05-18 14:30:00', time: '12:30 PM' },
  { id: 7, user: 'Dwight Schrute', message: 'From Reported User Morgan on ', date: '2024-05-18 14:30:00', time: '12:45 PM' },
  { id: 8, user: 'Pam Beesly',message: 'From Reported User Morgan on ', date: '2024-05-18 14:30:00', time: '1:00 PM' },
  { id: 9, user: 'Jim Halpert', message: 'From Reported User Morgan on ', date: '2024-05-18 14:30:00', time: '1:15 PM' },
  { id: 10, user: 'Stanley Hudson', message: 'From Reported User Morgan on ', date: '2024-05-18 14:30:00', time: '1:30 PM' },
  { id: 11, user: 'Kelly Kapoor', message: 'From Reported User Morgan on ', date: '2024-05-18 14:30:00', time: '2:00 PM' },
  { id: 12, user: 'Toby Flenderson', message: 'From Reported User Morgan on ', date: '2024-05-18 14:30:00', time: '2:15 PM' },
  { id: 13, user: 'Creed Bratton', message: 'From Reported User Morgan on ', date: '2024-05-18 14:30:00', time: '2:30 PM' },
  { id: 14, user: 'Ryan Howard', message: 'From Reported User Morgan on ', date: '2024-05-18 14:30:00', time: '2:45 PM' },
  // Add more messages as needed
];

export default function MessagesList() {
  const [messages, setMessages] = useState<Message[]>([]); // Correctly typed state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4); // Control number of items per page
  const [totalMessages, setTotalMessages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  // Fetch messages (could be from an API)
  useEffect(() => {
    const fetchMessages = () => {
      // Simulate an API call
      setMessages(messagesData.slice(0, pageSize)); // Pagination: first page
      setTotalMessages(messagesData.length); // Total number of messages
    };
    fetchMessages();
  }, [pageSize]);

  // Handle pagination
  const onPageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);

    // Simulate fetching new messages based on the current page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    setMessages(messagesData.slice(startIndex, endIndex)); // Update visible messages
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Apply search filtering logic (e.g., API or local filter)
  };

  // Handle report functionality
  const handleReport = (message: Message) => {
    setSelectedMessage(message); // Set selected message data
    setIsModalVisible(true); // Open modal
  }


  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Define columns for Ant Design Table
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
        render: () => <Rate count={1}/>,
        width: '2%',
      },
    {
    //   title: 'User',
      dataIndex: 'user',
      render: (text: string) => (
        <span className="flex items-center gap-2 p-2">
          <span className="rounded-full bg-[#E3EFFC] text-[#1671D9] bold-[700] w-[24px] h-[24px] flex justify-center">
            <p>M</p>
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
        // title: 'Message',
        render: (_: any, record: Message) => (
          <span className="flex items-center gap-2 p-2">
           
            <span>
              {record.message}
              <strong>{record.date}</strong> {/* Render the date in bold */}
            </span>
          </span>
        ),
        width: '40%',
      },
    {
    //   title: 'Time',
      dataIndex: 'time',
      width: '10%',
    },
  ];

  return (
    <div className="w-full p-4">
      {/* Search bar */}
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleSearch}
          prefix={<SearchOutlined />}
          className="w-full max-w-lg"
        />

        {/* Action buttons */}
        <div className="flex items-center gap-2">
        <div className="flex justify-between items-center">
        <span className="text-[12px]">Showing {pageSize * (currentPage - 1) + 1}-{Math.min(pageSize * currentPage, totalMessages)} of {totalMessages}</span>
        <Pagination
          current={currentPage}
          total={totalMessages}
          pageSize={pageSize}
          onChange={onPageChange}
          showSizeChanger={false} // Hide page size changer if unnecessary
        />
      </div>
      <div className="flex items-center justify-center gap-2 bg-[#F5F7FA] p-2 rounded-lg border">
      <Button icon={<DownloadOutlined />} size="large" className="flex items-center justify-center">
        {/* Download button */}
      </Button>
      <div className="border-l border-gray-300" />
      <Button icon={<DeleteOutlined />} size="large" danger className="flex items-center justify-center">
        {/* Delete button */}
      </Button>
    </div>
        </div>
      </div>

      {/* Table for displaying messages */}
      <Table dataSource={messages} columns={columns} rowKey="id" pagination={false} />
{/* modal  */}
<Modal
  title="Report"
  visible={isModalVisible}
  onCancel={closeModal}
  footer={null}
  width={700}
>
  {selectedMessage && (
    <div className='px-10'>
      {/* Dynamically display the selected message's details */}
     

      <Divider/>
      <h2 className='font-[500] text-[#101928] text-[16px] mb-4'>Reporting User:</h2>
      <div className='flex gap-2'>
        <Image src={Avatar} alt='' className='rounded-full w-[60px] h-[60px]'/>
        <div>
       <div className='flex items-center gap-2'>
       <p className='text-[#667185] font-[500] text-[24px]'>{selectedMessage.user}  </p>
       <Icon name='blue-check'/>
       </div>
        <p className='text-[#98A2B3] font-[400] text-[14px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas alias ipsa similique pariatur rerum quisquam deserunt adipisci, facilis amet. Quas.</p>
        </div>
      </div>

      <Divider/>

      <div className='mt-6'>
      <h2 className='font-[500] text-[#101928] text-[16px] mb-4'>Reported User:</h2>
      <div className='flex gap-2'>
        <Image src={Avatar} alt='' className='rounded-full w-[60px] h-[60px]'/>
        <div>
       <div className='flex items-center justify-between'>
      <div className='flex items-center gap-2'>
      <p className='text-[#667185] font-[500] text-[24px]'>{selectedMessage.user}  </p>
      <Icon name='blue-check'/>
      </div>
       <div><p className='text-[#98A2B3] '>13 warned</p></div>
       </div>
        <p className='text-[#98A2B3] font-[400] text-[14px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas alias ipsa similique pariatur rerum quisquam deserunt adipisci, facilis amet. Quas.</p>
        </div>
      </div>
      </div>
    
  
      {/* Buttons for actions */}
      <div className='flex gap-2 mt-4'>
      <ExpertButton 
        text='Suspend'
        onClick={closeModal}
      />
       <ExpertButton 
       outlined
        text='Ignore'
        onClick={closeModal}
      />
  
      <button className='text-[#D42620] font-[400] text-[12px]'>warn {selectedMessage.user} </button>
      </div>

      <Divider/>

      <div className='mt-6'>
      <h2 className='font-[500] text-[#101928] text-[16px] mb-4'>Reported Reason:</h2>
      <div className='flex gap-2'>
        
        <div className='flex gap-2'>
       
        <p className='text-[#98A2B3] font-[400] text-[14px]'>{selectedMessage.message}{', '}</p>
        <p className='text-[#98A2B3] font-[400] text-[14px]'>{selectedMessage.date}</p>
        </div>
      </div>
      </div>

    </div>
  )}
</Modal>

    
    </div>
  );
}
