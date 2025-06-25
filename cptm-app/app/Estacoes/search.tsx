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

const STATIONS = [
  // CPTM
  // Linha 7 - Rubi
  'Rio Grande da Serra',
  'Ribeirão Pires - Antônio Bespalec',
  'Guapituba',
  'Mauá',
  'Capuava',
  'Prefeito Celso Daniel - Santo André',
  'Prefeito Saladino',
  'Utinga',
  'São Caetano do Sul - Prefeito Walter Braido',
  'Tamanduateí',
  'Ipiranga',
  'Juventus - Mooca',
  'Brás',
  'Luz',
  'Palmeiras - Barra Funda',
  'Água Branca',
  'Lapa',
  'Piqueri',
  'Pirituba',
  'Vila Clarice',
  'Jaraguá',
  'Vila Aurora',
  'Perus',
  'Caieiras',
  'Franco da Rocha',
  'Baltazar Fidélis',
  'Francisco Morato',
  'Botujuru',
  'Campo Limpo Paulista',
  'Várzea Paulista',
  'Jundiaí',

  // Linha 10 - Turquesa
  //'Rio Grande da Serra',
  'Prefeito Celso Daniel - Santo André',
  'Tamanduateí',
  'Juventus - Mooca',
  'Brás',

  // Linha 11 - Coral
  'Estudantes',
  'Mogi das Cruzes',
  'Braz Cubas',
  'Jundiapeba',
  'Suzano',
  'Calmon Viana',
  'Poá',
  'Ferraz de Vasconcelos',
  'Antonio Gianetti Neto',
  'Guaianases',
  'José Bonifácio',
  'Dom Bosco',
  'Corinthians - Itaquera',
  'Artur Alvim', 
  'Tatuapé',
  'Brás',
  //'Luz',

  // Linha 12 - Safira
  'Calmon Viana', 
  'Aracaré',
  'Itaquaquecetuba',
  'Engenheiro Manoel Feio',
  'Jardim Romano',
  'Itaim Paulista',
  'Jardim Helena - Vila Mara',
  'São Miguel Paulista',
  'Ermelino Matarazzo',
  'Comendador Ermelino',
  'USP Leste',
  'Engenheiro Goulart',
  'Tatuapé',
  'Brás',

  // Linha 13 - Jade
  'Aeroporto - Guarulhos',
  'Guarulhos - CECAP',
  'Engenheiro Goulart', 

  // Metrô
  // Linha 1 - Azul
  'Tucuruvi',
  'Parada Inglesa',
  'Jardim São Paulo - Ayrton Senna',
  'Santana',
  'Carandiru',
  'Portuguesa - Tietê',
  'Armênia',
  'Tiradentes',
  //'Luz',
  'São Bento',
  'Sé',
  'Japão - Liberdade',
  'São Joaquim',
  'Vergueiro',
  'Paraíso',
  'Ana Rosa',
  'Vila Mariana',
  'Santa Cruz',
  'Praça da Árvore',
  'Saúde',
  'São Judas',
  'Conceição',
  'Jabaquara',

  // Linha 2 - Verde
  'Vila Madalena',
  'Santuário Nossa Senhora de Fátima - Sumaré',
  'Clínicas',
  'Consolação',
  'Trianon - MASP',
  'Brigadeiro',
  'Paraíso',
  'Ana Rosa',
  'Chácara Klabin',
  'Santos - Imigrantes',
  'Alto do Ipiranga',
  'Sacomã',
  'Tamanduateí', 
  'Vila Prudente',

  // Linha 3 - Vermelha
  'Palmeiras - Barra Funda',
  'Marechal Deodoro',
  'Santa Cecília',
  'República',
  'Anhangabaú',
  'Sé',
  'Pedro II',
  'Brás',
  'Bresser - Mooca',
  'Belém',
  'Tatuapé',
  'Carrão - Assaí Atacadista',
  'Penha - Lojas Besni',
  'Vila Matilde',
  'Guilhermina - Esperança',
  'Patriarca - Vila Ré',
  'Artur Alvim',
  'Corinthians - Itaquera',

  // Linha 15 - Prata 
  'Vila Prudente',
  'Oratório',
  'São Lucas',
  'Camilo Haddad',
  'Vila Tolstói',
  'Vila União',
  'Jardim Planalto',
  'Sapopemba',
  'Fazenda da Juta',
  'São Mateus',
  'Jardim Colonial',

  // ViaMobilidade
  // Linha 5 - Lilás
  'Capão Redondo',
  'Campo Limpo',
  'Vila das Belezas',
  'Giovanni Gronchi',
  'Santo Amaro',
  'Largo Treze',
  'Adolfo Pinheiro',
  'Alto da Boa Vista',
  'Borba Gato',
  'Brooklin',
  'Campo Belo',
  'Eucaliptos',
  'Moema',
  'AACD - Servidor',
  'Hospital São Paulo',
  'Santa Cruz',
  'Chácara Klabin',

  // Linha 8 - Diamante
  'Júlio Prestes',
  'Palmeiras - Barra Funda',
  'Lapa',
  'Domingos de Moraes',
  'Imperatriz Leopoldina',
  'Presidente Altino',
  'Osasco',
  'Comandante Sampaio',
  'Quitaúna',
  'General Miguel Costa',
  'Carapicuíba',
  'Santa Terezinha',
  'Antônio João',
  'Barueri',
  'Jardim Belval',
  'Jardim Silveira',
  'Jandira',
  'Sagrado Coração',
  'Engenheiro Cardoso',
  'Itapevi',
  'Amador Bueno',

  // Linha 9 - Esmeralda
  'Osasco',
  'Presidente Altino',
  'Ceasa',
  'Villa Lobos - Jaguaré',
  'Cidade Universitária',
  'Pinheiros',
  'Hebraica - Rebouças',
  'Cidade Jardim',
  'Vila Olímpia',
  'Berrini',
  'Morumbi',
  'Granja Julieta',
  'Santo Amaro',
  'Socorro',
  'Jurubatuba',
  'Autódromo',
  'Interlagos', // 
  'Grajaú',
  'Mendes–Vila Natal',
  'Varginha', 

  // ViaQuatro
  // Linha 4 - Amarela
  //'Luz',
  'Consolação',
  'Higienópolis - Mackenzie',
  'Paulista - Pernambucanas', 
  'Oscar Freire',
  'Fradique Coutinho',
  'Faria Lima',
  //'Pinheiros',
  'Butantã',
  'São Paulo - Morumbi',
  'Vila Sônia - Professora Elisabeth Tenreiro'
];

export default function SearchScreen() {
  const [station, setStation] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

// Filtra as estações conforme o texto digitado, exibindo apenas as que começam exatamente com a sequência digitada (ignorando acentos)
const filteredStations = STATIONS.filter((s) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .startsWith(
      station
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    ) && station.length > 0
);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#ED1C24"
        translucent={false}
      />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Estações</Text>
      </View>

      {/* Content */}
      <View style={styles.container}>
        <Text style={styles.label}>Estação:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite a estação"
            placeholderTextColor="#888"
            value={station}
            onChangeText={text => {
              setStation(text);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            autoCorrect={false}
          />
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        </View>
        {/* Sugestões */}
        {showSuggestions && filteredStations.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={filteredStations}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => {
                    setStation(item);
                    setShowSuggestions(false);
                  }}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        )}
        <TouchableOpacity style={styles.button}>
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