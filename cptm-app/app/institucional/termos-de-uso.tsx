// src/screens/TermsOfUseScreen.js
import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useFonts } from "expo-font";

export default function TermsOfUseScreen() {
  const [fontsLoaded] = useFonts({
    "Frutiger-Bold": require("../../assets/fonts/FrutigerLTStd-Bold.otf"),
    "Frutiger-Roman": require("../../assets/fonts/FrutigerLTStd-Roman.otf"),
  });

  if (!fontsLoaded) {
    return null; // ou <AppLoading /> se estiver usando o pacote expo-app-loading
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Termos de uso</Text>
      <Text style={styles.text}>
        O aplicativo CPTM Oficial é disponibilizado “como é” e a CPTM não
        fornece qualquer garantia, implícita ou explícita, de que o aplicativo
        funcione sem falhas no seu dispositivo móvel, embora o aplicativo tenha
        sido submetido a um processo de controle de qualidade e testes durante o
        seu desenvolvimento. É, portanto, de responsabilidade do próprio usuário
        a instalação e uso do aplicativo em seu dispositivo móvel.
      </Text>

      <Text style={styles.sectionTitle}>Política de Privacidade</Text>
      <Text style={styles.text}>
        O aplicativo CPTM Oficial não coleta informação de localização do seu
        aparelho móvel ou qualquer informação de cunho pessoal, ou informações
        que possam identificar ou rastrear o aparelho móvel no qual o aplicativo
        foi instalado.
        {"\n\n"}
        Ao instalar o aplicativo CPTM Oficial em seu dispositivo móvel, o
        usuário está concordando com os termos acima.
        {"\n\n"}O aplicativo CPTM Oficial é disponibilizado “como é” e a CPTM
        não fornece qualquer garantia, implícita ou explícita, de que o
        aplicativo funcione sem falhas no seu dispositivo móvel, embora o
        aplicativo tenha sido submetido a um processo de controle de qualidade e
        testes durante o seu desenvolvimento. É, portanto, de responsabilidade
        do próprio usuário a instalação e uso do aplicativo em seu dispositivo
        móvel.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontFamily: "Frutiger-Bold",
    marginBottom: 10,
    color: "#000",
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "Frutiger-Bold",
    marginTop: 40, // Espaço extra entre os blocos
    marginBottom: 10,
    color: "#000",
  },
  text: {
    fontSize: 16,
    fontFamily: "Frutiger-Roman",
    color: "#333",
    marginBottom: 20,
    lineHeight: 24,
  },
});
