import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ProfileType = {
  nome: string;
  foto: string | null;
};

type ProfileContextType = {
  profile: ProfileType;
  updateProfile: (data: Partial<ProfileType>) => void;
};

const ProfileContext = createContext<ProfileContextType>({
  profile: { nome: "Fulaninho da Silva", foto: null },
  updateProfile: () => {}
});

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileType>({
    nome: "Fulaninho da Silva",
    foto: null
  });

  // Carrega dados salvos
  useEffect(() => {
    AsyncStorage.getItem("perfil").then((data) => {
      if (data) setProfile(JSON.parse(data));
    });
  }, []);

  // Atualiza e salva
  const updateProfile = (data: Partial<ProfileType>) => {
    const newData = { ...profile, ...data };
    setProfile(newData);
    AsyncStorage.setItem("perfil", JSON.stringify(newData));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
