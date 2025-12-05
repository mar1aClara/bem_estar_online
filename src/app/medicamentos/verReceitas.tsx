import SetaVoltar from "@/components/SetaVoltar";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import useReceita from "@/components/ContextReceita/useReceita";
import useTaskContext from "@/components/Context/useTaskContext";

export default function PedidosPacientes() {
  const { receitas } = useReceita();
  const { pacientes } = useTaskContext();

  const pacienteLogado = pacientes[pacientes.length - 1];
  const cpfLogado = pacienteLogado?.cep || null; 
  const minhasReceitas = receitas.filter(r => r.cpf === cpfLogado);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <SetaVoltar color="#fff" />
        <Text style={styles.headerTitle}>Minhas Receitas</Text>
      </View>

      {(!minhasReceitas || minhasReceitas.length === 0) ? (
        <Text style={styles.empty}>Nenhuma receita encontrada para você.</Text>
      ) : (
        <FlatList
          data={minhasReceitas}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.itemTitle}>{item.medicamento}</Text>

              <Text style={styles.info}>Paciente: {item.nome}</Text>
              <Text style={styles.info}>CPF: {item.cpf}</Text>
              <Text style={styles.info}>CRM: {item.crm}</Text>
              <Text style={styles.info}>Médico: {item.nomeMedico}</Text>

              {item.observacao ? (
                <Text style={styles.obs}>Obs: {item.observacao}</Text>
              ) : null}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0346",
    padding: 20
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffffff",
    marginLeft: 30,
  },
  empty: {
    color: "#ccc",
    marginTop: 40,
    textAlign: "center"
  },
  card: {
    backgroundColor: "#28578e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  itemTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  info: {
    color: "#ccc",
    marginTop: 5
  },
  obs: {
    color: "#ffa",
    marginTop: 5,
    fontStyle: "italic"
  },
});

