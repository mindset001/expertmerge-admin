import React, { useEffect, useState } from "react";
import { Modal, Button, Pagination, Select, Input } from "antd";
import ExpertButton from "@/components/buttons/ExpertButton";
import Avatar from '@/assets/matcap.jpeg';
import Image, { StaticImageData } from "next/image";
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import Icon from "@/components/icons/Icon";
import { getAllForums } from "@/app/api/services/endpoints/content";

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

const ForumList = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('Newest reported');
    const [details, setDetails] = useState<Group[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { response, error } = await getAllForums();
            if (response) {
                console.log("group info:", response.data);
                const dataWithKeys = response.data.map((group: any) => ({
                    id: group.id,
                    name: group.name,
                    members: group.members ? group.members.length : 0,
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
    };

    const showGroupModal = (group: Group) => {
        setSelectedGroup(group);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedGroup(null); // Clear selected group when modal is closed
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Paginate and filter the group data
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
                        onClick={() => window.location.reload()}
                    />
                </div>

                <div className="flex items-center gap-2">
                    {/* Dropdown for sorting */}
                    <Select
                        defaultValue={sortOrder}
                        onChange={handleSortChange}
                        className="w-[200px] rounded-md"
                    >
                        <Select.Option value="Newest reported">Newest reported</Select.Option>
                        <Select.Option value="Oldest reported">Oldest reported</Select.Option>
                        <Select.Option value="Most reported">Most reported</Select.Option>
                    </Select>

                    {/* Search bar */}
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
                        <div className="w-full rounded-tl-lg rounded-tr-lg h-[100px] bg-[#5E6D0033]"></div>
                        <div className="p-4">
                            <div className="flex justify-between items-center">
                                <div className="bg-white rounded-full flex justify-center items-center w-[80px] h-[80px] mt-[-15%] ml-[5%]">
                                    <Image
                                        src={group.imageUrl}
                                        alt={group.name}
                                        width={70}
                                        height={70}
                                        className="rounded-full  w-[70px] h-[70px]"
                                    />
                                </div>
                                <div className="mt-[-5%]">
                                    <ExpertButton
                                        text="view"
                                        onClick={() => showGroupModal(group)}
                                    />
                                </div>
                            </div>
                            <div className="text-left">
                                <h3 className="text-[#1D2739] font-[500] text-[20px]">{group.name}</h3>
                                <p className="text-[#98A2B3] text-[13px] font-[400]">{group.description}</p>
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
                        <div className="w-full rounded-tl-lg rounded-tr-lg h-[100px] bg-[#5E6D0033]"></div>
                        <div className="flex justify-between">
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
                                <h2 className="text-[#475367] font-[500] text-[14px] mt-[-5px] border rounded-lg p-2 bg-[#F0F2F5]">
                                    {selectedGroup.members.toLocaleString()} joined
                                </h2>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-[#1D2739] font-[500] text-[20px]">{selectedGroup.name}</h1>
                            <p className="text-[#344054] text-[14px] font-[400] mb-4">{selectedGroup.description}</p>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex gap-4">
                                <ExpertButton text="Block" />
                                <ExpertButton outlined text="Warn admin" />
                            </div>
                            <div>
                                <h2 className="text-[#667185] font-[500] text-[14px]">Group Admin:</h2>
                                <div className="flex gap-2 items-center">
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
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ForumList;
