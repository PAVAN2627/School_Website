import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "hi";

type TranslationKey =
  | "nav.home"
  | "nav.about"
  | "nav.academics"
  | "nav.admissions"
  | "nav.calendar"
  | "nav.notices"
  | "nav.fees"
  | "nav.contact"
  | "nav.applyNow"
  | "lang.english"
  | "lang.hindi"
  | "home.heroTitle"
  | "home.heroSubtitle"
  | "home.beginJourney"
  | "home.discoverUs";

const messages: Record<Language, Record<TranslationKey, string>> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.academics": "Academics",
    "nav.admissions": "Admissions",
    "nav.calendar": "Calendar",
    "nav.notices": "Notices",
    "nav.fees": "Fee Structure",
    "nav.contact": "Contact",
    "nav.applyNow": "Apply Now",
    "lang.english": "EN",
    "lang.hindi": "हिंदी",
    "home.heroTitle": "Where Tradition Meets Tomorrow",
    "home.heroSubtitle": "A modern Indian school rooted in Hindu cultural values, nurturing curious minds and noble hearts since 2005.",
    "home.beginJourney": "Begin the Journey",
    "home.discoverUs": "Discover Us",
  },
  hi: {
    "nav.home": "मुख्य पृष्ठ",
    "nav.about": "हमारे बारे में",
    "nav.academics": "शैक्षणिक",
    "nav.admissions": "प्रवेश",
    "nav.calendar": "कैलेंडर",
    "nav.notices": "सूचनाएं",
    "nav.fees": "शुल्क संरचना",
    "nav.contact": "संपर्क",
    "nav.applyNow": "अभी आवेदन करें",
    "lang.english": "EN",
    "lang.hindi": "हिंदी",
    "home.heroTitle": "जहाँ परंपरा मिलती है भविष्य से",
    "home.heroSubtitle": "हिंदू सांस्कृतिक मूल्यों पर आधारित एक आधुनिक भारतीय विद्यालय, जो 2005 से जिज्ञासु मन और श्रेष्ठ संस्कारों का निर्माण कर रहा है।",
    "home.beginJourney": "यात्रा शुरू करें",
    "home.discoverUs": "हमारे बारे में जानें",
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem("vidyalaya-language");
    if (stored === "en" || stored === "hi") {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    localStorage.setItem("vidyalaya-language", next);
  };

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    t: (key: TranslationKey) => messages[language][key],
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
};
