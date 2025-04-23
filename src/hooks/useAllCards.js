import { useEffect, useState } from "react";
import cardsService from "../services/cardsService";

function useAllCards(refreshKey = 0) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function getCards() {
      const cards = await cardsService.getAllCards();
      setCards(cards.data);
    }
    getCards();
  }, [refreshKey]);
  return cards;
}

export default useAllCards;
