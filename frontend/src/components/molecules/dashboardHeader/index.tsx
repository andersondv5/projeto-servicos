import { useState } from "react";
import { FaBars, FaChevronDown, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../../lib/context/AuthContext";
import { Link } from "react-router-dom";
import Logo from "../../atoms/logo";
import Button from "../../atoms/button";
import DashboardHeaderLink from "../../atoms/dashboardHeaderLink";

function DashboardHeader() {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  return (
    <header className="z-1 flex flex-none items-center">
      <div className="w-full px-4 lg:px-8 bg-white">
        <div className="flex justify-between py-4">
          {/* Left Section */}
          <div className="flex items-center">
            <Link to="/">
              <Logo size="lg" />
            </Link>
          </div>
          {/* END Left Section */}

          {/* Right Section */}
          <div className="flex items-center gap-1 lg:gap-5">
            <div className="hidden items-center gap-2 lg:flex">
              <DashboardHeaderLink
                to="/dashboard"
                text="Serviços"              
              />
              <DashboardHeaderLink
                to="/dashboard/categories"
                text="Categorias"              
              />
            </div>
            {/* User Dropdown */}
            <div className="relative inline-block">
              {/* Dropdown Toggle Button */}
              <button
                type="button"
                className="group flex items-center justify-between rounded-md border border-transparent px-2.5 py-2 text-sm font-semibold text-slate-900 hover:hover:bg-(--third-color) hover:tex-(--main-color) active:border-indigo-200 active:bg-indigo-100 sm:gap-2"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <span className="inline-block">John Doe</span>
                <FaChevronDown />
              </button>
              {/* END Dropdown Toggle Button */}

              {/* Dropdown */}
              {userDropdownOpen && (
                <div
                  className="absolute end-0 mt-2 w-48 origin-top-right rounded-sm bg-white shadow-xl shadow-slate-200 ring-1 ring-slate-900/5 rtl:origin-top-left"
                  role="menu"
                >
                  <div className="divide-y divide-slate-100 rounded-sm">
                    <div className="space-y-1 p-2">
                      <button
                        role="menuitem"
                        className="group flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <FaUser className="size-4 text-slate-300 group-hover:text-indigo-500 inline-bloc" />
                        <span>Perfil</span>
                      </button>
                    </div>
                    <div className="space-y-1 p-2">
                      <button
                        onClick={handleLogout}
                        role="menuitem"
                        className="group flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <FaSignOutAlt className="size-4 text-slate-300 group-hover:text-indigo-500 inline-bloc" />
                        <span>Sair</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* END Dropdown */}
            </div>
            {/* END User Dropdown */}

            {/* Toggle Mobile Navigation */}
            <div className="lg:hidden">
              <button
                type="button"
                className="group flex items-center justify-between gap-2 rounded-md border border-transparent px-2.5 py-2 text-sm font-semibold text-slate-900 hover:bg-indigo-100 hover:text-indigo-600 active:border-indigo-200 active:bg-indigo-100"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
              >
                <FaBars />
              </button>
            </div>
            {/* END Toggle Mobile Navigation */}
          </div>
          {/* END Right Section */}
        </div>

        {/* Mobile Navigation */}
        {mobileNavOpen && (
          <nav className="flex flex-col py-4 lg:hidden">
            <Button
              variant="white"
              to="/dashboard"
              className="w-full justify-start"
            >
              Serviços
            </Button>
            <hr className="h-5 border-0" />
            <Button
              variant="white"
              to="/dashboard/categories"
              className="w-full justify-start"
            >
              Categorias
            </Button>
            <hr className="h-5 border-0" />
          </nav>
        )}
        {/* END Mobile Navigation */}
      </div>
    </header>
  );
}

export default DashboardHeader;
