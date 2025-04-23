import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import cardsService from "../services/cardsService";

const CardDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const cardDelete = async () => {
      await cardsService.deleteCard(id);
      navigate("/my-cards");
    };

    cardDelete();
  }, []);

  return null;
};

export default CardDelete;
