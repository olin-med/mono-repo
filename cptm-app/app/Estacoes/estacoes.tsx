import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const API_URL = "http://10.128.0.62:8021"

type Estacao = {
  id: number;
  nome: string;
};

type LinhaInfo = {
  nome: string;
  cor: string;
  horario: string;
  estacoes: Estacao[];
};

export default function LinhaDetalhe() {
  const { lineId, color, name } = useLocalSearchParams<{
    lineId: string;
    color: string;
    name: string;
  }>();
  const router = useRouter();

  const [linha, setLinha] = useState<LinhaInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${API_URL}/estacoes/linhas/${lineId}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setLinha({
          nome: name ?? '',
          cor: color ?? '#ED1C24',
          horario: data.horario ?? '04:00 - 00:00',
          estacoes: data.estacoes,
        });
      } catch (error) {
        console.error('❌ Erro ao carregar dados da linha:', error);
      }
    };
    fetchData();
  }, [lineId]);

  if (!linha) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={linha.cor}
        translucent={false}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: linha.cor }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{linha.nome}</Text>
      </View>

      {/* Horário */}
      <View style={styles.scheduleContainer}>
        <Text style={styles.scheduleLabel}>Horário de funcionamento:</Text>
        <Text style={styles.scheduleValue}>{linha.horario}</Text>
      </View>

      {/* Estações */}
      <ScrollView contentContainerStyle={styles.stationScroll}>
        {linha.estacoes.map((estacao, index) => (
          <View key={estacao.id} style={styles.stationRow}>
            {/* Coluna do círculo + linhas */}
            <View style={styles.iconColumn}>
              {index !== 0 && (
                <View
                  style={[
                    styles.verticalLine,
                    { backgroundColor: linha.cor },
                  ]}
                />
              )}
              <View
                style={[
                  styles.circle,
                  { borderColor: linha.cor },
                ]}
              />
              {index !== linha.estacoes.length - 1 && (
                <View
                  style={[
                    styles.verticalLine,
                    { backgroundColor: linha.cor },
                  ]}
                />
              )}
            </View>

            {/* Nome da estação + chevron */}
            <TouchableOpacity
              style={styles.stationInfo}
            >
              <Text style={styles.stationName}>{estacao.nome}</Text>
              <Ionicons name="chevron-forward" size={18} color="#888" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#555',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 32 : 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  scheduleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  scheduleLabel: {
    fontSize: 13,
    color: '#555',
  },
  scheduleValue: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  stationScroll: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  stationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconColumn: {
    width: 24,
    alignItems: 'center',
  },
  verticalLine: {
    width: 2,
    flex: 1,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    backgroundColor: '#fff',
    zIndex: 2,
  },
  stationInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  stationName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
