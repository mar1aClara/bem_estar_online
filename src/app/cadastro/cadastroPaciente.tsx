import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useTaskContext from "@/components/Context/useTaskContext";

export default function TelaLogin() {

    const { addPaciente } = useTaskContext();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [cidade, setCidade] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

    // 👉 MÁSCARA CPF
    const handleCpfMask = (value: string) => {
        const numbers = value.replace(/\D/g, "").slice(0, 11);
        let masked = numbers;

        if (numbers.length > 3) masked = numbers.slice(0, 3) + "." + numbers.slice(3);
        if (numbers.length > 6) masked = masked.slice(0, 7) + "." + masked.slice(7);
        if (numbers.length > 9) masked = masked.slice(0, 11) + "-" + masked.slice(11);

        setCpf(masked);
    };

    // 👉 MÁSCARA TELEFONE (00) 00000-0000
    const handleTelefoneMask = (value: string) => {
        const numbers = value.replace(/\D/g, "").slice(0, 11);

        let masked = numbers;
        if (numbers.length > 2) masked = "(" + numbers.slice(0, 2) + ") " + numbers.slice(2);
        if (numbers.length > 7) masked = masked.slice(0, 10) + "-" + masked.slice(10);

        setTelefone(masked);
    };

    const submitPaciente = () => {
        if (!nome || !email || !cpf || !cidade || !telefone || !senha || !confirmarSenha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const emailValido = email.endsWith("@gmail.com") || email.endsWith("@hotmail.com");
        if (!emailValido) {
            alert("O e-mail precisa ser @gmail.com ou @hotmail.com");
            return;
        }

        if (cpf.replace(/\D/g, "").length !== 11) {
            alert("Digite um CPF válido.");
            return;
        }

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        // Enviar contexto
        addPaciente(nome, email, cpf, cidade, telefone, senha);

        setNome('');
        setEmail('');
        setCpf('');
        setCidade('');
        setTelefone('');
        setSenha('');
        setConfirmarSenha('');

        router.navigate('/telaLogin/telaLogin');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={{ backgroundColor: '#0c0346' }}>
            <View style={styles.loginBox}>
                <Text style={styles.loginTitle}>CADASTRO PACIENTE</Text>

                <View style={styles.inputGrid}>

                    <View style={styles.inputColumn}>
                        <Text style={styles.label}>Nome Completo:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Digite seu nome completo'
                            placeholderTextColor="#999"
                            value={nome}
                            onChangeText={setNome}
                        />
                    </View>

                    <View style={styles.inputColumn}>
                        <Text style={styles.label}>E-mail:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Digite seu e-mail'
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.inputColumn}>
                        <Text style={styles.label}>CPF:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='000.000.000-00'
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            value={cpf}
                            onChangeText={handleCpfMask}
                        />
                    </View>

                    <View style={styles.inputColumn}>
                        <Text style={styles.label}>Cidade:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Digite sua cidade'
                            placeholderTextColor="#999"
                            value={cidade}
                            onChangeText={setCidade}
                        />
                    </View>

                    {/* TELEFONE IGUAL SENHA */}
                    <View style={styles.inputColumnFull}>
                        <Text style={styles.label}>Telefone:</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.inputNoBorder, { flex: 1, fontSize: 16 }]}
                                placeholder='(00) 00000-0000'
                                placeholderTextColor="#999"
                                keyboardType="phone-pad"
                                value={telefone}
                                onChangeText={handleTelefoneMask}
                            />
                        </View>
                    </View>

                    <View style={styles.inputColumnFull}>
                        <Text style={styles.label}>Senha:</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.inputNoBorder, { flex: 1 }]}
                                placeholder='Digite sua senha'
                                placeholderTextColor="#999"
                                secureTextEntry={!mostrarSenha}
                                value={senha}
                                onChangeText={setSenha}
                            />
                            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                                <Ionicons name={mostrarSenha ? "eye-off" : "eye"} size={22} color="#333" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputColumnFull}>
                        <Text style={styles.label}>Confirme a Senha:</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.inputNoBorder, { flex: 1 }]}
                                placeholder='Confirme sua senha'
                                placeholderTextColor="#999"
                                secureTextEntry={!mostrarConfirmarSenha}
                                value={confirmarSenha}
                                onChangeText={setConfirmarSenha}
                            />
                            <TouchableOpacity onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}>
                                <Ionicons name={mostrarConfirmarSenha ? "eye-off" : "eye"} size={22} color="#333" />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                <TouchableOpacity style={styles.button} onPress={submitPaciente}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#0c0346',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 40,
    },
    loginBox: {
        backgroundColor: '#678ab2',
        borderRadius: 20,
        padding: 30,
        width: '90%',
        marginTop: 40,
    },
    loginTitle: {
        fontSize: 24,
        color: '#fff',
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 30,
        borderBottomWidth: 2,
        borderBottomColor: '#28578e',
        paddingBottom: 5,
    },
    inputGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    inputColumn: {
        width: '48%',
        marginBottom: 10,
    },
    inputColumnFull: {
        width: '100%',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    input: {
        backgroundColor: '#f0f4f8',
        borderRadius: 8,
        padding: 12,
        marginTop: 4,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#28578e',
    },
    inputNoBorder: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        paddingVertical: 10,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f4f8",
        borderWidth: 1,
        borderColor: "#28578e",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 4,
    },
    button: {
        backgroundColor: '#28578e',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 25,
        width: '80%',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 20,
    },
});

