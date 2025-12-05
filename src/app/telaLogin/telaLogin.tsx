// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import useTaskContext from '@/components/Context/useTaskContext';
import useTaskContextPS from '@/components/ContextPS/useTaskContextPS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const { pacientes } = useTaskContext();
  const { unidades } = useTaskContextPS();

  function formatarDocumento(text: string) {
    const num = text.replace(/\D/g, '');

    if (num.length <= 11) {
      return num
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    return num
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  async function handleLogin() {
    if (login.trim() === '' || senha.trim() === '') {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    const numericLogin = login.replace(/\D/g, '');

    // LOGIN PACIENTE
    if (numericLogin.length === 11) {
      const pacienteEncontrado = pacientes.find(
        p => (p.cep || '').replace(/\D/g, '') === numericLogin && p.senha === senha
      );

      if (!pacienteEncontrado) {
        Alert.alert("Erro", "CPF ou senha incorretos.");
        setLogin('');
        setSenha('');
        return;
      }

      try {
        await AsyncStorage.setItem('@MyApp:LoggedPatient', JSON.stringify(pacienteEncontrado));
      } catch (e) {}

      router.navigate('/(drawer)/(tabs)/paginaInicialPaciente');
      return;
    }

    // LOGIN UNIDADE
    if (numericLogin.length === 14) {
      const unidadeEncontrada = unidades.find(
        u => (u.cnpj || '').replace(/\D/g, '') === numericLogin && u.senha === senha
      );

      if (!unidadeEncontrada) {
        Alert.alert("Erro", "CNPJ ou senha incorretos.");
        setLogin('');
        setSenha('');
        return;
      }

      try {
        await AsyncStorage.setItem('@MyApp:LoggedUnit', JSON.stringify(unidadeEncontrada));
      } catch (e) {}

      router.navigate('/(drawer)/(tabsPS)/paginaInicialPostoSaude');
      return;
    }

    Alert.alert("Erro", "Digite um CPF ou CNPJ válido.");
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.loginTitle}>LOGIN</Text>

        <Text style={styles.label}>Login:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu CPF ou CNPJ"
          value={login}
          onChangeText={(t) => setLogin(formatarDocumento(t))}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Senha:</Text>

        <View style={styles.senhaRow}>
          <TextInput
            style={[styles.input, { flex: 1, paddingRight: 40 }]}
            placeholder="Digite sua senha"
            secureTextEntry={!mostrarSenha}
            value={senha}
            onChangeText={setSenha}
          />

          {/* Ícone do olhinho */}
          <TouchableOpacity
            onPress={() => setMostrarSenha(!mostrarSenha)}
            style={styles.eyeButton}
          >
           <Ionicons name={mostrarSenha ? "eye-off" : "eye"} size={22} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
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

  senhaRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  eyeButton: {
    position: 'absolute',
    right: 10,
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
});
