
const ENCHANTED_MAP: Record<
    string,
    Record<number, number>
> = {
    TFC: {
        5: 205,
        21: 206,
        42: 207,
        51: 208,
        75: 209,
        88: 210,
        104: 211,
        114: 212,
        139: 213,
        142: 214,
        189: 215,
        193: 216,
    },
    ROF: {
        25: 206,
        35: 207,
        47: 208,
        88: 209,
        70: 210,
        110: 211,
        126: 212,
        137: 213,
        159: 214,
        181: 215,
        189: 216,
    },
    ITI: {
        3: 205,
        7: 206,
        33: 207,
        42: 208,
        51: 209,
        65: 210,
        81: 211,
        91: 212,
        102: 213,
        105: 214,
        120: 215,
        136: 216,
        143: 217,
        154: 218,
        168: 219,
        182: 220,
        190: 221,
        195: 222,
    },
    URR: {
        4: 205,
        17: 206,
        28: 207,
        58: 208,
        59: 209,
        61: 210,
        70: 211,
        78: 212,
        97: 213,
        107: 214,
        125: 215,
        135: 216,
        138: 217,
        156: 218,
        169: 219,
        175: 220,
        191: 221,
        203: 222,
    },
    SSK: {
        3: 205,
        19: 206,
        27: 207,
        47: 208,
        50: 209,
        60: 210,
        84: 211,
        93: 212,
        96: 213,
        107: 214,
        118: 215,
        136: 216,
        150: 217,
        154: 218,
        161: 219,
        183: 220,
        194: 221,
        203: 222,
    },
    "006": {},
};

const EDITION_MAP: Record<string, string> = {
    TFC: "001",
    ROF: "002",
    ITI: "003",
    URR: "004",
    SSK: "005",
    "006": "006",
};


function pad(n: number, length: number) {
    let len = length - ("" + n).length;
    return (len > 0 ? new Array(++len).join("0") : "") + n;
}

export function createCardUrl(
    cardSet: string,
    number: number,
    opt: {
        hideCardText?: boolean;
        imageOnly?: boolean;
        language: "EN" | "DE" | "FR";
        enchanted?: boolean;
    } = { language: "EN" },
): string {
    const { language, enchanted } = opt;

    const edition = EDITION_MAP[cardSet];
    const enchantedCard: number = ENCHANTED_MAP[cardSet]?.[number] || 0;
    const cardNumber = enchanted
        ? pad(enchantedCard || number, 3)
        : pad(number, 3);

    const url = `https://six-inks.pages.dev/assets/images/cards/${language.toLocaleUpperCase()}/${edition}/${cardNumber}.avif`;

    if (opt?.imageOnly) {
        return `https://six-inks.pages.dev/assets/images/cards/${edition}/art_only/${cardNumber}.avif`;
    }

    if (opt?.hideCardText) {
        return url.replace(`/${edition}/`, `/${edition}/art_and_name/`);
    }

    // Enchanted cards are only available in English
    if (enchanted && enchantedCard) {
        return `https://six-inks.pages.dev/assets/images/cards/EN/${edition}/${cardNumber}.avif`;
    }

    return url;
}

