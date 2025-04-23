import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth.context";

const UserBusinessStatusChange = () => {
  const { me_info, user, patchUserBusinessStatus, getMe, refreshMeInfo } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const BusinessStatusChange = async () => {
      if (!user) return;

      const response = await patchUserBusinessStatus(user._id);
      const newStatus = response?.data?.isBusiness;

      const updatedInfo = await refreshMeInfo();

      if (updatedInfo?.isBusiness === newStatus) {
        navigate("/profile");
      }
    };

    BusinessStatusChange();
  }, [user]);

  return null;
};

export default UserBusinessStatusChange;
