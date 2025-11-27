import React from 'react';
import { View, StyleSheet } from 'react-native';
import CarteiraVacinacao from '../../../components/CarteiraVacinacao';
import Vacinas from '../../../json/vacinas.json'; // Importa dados fixos
import Header from '@/components/Header';

const CarteiraPaciente: React.FC = () => {
    return (
        <View style={styles.container}>
            <Header texto='Minha carteira digital'/>
            <CarteiraVacinacao
                schedule={Vacinas}
                isEditable={false} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#0c0346',
        
    },
    header: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    title: { 
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
});
export default CarteiraPaciente;