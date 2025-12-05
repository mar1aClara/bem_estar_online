import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState, ReactNode } from "react";

export type Receita = {
    id: number;
    cpf: string;
    nome: string;
    crm: string;
    nomeMedico: string;
    medicamento: string;
    observacao: string;
};

type ReceitaContextType = {
    receitas: Receita[];
    addReceita: (
        cpf: string,
        nome: string,
        crm: string,
        nomeMedico: string,
        medicamento: string,
        observacao: string,
    ) => void;
    getReceitaByCPF: (cpf: string) => Receita | null;
};

export const ReceitaContext = createContext<ReceitaContextType | undefined>(undefined);

export function TaskReceita({ children }: { children: ReactNode }) {

    const STORAGE_KEY = "BemEstarOnline:Receitas";

    const [receitas, setReceitas] = useState<Receita[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Carregar dados do AsyncStorage
    useEffect(() => {
        const loadData = async () => {
            try {
                const json = await AsyncStorage.getItem(STORAGE_KEY);
                const data = json ? (JSON.parse(json) as Receita[]) : [];
                setReceitas(data);
                setIsLoaded(true);
            } catch (e) {
                console.log("Erro ao carregar receitas", e);
            }
        };

        loadData();
    }, []);

    // Salvar no AsyncStorage quando mudar
    useEffect(() => {
        const saveData = async () => {
            try {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(receitas));
            } catch (e) {
                console.log("Erro ao salvar receitas", e);
            }
        };

        if (isLoaded) saveData();
    }, [receitas, isLoaded]);

    // Criar Receita
    const addReceita = (
        cpf: string,
        nome: string,
        crm: string,
        nomeMedico: string,
        medicamento: string,
        observacao: string,
    ) => {
        setReceitas((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                cpf,
                nome,
                crm,
                nomeMedico,
                medicamento,
                observacao,
            },
        ]);
    };

    // Buscar dados por CPF
    const getReceitaByCPF = (cpf: string): Receita | null => {
        return receitas.find(r => r.cpf === cpf) || null;
    };

    return (
        <ReceitaContext.Provider value={{ receitas, addReceita, getReceitaByCPF }}>
            {children}
        </ReceitaContext.Provider>
    );
}
