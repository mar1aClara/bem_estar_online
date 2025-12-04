import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UnidadeType = {
  nome: string;
  endereco: string;
  telefone: string;
  foto: string | null;
};

type UnidadeContextType = {
  unidade: UnidadeType;
  updateUnidade: (data: Partial<UnidadeType>) => void;
};

const UnidadeContext = createContext<UnidadeContextType>({
  unidade: { nome: "Unidade Básica", endereco: "", telefone: "", foto: null },
  updateUnidade: () => {},
});

export function UnidadeProvider({ children }: { children: React.ReactNode }) {
  const [unidade, setUnidade] = useState<UnidadeType>({
    nome: "Unidade Básica",
    endereco: "",
    telefone: "",
    foto: null,
  });

  useEffect(() => {
    AsyncStorage.getItem("unidade").then((data) => {
      if (data) setUnidade(JSON.parse(data));
    });
  }, []);

  const updateUnidade = (data: Partial<UnidadeType>) => {
    const newData = { ...unidade, ...data };
    setUnidade(newData);
    AsyncStorage.setItem("unidade", JSON.stringify(newData));
  };

  return (
    <UnidadeContext.Provider value={{ unidade, updateUnidade }}>
      {children}
    </UnidadeContext.Provider>
  );
}

export const useUnidade = () => useContext(UnidadeContext);
