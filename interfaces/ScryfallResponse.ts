import ICardData from "./ScryfallCard";

export default interface IScryfallResponse {
  has_more: boolean;
  next_page?: string;
  total_cards: number;
  object: "list";
  data: ICardData[];
}
