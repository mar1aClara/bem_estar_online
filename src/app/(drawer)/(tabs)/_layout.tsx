import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";


export default function LayoutTabs() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: {
                backgroundColor: '#0c0346',
                borderTopColor: 'transparent',
                shadowColor: 'transparent',
            }
        }}>

            <Tabs.Screen 
                name="paginaInicialPaciente" 
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" size={24} color={color} />
                    ),
                    tabBarLabel: "Início",
                }}
            />

            <Tabs.Screen
                name="artigos"
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="card-text" size={24} color={color} />
                    ),
                    tabBarLabel: "Artigos",
                }}
            />

            <Tabs.Screen
                name="chat"
                options={{
                    tabBarItemStyle: { display: 'none' },
                }}
            />

            <Tabs.Screen
                name="calendario"
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="calendar" size={24} color={color} />
                    ),
                    tabBarLabel: "Calendário",
                }}
            />

            <Tabs.Screen
                name="perfil"
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-circle-outline" size={24} color={color} />
                    ),
                    tabBarLabel: "Perfil",
                }}
            />

        </Tabs>

    )
}

// const styles = StyleSheet.create({
//     container:{
//         flex: 1
//     },
//     header:{
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: "#678ab2",
//         width: '100%',
//         padding: 15,
//     },
//     headerText: {
//         color: '#fff',
//         fontSize: 20,
//         fontWeight: 'bold',
//     }
// })

