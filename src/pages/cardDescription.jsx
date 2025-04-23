import { Link, useParams } from "react-router";
import useCard from "../hooks/useCard";
import useGetUserById from "../hooks/useGetUserById";
import no_photo from "../assets/No-photo.png";
import { useAuth } from "../context/auth.context.jsx";
import { useState } from "react";
import cardsService from "../services/cardsService.js";
import ConfirmButton from "../components/common/confirmButton.jsx";
import { useTheme } from "../context/theme.context";

import GoogleMap from "../components/common/GoogleMap.jsx";

function CardDescription() {
  const { user } = useAuth();
  const admin = user.isAdmin;
  const { theme } = useTheme();

  const { id } = useParams();
  const cardData = useCard(id);
  const card = cardData?.data;
  const cardCreator = useGetUserById(card?.user_id);

  const [changeBusinessNumberButton, setChangeBusinessNumberButton] =
    useState(false);
  const [changeBusiness, setChangeBusiness] = useState(card?.bizNumber);
  const [imageSize, setImageSize] = useState(true);

  if (!cardData) return <div className="container mt-5 fs-3">Loading...</div>;

  const date = new Date(card.createdAt);
  const formattedDate = date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const fullAddress = `${card.address?.street} ${card.address?.houseNumber}, ${
    card.address?.city
  }, ${
    card.address?.state === "not defined" || card.address?.state == null
      ? ""
      : card.address?.state
  }
, ${card.address?.country}`;

  const handleConfirmChangeBusinessNumber = async (number) => {
    const res = await cardsService.patchBizNumCard(card?._id, {
      bizNumber: number,
    });
    if (number == res.data.bizNumber) {
      setChangeBusiness(number);
    } else {
      console.warn("Business number was not updated on the server.");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className={[
          "card",
          "p-4",
          "mx-auto",
          "border-0",
          "rounded-4",
          `bg-${theme}`,
          `text-${theme === "dark" ? "light" : "dark"}`,
          theme === "dark"
            ? "for-dark-theme-light-shadow"
            : "for-light-theme-dark-shadow",
        ].join(" ")}
        style={{ maxWidth: "700px" }}
      >
        <div className="text-center">
          <img
            src={card.image?.url || no_photo}
            alt={card.image?.alt || "Card Image"}
            className="rounded mb-4"
            onClick={() => setImageSize((prev) => !prev)}
            style={{
              height: imageSize ? "300px" : "100%",
              width: imageSize ? "100%" : "auto",
              objectFit: "cover",
              cursor: "pointer",
              maxWidth: "100%",
            }}
          />
          <h2 className="fw-bold fs-2">{card.title}</h2>
          <h5 className="text-muted">{card.subtitle}</h5>
        </div>

        <div className="fs-5 mt-4">
          <h4 className="text-primary mb-3">Details</h4>
          <p>{card.description}</p>
          <p>
            <strong>Phone:</strong> {card.phone}
          </p>
          <p>
            <strong>Email:</strong> {card.email}
          </p>
          <p>
            <strong>Business Number:</strong> {changeBusiness || card.bizNumber}
          </p>
          <p>
            <strong>Created At:</strong> {formattedDate}
          </p>
          <p>
            <strong>Likes:</strong> {card?.likes?.length || "0"}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            {card.web ? (
              <a href={card.web} target="_blank" rel="noreferrer">
                {card.web}
              </a>
            ) : (
              "N/A"
            )}
          </p>

          <h4 className="text-primary mt-5">Address</h4>
          <p>
            {card.address?.street} {card.address?.houseNumber},{" "}
            {card.address?.city},{" "}
            {card.address?.state === "not defined" ||
            card.address?.state == null
              ? ""
              : card.address?.state}
            , {card.address?.country}, ZIP: {card.address?.zip}
          </p>
          <div>
            <h4>Business Location</h4>
            <GoogleMap address={fullAddress} />
          </div>

          {admin && (
            <div className="mt-4 d-flex flex-wrap gap-3 align-items-center">
              <Link
                to={`/my-cards/edit/${card._id}`}
                className="btn btn-outline-secondary fs-5 px-4"
              >
                Edit Card
              </Link>

              <Link
                to={`/my-cards/delete/${card._id}`}
                className="btn btn-outline-danger fs-5 px-4"
              >
                Delete Card
              </Link>

              <ConfirmButton
                btnMessage="Change Business Number"
                showConfirm={changeBusinessNumberButton}
                confirmMessage="Are you sure you want to do this?"
                confirmLabel="Yes"
                cancelLabel="No"
                setShowConfirm={setChangeBusinessNumberButton}
                handleConfirm={handleConfirmChangeBusinessNumber}
                btn="btn-outline-primary fs-5"
                bizNumberFlag={true}
              />
            </div>
          )}

          {cardCreator && (
            <>
              <hr />
              <h4 className="text-primary mt-4">Creator Info</h4>
              <p>
                <strong>Name:</strong> {cardCreator.name.first}{" "}
                {cardCreator.name.middle} {cardCreator.name.last}
              </p>
              <p>
                <strong>Phone:</strong> {cardCreator.phone}
              </p>
              <p>
                <strong>Email:</strong> {cardCreator.email}
              </p>
              <Link
                to={`/admin/user-description/${cardCreator?._id}`}
                className="btn btn-outline-info fs-5 px-4 mt-2"
              >
                View Creator Profile
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardDescription;
