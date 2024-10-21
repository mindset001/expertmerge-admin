import React from "react";
import Image, { StaticImageData } from "next/image";
import Avatar from '@/assets/matcap.jpeg'
import ExpertButton from "@/components/buttons/ExpertButton";
import Cert from '@/assets/certificate.jpg'

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
    jobTitle: "Best Final Project (UI/UX)",
    companyName: "Expertsmerge",
    startDate: "JAN 2024",
    endDate: "PRESENT",
    description:
      'Best Final Project" from a 12-week online internship in UI/UX design.',
    skills: 'After completing a rigorous 12-week online internship in UI/UX design, one standout project emerged as the "Best Final Project". The project, which focused on improving the user experience for a popular Fintech App, showcased a high level of creativity, technical skill, and attention to detail.',
  },
 
];

const Archievements = () => {
  return (
    <div className="work-experience-list">
      <h2 className="text-[28px] font-bold text-[#1D2739] mb-6">Professional Archievements</h2>
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
                <p className="text-[#1D2739]">{experience.companyName}</p>
                </div>
              </div>
              <p className="text-[#1D2739]">
                {experience.startDate} 
              </p>
            </div>
            <p className="text-[#667185] my-2">{experience.description}</p>

            {/* Skills */}
            <p className="text-[#667185] text-sm">
               {experience.skills}
            </p>
            <div className="mt-4">
                <Image src={Cert} alt=""/>
            </div>
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
