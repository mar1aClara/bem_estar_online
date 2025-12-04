import Cabecalho from "@/components/Cabecalho";
import { Slot } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TaskProvider } from "@/components/Context/TaskProvider";
import { TaskProviderPS } from "@/components/ContextPS/TaskProviderPS";


export default function Layout() {
    return (
        <TaskProvider>
            <TaskProviderPS>
                <SafeAreaView style={styles.container}>
                    <Cabecalho />
                    <Slot />
                </SafeAreaView>
            </TaskProviderPS>
        </TaskProvider>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#091942",
    }
});






