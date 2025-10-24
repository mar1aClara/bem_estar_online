import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";


export default function Layout(){
    return(
        <Tabs screenOptions={{headerShown:false}}>
            <Tabs.Screen 
                name="paginaInicial" 
                options={{
                    tabBarStyle:{
                        backgroundColor: '#0c0346',
                    }
            }}/>
        </Tabs>
            
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
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

