import CardPage from "@/spaces/cards/CardPage";
export { generateStaticParams } from "@/spaces/cards/CardPage";
export { generateMetadata } from "@/spaces/cards/CardPageMetadata";

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
// export const revalidate = 86400; // 24 hours

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export const dynamic = "force-static";

export default CardPage;
