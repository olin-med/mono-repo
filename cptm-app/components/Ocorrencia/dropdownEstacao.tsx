import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';
import { EstacaoCPTM } from '../../types';

interface DropdownEstacaoProps {
  onSelect: (estacao: EstacaoCPTM) => void;
  selectedEstacao?: EstacaoCPTM;
}

const estacoes: EstacaoCPTM[] = [
  'Q',
  'Luz',
  'Brás',
  'Barra Funda',
  'Tatuapé',
  'Santo Amaro',
  'Jabaquara',
];

export const DropdownEstacao: React.FC<DropdownEstacaoProps> = ({ onSelect, selectedEstacao }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setIsVisible(true)}>
        <Text style={styles.dropdownButtonText}>
          {selectedEstacao || 'Selecione uma estação'}
        </Text>
        <Feather name="chevron-down" size={20} color="#888" />
      </TouchableOpacity>

      <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        <View style={styles.modalContent}>
          {estacoes.map((estacao) => (
            <TouchableOpacity
              key={estacao}
              style={styles.estacaoItem}
              onPress={() => {
                onSelect(estacao);
                setIsVisible(false);
              }}
            >
              <Text style={styles.optionText}>{estacao}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  dropdownButton: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#CCC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 15,
    color: '#333',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    maxHeight: '60%',
  },
  estacaoItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  optionText: {
    fontSize: 15,
    color: '#333',
  },
});