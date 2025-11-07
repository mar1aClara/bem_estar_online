import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Rodape(){
    return(
        <View style={styles.container}>  
            <Text style={styles.text}>© Bem-Estar Online 2025</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
    container: {
        padding: 10,
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 14,
        opacity: 0.6,
    },
});