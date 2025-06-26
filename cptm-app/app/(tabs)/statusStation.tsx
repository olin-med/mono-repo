
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import TransportGroup from '@/components/Estacoes/TransportGroup'; // Usa tu alias o ajusta el path

// ✅ Lee la variable desde extra (definida en app.config.js)
// const API_URL = Constants.expoConfig?.extra?.transportApiUrl;
const API_URL = "http://52.2.242.221:8021/api"


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

const MOCK_DATA: TransportGroupData[] = [
  {
    name: 'CPTM',
    lines: [
      { id: '7', name: 'Linha 7 Rubi', color: '#92278F', status: 'normal' },
      { id: '11', name: 'Linha 11 Coral', color: '#F15A24', status: 'normal' },
      { id: '12', name: 'Linha 12 Safira', color: '#0071BC', status: 'normal' },
      { id: '13', name: 'Linha 13 Jade', color: '#9EDEBA', status: 'normal' },
    ],
  },
  {
    name: 'Metrô',
    lines: [
      { id: '1', name: 'Linha 1 Azul', color: '#004A98', status: 'normal' },
      { id: '2', name: 'Linha 2 Verde', color: '#43B02A', status: 'normal' },
      { id: '3', name: 'Linha 3 Vermelha', color: '#EE1C25', status: 'normal' },
      { id: '15', name: 'Linha 15 Prata', color: '#C7C8CA', status: 'normal' },
    ],
  },
  {
    name: 'ViaQuatro',
    lines: [
      { id: '4', name: 'Linha 4 Amarela', color: '#FFD200', status: 'normal' },
    ],
  },
  {
    name: 'ViaMobilidade',
    lines: [
      { id: '5', name: 'Linha 5 Lilás', color: '#A05EB5', status: 'normal' },
      { id: '8', name: 'Linha 8 Diamante', color: '#8C6239', status: 'normal' },
      { id: '9', name: 'Linha 9 Esmeralda', color: '#009444', status: 'normal' },
    ],
  },
];

export default function TransportStatusScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        {MOCK_DATA.map((group) => (
          <TransportGroup key={group.name} group={group} />
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
  content: {
    padding: 16,
    paddingBottom: 32, // prevent bottom cutoff
  },
});
