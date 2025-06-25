// app/index.tsx
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { MenuItem } from './src/components/MenuItem';
import { ROUTES } from './routes';

// íco@/s…
import TicketIcon         from './assets/icons/1.svg';
import RouteIcon          from './assets/icons/2.svg';
import AlarmIcon          from './assets/icons/3.svg';
import BikeIcon           from './assets/icons/4.svg';
import MoneyIcon          from './assets/icons/5.svg';
import HeadPhoneIcon      from './assets/icons/6.svg';
import HandicapIcon       from './assets/icons/7.svg';
import TrainIcon          from './assets/icons/8.svg';
import ShieldIcon         from './assets/icons/9.svg';
import CheckIcon          from './assets/icons/10.svg';
import BookIcon           from './assets/icons/11.svg';
import ProfileIcon        from './assets/icons/12.svg';
import Menu1              from './assets/icons/menu1.svg';
import Menu2              from './assets/icons/menu2.svg';
import Menu3              from './assets/icons/menu3.svg';
import Menu4              from './assets/icons/menu4.svg';
import Logo               from './assets/icons/logo.svg';
import { useRouter }      from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Logo width={48} height={48} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>O que você procura?</Text>

        <Text style={styles.section}>Navegação</Text>
        <MenuItem icon={TrainIcon}  label="Linhas e estações"         route={ROUTES.LINHAS_E_ESTACOES} />
        <MenuItem icon={RouteIcon}  label="Rotas"                     route={ROUTES.ROTAS} />

        <Text style={styles.section}>Serviços</Text>
        <MenuItem icon={TicketIcon}    label="Compra de bilhetes"     route={ROUTES.COMPRA_BILHETES} />
        <MenuItem icon={HandicapIcon}  label="Acessibilidade"         route={ROUTES.ACESSIBILIDADE} />
        <MenuItem icon={AlarmIcon}     label="Emergência"             route={ROUTES.EMERGENCIA} />
        <MenuItem icon={BikeIcon}      label="Bicicletário"           route={ROUTES.BICICLETARIO} />

        <Text style={styles.section}>Institucional</Text>
        <MenuItem icon={MoneyIcon}     label="Tarifas"                route={ROUTES.TARIFAS} />
        <MenuItem icon={HeadPhoneIcon} label="Fale Conosco"           route={ROUTES.FALE_CONSOCO} />
        <MenuItem icon={CheckIcon}     label="Missão, Visão e Valores" route={ROUTES.MISSAO_VISAO_VALORES} />
        <MenuItem icon={ShieldIcon}    label="Termos de Uso"          route={ROUTES.TERMOS_USO} />
        <MenuItem icon={BookIcon}      label="Regulamento de Viagem"  route={ROUTES.REGULAMENTO_VIAGEM} />

        <Text style={styles.section}>Configurações</Text>
        <MenuItem icon={ProfileIcon}   label="Perfil"                 route={ROUTES.PERFIL} />
      </ScrollView>

      <View style={styles.footer}>
        <Pressable onPress={() => router.push(ROUTES.MENU)}   ><Menu1 width={37} height={50} /></Pressable>
        <Pressable onPress={() => router.push(ROUTES.LINHAS)} ><Menu4 width={40} height={50} /></Pressable>
        <Pressable onPress={() => router.push(ROUTES.ROTAS)}  ><Menu2 width={35} height={50} /></Pressable>
        <Pressable onPress={() => router.push(ROUTES.SOS)}    ><Menu3 width={37} height={50} /></Pressable>
      </View>
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
