// AgendamentoCalendar.js
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@MyApp:BookedAppointments';
const LOGGED_PATIENT_KEY = '@MyApp:LoggedPatient';

type AppointmentDetail = {
    time: string;
    patientName: string;
    patientPhone: string;
    patientCPF: string;
    patientConsult: string;
    date: string;
    isoTime: string;
};
type Appointments = {
    [date: string]: AppointmentDetail[];
};

// remove agendamentos expirados
const filterExpiredAppointments = (appointments: Appointments): Appointments => {
    const now = new Date().getTime();
    const gracePeriodInMs = 60 * 60 * 1000;
    const filteredAppointments: Appointments = {};

    for (const date in appointments) {
        const remainingAppointments = appointments[date].filter(app => {
            const appointmentTime = new Date(app.isoTime).getTime();
            return now < appointmentTime + gracePeriodInMs;
        });

        if (remainingAppointments.length > 0) {
            filteredAppointments[date] = remainingAppointments;
        }
    }
    return filteredAppointments;
};

export default function AgendamentoCalendar() {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [bookedAppointments, setBookedAppointments] = useState<Appointments>({});
    const [loading, setLoading] = useState(true);
    const [loggedPatient, setLoggedPatient] = useState<any | null>(null);
    const [refreshFlag, setRefreshFlag] = useState(0); // forçar re-render após alterações

    // carrega agendamentos + paciente logado
    useEffect(() => {
        const loadAll = async () => {
            try {
                const [jsonValue, loggedValue] = await Promise.all([
                    AsyncStorage.getItem(STORAGE_KEY),
                    AsyncStorage.getItem(LOGGED_PATIENT_KEY)
                ]);

                if (jsonValue) {
                    const loaded = JSON.parse(jsonValue);
                    setBookedAppointments(filterExpiredAppointments(loaded));
                } else {
                    setBookedAppointments({});
                }

                if (loggedValue) {
                    try {
                        setLoggedPatient(JSON.parse(loggedValue));
                    } catch {
                        setLoggedPatient(null);
                    }
                } else {
                    setLoggedPatient(null);
                }
            } catch (e) {
                console.error("Failed to load appointments or logged patient", e);
            } finally {
                setLoading(false);
            }
        };

        loadAll();
    }, [refreshFlag]);

    // filtra consultas do paciente logado (cep == cpf)
    const patientCPF = loggedPatient?.cep || null;

    const patientAppointmentsByDate = useMemo(() => {
        const patientApps: Appointments = {};
        if (!patientCPF) return patientApps;

        for (const date in bookedAppointments) {
            const appsForDate = (bookedAppointments[date] || []).filter(
                app => (app.patientCPF || '') === (patientCPF || '')
            );
            if (appsForDate.length > 0) {
                patientApps[date] = appsForDate.sort((a, b) => a.isoTime.localeCompare(b.isoTime));
            }
        }
        return patientApps;
    }, [bookedAppointments, patientCPF]);

    const selectedDayAppointments = selectedDate ? (patientAppointmentsByDate[selectedDate] || []) : [];

    // dados marcados para o calendário
    const markedDates: any = useMemo(() => {
        const marked: any = Object.keys(patientAppointmentsByDate).reduce((acc, date) => {
            acc[date] = { marked: true, dotColor: '#0c0346' };
            return acc;
        }, {} as any);

        if (selectedDate) {
            marked[selectedDate] = {
                selected: true,
                selectedColor: '#0078ff',
                ...(marked[selectedDate] || {}),
            };
        }
        return marked;
    }, [patientAppointmentsByDate, selectedDate]);

    // salvar novo objeto de agendamentos no storage e estado
    const saveAppointments = async (newAppointments: Appointments) => {
        try {
            const filtered = filterExpiredAppointments(newAppointments);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
            setBookedAppointments(filtered);
        } catch (e) {
            console.error('Erro ao salvar agendamentos', e);
            Alert.alert('Erro', 'Falha ao salvar agendamentos.');
        }
    };

    // cancelar uma consulta
    const handleCancelAppointment = (appToDelete: AppointmentDetail) => {
        Alert.alert(
            'Confirmação',
            `Deseja realmente cancelar a consulta de ${appToDelete.patientName} em ${appToDelete.date} às ${appToDelete.time}?`,
            [
                { text: 'Não', style: 'cancel' },
                {
                    text: 'Sim, cancelar',
                    style: 'destructive',
                    onPress: async () => {
                        const date = appToDelete.date;
                        const updatedDayAppointments = (bookedAppointments[date] || []).filter(
                            app => app.isoTime !== appToDelete.isoTime
                        );

                        const newAppointments = { ...bookedAppointments, [date]: updatedDayAppointments };
                        if (updatedDayAppointments.length === 0) delete newAppointments[date];

                        await saveAppointments(newAppointments);
                        // força reload (garante que useEffect recarrega também se necessário)
                        setRefreshFlag(f => f + 1);
                        Alert.alert('Cancelado', 'Consulta cancelada com sucesso.');
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#0078ff" />
                <Text style={{ marginTop: 10 }}>Carregando agendamentos...</Text>
            </View>
        );
    }

    // se não há paciente logado, mostra instrução
    if (!loggedPatient) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ textAlign: 'center', padding: 20 }}>
                    Nenhum paciente autenticado. Faça login para ver seus agendamentos.
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Calendar
                    markedDates={markedDates}
                    theme={{
                        selectedDayBackgroundColor: '#0078ff',
                        todayTextColor: '#0c0346',
                        arrowColor: '#0c0346',
                    }}
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                />

                <View style={{ height: 1, backgroundColor: '#ddd', marginHorizontal: 15 }} />

                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>
                        {selectedDate
                            ? `Consultas Agendadas para ${selectedDate}:`
                            : 'Selecione uma data no calendário acima.'}
                    </Text>

                    {selectedDate && (
                        <>
                            {selectedDayAppointments.length > 0 ? (
                                selectedDayAppointments.map((app, index) => (
                                    <View key={index} style={styles.agendamentoCard}>
                                        <View>
                                            <Text style={styles.agendamentoText}><Text style={{ fontWeight: 'bold' }}>Hora:</Text> {app.time}</Text>
                                            <Text style={styles.agendamentoText}><Text style={{ fontWeight: 'bold' }}>CPF:</Text> {app.patientCPF}</Text>
                                            <Text style={styles.agendamentoText}><Text style={{ fontWeight: 'bold' }}>Consulta:</Text> {app.patientConsult}</Text>
                                            <Text style={styles.agendamentoText}><Text style={{ fontWeight: 'bold' }}>Tel:</Text> {app.patientPhone || 'N/A'}</Text>
                                        </View>

                                        <View style={styles.actionButtonContainer}>
                                            <Pressable
                                                style={[styles.cancelButton]}
                                                onPress={() => handleCancelAppointment(app)}
                                            >
                                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cancelar</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.semAgendamento}>
                                    Vá ao posto ou mande mensagem, entre em contato pelo chat para marcar uma consulta.
                                </Text>
                            )}
                        </>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    infoContainer: {
        padding: 15,
        backgroundColor: '#f5f5f5',
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#0c0346',
    },
    agendamentoCard: {
        backgroundColor: '#a9d6eb',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    agendamentoText: {
        fontSize: 14,
        color: '#000',
    },
    semAgendamento: {
        fontSize: 16,
        color: '#d9534f',
        textAlign: 'center',
        paddingVertical: 20,
        fontWeight: 'bold',
    },
    actionButtonContainer: {
        flexDirection: 'row',
    },
    cancelButton: {
        backgroundColor: '#d9534f',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    }
});
