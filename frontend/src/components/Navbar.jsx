import React from "react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
      <div className="flex items-center gap-4">
        <BellIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
        <UserCircleIcon className="w-8 h-8 text-gray-600 cursor-pointer" />
      </div>
    </nav>
  );
}
