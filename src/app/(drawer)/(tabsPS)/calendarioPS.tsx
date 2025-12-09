import React from 'react';
import { View, StyleSheet } from 'react-native';
import AgendamentoCalendar from '@/components/AgendamentoCalendar/AgendamentoCalendarPS';
import SetaVoltar from '@/components/SetaVoltar'; 
import Header from '@/components/Header';

export default function CalendarioPS() {
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