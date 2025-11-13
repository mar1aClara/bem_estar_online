import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ModalMedicamento from "../ModalMedicamentos";

type PurchaseSummaryProps = {
    produto: any;
    quantidade: number;
    receitaCarregada: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export default function DetalheCompraModal({ produto, quantidade, receitaCarregada, onClose, onConfirm }: 
    PurchaseSummaryProps) {
    const precoNumerico = parseFloat(produto.preco.replace('R$', '').replace(',', '.').trim());
    const valorTotal = isNaN(precoNumerico) ? 0 : (precoNumerico * quantidade).toFixed(2).replace('.', ',');

    const ConfirmationContent = (
        <View style={styles.summaryContentContainer}>
            <View style={styles.summarySection}>
                <Text style={styles.summarySectionTitle}>Resumo do Pedido</Text>
                <View style={styles.summaryItemRow}>
                    <Text style={styles.summaryLabel}>Quantidade:</Text>
                    <Text style={styles.summaryValue}>{quantidade} unidade(s)</Text>
                </View>
                <View style={styles.summaryItemRow}>
                    <Text style={styles.summaryLabel}>Valor Unitário:</Text>
                    <Text style={styles.summaryValue}>{produto.preco}</Text>
                </View>
                <View style={styles.summaryItemRow}>
                    <Text style={styles.summaryLabel}>Valor Total:</Text>
                    <Text style={styles.summaryPrice}>R$ {valorTotal}</Text>
                </View>
                
                {produto.receitaObrigatoria && (
                    <View style={styles.summaryRecipeStatusRow}>
                        <FontAwesome 
                            name={receitaCarregada ? "check-circle" : "times-circle"} 
                            size={16} 
                            color={receitaCarregada ? "#63cf7a" : "#ff6b6b"} 
                        />
                        <Text style={[styles.summaryRecipeStatusText, { color: receitaCarregada ? "#63cf7a" : "#ff6b6b" }]}>
                            {receitaCarregada ? 'Receita Anexada' : 'Receita Pendente'}
                        </Text>
                    </View>
                )}
            </View>
            <View style={styles.summaryAllergyWarning}>
                <FontAwesome name="warning" size={20} color="#fff" style={{ marginRight: 10 }} />
                <Text style={styles.summaryAllergyWarningText}>
                    AVISO DE EFEITOS COLATERAIS: {produto.alertaAlergia || "Leia a bula. Risco de reações alérgicas ou efeitos adversos."}
                </Text>
            </View>
            <Pressable 
                onPress={onConfirm} 
                style={({ pressed }) => [
                    styles.summaryConfirmButton, 
                    { opacity: pressed ? 0.8 : 1, backgroundColor: produto.receitaObrigatoria && !receitaCarregada ? '#ccc' : styles.summaryConfirmButton.backgroundColor }
                ]}
                disabled={produto.receitaObrigatoria && !receitaCarregada}
            >
                <Text style={styles.summaryConfirmButtonText}>
                    {produto.receitaObrigatoria && !receitaCarregada ? 'RECEITA PENDENTE' : 'FINALIZAR COMPRA'}
                </Text>
            </Pressable>
        </View>
    );

    return (
        <ModalMedicamento
            imagem={produto.img}
            titulo={`Confirmar ${produto.nome}`}
            subtitulo={produto.tipo}
            texto={ConfirmationContent} 
            onClose={onClose}
        />
    );
}

const styles = StyleSheet.create({
    summaryContentContainer: {
        paddingTop: 10,
    },
    summarySection: {
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    summarySectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0c0346',
        marginBottom: 8,
    },
    summaryItemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    summaryLabel: {
        fontSize: 15,
        color: '#333',
    },
    summaryValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0c0346',
    },
    summaryPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff6b6b',
    },
    summaryRecipeStatusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        padding: 5,
        backgroundColor: '#f0f4f8',
        borderRadius: 5,
    },
    summaryRecipeStatusText: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
    summaryAllergyWarning: { 
        backgroundColor: '#d9534f',
        padding: 15,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    summaryAllergyWarningText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '500',
        flex: 1,
    },
    summaryConfirmButton: {
        backgroundColor: '#63cf7a',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    summaryConfirmButtonText: {
        color: '#0c0346',
        fontSize: 18,
        fontWeight: 'bold',
    }
})