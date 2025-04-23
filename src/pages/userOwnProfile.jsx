import { useNavigate } from "react-router";
import PageHeader from "../components/common/pageHeader";
import { useAuth } from "../context/auth.context";

import TemplateUserProfile from "../pages/templateUserProfile";

function UserOwnProfile() {
  const { user, me_info } = useAuth();
  const navigate = useNavigate();

  if (!user || !me_info) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    if (!user?.isAdmin) {
      navigate("/profile/delete", {
        state: { fromAdmin: false, targetUserId: 0 },
      });
    }
  };
  const handleBusiness_status = () => {
    navigate("/profile/business-status-change");
  };

  const updateLink = "/profile/update";

  const title = "Profile";
  const description = "View and manage your personal details";
  return (
    <div className="container">
      <PageHeader title={title} description={description} />
      <TemplateUserProfile
        user={user}
        userProfile={me_info}
        handleDelete={handleDelete}
        handleBusiness_status={handleBusiness_status}
        updateLink={updateLink}
      ></TemplateUserProfile>
    </div>
  );
}
export default UserOwnProfile;
