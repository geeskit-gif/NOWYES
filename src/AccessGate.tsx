import React, { useEffect, useState } from "react";
import App from "./App";
import logoUrl from "./assets/nowyes-logo.png";

const ACCESS_API = "https://nowyes-access.geeskitgsp.workers.dev";
const PAYMENT_URL = "https://buy.stripe.com/eVqdR85fR8nv2LsayB3cc07";
const TOKEN_KEY = "nowyes_access_token";

type Lang = "es" | "en" | "ht";

const copy = {
  es: {
    title: "NOWYES",
    subtitle: "NUEVO PAÍS. NUEVA VIDA. CONOCE TU PRÓXIMO PASO.",
    body: "Rutas, servicios, formularios y herramientas prácticas para ayudarte a avanzar en México.",
    price: "$99 MXN",
    oneTime: "PAGO ÚNICO • ACCESO COMPLETO",
    button: "OBTENER ACCESO",
    checking: "VERIFICANDO ACCESO...",
    error: "No pudimos verificar el acceso. Inténtalo de nuevo.",
    features: ["Rutas y procedimientos", "Mapa de servicios", "Formularios y CV", "MI KIT", "Todas las herramientas de NOWYES"],
    note: "Pago seguro procesado por Stripe. NOWYES no guarda los datos de tu tarjeta."
  },
  en: {
    title: "NOWYES",
    subtitle: "NEW COUNTRY. NEW LIFE. KNOW YOUR NEXT STEP.",
    body: "Practical routes, services, forms and tools to help you navigate life in Mexico.",
    price: "$99 MXN",
    oneTime: "ONE-TIME PAYMENT • FULL ACCESS",
    button: "GET FULL ACCESS",
    checking: "VERIFYING ACCESS...",
    error: "We couldn't verify your access. Please try again.",
    features: ["Routes and procedures", "Service map", "Forms and CV", "MY KIT", "Full NOWYES tools"],
    note: "Secure payment processed by Stripe. NOWYES does not store your card details."
  },
  ht: {
    title: "NOWYES",
    subtitle: "NOUVO PEYI. NOUVO LAVI. KONNEN PWOCHEN ETAP OU.",
    body: "Wout, sèvis, fòm ak zouti pratik pou ede w navige lavi nan Meksik.",
    price: "$99 MXN",
    oneTime: "YON SÈL PEMAN • AKSÈ KONPLÈ",
    button: "JWENN AKSÈ KONPLÈ",
    checking: "N AP VERIFYE AKSÈ...",
    error: "Nou pa t ka verifye aksè ou. Eseye ankò.",
    features: ["Wout ak pwosedi", "Kat sèvis", "Fòm ak CV", "KIT MWEN", "Tout zouti NOWYES"],
    note: "Stripe trete peman an an sekirite. NOWYES pa estoke enfòmasyon kat ou."
  }
};

function detectLanguage(): Lang {
  const language = (navigator.language || "es").toLowerCase();
  if (language.startsWith("ht")) return "ht";
  if (language.startsWith("en")) return "en";
  return "es";
}

export default function AccessGate() {
  const [lang, setLang] = useState<Lang>(detectLanguage);
  const [status, setStatus] = useState<"checking" | "locked" | "unlocked" | "error">("checking");

  const verify = async (token: string) => {
    try {
      const response = await fetch(
        `${ACCESS_API}/verify?token=${encodeURIComponent(token)}`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        localStorage.removeItem(TOKEN_KEY);
        return false;
      }

      const data = await response.json();

      if (data.paid === true && data.access === "full") {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem("nowyes_access_verified", "true");
        return true;
      }

      localStorage.removeItem(TOKEN_KEY);
      return false;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get("access");
      const demoMode = params.get("demo") === "1";
      const storedToken = localStorage.getItem(TOKEN_KEY);

      if (demoMode) {
        if (!cancelled) setStatus("unlocked");
        return;
      }

      if (urlToken) {
        const ok = await verify(urlToken);

        if (ok) {
          window.history.replaceState({}, "", window.location.pathname);
        }

        if (!cancelled) {
          setStatus(ok ? "unlocked" : "error");
        }
        return;
      }

      if (storedToken) {
        const ok = await verify(storedToken);

        if (ok || (!navigator.onLine && localStorage.getItem("nowyes_access_verified") === "true")) {
          if (!cancelled) setStatus("unlocked");
          return;
        }
      }

      if (!cancelled) setStatus("locked");
    };

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  const t = copy[lang];

  if (status === "checking") {
    return (
      <div className="min-h-screen bg-[#0A0A0C] text-white flex items-center justify-center p-6">
        <div className="text-center">
          <img src={logoUrl} alt="NOWYES" className="w-28 h-28 object-contain mx-auto mb-6" />
          <p className="text-[12px] font-bold tracking-[0.2em] text-white/60">{t.checking}</p>
        </div>
      </div>
    );
  }

  if (status === "unlocked") {
    return <App />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white flex items-center justify-center p-5">
      <main className="w-full max-w-[520px] text-center">
        <div className="mb-5 flex justify-end gap-1">
          {([["es", "ES"], ["en", "EN"], ["ht", "HT"]] as const).map(([code, label]) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={`border px-2.5 py-1 text-[10px] font-black tracking-wider ${lang === code ? "border-[#D4A845] text-[#D4A845]" : "border-white/15 text-white/45"}`}
            >
              {label}
            </button>
          ))}
        </div>

        <img src={logoUrl} alt="NOWYES" className="w-32 h-32 object-contain mx-auto mb-5" />

        <h1 className="text-[34px] font-black tracking-tight">{t.title}</h1>
        <p className="mt-2 text-[13px] font-bold tracking-[0.16em] text-[#D4A845]">{t.subtitle}</p>
        <p className="mt-5 text-[15px] leading-relaxed text-white/65">{t.body}</p>

        <div className="mt-7 grid gap-2 text-left">
          {t.features.map((feature) => (
            <div key={feature} className="border border-white/10 bg-white/[0.03] px-4 py-3 text-[13px] text-white/80">
              ✓ {feature}
            </div>
          ))}
        </div>

        <div className="mt-7 border border-[#D4A845]/30 bg-[#D4A845]/[0.06] p-5">
          <div className="text-[32px] font-black">{t.price}</div>
          <div className="mt-1 text-[10px] font-bold tracking-[0.18em] text-white/50">{t.oneTime}</div>

          <a
            href={PAYMENT_URL}
            className="mt-5 flex min-h-[52px] items-center justify-center bg-[#D4A845] px-6 text-[12px] font-black tracking-[0.16em] text-black"
          >
            {t.button}
          </a>
        </div>

        {status === "error" && (
          <p className="mt-4 text-[12px] text-red-300">{t.error}</p>
        )}

        <p className="mt-6 text-[10px] leading-relaxed text-white/35">{t.note}</p>
      </main>
    </div>
  );
}
