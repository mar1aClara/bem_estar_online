import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState, ReactNode } from "react";

type Paciente = {
  nome: string;
  email: string;
  cep: string;
  cidade: string;
  telefone: string;
  senha: string;
  foto: string | null;
  id: number;
};

type TaskContextType = {
  pacientes: Paciente[];
  addPaciente: (
    nome: string,
    email: string,
    cep: string,
    cidade: string,
    telefone: string,
    senha: string,
    foto?: string | null,
  ) => void;
  
  updateProfile: (id: number, data: Partial<Paciente>) => void;

  currentUserId: number | null;
  setCurrentUserId: (id: number) => void;
};

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const TASKS_STORAGE_KEY = "BemEstarOnline:";

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);


  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        const loadeData = jsonValue != null ? (JSON.parse(jsonValue) as Paciente[]) : [];
        setPacientes(loadeData);
        setIsLoaded(true);
      } catch (e) {
        //error realoding value
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const storeData = async (value: Paciente[]) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, jsonValue);
      } catch (e) {
        //saving error
      }
    };
    if (isLoaded) {
      storeData(pacientes);
    }
  }, [pacientes, isLoaded]);

  const addPaciente = (
    nome: string,
    email: string,
    cep: string,
    cidade: string,
    telefone: string,
    senha: string
  ) => {
    setPacientes((oldState) => {
      const newPaciente = {
          nome,
          email,
          cep,
          cidade,
          telefone,
          senha,
          foto: null,
          id: oldState.length + 1,
        };

      setCurrentUserId(newPaciente.id);
      
      return [...oldState, newPaciente];
    });
  };

  const updateProfile = (id: number, data: Partial<Paciente>) => {
  setPacientes((oldList) =>
    oldList.map((p) => (p.id === id ? { ...p, ...data } : p))
  );
};

  return (
    <TaskContext.Provider
      value={{
        pacientes,
        addPaciente,
        updateProfile,
        currentUserId,
        setCurrentUserId,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
