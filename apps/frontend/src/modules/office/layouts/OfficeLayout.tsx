import SideBar from "../components/SideBar";
import { Outlet } from "react-router";
import { useState } from "react";
import { Menu } from "lucide-react";
import { OfficeProvider } from "../context/OfficeContext";
import { useAuth } from "../../auth/hooks/useAuth";
import { menuUser } from "../constants/menu";

const OfficeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const hasOffice = !!user?.office;
  const role = user?.role;

  const filteredMenu = menuUser.filter((item) => {
    if (!hasOffice && item.name === "Attendance") return false;

    if (item.name === "Settings") {
      if (role !== "admin" && role !== "super_admin") {
        return false;
      }
    }
    return true;
  });

  return (
    <OfficeProvider>
      <div className="flex min-h-screen bg-[#2b2538] text-white">
        <SideBar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          menu={filteredMenu}
        />

        <main className="flex-1 flex flex-col min-w-0 transition-all duration-300">
          <div className="md:hidden flex items-center p-4 pb-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 p-4 md:p-8 w-full max-w-400 mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </OfficeProvider>
  );
};

export default OfficeLayout;
