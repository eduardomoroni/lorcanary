import CreateDeckPage from "@/spaces/decks/CreateDeckPage";

export const dynamicParams = false;
export const fetchCache = "force-cache";

export default async function CreateDeckServer() {
  return <CreateDeckPage />;
}
