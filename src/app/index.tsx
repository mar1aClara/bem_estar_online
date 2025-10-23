import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
        <Image style={styles.logo} source={require('@/assets/logo_bem_estar.png')}/>
      <Text style={styles.title}>Bem Estar Online</Text>
      <Text style={styles.subtitle}>Seu bem-estar ao alcance de um toque</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.navigate('/telaLogin')}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0346',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
    logo: { 
        width: 150, 
        height: 150,
        marginRight: 10,
    },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginTop:20
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#28578e',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
