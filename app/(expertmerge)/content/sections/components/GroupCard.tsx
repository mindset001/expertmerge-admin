// components/GroupCard.tsx
import React from 'react';
import { Card } from 'antd';

import Image from 'next/image';
import { Group } from './type';

type GroupCardProps = {
  group: Group;
  onClick: (group: Group) => void;
};

const GroupCard: React.FC<GroupCardProps> = ({ group, onClick }) => (
  <Card
    hoverable
    onClick={() => onClick(group)}
    className="w-full rounded-md shadow-lg"
    cover={
      <Image src={group.imageUrl} alt={group.name} width={250} height={150} />
    }
  >
    <h3 className="font-semibold">{group.name}</h3>
    <p className="text-gray-500">{group.location}</p>
    <p>{group.members}</p>
  </Card>
);

export default GroupCard;
