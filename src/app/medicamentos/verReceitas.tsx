// verReceita.tsx (ou o arquivo no path: @/medicamentos/verReceita)
import SetaVoltar from "@/components/SetaVoltar";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import useReceita from "@/components/ContextReceita/useReceita";
import useTaskContext from "@/components/Context/useTaskContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useNavigation } from "expo-router";

export default function VerReceita() {
  const { receitas } = useReceita();
  const { pacientes } = useTaskContext();
  const router = useRouter();
  const navigation = useNavigation();

  const pacienteLogado = pacientes[pacientes.length - 1];
  const cpfLogado = pacienteLogado?.cep || null;
  const minhasReceitas = receitas.filter(r => r.cpf === cpfLogado);

  const [selectMode, setSelectMode] = useState(false);
  const [expectedMedicine, setExpectedMedicine] = useState<string | null>(null);

  useEffect(() => {
    // checa se entrou em modo de seleção (houve expectedMedicine)
    const checkExpected = async () => {
      try {
        const expected = await AsyncStorage.getItem('@MyApp:ExpectedMedicine');
        if (expected) {
          setSelectMode(true);
          setExpectedMedicine(expected);
        } else {
          setSelectMode(false);
          setExpectedMedicine(null);
        }
      } catch (e) {
        console.warn('Erro ao ler expected medicine', e);
    };
    
    const unsubscribe = navigation?.addListener?.('focus', checkExpected);
    checkExpected();
    checkExpected();

    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') unsubscribe();
    };
  }}, []);

  const onSelectRecipe = async (item: any) => {
  // 📌 Se NÃO estiver em modo de seleção, só exibe o alert comum
  if (!selectMode || !expectedMedicine) {
    Alert.alert('Receita', `Medicamento: ${item.medicamento}\nMédico: ${item.nomeMedico}`);
    return;
  }

  // 📌 Comparação case-insensitive
  const receitaMed = (item.medicamento || '').toString().trim().toLowerCase();
  const expectedMed = expectedMedicine.toString().trim().toLowerCase();

  // ❌ Receita errada → só alerta
  if (receitaMed !== expectedMed) {
    Alert.alert(
      'Receita inválida',
      `A receita selecionada é para "${item.medicamento}" e não corresponde ao produto "${expectedMedicine}".`
    );
    return;
  }

  // ✔️ Receita CORRETA → salva e volta automaticamente
  try {
    await AsyncStorage.setItem('@MyApp:SelectedRecipe', JSON.stringify(item));
    await AsyncStorage.removeItem('@MyApp:ExpectedMedicine');

    // ⬅️ VOLTA AUTOMATICAMENTE
    router.back();

  } catch (e) {
    console.warn('Erro ao salvar receita selecionada', e);
    Alert.alert('Erro', 'Não foi possível selecionar a receita. Tente novamente.');
  }
};

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
            <TouchableOpacity activeOpacity={0.8} onPress={() => onSelectRecipe(item)}>
              <View style={[styles.card, selectMode ? { borderColor: '#ffd54f', borderWidth: 2 } : null]}>
                <Text style={styles.itemTitle}>{item.medicamento}</Text>

                <Text style={styles.info}>Paciente: {item.nome}</Text>
                <Text style={styles.info}>CPF: {item.cpf}</Text>
                <Text style={styles.info}>CRM: {item.crm}</Text>
                <Text style={styles.info}>Médico: {item.nomeMedico}</Text>

                {item.observacao ? (
                  <Text style={styles.obs}>Obs: {item.observacao}</Text>
                ) : null}

                {selectMode && <Text style={styles.hint}>Toque para selecionar esta receita</Text>}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0c0346", padding: 20 },
  headerRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 15, paddingVertical: 12, marginBottom: 10 },
  headerTitle: { fontSize: 26, fontWeight: "bold", color: "#ffffffff", marginLeft: 30 },
  empty: { color: "#ccc", marginTop: 40, textAlign: "center" },
  card: { backgroundColor: "#28578e", padding: 15, borderRadius: 10, marginBottom: 12 },
  itemTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  info: { color: "#ccc", marginTop: 5 },
  obs: { color: "#ffa", marginTop: 5, fontStyle: "italic" },
  hint: { marginTop: 8, color: "#ffd54f", fontWeight: "700" }
});
