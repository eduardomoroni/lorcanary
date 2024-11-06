import CardPage from "@/spaces/cards/CardPage";
export { generateMetadata } from "@/spaces/cards/CardPageMetadata";

export const dynamicParams = false; // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const numbers = [...Array(204).keys()].map((i) =>
    i.toString().padStart(3, "0"),
  );

  const paths: Array<{ number: string; setOrNumber: string }> = [];

  for (const setOrNumber of ["001", "002", "003", "004", "005", "006"]) {
    for (const number of numbers) {
      paths.push({ number, setOrNumber });
    }
  }

  return paths;
}

export default CardPage;
