import ListaCategorias from "@/components/CategoriaList";
// 'useReceitas' is not exported from TaskProvider; remove the import and use a local fallback instead.
import Header from "@/components/Header";
import ItemCard from "@/components/ProdutoCard";
import dadosMedicamentos from "@/json/medicamentos.js";
import { FontAwesome } from '@expo/vector-icons';
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


const { width } = Dimensions.get('window');

let nextDynamicId = dadosMedicamentos.length > 0
    ? dadosMedicamentos[dadosMedicamentos.length - 1].id + 1
    : 1;


export default function TelaVendas() {
    const [filtroAtivo, setFiltroAtivo] = useState('Todos');
    const [produtosData,] = useState(dadosMedicamentos);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    // Campos do formulário de pedido/receita usados em fazerPedido
    const [nomePaciente, setNomePaciente] = useState('');
    const [cpfPaciente, setCpfPaciente] = useState('');
    const [nomeMedicamento, setNomeMedicamento] = useState('');
    const [quantidade, setQuantidade] = useState<number>(1);
    const [observacoes, setObservacoes] = useState('');

    // Função para mostrar/esconder a barra de pesquisa
    const toggleSearch = () => {
        setSearchVisible(prev => !prev);

        // Limpa a busca e o texto quando a barra é fechada
        if (searchVisible) {
            setSearchText('');
        }
    };

    //Lógica de Filtragem AGORA INCLUI A PESQUISA POR TEXTO
    const produtosFiltrados = produtosData.filter(produto => {

        // 1. Filtro por Categoria
        const passaNoFiltroCategoria = filtroAtivo === 'Todos' || produto.tipo === filtroAtivo;
        if (!passaNoFiltroCategoria) {
            return false;
        }

        // 2. Filtro por Texto de Pesquisa
        if (searchText.trim() === '') {
            return true;
        }

        const nomeProduto = produto.nome.toLowerCase();
        const textoBusca = searchText.toLowerCase().trim();

        return nomeProduto.includes(textoBusca);
    });

    // Funções de Navegação
    const navegarParaDetalhes = (produto: any) => {
        router.navigate({
            pathname: "/medicamentos/DetalheMedicamento",
            params: produto
        });
    };

    const adicionarReceita = (pedido: any) => {
        console.warn('adicionarReceita not available; received pedido:', pedido);
    };

    function fazerPedido() {
        const pedido = {
            id: Date.now().toString(),
            paciente: nomePaciente,
            cpf: cpfPaciente,
            medicamento: nomeMedicamento,
            quantidade,
            observacoes,
            data: new Date().toLocaleDateString("pt-BR"),
        };

        adicionarReceita(pedido);
    }


    return (
        <View>
            <View>
                <Header texto="Postinho Virtual" />

                {/* Botão de Pesquisa*/}
                <TouchableOpacity onPress={toggleSearch} style={styles.searchButton}>
                    <FontAwesome
                        name={searchVisible ? "times" : "search"}
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>

            {/* --- BARRA DE PESQUISA --- */}
            {searchVisible && (
                <View style={styles.searchBarContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Pesquisar medicamento por nome..."
                        placeholderTextColor="#ccc"
                        value={searchText}
                        onChangeText={setSearchText}
                        autoFocus={true} // Foca o input quando abre
                    />
                </View>
            )}

            {/* --- BARRA DE CATEGORIAS --- */}
            <ListaCategorias filtroAtivo={filtroAtivo} setFiltroAtivo={setFiltroAtivo} />

            {/* --- GRID DE PRODUTOS --- */}
            <ScrollView contentContainerStyle={styles.produtoContainer}>
                <Text style={styles.sectionTitle}>
                    {searchText ? `"${searchText}"` : (filtroAtivo === 'Todos' ? 'Todos os Produtos' : filtroAtivo)}
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
                    <Text style={styles.noResultsText}>Nenhum produto encontrado nesta busca.</Text>
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
    // header: {
    //     justifyContent: 'space-between'
    // },

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
    searchButton: {
        zIndex: 10,
        position: 'absolute',
        right: 20,
        top: 15,
    },
    searchBarContainer: {
        backgroundColor: '#28578e',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    searchInput: {
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#0c0346',
    },
    produtoContainer: {
        padding: 10,
    },
    sectionTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        paddingHorizontal: 5,
        marginTop: 10,
        textAlign: 'center',
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