'use client';

import { useParams } from 'next/navigation';
import SideNav from '@/app/components/SideNav/page';

const userRequests = {
  shyam: {
    name: 'SHYAM',
    service: 'FURNITURE',
    description: 'NEEDS 5 ROUND TABLES, 20 CHAIRS, AND 3 STANDS FOR AN EXHIBITION BOOTH.',
  },
  john: {
    name: 'JOHN',
    service: 'DECORATION',
    description: 'WANTS A FLOWER DECORATED STAGE AND LIGHTING SETUP FOR AN EVENING FUNCTION.',
  },
  karl: {
    name: 'KARL',
    service: 'CATERING, CAKE',
    description: 'REQUESTED TRADITIONAL GUJARATI FOOD FOR 50 GUESTS AND A TWO-LAYER CHOCOLATE CAKE.',
  },
};

export default function UserRequestDetail() {
  const { username } = useParams();
  const user = userRequests[username];

  if (!user) {
    return (
      <div className="flex min-h-screen">
        <SideNav />
        <div className="flex-1 p-10 bg-white">
          <h1 className="text-3xl font-bold">User not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1 p-10 bg-white">
        <h1 className="text-4xl font-bold mb-4">Request Details for {user.name}</h1>
        <div className="text-lg space-y-2">
          <p><strong>Service:</strong> {user.service}</p>
          <p><strong>Description:</strong> {user.description}</p>
        </div>
      </div>
    </div>
  );
}
