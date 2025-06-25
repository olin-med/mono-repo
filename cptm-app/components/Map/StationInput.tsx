import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as estacoes from "../../estacoes.json";


interface StationInputProps {
  field: string;
  label: string;
  value: string;
  onSelect: (station: string) => void;
}

const stationNames = Object.keys(estacoes);

const StationInput: React.FC<StationInputProps> = ({field, label, value, onSelect }) => {
  const [query, setQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const filteredStations = query.length > 0
    ? stationNames.filter((name) => name.toLowerCase().includes(query.toLowerCase()))
    : stationNames;

  const handleSelect = (station: string) => {
    setModalVisible(false);
    setQuery("");
    onSelect(station);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.inputGroups}>
      <View style={styles.view}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>
            {value === "default" ? field : value}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar estação..."
              value={query}
              onChangeText={setQuery}
              autoFocus={true}
            />
            <FlatList
              data={filteredStations}
              keyExtractor={(item) => item !== "default" ? item : "Selecione uma estação"}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.modalItemText}>{item !== "default" ? item : "Selecione uma estação"}</Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
              style={styles.flatList}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputGroups: {
    flex: 1,
  },
  inputTypo: {
    textAlign: "left",
    fontFamily: "Frutiger LT Std",
  },
  textoInput: {
    fontSize: 16,
    color: "#252525",
    alignSelf: "stretch",
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#fcfcfc",
    borderStyle: "solid",
    borderColor: "#727a94",
    borderWidth: 2,
    paddingHorizontal: 18,
    paddingVertical: 10,
    justifyContent: 'center',
    minHeight: 48,
    minWidth: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "#727a94",
    textAlign: "left",
    fontFamily: "Frutiger LT Std",
  },
  view: {
    width: "100%",
    gap: 3,
    flex: 1,
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 0,
    borderRadius: 8,
    padding: 16,
    maxHeight: '80%',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#727a94',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    fontFamily: "Frutiger LT Std",
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 14,
    color: "#252525",
    fontFamily: "Frutiger LT Std",
  },
  flatList: {
    flexGrow: 0,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f00',
    borderRadius: 4,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontFamily: "Frutiger LT Std",
  },
});

export default StationInput;