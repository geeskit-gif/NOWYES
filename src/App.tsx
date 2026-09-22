import React, { useState, useEffect, useRef } from "react";
import logoUrl from "./assets/nowyes-logo.png";
import {
  FileText,
  Briefcase,
  HeartPulse,
  UtensilsCrossed,
  LifeBuoy,
  MapPinned,
  User,
  Folder,
  ClipboardList,
  FileCheck,
  Navigation,
  Download,
  Eye,
  X,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  AlertTriangle,
  Wifi,
  BatteryCharging,
  Building2,
  GraduationCap,
} from "lucide-react";

type Lang = "es" | "en" | "ht";
type Route = "home" | "docs" | "forms" | "work" | "health" | "food" | "help" | "map" | "kit";

const translations = {
  es: {
    homeQuestion: "¿QUÉ NECESITAS HOY?",
    homeSub: "Cuéntanos qué necesitas y te guiamos.",
    entry: {
      docs: "DOCUMENTOS",
      work: "TRABAJO",
      health: "SALUD",
      food: "COMIDA",
      help: "AYUDA",
      map: "MAPA",
    },
    myKit: "MI KIT",
    myKitDesc: "Tus datos, documentos y avances guardados localmente.",
    myKitItems: {
      datos: "Mis datos",
      docs: "Mis documentos",
      cv: "CV",
      exp: "Mi experiencia laboral",
      forms: "Formularios",
      checklist: "Checklist",
    },
    guidedTitle: "¿NO SABES POR DÓNDE EMPEZAR?",
    guidedSub: "Responde 3 preguntas rápidas y te armamos una ruta clara.",
    guidedBtn: "EMPEZAR",
    bottom: { home: "INICIO", map: "MAPA", kit: "MI KIT", help: "AYUDA" },
    empty: {
      datos: "Todavía no tienes información guardada.",
      docs: "Aún no has agregado documentos.",
      cv: "Aún no has creado tu CV.",
      exp: "Agrega tu experiencia para construir tu CV.",
      forms: "No hay formularios guardados.",
      checklist: "Tu lista está vacía. Agrega tareas importantes.",
    },
    trust:
      "NOWYES es una herramienta de orientación. Los requisitos, costos y procedimientos oficiales pueden cambiar. Verifica siempre la información con la fuente oficial. NOWYES no es una agencia gubernamental, INM, abogado ni autoridad legal.",
    officialReq: "REQUISITOS OFICIALES",
    usefulPrep: "PREPARACIÓN ÚTIL",
    verified: "INFORMACIÓN VERIFICADA",
    demo: "DEMO / POR VERIFICAR",
    whereAmI: "¿DÓNDE ESTOY?",
    downloadOffline: "DESCARGAR DATOS PARA USAR SIN INTERNET",
    offlineBadge: "SIN INTERNET",
    onlineBadge: "CONECTADO",
    previewCV: "PREVIEW CV",
    downloadCV: "DESCARGAR CV",
    save: "Guardar",
    saved: "Guardado localmente (DEMO)",
    locationDenied: "No pudimos obtener tu ubicación. Mostramos Tapachula centro como respaldo. Activa el GPS para mejorar resultados.",
    locationFound: "Ubicación aproximada encontrada.",
    formProgress: "Paso",
    back: "Atrás",
    next: "Siguiente",
    review: "Revisar",
    finish: "Finalizar",
    helpQ1: "¿Cuál es tu situación ahora?",
    helpOptions: [
      "Acabo de llegar a Tapachula",
      "Necesito regularizar documentos",
      "Busco trabajo urgente",
      "Necesito ayuda médica o alimentos",
    ],
    healthTitle: "Servicios de salud cercanos",
    foodTitle: "Comida y servicios esenciales",
    workTitle: "Oportunidades y CV",
    docsTitle: "Trámites en Tapachula",
    formsTitle: "Ayuda con formularios",
    mapTitle: "Mapa de servicios - Tapachula",
    kitTabsHint: "Todo se guarda solo en este dispositivo. No se envía a ningún servidor.",
  },
  en: {
    homeQuestion: "WHAT DO YOU NEED TODAY?",
    homeSub: "Tell us what you need and we'll guide you.",
    entry: {
      docs: "DOCUMENTS",
      work: "WORK",
      health: "HEALTH",
      food: "FOOD",
      help: "HELP",
      map: "MAP",
    },
    myKit: "MY KIT",
    myKitDesc: "Your data, documents and progress saved locally.",
    myKitItems: {
      datos: "My information",
      docs: "My documents",
      cv: "CV",
      exp: "My work experience",
      forms: "Forms",
      checklist: "Checklist",
    },
    guidedTitle: "WHAT DO YOU NEED HELP WITH?",
    guidedSub: "Answer 3 quick questions and we will build a clear plan.",
    guidedBtn: "START",
    bottom: { home: "HOME", map: "MAP", kit: "MY KIT", help: "HELP" },
    empty: {
      datos: "My information is still empty.",
      docs: "No documents added yet.",
      cv: "You haven't created your CV yet.",
      exp: "Add your experience to build your CV.",
      forms: "No saved forms.",
      checklist: "Your list is empty. Add important tasks.",
    },
    trust:
      "NOWYES is a guidance tool. Official requirements, costs, and procedures may change. Always verify information with the official source. NOWYES is not a government agency, INM, a lawyer, or a legal authority.",
    officialReq: "OFFICIAL REQUIREMENTS",
    usefulPrep: "USEFUL PREPARATION",
    verified: "VERIFIED INFORMATION",
    demo: "DEMO / NEEDS VERIFICATION",
    whereAmI: "WHERE AM I?",
    downloadOffline: "DOWNLOAD DATA FOR OFFLINE USE",
    offlineBadge: "OFFLINE",
    onlineBadge: "ONLINE",
    previewCV: "PREVIEW MY CV",
    downloadCV: "DOWNLOAD MY CV",
    save: "Save",
    saved: "Saved locally (DEMO)",
    locationDenied:
      "We couldn't get your location. Showing central Tapachula as fallback. Enable GPS for better results.",
    locationFound: "Approximate location found.",
    formProgress: "Step",
    back: "Back",
    next: "Next",
    review: "Review",
    finish: "Finish",
    helpQ1: "What is your situation now?",
    helpOptions: [
      "I just arrived in Tapachula",
      "I need to sort out documents",
      "I urgently need work",
      "I need medical help or food",
    ],
    healthTitle: "Nearby health services",
    foodTitle: "Food and essential services",
    workTitle: "Opportunities and CV",
    docsTitle: "Procedures in Tapachula",
    formsTitle: "Form assistance",
    mapTitle: "Service map - Tapachula",
    kitTabsHint: "Everything is saved only on this device. Nothing is sent to a server.",
  },
  ht: {
    homeQuestion: "KISA OU BEZWEN JODI A?",
    homeSub: "Di nou sa ou bezwen epi n ap gide w.",
    entry: {
      docs: "DOKIMAN",
      work: "TRAVAY",
      health: "SANTE",
      food: "MANJE",
      help: "ÈD",
      map: "KAT",
    },
    myKit: "KIT MWEN",
    myKitDesc: "Done w, dokiman w ak pwogrè w anrejistre lokalman.",
    myKitItems: {
      datos: "Enfòmasyon mwen",
      docs: "Dokiman mwen",
      cv: "CV",
      exp: "Eksperyans travay mwen",
      forms: "Fòm",
      checklist: "Lis verifikasyon",
    },
    guidedTitle: "KI SA OU BEZWEN ÈD AVÈ L?",
    guidedSub: "Reponn 3 kesyon rapid epi n ap fè yon plan klè pou ou.",
    guidedBtn: "KÒMANSE",
    bottom: { home: "AKÈY", map: "KAT", kit: "KIT MWEN", help: "ÈD" },
    empty: {
      datos: "Ou poko gen enfòmasyon ki anrejistre.",
      docs: "Ou poko ajoute dokiman.",
      cv: "Ou poko kreye CV ou.",
      exp: "Ajoute eksperyans ou pou bati CV ou.",
      forms: "Pa gen fòm anrejistre.",
      checklist: "Lis ou vid. Ajoute travay enpòtan.",
    },
    trust:
      "NOWYES se yon zouti oryantasyon. Kondisyon ofisyèl yo, frè yo ak pwosedi yo ka chanje. Toujou verifye enfòmasyon yo ak sous ofisyèl la. NOWYES pa yon ajans gouvènman, INM, avoka, oswa otorite legal.",
    officialReq: "KONDISYON OFISYÈL",
    usefulPrep: "PREPARASYON ITIL",
    verified: "ENFÒMASYON VERIFYE",
    demo: "DEMO / BEZWEN VERIFIKASYON",
    whereAmI: "KI KOTE MW YE?",
    downloadOffline: "TELECHAJE DONE POU ITILIZE SAN ENTÈNÈT",
    offlineBadge: "SAN ENTÈNÈT",
    onlineBadge: "KONEKTE",
    previewCV: "WÈ CV MWEN",
    downloadCV: "TELECHAJE CV MWEN",
    save: "Anrejistre",
    saved: "Anrejistre lokalman (DEMO)",
    locationDenied:
      "Nou pa t ka jwenn kote ou ye a. N ap montre sant Tapachula kòm sipò. Aktive GPS pou pi bon rezilta.",
    locationFound: "Nou jwenn kote w apeprè.",
    formProgress: "Etap",
    back: "Retounen",
    next: "Kontinye",
    review: "Revize",
    finish: "Fini",
    helpQ1: "Ki sitiyasyon ou ye kounye a?",
    helpOptions: [
      "Mwen fèk rive Tapachula",
      "Mwen bezwen dokiman",
      "M ap chèche travay ijan",
      "Mwen bezwen èd medikal oswa manje",
    ],
    healthTitle: "Sèvis sante toupre",
    foodTitle: "Manje ak sèvis esansyèl",
    workTitle: "Opòtinite ak CV",
    docsTitle: "Pwosedi nan Tapachula",
    formsTitle: "Èd ak fòm",
    mapTitle: "Kat sèvis - Tapachula",
    kitTabsHint: "Tout bagay anrejistre sèlman sou aparèy sa a. Anyen pa voye sou sèvè.",
  },
};

