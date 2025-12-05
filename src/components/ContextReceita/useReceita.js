import { useContext } from "react";
import { ReceitaContext } from "./TaskReceita";

export default function useReceita() {
  const context = useContext(ReceitaContext);
  if (!context) {
    throw new Error("useReceita deve ser usado dentro de TaskReceita");
  }
  return context;
}
