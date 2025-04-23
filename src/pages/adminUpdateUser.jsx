import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../context/auth.context";

import PageHeader from "../components/common/pageHeader";

import TemplateUserUpdate from "./templateUserUpdate";

function AdminUpdateUser() {
  const { user, getUserById } = useAuth();
  const { id } = useParams();

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

  const title = "Edit User Profile";
  const description = "Update User personal information.";
  return (
    <div className="container">
      <PageHeader title={title} description={description}></PageHeader>

      <TemplateUserUpdate
        user={user}
        me_info={userProfile}
      ></TemplateUserUpdate>
    </div>
  );
}
export default AdminUpdateUser;
