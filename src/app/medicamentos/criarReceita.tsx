import SetaVoltar from "@/components/SetaVoltar";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import useReceita from "@/components/ContextReceita/useReceita";
import useTaskContext from "@/components/Context/useTaskContext";
import medicosJson from "@/json/medicos.json";
 
type Medico = {
  nome: string;
  especialidade: string;
  crm: string;
  telefone: string;
  email: string;
  endereco: {
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  horarios_disponiveis: string[];
};
 
export default function CriarReceita() {
  const { addReceita } = useReceita();
  const { pacientes } = useTaskContext();
 
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [crm, setCrm] = useState("");
  const [nomeMedico, setNomeMedico] = useState("");
  const [medicamento, setMedicamento] = useState("");
  const [observacao, setObservacao] = useState("");
  const [sugestoes, setSugestoes] = useState<string[]>([]);
 
  // LISTA DE MEDICAMENTOS PARA SUGESTÃO
  const medicamentosLista = [
    "Dipirona",
    "Paracetamol",
    "Ibuprofeno",
    "Amoxicilina",
    "Omeprazol",
    "Loratadina",
    "Prednisona",
    "Azitromicina",
    "Diclofenaco",
    "Tramal",
  ];
 
  function formatarCPF(text: string) {
    const num = text.replace(/\D/g, "");
 
    if (num.length <= 11) {
      return num
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
 
    return num;
  }
 
  function verificarCPF() {
    if (!cpf) {
      Alert.alert("Erro", "Digite um CPF antes de verificar.");
      return;
    }
 
    const somenteNum = cpf.replace(/\D/g, "");
 
    const paciente = pacientes.find(
      (p) => (p.cep || "").replace(/\D/g, "") === somenteNum
    );
 
    if (!paciente) {
      Alert.alert("CPF não encontrado.");
      return;
    }
 
    setNome(paciente.nome);
  }
 
  function verificarCRM() {
    if (!crm) {
      Alert.alert("Erro", "Digite um CRM antes de verificar.");
      return;
    }
 
    const medico = (medicosJson as Record<string, Medico | undefined>)[crm];
 
    if (!medico) {
      Alert.alert("CRM não encontrado.");
      return;
    }
 
    setNomeMedico(medico.nome);
  }
 
  function enviarReceita() {
    if (!nome || !cpf || !crm || !nomeMedico || !medicamento || !observacao) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }
 
    addReceita(cpf, nome, crm, nomeMedico, medicamento, observacao);
 
    setNome("");
    setCpf("");
    setCrm("");
    setNomeMedico("");
    setMedicamento("");
    setObservacao("");
 
    router.back();
  }
 
  function buscarMedicamentos(text: string) {
    setMedicamento(text);
 
    if (text.length < 1) {
      setSugestoes([]);
      return;
    }
 
    const filtro = medicamentosLista.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
 
    setSugestoes(filtro);
  }
 
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <SetaVoltar color="#fff" />
        <Text style={styles.title}>Criar Receita</Text>
      </View>
 
      {/* CPF + Verificar */}
      <View style={styles.cpfRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="CPF"
          value={cpf}
          onChangeText={(t) => setCpf(formatarCPF(t))}
          keyboardType="numeric"
          maxLength={14}
        />
 
        <TouchableOpacity style={styles.verifyButton} onPress={verificarCPF}>
          <Text style={styles.verifyText}>Verificar</Text>
        </TouchableOpacity>
      </View>
 
      {/* CRM + Verificar */}
      <View style={styles.cpfRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="CRM"
          onChangeText={setCrm}
          value={crm}
          keyboardType="numeric"
        />
 
        <TouchableOpacity style={styles.verifyButton} onPress={verificarCRM}>
          <Text style={styles.verifyText}>Verificar</Text>
        </TouchableOpacity>
      </View>
 
      <TextInput
        style={styles.input}
        placeholder="Nome do Paciente"
        onChangeText={setNome}
        value={nome}
      />
 
      <TextInput
        style={styles.input}
        placeholder="Nome do Médico"
        onChangeText={setNomeMedico}
        value={nomeMedico}
      />
 
      {/* MEDICAMENTO COM AUTOCOMPLETE */}
      <View style={{ width: "100%" }}>
        <TextInput
          style={styles.input}
          placeholder="Medicamento"
          onChangeText={buscarMedicamentos}
          value={medicamento}
        />
 
        {sugestoes.length > 0 && (
          <View style={styles.sugestoesBox}>
            {sugestoes.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setMedicamento(item);
                  setSugestoes([]);
                }}
              >
                <Text style={styles.sugestaoItem}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
 
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Observações"
        multiline
        onChangeText={setObservacao}
        value={observacao}
      />
 
      <TouchableOpacity style={styles.button} onPress={enviarReceita}>
        <Text style={styles.buttonText}>Enviar Receita</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0c0346",
  },
 
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
 
  title: {
    fontSize: 22,
    color: "#fff",
    marginLeft: 80,
    fontWeight: "bold",
  },
 
  cpfRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 1,
  },
 
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
 
  verifyButton: {
    backgroundColor: "#28578e",
    padding: 12,
    borderRadius: 10,
    marginLeft: 8,
    marginBottom: 12,
  },
 
  verifyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
 
  sugestoesBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    marginTop: -10,
    marginBottom: 10,
  },
 
  sugestaoItem: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
 
  button: {
    backgroundColor: "#28578e",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
 
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
 
 