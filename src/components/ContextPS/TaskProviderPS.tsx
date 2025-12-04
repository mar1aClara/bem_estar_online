import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState, ReactNode } from "react";

export type Unidade = {
    id: number;
    nome: string;
    senha: string;
    telefone: string;
    cidade: string;
    cnpj: string;
};


type UnidadeContextType = {
    unidades: Unidade[];
    addUnidade: (
        nome: string,
        senha: string,
        telefone: string,
        cidade: string,
        cnpj: string
    ) => void;
};

export const UnidadeContext = createContext<UnidadeContextType | undefined>(undefined);

export function TaskProviderPS({ children }: { children: ReactNode }) {

    const STORAGE_KEY = "BemEstarOnline:Unidades";

    const [unidades, setUnidades] = useState<Unidade[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Carregar dados do AsyncStorage
    useEffect(() => {
        const loadData = async () => {
            try {
                const json = await AsyncStorage.getItem(STORAGE_KEY);
                const data = json ? (JSON.parse(json) as Unidade[]) : [];
                setUnidades(data);
                setIsLoaded(true);
            } catch (e) {
                console.log("Erro ao carregar unidades", e);
            }
        };

        loadData();
    }, []);

    // Salvar no AsyncStorage quando mudar
    useEffect(() => {
        const saveData = async () => {
            try {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(unidades));
            } catch (e) {
                console.log("Erro ao salvar unidades", e);
            }
        };

        if (isLoaded) saveData();
    }, [unidades, isLoaded]);


    // Criar Unidade
    const addUnidade = (
        nome: string,
        senha: string,
        telefone: string,
        cidade: string,
        cnpj: string
    ) => {
        setUnidades((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                nome,
                senha,
                telefone,
                cidade,
                cnpj,
            },
        ]);
    };

    return (
        <UnidadeContext.Provider value={{ unidades, addUnidade }}>
            {children}
        </UnidadeContext.Provider>
    );
}
