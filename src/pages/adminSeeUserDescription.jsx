import PageHeader from "../components/common/pageHeader";
import TemplateUserProfile from "./templateUserProfile";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../context/auth.context";

function AdminSeeUserDescription() {
  const { user, getUserById } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        const fetchedUser = await getUserById(id);
        setUserProfile(fetchedUser);
      }
    };
    fetchUser();
  }, [id]);

  if (!user?.isAdmin) {
    return <div>Access denied</div>;
  }

  if (!userProfile) {
    return <div>Loading...</div>;
  }
  const handleDelete = () => {
    if (user?.isAdmin) {
      navigate("/profile/delete", {
        state: { fromAdmin: true, targetUserId: userProfile?._id },
      });
    }
  };
  const handleBusiness_status = () => {
    navigate(`/admin/business-status-change/${userProfile?._id}`, {
      state: { userProfile: userProfile },
    });
  };

  const updateLink = `/admin/user-update/${userProfile?._id}`;

  const title = "User Profile";
  const description = "View and manage User personal details";
  return (
    <div className="container">
      <PageHeader title={title} description={description}></PageHeader>
      <TemplateUserProfile
        user={user}
        userProfile={userProfile}
        handleDelete={handleDelete}
        handleBusiness_status={handleBusiness_status}
        updateLink={updateLink}
      ></TemplateUserProfile>
    </div>
  );
}
export default AdminSeeUserDescription;
