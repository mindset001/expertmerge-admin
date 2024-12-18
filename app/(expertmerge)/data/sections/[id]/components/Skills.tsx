import React from "react";
import Image, { StaticImageData } from "next/image";
import Avatar from '@/assets/matcap.jpeg'
import ExpertButton from "@/components/buttons/ExpertButton";
import Cert from '@/assets/certificate.jpg'
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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



const Archievements = () => {
  const { user } = useSelector((state: RootState) => state.profileSlice);
  return (
    <div className="work-experience-list">
      <h2 className="text-[28px] font-bold text-[#1D2739] mb-6">Skills</h2>
      <div className="w-[60%]">
      {user.skills.map((experience:any) => (
        <div key={experience.id} className="flex items-start gap-4 mb-8 border-b pb-8">
          {/* Company logo */}
          

          {/* Experience details */}
          <div className="w-full">
          <h3 className="font-bold text-xl text-[#1D2739]">
                  {experience}
                </h3>
            <div className="flex justify-between">
              <div className="flex gap-4 items-center">
              {/* <Image
            src={experience.companyLogo || Avatar}
            alt={experience.companyName}
            width={50}
            height={50}
            className="rounded-md"
          /> */}
                <div>
               
                <p className="text-[#1D2739]">{experience.companyName}</p>
                </div>
              </div>
            
            </div>
            <p className="text-[#667185] my-2">{experience.description}</p>

            {/* Skills */}
            <p className="text-[#1D2739] text-[18px] italic">
               {experience.skills} Endorsements
            </p>
         
          </div>
        </div>
      ))}
      <ExpertButton
      text='Block Clifford'
      />
      </div>
    </div>
  );
};

export default Archievements;
