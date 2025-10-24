import { router } from "expo-router";
import React, { useState } from "react"; 
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 

const { width } = Dimensions.get('window');

const categorias = [
    { nome: 'Todos', icone: 'th-large', filtro: 'Todos' },
    { nome: 'Analgésicos', icone: 'plus-circle', filtro: 'Analgésicos' },
    { nome: 'Vitaminas', icone: 'leaf', filtro: 'Vitaminas' },
    { nome: 'Anti-inflam.', icone: 'medkit', filtro: 'Anti-inflamatórios' },
    { nome: 'Dermatol.', icone: 'tint', filtro: 'Dermatológicos' },
    { nome: 'Fitoterápicos', icone: 'envira', filtro: 'Fitoterápicos' },
];

const produtosData = [
    { id: 1, nome: 'Paracetamol 500mg (20 comp.)', 
        preco: 'R$ 8,90', 
        img: require('@/assets/paracetamol.jpg'), 
        tipo: 'Analgésicos' 
    },
    { id: 2, 
        nome: 'Vitamina C 1g (30 comp.)', 
        preco: 'R$ 29,90', 
        img: require('@/assents/infiel.jpg'), 
        tipo: 'Vitaminas' 
    },
    { id: 3, 
        nome: 'Ibuprofeno 400mg (10 cáp.)', 
        preco: 'R$ 15,45', 
        img: require('@/assents/infiel.jpg'), 
        tipo: 'Anti-inflamatórios' 
    },
    { id: 4, 
        nome: 'Pomada Cicatrizante 50g', 
        preco: 'R$ 34,90', 
        img: require('@/assents/infiel.jpg'), 
        tipo: 'Dermatológicos' 
    },
    { id: 5, 
        nome: 'Chá Calmante Natural (20 sachês)', 
        preco: 'R$ 19,90', 
        img: 'cha', 
        tipo: 'Fitoterápicos'
    },
    { id: 6, 
        nome: 'Dorflex (10 comp.)', 
        preco: 'R$ 12,99', 
        img: 'dorflex', 
        tipo: 'Analgésicos' 
    },
    { id: 7, 
        nome: 'Polivitamínico AZ (60 comp.)', 
        preco: 'R$ 49,99', 
        img: 'polivitaminico', 
        tipo: 'Vitaminas' 
    },
    { id: 8, 
        nome: 'Creme Hidratante Pós-sol', 
        preco: 'R$ 22,50', 
        img: 'creme', 
        tipo: 'Dermatológicos' 
    },
    { id: 9, 
        nome: 'Aspirina 100mg (10 comp.)', 
        preco: 'R$ 9,90', 
        img: 'aspirina',
        tipo: 'Analgésicos' 
    },
    { id: 10, 
        nome: 'Melatonina 3mg (30 cáp.)', 
        preco: 'R$ 55,00', 
        img: 'melatonina', 
        tipo: 'Fitoterápicos' 
    },
    { id: 11, 
        nome: 'Amoxicilina 500mg (21 comp.)', 
        preco: 'R$ 38,00', 
        img: 'amoxicilina', 
        tipo: 'Anti-inflamatórios' 
    },
    { id: 12, nome: 'Probiótico Ativo (10 cáp.)', preco: 'R$ 68,00', img: 'probiotico', tipo: 'Vitaminas' },
];


export default function TelaVendas() {
    const [filtroAtivo, setFiltroAtivo] = useState('Todos');
    const produtosFiltrados = produtosData.filter(produto => {
        if (filtroAtivo === 'Todos') {
            return true;
        }
        return produto.tipo === filtroAtivo;
    });

    const navegarParaDetalhes = (produto) => {
        router.navigate({
            pathname: '/DetalheMedicamento', 
            params: produto 
        });
    };
    
    const getSimulatedImage = (imgName) => {
        const iconMap = {
            paracetamol: 'pills', vitamina_c: 'leaf', ibuprofeno: 'medkit',
            pomada: 'tint', cha: 'coffee', dorflex: 'flash',
            polivitaminico: 'flask', creme: 'umbrella', aspirina: 'bug',
            melatonina: 'moon-o', amoxicilina: 'fire', probiotico: 'spoon',
        };
        return <FontAwesome name={iconMap[imgName] || 'cube'} size={40} color="#0c0346" />;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Drogaria **Bem-Estar**</Text>
                <FontAwesome name="search" size={24} color="#fff" />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navbarScroll}>
                {categorias.map((cat, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={[
                            styles.navItem, 
                            cat.filtro === filtroAtivo && styles.navItemActive
                        ]}
                        onPress={() => setFiltroAtivo(cat.filtro)}
                    >
                        <FontAwesome name={cat.icone} size={20} color="#fff" />
                        <Text style={styles.navText}>{cat.nome}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView contentContainerStyle={styles.produtoContainer}>
                
                <Text style={styles.sectionTitle}>
                    💊 Resultados para: **{filtroAtivo === 'Todos' ? 'Todos os Produtos' : filtroAtivo}**
                </Text>
                
                <View style={styles.grid}>
                    {produtosFiltrados.map((produto) => (
                        <TouchableOpacity 
                            key={produto.id} 
                            style={styles.card}
                            onPress={() => navegarParaDetalhes(produto)}
                        >
                            <View style={styles.imagePlaceholder}>
                                {getSimulatedImage(produto.img)}
                            </View>

                            <Text style={styles.cardTitle} numberOfLines={2}>
                                {produto.nome}
                            </Text>
                            
                            <Text style={styles.cardTipo}>{produto.tipo}</Text>

                            <Text style={styles.cardPrice}>
                                **{produto.preco}**
                            </Text>
                            
                            <View style={styles.cardActions}>
                                <FontAwesome name="cart-plus" size={16} color="#28578e" />
                                <FontAwesome name="info-circle" size={16} color="#678ab2" />
                            </View>
                        </TouchableOpacity>
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
        paddingTop: 50,
        paddingBottom: 10,
        backgroundColor: '#28578e',
    },

    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },

    navbarScroll: {
        paddingVertical: 10,
        backgroundColor: '#678ab2',
    },

    navItem: {
        backgroundColor: '#28578e',
        borderRadius: 8,
        padding: 8,
        marginHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100, 
        height: 60,
    },

    navItemActive: {
        backgroundColor: '#0c0346',
        borderWidth: 2,
        borderColor: '#fff',
    },

    navText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '600',
        marginTop: 4,
        textAlign: 'center',
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

    card: {
        width: (width - 40) / 3, 
        backgroundColor: '#fff', 
        borderRadius: 10,
        padding: 5,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        alignItems: 'center',
    },

    imagePlaceholder: {
        width: '100%',
        height: 80,
        backgroundColor: '#f0f4f8',
        borderRadius: 8,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center',
        height: 30,
    },

    cardTipo: {
        fontSize: 9,
        color: '#678ab2',
        marginBottom: 4,
    },

    cardPrice: {
        fontSize: 13,
        fontWeight: '900',
        color: '#0c0346',
        marginTop: 5,
    },
    
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginTop: 5,
        paddingTop: 5,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    
    noResultsText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 50,
    }
});