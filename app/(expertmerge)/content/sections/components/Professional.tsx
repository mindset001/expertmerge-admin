import React, { useEffect, useState } from "react";
import { Table, Input, Modal, Button, Checkbox } from "antd";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import Avatar from '@/assets/matcap.jpeg';
import ExpertButton from "@/components/buttons/ExpertButton";
import Delete from "@/components/icons/delete";
import { getUsers } from "@/app/api/services/endpoints/content";

// Define the type for a profile
type Profile = {
    key: number;
    name: string;
   
    location: {
        city:string;
        country: string;
    }
    phone: string;
    email: string;
    about: string;
    post: string;
    profileLink: string;
    imageUrl: string;
};

const ProfessionalProfile = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [details, setDetails] = useState<Profile[]>([]); // Set initial type as an empty array

    useEffect(() => {
        const fetchData = async () => {
            const { response, error } = await getUsers();
            if (response) {
                console.log("API Response:", response.data);
                // Ensure response data matches the Profile structure or map it accordingly
                const dataWithKeys = response.data.map((user: any, index: number) => ({
                    key: index + 1, // Add a unique key for each row
                    name: `${user.firstName} ${user.lastName}`,
                    address: `${user.location.city}, ${user.location.country}`,
                    phone: user.phone,
                    email: user.email,
                    about: user.about || "N/A",
                    post: user.post || "N/A",
                    profileLink: user.profileLink || "N/A",
                    imageUrl: user.profilePicture || Avatar,
                }));
                setDetails(dataWithKeys);
            } else {
                console.log("API Error:", error);
            }
        };

        fetchData();
    }, []);

    const showProfileModal = (profile: Profile) => {
        setSelectedProfile(profile);
        setIsModalVisible(true);
    };

    const handleOk = () => setIsModalVisible(false);
    const handleCancel = () => setIsModalVisible(false);

    const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: Profile[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
        console.log("Selected rows: ", selectedRows);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = [
        { title: "SN", dataIndex: "key", key: "key" },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Address", dataIndex: "address", key: "address" },
        { title: "Phone number", dataIndex: "phone", key: "phone" },
        { title: "Email address", dataIndex: "email", key: "email" },
        {
            title: "Profile link",
            dataIndex: "profileLink",
            key: "profileLink",
            render: (text: string) => <a href={text}>{text}</a>,
        },
    ];

    return (
        <div className="p-4 border rounded-lg bg-white">
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-[#1D2739] text-[25px] font-[700]">Professional Profile</h1>
                    <div className="flex gap-2 items-center">
                        <Checkbox />
                        <ReloadOutlined />
                        <Delete />
                    </div>
                </div>
                <div className="flex gap-4 items-end mb-4">
                    <Input
                        placeholder="Search..."
                        prefix={<SearchOutlined />}
                        className="w-64"
                    />
                    <Button>Newest accounts</Button>
                </div>
            </div>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={details} // Use `details` instead of `professionalData`
                onRow={(record) => {
                    return {
                        onClick: () => showProfileModal(record),
                    };
                }}
                pagination={{ pageSize: 5 }}
                rowClassName="cursor-pointer"
            />
            <Modal
                title="User profile"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={600}
            >
                {selectedProfile && (
                    <div className="flex gap-4 flex-col border rounded-lg p-4 border-[#CFF9FF]">
                        <div className="flex gap-[10px]">
                            <Image
                                src={typeof selectedProfile.imageUrl === 'string' ? selectedProfile.imageUrl : Avatar}
                                alt="profile"
                                width={50}
                                height={40}
                                className="rounded-full"
                            />
                            <div>
                                <h3 className="text-[#1D2739] font-[500] text-[18px]">{selectedProfile.name}</h3>
                                <p className="text-[#98A2B3] font-[400] text-[12px]">{selectedProfile.about}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-[#667185] font-[400] text-[14px]">{selectedProfile.post}</p>
                        </div>
                        <div className="ml-4">
                            <div className="flex gap-4">
                                <ExpertButton text="Suspend Account" />
                                <ExpertButton outlined text="Back" onClick={handleCancel} />
                                <button className="text-[#D42620]">Warn {selectedProfile.name}</button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ProfessionalProfile;
