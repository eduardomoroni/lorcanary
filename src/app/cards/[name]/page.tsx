import Image from "next/image";

interface Card {
    id: string
    title: string
    content: string
    url: string
    name: string
}

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 86400 // 24 hours

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths

const  url = 'https://play.lorcanito.com/api/sets/004';

export async function generateStaticParams() {

    return [...Array(204).keys()].map((i) => {
        return {
            params: {
                id: i.toString()
            }
        }
    })
}

export default async function Page({ params }: { params: { name: string } }) {
    const id = (await params).name;

    const card: Card = await fetch(
        url
    ).then((res) => res.json()).then((data) => {
        return data.cards.find((card: unknown) => String(card.number) === String(id));
    })

    return (
        <main>
            <h1>{id}</h1>
            <p>{JSON.stringify(card)}</p>
            <Image src={card.url} alt={card.name} height={1024} width={734} />
        </main>
    )
}
