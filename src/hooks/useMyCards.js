import { useEffect, useState } from "react";
import cardsService from "../services/cardsService";
import { useAuth } from "../context/auth.context";

function useMyCards() {
  const [cards, setCards] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setCards([]); // or null if you prefer
      return;
    }
    async function getCards() {
      try {
        const cards = await cardsService.getMyCards();
        setCards(cards.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCards();
  }, [user]);
  return cards;
}

export default useMyCards;
