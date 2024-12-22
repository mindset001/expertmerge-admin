import React from "react";
import Image from "next/image";
import Avatar from '@/assets/matcap.jpeg';
import ExpertButton from "@/components/buttons/ExpertButton";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { blockUser } from "@/app/api/services/endpoints/signup";
import { message } from "antd";

const WorkExperience = () => {
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
      <h2 className="text-[28px] font-bold text-[#1D2739] mb-6">Work Experience</h2>
      <div className="w-[60%]">
        {user.experience.map((experience:any) => (
          <div key={experience.id} className="flex items-start gap-4 mb-8 border-b pb-8">
            {/* Company logo */}
            <Image
              src={experience.companyLogo || Avatar}
              alt={experience.companyName || "Company Logo"}
              width={50}
              height={50}
              className="rounded-md"
            />

            {/* Experience details */}
            <div className="w-full">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div>
                    <h3 className="font-bold text-xl text-[#1D2739]">
                      {experience.title}
                    </h3>
                    <p className="text-[#1D2739]">{experience.company}</p>
                  </div>
                </div>
                <p className="text-[#1D2739]">
                  {new Date(experience.from).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })} —{" "}
                  {experience.to
                    ? new Date(experience.to).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                    : "Present"}
                </p>
              </div>
              <p className="text-[#667185] my-2">{experience.description}</p>

              {/* Skills */}
              {experience.skills && experience.skills.length > 0 && (
                <p className="text-[#667185] text-sm">
                  Skills: {experience.skills.join(" · ")}
                </p>
              )}
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

export default WorkExperience;
