import { Link, Navigate } from "react-router";
import { useState } from "react";
import PageHeader from "../components/common/pageHeader";
import BusinessCard from "../components/businessCard";
import useMyCards from "../hooks/useMyCards";
import useAllCards from "../hooks/useAllCards";
import { useAuth } from "../context/auth.context";
import { useTheme } from "../context/theme.context";

function MyCards({ home = false, favorite = false }) {
  const { user, me_info } = useAuth();
  const { theme } = useTheme();
  const [input, setInput] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const refreshCards = () => setRefreshKey((prev) => prev + 1);

  const allCards = useAllCards(refreshKey);
  const myCards = useMyCards();

  let cards = [];
  let favorite_cards = [];

  if (home || favorite) {
    cards = allCards;

    if (favorite) {
      favorite_cards = cards.filter((card) => card.likes.includes(user?._id));
      cards = favorite_cards;
    }
  } else {
    cards = myCards;
  }

  if (!home && !user) {
    return <Navigate to="/" />;
  }

  const title = "My Cards";
  const description = "Manage the business cards you have created";

  return (
    <div
      className={`container mt-5 bg-${theme} text-${
        theme === "dark" ? "light" : "dark"
      }`}
    >
      {!(home || favorite) && (
        <PageHeader title={title} description={description} />
      )}

      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <input
            type="text"
            className={[
              "form-control",
              "form-control-lg",
              "shadow-sm",
              `bg-${theme}`,
              `text-${theme === "dark" ? "light" : "dark"}`,
              "border-secondary",
              theme === "dark" ? "placeholder-dark" : "placeholder-light",
            ].join(" ")}
            placeholder="Search cards by title..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>

      {!(home || favorite) && me_info?.isBusiness && (
        <div className="text-center mb-4">
          <Link
            to="/create-card"
            className={`btn btn-outline-${
              theme === "dark" ? "light" : "dark"
            } fs-5 px-4`}
          >
            + Create New Card
          </Link>
        </div>
      )}

      <div className="row">
        {!cards.length ? (
          <div className="col text-center fs-4 text-muted">No cards found.</div>
        ) : (
          cards
            .filter((card) =>
              card.title.toLowerCase().includes(input.toLowerCase())
            )
            .map((card) => (
              <BusinessCard
                key={card._id}
                card={card}
                user_id={user?._id}
                refreshCards={refreshCards}
                home={home}
                favorite={favorite}
                theme={theme}
              />
            ))
        )}
      </div>
    </div>
  );
}

export default MyCards;
