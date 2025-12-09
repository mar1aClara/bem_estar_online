import Cabecalho from "@/components/Cabecalho";
import { Slot } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TaskProvider } from "@/components/Context/TaskProvider";
import { TaskProviderPS } from "@/components/ContextPS/TaskProviderPS";
import { TaskReceita } from "@/components/ContextReceita/TaskReceita";


export default function Layout() {
    return (
        <TaskProvider>
            <TaskProviderPS>
                <TaskReceita>
                    <SafeAreaView style={styles.container}>
                        <Cabecalho />
                        <Slot />
                    </SafeAreaView>
                </TaskReceita>
            </TaskProviderPS>
        </TaskProvider>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#091942",
    }
});






