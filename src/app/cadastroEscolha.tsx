import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CadastroEscolha(){
    return(
        <View style={styles.container}>

            <View style={styles.box}>
                <Text style={styles.loginTitle}>TIPO DE USUÁRIO</Text>

                <Text style={styles.label}>Selecione o tipo de usuário que deseja cadastrar:</Text>
                

                <TouchableOpacity style={styles.button} onPress={()=> router.navigate('/cadastroPaciente')}>
                    <Text style={styles.buttonText}>Paciente</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={()=> router.navigate('/cadastroUnidadeDeSaude')}>
                    <Text style={styles.buttonText}>Unidade de Saúde</Text>
                </TouchableOpacity>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#0c0346',
        alignItems: 'center',
        paddingTop:60
    },
    box: {
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
        fontWeight: '400',
        
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
   }
})
