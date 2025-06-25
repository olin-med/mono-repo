import React from "react";
import { StyleSheet, ScrollView, View, Image } from "react-native";
import { Text } from "@/components/Themed";

export default function MissaoEValoresScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Image */}
        <Image
          source={require("../../assets/images/cptm_train.png")}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Visão Geral */}
        <Text style={styles.sectionTitle}>Visão Geral</Text>
        <Text style={styles.text}>
          Hoje a empresa, com suas 57 estações operacionais, atende 16 municípios e se apresenta como elo fundamental do ecossistema da mobilidade dentro da Região Metropolitana de São Paulo.
        </Text>
        <View style={styles.bulletList}>
          <Text style={styles.bulletItem}>
            {"\u2022"} Algumas linhas do sistema estão passando por obras de infraestrutura: modernização dos sistemas de sinalização, telecomunicações, energia, rede aérea e via permanente.
          </Text>
          <Text style={styles.bulletItem}>
            {"\u2022"} As estações mais antigas estão sendo modernizadas e a frota de trens renovada.
          </Text>
          <Text style={styles.bulletItem}>
            {"\u2022"} 57 estações, das quais 43 acessíveis.
          </Text>
          <Text style={styles.bulletItem}>
            {"\u2022"} No total são 196 km de extensão, somando as 05 linhas
          </Text>
        </View>

        {/* Missão */}
        <Text style={styles.sectionTitle}>Missão</Text>
        <Text style={styles.text}>
          Prestar serviços de transporte propiciando mobilidade com excelência, sustentabilidade e acesso a serviços associados, que tornem a experiência de optar pela CPTM única.
        </Text>

        {/* Visão */}
        <Text style={styles.sectionTitle}>Visão</Text>
        <Text style={styles.text}>
          Ser, de modo sustentável, o elo fundamental na cadeia intermodal de transporte de passageiros no Estado de São Paulo e a referência em projetos ferroviários aprimorando experiências em mobilidade humana
        </Text>

        {/* Valores */}
        <Text style={styles.sectionTitle}>Valores</Text>
        <Text style={styles.text}>
          Comprometimento com transparência e integridade:
        </Text>
        <View style={styles.bulletList}>
          <Text style={styles.bulletItem}>
            {"\u2022"} Valorização do capital humano;
          </Text>
          <Text style={styles.bulletItem}>
            {"\u2022"} Respeito ao meio ambiente e aos valores das comunidades;
          </Text>
          <Text style={styles.bulletItem}>
            {"\u2022"} Zelo inegociável pelo melhor técnica;
          </Text>
          <Text style={styles.bulletItem}>
            {"\u2022"} Foco na inovação e empreendedorismo.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#E2001A",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 36,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerBack: {
    color: "#fff",
    fontSize: 28,
    marginRight: 8,
    fontFamily: "FrutigerLTStd-Bold",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "FrutigerLTStd-Bold",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 4,
    marginBottom: 24,
    backgroundColor: "#eee",
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "FrutigerLTStd-Bold",
    color: "#222",
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    fontFamily: "FrutigerLTStd-Roman",
    color: "#333",
    marginBottom: 8,
    lineHeight: 24,
  },
  bulletList: {
    marginLeft: 12,
    marginBottom: 12,
  },
  bulletItem: {
    fontSize: 15,
    fontFamily: "FrutigerLTStd-Roman",
    color: "#333",
    marginBottom: 4,
    lineHeight: 22,
  },
});