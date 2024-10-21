// types.ts
export type Group = {
    id: number;
    name: string;
    description: string;
    location: string;
    members: string;
    imageUrl: string;
  };
  
  // mockData.ts
  export const groups: Group[] = [
    {
      id: 1,
      name: "Friends of Figma",
      description: "A community for Figma users looking to learn from others.",
      location: "Glasgow, United Kingdom",
      members: "17,840 members",
      imageUrl: "/path/to/figma.jpg",
    },
    {
      id: 2,
      name: "User Experience (UX)",
      description: "UX designers discuss the latest trends.",
      location: "London, United Kingdom",
      members: "12,400 members",
      imageUrl: "/path/to/ux.jpg",
    },
    // More group data here...
  ];
  