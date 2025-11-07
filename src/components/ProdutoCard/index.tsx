// ItemCard.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 3;

export default function ProdutoCard({ produto, navegarParaDetalhes }) {
    return (
        <TouchableOpacity 
            key={produto.id} 
            style={styles.card}
            onPress={() => navegarParaDetalhes(produto)}
        >
            <View style={styles.imagePlaceholder}>
                <Image style={styles.imagem} source={produto.img} />
            </View>

            <Text style={styles.cardTitle} numberOfLines={2}>
                {produto.nome}
            </Text>

            <Text style={styles.cardTipo}>{produto.tipo}</Text>
            
            <Text style={styles.cardPrice}>
                {produto.preco}
            </Text>
            
            <View style={styles.cardActions}>
                <FontAwesome name="cart-plus" size={16} color="#28578e" />
                <FontAwesome name="info-circle" size={16} color="#678ab2" />
            </View>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
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

    imagem:{
        width: 70,
        height: 70,
        marginBottom: 10,
        objectFit: 'fill'
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
});