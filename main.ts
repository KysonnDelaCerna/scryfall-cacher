import axios, { AxiosResponse } from "axios";
import IScryfallResponse from "./interfaces/ScryfallResponse";
import IFirestoreCard from "./interfaces/FirestoreCard";
import firestore from "./firestore";
import toFirestoreCard from "./toFirestoreCard";

// https://scryfall.com/docs/syntax
const query = "game:arena (legal:standard or legal:historic)";
// https://scryfall.com/docs/api/cards/search
const url = `https://api.scryfall.com/cards/search?unique=cards&sort=name&q=${encodeURIComponent(
  query
)}`;

let next_page = url as string | null | undefined;
let has_more = true;
let has_error = false;

const cards: IFirestoreCard[] = [];

const run = async () => {
  while (has_more && next_page) {
    await axios
      .get(next_page)
      .then((response: AxiosResponse<IScryfallResponse>) => {
        for (const card of response.data.data) {
          cards.push(toFirestoreCard(card));
        }

        next_page = response.data.next_page;
        has_more = response.data.has_more;
      })
      .catch((error) => {
        console.log(error);
        has_more = false;
        next_page = null;
        has_error = true;
      });
  }

  if (!has_error) {
    const chunk_size = 750;
    const iterations = Math.ceil(cards.length / chunk_size);
    const cards_collection = firestore.collection("cards");
    const card_documents = await cards_collection.get();

    for (const card_document of card_documents.docs) {
      await card_document.ref.delete();
    }

    for (let i = 0; i < iterations; i++) {
      const cards_slice = cards.slice(i * chunk_size, (i + 1) * chunk_size);
      const cards_object = { slice: cards_slice };
      const cards_document = cards_collection.doc(`${i}`);

      await cards_document.set(cards_object);
    }
  }
};

run();
