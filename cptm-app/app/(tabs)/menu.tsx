// app/index.tsx
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MenuItem } from '../../components/Menu/MenuItem';
import FontAwesome5 from '@expo/vector-icons/FontAwesome';

// ícones
import Logo from '../../assets/icons/logo.svg';

export default function Menu() {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
       {/* <Logo /> */}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>O que você procura?</Text>

        <Text style={styles.section}>Navegação</Text>
        <MenuItem label="Linhas e estações" route="/">
          <FontAwesome5 name="train" size={24} color="#000" />
        </MenuItem>
        <MenuItem label="Rotas" route="/">
          <FontAwesome5 name="map" size={24} color="#000" />
        </MenuItem>

        <Text style={styles.section}>Serviços</Text>
        <MenuItem label="Compra de bilhetes" route="/">
          <FontAwesome5 name="ticket" size={24} color="#000" />
        </MenuItem>
        <MenuItem label="Acessibilidade" route="/">
          <FontAwesome5 name="wheelchair" size={24} color="#000" />
        </MenuItem>
        <MenuItem label="Emergência" route="/">
          <FontAwesome5 name="ambulance" size={24} color="#000" />
        </MenuItem>
        <MenuItem label="Bicicletário" route="/">
          <FontAwesome5 name="bicycle" size={24} color="#000" />
        </MenuItem>

        <Text style={styles.section}>Institucional</Text>
        <MenuItem label="Tarifas" route="/" />
        <MenuItem label="Fale Conosco" route="/" />
        <MenuItem label="Missão, Visão e Valores" route="/" />
        <MenuItem label="Termos de Uso" route="/" />
        <MenuItem label="Regulamento de Viagem" route="/" />

        <Text style={styles.section}>Configurações</Text>
        <MenuItem label="Perfil" route="/" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header:    { backgroundColor: '#E2001A', alignItems: 'center', padding: 8 },
  content:   { paddingHorizontal: 32, paddingVertical: 16 },
  title:     { fontSize: 20, fontWeight: '500', marginVertical: 16, textAlign: 'center' },
  section:   { fontSize: 20, fontWeight: '500', color: '#555', marginTop: 24, marginBottom: 12 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
});
