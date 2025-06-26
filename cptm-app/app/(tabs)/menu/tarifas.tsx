import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function TarifasScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <ScrollView contentContainerStyle={styles.content}>
        {/* Títulos das colunas */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderTitle}>Bilhetes</Text>
          <Text style={styles.tableHeaderValue}>Valores</Text>
        </View>

        {/* Bilhetes Exclusivos */}
        <Text style={styles.sectionTitle}>Bilhetes exclusivos</Text>
        <View style={styles.divider} />
        <View style={styles.rowAlt}><Text style={styles.itemTitle}>Unitário - Trem Metropolitano</Text><Text style={styles.itemPrice}>R$ 5,20</Text></View>
        <View style={styles.row}><Text style={styles.itemTitle}>Bilhete Ônibus Metropolitano - BOM*</Text><Text style={styles.itemPrice}>R$ 5,20</Text></View>
        <View style={styles.rowAlt}><Text style={styles.itemTitle}>Bilhete Fidelidade M8 - 8 viagens</Text><Text style={styles.itemPrice}>R$ 38,48</Text></View>
        <View style={styles.row}><Text style={styles.itemTitle}>Bilhete Fidelidade M20 - 20 viagens</Text><Text style={styles.itemPrice}>R$ 93,60</Text></View>
        <View style={styles.rowAlt}><Text style={styles.itemTitle}>Bilhete Fidelidade M50 - 50 viagens</Text><Text style={styles.itemPrice}>R$ 225,50</Text></View>
        <View style={styles.row}><Text style={styles.itemTitle}>Bilhete Madrugador (das 4h às 5h35)</Text><Text style={styles.itemPrice}>R$ 4,60</Text></View>

        {/* Bilhetes Integrados */}
        <Text style={styles.sectionTitle}>Bilhetes integrados</Text>
        <View style={styles.divider} />
        <View style={styles.rowAlt}><Text style={styles.itemTitle}>Integrado sistema metroferroviário com ônibus municipal SP</Text><Text style={styles.itemPrice}>R$ 8,90</Text></View>
        <View style={styles.row}><Text style={styles.itemTitle}>Integrado sistema metroferroviário com ônibus municipal SP - Vale Transporte</Text><Text style={styles.itemPrice}>R$ 10,71</Text></View>
        <View style={styles.rowAlt}><Text style={styles.itemTitle}>Bilhete Madrugador (das 4h às 5h35) Comum</Text><Text style={styles.itemPrice}>R$ 7,95</Text></View>
        <View style={styles.row}><Text style={styles.itemTitle}>Bilhete Madrugador (das 4h às 5h35) Vale Transporte</Text><Text style={styles.itemPrice}>R$ 9,76</Text></View>

        {/* Bilhetes Temporários */}
        <Text style={styles.sectionTitle}>Bilhetes Temporários</Text>
        <View style={styles.divider} />
        <View style={styles.rowAlt}><Text style={styles.itemTitle}>Bilhete Único Mensal Comum</Text><Text style={styles.itemPrice}>R$ 252,70</Text></View>
        <View style={styles.row}><Text style={styles.itemTitle}>Bilhete Único Mensal Integrado com as linhas Municipais de São Paulo</Text><Text style={styles.itemPrice}>R$ 392,08</Text></View>
        <View style={styles.rowAlt}><Text style={styles.itemTitle}>Bilhete 24 horas Comum</Text><Text style={styles.itemPrice}>R$ 19,75</Text></View>
        <View style={styles.row}><Text style={styles.itemTitle}>Bilhete 24 horas Integrado com as linhas Municipais de São Paulo</Text><Text style={styles.itemPrice}>R$ 26,02</Text></View>

        {/* Bilhete Escolar */}
        <Text style={styles.sectionTitle}>Bilhete Escolar</Text>
        <View style={styles.divider} />
        <View style={styles.rowAlt}><Text style={styles.itemTitle}>Cartão Escolar (valor por viagem)</Text><Text style={styles.itemPrice}>R$ 2,60</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#E30613',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerBack: {
    color: '#fff',
    fontSize: 28,
    marginRight: 8,
    fontFamily: 'FrutigerLTStd-Bold',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'FrutigerLTStd-Bold',
  },
  content: {
    padding: 16,
    paddingBottom: 80,
    backgroundColor: '#fff',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
    marginTop: 8,
  },
  tableHeaderTitle: {
    fontSize: 24,
    color: '#222',
    fontFamily: 'FrutigerLTStd-Bold',
    flex: 1,
  },
  tableHeaderValue: {
    fontSize: 20,
    color: '#444',
    fontFamily: 'FrutigerLTStd-Bold',
    textAlign: 'right',
    minWidth: 80,
  },
  sectionTitle: {
    fontSize: 17,
    color: '#E30613',
    fontFamily: 'FrutigerLTStd-Bold',
    marginTop: 24,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  rowAlt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f7f7f7',
    paddingVertical: 8,
    paddingHorizontal: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  itemTitle: {
    flex: 1,
    fontSize: 15,
    color: '#222',
    fontFamily: 'FrutigerLTStd-Roman',
    marginRight: 8,
  },
  itemPrice: {
    fontSize: 15,
    color: '#222',
    fontFamily: 'FrutigerLTStd-Bold',
    minWidth: 80,
    textAlign: 'right',
  },
});