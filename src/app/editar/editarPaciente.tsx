import useTaskContext from '@/components/Context/useTaskContext';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditarPerfil() {

    const { pacientes, updateProfile, currentUserId } = useTaskContext();
    const paciente = pacientes.find(p => p.id === currentUserId);

    if (!paciente) {
        return (
            <View style={styles.container}>
                <Text style={{ color: "#fff" }}>Carregando...</Text>
            </View>
        );
    }

    const [nome, setNome] = useState(paciente.nome);
    const [foto, setFoto] = useState<string | null>(paciente.foto);
    const [email, setEmail] = useState(paciente.email);
    const [telefone, setTelefone] = useState(paciente.telefone);

    async function escolherFoto() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setFoto(result.assets[0].uri);
        }
    }
  

    return (

        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Editar Perfil</Text>
            </View>

            <View style={styles.profileCard}>

                <View style={styles.profileCircle}>
                    {foto ? (
                        <Image
                            source={{ uri: foto }}
                            style={{ width: 90, height: 90, borderRadius: 100 }}
                        />
                    ) : (
                        <MaterialCommunityIcons name="account" size={55} color="#fff" />
                    )}
                </View>

                <TouchableOpacity style={styles.alterarButton} onPress={escolherFoto}>
                    <Text style={styles.alterarLabel}>Alterar imagem</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.form}>

                <Text style={styles.label}>Nome</Text>
                <TextInput
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Digite seu nome"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                />

                <Text style={styles.label}>E-mail</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Digite seu e-mail"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Telefone</Text>
                <TextInput
                    value={telefone}
                    onChangeText={setTelefone}
                    placeholder="(00) 00000-0000"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    keyboardType="phone-pad"
                />

                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => {
                        updateProfile(paciente.id, { nome, foto, email, telefone });
                        router.navigate("/(drawer)/(tabs)/perfil");
                    }}
                >
                    <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    // scrollContainer: {
    //     alignItems: "center",
    //     paddingBottom: 100,
    // },
    container: {
        flex: 1,
        backgroundColor: "#0c0346",
        alignItems: "center",
        paddingTop: 60,
        gap: 20,
    },
    header: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },

    profileCard: {
        backgroundColor: "#1c2d6b",
        borderRadius: 15,
        width: "90%",
        alignItems: "center",
        padding: 20,
        marginTop: 40,
        position: "relative",
    },
    alterarLabel: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 10,
    },
    profileCircle: {
        borderRadius: 100,
        width: 90,
        height: 90,
        justifyContent: "center",
        alignItems: "center",
    },
    alterarButton: {
        backgroundColor: "#28578e",
        paddingBottom: 10,
        paddingHorizontal: 15,
        marginTop: 10,
        borderRadius: 8,

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