type Service = {
  id: string;
  category: string;
  name: Record<Lang, string>;
  desc: Record<Lang, string>;
  location: string;
  hours: string;
  contact: string;
  verified: boolean;
  last: string;
  offline: boolean;
  x: number;
  y: number;
};

const services: Service[] = [
  {
    id: "1",
    category: "migration",
    name: { es: "COMAR Tapachula", en: "COMAR Tapachula", ht: "COMAR Tapachula" },
    desc: {
      es: "Solicitud de reconocimiento de condición de refugiado. Llega temprano.",
      en: "Refugee status application. Arrive early.",
      ht: "Demann estati refijye. Vini bonè.",
    },
    location: "Av. Central, Tapachula",
    hours: "Lun-Vie 9:00-15:00",
    contact: "Fuente oficial COMAR",
    verified: true,
    last: "2025-12-01",
    offline: true,
    x: 28,
    y: 34,
  },
  {
    id: "2",
    category: "assistance",
    name: { es: "Casa del Migrante Belén", en: "Belén Migrant House", ht: "Kay Migran Belén" },
    desc: {
      es: "Albergue, asesoría y alimentos. Registro previo.",
      en: "Shelter, counseling and meals. Prior registration.",
      ht: "Ebèjman, konsèy ak manje. Enskripsyon anvan.",
    },
    location: "Col. San Antonio Cahoacán",
    hours: "24h - cupo limitado",
    contact: "Contacto local verificado",
    verified: true,
    last: "2025-11-28",
    offline: true,
    x: 62,
    y: 22,
  },
  {
    id: "3",
    category: "health",
    name: { es: "Centro de Salud Tapachula Centro", en: "Tapachula Central Health Center", ht: "Sant Sante Sant Tapachula" },
    desc: {
      es: "Atención básica, vacunas, urgencias leves.",
      en: "Basic care, vaccines, minor emergencies.",
      ht: "Swen debaz, vaksen, ijans lejè.",
    },
    location: "Calle Central, Centro",
    hours: "Lun-Dom 8:00-20:00",
    contact: "Secretaría de Salud",
    verified: true,
    last: "2025-11-20",
    offline: true,
    x: 45,
    y: 55,
  },
  {
    id: "4",
    category: "food",
    name: { es: "Mercado San Juan", en: "San Juan Market", ht: "Mache San Juan" },
    desc: { es: "Alimentos económicos, frutas, abarrotes.", en: "Affordable food, fruits, groceries.", ht: "Manje bon mache, fwi, pwovizyon." },
    location: "Mercado San Juan, Centro",
    hours: "6:00-18:00",
    contact: "Comerciantes locales",
    verified: false,
    last: "2025-11-15",
    offline: false,
    x: 52,
    y: 68,
  },
  {
    id: "5",
    category: "shelter",
    name: { es: "Albergue Jesús el Buen Pastor", en: "Good Shepherd Shelter", ht: "Ebèjman Bon Bèje a" },
    desc: { es: "Hospedaje temporal, apoyo humanitario.", en: "Temporary lodging, humanitarian support.", ht: "Lojman tanporè, sipò imanitè." },
    location: "Tapachula Sur",
    hours: "Lun-Dom 7:00-19:00",
    contact: "Equipo humanitario",
    verified: false,
    last: "2025-11-10",
    offline: true,
    x: 70,
    y: 78,
  },
  {
    id: "6",
    category: "work",
    name: { es: "Bolsa de Trabajo Municipal", en: "Municipal Job Board", ht: "Biwo Travay Minisipal" },
    desc: {
      es: "Vacantes locales: limpieza, cocina, construcción.",
      en: "Local openings: cleaning, kitchen, construction.",
      ht: "Travay lokal: netwayaj, kwizin, konstriksyon.",
    },
    location: "Palacio Municipal",
    hours: "Lun-Vie 9:00-14:00",
    contact: "Ayuntamiento",
    verified: true,
    last: "2025-12-02",
    offline: true,
    x: 40,
    y: 40,
  },
  {
    id: "7",
    category: "sim",
    name: { es: "Telcel Centro - SIM y Recargas", en: "Telcel Center - SIM & Top-up", ht: "Telcel Sant - SIM ak Rechaj" },
    desc: { es: "Compra de chip, recargas, internet.", en: "SIM purchase, top-up, internet.", ht: "Acha SIM, rechaj, entènèt." },
    location: "Av. Central Norte",
    hours: "9:00-20:00",
    contact: "Tienda oficial",
    verified: false,
    last: "2025-11-25",
    offline: false,
    x: 35,
    y: 62,
  },
  {
    id: "8",
    category: "wifi",
    name: { es: "Biblioteca Pública - WiFi Libre", en: "Public Library - Free WiFi", ht: "Bibliyotèk Piblik - WiFi Gratis" },
    desc: { es: "WiFi gratuito 60 min, espacio tranquilo.", en: "Free WiFi 60 min, quiet space.", ht: "WiFi gratis 60 min, kote trankil." },
    location: "Parque Central",
    hours: "Lun-Vie 10:00-17:00",
    contact: "Municipio",
    verified: true,
    last: "2025-11-18",
    offline: false,
    x: 48,
    y: 48,
  },
  {
    id: "9",
    category: "bank",
    name: { es: "Banco Azteca - Cajero y envíos", en: "Banco Azteca - ATM & transfers", ht: "Banco Azteca - ATM ak transfè" },
    desc: { es: "Retiros, depósitos, envíos nacionales.", en: "Withdrawals, deposits, domestic transfers.", ht: "Retrè, depo, transfè nasyonal." },
    location: "Centro, sucursal principal",
    hours: "9:00-18:00",
    contact: "Banco Azteca",
    verified: true,
    last: "2025-11-30",
    offline: false,
    x: 55,
    y: 38,
  },
];

type Procedure = {
  id: string;
  title: Record<Lang, string>;
  official: { req: Record<Lang, string[]>; fees: string; appointment: Record<Lang, string>; source: string; last: string };
  prep: { steps: Record<Lang, string[]>; docs: Record<Lang, string[]>; forms: string[] };
  verified: boolean;
};

const procedures: Procedure[] = [
  {
    id: "curp",
    title: { es: "CURP - Clave Única", en: "CURP - Personal ID", ht: "CURP - Nimewo Idantite" },
    official: {
      req: {
        es: ["Documento de identidad", "Comprobante de estancia (COMAR/INM si aplica)"],
        en: ["ID document", "Proof of stay (COMAR/INM if applicable)"],
        ht: ["Dokiman idantite", "Prèv sejou (COMAR/INM si sa aplikab)"],
      },
      fees: "Gratuito / Free / Gratis (DEMO)",
      appointment: { es: "Módulo RENAPO Tapachula", en: "RENAPO office Tapachula", ht: "Biwo RENAPO Tapachula" },
      source: "RENAPO / SEGOB",
      last: "2025-12-01",
    },
    prep: {
      steps: {
        es: ["Verifica que tu nombre coincida en todos los documentos", "Lleva copias legibles", "Anota tu CURP temporal si te la dieron"],
        en: ["Check your name matches across documents", "Bring readable copies", "Note temporary CURP if given"],
        ht: ["Verifye non ou menm jan nan tout dokiman", "Pote kopi ki lizib", "Note CURP tanporè si yo ba ou li"],
      },
      docs: {
        es: ["Pasaporte o constancia", "Comprobante de trámite COMAR"],
        en: ["Passport or certificate", "COMAR process receipt"],
        ht: ["Paspò oswa sètifika", "Resi pwosesis COMAR"],
      },
      forms: ["Formato CURP (DEMO)"],
    },
    verified: false,
  },
  {
    id: "temporal",
    title: { es: "Residencia Temporal por Razones Humanitarias", en: "Temporary Residence - Humanitarian", ht: "Rezidans Tanporè - Imanitè" },
    official: {
      req: {
        es: ["Oficio COMAR positivo", "Pasaporte o documento identidad", "Fotos tamaño infantil"],
        en: ["Positive COMAR letter", "Passport or ID", "Passport photos"],
        ht: ["Lèt COMAR pozitif", "Paspò oswa ID", "Foto paspò"],
      },
      fees: "Según INM / Per INM / Dapre INM (DEMO)",
      appointment: { es: "INM Tapachula - cita en línea", en: "INM Tapachula - online appointment", ht: "INM Tapachula - randevou sou entènèt" },
      source: "INM",
      last: "2025-11-29",
    },
    prep: {
      steps: {
        es: ["Guarda original y copia del oficio COMAR", "Prepara 3 copias de todo", "Lleva comprobante de domicilio si tienes"],
        en: ["Keep original and copy of COMAR letter", "Prepare 3 copies of everything", "Bring proof of address if you have it"],
        ht: ["Kenbe orijinal ak kopi lèt COMAR", "Prepare 3 kopi tout bagay", "Pote prèv adrès si ou genyen"],
      },
      docs: {
        es: ["Oficio COMAR", "Identificación", "Fotos"],
        en: ["COMAR letter", "ID", "Photos"],
        ht: ["Lèt COMAR", "ID", "Foto"],
      },
      forms: ["Formato Básico INM (DEMO)"],
    },
    verified: false,
  },
  {
    id: "domicilio",
    title: { es: "Comprobante de Domicilio", en: "Proof of Address", ht: "Prèv Adrès" },
    official: {
      req: {
        es: ["Identificación", "Recibo de luz/agua o constancia vecinal", "2 testigos con INE (varía por municipio)"],
        en: ["ID", "Utility bill or neighborhood certificate", "2 witnesses with INE (varies)"],
        ht: ["ID", "Bòdwo limyè/dlo oswa sètifika katye", "2 temwen ak INE (varye)"],
      },
      fees: "Gratuito o bajo costo / Free or low cost",
      appointment: { es: "Ayuntamiento / Delegación", en: "City Hall", ht: "Meri" },
      source: "Ayuntamiento de Tapachula",
      last: "2025-11-20",
    },
    prep: {
      steps: {
        es: ["Si rentas, pide recibo al casero", "Toma foto del domicilio con número visible", "Anota entre qué calles está"],
        en: ["If renting, ask landlord for receipt", "Photo of house with number visible", "Note cross streets"],
        ht: ["Si w ap lwe, mande bòdwo kay la", "Foto kay la ak nimewo vizib", "Note ki lari kwaze"],
      },
      docs: { es: ["INE testigos si aplica", "Fotos domicilio"], en: ["Witness IDs if needed", "Address photos"], ht: ["ID temwen si nesesè", "Foto adrès"] },
      forms: ["Formato vecinal (DEMO)"],
    },
    verified: false,
  },
  {
    id: "rfc",
    title: { es: "RFC - Registro Federal", en: "RFC - Tax ID", ht: "RFC - Nimewo Taks" },
    official: {
      req: {
        es: ["CURP", "Comprobante domicilio", "Identificación oficial"],
        en: ["CURP", "Proof of address", "Official ID"],
        ht: ["CURP", "Prèv adrès", "ID ofisyèl"],
      },
      fees: "Gratuito",
      appointment: { es: "SAT Tapachula - cita", en: "SAT Tapachula - appointment", ht: "SAT Tapachula - randevou" },
      source: "SAT",
      last: "2025-11-18",
    },
    prep: {
      steps: {
        es: ["Verifica tu CURP esté correcta", "Lleva USB para e.firma si aplica", "Confirma tu domicilio actual"],
        en: ["Verify CURP is correct", "Bring USB for e-signature if needed", "Confirm current address"],
        ht: ["Verifye CURP kòrèk", "Pote USB pou siyati elektwonik si bezwen", "Konfime adrès aktyèl ou"],
      },
      docs: { es: ["CURP impreso", "ID", "Comprobante"], en: ["Printed CURP", "ID", "Proof"], ht: ["CURP enprime", "ID", "Prèv"] },
      forms: ["Pre-registro SAT (DEMO)"],
    },
    verified: false,
  },
];

