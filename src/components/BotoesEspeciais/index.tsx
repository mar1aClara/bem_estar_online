import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
    texto: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    color?: string;
    onPress: () => void;
};

export default function BotaoEspecial({ texto, icon, color, onPress }: Props) {
    return (
        <TouchableOpacity 
            style={[styles.button, { backgroundColor: color }]}
            onPress={onPress}
        >
            <MaterialCommunityIcons name={icon} size={16} color="#fff" />
            <Text style={styles.text}>{texto}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginRight: 6,
    },
    text: {
        color: "#fff",
        fontSize: 12,
        marginLeft: 5,
        fontWeight: "bold",
    }
});