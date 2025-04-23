import httpService from "./httpService";

export function getAllCards() {
  return httpService.get("/cards");
}
export function getCard(id) {
  return httpService.get(`/cards/${id}`);
}
export function getMyCards() {
  return httpService.get("/cards/my-cards");
}
export function createCard(card) {
  return httpService.post("/cards", card);
}

export function updateCard(id, card) {
  return httpService.put(`/cards/${id}`, card);
}

// PATCH
// like/unlike a card
export function like_unlikeCard(id) {
  return httpService.patch(`/cards/${id}`);
}

//

export function deleteCard(id) {
  return httpService.delete(`/cards/${id}`);
}

// PATCH
// patch card's biz number - admin
export function patchBizNumCard(id, newBizNumCard) {
  return httpService.patch(`/cards/biz-number/${id}`, newBizNumCard);
}
const cardsService = {
  createCard,
  getAllCards,
  getMyCards,
  getCard,
  deleteCard,
  updateCard,
  like_unlikeCard,
  patchBizNumCard,
};
export default cardsService;
