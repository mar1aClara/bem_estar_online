import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type props ={
    onPress: () => void;
}

export default function FloatingButton({onPress} :props) {
    return (
        <TouchableOpacity style={styles.fab} onPress={onPress}>
            <MaterialCommunityIcons name= "plus" size={28} color="#fff" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30, // Posição direita (30px da borda)
        bottom: 30, // Posição inferior (30px da borda)
        backgroundColor: '#28578e', // Cor do editButton
        borderRadius: 30, // Torna-o circular (metade da largura/altura)
        elevation: 8, // Adiciona sombra para destaque no Android
        zIndex: 10, // Garante que ele fique acima de outros elementos
    },
});
