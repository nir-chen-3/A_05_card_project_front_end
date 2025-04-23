import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/auth.context";

const AdminChangeUserBusinessStatus = () => {
  const { patchUserBusinessStatus, getUserById } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { userProfile = "" } = location.state || {};

  useEffect(() => {
    const BusinessStatusChange = async () => {
      if (!userProfile) return;

      const response = await patchUserBusinessStatus(userProfile._id);
      const newStatus = response?.data?.isBusiness;

      const updatedInfo = await getUserById(userProfile._id);

      if (updatedInfo?.isBusiness === newStatus) {
        navigate(`/admin/user-description/${userProfile._id}`);
      }
    };

    BusinessStatusChange();
  }, [userProfile]);

  return null;
};

export default AdminChangeUserBusinessStatus;
