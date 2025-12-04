import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import ItemCard from "@/components/ProdutoCard";
import dadosMedicamentos from "@/json/medicamentos.js";
import Header from "@/components/Header";

const { width } = Dimensions.get('window');

export default function TelaVendas() {
    const [filtroAtivo, setFiltroAtivo] = useState("Todos");
    const [produtosData] = useState(dadosMedicamentos);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState("");

    const toggleSearch = () => {
        setSearchVisible(prev => !prev);
        if (searchVisible) setSearchText("");
    };

    const produtosFiltrados = produtosData.filter((produto) => {
        const passaCategoria = filtroAtivo === "Todos" || produto.tipo === filtroAtivo;
        if (!passaCategoria) return false;

        if (searchText.trim() === "") return true;

        return produto.nome.toLowerCase().includes(searchText.toLowerCase());
    });

    const navegarParaDetalhes = (produto: any) => {
        router.navigate({
            pathname: "/medicamentos/detalheMedicamento",
            params: produto
        });
    };

    return (
        <View style={styles.container}>
            <Header texto="Postinho Virtual" />

            <TouchableOpacity onPress={toggleSearch} style={styles.searchButton}>
                <FontAwesome
                    name={searchVisible ? "times" : "search"}
                    size={24}
                    color="#fff"
                />
            </TouchableOpacity>

            {searchVisible && (
                <View style={styles.searchBarContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Pesquisar medicamento por nome..."
                        placeholderTextColor="#ccc"
                        value={searchText}
                        onChangeText={setSearchText}
                        autoFocus
                    />
                </View>
            )}

            <View style={styles.categoriaContainer}>

                <TouchableOpacity
                    style={[styles.categoriaButton, filtroAtivo === "Todos" && styles.categoriaAtiva]}
                    onPress={() => setFiltroAtivo("Todos")}
                >
                    <Text style={styles.categoriaTexto}>Todos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.categoriaButton, filtroAtivo === "criarReceita" && styles.categoriaAtiva]}
                    onPress={() => router.navigate("/medicamentos/criarReceita")}
                >
                    <Text style={styles.categoriaTexto}>Criar Receita</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.categoriaButton, filtroAtivo === "Pedidos" && styles.categoriaAtiva]}
                    onPress={() => router.navigate("/medicamentos/pedidosPacientes")}
                >
                    <Text style={styles.categoriaTexto}>Pedidos</Text>
                </TouchableOpacity>

            </View>

            <ScrollView contentContainerStyle={styles.produtoContainer}>
                <Text style={styles.sectionTitle}>
                    {searchText ? `"${searchText}"` : filtroAtivo}
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
                    <Text style={styles.noResultsText}>Nenhum produto encontrado.</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0c0346",
    },

    searchButton: {
        position: "absolute",
        right: 20,
        top: 15,
        zIndex: 20,
    },

    searchBarContainer: {
        backgroundColor: "#28578e",
        paddingHorizontal: 20,
        paddingBottom: 10,
    },

    searchInput: {
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        color: "#0c0346",
    },

    produtoContainer: {
        padding: 10,
    },

    sectionTitle: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#fff",
        marginVertical: 10,
        textAlign: "center",
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 5,
    },

    noResultsText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        marginTop: 30,
    },

    categoriaContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 15,
        backgroundColor: "#091942",
    },

    categoriaButton: {
        backgroundColor: "#28578e",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 40,
        width: "30%",
        alignItems: "center",
    },

    categoriaAtiva: {
        backgroundColor: "#1b3d63",
        borderWidth: 2,
        borderColor: "#fff",
    },

    categoriaTexto: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
});


