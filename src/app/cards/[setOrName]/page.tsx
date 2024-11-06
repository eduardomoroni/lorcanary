import CardPage from "@/spaces/cards/CardPage";
import { allLorcanitoCardNames } from "@/data/lorcanitoCards";
export { generateMetadata } from "@/spaces/cards/CardPageMetadata";

export const dynamicParams = false;

export async function generateStaticParams() {
  const allCardNames = await allLorcanitoCardNames();
  return allCardNames.map((setOrName) => ({ setOrName }));
}

export default CardPage;
