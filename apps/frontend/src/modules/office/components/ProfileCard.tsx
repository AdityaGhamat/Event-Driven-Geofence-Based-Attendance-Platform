import { Mail, Building, Shield, User } from "lucide-react";
import type { IProfileCardProps } from "../types";

const ProfileCard = (props: IProfileCardProps) => {
  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatRole = (role: string) => {
    return role?.replace("_", " ").toUpperCase();
  };

  return (
    <div className="w-full max-w-md bg-[#3c354d] border border-purple-500/30 rounded-2xl overflow-hidden shadow-xl">
      <div className="h-32 bg-linear-to-r from-purple-600 to-fuchsia-600 relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="relative px-6 pb-6">
        <div className="flex flex-col items-center -mt-12">
          <div className="w-24 h-24 rounded-full border-4 border-[#3c354d] bg-white text-purple-600 flex items-center justify-center text-3xl font-bold shadow-lg">
            {getInitials(props.name)}
          </div>

          <h1 className="mt-3 text-2xl font-bold text-white tracking-wide">
            {props.name}
          </h1>

          <span className="mt-2 px-4 py-1 rounded-full bg-purple-500/20 border border-purple-500/50 text-purple-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-3 h-3" />
            {formatRole(props.role)}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-4 p-3 rounded-xl bg-[#2b2538]/50 border border-white/5 hover:border-purple-500/30 transition-colors">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-neutral-400 font-medium uppercase">
                Email Address
              </span>
              <span className="text-white text-sm font-medium">
                {props.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl bg-[#2b2538]/50 border border-white/5 hover:border-purple-500/30 transition-colors">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <Building className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-neutral-400 font-medium uppercase">
                Office Location
              </span>
              <span className="text-white text-sm font-medium">
                {props.office ? props.office.name : "Remote / Not Assigned"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl bg-[#2b2538]/50 border border-white/5 hover:border-purple-500/30 transition-colors">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <User className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-neutral-400 font-medium uppercase">
                Employee ID
              </span>
              <span className="text-white text-sm font-medium truncate w-48">
                {props._id || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
          <span className="text-neutral-400 text-sm">Account Status</span>
          <span className="flex items-center gap-2 text-green-400 text-sm font-medium bg-green-400/10 px-3 py-1 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Active
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
