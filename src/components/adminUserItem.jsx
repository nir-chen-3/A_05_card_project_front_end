import { Link } from "react-router";
import No_photo from "../assets/No-photo-m.png";
import { useState } from "react";
import { useTheme } from "../context/theme.context";

function AdminUserItem({
  user: { _id, name, email, address, phone, image, isBusiness },
}) {
  const [imgSrc, setImgSrc] = useState(image?.url || No_photo);
  const [hasError, setHasError] = useState(false);
  const { theme } = useTheme();

  const handleError = () => {
    if (!hasError) {
      setImgSrc(No_photo);
      setHasError(true);
    }
  };

  return (
    <div className="col-sm-6 col-md-4 col-xl-3 mb-5">
      <div
        className={[
          "card",
          "border-0",
          "rounded-4",
          "h-100",
          `bg-${theme}`,
          `text-${theme === "dark" ? "light" : "dark"}`,
          theme === "dark"
            ? "for-dark-theme-light-shadow"
            : "for-light-theme-dark-shadow",
        ].join(" ")}
      >
        <Link to={`/admin/user-description/${_id}`}>
          <img
            src={imgSrc}
            alt={image?.alt || "User image"}
            onError={handleError}
            className="card-img-top img-fluid rounded-top"
            style={{ height: "200px", objectFit: "cover" }}
          />
        </Link>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-primary fw-semibold fs-4">
            {[name.first || "", name.middle || "", name.last || ""].join(" ")}
          </h5>
          <p className="card-text text-secondary fs-6 mb-3">
            <i className="bi bi-envelope-fill me-2"></i>
            {email}
          </p>

          <div
            className={[
              "border-top",
              "pt-3",
              "mt-auto",
              "small",
              theme === "dark" ? "text-light" : "text-dark",
            ].join(" ")}
          >
            <p className="mb-1">
              <strong>Phone:</strong> {phone || "—"}
            </p>
            <p className="mb-0">
              <strong>Address:</strong>{" "}
              {[
                address?.street,
                address?.houseNumber,
                address?.city,
                address?.state === "not defined" || address?.state == null
                  ? ""
                  : address?.state,
                address?.country,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
            <p className="mb-0">
              <strong>Business Account:</strong>
              <span className={isBusiness ? "text-success" : "text-danger"}>
                {isBusiness ? " Yes" : " No"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserItem;
