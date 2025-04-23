import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";

const UserDelete = () => {
  const { deleteUser, user, getUserById } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { fromAdmin = false, targetUserId = 0 } = location.state || {};

  useEffect(() => {
    const handleDelete = async () => {
      if (fromAdmin && user?.isAdmin) {
        const targetUser = await getUserById(targetUserId);
        if (targetUser && !targetUser?.isAdmin) {
          await deleteUser(targetUserId);
          toast.success("User deleted successfully");
        } else {
          toast.success("User didn't deleted");
        }
        navigate("/admin/sandbox");
      } else if (!fromAdmin && !user?.isAdmin) {
        await deleteUser(user?._id);
        navigate("/sign-out");
      }
    };

    handleDelete();
  }, []);

  return null;
};

export default UserDelete;
