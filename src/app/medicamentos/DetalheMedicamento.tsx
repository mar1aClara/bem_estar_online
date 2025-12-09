// DetalheMedicamento.tsx
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import DetalheCompraModal from "@/components/DetalheCompraModal";
import Header from "@/components/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function DetalheMedicamento() {
  const params = useLocalSearchParams();
  const produto: any = { ...(params ?? {}) };

  const [quantidade, setQuantidade] = useState(1);
  const [receitaCarregada, setReceitaCarregada] = useState(false);
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [receitaSelecionada, setReceitaSelecionada] = useState<any | null>(null);

  const aumentarQuantidade = () => setQuantidade(q => q + 1);
  const diminuirQuantidade = () => setQuantidade(q => Math.max(1, q - 1));

  const finalizarCompra = () => {
    if (produto.receitaObrigatoria && !receitaCarregada) {
      Alert.alert("Erro de Receita", "A compra não pode ser finalizada sem receita.");
      return;
    }

    Alert.alert("Compra Efetuada!", `${quantidade}x ${produto.nome} comprado(s).`);
  };

  const navegarParaReceitas = async () => {
    // grava qual medicamento esperamos e limpa seleção anterior
    try {
      await AsyncStorage.setItem('@MyApp:ExpectedMedicine', String(produto.nome || ''));
      await AsyncStorage.removeItem('@MyApp:SelectedRecipe');
    } catch (e) {
      console.warn('Erro ao preparar seleção de receita', e);
    }
    router.push('/medicamentos/verReceitas');
  };

  // quando a tela volta, verifica se existe uma receita selecionada
  useFocusEffect(useCallback(() => {
    let mounted = true;

    const checkSelectedRecipe = async () => {
      try {
        const json = await AsyncStorage.getItem('@MyApp:SelectedRecipe');
        const expected = await AsyncStorage.getItem('@MyApp:ExpectedMedicine');

        if (!json || !expected) return;

        const selected = JSON.parse(json);
        if (!mounted) return;

        // valida se nome do medicamento da receita bate com produto.nome
        const recipeMedicine = (selected.medicamento || '').toString().trim();
        const expectedMedicine = (expected || '').toString().trim();

        if (recipeMedicine.toLowerCase() === expectedMedicine.toLowerCase()) {
          setReceitaSelecionada(selected);
          setReceitaCarregada(true);
          Alert.alert('Receita Selecionada', 'Receita válida para este medicamento carregada.');
        } else {
          // mismatch: rejeita e avisa
          await AsyncStorage.removeItem('@MyApp:SelectedRecipe');
          await AsyncStorage.removeItem('@MyApp:ExpectedMedicine');
          setReceitaSelecionada(null);
          setReceitaCarregada(false);
          Alert.alert('Receita Inválida', 'A receita selecionada não corresponde a este medicamento.');
        }

        // limpa a variável expected (somente pra evitar seleção repetida)
        await AsyncStorage.removeItem('@MyApp:ExpectedMedicine');

      } catch (e) {
        console.warn('Erro ao recuperar receita selecionada', e);
      }
    };

    checkSelectedRecipe();

    return () => { mounted = false; };
  }, []));

  return (
    <View style={styles.container}>
      <Header texto="Detalhes do produto"/>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.infoRow}>
          <View style={styles.quantidadeControl}>
            <Text style={styles.quantidadeLabel}>Quantidade:</Text>

            <TouchableOpacity onPress={diminuirQuantidade} style={styles.qtyButton}>
              <FontAwesome name="minus" size={12} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.qtyValue}>{quantidade}</Text>

            <TouchableOpacity onPress={aumentarQuantidade} style={styles.qtyButton}>
              <FontAwesome name="plus" size={12} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentArea}>
          <View style={styles.leftColumn}>
            <Text style={styles.productName}>{produto.nome}</Text>
            <Text style={styles.productType}>Categoria: {produto.tipo}</Text>
            <Text style={styles.sectionLabel}>Descrição:</Text>
            <Text style={styles.productDescription}>
              {produto.descricao || "Descrição detalhada do produto não disponível."}
            </Text>
            <Text style={styles.priceText}>{produto.preco}</Text>
          </View>

          <View style={styles.rightColumn}>
            <Image source={produto.img} style={styles.productImage} resizeMode="contain" />

            {produto.receitaObrigatoria && (
              <View style={styles.recipeWarning}>
                <FontAwesome name="file-text-o" size={18} color="#ff6b6b" />
                <Text style={styles.recipeWarningText}>
                  Venda obrigatória mediante apresentação de receita médica.
                </Text>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => setIsSummaryVisible(true)}
        >
          <Text style={styles.buyButtonText}>
            {produto.receitaObrigatoria && !receitaCarregada ? 'REVISAR RECEITA' : 'CONFIRMAR COMPRA'}
          </Text>
        </TouchableOpacity>

        {produto.receitaObrigatoria && (
          <Text style={styles.recipeStatus}>
            Status da Receita: {receitaCarregada ? '✅ Receita Anexada' : '❌ Pendente'}
          </Text>
        )}
      </ScrollView>

      {/* botao que antes abria a câmera agora abre a lista de receitas (modo seleção) */}
      <TouchableOpacity
        style={styles.cameraButton}
        onPress={navegarParaReceitas}
      >
        <FontAwesome name="file-text" size={30} color="#fff" />
      </TouchableOpacity>

      {isSummaryVisible && (
        <DetalheCompraModal
          produto={produto}
          quantidade={quantidade}
          receitaCarregada={receitaCarregada}
          onClose={() => setIsSummaryVisible(false)}
          onConfirm={finalizarCompra}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0c0346' },
  scrollContent:{ padding: 15 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, padding: 10, backgroundColor: '#1a0d63', borderRadius: 8 },
  quantidadeControl: { flexDirection: 'row', alignItems: 'center' },
  quantidadeLabel: { color: '#fff', marginRight: 12, fontSize: 18, marginLeft: 70 },
  qtyButton: { backgroundColor: '#28578e', borderRadius: 5, padding: 8, marginHorizontal: 5 },
  qtyValue: { fontSize: 18, fontWeight: 'bold', color: '#fff', minWidth: 30, textAlign: 'center' },
  contentArea: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  leftColumn: { width: '50%', paddingRight: 10 },
  rightColumn: { width: '50%', paddingLeft: 10, alignItems: 'center' },
  productName: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 5 },
  productType: { fontSize: 14, color: '#678ab2', marginBottom: 10 },
  sectionLabel: { fontSize: 16, fontWeight: '600', color: '#fff', marginTop: 10 },
  productDescription: { fontSize: 14, color: '#ccc', marginTop: 5 },
  productImage: { width: '100%', height: 200, borderRadius: 10, backgroundColor: '#f0f4f8', marginBottom: 10 },
  priceText: { fontSize: 28, fontWeight: '900', color: '#ff6b6b', marginTop: 90 },
  recipeWarning: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a0d63', padding: 10, borderRadius: 5, marginTop: 10, borderLeftWidth: 3, borderColor: '#ff6b6b', marginBottom: 45 },
  recipeWarningText: { color: '#ff6b6b', fontSize: 12, marginLeft: 10, flexShrink: 1 },
  recipeStatus: { fontSize: 14, fontWeight: 'bold', color: '#63cf7a', textAlign: 'center', marginTop: 10 },
  buyButton: { backgroundColor: '#28578e', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buyButtonText: { color: '#f5f3ffff', fontSize: 18, fontWeight: 'bold' },
  cameraButton: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#28578e', borderRadius: 35, width: 70, height: 70, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 8 },
});
