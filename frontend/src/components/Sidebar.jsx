import React, { useState } from "react";
import { HomeIcon, ChartBarIcon, UsersIcon, MenuIcon, XIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const links = [
    { name: "Home", icon: <HomeIcon className="w-6 h-6" /> },
    { name: "Analytics", icon: <ChartBarIcon className="w-6 h-6" /> },
    { name: "Users", icon: <UsersIcon className="w-6 h-6" /> },
  ];

  return (
    <div className={`${open ? "w-64" : "w-16"} bg-gray-100 min-h-screen transition-all duration-300`}>
      <div className="flex justify-end p-2">
        <button onClick={() => setOpen(!open)}>
          {open ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>
      <nav className="mt-4 flex flex-col gap-4">
        {links.map((link, idx) => (
          <div key={idx} className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-200 rounded cursor-pointer">
            {link.icon}
            {open && <span>{link.name}</span>}
          </div>
        ))}
      </nav>
    </div>
  );
}
