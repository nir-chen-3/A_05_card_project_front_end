import { useEffect } from "react";
import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router";

function SignOut() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        navigate("/");
      } catch (error) {}
    };
    handleLogout();
  }, []);
  return null;
}
export default SignOut;
