import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState, ReactNode } from "react";

type Unidade = {
  id: number;
  nome: string;
  senha: string;
  telefone: string;
  cidade: string;
  cnpj: string;
  foto: string | null;
};

type UnidadeContextType = {
  unidades: Unidade[];
  addUnidade: (
    nome: string,
    senha: string,
    telefone: string,
    cidade: string,
    cnpj: string,
    foto?: string | null
  ) => void;

  updateProfile: (id: number, data: Partial<Unidade>) => void;

  currentUserId: number | null;
  setCurrentUserId: (id: number) => void;
};

export const UnidadeContext = createContext<UnidadeContextType | undefined>(undefined);

export function TaskProviderPS({ children }: { children: ReactNode }) {
  const STORAGE_KEY = "BemEstarOnline:Unidades";

  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  // 🔹 Carregar os dados
  useEffect(() => {
    const getData = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        const loadedData = json  != null ? (JSON.parse(json) as Unidade[]) : [];
        setUnidades(loadedData);
        setIsLoaded(true);
      } catch (e) {}
    };
    getData();
  }, []);

  // 🔹 Salvar automaticamente quando mudar
  useEffect(() => {
    const storeData = async (list: Unidade[]) => {
      try {
        const jsonValue = JSON.stringify(list);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      } catch (e) {}
    };
    if (isLoaded) {
      storeData(unidades);
    }
  }, [unidades, isLoaded]);

  const addUnidade = (
    nome: string,
    senha: string,
    telefone: string,
    cidade: string,
    cnpj: string,
    foto?: string | null
  ) => {
    setUnidades((oldState) => {
      const newUser = {
        id: oldState.length + 1,
        nome,
        senha,
        telefone,
        cidade,
        cnpj,
        foto: null,
      };

      setCurrentUserId(newUser.id);
      return [...oldState, newUser];
    });
  };

  const updateProfile = (id: number, data: Partial<Unidade>) => {
    setUnidades((oldList) =>
      oldList.map((u) => (u.id === id ? { ...u, ...data } : u))
    );
  };

  return (
    <UnidadeContext.Provider
      value={{ 
        unidades, 
        addUnidade, 
        updateProfile, 
        currentUserId,
        setCurrentUserId }}
    >
      {children}
    </UnidadeContext.Provider>
  );
}
