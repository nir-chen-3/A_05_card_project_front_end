import PageHeader from "../components/common/pageHeader";
import { useAuth } from "../context/auth.context";

import TemplateUserUpdate from "./templateUserUpdate";

function UserOwnUpdate() {
  const { user, me_info } = useAuth();

  if (!user || !me_info) {
    return <div>Loading...</div>;
  }

  const title = "Edit Profile";
  const description = " Update your personal information";
  return (
    <div className="container">
      <PageHeader title={title} description={description}></PageHeader>

      <TemplateUserUpdate user={user} me_info={me_info}></TemplateUserUpdate>
    </div>
  );
}
export default UserOwnUpdate;
