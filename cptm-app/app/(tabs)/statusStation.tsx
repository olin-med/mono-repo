import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import TransportGroup from '../../components/Estacoes/TransportGroup'; // Usa tu alias o ajusta el path

// ✅ Lee la variable desde extra (definida en app.config.js)
const API_URL = Constants.expoConfig?.extra?.transportApiUrl;

type Line = {
  id: string;
  name: string;
  status: 'normal' | 'reduced' | 'stopped';
  color: string;
};

type TransportGroupData = {
  name: string;
  lines: Line[];
};

export default function TransportStatusScreen() {
  const [data, setData] = useState<TransportGroupData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransportStatus = async () => {
      try {
        if (!API_URL) throw new Error('API URL no definida en extra');

        console.log('→ Usando API_URL:', API_URL);

        const response = await fetch(`${API_URL}/transport-status`);
        if (!response.ok) throw new Error('Error al obtener los datos');

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransportStatus();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: '#fff', padding: 16 }}>
      {data.map((group) => (
        <TransportGroup key={group.name} group={group} />
      ))}
    </ScrollView>
  );
}
