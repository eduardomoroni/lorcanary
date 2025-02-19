import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LandingPage() {
  return (
    <header className="dark:bg-secondaryBlack inset-0 flex min-h-[80dvh] w-full flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      <div className="mx-auto w-container max-w-full px-5 py-[110px] text-center lg:py-[150px]">
        <h1 className="text-3xl font-heading md:text-4xl lg:text-5xl">
          Lorcanary
        </h1>
        <p className="my-12 mt-8 text-lg font-normal leading-relaxed md:text-xl lg:text-2xl lg:leading-relaxed">
          Disney Lorcana TCG Card Library and Deck Builder.
        </p>
        <Button
          size="lg"
          className="h-12 text-base font-heading md:text-lg lg:h-14 lg:text-xl"
        >
          <Link href="/decks">Search Decks</Link>
        </Button>
        <Button
          size="lg"
          className="h-12 ml-2 text-base font-heading md:text-lg lg:h-14 lg:text-xl"
        >
          <Link href="/cards">Search Cards</Link>
        </Button>
      </div>
    </header>
  );
}
