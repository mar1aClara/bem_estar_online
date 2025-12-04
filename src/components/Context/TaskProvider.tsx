import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState, ReactNode } from "react";

type Paciente = {
  nome: string;
  email: string;
  cep: string;
  cidade: string;
  telefone: string;
  senha: string;
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
    senha: string
  ) => void;
};


export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const TASKS_STORAGE_KEY = "BemEstarOnline:";

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);



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
      return [
        ...oldState,
        {
          nome,
          email,
          cep,
          cidade,
          telefone,
          senha,
          id: oldState.length + 1,
        },
      ];
    });
  };

  return (
    <TaskContext.Provider
      value={{
        pacientes,
        addPaciente,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}