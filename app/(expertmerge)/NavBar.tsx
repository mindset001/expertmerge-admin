"use client";

import { useEffect, useState } from "react";
import MenuBtn from "@/components/buttons/MenuBtn";
import Icon from "@/components/icons/Icon";
import { NavBarMenuListProps } from "@/types";
import { SearchOutlined } from "@ant-design/icons";
import Avatar from "@/assets/matcap.jpeg";
import { Select } from "antd";
import Link from "next/link";
import Image from "next/image";
import { getAdminDetails } from "../api/services/endpoints/content";

const NavBar = () => {
  const [adminDetails, setAdminDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const adminId = "exampleAdminId"; // Replace with the actual admin ID logic
        const { response, error } = await getAdminDetails(adminId);
        if (response) {
          setAdminDetails(response);
        } else if (error) {
          setError(error);
        }
      } catch (err) {
        setError("An unexpected error occurred while fetching admin details.");
      }
    };

    fetchAdminDetails();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    console.log("Sign out clicked");
    // Add sign-out logic here
  };

  const handleChangePassword = () => {
    console.log("Change password clicked");
    // Add change password logic here
  };

  const menuBtn: NavBarMenuListProps[] = [
    { route: "dashboard", text: "Dashboard" },
    { route: "reports", text: "Reports" },
    { route: "content", text: "Content" },
    { route: "data", text: "Data" },
    {
      text: "Accounts",
      options: [
        { value: "admin", label: "Admin Accounts", route: "admin-account" },
        { value: "user", label: "User Accounts", route: "user-account" },
      ],
    },
    { text: "Verification", route: "verification" },
    { text: "Sign up Request", route: "signup" },
    { text: "Notification", route: "notification" },
  ];

  return (
    <div className="h-[88.96px] gap-8 bg-white border-b border-b-[#0A424A] flex items-center justify-between px-[50px]">
      <div className="flex">
        <Icon name="expert-merge" />

        <div className="ml-10 flex items-center gap-4">
          {menuBtn.map((item, index: number) =>
            item.route ? (
              <Link key={index} href={`/${item.route}`}>
                <MenuBtn {...item} />
              </Link>
            ) : item.options && item.options.length > 0 ? (
              <div key={index} className="flex items-center">
                <MenuBtn {...item} />
                <Select
                  bordered={false}
                  dropdownStyle={{ width: "200px" }}
                  className="ml-[-20px] mt-1"
                  onChange={(value) => {
                    const selectedOption = item.options?.find(
                      (option) => option.value === value
                    );
                    if (selectedOption?.route) {
                      window.location.href = `/${selectedOption.route}`;
                    }
                  }}
                >
                  {item.options?.map((option, subIndex: number) => (
                    <Select.Option key={subIndex} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            ) : (
              <MenuBtn key={index} {...item} className="ml-8" />
            )
          )}
        </div>
      </div>

      <div className="flex justify-evenly gap-4 items-center">
        <div>
          <SearchOutlined />
        </div>
        <div>
          <Icon name="settings" />
        </div>
        <div>
          <Link href="/notification">
            <Icon name="bell" />
          </Link>
        </div>
        <div className="relative">
          {/* Avatar Button */}
          <div
            onClick={toggleDropdown}
            className="cursor-pointer flex items-center space-x-2"
          >
            <Image
              src={Avatar}
              alt="avatar"
              className="rounded-full h-[40px] w-[40px]"
            />
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-[150px] bg-white shadow-lg rounded-md z-10">
              <ul className="py-2 text-sm text-gray-700">
                <li
                  onClick={handleChangePassword}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Change Password
                </li>
                <li
                  onClick={handleSignOut}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
