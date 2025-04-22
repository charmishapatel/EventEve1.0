"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import SideNav from "@/app/components/SideNav/page";

const ApprovingRequest = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1 p-10 bg-white">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-black">Approving Request</h1>
          <div className="flex items-center space-x-3">
            <div className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-sm font-medium">A</span>
            </div>
            <span className="text-lg text-black">Admin</span>
          </div>
        </div>

        {/* Request Cards */}
        <div className="grid grid-cols-2 gap-10">
          {/* View User Request */}
          <div
            onClick={() => router.push("/Admin/approving/userrequest")}
            className="cursor-pointer border border-black bg-gray-100 p-8 rounded-lg flex flex-col items-center justify-center transition hover:shadow-md"
          >
            <Image
              src="/images/user.png"
              alt="User Request"
              width={120}
              height={120}
              className="mb-4"
            />
            <p className="font-semibold underline text-lg">View User Request</p>
          </div>

          {/* View Vendor Request */}
          <div
            onClick={() => router.push("/Admin/approving/view-vendor")}
            className="cursor-pointer border border-black bg-gray-100 p-8 rounded-lg flex flex-col items-center justify-center transition hover:shadow-md"
          >
            <Image
              src="/images/user.png"
              alt="Vendor Request"
              width={120}
              height={120}
              className="mb-4"
            />
            <p className="font-semibold underline text-lg">View Vendor Request</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovingRequest;
