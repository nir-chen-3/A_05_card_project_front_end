import { Navigate } from "react-router";
import { useState } from "react";
import PageHeader from "../components/common/pageHeader";
import AdminUserItem from "../components/adminUserItem";
import useAllUsers from "../hooks/useAllUsers";
import { useAuth } from "../context/auth.context";

function AdminSandBox() {
  const { user } = useAuth();
  const [input, setInput] = useState("");

  const users_List = useAllUsers();
  const usersList = users_List?.data;

  if (!user || !user.isAdmin) {
    return <Navigate to="/" />;
  }

  if (!usersList) {
    return <div className="fs-3 text-center mt-5">Loading...</div>;
  }

  const title = "Admin Panel";
  const description = "Search and manage all registered users.";

  return (
    <div className="container mt-5">
      <PageHeader title={title} description={description} />

      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control shadow-sm fs-5"
            placeholder="Search by name..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {!usersList?.length ? (
          <div className="col text-center fs-4 text-muted">No users found.</div>
        ) : (
          usersList
            .filter((user) => {
              const search = input.toLowerCase();
              const fullName = `${user.name?.first || ""} ${
                user.name?.middle || ""
              } ${user.name?.last || ""}`
                .toLowerCase()
                .trim();
              return fullName.includes(search);
            })
            .map((user) => <AdminUserItem key={user._id} user={user} />)
        )}
      </div>
    </div>
  );
}

export default AdminSandBox;
