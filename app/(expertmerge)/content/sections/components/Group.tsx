import React, { useEffect, useState } from "react";
import { Modal, Button, Pagination, Select, Input } from "antd";
import ExpertButton from "@/components/buttons/ExpertButton";
import Avatar from '@/assets/matcap.jpeg'
import Image, { StaticImageData } from "next/image";
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import Icon from "@/components/icons/Icon";
import { getAllGroups } from "@/app/api/services/endpoints/content";

// Define the group data type
type Group = {
    id: number;
    name: string;
    members: number;
    description: string;
    location: string;
    imageUrl: string | StaticImageData;
};

const itemsPerPage = 4; // Define how many groups per page

const GroupList = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('Newest reported');
    const [details, setDetails] = useState<Group[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { response, error } = await getAllGroups();
            if (response) {
                console.log("group info:", response.data);
                const dataWithKeys = response.data.map((group: any, index: number) => ({
                    id: group.id,
                    name: group.name,
                    members: group.members.length || 0,
                    description: group.description || "No description available",
                    location: group.location || "No location provided",
                    imageUrl: group.groupPicture || Avatar,
                }));
                setDetails(dataWithKeys);
            } else {
                console.log("API Error:", error);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (value: string) => {
        setSortOrder(value);
        // Implement sorting logic if necessary
    };

    const showGroupModal = (group: Group) => {
        setSelectedGroup(group);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedGroup(null);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Filter and paginate the group data
    const filteredData = details.filter(group =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="border p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold mr-4 text-[#1D2739]">Group info</h1>
                    <Button
                        icon={<ReloadOutlined />}
                        className="text-gray-500 hover:text-black border-none bg-transparent"
                        onClick={() => window.location.reload()} // Dummy reload for now
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Select
                        defaultValue={sortOrder}
                        onChange={handleSortChange}
                        className="w-[200px] rounded-md"
                    >
                        <Select.Option value="Newest reported">Newest reported</Select.Option>
                        <Select.Option value="Oldest reported">Oldest reported</Select.Option>
                        <Select.Option value="Most reported">Most reported</Select.Option>
                    </Select>

                    <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        prefix={<SearchOutlined />}
                        className="w-[250px] rounded-md"
                    />
                </div>
            </div>

            <div className="group-list grid grid-cols-4 gap-4">
                {paginatedData.map((group) => (
                    <div key={group.id} className="group-card border rounded">
                        <div className="w-full rounded-tl-lg rounded-tr-lg h-[100px] bg-[#5E6D0033]" />
                        <div className="p-4">
                            <div className="bg-white rounded-full flex justify-center items-center w-[80px] h-[80px] mt-[-15%] ml-[35%]">
                                <Image
                                    src={group.imageUrl}
                                    alt={group.name}
                                    width={70}
                                    height={70}
                                    className="rounded-full w-[70px] h-[70px]"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-[#1D2739] font-[500] text-[20px]">{group.name}</h3>
                                <p className="text-[#98A2B3] text-[13px] font-[400]">{group.members.toLocaleString()} members</p>
                                <p onClick={() => showGroupModal(group)} className="cursor-pointer mt-4 text-[#0A424A] font-[400] text-[10px] mb-2">View Group Info</p>
                            </div>

                            <div>
                                <ExpertButton fullWidth text='Block' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={filteredData.length}
                onChange={handlePageChange}
                className="mt-4 text-center"
            />

            {selectedGroup && (
                <Modal
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    width={500}
                >
                    <div className="flex flex-col gap-4">
                        <div className="w-full rounded-tl-lg rounded-tr-lg h-[100px] bg-[#5E6D0033]" />
                        <div className="flex">
                            <div className="bg-white rounded-full flex justify-center items-center w-[80px] h-[80px] mt-[-10%] ml-[5%]">
                                <Image
                                    src={selectedGroup.imageUrl}
                                    alt={selectedGroup.name}
                                    width={70}
                                    height={70}
                                    className="rounded-full"
                                />
                            </div>
                            <div>
                                <h2 className="text-[#1D2739] font-[500] text-[20px] mt-[-5px]">{selectedGroup.name}</h2>
                            </div>
                        </div>
                        <div>
                            <p className="text-[#344054] text-[14px] font-[400] mb-4">{selectedGroup.description}</p>
                            <div className="flex mb-4 gap-2">
                                <p className="text-[#667185] font-[500] text-[14px]"> {selectedGroup.location}</p>
                                <p className="text-[#667185] font-[400] text-[14px]"> {selectedGroup.members.toLocaleString()} members</p>
                            </div>
                            <div className="flex gap-4">
                                <ExpertButton text='Block' />
                                <ExpertButton outlined text='Warn admin' />
                            </div>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-[#667185] font-[500] text-[14px]">Group Admin:</h2>

                            <div className="flex gap-2 items-center mt-4">
                                <Image
                                    src={selectedGroup.imageUrl}
                                    alt={selectedGroup.name}
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />
                                <div>
                                    <div className="flex gap-2">
                                        <h1>Daniel Obaleye</h1>
                                        <Icon name="blue-check" />
                                    </div>
                                    <p className="text-[#98A2B3] text-[8px] font-[400]">Creative Brand/Product Designer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default GroupList;
