import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Cabecalho() {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>BEM ESTAR ONLINE</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#678ab2", 
        width: '100%',
        padding: 15,
    },
    headerText: { 
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    }
})