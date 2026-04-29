import type { Product, Category } from "./types";

// ---------------------------------------------------------------------------
// Local product images (place files in public/images/)
// ---------------------------------------------------------------------------
const WIN = [
  "/images/Tanum-Toppsving-60x100-1.jpg",
  "/images/Finestra-Toppsving-100x120-2.jpg",
  "/images/2-rams-2.jpg",
  "/images/Helglasset-sort-med-gjennomgaende-sprosse.jpg",
  "/images/Line_dempet.jpg",
] as const;

const DOOR = [
  "/images/Nora.jpg",
  "/images/ask-2.jpg",
  "/images/Utvik4.jpg",
  "/images/Tanum-Toppsving-60x100-1.jpg",
  "/images/Finestra-Toppsving-100x120-2.jpg",
] as const;

// ---------------------------------------------------------------------------
// Reusable customSizing configs
// ---------------------------------------------------------------------------
const CUSTOM_FASTKARM = {
  enabled: true,
  minWidth: 30,
  maxWidth: 200,
  minHeight: 30,
  maxHeight: 200,
  basePricePerCm2: 0.48,
  glassUpcharge: { "2-lags": 0, "3-lags": 800 },
  colorUpcharge: { Hvit: 0, Sort: 400, Antrasitt: 300, Eik: 500 },
} as const satisfies Product["customSizing"];

const CUSTOM_TOPPSVING = {
  enabled: true,
  minWidth: 40,
  maxWidth: 160,
  minHeight: 60,
  maxHeight: 180,
  basePricePerCm2: 0.52,
  glassUpcharge: { "2-lags": 0, "3-lags": 900 },
  colorUpcharge: { Hvit: 0, Sort: 450, Antrasitt: 350, Eik: 550 },
} as const satisfies Product["customSizing"];

const CUSTOM_SIDEHENGSLET = {
  enabled: true,
  minWidth: 40,
  maxWidth: 120,
  minHeight: 50,
  maxHeight: 180,
  basePricePerCm2: 0.54,
  glassUpcharge: { "2-lags": 0, "3-lags": 850 },
  colorUpcharge: { Hvit: 0, Sort: 420, Antrasitt: 320, Eik: 500 },
} as const satisfies Product["customSizing"];

const CUSTOM_TOPPHENGSLET = {
  enabled: true,
  minWidth: 50,
  maxWidth: 180,
  minHeight: 40,
  maxHeight: 100,
  basePricePerCm2: 0.50,
  glassUpcharge: { "2-lags": 0, "3-lags": 780 },
  colorUpcharge: { Hvit: 0, Sort: 400, Antrasitt: 300, Eik: 480 },
} as const satisfies Product["customSizing"];

const CUSTOM_ROMNING = {
  enabled: true,
  minWidth: 60,
  maxWidth: 120,
  minHeight: 80,
  maxHeight: 160,
  basePricePerCm2: 0.58,
  glassUpcharge: { "2-lags": 0, "3-lags": 1000 },
  colorUpcharge: { Hvit: 0, Sort: 450, Antrasitt: 350, Eik: 600 },
} as const satisfies Product["customSizing"];

const CUSTOM_SPROSSER = {
  enabled: true,
  minWidth: 60,
  maxWidth: 200,
  minHeight: 80,
  maxHeight: 200,
  basePricePerCm2: 0.65,
  glassUpcharge: { "2-lags": 0, "3-lags": 1200 },
  colorUpcharge: { Hvit: 0, Sort: 600, Antrasitt: 500, Eik: 800 },
} as const satisfies Product["customSizing"];

const CUSTOM_2RAMS = {
  enabled: true,
  minWidth: 120,
  maxWidth: 250,
  minHeight: 80,
  maxHeight: 200,
  basePricePerCm2: 0.60,
  glassUpcharge: { "2-lags": 0, "3-lags": 1800 },
  colorUpcharge: { Hvit: 0, Sort: 800, Antrasitt: 600, Eik: 1000 },
} as const satisfies Product["customSizing"];

const CUSTOM_DOOR_DISABLED_STANDARD = {
  enabled: false,
  minWidth: 70,
  maxWidth: 100,
  minHeight: 200,
  maxHeight: 230,
  basePricePerCm2: 0.0,
  glassUpcharge: { "2-lags": 0, "3-lags": 0 },
  colorUpcharge: { Hvit: 0, Sort: 0, Antrasitt: 0, Eik: 0 },
} as const satisfies Product["customSizing"];

const CUSTOM_DOOR_DISABLED_SLIDE_IN = {
  enabled: false,
  minWidth: 70,
  maxWidth: 120,
  minHeight: 200,
  maxHeight: 250,
  basePricePerCm2: 0.0,
  glassUpcharge: { "2-lags": 0, "3-lags": 0 },
  colorUpcharge: { Hvit: 0, Sort: 0, Antrasitt: 0, Eik: 0 },
} as const satisfies Product["customSizing"];

