import {
  ChevronDown,
  Lock,
  LogOut,
  PanelLeft,
  UserIcon,
  X,
} from "lucide-react";
import { NavLink } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import type { ISideBarProps } from "../types";
import { logOut } from "../../auth/api";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { notify } from "../../../components/Toast";

const SideBar = ({ isOpen, setIsOpen, menu }: ISideBarProps) => {
  const navigate = useNavigate();
  const { user, refetchUser, setUser } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    try {
      const res = await logOut();
      if (res.success) {
        await refetchUser();
        setUser(null);
        notify.success("Logged out", res.message);
        navigate("/");
      } else {
        notify.error("Logout failed", res.message);
      }
    } catch (err) {
      notify.error(
        "Something went wrong",
        "Unable to logout. Please try again."
      );
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          bg-[#3c354d] 
          sticky top-0 h-screen
          border-r border-purple-500/20
          flex flex-col justify-between 
          transition-all duration-300 ease-in-out
          z-50
           md:sticky
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isOpen ? "w-64 px-4" : "w-0 md:w-20 px-0 md:px-2 overflow-hidden"}
          py-4
        `}
      >
        <div
          className={`flex items-center mb-8 ${
            isOpen ? "justify-between" : "justify-center"
          }`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
          >
            {isOpen && (
              <span className="md:hidden">
                <X className="w-5 h-5" />
              </span>
            )}
            <span className={`${isOpen ? "hidden md:block" : "block"}`}>
              <PanelLeft className="w-5 h-5 shrink-0" />
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-y-2 font-sans flex-1 overflow-y-auto scrollbar-hide">
          {menu!.map((item) => (
            <NavLink
              to={item.path}
              end={item.exact}
              key={item.key}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
              relative flex items-center gap-x-3
              px-3 py-3 rounded-xl cursor-pointer
              transition-all duration-200 group
              ${
                isActive
                  ? "bg-purple-500/20 text-white font-medium"
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              }
              ${!isOpen && "justify-center"}
            `}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-fuchsia-500 rounded-r-full" />
                  )}

                  <span
                    className={`shrink-0 transition-transform duration-300 ${
                      isActive ? "scale-110" : "group-hover:scale-110"
                    }`}
                  >
                    {item.icon}
                  </span>

                  {isOpen && (
                    <span className="truncate text-sm">{item.name}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div
          className="relative mt-auto pt-4 border-t border-purple-500/10"
          ref={profileRef}
        >
          {isProfileOpen && isOpen && (
            <div className="absolute bottom-[110%] left-0 w-full bg-[#2d283e] border border-purple-500/20 rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
              <button
                onClick={() => navigate("/dashboard/profile")}
                className="w-full text-left px-4 py-3 flex items-center gap-x-3 text-sm text-neutral-300 hover:bg-white/5 hover:text-white transition-colors"
              >
                <UserIcon className="w-4 h-4" />
                Profile
              </button>

              <button
                className="w-full text-left px-4 py-3 flex items-center gap-x-3 text-sm text-neutral-300 hover:bg-white/5 hover:text-white transition-colors"
                onClick={() => navigate("profile/change-password")}
              >
                <Lock className="w-4 h-4" />
                Change Password
              </button>

              <div className="h-px bg-white/10 my-1 mx-2" />

              <button
                onClick={handleLogOut}
                className="w-full text-left px-4 py-3 flex items-center gap-x-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}

          <div
            onClick={() => isOpen && user && setIsProfileOpen(!isProfileOpen)}
            className={`
            flex items-center gap-x-3
            p-2 rounded-xl transition-all
            ${isOpen ? "hover:bg-white/5 cursor-pointer" : "justify-center"}
            ${user ? "" : "cursor-default"}
          `}
          >
            <img
              src="https://github.com/shadcn.png"
              className={`
              ${isOpen ? "w-10 h-10" : "w-8 h-8"}
              aspect-square rounded-full shrink-0 object-cover border-2 border-purple-500/20`}
              alt="user avatar"
            />
            {isOpen && (
              <>
                <div className="flex flex-col leading-tight min-w-0 flex-1">
                  <span className="text-sm font-semibold text-white truncate">
                    {user?.name ?? "User"}
                  </span>
                  <span className="text-[11px] text-neutral-400 truncate">
                    {user?.email ?? "email@mail.com"}
                  </span>
                </div>
                {user && (
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
