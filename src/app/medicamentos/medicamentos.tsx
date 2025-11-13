// TelaVendas.jsx (Seu arquivo principal)
import ListaCategorias from "@/components/CategoriaList";
import ItemCard from "@/components/ProdutoCard";
import dadosMedicamentos from "@/json/medicamentos.js";
import { FontAwesome } from '@expo/vector-icons';
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";


// const produtosDataInicial = require('@/json/medicamentos.json');

let nextDynamicId = dadosMedicamentos.length > 0
    ? dadosMedicamentos[dadosMedicamentos.length - 1].id + 1
    : 1;


export default function TelaVendas() {
    const [filtroAtivo, setFiltroAtivo] = useState('Todos');
    const [produtosData, setProdutosData] = useState(dadosMedicamentos);

    const { novoProduto } = useLocalSearchParams();

    useFocusEffect(
        useCallback(() => {
            if (novoProduto) {
                try {
                    const novoItem = JSON.parse(novoProduto);
                    const itemComId = {
                        ...novoItem,
                        id: nextDynamicId++,
                        // img: require('@/assets/default.jpg') 
                    };

                    setProdutosData(prevProdutos => [itemComId, ...prevProdutos]);
                    Alert.alert("Sucesso", `Produto '${novoItem.nome}' cadastrado e disponível!`);

                    router.setParams({ novoProduto: undefined });

                } catch (e) {
                    console.error("Erro ao parsear novo produto:", e);
                }
            }
        }, [novoProduto])
    );

    // Lógica de Filtragem
    const produtosFiltrados = produtosData.filter(produto => {
        if (filtroAtivo === 'Todos') {
            return true;
        }
        return produto.tipo === filtroAtivo;
    });

    // Funções de Navegação
    const navegarParaDetalhes = (produto) => {
        router.navigate({
            pathname: '/detalheMedicamento',
            params: produto
        });
    };

    // const navegarParaAdmin = () => {
    //     // Assume que a rota do ADM é '/CadastroProdutosAdmin'
    //     router.navigate('/CadastroProdutosAdmin'); 
    // };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Postinho Virtual</Text>
                <FontAwesome name="search" size={24} color="#fff" />
            </View>
            <ListaCategorias filtroAtivo={filtroAtivo} setFiltroAtivo={setFiltroAtivo} />
            <ScrollView contentContainerStyle={styles.produtoContainer}>
                <Text style={styles.sectionTitle}>
                    Resultados para: {filtroAtivo === 'Todos' ? 'Todos os Produtos' : filtroAtivo}
                </Text>

                <View style={styles.grid}>
                    {produtosFiltrados.map((produto) => (
                        <ItemCard
                            key={produto.id}
                            produto={produto}
                            navegarParaDetalhes={navegarParaDetalhes}
                        />
                    ))}
                </View>

                {produtosFiltrados.length === 0 && (
                    <Text style={styles.noResultsText}>Nenhum produto encontrado nesta categoria.</Text>
                )}
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c0346',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 10,
        backgroundColor: '#28578e',
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
        bottom: 10,
    },
    adminButton: {
        zIndex: 10,
    },

    produtoContainer: {
        padding: 10,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        paddingHorizontal: 5,
        marginTop: 10,
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },

    noResultsText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 50,
    }
});