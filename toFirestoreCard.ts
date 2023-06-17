import IScryfallCard from "./interfaces/ScryfallCard";
import IFirestoreCard from "./interfaces/FirestoreCard";

export default function toFirestoreCard(
  scryfallCard: IScryfallCard
): IFirestoreCard {
  const firestoreCard: IFirestoreCard = {
    name: scryfallCard.name.startsWith("A-")
      ? scryfallCard.name.replace("A-", "")
      : scryfallCard.name,
    manaCost: scryfallCard.mana_cost ?? "",
    cmc: scryfallCard.cmc,
    typeLine: scryfallCard.type_line,
    colors: scryfallCard.colors ?? [],
    colorIdentity: scryfallCard.color_identity,
    legalities: {
      standard: scryfallCard.legalities.standard,
      historic: scryfallCard.legalities.historic,
      brawl: scryfallCard.legalities.brawl,
      historicBrawl: scryfallCard.legalities.historicbrawl,
      alchemy: scryfallCard.legalities.historic,
    },
    games: scryfallCard.games,
    set: scryfallCard.set,
    setName: scryfallCard.set_name,
    collectorNumber: scryfallCard.collector_number.startsWith("A-")
      ? scryfallCard.collector_number.replace("A-", "")
      : scryfallCard.collector_number,
    rarity: scryfallCard.rarity,
  };

  return firestoreCard;
}
