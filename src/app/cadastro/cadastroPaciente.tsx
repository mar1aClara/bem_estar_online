import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import useTaskContext from "@/components/Context/useTaskContext";
 
export default function TelaLogin() {

    const { addPaciente } = useTaskContext();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const submitPaciente = () => {
        if (!nome || !email || !cep || !cidade || !telefone || !senha || !confirmarSenha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        addPaciente(nome, email, cep, cidade, telefone, senha);
        setNome('');
        setEmail('');
        setCep('');
        setCidade('');
        setTelefone('');
        setSenha('');
        setConfirmarSenha('');
        router.navigate('/telaLogin/telaLogin');
    }

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
                            placeholder='Digite seu CPF'
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            maxLength={11}
                            value={cep}
                            onChangeText={setCep}
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
 
                    <View style={styles.inputColumn}>
                        <Text style={styles.label}>Telefone:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Digite seu telefone'
                            placeholderTextColor="#999"
                            keyboardType="phone-pad"
                            value={telefone}
                            onChangeText={setTelefone}
                        />
 
                    </View>
                    <View style={styles.inputColumn}>
                        <Text style={styles.label}>Senha:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Digite sua senha'
                            placeholderTextColor="#999"
                            secureTextEntry={true}
                            value={senha}
                            onChangeText={setSenha}
                        />
                    </View>
 
                     <View style={styles.inputColumnFull}>
                        <Text style={styles.label}>Confirme a Senha:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Confirme sua senha'
                            placeholderTextColor="#999"
                            secureTextEntry={true}
                            value={confirmarSenha}
                            onChangeText={setConfirmarSenha}
                        />
                    </View>
 
                </View>
 
                <TouchableOpacity
                    style={styles.button}
                    onPress={submitPaciente}
                >
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
        borderRadius: 15,
        padding: 30,
        width: '90%',
        marginTop: 40,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5.46,
        elevation: 9,
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
        marginTop: 5,
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
    button: {
        backgroundColor: '#28578e',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 25,
        width: '80%',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowRadius: 3.84,
        elevation: 5,
    },
   
    buttonText: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 20,
    },
 
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        paddingHorizontal: 5,
    },
 
    link: {
        color: '#e0e8ff',
        textDecorationLine: 'underline',
        fontSize: 13,
        fontWeight: '600',
    },
});
 