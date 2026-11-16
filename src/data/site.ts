// Facts for the homepage. Source: veon/client.json (company.contacts, geography, business_lines, products_services, facts, conflicts).
// Address conflicts K-002 (Бровари), K-003 (школа Осокорки), K-004 (Теремки ІІ): the address is not shown, only the phone.
// Prices (K-005) and the number of locations (K-006) are never shown.

export interface Phone { label?: string; tel: string; text: string; }
export interface Place {
  name: string;
  note?: string;
  address?: string;
  /** Query for an external map; only for addresses without conflicts. */
  map?: string;
  phones: Phone[];
}
export interface City {
  id: string;
  name: string;
  stop: string;
  intro: string;
  places: Place[];
  /** One phone for the whole city (Івано-Франківськ). */
  cityPhone?: Phone;
}

const p = (tel: string, text: string, label?: string): Phone => ({ tel, text, label });

export const contacts = {
  phone: p("+380668884356", "+380 66 888 43 56"),
  messenger: p("+380672090514", "+380 67 209 05 14"),
  telegram: "https://t.me/+380672090514",
  viber: "viber://chat?number=+380672090514",
  schoolPhone: p("+380678228003", "+380 67 822 80 03"),
};

export const socials = [
  { id: "instagram", name: "Instagram", url: "https://www.instagram.com/m.kids_education/" },
  { id: "facebook", name: "Facebook", url: "https://www.facebook.com/mandarinka.com.ua/" },
  { id: "tiktok", name: "TikTok", url: "https://www.tiktok.com/@mkidsedu" },
  { id: "youtube", name: "YouTube", url: "https://www.youtube.com/@m.Kids_education" },
] as const;

export const cities: City[] = [
  {
    id: "kyiv",
    name: "Київ",
    stop: "Київ",
    intro: "Садочки в районах лівого й правого берега та поруч зі столицею.",
    places: [
      { name: "Осокорки", note: "ЖК «Рів'єра»", address: "вул. Алімпія Галика, 75", map: "Київ, вул. Алімпія Галика, 75", phones: [p("+380672866067", "+380 67 286 60 67")] },
      { name: "Позняки", address: "вул. Дніпровська набережна, 19А", map: "Київ, Дніпровська набережна, 19А", phones: [p("+380678227996", "+380 67 822 79 96")] },
      { name: "Теремки ІІ", phones: [p("+380678227994", "+380 67 822 79 94")] },
      { name: "Караваєві Дачі", address: "вул. Кар'єрна, 19", map: "Київ, вул. Кар'єрна, 19", phones: [p("+380976237774", "+380 97 623 77 74")] },
      { name: "Березняки", address: "просп. Павла Тичини, 18Б", map: "Київ, проспект Павла Тичини, 18Б", phones: [p("+380672865881", "+380 67 286 58 81")] },
      { name: "Пуща-Водиця", address: "вул. Федора Максименка, 13", map: "Київ, вул. Федора Максименка, 13", phones: [p("+380664510207", "+380 66 451 02 07"), p("+380678227997", "+380 67 822 79 97")] },
      { name: "Крюківщина", note: "ЖК Orange Park", address: "вул. Одеська, 23", map: "Крюківщина, вул. Одеська, 23", phones: [p("+380672865989", "+380 67 286 59 89")] },
      { name: "Петропавлівська Борщагівка", note: "ЖК «Crystal Avenue»", address: "вул. Кришталева, 1-А", map: "Петропавлівська Борщагівка, вул. Кришталева, 1-А", phones: [p("+380672866940", "+380 67 286 69 40")] },
    ],
  },
  {
    id: "brovary",
    name: "Бровари",
    stop: "Бровари",
    intro: "Садочок у Броварах, Київська область.",
    places: [
      { name: "Бровари", phones: [p("+380668884356", "+380 66 888 43 56"), p("+380678227993", "+380 67 822 79 93", "умови відвідування")] },
    ],
  },
  {
    id: "zhytomyr",
    name: "Житомир",
    stop: "Житомир",
    intro: "Садочок у Богунському районі, працює за франшизою mKids з 2024 року.",
    places: [
      { name: "Богунський район", address: "вул. Домбровського, 3д", map: "Житомир, вул. Домбровського, 3д", phones: [p("+380631300043", "+380 63 130 00 43")] },
    ],
  },
  {
    id: "lviv",
    name: "Львів",
    stop: "Львів",
    intro: "Два садочки у Львові, обидва в житлових комплексах.",
    places: [
      { name: "Бігова", note: "ЖК «Щасливий», Личаківський район", address: "вул. Бігова, 17", map: "Львів, вул. Бігова, 17", phones: [p("+380938876778", "+380 93 887 67 78")] },
      { name: "Кругла", note: "ЖК «Сад на Круглій»", address: "вул. Кругла, 5б", map: "Львів, вул. Кругла, 5б", phones: [p("+380672866020", "+380 67 286 60 20")] },
    ],
  },
  {
    id: "ivano-frankivsk",
    name: "Івано-Франківськ",
    stop: "Івано-Франківськ",
    intro: "Садочки «Благозаврик» — Private Label mKids разом із Blago Developer.",
    cityPhone: p("+380500292438", "+380 50 029 24 38"),
    places: [
      { name: "Ленкавського", address: "вул. Ленкавського, 34", map: "Івано-Франківськ, вул. Ленкавського, 34", phones: [] },
      { name: "Національної Гвардії", address: "вул. Н. Гвардії, 3Б", map: "Івано-Франківськ, вул. Національної Гвардії, 3Б", phones: [] },
      { name: "Хіміків", address: "вул. Хіміків, 28", map: "Івано-Франківськ, вул. Хіміків, 28", phones: [] },
    ],
  },
  {
    id: "poland",
    name: "Польща",
    stop: "Польща",
    intro: "Садочки у Варшаві, Прушкові, Констанцині-Єзьорні та Любліні.",
    places: [
      { name: "Варшава", note: "Мокотів", address: "Bernardyńska 16A, 02-904 Warszawa", map: "Bernardyńska 16A, 02-904 Warszawa", phones: [p("+48501781192", "+48 501 781 192")] },
      { name: "Прушків", address: "Wołowskiego 2 lok. U1, Pruszków", map: "Wołowskiego 2, Pruszków", phones: [p("+48888333861", "+48 888 333 861")] },
      { name: "Констанцин-Єзьорна", address: "Piaseczyńska 27, 05-510 Konstancin-Jeziorna", map: "Piaseczyńska 27, 05-510 Konstancin-Jeziorna", phones: [p("+48664716151", "+48 664 716 151")] },
      { name: "Люблін", address: "Agatowa 21, 20-960 Lublin", map: "Agatowa 21, 20-960 Lublin", phones: [p("+48815262770", "+48 815 262 770")] },
    ],
  },
];

export const mapUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

/** Path to a file in public/, prefixed with the site base (GitHub Pages builds use --base). */
export const asset = (p: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${p.replace(/^\//, "")}`;
