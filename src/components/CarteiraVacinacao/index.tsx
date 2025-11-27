// src/components/CarteiraVacinacao.tsx

import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BotaoEspecial from '../BotoesEspeciais';

// Interface genérica para o componente
interface GenericVaccineData {
  id: string;
  name: string;
  dueDate: string;
  hora?: string; // Permitindo que hora seja opcional
}

interface CarteiraVacinacaoProps {
  schedule: GenericVaccineData[];
  isEditable: boolean; // Controla a exibição das ferramentas de edição
  onUnitAction?: (vaccineId?: string) => void; // Para Editar
  onDeleteAction?: (vaccineId: string) => void; // NOVO: Para Excluir
}

const CarteiraVacinacao: React.FC<CarteiraVacinacaoProps> = ({
  schedule,
  isEditable,
  onUnitAction,
  onDeleteAction,
}) => {
  
  const handleEditPress = (vaccineId?: string) => {
      onUnitAction?.(vaccineId);
  };
  
  const handleDeletePress = (vaccineId: string) => {
      onDeleteAction?.(vaccineId);
  };

  const renderVaccineCard = ({ item }: { item: GenericVaccineData }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
            <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.date}>Agendamento: {item.dueDate}</Text>
                {item.hora && <Text style={styles.date}>Horário: {item.hora}</Text>}
            </View>
        </View>

        {/* Ações da Unidade de Saúde: Editar e Excluir */}
        {isEditable && (
            <View style={styles.buttonRow}>
                <BotaoEspecial
                texto='Editar'
                color='#28578e'
                onPress={() => handleEditPress(item.id)}
                icon='pencil'
                />
                
                <BotaoEspecial
                texto='Excluir'
                color='#cc3333'
                onPress={() => handleDeletePress(item.id)}
                icon='delete'
                />
            </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.Area}>
      <FlatList
        data={schedule}
        keyExtractor={(item) => item.id}
        renderItem={renderVaccineCard}
        style={styles.listContainer}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma vacina agendada ou disponível.</Text>}
      />
    </View>
  );
};


const styles = StyleSheet.create({
    Area: { 
      flex: 1, 
      backgroundColor: '#0c0346' 
    },
    listContainer: { 
      flex: 1 
    },
    contentContainer: { 
      paddingVertical: 10, 
      paddingHorizontal: 5, 
      paddingBottom: 100, 
    }, 
    card: {
      backgroundColor: '#1c2d6b', 
      padding: 15, 
      marginVertical: 8, 
      marginHorizontal: 10,
      borderRadius: 15,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    icon: {
        marginRight: 10,
    },
    name: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        color: '#fff', // Texto claro
    },
    date: { 
        fontSize: 13, 
        color: '#cfe8ff', // Cor de destaque (verMais)
        marginTop: 4 
    },
    buttonRow: { // Novo estilo para agrupar Editar e Excluir
        flexDirection: 'row',
        marginTop: 15, 
        justifyContent: 'flex-start',
    },
    actionButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8, 
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: 10, // Espaço entre os botões
    },
    
    deleteButton: {
        backgroundColor: '#cc3333', // Cor para Excluir (Vermelho)
    },
    actionButtonText: { 
        color: '#FFFFFF', 
        fontWeight: 'bold', 
        fontSize: 12,
        marginLeft: 5
    },
    emptyText: { 
        textAlign: 'center', 
        marginTop: 50, 
        fontSize: 16, 
        color: '#fff' 
    },
});

export default CarteiraVacinacao;