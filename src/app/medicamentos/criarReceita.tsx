import { useReceitas } from "@/components/Context/TaskProvider";
import SetaVoltar from "@/components/SetaVoltar";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CriarReceita() {

    const { adicionarReceita } = useReceitas(); // CORRETO

    const [paciente, setPaciente] = useState("");
    const [cpf, setCpf] = useState("");
    const [medicamento, setMedicamento] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [observacoes, setObservacoes] = useState("");

    function enviarReceita() {
        if (!paciente || !cpf || !medicamento || !quantidade) {
            Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
            return;
        }

        // CRIA OBJETO RECEITA
        const novaReceita = {
            id: Date.now().toString(),
            paciente,
            cpf,
            medicamento,
            quantidade: Number(quantidade),
            observacoes,
            data: new Date().toLocaleDateString("pt-BR")
        };

        adicionarReceita(novaReceita); // FUNÇÃO CORRETA

        Alert.alert("Sucesso", "Receita enviada!");
        router.back();
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <SetaVoltar color="#fff" />
                <Text style={styles.title}>Criar Receita</Text>
            </View>

            <TextInput style={styles.input} placeholder="Paciente" onChangeText={setPaciente} />
            <TextInput style={styles.input} placeholder="CPF" onChangeText={setCpf} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Medicamento" onChangeText={setMedicamento} />

            <TextInput
                style={styles.input}
                placeholder="Quantidade"
                keyboardType="numeric"
                onChangeText={setQuantidade}
            />

            <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Observações"
                multiline
                onChangeText={setObservacoes}
            />

            <TouchableOpacity style={styles.button} onPress={enviarReceita}>
                <Text style={styles.buttonText}>Enviar Receita</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#0c0346"
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
    },

    title: {
        fontSize: 22,
        color: "#fff",
        marginLeft: 80,
        fontWeight: "bold",
    },

    input: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },

    button: {
        backgroundColor: "#28578e",
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
    },
});
