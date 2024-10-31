export default async function Footer() {
  return (
    // <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center m500:text-sm z-30 bg-main50 px-5 py-5 text-center font-base dark:bg-secondaryBlack">
    //   We are not affiliated with or endorsed by The Walt Disney Company or its
    //   subsidiaries. <br />
    //   All Disney-related artwork, trademarks, and intellectual property remain
    //   the exclusive property of Disney Enterprises, Inc. Our use of these
    //   materials is solely for non-commercial, educational, or entertainment
    //   purposes under fair use and nominative use laws.
    //   <br />
    //   We respect Disney’s rights and ensure our use does not imply any
    //   endorsement or sponsorship by Disney.
    // </footer>
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center m500:text-sm z-30 bg-main50 px-5 py-5 text-center font-base dark:bg-secondaryBlack">
      This website uses trademarks and/or copyrights associated with Disney
      Lorcana TCG, used under{" "}
      <a
        target="_blank"
        className="underline"
        href="https://cdn.ravensburger.com/lorcana/community-code-en"
      >
        Ravensburger’s Community Code Policy
      </a>
      . We are expressly prohibited from charging you to use or access this
      content. This website is not published, endorsed, or specifically approved
      by Disney or Ravensburger. For more information about Disney Lorcana TCG,
      visit
      <a
        target="_blank"
        className="underline"
        href="https://www.disneylorcana.com/en-US/"
      >
        https://www.disneylorcana.com
      </a>
      .
    </footer>
  );
}
