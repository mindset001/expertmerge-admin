import React from "react";
import Image, { StaticImageData } from "next/image";
import Avatar from '@/assets/matcap.jpeg'
import ExpertButton from "@/components/buttons/ExpertButton";
import Cert from '@/assets/certificate.jpg'
import { blockUser } from "@/app/api/services/endpoints/signup";
import { message } from "antd";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


// Define the work experience data type
type Experience = {
  id: number;
  companyLogo: string | StaticImageData;
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string;
};

const experiences: Experience[] = [
  {
    id: 1,
    companyLogo: Avatar, // Replace with actual image path
    jobTitle: "Dark Hossen",
    companyName: "Full stack Web Developer | UI/UX | Brand Designer",
    startDate: "SEPTEMBER 2024",
    endDate: "PRESENT",
    description:
      'Sodiq is an incredibly talented UI/UX Designer who possesses a wide range of skills that would benefit any company lucky enough to have him. He’s extremely detail-oriented and consistently keeps the user’s needs at the forefront of all of his designs. ',
    skills: 'He’s an exceptional communicator and collaborator that consistently comes to the table with innovative ideas in brainstorming sessions',
  },
 
];

const Recommendations= () => {
  const { user } = useSelector((state: RootState) => state.profileSlice);
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
    <div className="work-experience-list">
      <h2 className="text-[28px] font-bold text-[#1D2739] mb-6">Recommendations</h2>
      <div className="w-[60%]">
      {experiences.map((experience) => (
        <div key={experience.id} className="flex items-start gap-4 mb-8 border-b pb-8">
          {/* Company logo */}
          

          {/* Experience details */}
          <div className="w-full">
            <div className="flex justify-between">
              <div className="flex gap-4">
              <Image
            src={experience.companyLogo}
            alt={experience.companyName}
            width={50}
            height={50}
            className="rounded-md"
          />
                <div>
                <h3 className="font-bold text-xl text-[#1D2739]">
                  {experience.jobTitle}
                </h3>
                <p className="text-[#98A2B3] text-[12px]">{experience.companyName}</p>
                <p className="text-[#98A2B3] text-[12px]">{experience.startDate}, Dark Hossen was Sodiq's client</p>
                </div>
              </div>
             
            </div>
            <p className="text-[#667185] text-[18px] my-2">{experience.description}</p>

            {/* Skills */}
            <p className="text-[#667185] text-[18px]">
               {experience.skills}
            </p>
           
          </div>
        </div>
      ))}
     <ExpertButton
            text={`Block ${user?.name || "User"}`}
            onClick={handleBlockUser}
          />
      </div>
    </div>
  );
};

export default Recommendations;
