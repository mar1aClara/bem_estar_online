import React from 'react';
import { View, StyleSheet } from 'react-native';
import AgendamentoCalendar from '@/components/AgendamentoCalendar/AgendamentoCalendarPS';
import SetaVoltar from '@/components/SetaVoltar'; 

export default function CalendarioPS() {
  return (
    <View style={styles.container}>
       <SetaVoltar/>
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