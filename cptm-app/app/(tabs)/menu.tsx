// app/index.tsx
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MenuItem } from '../../components/Menu/MenuItem'
import { routes } from '@/constants/Route';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
// ícones
import Logo from '@/assets/images/icons/logo.svg';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function Menu() {

  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header:    { backgroundColor: '#E2001A', alignItems: 'center', padding: 32 },
    content:   { paddingHorizontal: 32, paddingVertical: 16 },
    icon: {marginHorizontal: 8, color: themeColors.icon, width: 32, height: 24},
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
  
  return (
    <SafeAreaView style={styles.container}>
       {/* <Logo /> */}

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>O que você procura?</Text>

        <Text style={styles.section}>Navegação</Text>
        <MenuItem label="Linhas" route="status">
          <FontAwesome5 name="train" size={24} style={styles.icon} />
        </MenuItem>
        <MenuItem label="Estações" route="search">
          <FontAwesome5 name="train" size={24} style={styles.icon} />
        </MenuItem>
        <MenuItem label="Rotas" route="map">
          <FontAwesome5 name="map" size={24} style={styles.icon} />
        </MenuItem>

        <Text style={styles.section}>Serviços</Text>
        <MenuItem label="Compra de bilhetes" route="home">
          <FontAwesome5 name="ticket-alt" size={24} style={styles.icon} />
        </MenuItem>
        { /* muda o de acessibilidade pra PCD adiciona nas routes tbem*/ }
        <MenuItem label="Acessibilidade" route="home">
          <FontAwesome5 name="wheelchair" size={24} style={styles.icon} />
        </MenuItem>
        <MenuItem label="Emergência" route="sos">
          <FontAwesome5 name="ambulance" size={24} style={styles.icon} />
        </MenuItem>
        <MenuItem label="Bicicletário" route="home">
          <FontAwesome5 name="bicycle" size={24} style={styles.icon} />
        </MenuItem>

        <Text style={styles.section}>Institucional</Text>
        <MenuItem label="Tarifas" route="tarifas" > 
          <FontAwesome5 name="wallet" size={24} style={styles.icon} />
        </MenuItem>
        <MenuItem label="Fale Conosco" route="faleConosco" > 
          <FontAwesome5 name="headset" size={24} style={styles.icon} />
        </MenuItem>
        <MenuItem label="Missão, Visão e Valores" route="missaoValores"> 
          <FontAwesome5 name="tasks" size={24} style={styles.icon} />
        </MenuItem>
        <MenuItem label="Termos de Uso" route="termos">
          <FontAwesome5 name="shield-alt" size={24} style={styles.icon} />
        </MenuItem>
        <MenuItem label="Regulamento de Viagem" route="home">
          <FontAwesome5 name="book" size={24} style={styles.icon} />
        </MenuItem>

        <Text style={styles.section}>Configurações</Text>
        <MenuItem label="Perfil" route="perfil">
          <FontAwesome5 name="user-alt" size={24} style={styles.icon} />
        </MenuItem>
      </ScrollView>
    </SafeAreaView>
  );
}

