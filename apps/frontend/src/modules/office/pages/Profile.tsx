import { useAuth } from "../../auth/hooks/useAuth";
import type { IUser } from "../../auth/type";
import ProfileCard from "../components/ProfileCard";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center p-4">
      <title>Profile | Attendify</title>
      <meta
        name="description"
        content="Profile of your Attendify account to manage workforce attendance and geofence settings."
        key="desc"
      />
      <meta property="og:title" content="Profile | Attendify" />
      <meta
        property="og:description"
        content="Profile for Attendify workforce management."
      />
      <ProfileCard {...(user as IUser)} />
    </div>
  );
};

export default Profile;