const jobMocks = [
  { title: { es: "Cocinero/a - Turno mañana", en: "Cook - Morning shift", ht: "Kwizinyè - Maten" }, place: "Restaurante Centro", pay: "$250/día", type: "work" },
  { title: { es: "Limpieza - Hotel", en: "Cleaning - Hotel", ht: "Netwayaj - Otèl" }, place: "Hotel Plaza", pay: "$200/día", type: "work" },
  { title: { es: "Ayudante de construcción", en: "Construction helper", ht: "Èd konstriksyon" }, place: "Obra Sur", pay: "$300/día", type: "work" },
  { title: { es: "Mesero/a fin de semana", en: "Waiter weekend", ht: "Sèvè wikenn" }, place: "Café Central", pay: "$180/día + propinas", type: "work" },
];

function useLocalStorage<T>(key: string, initial: T) {
  const [val, setVal] = useState<T>(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? (JSON.parse(s) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {}
  }, [key, val]);
  return [val, setVal] as const;
}

export default function App() {
  const [lang, setLang] = useState<Lang>("es");
  const [route, setRoute] = useState<Route>("home");
  const [isOnline, setIsOnline] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpStep, setHelpStep] = useState(0);
  const [helpChoice, setHelpChoice] = useState<number | null>(null);
  const [mapCat, setMapCat] = useState<string>("all");
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [locMsg, setLocMsg] = useState<string | null>(null);
  const [kitTab, setKitTab] = useState<"datos" | "docs" | "cv" | "exp" | "forms" | "checklist">("datos");
  const [formStep, setFormStep] = useState(0);
  const [showCVPreview, setShowCVPreview] = useState(false);

  // Kit data
  const [myData, setMyData] = useLocalStorage("nowyes_mydata", {
    nombre: "",
    telefono: "",
    nacimiento: "",
    origen: "",
    direccion: "",
  });
  const [myDocs, setMyDocs] = useLocalStorage("nowyes_mydocs", [] as { id: string; name: string; date: string }[]);
  const [myExp, setMyExp] = useLocalStorage("nowyes_myexp", [] as { id: string; puesto: string; empresa: string; anios: string }[]);
  const [myCV, setMyCV] = useLocalStorage("nowyes_mycv", {
    nombre: "",
    objetivo: "",
    telefono: "",
    email: "",
    habilidades: "",
    idiomas: "",
    referencias: "",
  });
  const [myChecklist, setMyChecklist] = useLocalStorage("nowyes_checklist", [] as { id: string; text: string; done: boolean }[]);
  const [offlineData, setOfflineData] = useLocalStorage("nowyes_offline", false);

  const [formAnswers, setFormAnswers] = useState({ q1: "", q2: "", q3: "", q4: "" });

  const t = translations[lang];

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  // PWA manifest
  useEffect(() => {
    try {
      const manifest = {
        name: "NOWYES",
        short_name: "NOWYES",
        display: "standalone",
        start_url: ".",
        theme_color: "#0A0A0B",
        background_color: "#0A0A0B",
        icons: [
          { src: logoUrl, sizes: "192x192", type: "image/png" },
          { src: logoUrl, sizes: "512x512", type: "image/png" },
        ],
      };
      const blob = new Blob([JSON.stringify(manifest)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      let link = document.querySelector('link[rel="manifest"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "manifest";
        document.head.appendChild(link);
      }
      link.href = url;

      if ("serviceWorker" in navigator) {
        const swCode = `
          self.addEventListener('install', e=>{self.skipWaiting()});
          self.addEventListener('activate', e=>{self.clients.claim()});
          self.addEventListener('fetch', e=>{});
        `;
        const swBlob = new Blob([swCode], { type: "text/javascript" });
        const swUrl = URL.createObjectURL(swBlob);
        navigator.serviceWorker.register(swUrl).catch(() => {});
      }
      // meta theme
      let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "theme-color";
        document.head.appendChild(meta);
      }
      meta.content = "#0A0A0B";
    } catch {}
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleWhereAmI = () => {
    if (!navigator.geolocation) {
      setLocMsg(t.locationDenied);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocMsg(t.locationFound);
      },
      () => {
        setLocMsg(t.locationDenied);
      },
      { enableHighAccuracy: false, timeout: 8000 }
    );
  };

  const handleOfflineDownload = () => {
    setOfflineData(true);
    showToast(t.saved);
  };

  const filteredServices = services.filter((s) => {
    if (mapCat === "all") return true;
    return s.category === mapCat;
  });

  const handleAddDoc = () => {
    const name = prompt(
      lang === "es" ? "Nombre del documento (ej: CURP)" : lang === "en" ? "Document name (e.g. CURP)" : "Non dokiman (eg: CURP)"
    );
    if (!name) return;
    setMyDocs([...myDocs, { id: Date.now().toString(), name, date: new Date().toISOString().slice(0, 10) }]);
  };

  const handleAddExp = () => {
    const puesto = prompt(lang === "es" ? "Puesto" : lang === "en" ? "Position" : "Pòs");
    if (!puesto) return;
    setMyExp([...myExp, { id: Date.now().toString(), puesto, empresa: "Demo", anios: "2023-2024" }]);
  };

  const handleAddCheck = () => {
    const text = prompt(lang === "es" ? "Nueva tarea" : lang === "en" ? "New task" : "Nouvo tach");
    if (!text) return;
    setMyChecklist([...myChecklist, { id: Date.now().toString(), text, done: false }]);
  };

  const cvProfessionalPreview = () => {
    const prof = (s: string) => s.trim();
    return {
      nombre: prof(myCV.nombre || myData.nombre || "—"),
      objetivo: prof(myCV.objetivo) || (lang === "es" ? "Busco oportunidad laboral estable en Tapachula con disponibilidad inmediata." : lang === "en" ? "Seeking stable job opportunity in Tapachula with immediate availability." : "M ap chèche yon opòtinite travay ki estab nan Tapachula ak disponibilite imedyat."),
      contacto: [myCV.telefono || myData.telefono, myCV.email].filter(Boolean).join(" • "),
      habilidades: myCV.habilidades,
      idiomas: myCV.idiomas,
      exp: myExp,
      referencias: myCV.referencias,
    };
  };

  const handlePrintCV = () => {
    const data = cvProfessionalPreview();
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>NOWYES CV</title>
      <style>
        body{font-family:system-ui,-apple-system,sans-serif; padding:40px; color:#111; max-width:700px; margin:auto}
        h1{font-size:28px; border-bottom:3px solid #D4A845; padding-bottom:12px}
        h2{font-size:14px; letter-spacing:0.15em; color:#666; margin-top:32px}
        p{line-height:1.6}
        .gold{color:#8a6a1f}
      </style></head>
      <body>
        <h1>${data.nombre}</h1>
        <p>${data.contacto}</p>
        <h2>OBJETIVO / OBJECTIVE</h2><p>${data.objetivo}</p>
        <h2>EXPERIENCIA / EXPERIENCE</h2>
        <ul>${data.exp.map(e=>`<li><b>${e.puesto}</b> - ${e.empresa} (${e.anios})</li>`).join("") || "<li>No experience added yet</li>"}</ul>
        <h2>HABILIDADES / SKILLS</h2><p>${data.habilidades || "—"}</p>
        <h2>IDIOMAS / LANGUAGES</h2><p>${data.idiomas || "—"}</p>
        <h2>REFERENCIAS</h2><p>${data.referencias || "—"}</p>
        <p style="margin-top:48px; font-size:11px; color:#888">Generado con NOWYES - solo con información ingresada por el usuario. No se agregó información falsa.</p>
      </body></html>
    `);
    win.document.close();
    setTimeout(() => win.print(), 400);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white selection:bg-[#D4A845]/30"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      }}
    >
      {/* HEADER */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#0A0A0C]/85 border-b border-white/10"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto max-w-[1120px] px-4 sm:px-6 h-[72px] flex items-center justify-between">
          <button
            onClick={() => {
              setRoute("home");
              if (route === "home") showToast("NOWYES • HOME");
            }}
            aria-label="NOWYES Home"
            className="flex items-center gap-3 min-h-[44px]"
          >
            <img src={logoUrl} alt="NOWYES" className="h-12 sm:h-[56px] w-auto object-contain" />
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Offline badge */}
            <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest border ${isOnline ? "border-emerald-400/30 text-emerald-300 bg-emerald-500/10" : "border-amber-400/30 text-amber-200 bg-amber-500/10"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${isOnline ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`} />
              {isOnline ? t.onlineBadge : t.offlineBadge}
            </div>

            {/* Language selector pill */}
            <div className="flex items-center rounded-full border border-white/15 bg-white/[0.06] p-1">
              {(["es", "en", "ht"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    showToast(l === 'es' ? 'Idioma: ESPAÑOL' : l === 'en' ? 'Language: ENGLISH' : 'Lang: KREYÒL');
                  }}
                  className={`min-h-[32px] min-w-[44px] px-3 rounded-full text-[11px] font-bold tracking-widest transition-all ${lang === l ? "bg-[#D4A845] text-black shadow" : "text-white/60 hover:text-white"}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Mobile offline badge row */}
        <div className="sm:hidden px-4 pb-2 flex">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest border ${isOnline ? "border-emerald-400/30 text-emerald-300 bg-emerald-500/10" : "border-amber-400/30 text-amber-200 bg-amber-500/10"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${isOnline ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`} />
            {isOnline ? t.onlineBadge : t.offlineBadge} {offlineData ? "• OFFLINE DATA OK" : ""}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1120px] px-4 sm:px-6 pb-[96px] pt-6 sm:pt-10">
        {/* HOME */}
        {route === "home" && (
          <div className="space-y-8">
            <div className="space-y-3">
              <h1 className="text-[32px] sm:text-[56px] font-black leading-[0.9] tracking-[-0.02em]">
                {t.homeQuestion}
              </h1>
              <p className="text-[16px] sm:text-[18px] text-white/70 max-w-[560px] leading-relaxed">{t.homeSub}</p>
              <div className="h-[2px] w-[72px] bg-[#D4A845] mt-4" />
            </div>

            {/* 6 entry points */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { key: "docs" as const, icon: FileText, route: "docs" as Route, accent: "border-l-[#D4A845]" },
                { key: "work" as const, icon: Briefcase, route: "work" as Route, accent: "border-l-white/20" },
                { key: "health" as const, icon: HeartPulse, route: "health" as Route, accent: "border-l-white/20" },
                { key: "food" as const, icon: UtensilsCrossed, route: "food" as Route, accent: "border-l-white/20" },
                { key: "help" as const, icon: LifeBuoy, route: "help" as Route, accent: "border-l-[#D4A845]" },
                { key: "map" as const, icon: MapPinned, route: "map" as Route, accent: "border-l-white/20" },
              ].map((c) => (
                <button
                  key={c.key}
                  onClick={() => setRoute(c.route)}
                  className={`group text-left min-h-[112px] sm:min-h-[132px] rounded-[8px] bg-[#151519] border border-white/[0.08] border-l-[3px] ${c.accent} p-4 sm:p-5 flex flex-col justify-between hover:bg-[#1C1C21] hover:border-white/15 transition-all active:scale-[0.99]`}
                >
                  <div className="flex items-start justify-between">
                    <c.icon className="h-6 w-6 text-[#C0C4CC] group-hover:text-white transition-colors" />
                    <ChevronRight className="h-4 w-4 text-white/30 group-hover:text-[#D4A845] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <span className="text-[13px] sm:text-[15px] font-black tracking-widest mt-4">{t.entry[c.key]}</span>
                </button>
              ))}
            </div>

            {/* My Kit preview */}
            <div className="rounded-[8px] bg-[#151519] border border-white/10 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[12px] tracking-[0.2em] font-bold text-[#D4A845]">{t.myKit}</h2>
                  <p className="text-[14px] text-white/60 mt-1">{t.myKitDesc}</p>
                </div>
                <button
                  onClick={() => setRoute("kit")}
                  className="min-h-[44px] px-4 rounded-[8px] bg-white text-black text-[12px] font-bold tracking-widest hover:bg-white/90"
                >
                  {lang === "es" ? "ABRIR" : lang === "en" ? "OPEN" : "LOUVRI"}
                </button>
              </div>
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
                {Object.entries(t.myKitItems).map(([k, label]) => (
                  <div key={k} className="rounded-[6px] bg-black/40 border border-white/5 px-2 py-2 text-[10px] font-bold tracking-widest text-white/50 truncate">
                    {label}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-white/40">{t.kitTabsHint}</p>
            </div>

            {/* Guided help CTA */}
            <div className="relative overflow-hidden rounded-[8px] border border-[#D4A845]/30 bg-gradient-to-br from-[#1A1A1E] to-[#121214] p-6 sm:p-8">
              <div className="absolute top-0 right-0 h-[160px] w-[160px] bg-[#D4A845]/10 blur-[40px] -rotate-12" />
              <div className="relative">
                <h2 className="text-[18px] sm:text-[24px] font-black leading-tight tracking-tight">{t.guidedTitle}</h2>
                <p className="mt-2 text-[14px] text-white/60 max-w-[520px]">{t.guidedSub}</p>
                <button
                  onClick={() => setHelpOpen(true)}
                  className="mt-5 min-h-[48px] px-6 rounded-[8px] bg-[#D4A845] text-black font-black tracking-widest text-[13px] hover:bg-[#E2B95A] active:scale-[0.99] transition-all flex items-center gap-2"
                >
                  {t.guidedBtn} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* DOCS */}
        {route === "docs" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[11px] tracking-widest font-bold text-white/40">
              <button onClick={() => setRoute("home")} className="hover:text-white">HOME</button>
              <span>/</span>
              <span className="text-white">{t.entry.docs}</span>
            </div>
            <h1 className="text-[28px] font-black tracking-tight">{t.docsTitle}</h1>
            <div className="grid gap-4">
              {procedures.map((proc) => (
                <div key={proc.id} className="rounded-[8px] bg-[#151519] border border-white/10 overflow-hidden">
                  <div className="p-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-[15px] font-black tracking-wide">{proc.title[lang]}</h3>
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold tracking-widest ${proc.verified ? "border-emerald-400/30 text-emerald-300 bg-emerald-500/10" : "border-amber-400/30 text-amber-200 bg-amber-500/10"}`}>
                          {proc.verified ? <ShieldCheck className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                          {proc.verified ? t.verified : t.demo}
                        </span>
                      </div>
                      <p className="mt-1 text-[12px] text-white/50">Fuente: {proc.official.source} • {proc.official.last}</p>
                    </div>
                    <div className="h-8 w-8 rounded-[6px] bg-white/5 border border-white/10 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-white/60" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-px bg-white/10">
                    <div className="bg-[#151519] p-5">
                      <h4 className="text-[11px] font-black tracking-[0.15em] text-[#D4A845]">{t.officialReq}</h4>
                      <ul className="mt-3 space-y-2">
                        {proc.official.req[lang].map((r, i) => (
                          <li key={i} className="flex gap-2 text-[13px] text-white/80">
                            <span className="text-[#D4A845]">•</span> {r}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 space-y-1 text-[12px]">
                        <p className="text-white/40">{lang === "es" ? "Costo:" : lang === "en" ? "Fee:" : "Frè:"} <span className="text-white/80">{proc.official.fees}</span></p>
                        <p className="text-white/40">{lang === "es" ? "Cita:" : lang === "en" ? "Appointment:" : "Randevou:"} <span className="text-white/80">{proc.official.appointment[lang]}</span></p>
                      </div>
                    </div>
                    <div className="bg-[#121214] p-5">
                      <h4 className="text-[11px] font-black tracking-[0.15em] text-white/60">{t.usefulPrep}</h4>
                      <ul className="mt-3 space-y-2">
                        {proc.prep.steps[lang].map((s, i) => (
                          <li key={i} className="flex gap-2 text-[13px] text-white/70">
                            <span className="text-white/30">{i + 1}.</span> {s}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <p className="text-[11px] font-bold tracking-widest text-white/40">{lang === "es" ? "DOCUMENTOS ÚTILES" : lang === "en" ? "USEFUL DOCS" : "DOKIMAN ITIL"}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {proc.prep.docs[lang].map((d, i) => (
                            <span key={i} className="rounded-[6px] bg-white/5 border border-white/10 px-2 py-1 text-[11px] text-white/60">{d}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 flex justify-end bg-black/20">
                    <button
                      onClick={() => setRoute("forms")}
                      className="min-h-[36px] px-3 rounded-[6px] border border-white/10 bg-white/5 text-[11px] font-bold tracking-widest hover:bg-white/10"
                    >
                      {lang === "es" ? "PREPARAR FORMULARIO →" : lang === "en" ? "PREPARE FORM →" : "PREPARE FÒM →"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FORMS */}
        {route === "forms" && (
          <div className="space-y-6 max-w-[720px]">
            <h1 className="text-[28px] font-black tracking-tight">{t.formsTitle}</h1>
            <div className="rounded-[8px] bg-[#151519] border border-white/10 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold tracking-widest text-white/40">{t.formProgress} {formStep + 1}/5</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`h-1.5 w-6 rounded-full ${i <= formStep ? "bg-[#D4A845]" : "bg-white/10"}`} />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] tracking-widest px-2 py-1 rounded-full border border-amber-400/30 text-amber-200 bg-amber-500/10">{t.demo}</span>
              </div>

              <div className="mt-6 space-y-5">
                {formStep === 0 && (
                  <>
                    <h3 className="text-[18px] font-bold leading-snug">{lang === "es" ? "¿Cuál es tu nombre completo como aparece en tu identificación?" : lang === "en" ? "What is your full name as shown on your ID?" : "Ki non konplè ou jan li parèt sou ID ou?"}</h3>
                    <input value={formAnswers.q1} onChange={(e) => setFormAnswers({ ...formAnswers, q1: e.target.value })} placeholder={myData.nombre || "Ej: Jean Pierre..."} className="w-full min-h-[48px] rounded-[8px] bg-black/40 border border-white/10 px-4 text-[14px] outline-none focus:border-[#D4A845]/50" />
                    <p className="text-[12px] text-white/40">{lang === "es" ? "Explicación: Debe coincidir exactamente con tu pasaporte o constancia. Sin acentos extra." : lang === "en" ? "Explanation: Must match your passport or certificate exactly." : "Eksplikasyon: Dwe menm jan ak paspò ou."}</p>
                  </>
                )}
                {formStep === 1 && (
                  <>
                    <h3 className="text-[18px] font-bold leading-snug">{lang === "es" ? "¿Cuál es tu domicilio actual en Tapachula?" : lang === "en" ? "What is your current address in Tapachula?" : "Ki adrès aktyèl ou nan Tapachula?"}</h3>
                    <input value={formAnswers.q2} onChange={(e) => setFormAnswers({ ...formAnswers, q2: e.target.value })} placeholder="Colonia, calle, número" className="w-full min-h-[48px] rounded-[8px] bg-black/40 border border-white/10 px-4 text-[14px] outline-none focus:border-[#D4A845]/50" />
                    {formAnswers.q1 && formAnswers.q2 && formAnswers.q1.length > 0 && formAnswers.q2.length < 5 && (
                      <div className="flex gap-2 rounded-[8px] border border-amber-400/20 bg-amber-500/10 p-3 text-[12px] text-amber-200">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        {lang === "es" ? "Advertencia: la dirección parece incompleta. Agrega colonia y número para evitar rechazo." : lang === "en" ? "Warning: address looks incomplete. Add neighborhood and number." : "Avètisman: adrès la sanble enkonplè."}
                      </div>
                    )}
                  </>
                )}
                {formStep === 2 && (
                  <>
                    <h3 className="text-[18px] font-bold leading-snug">{lang === "es" ? "¿Qué documento de identidad tienes ahora?" : lang === "en" ? "What ID document do you have now?" : "Ki dokiman idantite ou genyen kounye a?"}</h3>
                    <div className="grid gap-2">
                      {[
                        lang === "es" ? "Pasaporte" : lang === "en" ? "Passport" : "Paspò",
                        "Constancia COMAR",
                        lang === "es" ? "Tarjeta migratoria" : lang === "en" ? "Migratory card" : "Kat migrasyon",
                        lang === "es" ? "Otro" : lang === "en" ? "Other" : "Lòt",
                      ].map((opt) => (
                        <button key={opt} onClick={() => setFormAnswers({ ...formAnswers, q3: opt })} className={`min-h-[48px] text-left rounded-[8px] border px-4 text-[14px] ${formAnswers.q3 === opt ? "border-[#D4A845] bg-[#D4A845]/10 text-white" : "border-white/10 bg-black/20 text-white/70 hover:bg-white/5"}`}>{opt}</button>
                      ))}
                    </div>
                  </>
                )}
                {formStep === 3 && (
                  <>
                    <h3 className="text-[18px] font-bold leading-snug">{lang === "es" ? "Revisión: ¿todo coincide?" : lang === "en" ? "Review: does everything match?" : "Revizyon: èske tout koresponn?"}</h3>
                    <div className="rounded-[8px] bg-black/40 border border-white/10 p-4 space-y-2 text-[13px]">
                      <p><span className="text-white/40">Nombre:</span> {formAnswers.q1 || "—"}</p>
                      <p><span className="text-white/40">Domicilio:</span> {formAnswers.q2 || "—"}</p>
                      <p><span className="text-white/40">ID:</span> {formAnswers.q3 || "—"}</p>
                    </div>
                  </>
                )}
                {formStep === 4 && (
                  <>
                    <h3 className="text-[18px] font-bold leading-snug">{lang === "es" ? "Resumen preparado (DEMO)" : lang === "en" ? "Prepared summary (DEMO)" : "Rezime prepare (DEMO)"}</h3>
                    <div className="rounded-[8px] bg-white text-black p-5 text-[13px] leading-relaxed">
                      <p className="font-bold">NOWYES - Hoja de preparación</p>
                      <p className="mt-2">Nombre: {formAnswers.q1}</p>
                      <p>Domicilio: {formAnswers.q2}</p>
                      <p>Documento: {formAnswers.q3}</p>
                      <p className="mt-3 text-[11px] text-black/60">Esta hoja NO es oficial. Es solo para organizar tu información antes de ir al módulo. Verifica con fuente oficial.</p>
                    </div>
                    <button onClick={() => { setFormAnswers({ q1:"", q2:"", q3:"", q4:"" }); showToast(t.saved); }} className="w-full min-h-[48px] rounded-[8px] bg-[#D4A845] text-black font-bold tracking-widest text-[12px]"> {t.save} </button>
                  </>
                )}
              </div>

              <div className="mt-6 flex gap-2">
                <button disabled={formStep === 0} onClick={() => setFormStep((s) => Math.max(0, s - 1))} className="min-h-[44px] px-4 rounded-[8px] border border-white/10 bg-white/5 text-[12px] font-bold tracking-widest disabled:opacity-40 flex items-center gap-1"><ChevronLeft className="h-4 w-4" /> {t.back}</button>
                {formStep < 4 && <button onClick={() => setFormStep((s) => Math.min(4, s + 1))} className="ml-auto min-h-[44px] px-5 rounded-[8px] bg-white text-black text-[12px] font-bold tracking-widest flex items-center gap-1">{t.next} <ChevronRight className="h-4 w-4" /></button>}
              </div>
            </div>
          </div>
        )}

        {/* WORK */}
        {route === "work" && (
          <div className="space-y-6">
            <h1 className="text-[28px] font-black tracking-tight">{t.workTitle}</h1>
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-4">
              <div className="rounded-[8px] bg-[#151519] border border-white/10 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-black tracking-widest">{t.myKitItems.cv} • {lang === "es" ? "Constructor" : lang === "en" ? "Builder" : "Konstriktè"}</h3>
                  <div className="flex gap-2">
                    <button onClick={() => setShowCVPreview(true)} className="min-h-[36px] px-3 rounded-[6px] bg-white/10 border border-white/10 text-[11px] font-bold tracking-widest flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {t.previewCV}</button>
                    <button onClick={handlePrintCV} className="min-h-[36px] px-3 rounded-[6px] bg-[#D4A845] text-black text-[11px] font-bold tracking-widest flex items-center gap-1"><Download className="h-3.5 w-3.5" /> {t.downloadCV}</button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <input value={myCV.nombre} onChange={(e) => setMyCV({ ...myCV, nombre: e.target.value })} placeholder={lang === "es" ? "Nombre completo" : lang === "en" ? "Full name" : "Non konplè"} className="min-h-[44px] rounded-[6px] bg-black/40 border border-white/10 px-3 text-[13px]" />
                  <input value={myCV.telefono} onChange={(e) => setMyCV({ ...myCV, telefono: e.target.value })} placeholder="Tel / WhatsApp" className="min-h-[44px] rounded-[6px] bg-black/40 border border-white/10 px-3 text-[13px]" />
                  <input value={myCV.email} onChange={(e) => setMyCV({ ...myCV, email: e.target.value })} placeholder="Email (opcional)" className="min-h-[44px] rounded-[6px] bg-black/40 border border-white/10 px-3 text-[13px] sm:col-span-2" />
                  <textarea value={myCV.objetivo} onChange={(e) => setMyCV({ ...myCV, objetivo: e.target.value })} placeholder={lang === "es" ? "Objetivo profesional (1 frase)" : lang === "en" ? "Professional objective (1 sentence)" : "Objektif pwofesyonèl"} className="min-h-[64px] rounded-[6px] bg-black/40 border border-white/10 p-3 text-[13px] sm:col-span-2" />
                  <textarea value={myCV.habilidades} onChange={(e) => setMyCV({ ...myCV, habilidades: e.target.value })} placeholder={lang === "es" ? "Habilidades: cocina, limpieza, atención cliente..." : lang === "en" ? "Skills: cooking, cleaning, customer service..." : "Konpetans: kwizin, netwayaj..."} className="min-h-[64px] rounded-[6px] bg-black/40 border border-white/10 p-3 text-[13px] sm:col-span-2" />
                  <input value={myCV.idiomas} onChange={(e) => setMyCV({ ...myCV, idiomas: e.target.value })} placeholder={lang === "es" ? "Idiomas: Español, Kreyòl, Inglés..." : lang === "en" ? "Languages" : "Lang"} className="min-h-[44px] rounded-[6px] bg-black/40 border border-white/10 px-3 text-[13px] sm:col-span-2" />
                </div>
                <p className="text-[11px] text-white/40">{lang === "es" ? "Transformamos tu texto a redacción profesional sin inventar experiencia." : lang === "en" ? "We transform your text to professional wording without inventing experience." : "Nou transfòme tèks ou an redaksyon pwofesyonèl san envante eksperyans."}</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-[12px] font-black tracking-widest text-white/60">{lang === "es" ? "VACANTES DEMO - TAPACHULA" : lang === "en" ? "DEMO JOBS - TAPACHULA" : "TRAVAY DEMO - TAPACHULA"}</h3>
                {jobMocks.map((job, i) => (
                  <div key={i} className="rounded-[8px] bg-[#151519] border border-white/10 p-4 flex justify-between items-start">
                    <div>
                      <p className="text-[13px] font-bold">{job.title[lang]}</p>
                      <p className="text-[12px] text-white/50 mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.place} • {job.pay}</p>
                    </div>
                    <span className="rounded-full bg-[#D4A845]/15 border border-[#D4A845]/30 px-2 py-1 text-[10px] font-bold tracking-widest text-[#D4A845]">DEMO</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HEALTH */}
        {route === "health" && (
          <div className="space-y-5">
            <h1 className="text-[28px] font-black tracking-tight">{t.healthTitle}</h1>
            <div className="grid gap-3">
              {services.filter(s=>s.category==="health"||s.category==="assistance").map(s=>(
                <div key={s.id} className="rounded-[8px] bg-[#151519] border border-white/10 p-4">
                  <div className="flex justify-between">
                    <h3 className="text-[14px] font-bold">{s.name[lang]}</h3>
                    <span className={`text-[10px] px-2 py-1 rounded-full border font-bold tracking-widest ${s.verified ? "border-emerald-400/30 text-emerald-300 bg-emerald-500/10" : "border-amber-400/30 text-amber-200 bg-amber-500/10"}`}>{s.verified ? t.verified : t.demo}</span>
                  </div>
                  <p className="text-[13px] text-white/60 mt-1">{s.desc[lang]}</p>
                  <p className="text-[12px] text-white/40 mt-2 flex items-center gap-1"><Clock className="h-3 w-3" /> {s.hours} • <MapPin className="h-3 w-3" /> {s.location}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FOOD */}
        {route === "food" && (
          <div className="space-y-5">
            <h1 className="text-[28px] font-black tracking-tight">{t.foodTitle}</h1>
            <div className="grid gap-3">
              {services.filter(s=>["food","shelter","bank"].includes(s.category)).map(s=>(
                <div key={s.id} className="rounded-[8px] bg-[#151519] border border-white/10 p-4">
                  <div className="flex justify-between">
                    <h3 className="text-[14px] font-bold">{s.name[lang]}</h3>
                    <span className={`text-[10px] px-2 py-1 rounded-full border font-bold tracking-widest ${s.verified ? "border-emerald-400/30 text-emerald-300 bg-emerald-500/10" : "border-amber-400/30 text-amber-200 bg-amber-500/10"}`}>{s.verified ? t.verified : t.demo}</span>
                  </div>
                  <p className="text-[13px] text-white/60 mt-1">{s.desc[lang]}</p>
                  <p className="text-[12px] text-white/40 mt-2">{s.location} • {s.hours}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MAP */}
        {route === "map" && (
          <div className="space-y-5">
            <h1 className="text-[28px] font-black tracking-tight">{t.mapTitle}</h1>

            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {[
                { id: "all", label: "TODOS" },
                { id: "migration", label: "MIGRACIÓN" },
                { id: "assistance", label: "AYUDA" },
                { id: "health", label: "SALUD" },
                { id: "food", label: "COMIDA" },
                { id: "work", label: "TRABAJO" },
                { id: "sim", label: "SIM" },
                { id: "wifi", label: "WIFI" },
                { id: "bank", label: "BANCO" },
              ].map((cat) => (
                <button key={cat.id} onClick={() => setMapCat(cat.id)} className={`whitespace-nowrap min-h-[36px] px-3 rounded-full border text-[11px] font-bold tracking-widest ${mapCat === cat.id ? "bg-[#D4A845] text-black border-[#D4A845]" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Stylized map */}
            <div className="relative rounded-[8px] overflow-hidden border border-white/10 bg-[#0E0E12] h-[320px] sm:h-[420px]">
              {/* grid */}
              <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              <div className="absolute top-3 left-3 rounded-full bg-black/60 border border-white/10 px-2.5 py-1 text-[10px] tracking-widest font-bold">TAPACHULA • CENTRO</div>
              {userPos && <div className="absolute top-3 right-3 rounded-full bg-[#D4A845] text-black px-2.5 py-1 text-[10px] font-black tracking-widest">TU UBICACIÓN</div>}
              {/* pins */}
              {filteredServices.map((s) => (
                <button key={s.id} className="absolute -translate-x-1/2 -translate-y-1/2 group" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                  <div className={`h-7 w-7 rounded-full border-2 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${s.verified ? "bg-[#D4A845] border-black text-black" : "bg-white/90 border-black/20 text-black"}`}>
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-[28px] hidden group-hover:block z-10">
                    <div className="rounded-[6px] bg-black border border-white/20 px-2 py-1 text-[11px] whitespace-nowrap">{s.name[lang]}</div>
                  </div>
                </button>
              ))}
              {/* user dot */}
              {userPos && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="h-3 w-3 rounded-full bg-[#3B82F6] ring-4 ring-blue-500/30 animate-pulse" />
                </div>
              )}

              <div className="absolute bottom-0 inset-x-0 p-3 flex gap-2 bg-gradient-to-t from-black/80 to-transparent">
                <button onClick={handleWhereAmI} className="min-h-[40px] flex-1 rounded-[8px] bg-white text-black text-[11px] font-black tracking-widest flex items-center justify-center gap-1.5">
                  <Navigation className="h-4 w-4" /> {t.whereAmI}
                </button>
                <button onClick={handleOfflineDownload} className="min-h-[40px] flex-1 rounded-[8px] bg-[#151519] border border-white/15 text-white text-[11px] font-black tracking-widest flex items-center justify-center gap-1.5">
                  <Download className="h-4 w-4" /> {lang === "es" ? "GUARDAR OFFLINE" : lang === "en" ? "SAVE OFFLINE" : "SOVE OFFLINE"}
                </button>
              </div>
            </div>

            {locMsg && <div className="rounded-[8px] border border-white/10 bg-white/5 p-3 text-[12px] text-white/70">{locMsg}</div>}

            <div className="grid gap-3">
              {filteredServices.map((s) => (
                <div key={s.id} className="rounded-[8px] bg-[#151519] border border-white/10 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-[14px] font-bold truncate">{s.name[lang]}</h3>
                      <p className="text-[12px] text-white/50 uppercase tracking-widest mt-0.5">{s.category} • {s.location}</p>
                      <p className="text-[13px] text-white/70 mt-2">{s.desc[lang]}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-white/40">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {s.hours}</span>
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {s.contact}</span>
                        <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> {s.last}</span>
                        {s.offline && <span className="flex items-center gap-1 text-emerald-300"><Wifi className="h-3 w-3" /> Offline OK</span>}
                      </div>
                    </div>
                    <span className={`shrink-0 text-[9px] px-2 py-1 rounded-full border font-bold tracking-widest ${s.verified ? "border-emerald-400/30 text-emerald-300 bg-emerald-500/10" : "border-amber-400/30 text-amber-200 bg-amber-500/10"}`}>{s.verified ? t.verified : t.demo}</span>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleOfflineDownload} className="w-full min-h-[48px] rounded-[8px] border border-[#D4A845]/30 bg-[#D4A845]/10 text-[#D4A845] font-black tracking-widest text-[12px]">
              {t.downloadOffline} {offlineData ? "✓" : ""}
            </button>
          </div>
        )}

        {/* KIT */}
        {route === "kit" && (
          <div className="space-y-5 max-w-[860px]">
            <h1 className="text-[28px] font-black tracking-tight">{t.myKit}</h1>
            <p className="text-[13px] text-white/50">{t.kitTabsHint}</p>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {(Object.keys(t.myKitItems) as Array<keyof typeof t.myKitItems>).map((k) => {
                const mapKey = { datos: "datos", docs: "docs", cv: "cv", exp: "exp", forms: "forms", checklist: "checklist" }[k] as typeof kitTab;
                return (
                  <button key={k} onClick={() => setKitTab(mapKey)} className={`whitespace-nowrap min-h-[40px] px-4 rounded-full border text-[11px] font-bold tracking-widest ${kitTab === mapKey ? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}>
                    {t.myKitItems[k]}
                  </button>
                );
              })}
            </div>

            <div className="rounded-[8px] bg-[#151519] border border-white/10 p-5 min-h-[260px]">
              {kitTab === "datos" && (
                <div className="space-y-4">
                  <h3 className="text-[13px] font-black tracking-widest">{t.myKitItems.datos}</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input value={myData.nombre} onChange={(e) => setMyData({ ...myData, nombre: e.target.value })} placeholder={lang === "es" ? "Nombre completo" : lang === "en" ? "Full name" : "Non konplè"} className="min-h-[44px] rounded-[6px] bg-black/40 border border-white/10 px-3 text-[13px]" />
                    <input value={myData.telefono} onChange={(e) => setMyData({ ...myData, telefono: e.target.value })} placeholder="Tel / WhatsApp" className="min-h-[44px] rounded-[6px] bg-black/40 border border-white/10 px-3 text-[13px]" />
                    <input value={myData.nacimiento} onChange={(e) => setMyData({ ...myData, nacimiento: e.target.value })} placeholder={lang === "es" ? "Fecha nacimiento" : lang === "en" ? "Birth date" : "Dat nesans"} className="min-h-[44px] rounded-[6px] bg-black/40 border border-white/10 px-3 text-[13px]" />
                    <input value={myData.origen} onChange={(e) => setMyData({ ...myData, origen: e.target.value })} placeholder={lang === "es" ? "País origen" : lang === "en" ? "Country of origin" : "Peyi orijin"} className="min-h-[44px] rounded-[6px] bg-black/40 border border-white/10 px-3 text-[13px]" />
                    <input value={myData.direccion} onChange={(e) => setMyData({ ...myData, direccion: e.target.value })} placeholder={lang === "es" ? "Dirección Tapachula" : lang === "en" ? "Address Tapachula" : "Adrès Tapachula"} className="min-h-[44px] rounded-[6px] bg-black/40 border border-white/10 px-3 text-[13px] sm:col-span-2" />
                  </div>
                  {myData.nombre === "" && <p className="text-[12px] text-white/40">{t.empty.datos}</p>}
                </div>
              )}

              {kitTab === "docs" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[13px] font-black tracking-widest">{t.myKitItems.docs}</h3>
                    <button onClick={handleAddDoc} className="min-h-[36px] px-3 rounded-[6px] bg-white text-black text-[11px] font-bold tracking-widest">+ {lang === "es" ? "AGREGAR" : lang === "en" ? "ADD" : "AJOUTE"}</button>
                  </div>
                  {myDocs.length === 0 ? <p className="text-[12px] text-white/40">{t.empty.docs}</p> : (
                    <div className="grid gap-2">
                      {myDocs.map((d) => (
                        <div key={d.id} className="flex justify-between items-center rounded-[6px] bg-black/30 border border-white/10 px-3 py-2 text-[13px]">
                          <span className="flex items-center gap-2"><Folder className="h-4 w-4 text-white/40" /> {d.name}</span>
                          <span className="text-[11px] text-white/40">{d.date}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {kitTab === "cv" && (
                <div className="space-y-4">
                  <h3 className="text-[13px] font-black tracking-widest">{t.myKitItems.cv}</h3>
                  <div className="grid gap-2">
                    <input value={myCV.nombre} onChange={(e) => setMyCV({ ...myCV, nombre: e.target.value })} placeholder="Nombre CV" className="min-h-[44px] rounded-[6px] bg-black/40 border border-white/10 px-3 text-[13px]" />
                    <textarea value={myCV.objetivo} onChange={(e) => setMyCV({ ...myCV, objetivo: e.target.value })} placeholder="Objetivo" className="min-h-[60px] rounded-[6px] bg-black/40 border border-white/10 p-3 text-[13px]" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setShowCVPreview(true)} className="min-h-[40px] px-4 rounded-[6px] bg-white/10 border border-white/10 text-[11px] font-bold tracking-widest">{t.previewCV}</button>
                    <button onClick={handlePrintCV} className="min-h-[40px] px-4 rounded-[6px] bg-[#D4A845] text-black text-[11px] font-bold tracking-widest">{t.downloadCV}</button>
                  </div>
                  {myCV.nombre === "" && myCV.objetivo === "" && <p className="text-[12px] text-white/40">{t.empty.cv}</p>}
                </div>
              )}

              {kitTab === "exp" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[13px] font-black tracking-widest">{t.myKitItems.exp}</h3>
                    <button onClick={handleAddExp} className="min-h-[36px] px-3 rounded-[6px] bg-white text-black text-[11px] font-bold tracking-widest">+ {lang === "es" ? "AGREGAR" : "ADD"}</button>
                  </div>
                  {myExp.length === 0 ? <p className="text-[12px] text-white/40">{t.empty.exp}</p> : (
                    <div className="space-y-2">
                      {myExp.map((e) => (
                        <div key={e.id} className="rounded-[6px] bg-black/30 border border-white/10 px-3 py-2 text-[13px] flex justify-between">
                          <span className="font-bold">{e.puesto}</span><span className="text-white/40">{e.empresa} • {e.anios}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {kitTab === "forms" && (
                <div className="space-y-3">
                  <h3 className="text-[13px] font-black tracking-widest">{t.myKitItems.forms}</h3>
                  <div className="rounded-[6px] bg-black/30 border border-white/10 p-3 text-[12px] text-white/50">
                    {formAnswers.q1 ? `Último formulario: ${formAnswers.q1} - ${formAnswers.q2}` : t.empty.forms}
                  </div>
                  <button onClick={() => setRoute("forms")} className="min-h-[40px] px-4 rounded-[6px] bg-white text-black text-[11px] font-bold tracking-widest">{lang === "es" ? "IR A FORMULARIOS" : lang === "en" ? "GO TO FORMS" : "ALE NAN FÒM"}</button>
                </div>
              )}

              {kitTab === "checklist" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[13px] font-black tracking-widest">{t.myKitItems.checklist}</h3>
                    <button onClick={handleAddCheck} className="min-h-[36px] px-3 rounded-[6px] bg-white text-black text-[11px] font-bold tracking-widest">+ {lang === "es" ? "TAREA" : "TASK"}</button>
                  </div>
                  {myChecklist.length === 0 ? <p className="text-[12px] text-white/40">{t.empty.checklist}</p> : (
                    <div className="space-y-2">
                      {myChecklist.map((c) => (
                        <label key={c.id} className="flex items-center gap-3 rounded-[6px] bg-black/30 border border-white/10 px-3 py-2.5">
                          <input type="checkbox" checked={c.done} onChange={() => setMyChecklist(myChecklist.map(x=> x.id===c.id ? {...x, done:!x.done}:x))} className="h-4 w-4 rounded border-white/20" />
                          <span className={`text-[13px] ${c.done ? "line-through text-white/40" : "text-white/80"}`}>{c.text}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* HELP */}
        {route === "help" && (
          <div className="space-y-6 max-w-[720px]">
            <h1 className="text-[28px] font-black tracking-tight">{t.entry.help}</h1>
            <div className="rounded-[8px] bg-[#151519] border border-[#D4A845]/20 p-6">
              <h2 className="text-[18px] font-black">{t.guidedTitle}</h2>
              <p className="text-[14px] text-white/60 mt-2">{t.guidedSub}</p>
              <button onClick={() => setHelpOpen(true)} className="mt-4 min-h-[48px] px-6 rounded-[8px] bg-[#D4A845] text-black font-black tracking-widest text-[13px]">{t.guidedBtn}</button>
            </div>

            <div className="grid gap-3">
              {[
                { icon: Building2, title: { es: "No soy gobierno", en: "Not a government", ht: "Mwen pa gouvènman" }, desc: { es: "NOWYES no es INM ni COMAR. Te orientamos.", en: "NOWYES is not INM or COMAR. We guide you.", ht: "NOWYES pa INM ni COMAR. Nou gide ou." } },
                { icon: ShieldCheck, title: { es: "Información verificada vs demo", en: "Verified vs demo info", ht: "Enfo verifye vs demo" }, desc: { es: "Siempre distinguimos lo verificado de lo demostrativo.", en: "We always separate verified from demo.", ht: "Nou toujou separe sa ki verifye ak demo." } },
              ].map((item, i) => (
                <div key={i} className="rounded-[8px] bg-[#151519] border border-white/10 p-4 flex gap-3">
                  <item.icon className="h-5 w-5 text-[#D4A845] mt-0.5" />
                  <div>
                    <p className="text-[13px] font-bold">{item.title[lang]}</p>
                    <p className="text-[12px] text-white/50 mt-1">{item.desc[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trust footer always */}
        <div className="mt-12 rounded-[8px] border border-white/10 bg-white/[0.02] p-4">
          <p className="text-[11px] leading-relaxed text-white/45">{t.trust}</p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-[#0A0A0C]/95 backdrop-blur-xl" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="mx-auto max-w-[1120px] grid grid-cols-4 h-[64px]">
          {[
            { id: "home" as Route, label: t.bottom.home, icon: Building2 },
            { id: "map" as Route, label: t.bottom.map, icon: MapPinned },
            { id: "kit" as Route, label: t.bottom.kit, icon: ClipboardList },
            { id: "help" as Route, label: t.bottom.help, icon: LifeBuoy },
          ].map((item) => {
            const active = route === item.id || (route === "docs" && item.id === "home") || (route === "forms" && item.id === "home") || (route === "work" && item.id === "home") || (route === "health" && item.id === "home") || (route === "food" && item.id === "home");
            const isActive = route === item.id || (item.id === "home" && ["docs", "forms", "work", "health", "food"].includes(route));
            return (
              <button key={item.id} onClick={() => setRoute(item.id)} className={`flex flex-col items-center justify-center gap-1 min-h-[44px] relative ${isActive ? "text-[#D4A845]" : "text-white/45 hover:text-white/80"}`}>
                {isActive && <div className="absolute top-0 h-[2px] w-8 bg-[#D4A845]" />}
                <item.icon className={`h-5 w-5 ${isActive ? "text-[#D4A845]" : "text-current"}`} />
                <span className="text-[10px] font-bold tracking-widest">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Help Flow Modal */}
      {helpOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full sm:max-w-[520px] rounded-t-[16px] sm:rounded-[12px] bg-[#151519] border border-white/15 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-[14px] font-black tracking-widest">{t.guidedTitle}</h3>
              <button onClick={() => { setHelpOpen(false); setHelpStep(0); setHelpChoice(null); }} className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center"><X className="h-4 w-4" /></button>
            </div>

            <div className="p-6 space-y-5 overflow-auto">
              {helpStep === 0 && (
                <>
                  <h4 className="text-[18px] font-bold leading-snug">{t.helpQ1}</h4>
                  <div className="grid gap-2">
                    {t.helpOptions.map((opt, idx) => (
                      <button key={idx} onClick={() => { setHelpChoice(idx); setHelpStep(1); }} className={`min-h-[52px] text-left rounded-[8px] border px-4 text-[14px] font-medium transition-all ${helpChoice === idx ? "border-[#D4A845] bg-[#D4A845]/10" : "border-white/10 bg-black/20 hover:bg-white/5"}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {helpStep === 1 && (
                <>
                  <h4 className="text-[18px] font-bold leading-snug">
                    {helpChoice === 0 ? (lang === "es" ? "Bienvenido a Tapachula. Primeros 3 pasos prácticos:" : lang === "en" ? "Welcome to Tapachula. First 3 practical steps:" : "Byenveni Tapachula. 3 premye etap pratik:") :
                     helpChoice === 1 ? (lang === "es" ? "Para regularizar, organiza esto:" : lang === "en" ? "To regularize, organize this:" : "Pou regilarize, òganize sa:") :
                     helpChoice === 2 ? (lang === "es" ? "Para trabajo rápido, enfócate en:" : lang === "en" ? "For quick work, focus on:" : "Pou travay rapid, konsantre sou:") :
                     (lang === "es" ? "Ayuda urgente: ve aquí primero" : lang === "en" ? "Urgent help: go here first" : "Èd ijan: ale la an premye")}
                  </h4>

                  <div className="space-y-3">
                    {(helpChoice === 0 ? [
                      lang === "es" ? "1. Guarda tu ubicación de albergue y compra chip Telcel con datos." : lang === "en" ? "1. Save shelter location and buy Telcel SIM with data." : "1. Sove kote ebèjman ou ak achte chip Telcel ak done.",
                      lang === "es" ? "2. Acude temprano a COMAR (antes 6am) con copias de identidad." : lang === "en" ? "2. Go early to COMAR (before 6am) with ID copies." : "2. Ale bonè COMAR (anvan 6am) ak kopi ID.",
                      lang === "es" ? "3. Descarga datos offline en Mapa para usar sin internet." : lang === "en" ? "3. Download offline data in Map to use without internet." : "3. Telechaje done offline nan Kat pou itilize san entènèt.",
                    ] : helpChoice === 1 ? [
                      lang === "es" ? "1. Reúne oficio COMAR + identificación + 3 copias + fotos infantiles." : lang === "en" ? "1. Gather COMAR letter + ID + 3 copies + photos." : "1. Rasanble lèt COMAR + ID + 3 kopi + foto.",
                      lang === "es" ? "2. Ve a MI KIT > Mis documentos y registra todo lo que tienes." : lang === "en" ? "2. Go to MY KIT > My documents and log what you have." : "2. Ale KIT MWEN > Dokiman mwen epi anrejistre sa ou genyen.",
                      lang === "es" ? "3. Revisa DOCUMENTOS y prepara el formulario paso a paso." : lang === "en" ? "3. Check DOCUMENTS and prepare form step by step." : "3. Tcheke DOKIMAN epi prepare fòm nan etap pa etap.",
                    ] : helpChoice === 2 ? [
                      lang === "es" ? "1. Crea tu CV en TRABAJO con habilidades reales, sin inventar." : lang === "en" ? "1. Create your CV in WORK with real skills, no invention." : "1. Kreye CV ou nan TRAVAY ak vrè konpetans.",
                      lang === "es" ? "2. Ve al Mapa > categoría TRABAJO y visita Bolsa Municipal temprano." : lang === "en" ? "2. Go to Map > WORK category and visit Municipal Job Board early." : "2. Ale Kat > TRAVAY epi vizite biwo travay bonè.",
                      lang === "es" ? "3. Lleva comprobante de domicilio y teléfono con WhatsApp activo." : lang === "en" ? "3. Bring proof of address and phone with active WhatsApp." : "3. Pote prèv adrès ak telefòn ak WhatsApp aktif.",
                    ] : [
                      lang === "es" ? "1. Mapa > SALUD y AYUDA - albergues con cupo limitado, llega temprano." : lang === "en" ? "1. Map > HEALTH and HELP - shelters with limited capacity, arrive early." : "1. Kat > SANTE ak ÈD - ebèjman ak kapasite limite, vini bonè.",
                      lang === "es" ? "2. COMIDA / Mercado San Juan - alimentos económicos y apoyo." : lang === "en" ? "2. FOOD / San Juan Market - affordable food and support." : "2. MANJE / Mache San Juan - manje bon mache.",
                      lang === "es" ? "3. Guarda contactos en MI KIT y descarga datos offline." : lang === "en" ? "3. Save contacts in MY KIT and download offline data." : "3. Sove kontak nan KIT MWEN epi telechaje done offline.",
                    ]).map((step, i) => (
                      <div key={i} className="rounded-[8px] bg-black/30 border border-white/10 p-3 text-[13px] text-white/80">{step}</div>
                    ))}
                  </div>

                  <div className="pt-2 grid grid-cols-3 gap-2">
                    <button onClick={() => { setHelpOpen(false); setRoute("docs"); }} className="min-h-[44px] rounded-[8px] bg-white/10 border border-white/10 text-[11px] font-bold tracking-widest">DOCS</button>
                    <button onClick={() => { setHelpOpen(false); setRoute("work"); }} className="min-h-[44px] rounded-[8px] bg-white/10 border border-white/10 text-[11px] font-bold tracking-widest">WORK</button>
                    <button onClick={() => { setHelpOpen(false); setRoute("map"); }} className="min-h-[44px] rounded-[8px] bg-[#D4A845] text-black text-[11px] font-bold tracking-widest">MAPA</button>
                  </div>
                </>
              )}
            </div>

            <div className="p-4 border-t border-white/10 flex justify-between">
              <button onClick={() => setHelpStep(0)} disabled={helpStep === 0} className="min-h-[40px] px-4 rounded-[8px] border border-white/10 text-[11px] font-bold tracking-widest disabled:opacity-30">{t.back}</button>
              <button onClick={() => { setHelpOpen(false); setHelpStep(0); }} className="min-h-[40px] px-4 rounded-[8px] bg-white text-black text-[11px] font-bold tracking-widest">{lang === "es" ? "CERRAR" : lang === "en" ? "CLOSE" : "FÈMEN"}</button>
            </div>
          </div>
        </div>
      )}

      {/* CV Preview Modal */}
      {showCVPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-[640px] max-h-[85vh] overflow-auto rounded-[12px] bg-white text-black">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="font-black tracking-widest text-[12px]">CV PREVIEW • DEMO</h3>
              <button onClick={() => setShowCVPreview(false)} className="h-8 w-8 rounded-full bg-black/5 flex items-center justify-center"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-8">
              {(() => {
                const d = cvProfessionalPreview();
                return (
                  <>
                    <h1 className="text-[28px] font-black border-b-4 border-[#D4A845] pb-3">{d.nombre}</h1>
                    <p className="text-[12px] text-black/60 mt-2">{d.contacto}</p>
                    <h2 className="mt-6 text-[11px] font-black tracking-[0.2em] text-black/50">OBJETIVO</h2>
                    <p className="text-[13px] mt-2 leading-relaxed">{d.objetivo}</p>
                    <h2 className="mt-6 text-[11px] font-black tracking-[0.2em] text-black/50">EXPERIENCIA</h2>
                    <ul className="mt-2 space-y-1">
                      {d.exp.length ? d.exp.map(e => <li key={e.id} className="text-[13px]"><b>{e.puesto}</b> — {e.empresa} ({e.anios})</li>) : <li className="text-[13px] text-black/40">Sin experiencia agregada</li>}
                    </ul>
                    <h2 className="mt-6 text-[11px] font-black tracking-[0.2em] text-black/50">HABILIDADES</h2>
                    <p className="text-[13px] mt-2">{d.habilidades || "—"}</p>
                    <h2 className="mt-6 text-[11px] font-black tracking-[0.2em] text-black/50">IDIOMAS</h2>
                    <p className="text-[13px] mt-2">{d.idiomas || "—"}</p>
                    <p className="mt-10 text-[10px] text-black/40">Generado con NOWYES - Solo con información ingresada por el usuario. No se agregó información falsa. DEMO.</p>
                  </>
                );
              })()}
            </div>
            <div className="p-4 border-t flex gap-2">
              <button onClick={() => setShowCVPreview(false)} className="flex-1 min-h-[44px] rounded-[8px] border border-black/10 text-[12px] font-bold tracking-widest">CERRAR</button>
              <button onClick={handlePrintCV} className="flex-1 min-h-[44px] rounded-[8px] bg-black text-white text-[12px] font-bold tracking-widest flex items-center justify-center gap-2"><Download className="h-4 w-4" /> {t.downloadCV}</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-[80px] left-1/2 -translate-x-1/2 z-50 rounded-full bg-[#D4A845] text-black px-4 py-2 text-[12px] font-bold tracking-wide shadow-xl border border-black/10">
          {toast}
        </div>
      )}

      <style>{`
        * { -webkit-tap-highlight-color: transparent; }
        button { touch-action: manipulation; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
