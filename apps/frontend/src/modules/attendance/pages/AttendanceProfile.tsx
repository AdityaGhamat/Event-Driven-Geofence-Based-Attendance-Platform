import { useLocation, useNavigate } from "react-router";
import { getProfile } from "../../auth/api";
import type { IEmployeeTableProps } from "../../office/types";
import { useEffect, useState } from "react";
import type { IUser } from "../../auth/type";
import ProfileCard from "../../office/components/ProfileCard";
import Loading from "../../../components/Loading";
import { ArrowLeft, UserCircle, FileText } from "lucide-react";
import Attendance from "./Attendance";

const AttendanceProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employee = location?.state as IEmployeeTableProps | null;

  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<"profile" | "attendance">(
    "profile"
  );

  useEffect(() => {
    async function getUserProfile() {
      try {
        if (employee?._id) {
          const res = await getProfile(employee._id);
          if (res.success) {
            setUser(res.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    }
    getUserProfile();
  }, [employee?._id]);

  if (loading) return <Loading />;
  if (!user) return <div className="text-white p-6">User not found</div>;

  const profile = {
    email: user.email || "",
    name: user.name || "",
    role: user.role || "user",
    _id: user._id || "",
    uid: user.uid || "",
    image: user.image || "",
    office: {
      _id: user.office?._id || "",
      name: user.office?.name || "",
      isActive: user.office?.isActive || false,
      workStartTime: user.office?.workStartTime || "",
      workEndTime: user.office?.workEndTime || "",
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to List</span>
        </button>

        <div className="flex bg-[#2a253b] p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "profile"
                ? "bg-purple-600 text-white shadow-lg"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            <UserCircle className="w-4 h-4" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab("attendance")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "attendance"
                ? "bg-purple-600 text-white shadow-lg"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            <FileText className="w-4 h-4" />
            Attendance
          </button>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
        {activeTab === "profile" && (
          <div className="flex justify-center mt-10">
            <ProfileCard {...profile} />
          </div>
        )}

        {activeTab === "attendance" && (
          <Attendance self={false} employee_id={employee?._id} />
        )}
      </div>
    </div>
  );
};

const StatsCard = ({ label, value, icon, color }: any) => (
  <div
    className={`${color} border rounded-xl p-4 flex items-center gap-4 shadow-lg backdrop-blur-sm`}
  >
    <div className="p-3 bg-[#2a253b] rounded-lg border border-white/5 shadow-inner">
      {icon}
    </div>
    <div>
      <p className="text-white/50 text-xs uppercase font-bold tracking-wider">
        {label}
      </p>
      <p className="text-2xl font-bold text-white mt-0.5">{value}</p>
    </div>
  </div>
);

export default AttendanceProfile;
