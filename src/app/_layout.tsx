import { Slot } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout(){
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>BEM ESTAR ONLINE</Text>
            </View>
            <Slot/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#091942",
    },
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


