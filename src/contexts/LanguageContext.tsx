'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import eng from "../json/lang/eng.json";
import ptbr from "../json/lang/ptbr.json";

type LanguageContextProps = {
  language: string;
  setLanguage: Dispatch<SetStateAction<String>>;
  langContent: {
    buttonAdvantage: string;
    calculator: string;
    searchPlaceholder: string;
    homeTitle: string;
    strongAgainst: string;
    weakAgainst: string;
    gymTime: string;
    hours: string;
    minutes: string;
    buttonMessage: string;
    coinsPerDay: string;
  };
  title: string;
}

type LanguageProviderProps = {
  children: ReactNode;
}

export const LanguageContext = createContext({} as LanguageContextProps);

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState("");
  const [langContent, setLanguageContent] = useState(eng);
  const title = "PokéTools |";

  useEffect(() => {
    setLanguage("eng");
  }, [])

  useEffect(() => {
    if (language === "eng") {
      setLanguageContent(eng);
    } else {
      setLanguageContent(ptbr);
    }
  }, [language])

  return (
    //@ts-ignore
    <LanguageContext.Provider value={{ language, setLanguage, langContent, title }}>
      {children}
    </LanguageContext.Provider>
  )
}