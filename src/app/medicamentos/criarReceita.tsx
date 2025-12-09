import SetaVoltar from "@/components/SetaVoltar";
import { router } from "expo-router";
import React, { useState } from "react";
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import useReceita from "@/components/ContextReceita/useReceita";
import useTaskContext from "@/components/Context/useTaskContext";
import medicosJson from "@/json/medicos.json"; 

type Medico = {
    nome: string;
    especialidade: string;
    crm: string;
    telefone: string;
    email: string;
    endereco: {
        logradouro: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
    };
    horarios_disponiveis: string[];
};

export default function CriarReceita() {

    const { addReceita } = useReceita();
    const { pacientes } = useTaskContext();

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState(""); 
    const [crm, setCrm] = useState("");
    const [nomeMedico, setNomeMedico] = useState("");
    const [medicamento, setMedicamento] = useState("");
    const [observacao, setObservacao] = useState("");

    function verificarCPF() {
        if (!cpf) {
            Alert.alert("Erro", "Digite um CPF antes de verificar.");
            return;
        }

        const paciente = pacientes.find(p => p.cep === cpf);

        if (!paciente) {
            Alert.alert("CPF não encontrado.");
            return;
        }

        setNome(paciente.nome);
    }

    function verificarCRM() {
        if (!crm) {
            Alert.alert("Erro", "Digite um CRM antes de verificar.");
            return;
        }

        const medico = (medicosJson as Record<string, Medico | undefined>)[crm];

        if (!medico) {
            Alert.alert("CRM não encontrado.");
            return;
        }

        setNomeMedico(medico.nome);
    }

    function enviarReceita() {
        if (!nome || !cpf || !crm || !nomeMedico || !medicamento || !observacao) {
            Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
            return;
        }

        addReceita(
            cpf,
            nome,
            crm,
            nomeMedico,
            medicamento,
            observacao
        );

        setNome("");
        setCpf("");
        setCrm("");
        setNomeMedico("");
        setMedicamento("");
        setObservacao("");

        Alert.alert("Sucesso", "Receita enviada!");
        router.back();
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <SetaVoltar color="#fff" />
                <Text style={styles.title}>Criar Receita</Text>
            </View>

            {/* CPF + Botão Verificar */}
            <View style={styles.cpfRow}>
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="CPF"
                    onChangeText={setCpf}
                    value={cpf}
                />

                <TouchableOpacity style={styles.verifyButton} onPress={verificarCPF}>
                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>✔</Text>
                </TouchableOpacity>
            </View>

            {/* CRM + Verificar */}
            <View style={styles.cpfRow}>
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="CRM"
                    onChangeText={setCrm}
                    value={crm}
                />

                <TouchableOpacity style={styles.verifyButton} onPress={verificarCRM}>
                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>✔</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Nome do Paciente"
                onChangeText={setNome}
                value={nome}
            />

            <TextInput
                style={styles.input}
                placeholder="Nome do Médico"
                onChangeText={setNomeMedico}
                value={nomeMedico}
            />

            <TextInput
                style={styles.input}
                placeholder="Medicamento"
                onChangeText={setMedicamento}
                value={medicamento}
            />

            <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Observações"
                multiline
                onChangeText={setObservacao}
                value={observacao}
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
        backgroundColor: "#0c0346",
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },

    title: {
        fontSize: 22,
        color: "#fff",
        marginLeft: 80,
        fontWeight: "bold",
    },

    cpfRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    verifyButton: {
        backgroundColor: "#28578e",
        padding: 14,
        borderRadius: 10,
        marginLeft: 10,
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
        textAlign: "center",
    },
});
