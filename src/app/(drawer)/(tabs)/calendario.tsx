import React from 'react';
import { View, StyleSheet } from 'react-native';
import AgendamentoCalendar from '@/components/AgendamentoCalendar/AgendamentoCalendar';
import SetaVoltar from '@/components/SetaVoltar'; 
import Header from '@/components/Header';

export default function Calendario() {
  return (
    <View style={styles.container}>
      <Header texto='Calendário'/>
      <AgendamentoCalendar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});