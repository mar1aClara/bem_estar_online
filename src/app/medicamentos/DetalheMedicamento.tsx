import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import DetalheCompraModal from "@/components/DetalheCompraModal";
import Header from "@/components/Header";

const { width } = Dimensions.get('window');


export default function DetalheMedicamento() {
    const params = useLocalSearchParams();
    const produto = {...params} || {}; 
    const [quantidade, setQuantidade] = useState(1);
    const [receitaCarregada, setReceitaCarregada] = useState(false);
    const [isSummaryVisible, setIsSummaryVisible] = useState(false); 

    const aumentarQuantidade = () => {
        setQuantidade(quantidade + 1);
    };

    const diminuirQuantidade = () => {
        if (quantidade > 1) {
            setQuantidade(quantidade - 1);
        }
    };

    const abrirModalConfirmacao = () => {
        if (quantidade > 1) {
             Alert.alert("Erro", "Quantidade solicitada excede o estoque disponível.");
             return;
        }
        setIsSummaryVisible(true);
    };
    
    const finalizarCompra = () => {  
        if (produto.receitaObrigatoria && !receitaCarregada) {
            Alert.alert("Erro de Receita", "A compra não pode ser finalizada sem receita.");
            return;
        }

        Alert.alert(
            "Compra Efetuada!",
            `${quantidade}x ${produto.nome} comprado(s).`
        );
    };

    const navegarParaUploadReceita = () => {
        setReceitaCarregada(true); 
    };
    
    

    return (
        <View style={styles.container}>
            <Header texto="Detalhes do produto"/>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* --- 2. ESTOQUE E CONTADOR --- */}
                <View style={styles.infoRow}>
                    <View style={styles.quantidadeControl}>
                        <Text style={styles.quantidadeLabel}>Quantidade:</Text>
                        <TouchableOpacity onPress={diminuirQuantidade} style={styles.qtyButton}>
                            <FontAwesome name="minus" size={12} color="#fff" />
                        </TouchableOpacity>

                        <Text style={styles.qtyValue}>{quantidade}</Text>

                        <TouchableOpacity
                            onPress={aumentarQuantidade}
                            style={styles.qtyButton}
                        >
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
                    
                    {/* DIREITA: IMAGEM GRANDE */}
                    <View style={styles.rightColumn}>
                        <Image
                            source={produto.img}
                            style={styles.productImage}
                            resizeMode="contain"
                        />
                        
                        {/* AVISO DE RECEITA OBRIGATÓRIA */}
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


                {/* --- 4. BOTÃO DE AÇÃO PRINCIPAL --- */}
                <TouchableOpacity style={styles.buyButton} onPress={abrirModalConfirmacao}>
                    <Text style={styles.buyButtonText}>
                        {produto.receitaObrigatoria && !receitaCarregada ? 'REVISAR RECEITA' : 'CONFIRMAR COMPRA'}
                    </Text>
                </TouchableOpacity>

                {/* Indicador de Receita Carregada (para teste) */}
                {produto.receitaObrigatoria && (
                    <Text style={styles.recipeStatus}>
                        Status da Receita: {receitaCarregada ? '✅ Receita Anexada' : '❌ Pendente'}
                    </Text>
                )}

            </ScrollView>
            
            {/* --- 5. BOTÃO FLUTUANTE DA CÂMERA --- */}
            <TouchableOpacity
                style={styles.cameraButton}
                onPress={navegarParaUploadReceita}
            >
                <FontAwesome name="camera" size={30} color="#fff" />
            </TouchableOpacity>

            {/* MODAL DE CONFIRMAÇÃO */}
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
    container: {
        flex: 1,
        backgroundColor: '#0c0346',
    },
    

    scrollContent:{
        padding: 15,
    },

    // 2. ESTOQUE E CONTADOR
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#1a0d63',
        borderRadius: 8,
    },
    quantidadeControl: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantidadeLabel: {
        color: '#fff',
        marginRight: 12,
        fontSize: 18,
        marginLeft: 70
    },
    qtyButton: {
        backgroundColor: '#28578e',
        borderRadius: 5,
        padding: 8,
        marginHorizontal: 5,
    },
    qtyValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        minWidth: 30,
        textAlign: 'center',
    },

    // 3. LAYOUT DUAS COLUNAS
    contentArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    leftColumn: {
        width: '50%',
        paddingRight: 10,
    },
    rightColumn: {
        width: '50%',
        paddingLeft: 10,
        alignItems: 'center',
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    productType: {
        fontSize: 14,
        color: '#678ab2',
        marginBottom: 10,
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginTop: 10,
    },
    productDescription: {
        fontSize: 14,
        color: '#ccc',
        marginTop: 5,
    },
    productImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        backgroundColor: '#f0f4f8',
        marginBottom: 10,
    },
    priceText: {
        fontSize: 28,
        fontWeight: '900',
        color: '#ff6b6b',
        marginTop: 90,
    },
    
    // Aviso de Receita (Na Coluna da Esquerda)
    recipeWarning: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a0d63',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        borderLeftWidth: 3,
        borderColor: '#ff6b6b',
        marginBottom: 45
    },
    recipeWarningText: {
        color: '#ff6b6b',
        fontSize: 12,
        marginLeft: 10,
        flexShrink: 1,
    },
    recipeStatus: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#63cf7a',
        textAlign: 'center',
        marginTop: 10,
    },

    // 4. BOTÃO DE COMPRA PRINCIPAL
    buyButton: {
        backgroundColor: '#28578e',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buyButtonText: {
        color: '#f5f3ffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // 5. BOTÃO FLUTUANTE DA CÂMERA
    cameraButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#28578e',
        borderRadius: 35,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },

    // --- ESTILOS DO MODALCARD (Wrapper) ---
    
    
    // --- ESTILOS DO DetalheCompraModal (Conteúdo) ---
});