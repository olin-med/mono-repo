import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  LogBox
} from 'react-native';
import { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ResumableZoom } from 'react-native-zoom-toolkit';
import estacoesPos from '../../estacoes.json';
import { router, useLocalSearchParams } from 'expo-router';

import TravelInfoBox from '../../components/Map/TravelInfoBox';

const CONTENT_WIDTH = 2300;
const CONTENT_HEIGHT = 2037;

export default function Caminho() {
  const { width: windowWidth } = Dimensions.get('window');
  const mapRatio = CONTENT_HEIGHT / CONTENT_WIDTH;
  const scaledWidth = windowWidth;
  const scaledHeight = windowWidth * mapRatio;
  const { de_nome, para_nome } = useLocalSearchParams();

  LogBox.ignoreAllLogs(true);

  const [lines, setLines] = useState([
    { name: "Azul", show: false, src: require('../../assets/map/Linha_1.png') },
    { name: "Verde", show: false, src: require('../../assets/map/Linha_2.png') },
    { name: "Vermelha", show: false, src: require('../../assets/map/Linha_3.png') },
    { name: "Amarela", show: false, src: require('../../assets/map/Linha_4.png') },
    { name: "Lilás", show: false, src: require('../../assets/map/Linha_5.png') },
    { name: "Rubi", show: false, src: require('../../assets/map/Linha_7.png') },
    { name: "Diamante", show: false, src: require('../../assets/map/Linha_8.png') },
    { name: "Esmeralda", show: false, src: require('../../assets/map/Linha_9.png') },
    { name: "Turquesa", show: false, src: require('../../assets/map/Linha_10.png') },
    { name: "Coral", show: false, src: require('../../assets/map/Linha_11.png') },
    { name: "Safira", show: false, src: require('../../assets/map/Linha_12.png') },
    { name: "Jade", show: false, src: require('../../assets/map/Linha_13.png') },
    { name: "Prata", show: false, src: require('../../assets/map/Linha_15.png') },
    { name: "Serviços", show: false, src: require('../../assets/map/Serviços.png') },
  ]);

  const icons = [require('../../assets/map/start.png'), require('../../assets/map/mid.png'), require('../../assets/map/end.png')];

  const [caminho, setCaminho] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCaminho(de, para) {
      try {
        setLoading(true);
        let ca = [];
        let minLinhas = 99999;
        
        for (const d in de) {
          for (const p in para) {
            const req = await fetch(`https://api.cptm.sp.gov.br/appcptm/v1/Estacoes/CaminhoMaisCurto?origem=${de[d]}&destino=${para[p]}`);
            const data = await req.json();
            let linhas = [...new Set(data.map(estacao => estacao.linhaNome))];
            if (linhas.length < minLinhas) {
              minLinhas = linhas.length;
              ca = data;
            }
          }
        }
        const updatedLines = [...lines];
        for (let i = 0; i < ca.length; i++) {
          const l = ca[i]["linhaNome"].split(' ')[2];
          const lineIndex = updatedLines.findIndex(line => line.name === l);
          if (lineIndex !== -1) {
            updatedLines[lineIndex].show = true;
          }
        }

        setLines(updatedLines);
        setCaminho(ca);
      } catch (error) {
        console.error("Error fetching path:", error);
      } finally {
        setLoading(false);
      }
    }

    const de_id = estacoesPos[de_nome]["id"];
    const para_id = estacoesPos[para_nome]["id"];
    fetchCaminho(de_id, para_id);
  }, [de_nome, para_nome]);

  if (loading || !caminho) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Calculando melhor rota...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapWrapper}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ResumableZoom
            style={{ flex: 1 }}
            minScale={1}
            maxScale={4}
            initialScale={1}
            contentWidth={scaledWidth}
            contentHeight={scaledHeight}
          >
            <View
              style={[
                styles.mapContainer,
                { width: scaledWidth, height: scaledHeight },
              ]}
            >
              {lines.map((line) =>
                line.show ? (
                  <Image
                    key={line.name}
                    source={line.src}
                    style={styles.mapLayer}
                    resizeMode="contain"
                  />
                ) : null
              )}
              {caminho.map((estacao) => {
                const stationKey = estacao.estacao;
                const stationPos = estacoesPos[stationKey];
                
                if (!stationPos) {
                  console.warn(`Station position not found for: ${estacao.estacao}`);
                  return null;
                }

                const iconIndex = estacao.ordem === 0 ? 0 : 
                                (estacao.ordem === caminho.length - 1 ? 2 : 1);

                return (
                  <Image
                    key={estacao.ordem}
                    source={icons[iconIndex]}
                    style={{
                      position: 'absolute',
                      top: stationPos.y * scaledHeight / CONTENT_HEIGHT,
                      left: stationPos.x * scaledWidth / CONTENT_WIDTH,
                      width: 40 * scaledWidth / CONTENT_WIDTH,
                      height: 40 * scaledHeight / CONTENT_HEIGHT,
                    }}
                  />
                );
              })}
            </View>
          </ResumableZoom>
        </GestureHandlerRootView>
      </View>

      <TravelInfoBox caminho={caminho} />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  header: {
    width: '100%',
    backgroundColor: '#E2001A',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    zIndex: 10,
    elevation: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
  },
  mapWrapper: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  mapContainer: {
    position: 'relative',
  },
  mapLayer: {
    position: 'absolute',
    width: '100%',
    height: undefined,
    aspectRatio: CONTENT_WIDTH / CONTENT_HEIGHT,
  },
  buttonsWrapper: {
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
  },
});