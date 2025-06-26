import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {router} from 'expo-router';

// const API_URL = Constants.expoConfig?.extra?.stationsApiUrl;
const API_URL = "http://52.2.242.221:8040"

type Estacao = {
  id: number;
  nome: string;
};

export default function SearchScreen() {
  const [station, setStation] = useState('');
  const [open, setOpen] = useState(false);
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);

  useEffect(() => {
      const fetchData = async () => {
        const url = `${API_URL}/estacoes`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          setEstacoes(data);
          console.log('Estações carregadas:', data);
        } catch (error) {
          console.error('Erro ao carregar estações:', error);
        }
      };
      fetchData();
    }, []);

    if (!estacoes) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      );
    }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#ED1C24"
        translucent={false}
      />
      {/* Content */}
      <View style={styles.container}>
        <Text style={styles.label}>Estação:</Text>
        <DropDownPicker
        open={open}
        value={station}
        items={estacoes.map((estacao) => ({
          label: estacao.nome,
          value: estacao.id.toString(),
        }))}
        setOpen={setOpen}
        setValue={setStation}
        setItems={setEstacoes}
        searchable={true}
        placeholder="Selecione uma estação"
        listMode="MODAL"
        onOpen={() => {
                  const filteredItems = estacoes.filter(
            (estacao) => estacao.nome !== 'default'
          );
          setEstacoes(filteredItems);
        }}
        />
        <TouchableOpacity style={styles.button}
          onPress={() => {
            router.push({pathname: '/Estacao', params: { id: station }});
          }}
        >
          <Text style={styles.buttonText}>Pesquisar</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ED1C24',
  },
  header: {
    backgroundColor: '#ED1C24',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 32 : 16, // aumenta padding no android, 16 para iOS
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    color: '#222',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 12,
    marginBottom: 0,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#222',
  },
  searchIcon: {
    marginLeft: 8,
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: 150,
    marginBottom: 16,
    marginHorizontal: 0,
    marginTop: -1,
    zIndex: 10,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  suggestionText: {
    fontSize: 16,
    color: '#222',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#757A94',
    borderRadius: 8,
    paddingVertical: 10,
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginRight: 8,
  },
});