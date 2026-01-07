import { useAuth } from "../../auth/hooks/useAuth";
import type { IUser } from "../../auth/type";
import ProfileCard from "../components/ProfileCard";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center p-4">
      <ProfileCard {...(user as IUser)} />
    </div>
  );
};

export default Profile;
