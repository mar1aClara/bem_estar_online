import { useReceitas } from "@/components/Context/TaskProvider";
import SetaVoltar from "@/components/SetaVoltar";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function PedidosPacientes() {
  const { receitas } = useReceitas();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <SetaVoltar color="#fff" />
        <Text style={styles.headerTitle}>Pedidos de Pacientes</Text>
      </View>
      {(!receitas || receitas.length === 0) ? (
        <Text style={styles.empty}>Nenhum pedido encontrado.</Text>
      ) : (
        <FlatList
          data={receitas}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.itemTitle}>{item.medicamento}</Text>

              <Text style={styles.info}>Paciente: {item.paciente}</Text>
              <Text style={styles.info}>CPF: {item.cpf}</Text>
              <Text style={styles.info}>Quantidade: {item.quantidade}</Text>
              <Text style={styles.info}>Data: {item.data}</Text>

              {item.observacoes ? (
                <Text style={styles.obs}>Obs: {item.observacoes}</Text>
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
    backgroundColor: "#1a0d63",
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