const CUSTOM_YTTERDOR_STANDARD = {
  enabled: false,
  minWidth: 80,
  maxWidth: 120,
  minHeight: 200,
  maxHeight: 230,
  basePricePerCm2: 0.0,
  glassUpcharge: { "2-lags": 0, "3-lags": 0 },
  colorUpcharge: { Hvit: 0, Sort: 0, Antrasitt: 0, Eik: 0 },
} as const satisfies Product["customSizing"];

const CUSTOM_YTTERDOR_SIDEFELT = {
  enabled: false,
  minWidth: 120,
  maxWidth: 180,
  minHeight: 200,
  maxHeight: 250,
  basePricePerCm2: 0.0,
  glassUpcharge: { "2-lags": 0, "3-lags": 0 },
  colorUpcharge: { Hvit: 0, Sort: 0, Antrasitt: 0, Eik: 0 },
} as const satisfies Product["customSizing"];

const CUSTOM_YTTERDOR_DOBBEL = {
  enabled: false,
  minWidth: 150,
  maxWidth: 220,
  minHeight: 200,
  maxHeight: 250,
  basePricePerCm2: 0.0,
  glassUpcharge: { "2-lags": 0, "3-lags": 0 },
  colorUpcharge: { Hvit: 0, Sort: 0, Antrasitt: 0, Eik: 0 },
} as const satisfies Product["customSizing"];

const CUSTOM_BALKONGDOR_ENKEL = {
  enabled: true,
  minWidth: 70,
  maxWidth: 120,
  minHeight: 190,
  maxHeight: 240,
  basePricePerCm2: 0.42,
  glassUpcharge: { "2-lags": 0, "3-lags": 1500 },
  colorUpcharge: { Hvit: 0, Sort: 600, Antrasitt: 400, Eik: 700 },
} as const satisfies Product["customSizing"];

const CUSTOM_BALKONGDOR_DOBBEL = {
  enabled: true,
  minWidth: 120,
  maxWidth: 220,
  minHeight: 190,
  maxHeight: 240,
  basePricePerCm2: 0.45,
  glassUpcharge: { "2-lags": 0, "3-lags": 2500 },
  colorUpcharge: { Hvit: 0, Sort: 1000, Antrasitt: 700, Eik: 1200 },
} as const satisfies Product["customSizing"];

const CUSTOM_BALKONGDOR_SKYE = {
  enabled: false,
  minWidth: 160,
  maxWidth: 300,
  minHeight: 190,
  maxHeight: 250,
  basePricePerCm2: 0.0,
  glassUpcharge: { "2-lags": 0, "3-lags": 0 },
  colorUpcharge: { Hvit: 0, Sort: 0, Antrasitt: 0, Eik: 0 },
} as const satisfies Product["customSizing"];

const CUSTOM_BALKONGDOR_FOLDE = {
  enabled: false,
  minWidth: 180,
  maxWidth: 400,
  minHeight: 190,
  maxHeight: 250,
  basePricePerCm2: 0.0,
  glassUpcharge: { "2-lags": 0, "3-lags": 0 },
  colorUpcharge: { Hvit: 0, Sort: 0, Antrasitt: 0, Eik: 0 },
} as const satisfies Product["customSizing"];

