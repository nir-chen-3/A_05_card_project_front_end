import { Navigate, useNavigate } from "react-router";
import no_photo from "../assets/No-photo-m.png";
import { useState } from "react";
import ConfirmButton from "../components/common/confirmButton";
import { useTheme } from "../context/theme.context";

import GoogleMap from "../components/common/GoogleMap.jsx";

function TemplateUserProfile({
  userProfile,
  user,
  handleDelete,
  handleBusiness_status,
  updateLink,
}) {
  const navigate = useNavigate();
  const [imageSize, setImageSize] = useState(true);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showConfirmBusiness_status, setShowConfirmBusiness_status] =
    useState(false);
  const { theme } = useTheme();

  if (!user) return <Navigate to="/" />;
  if (!userProfile) return <div className="fs-3 mt-5">Loading...</div>;

  const fullAddress = `${userProfile?.address?.street || ""} ${
    userProfile?.address?.houseNumber || ""
  }, ${userProfile?.address?.city || ""}, ${
    userProfile.address?.state === "not defined" ||
    userProfile.address?.state == null
      ? ""
      : userProfile.address?.state
  }
, ${userProfile?.address?.country || ""}`;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div
            className={[
              "card",
              "border-0",
              "rounded-4",
              "p-4",
              `bg-${theme}`,
              `text-${theme === "dark" ? "light" : "dark"}`,
              theme === "dark"
                ? "for-dark-theme-light-shadow"
                : "for-light-theme-dark-shadow",
            ].join(" ")}
          >
            <div className="text-center">
              <img
                src={userProfile?.image?.url || no_photo}
                alt={userProfile?.image?.alt || "Profile Picture"}
                className="rounded-circle mb-4"
                style={{
                  height: imageSize ? "200px" : "100%",
                  width: imageSize ? "200px" : "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => setImageSize((prev) => !prev)}
              />
              <h2 className="fw-bold fs-2">
                {userProfile?.name?.first || ""}{" "}
                {userProfile?.name?.middle || ""}{" "}
                {userProfile?.name?.last || ""}
              </h2>
            </div>

            <div className="mt-4 px-2 fs-4">
              <h4 className="text-primary mb-4">Contact Information</h4>
              <p className="mb-3">
                <strong>Email:</strong> {userProfile?.email || ""}
              </p>
              <p className="mb-4">
                <strong>Phone:</strong> {userProfile?.phone || ""}
              </p>

              <div className="d-flex justify-content-between align-items-center mb-5">
                <p className="mb-0">
                  <strong>Business Account:</strong>
                  <span
                    className={
                      userProfile?.isBusiness ? "text-success" : "text-danger"
                    }
                  >
                    {userProfile?.isBusiness ? "Yes" : "No"}
                  </span>
                </p>

                <ConfirmButton
                  btnMessage="Change Business Status"
                  showConfirm={showConfirmBusiness_status}
                  confirmMessage="Are you sure you want to do this?"
                  confirmLabel="Yes"
                  cancelLabel="No"
                  setShowConfirm={setShowConfirmBusiness_status}
                  handleConfirm={handleBusiness_status}
                  btn="btn-outline-primary btn-sm"
                />
              </div>

              <h4 className="text-primary mb-4">Address</h4>
              <p className="mb-2">
                <strong>Street:</strong> {userProfile?.address?.street || ""}{" "}
                {userProfile?.address?.houseNumber}
              </p>
              <p className="mb-2">
                <strong>City:</strong> {userProfile?.address?.city || ""}
              </p>
              <p className="mb-2">
                <strong>State:</strong>
                {userProfile.address?.state === "not defined" ||
                userProfile.address?.state == null
                  ? ""
                  : userProfile.address?.state}
              </p>
              <p className="mb-2">
                <strong>Country:</strong> {userProfile?.address?.country || ""}
              </p>
              <p className="mb-5">
                <strong>ZIP:</strong> {userProfile?.address?.zip || ""}
              </p>
              <div>
                <h4>Business Location</h4>
                <GoogleMap address={fullAddress} />
              </div>

              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-outline-secondary fs-5 px-4"
                  onClick={() => navigate(updateLink)}
                >
                  Edit Profile
                </button>

                <ConfirmButton
                  btnMessage="Delete Account"
                  showConfirm={showConfirmDelete}
                  confirmMessage="Are you sure you want to delete your account?"
                  confirmLabel="Yes"
                  cancelLabel="No"
                  setShowConfirm={setShowConfirmDelete}
                  handleConfirm={handleDelete}
                  btn="btn-outline-danger fs-5 px-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateUserProfile;
