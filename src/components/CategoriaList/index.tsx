import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const categorias = [
    { nome: 'Todos', icone: 'th-large', filtro: 'Todos' },
    { nome: 'Analgésicos', icone: 'plus-circle', filtro: 'Analgésicos' },
    { nome: 'Vitaminas', icone: 'leaf', filtro: 'Vitaminas' },
    { nome: 'Anti-inflam.', icone: 'medkit', filtro: 'Anti-inflamatórios' },
    { nome: 'Dermatol.', icone: 'tint', filtro: 'Dermatológicos' },
    { nome: 'Fitoterápicos', icone: 'envira', filtro: 'Fitoterápicos' },
];

export default function CategoriaList({ filtroAtivo, setFiltroAtivo }) {
    return (
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
    );
}



const styles = StyleSheet.create({
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
});
