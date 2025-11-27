import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function Input({ ...props }) {
    return <TextInput style={styles.input} placeholderTextColor="#000" {...props} />;
}

const styles = StyleSheet.create({
    input: {
        height: 45,
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 8,
        color: "#0c0346",
    },
});
