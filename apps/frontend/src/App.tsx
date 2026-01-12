import { logOut } from "./modules/auth/api";
import { useAuth } from "./modules/auth/hooks/useAuth";
import { useNavigate } from "react-router";
const App = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const response = await logOut();
      if (response.success) {
        setUser({});
        navigate("/login");
      }
    } catch (error: any) {
      const message = error?.response?.data?.error?.message || "Logout failed";
      console.error(message);
    }
  };
  return (
    <>
      <div className="">{user?.name}</div>
      <button onClick={handleClick}>logout</button>
    </>
  );
};

export default App;
