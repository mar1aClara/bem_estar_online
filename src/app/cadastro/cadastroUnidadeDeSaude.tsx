import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useTaskContextPS from "@/components/ContextPS/useTaskContextPS";

export default function CadastroUnidSaude() {
  const { addUnidade } = useTaskContextPS();

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [cnpj, setCnpj] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const handleSubmit = () => {
    if (!nome || !senha || !confirmarSenha || !telefone || !cidade || !cnpj) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    addUnidade(nome, senha, telefone, cidade, cnpj);

    setNome("");
    setSenha("");
    setConfirmarSenha("");
    setTelefone("");
    setCidade("");
    setCnpj("");

    router.navigate("/telaLogin/telaLogin");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={{ backgroundColor: "#0c0346" }}
    >
      <View style={styles.registerBox}>
        <Text style={styles.registerTitle}>CADASTRO UNIDADE DE SAÚDE</Text>

        <View style={styles.inputGrid}>

          {/* NOME DA UNIDADE */}
          <View style={styles.inputColumnFull}>
            <Text style={styles.label}>Nome da Unidade:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome da unidade de saúde"
              placeholderTextColor="#999"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          {/* CIDADE */}
          <View style={styles.inputColumn}>
            <Text style={styles.label}>Cidade:</Text>
            <TextInput
              style={styles.input}
              placeholder="Informe a cidade"
              placeholderTextColor="#999"
              value={cidade}
              onChangeText={setCidade}
            />
          </View>

          {/* CNPJ */}
          <View style={styles.inputColumn}>
            <Text style={styles.label}>CNPJ:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o CNPJ"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={14}
              value={cnpj}
              onChangeText={setCnpj}
            />
          </View>

          {/* TELEFONE COMPLETO IGUAL AO CADASTRO DO PACIENTE */}
          <View style={styles.inputColumnFull}>
            <Text style={styles.label}>Telefone:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o telefone"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={telefone}
              onChangeText={setTelefone}
            />
          </View>

          {/* SENHA */}
          <View style={styles.inputColumn}>
            <Text style={styles.label}>Senha:</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Digite a senha"
                placeholderTextColor="#999"
                secureTextEntry={!mostrarSenha}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity
                onPress={() => setMostrarSenha(!mostrarSenha)}
              >
                <MaterialCommunityIcons
                  name={mostrarSenha ? "eye-off" : "eye"}
                  size={24}
                  color="#333"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* CONFIRMAR SENHA */}
          <View style={styles.inputColumn}>
            <Text style={styles.label}>Confirmar Senha:</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirme sua senha"
                placeholderTextColor="#999"
                secureTextEntry={!mostrarConfirmarSenha}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />
              <TouchableOpacity
                onPress={() =>
                  setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                }
              >
                <MaterialCommunityIcons
                  name={mostrarConfirmarSenha ? "eye-off" : "eye"}
                  size={24}
                  color="#333"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#0c0346",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
  },

  registerBox: {
    backgroundColor: "#678ab2",
    borderRadius: 15,
    padding: 30,
    width: "90%",
    marginTop: 40,
  },

  registerTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#28578e",
    paddingBottom: 5,
  },

  inputGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  inputColumn: {
    width: "48%",
    marginBottom: 10,
  },

  inputColumnFull: {
    width: "100%",
    marginBottom: 10,
  },

  label: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "#f0f4f8",
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#28578e",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    borderWidth: 1,
    borderColor: "#28578e",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 4,
  },

  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 14,
  },

  button: {
    backgroundColor: "#28578e",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 25,
    width: "80%",
    alignSelf: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 20,
  },
});
