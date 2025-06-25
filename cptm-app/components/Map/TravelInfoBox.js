import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const TravelInfoBox = ({ caminho }) => {
  if (!caminho || caminho.length === 0) return null;

  const renderStep = (step, index) => {
    const entrada = step.tipo === 'E';
    const saida = step.tipo === 'D';
    const color = `#${step.linhaCor}`;
    const isLast = index === caminho.length - 1;

    const showTransfer =
      index > 0 && caminho[index - 1].linhaNumero !== step.linhaNumero;

    const items = [];

    if (showTransfer) {
      items.push(
        <View style={styles.row} key={`transfer-${index}`}>
          <View style={styles.verticalTrack}>
            <View style={[styles.circle, styles.transferCircle]} />
            <View style={[styles.line, { backgroundColor: color }]} />
          </View>

          <View style={styles.stationContent}>
            <Text style={styles.transferText}>Transferência</Text>
          </View>
        </View>
      );
    }

    items.push(
      <View style={styles.row} key={`station-${index}`}>
        <View style={styles.verticalTrack}>
          <View style={[styles.circle, { backgroundColor: color }]} />
          {!isLast && <View style={[styles.line, { backgroundColor: color }]} />}
        </View>

        <View style={styles.stationContent}>
          <View style={styles.step}>
            <FontAwesome5
              name={entrada ? 'walking' : 'train'}
              size={18}
              color={entrada ? '#d9534f' : '#000'}
              style={styles.icon}
            />

            <View style={styles.texts}>
              <Text style={[styles.station, { color }]}>
                {step.estacao}
              </Text>
              {entrada && (
                <Text style={styles.direction}>Sentido: {step.sentido}</Text>
              )}
            </View>

            <Text style={styles.lineLabel}>
              {step.linhaNumero} - {step.linhaNome.split(' ')[2]}
            </Text>
          </View>
        </View>
      </View>
    );

    return items;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Informações da Viagem</Text>
      <ScrollView style={styles.body}>
        {caminho.flatMap((step, index) => renderStep(step, index))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderTopWidth: 2,
    borderColor: '#dcdcdc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxHeight: 340,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  body: {
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 40,
  },
  verticalTrack: {
    width: 24,
    alignItems: 'center',
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    zIndex: 1,
  },
  transferCircle: {
    backgroundColor: '#ffffff',
    borderColor: '#aaa',
    borderWidth: 2,
  },
  line: {
    flex: 1,
    width: 3,
    marginTop: 0,
    borderRadius: 1.5,
  },
  stationContent: {
    flex: 1,
    paddingLeft: 8,
    justifyContent: 'center',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginTop: 2,
    marginRight: 6,
  },
  texts: {
    flex: 1,
  },
  station: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  direction: {
    fontSize: 12,
    color: '#555',
  },
  lineLabel: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
    marginTop: 1,
  },
  transferText: {
    fontSize: 14,
    color: '#d9534f',
    fontWeight: '600',
  },
});

export default TravelInfoBox;
