import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditarPerfil() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Perfil</Text>
            <View style={styles.profileCard}>
                <View style={styles.profileCircle}>
                    <MaterialCommunityIcons name="account" size={55} color="#fff" />
                </View>
                <TouchableOpacity style={styles.alterarButton}>
                    <Text style={styles.alterarLabel}>Alterar imagem</Text>
                </TouchableOpacity>
                <Text style={styles.name}>Fulaninho da Silva</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    placeholder="Digite seu nome"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                />

                <Text style={styles.label}>E-mail</Text>
                <TextInput
                    placeholder="Digite seu e-mail"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Telefone</Text>
                <TextInput
                    placeholder="(00) 00000-0000"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    keyboardType="phone-pad"
                />

                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => router.back()} // volta pra tela anterior
                >
                    <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0c0346",
        alignItems: "center",
        paddingTop: 80,
    },
    title: {
        fontSize: 22,
        color: "#fff",
        fontWeight: "bold",
        marginBottom: 30,
    },
    profileCard: {
        backgroundColor: "#1c2d6b",
        borderRadius: 15,
        width: "90%",
        alignItems: "center",
        padding: 20,
        marginTop: 10,
        marginBottom: 20,
        position: "relative",
    },
    alterarLabel: {
        color: "#3f638e",
        fontWeight: "bold",
        fontSize: 12,
        marginTop: 8,
    },
    profileCircle: {
        backgroundColor: "#3f638e",
        borderRadius: 100,
        width: 90,
        height: 90,
        justifyContent: "center",
        alignItems: "center",
    },
    alterarButton: {

    },
    name: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 5,
    },
    form: {
        width: "90%",
        backgroundColor: "#1c2d6b",
        borderRadius: 15,
        padding: 20,
    },
    label: {
        color: "#fff",
        fontWeight: "600",
        marginBottom: 5,
        fontSize: 14,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 15,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: "#28578e",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});