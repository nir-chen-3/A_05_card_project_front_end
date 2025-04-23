import { Link } from "react-router";
import No_photo from "../assets/No-photo.png";
import { useRef, useState } from "react";
import cardsService from "../services/cardsService";
import { useTheme } from "../context/theme.context";

function BusinessCard({
  card: { _id, title, subtitle, address, phone, image, likes },
  user_id,
  home = false,
  refreshCards,
  favorite = false,
}) {
  const [likesCount, setLikesCount] = useState(likes?.length);
  const [imgSrc, setImgSrc] = useState(image?.url || No_photo);
  const [hasError, setHasError] = useState(false);
  const likeRef = useRef(likes.some((liked) => liked === user_id));
  const { theme } = useTheme();

  const handleLike_unlikeCard = async (liked) => {
    if (!user_id) return;
    try {
      likeRef.current = liked;
      await cardsService.like_unlikeCard(_id);
      setLikesCount((prev) => prev + (liked ? 1 : -1));
      refreshCards();
    } catch (error) {
      console.log(error);
    }
  };

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
            : "for-light-theme-dark-shadow", // Apply theme-based shadow class
        ].join(" ")}
      >
        <Link to={`/my-cards/description/${_id}`}>
          <img
            src={imgSrc}
            alt={image?.alt || "Card image"}
            onError={handleError}
            className="card-img-top img-fluid rounded-top"
            style={{ height: "200px", objectFit: "cover" }}
          />
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-primary fw-semibold fs-4">{title}</h5>
          <p className="card-text text-secondary fs-6">{subtitle}</p>

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
              <i className="bi bi-geo-alt-fill me-2 opacity-75"></i>
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
            <p className="mb-3">
              <i className="bi bi-telephone-fill me-2 opacity-75"></i>
              {phone}
            </p>

            <div className="d-flex justify-content-between align-items-center">
              {!home && !favorite && (
                <div className="d-flex gap-5">
                  <Link
                    to={`/my-cards/edit/${_id}`}
                    className="text-decoration-none text-success fw-medium"
                  >
                    ✏️ Edit
                  </Link>
                  <Link
                    to={`/my-cards/delete/${_id}`}
                    className="text-decoration-none text-danger fw-medium"
                  >
                    🗑️ Delete
                  </Link>
                </div>
              )}

              <div className="ms-auto d-flex align-items-center">
                {likesCount > 0 && (
                  <span className="me-2 opacity-75 fs-6">{likesCount}</span>
                )}
                {likeRef.current ? (
                  <i
                    className="bi bi-heart-fill text-danger fs-5 cursor-pointer"
                    onClick={() => handleLike_unlikeCard(false)}
                  ></i>
                ) : (
                  <i
                    className="bi bi-heart fs-5 cursor-pointer"
                    onClick={() => handleLike_unlikeCard(true)}
                  ></i>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessCard;