// ---------------------------------------------------------------------------
// Product catalogue — 24 products
// ---------------------------------------------------------------------------
export const products: Product[] = [
  // -------------------------------------------------------------------------
  // VINDUER (1–12)
  // -------------------------------------------------------------------------

  // 1
  {
    slug: "fastkarm-60x80-hvit",
    name: "Fastkarm vindu 60×80 hvit",
    category: "vindu",
    type: "fastkarm",
    shortDescription: "Fast PVC-karm med 3-lags glass. Energieffektivt og vedlikeholdsfritt.",
    description:
      "Fastkarm vinduer fra Vinduskongen gir maksimal lysinnslipp uten åpnemekanisme. Perfekt for vegger der ventilasjon ikke er nødvendig. 3-lags glass holder varmen inne hele året. Vedlikeholdsfri PVC-ramme med 25 års garanti.",
    warrantyYears: 25,
    material: "PVC",
    images: [WIN[0], WIN[1], WIN[2]],
    variants: [
      { id: "fk-60x80-3l-hvit", width: 60, height: 80, glass: "3-lags", color: "Hvit", price: 2490, inStock: true },
      { id: "fk-60x80-2l-hvit", width: 60, height: 80, glass: "2-lags", color: "Hvit", price: 1890, inStock: true },
      { id: "fk-60x80-3l-ant", width: 60, height: 80, glass: "3-lags", color: "Antrasitt", price: 2790, inStock: true },
    ],
    customSizing: CUSTOM_FASTKARM,
    features: ["Vedlikeholdsfri PVC", "3-lags energiglass", "25 års garanti", "Energimerking A"],
    badges: [],
  },

  // 2
  {
    slug: "fastkarm-100x120-hvit",
    name: "Fastkarm vindu 100×120 hvit",
    category: "vindu",
    type: "fastkarm",
    shortDescription: "Stort fastkarm vindu for maksimalt lysinnslipp. Populært valg for stue og kjøkken.",
    description:
      "Store fastkarm vinduer gir en dramatisk åpning mot hagen eller utearealet. Dette 100×120 cm vinduet er vårt mest populære for stuerom. 3-lags glass holder ute kulde og støy, mens den brede rammen gir et arkitektonisk uttrykk. Karmbredde 70mm.",
    warrantyYears: 25,
    material: "PVC",
    images: [WIN[0], WIN[1], WIN[3]],
    variants: [
      { id: "fk-100x120-3l-hvit", width: 100, height: 120, glass: "3-lags", color: "Hvit", price: 4990, inStock: true },
      { id: "fk-100x120-3l-ant", width: 100, height: 120, glass: "3-lags", color: "Antrasitt", price: 5490, inStock: true },
      { id: "fk-100x120-2l-hvit", width: 100, height: 120, glass: "2-lags", color: "Hvit", price: 3890, inStock: true },
    ],
    customSizing: CUSTOM_FASTKARM,
    features: ["Vedlikeholdsfri PVC", "3-lags energiglass", "25 års garanti", "Karmbredde 70mm"],
    badges: ["Bestselger"],
  },

  // 3
  {
    slug: "fastkarm-120x60-antrasitt",
    name: "Fastkarm vindu 120×60 antrasitt",
    category: "vindu",
    type: "fastkarm",
    shortDescription: "Bredt lavt fastkarm i elegant antrasitt. Moderne uttrykk for kjøkken og bad.",
    description:
      "Det brede, lave fastkarm vinduet i antrasitt passer perfekt over kjøkkenbenken eller som dekorativt vindu i bad. Antrasitt PVC gir et moderne og eksklusivt uttrykk som passer til mørke fasader og naturmaterialer.",
    warrantyYears: 25,
    material: "PVC",
    images: [WIN[1], WIN[2], WIN[4]],
    variants: [
      { id: "fk-120x60-3l-ant", width: 120, height: 60, glass: "3-lags", color: "Antrasitt", price: 4290, inStock: true },
      { id: "fk-120x60-3l-sort", width: 120, height: 60, glass: "3-lags", color: "Sort", price: 4590, inStock: false },
      { id: "fk-120x60-2l-ant", width: 120, height: 60, glass: "2-lags", color: "Antrasitt", price: 3290, inStock: true },
    ],
    customSizing: CUSTOM_FASTKARM,
    features: ["Vedlikeholdsfri PVC", "3-lags energiglass", "Antrasitt finish", "25 års garanti"],
    badges: ["Nyhet"],
  },

  // 4
  {
    slug: "toppsving-80x100-hvit",
    name: "Toppsving vindu 80×100 hvit",
    category: "vindu",
    type: "toppsving",
    shortDescription: "Klassisk toppsving med enkel rengjøring. Best selger 2024.",
    description:
      "Toppsving vinduer roterer 180° og gjør rengjøring av ytterglaset til en enkel sak fra innsiden. Ideelt for øvre etasjer der utvendig rengjøring er vanskelig. Vår bestselger med over 5000 solgte enheter. Sikkerhetsbeslag inkludert, ventilasjonsstilling mulig.",
    warrantyYears: 25,
    material: "PVC",
    images: [WIN[0], WIN[2], WIN[3]],
    variants: [
      { id: "ts-80x100-3l-hvit", width: 80, height: 100, glass: "3-lags", color: "Hvit", price: 3890, inStock: true },
      { id: "ts-80x100-3l-ant", width: 80, height: 100, glass: "3-lags", color: "Antrasitt", price: 4190, inStock: true },
      { id: "ts-80x100-2l-hvit", width: 80, height: 100, glass: "2-lags", color: "Hvit", price: 2990, inStock: true },
    ],
    customSizing: CUSTOM_TOPPSVING,
    features: ["180° rotering for enkel rengjøring", "Ventilasjonsstilling", "Sikkerhetsbeslag", "3-lags glass", "25 års garanti"],
    badges: ["Bestselger"],
  },

  // 5
  {
    slug: "toppsving-100x120-sort",
    name: "Toppsving vindu 100×120 sort",
    category: "vindu",
    type: "toppsving",
    shortDescription: "Eksklusivt toppsving vindu i sort PVC. Statement-vindu for moderne bygg.",
    description:
      "Sort toppsving vindu for den som vil ha et dristig og moderne uttrykk. Sort PVC-ramme med børstet aluminium-beslag gir et industrielt og eksklusivt look. Ypperlig for nye boliger med mørk fasade, og passer til arkitektboliger og townhouses.",
    warrantyYears: 25,
    material: "PVC",
    images: [WIN[1], WIN[3], WIN[4]],
    variants: [
      { id: "ts-100x120-3l-sort", width: 100, height: 120, glass: "3-lags", color: "Sort", price: 6490, inStock: true },
      { id: "ts-100x120-3l-ant", width: 100, height: 120, glass: "3-lags", color: "Antrasitt", price: 6090, inStock: true },
    ],
    customSizing: CUSTOM_TOPPSVING,
    features: ["Sort PVC-ramme", "Børstet aluminium beslag", "3-lags glass", "Premium finish"],
    badges: ["Premium"],
  },

  // 6
  {
    slug: "sidehengslet-60x80-hvit",
    name: "Sidehengslet vindu 60×80 hvit",
    category: "vindu",
    type: "sidehengslet",
    shortDescription: "Hengslet på siden — åpner som en dør. Perfekt for lavt plassert ventilasjon.",
    description:
      "Sidehengslet vindu åpner utover og gir god ventilasjon ved lav montering. Ideelt for soverom og oppholdsrom der du vil ha frisk luft direkte inn. Kommer med sikkerhetsbeslag og justerbar åpningsvinkel. Enkel installasjon og god tilgang for rengjøring.",
    warrantyYears: 25,
    material: "PVC",
    images: [WIN[0], WIN[1], WIN[2]],
    variants: [
      { id: "sh-60x80-3l-hvit", width: 60, height: 80, glass: "3-lags", color: "Hvit", price: 2890, inStock: true },
      { id: "sh-60x80-3l-ant", width: 60, height: 80, glass: "3-lags", color: "Antrasitt", price: 3190, inStock: true },
      { id: "sh-60x80-2l-hvit", width: 60, height: 80, glass: "2-lags", color: "Hvit", price: 2190, inStock: true },
    ],
    customSizing: CUSTOM_SIDEHENGSLET,
    features: ["Sidehengslet åpning", "Justerbar åpningsvinkel", "Sikkerhetsbeslag", "3-lags glass", "25 års garanti"],
    badges: [],
  },

  // 7
  {
    slug: "sidehengslet-80x120-antrasitt",
    name: "Sidehengslet vindu 80×120 antrasitt",
    category: "vindu",
    type: "sidehengslet",
    shortDescription: "Stort sidehengslet i antrasitt. Populært for stue med direkte utgang til terrasse.",
    description:
      "Dette store sidehengslede vinduet i antrasitt er nesten som en dør — perfekt i kombinasjon med en balkongdør for en helhetlig åpning mot terrassen. Den brede karmen gir stødig feste og tetthet mot norsk vinterklima.",
    warrantyYears: 25,
    material: "PVC",
    images: [WIN[2], WIN[3], WIN[4]],
    variants: [
      { id: "sh-80x120-3l-ant", width: 80, height: 120, glass: "3-lags", color: "Antrasitt", price: 4990, inStock: true },
      { id: "sh-80x120-3l-hvit", width: 80, height: 120, glass: "3-lags", color: "Hvit", price: 4590, inStock: true },
    ],
    customSizing: CUSTOM_SIDEHENGSLET,
    features: ["Sidehengslet", "Extra bred karm", "3-lags glass", "Terrassekombinasjon"],
    badges: [],
  },

  // 8
  {
    slug: "topphengslet-100x60-hvit",
    name: "Topphengslet vindu 100×60 hvit",
    category: "vindu",
    type: "topphengslet",
    shortDescription: "Åpner øverst — trygt for barn og gir god luftsirkulasjon.",
    description:
      "Topphengslet vindu er hengslet i toppen og åpner utover nedenfra. Dette gir trygg ventilasjon selv når det regner, og er spesielt populært til barnerom der sikkerhet er viktig. Begrenset åpningsvinkel hindrer at barn kan stikke hodet ut.",
    warrantyYears: 25,
    material: "PVC",
    images: [WIN[0], WIN[1], WIN[3]],
    variants: [
      { id: "th-100x60-3l-hvit", width: 100, height: 60, glass: "3-lags", color: "Hvit", price: 3290, inStock: true },
      { id: "th-100x60-2l-hvit", width: 100, height: 60, glass: "2-lags", color: "Hvit", price: 2490, inStock: true },
      { id: "th-100x60-3l-ant", width: 100, height: 60, glass: "3-lags", color: "Antrasitt", price: 3590, inStock: true },
    ],
    customSizing: CUSTOM_TOPPHENGSLET,
    features: ["Topphengslet — trygt for barn", "Regnbeskyttet ventilasjon", "3-lags glass", "25 års garanti"],
    badges: [],
  },

  // 9
  {
    slug: "topphengslet-120x80-hvit",
    name: "Topphengslet vindu 120×80 hvit",
    category: "vindu",
    type: "topphengslet",
    shortDescription: "Større topphengslet for kjøkken og bad. Effektiv damptrekk.",
    description:
      "Det større topphengslet vinduet er perfekt over kjøkkenbenken for å trekke ut damp og matos. Åpner mot toppen og lager et naturlig termisk trekkutslipp. Vedlikeholdsfri PVC-karm som tåler fukt og temperatursvingninger.",
    warrantyYears: 25,
    material: "PVC",
    images: [WIN[1], WIN[2], WIN[4]],
    variants: [
      { id: "th-120x80-3l-hvit", width: 120, height: 80, glass: "3-lags", color: "Hvit", price: 4190, inStock: true },
      { id: "th-120x80-3l-ant", width: 120, height: 80, glass: "3-lags", color: "Antrasitt", price: 4590, inStock: true },
    ],
    customSizing: CUSTOM_TOPPHENGSLET,
    features: ["Topphengslet", "Damputtrekk-funksjon", "3-lags glass", "Fukttålig PVC", "25 års garanti"],
    badges: [],
  },

  // 10
  {
    slug: "romningsvindu-80x100-hvit",
    name: "Rømningsvindu 80×100 hvit",
    category: "vindu",
    type: "romning",
    shortDescription: "Godkjent rømningsvindu. Påkrevd i soverom uten direkte utgangsdør.",
    description:
      "Rømningsvinduer er påkrevd av byggforskriften i alle soverom som ikke har direkte utgangsdør. Vårt rømningsvindu er typegodkjent og oppfyller alle krav til åpningsbredde (min 50×60 cm åpning). Kombinerer sikkerhet med 3-lags energiglass og vedlikeholdsfri PVC.",
    warrantyYears: 25,
    material: "PVC",
    images: [WIN[0], WIN[2], WIN[3]],
    variants: [
      { id: "rv-80x100-3l-hvit", width: 80, height: 100, glass: "3-lags", color: "Hvit", price: 4490, inStock: true },
      { id: "rv-80x100-3l-ant", width: 80, height: 100, glass: "3-lags", color: "Antrasitt", price: 4890, inStock: true },
      { id: "rv-80x100-2l-hvit", width: 80, height: 100, glass: "2-lags", color: "Hvit", price: 3490, inStock: true },
    ],
    customSizing: CUSTOM_ROMNING,
    features: ["Typegodkjent rømningsvindu", "Oppfyller byggforskriften", "Min åpning 50×60 cm", "3-lags glass", "25 års garanti"],
    badges: [],
  },

  // 11
  {
    slug: "vindu-sprosser-100x120-hvit",
    name: "Vindu med sprosser 100×120 hvit",
    category: "vindu",
    type: "sprosser",
    shortDescription: "Klassisk vindu med innvendige sprosser. Tradisjonell stil, moderne ytelse.",
    description:
      "Vinduer med sprosser gir det klassiske norske hyttelooket eller det tradisjonelle europeiske uttrykket. Sprossene er løse og festet mellom glassflatene, så de er enkle å rengjøre. Kombinerer tradisjonell estetikk med moderne 3-lags energiglass.",
    warrantyYears: 25,
    material: "PVC",
    images: [WIN[3], WIN[4], WIN[0]],
    variants: [
      { id: "sp-100x120-3l-hvit", width: 100, height: 120, glass: "3-lags", color: "Hvit", price: 6490, inStock: true },
      { id: "sp-100x120-3l-ant", width: 100, height: 120, glass: "3-lags", color: "Antrasitt", price: 6990, inStock: false },
      { id: "sp-100x120-3l-eik", width: 100, height: 120, glass: "3-lags", color: "Eik", price: 7490, inStock: true },
    ],
    customSizing: CUSTOM_SPROSSER,
    features: ["Klassiske sprosser", "Løse sprosser mellom glass", "Enkelt rengjøring", "3-lags glass", "25 års garanti"],
    badges: ["Premium"],
  },

  // 12
  {
    slug: "2-rams-toppsving-160x120-antrasitt",
    name: "2-rams toppsving vindu 160×120 antrasitt",
    category: "vindu",
    type: "2-rams",
    shortDescription: "Dobbelt bredt toppsving. Imponerende lysinnslipp med moderne antrasitt finish.",
    description:
      "2-rams toppsving vinduer gir en bred åpning med to separate rammer som begge kan rotere 180° for enkel rengjøring. Perfekt for store vegger i stue eller hovedsoverom der du ønsker en panoramafølelse. Antrasitt-rammen gir et moderne og eksklusivt uttrykk.",
    warrantyYears: 25,
    material: "PVC",
    images: [WIN[2], WIN[3], WIN[4]],
    variants: [
      { id: "2r-160x120-3l-ant", width: 160, height: 120, glass: "3-lags", color: "Antrasitt", price: 9990, inStock: true },
      { id: "2r-160x120-3l-hvit", width: 160, height: 120, glass: "3-lags", color: "Hvit", price: 8990, inStock: true },
    ],
    customSizing: CUSTOM_2RAMS,
    features: ["2 separate rammer", "Begge rammer roterer 180°", "Panorama-følelse", "3-lags glass", "25 års garanti"],
    badges: ["Nyhet", "Premium"],
  },

  // -------------------------------------------------------------------------
  // DØRER (13–24)
  // -------------------------------------------------------------------------

  // 13
  {
    slug: "innerdor-massiv-eik-90x210",
    name: "Innerdør massiv eik 90×210",
    category: "innerdor",
    shortDescription: "Massiv eikedør med naturlig årestruktur. Tidløs kvalitet for norske hjem.",
    description:
      "Massiv eikedør fra Vinduskongen leveres i naturlig eikefinish med vakker årestruktur. Dørens vekt og soliditet gir en eksklusiv følelse og god lydisolasjon mellom rommene. Leveres ubehandlet for enkel lakkering eller oljebehandling etter eget ønske.",
    warrantyYears: 25,
    material: "Massiv eik",
    images: [DOOR[0], DOOR[1], DOOR[2]],
    variants: [
      { id: "id-me-90x210-eik", width: 90, height: 210, glass: "2-lags", color: "Eik", price: 7990, inStock: true },
    ],
    customSizing: CUSTOM_DOOR_DISABLED_STANDARD,
    features: ["100% massiv eik", "Naturlig årestruktur", "God lydisolasjon", "25 års garanti", "Leveres ubehandlet"],
    badges: ["Premium"],
  },

  // 14
  {
    slug: "innerdor-glass-80x210-hvit",
    name: "Innerdør med glass 80×210 hvit",
    category: "innerdor",
    shortDescription: "Moderne innerdør med glassinsert. Slipper inn lys mellom rommene.",
    description:
      "Innerdør med glassinsats lar lyset flyte fritt gjennom boligen og skaper en åpen og luftig følelse. Det klare glasset gir full lysgjennomgang, mens frosted-glass-alternativ gir privatliv. Hvit PVC-ramme passer til de fleste norske interiørstiler.",
    warrantyYears: 25,
    material: "PVC + glass",
    images: [DOOR[1], DOOR[2], DOOR[3]],
    variants: [
      { id: "id-gl-80x210-hvit", width: 80, height: 210, glass: "2-lags", color: "Hvit", price: 4990, inStock: true },
      { id: "id-gl-80x210-ant", width: 80, height: 210, glass: "2-lags", color: "Antrasitt", price: 5490, inStock: true },
    ],
    customSizing: CUSTOM_DOOR_DISABLED_STANDARD,
    features: ["Glassinsats", "Lysgjennomgang", "Frosted glass tilgjengelig", "Hvit PVC", "25 års garanti"],
    badges: [],
  },

  // 15
  {
    slug: "innerdor-formpresset-90x210-hvit",
    name: "Innerdør formpresset 90×210 hvit",
    category: "innerdor",
    shortDescription: "Klassisk formpresset profil. Norges mest solgte innerdør.",
    description:
      "Formpressede innerdører er den klassiske norske standarden. Panelets relieffstruktur gir dybde og karakter til rommet, og det hvite overflaten er enkel å rengjøre og male. Perfekt for hus bygget mellom 1960-2010 der du vil beholde det klassiske uttrykket.",
    warrantyYears: 25,
    material: "MDF + PVC",
    images: [DOOR[0], DOOR[2], DOOR[4]],
    variants: [
      { id: "id-fp-90x210-hvit", width: 90, height: 210, glass: "2-lags", color: "Hvit", price: 2990, inStock: true },
      { id: "id-fp-80x210-hvit", width: 80, height: 210, glass: "2-lags", color: "Hvit", price: 2790, inStock: true },
    ],
    customSizing: CUSTOM_DOOR_DISABLED_STANDARD,
    features: ["Klassisk formpresset profil", "Lett å male", "Vedlikeholdsvennlig", "25 års garanti"],
    badges: ["Bestselger"],
  },

  // 16
  {
    slug: "skyvedor-inne-90x210-hvit",
    name: "Skyvedør innendørs 90×210 hvit",
    category: "innerdor",
    shortDescription: "Plassbesparende skyvedør. Perfekt løsning for trange ganger og åpne planløsninger.",
    description:
      "Skyvedører innendørs er den ideelle løsningen der du vil spare plass og unngå et svingfelt. Dørene sklir lydløst på rustfrie skinnesystemer og er perfekte for moderne åpne planløsninger. Kan monteres utenpå veggen eller bygges inn i en niche.",
    warrantyYears: 25,
    material: "PVC",
    images: [DOOR[3], DOOR[4], DOOR[0]],
    variants: [
      { id: "sky-in-90x210-hvit", width: 90, height: 210, glass: "2-lags", color: "Hvit", price: 5490, inStock: true },
      { id: "sky-in-90x210-ant", width: 90, height: 210, glass: "2-lags", color: "Antrasitt", price: 5990, inStock: true },
    ],
    customSizing: CUSTOM_DOOR_DISABLED_SLIDE_IN,
    features: ["Plassbesparende", "Rustfri skinne", "Lydfri skyving", "Innbygg i niche mulig", "25 års garanti"],
    badges: [],
  },

  // 17
  {
    slug: "ytterdor-enkel-100x210-sort",
    name: "Ytterdør enkel 100×210 sort PVC",
    category: "ytterdor",
    shortDescription: "Solid sort PVC ytterdør. Moderne og tidløs — passer til alle fasader.",
    description:
      "Sort ytterdør i vedlikeholdsfri PVC er et av våre mest populære produkter. Den solide konstruksjonen med 3-punkts låsesystem gir god sikkerhet, og PVC-karmen holder seg pent i alle årstider uten maling eller behandling. 3-lags glass i glassfelt (tillegg).",
    warrantyYears: 25,
    material: "PVC",
    images: [DOOR[0], DOOR[1], DOOR[2]],
    variants: [
      { id: "yd-en-100x210-sort", width: 100, height: 210, glass: "2-lags", color: "Sort", price: 8990, inStock: true },
      { id: "yd-en-100x210-ant", width: 100, height: 210, glass: "2-lags", color: "Antrasitt", price: 8490, inStock: true },
      { id: "yd-en-100x210-hvit", width: 100, height: 210, glass: "2-lags", color: "Hvit", price: 7990, inStock: true },
    ],
    customSizing: CUSTOM_YTTERDOR_STANDARD,
    features: ["3-punkts låsesystem", "Vedlikeholdsfri PVC", "Isolert kjerne", "25 års garanti", "Godkjent til norsk klima"],
    badges: [],
  },

  // 18
  {
    slug: "ytterdor-glass-100x210-antrasitt",
    name: "Ytterdør med glass 100×210 antrasitt",
    category: "ytterdor",
    shortDescription: "Ytterdør med glassseksjoner i antrasitt. Slipper inn lys i entreen.",
    description:
      "Kombinasjonen av solid PVC-karm og glassseksjoner gir entreen naturlig dagslys og et åpent, innbydende uttrykk. Glasset er herdet og sikkerhetsgodkjent. Antrasitt-finishen gir et moderne skandinavisk uttrykk som passer til de fleste fasader.",
    warrantyYears: 25,
    material: "PVC + herdet glass",
    images: [DOOR[1], DOOR[2], DOOR[3]],
    variants: [
      { id: "yd-gl-100x210-ant", width: 100, height: 210, glass: "2-lags", color: "Antrasitt", price: 11490, comparePrice: 13990, inStock: true },
      { id: "yd-gl-100x210-sort", width: 100, height: 210, glass: "2-lags", color: "Sort", price: 11990, comparePrice: 14490, inStock: true },
    ],
    customSizing: CUSTOM_YTTERDOR_STANDARD,
    features: ["Herdet sikkerhetsglass", "Lysinnslipp i entreen", "3-punkts lås", "Antrasitt PVC", "25 års garanti"],
    badges: ["Bestselger", "Tilbud"],
  },

  // 19
  {
    slug: "ytterdor-sidefelt-140x210-sort",
    name: "Ytterdør med sidefelt 140×210 sort",
    category: "ytterdor",
    shortDescription: "Ytterdør med fast sidefelt. Imponerende entré-løsning for villaer og rekkehus.",
    description:
      "Ytterdør med fast sidefelt gir en monumental og eksklusiv entréåpning. Sidefeltets glass slipper inn ekstra lys og gir en åpen og innbydende fasade. Den totale bredden på 140 cm inkluderer det faste sidefelt. Perfekt for villaer med høy takhøyde.",
    warrantyYears: 25,
    material: "PVC + herdet glass",
    images: [DOOR[2], DOOR[3], DOOR[4]],
    variants: [
      { id: "yd-sf-140x210-sort", width: 140, height: 210, glass: "2-lags", color: "Sort", price: 15990, inStock: true },
      { id: "yd-sf-140x210-ant", width: 140, height: 210, glass: "2-lags", color: "Antrasitt", price: 14990, inStock: true },
    ],
    customSizing: CUSTOM_YTTERDOR_SIDEFELT,
    features: ["Fast sidefelt", "140 cm total bredde", "Herdet glass", "Monumental inngang", "25 års garanti"],
    badges: ["Premium"],
  },

  // 20
  {
    slug: "dobbel-ytterdor-180x210-antrasitt",
    name: "Dobbel ytterdør 180×210 antrasitt",
    category: "ytterdor",
    shortDescription: "To-fløyet ytterdør. Dramatisk inngang for store boliger og næringsbygg.",
    description:
      "Dobbel ytterdør med to åpningsfløyer gir en dramatisk og imponerende inngang. Total bredde 180 cm gir enkel adkomst med møbler, barnevogn og sykkel. Begge dørene låses med koordinert 3-punkts låsesystem. Antrasitt-finishen gir et moderne og eksklusivt preg.",
    warrantyYears: 25,
    material: "PVC",
    images: [DOOR[0], DOOR[2], DOOR[4]],
    variants: [
      { id: "dyd-180x210-ant", width: 180, height: 210, glass: "2-lags", color: "Antrasitt", price: 19990, inStock: true },
      { id: "dyd-180x210-sort", width: 180, height: 210, glass: "2-lags", color: "Sort", price: 21490, inStock: false },
    ],
    customSizing: CUSTOM_YTTERDOR_DOBBEL,
    features: ["To åpningsfløyer", "Koordinert 3-punkts lås", "180 cm total bredde", "Antrasitt PVC", "25 års garanti"],
    badges: ["Premium"],
  },

  // 21
  {
    slug: "balkongdor-90x210-hvit",
    name: "Balkongdør 90×210 hvit",
    category: "balkongdor",
    shortDescription: "Standard balkongdør med 3-lags glass. Tett og energieffektiv.",
    description:
      "Balkongdøren fra Vinduskongen er designet for norsk klima med ekstrem kulde og fuktighet. 3-lags glass holder varmen inne. Bunnterskelen er lavschwellig for enkel adkomst og oppfyller krav til universell utforming.",
    warrantyYears: 25,
    material: "PVC",
    images: [DOOR[3], DOOR[4], DOOR[1]],
    variants: [
      { id: "bd-90x210-3l-hvit", width: 90, height: 210, glass: "3-lags", color: "Hvit", price: 7490, inStock: true },
      { id: "bd-90x210-3l-ant", width: 90, height: 210, glass: "3-lags", color: "Antrasitt", price: 8290, inStock: true },
      { id: "bd-90x210-2l-hvit", width: 90, height: 210, glass: "2-lags", color: "Hvit", price: 5990, inStock: true },
    ],
    customSizing: CUSTOM_BALKONGDOR_ENKEL,
    features: ["3-lags energiglass", "Lavschwellig terskel", "Universell utforming", "25 års garanti"],
    badges: [],
  },

  // 22
  {
    slug: "dobbel-balkongdor-160x210-hvit",
    name: "Dobbel balkongdør 160×210 hvit",
    category: "balkongdor",
    shortDescription: "To-fløyet balkongdør. Åpner opp hele veggen mot terrassen.",
    description:
      "Dobbel balkongdør gir en vid åpning mot terrasse eller hage og skaper en sømløs overgang mellom inne og ute. De to fløyene åpner 180° og låses mot vegg for full åpning. 3-lags glass i begge fløyer gir utmerket energiytelse.",
    warrantyYears: 25,
    material: "PVC",
    images: [DOOR[2], DOOR[3], DOOR[4]],
    variants: [
      { id: "dbd-160x210-3l-hvit", width: 160, height: 210, glass: "3-lags", color: "Hvit", price: 13990, inStock: true },
      { id: "dbd-160x210-3l-ant", width: 160, height: 210, glass: "3-lags", color: "Antrasitt", price: 15490, inStock: true },
    ],
    customSizing: CUSTOM_BALKONGDOR_DOBBEL,
    features: ["To fløyer, 180° åpning", "3-lags energiglass", "Låsbar mot vegg", "Lavschwellig", "25 års garanti"],
    badges: ["Bestselger"],
  },

  // 23
  {
    slug: "skyvedor-balkong-200x210-antrasitt",
    name: "Skyvedør balkong 200×210 antrasitt",
    category: "balkongdor",
    shortDescription: "Bred skyvedør for balkong og terrasse. Maksimal åpning uten svingfelt.",
    description:
      "Skyvedøren for balkong gir en 200 cm bred åpning uten at du trenger plass til å svinge dørene. Perfekt for moderne terrasserom og vinterverandaer. Dørene sklir på to spor og legger seg utenpå hverandre for full gjennomgang. 3-lags glass er standard.",
    warrantyYears: 25,
    material: "PVC + aluminium spor",
    images: [DOOR[0], DOOR[1], DOOR[3]],
    variants: [
      { id: "sky-bal-200x210-3l-ant", width: 200, height: 210, glass: "3-lags", color: "Antrasitt", price: 21990, inStock: true },
      { id: "sky-bal-200x210-3l-hvit", width: 200, height: 210, glass: "3-lags", color: "Hvit", price: 19990, inStock: true },
    ],
    customSizing: CUSTOM_BALKONGDOR_SKYE,
    features: ["To-spors skyving", "200 cm åpning uten svingfelt", "3-lags glass", "Aluminium spor", "25 års garanti"],
    badges: ["Nyhet"],
  },

  // 24
  {
    slug: "foldedor-240x210-hvit",
    name: "Foldedør 240×210 hvit",
    category: "balkongdor",
    shortDescription: "4-fløyet foldedør. Transformerer veggen til et panoramavindu mot terrassen.",
    description:
      "Foldedøren bretter seg helt til siden og gjør hele veggen til en åpning. De fire fløyene folder seg kompakt og er knapt synlige når de er åpne. Ideelt for sommerstuer, terrasserom og åpne kjøkkenløsninger med stor terrasse. Premium vedlikeholdsfri PVC.",
    warrantyYears: 25,
    material: "PVC",
    images: [DOOR[1], DOOR[2], DOOR[4]],
    variants: [
      { id: "fold-240x210-3l-hvit", width: 240, height: 210, glass: "3-lags", color: "Hvit", price: 24990, inStock: true },
      { id: "fold-240x210-3l-ant", width: 240, height: 210, glass: "3-lags", color: "Antrasitt", price: 27990, inStock: false },
    ],
    customSizing: CUSTOM_BALKONGDOR_FOLDE,
    features: ["4 foldbare fløyer", "Full veggåpning", "Kompakt folding", "3-lags glass", "25 års garanti"],
    badges: ["Premium"],
  },
];

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.badges && p.badges.length > 0);
}

export function getAllSlugs(): { kategori: string; slug: string }[] {
  return products.map((p) => ({ kategori: p.category, slug: p.slug }));
}
