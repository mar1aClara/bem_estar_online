import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
    texto: string;
    onPress: () => void;
    cor?: string; // 👈 nova prop opcional
};

export default function Button({ texto, onPress, cor }: Props) {
    return (
        <Pressable 
            onPress={onPress} 
            style={[styles.button, { backgroundColor: cor }]}
        >
            <Text style={styles.buttonText}>{texto}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});