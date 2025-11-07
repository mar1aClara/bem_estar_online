import Cabecalho from "@/components/Cabecalho";
import { Slot } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout(){
    return(
        <SafeAreaView style={styles.container}>
            <Cabecalho/>
            <Slot/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#091942",
    }
})


