import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';
import { MotivoOcorrencia } from '../../types';

interface DropdownMotivoProps {
  onSelect: (motivo: MotivoOcorrencia) => void;
  selectedMotivo?: MotivoOcorrencia;
}

const motivos: MotivoOcorrencia[] = [
  'Escada rolante/elevador inoperante',
  'Trem com defeito',
  'Atraso na linha',
  'Outro problema',
];

export const DropdownMotivo: React.FC<DropdownMotivoProps> = ({ onSelect, selectedMotivo }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setIsVisible(true)}>
        <Text style={styles.dropdownButtonText}>
          {selectedMotivo || 'Selecione um motivo'}
        </Text>
        <Feather name="chevron-down" size={20} color="#888" />
      </TouchableOpacity>

      <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        <View style={styles.modalContent}>
          {motivos.map((motivo) => (
            <TouchableOpacity
              key={motivo}
              style={styles.motivoItem}
              onPress={() => {
                onSelect(motivo);
                setIsVisible(false);
              }}
            >
              <Text style={styles.optionText}>{motivo}</Text>
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
  motivoItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  optionText: {
    fontSize: 15,
    color: '#333',
  },
});