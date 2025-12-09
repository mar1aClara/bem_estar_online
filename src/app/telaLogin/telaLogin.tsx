import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import useTaskContext from '@/components/Context/useTaskContext';
import useTaskContextPS from '@/components/ContextPS/useTaskContextPS';
 
export default function LoginScreen() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const { pacientes, setCurrentUserId } = useTaskContext();
  const { unidades } = useTaskContextPS();



 
 function handleLogin() {
  if (login.trim() === '' || senha.trim() === '') {
    Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
    return;
  }

  const numericLogin = login.replace(/\D/g, '');

  // CPF = 11 dígitos → Paciente
  if (numericLogin.length === 11) {
    const pacienteEncontrado = pacientes.find(
      p =>
        p.cep.replace(/\D/g, '') === numericLogin &&
        p.senha === senha
    );

    if (!pacienteEncontrado) {
      Alert.alert("Erro", "CPF ou senha incorretos.");
      setLogin('');
      setSenha('');
      return;
    }

    // Salva o que está logado
    setCurrentUserId(pacienteEncontrado.id);

    // Login OK → Paciente
    router.navigate('/(drawer)/(tabs)/paginaInicialPaciente');
    return;
  }

  // CNPJ = 14 dígitos → Unidade de Saúde
  if (numericLogin.length === 14) {
    const unidadeEncontrada = unidades.find(
      u =>
        u.cnpj.replace(/\D/g, '') === numericLogin &&
        u.senha === senha
    );

    if (!unidadeEncontrada) {
      Alert.alert("Erro", "CNPJ ou senha incorretos.");
      setLogin('');
      setSenha('');
      return;
    }

    setCurrentUserId(unidadeEncontrada.id);
    
    // Login OK → Unidade
    router.navigate('/(drawer)/(tabsPS)/paginaInicialPostoSaude');
    return;
  }

  Alert.alert("Erro", "Digite um CPF ou CNPJ válido.");
}

 
  const isFormValid = login.trim() !== '' && senha.trim() !== '';
 
  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.loginTitle}>LOGIN</Text>
 
        <Text style={styles.label}>Login:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu CPF ou CNPJ"
          value={login}
          onChangeText={setLogin}
          keyboardType="numeric"
        />
 
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
 
        <TouchableOpacity
          style={[
            styles.button,
            // { backgroundColor: isFormValid ? '#007bff' : '#999' },
          ]}
          onPress={handleLogin}
        //   disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
 
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => router.navigate('/cadastro/cadastroEscolha')}>
            <Text style={styles.link}>Cadastre-se</Text>
          </TouchableOpacity>
 
          <TouchableOpacity onPress={() => router.navigate('/senha/esqueciSenha')}>
            <Text style={styles.link}>Esqueci a senha.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
 
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c0346',
        alignItems: 'center',
        paddingTop: 60
    },
    loginBox: {
        backgroundColor: '#678ab2',
        borderRadius: 10,
        padding: 20,
        width: '85%',
        marginTop: 80,
    },
    loginTitle: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
    },
    button: {
        backgroundColor: '#28578e',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    link: {
        color: '#fff',
        textDecorationLine: 'underline',
    },
})
 