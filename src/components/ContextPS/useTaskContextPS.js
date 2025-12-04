import { useContext } from "react";
import { UnidadeContext } from "./TaskProviderPS";

export default function useTaskContextPS() {
  const context = useContext(UnidadeContext);
  if (!context) {
    throw new Error("useUnidadeContext deve ser usado dentro de UnidadeProvider");
  }
  return context;
}
