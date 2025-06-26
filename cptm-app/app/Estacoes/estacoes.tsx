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

const API_URL = 'http://52.2.242.221:8021';

type Estacao = {
  id: number;
  nome: string;
  linha_id: number;
  linha: { id: number; nome: string; cor: string };
};

type LinhaInfo = {
  nome: string;
  cor: string;
  horario: string;
  estacoes: { id: number; nome: string }[];
};

export default function LinhaDetalhe() {
  const { lineId, color, name } = useLocalSearchParams<{
    lineId?: string;
    color?: string;
    name?: string;
  }>();
  const router = useRouter();

  const [linha, setLinha] = useState<LinhaInfo | null>(null);

  useEffect(() => {
    if (!lineId) return;

    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(`${API_URL}/estacoes`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json(); // { estacoes: [...] }
        const todas: Estacao[] = json.estacoes ?? [];

        const idNum = Number(lineId);
        const daLinha = todas.filter((e) => e.linha_id === idNum);

        if (daLinha.length === 0) {
          throw new Error('Nenhuma estação para essa linha.');
        }

        // usa o primeiro item como referência de nome/cor se o caller não enviou
        const ref = daLinha[0].linha;

        setLinha({
          nome: name ?? ref.nome,
          cor: color ?? ref.cor ?? '#ED1C24',
          horario: '04:00 – 00:00', // não vem da API? define fixo aqui
          estacoes: daLinha.map(({ id, nome }) => ({ id, nome })),
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('❌ Erro ao carregar estações:', err);
        }
      }
    })();

    return () => controller.abort();
  }, [lineId, color, name]);

  if (!linha) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando…</Text>
      </View>
    );
  }

  /* ---------- render ------------------------------------------------- */

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={linha.cor}
        translucent={false}
      />

      <View style={[styles.header, { backgroundColor: linha.cor }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{linha.nome}</Text>
      </View>

      <View style={styles.scheduleContainer}>
        <Text style={styles.scheduleLabel}>Horário de funcionamento:</Text>
        <Text style={styles.scheduleValue}>{linha.horario}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.stationScroll}>
        {linha.estacoes.map((estacao, index) => (
          <View key={estacao.id} style={styles.stationRow}>
            <View style={styles.iconColumn}>
              {index !== 0 && (
                <View
                  style={[styles.verticalLine, { backgroundColor: linha.cor }]}
                />
              )}
              <View style={[styles.circle, { borderColor: linha.cor }]} />
              {index !== linha.estacoes.length - 1 && (
                <View
                  style={[styles.verticalLine, { backgroundColor: linha.cor }]}
                />
              )}
            </View>

            <TouchableOpacity
              style={styles.stationInfo}
              onPress={() =>
                router.push({
                  pathname: '/estacao/[id]',
                  params: { id: estacao.id.toString() },
                })
              }
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

/* ---------- estilos (iguais aos anteriores) ------------------------- */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#555', fontSize: 16 },

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

  scheduleContainer: { paddingHorizontal: 16, paddingVertical: 8 },
  scheduleLabel: { fontSize: 13, color: '#555' },
  scheduleValue: { fontSize: 13, color: '#555', marginTop: 2 },

  stationScroll: { paddingHorizontal: 16, paddingVertical: 8 },

  stationRow: { flexDirection: 'row', alignItems: 'center' },
  iconColumn: { width: 24, alignItems: 'center' },
  verticalLine: { width: 2, flex: 1 },
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
  stationName: { fontSize: 14, fontWeight: '600', color: '#333' },
});
