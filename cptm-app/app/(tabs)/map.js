import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions
  } from 'react-native';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ResumableZoom } from 'react-native-zoom-toolkit';
import CustomCheckbox from '../../components/Map/CustomCheckbox';
import { router, useLocalSearchParams } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';

import * as estacoes from "../../estacoes.json";



const CONTENT_WIDTH = 2300;
const CONTENT_HEIGHT = 2037;

export default function App() {
  const { width: windowWidth } = Dimensions.get('window');
  const mapRatio = CONTENT_HEIGHT / CONTENT_WIDTH;
  const scaledWidth = windowWidth;
  const scaledHeight = windowWidth * mapRatio;

  const [de, setDe] = useState(null);
  const [para, setPara] = useState(null);
  const [deOpen, setDeOpen] = useState(false);
  const [paraOpen, setParaOpen] = useState(false);

  const [items, setItems] = useState(
    Object.entries(estacoes).map(([nome, data]) => ({
      label: nome,
      value: nome,
    }))
  );

  const [lines, setLines] = useState([
    { name: "1 - Azul", show: true, src: require('../../assets/map/Linha_1.png') },
    { name: "2 - Verde", show: true, src: require('../../assets/map/Linha_2.png') },
    { name: "3 - Vermelha", show: true, src: require('../../assets/map/Linha_3.png') },
    { name: "4 - Amarela", show: true, src: require('../../assets/map/Linha_4.png') },
    { name: "5 - Lilás", show: true, src: require('../../assets/map/Linha_5.png') },
    { name: "7 - Rubi", show: true, src: require('../../assets/map/Linha_7.png') },
    { name: "8 - Diamante", show: true, src: require('../../assets/map/Linha_8.png') },
    { name: "9 - Esmeralda", show: true, src: require('../../assets/map/Linha_9.png') },
    { name: "10 - Turquesa", show: true, src: require('../../assets/map/Linha_10.png') },
    { name: "11 - Coral", show: true, src: require('../../assets/map/Linha_11.png') },
    { name: "12 - Safira", show: true, src: require('../../assets/map/Linha_12.png') },
    { name: "13 - Jade", show: true, src: require('../../assets/map/Linha_13.png') },
    { name: "15 - Prata", show: true, src: require('../../assets/map/Linha_15.png') },
    { name: "Serviços", show: true, src: require('../../assets/map/Serviços.png') },
  ]);

  const mid = Math.ceil(lines.length / 2);
  const leftColumn = lines.slice(0, mid);
  const rightColumn = lines.slice(mid);

  const changeScreen = () => {
    if (de === "Selecione a estação" || para === "Selecione a estação" || de === para || de == null || para ==null) {
      alert("Por favor, selecione as estações de ida e chegada.");
      return;
    }
    router.push({pathname : "../map/caminho", params: { de_nome: de, para_nome: para}});
  }


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.topButtonContainer}>
        <DropDownPicker
        open={deOpen}
        value={de}
        items={items}
        setOpen={setDeOpen}
        setValue={setDe}
        setItems={setItems}
        searchable={true}
        placeholder="Em qual estação você está?"
        listMode="MODAL"
        onOpen={() => {
        setItems(prev =>
          prev.filter(item => item.value.toLowerCase() !== "default")
            );
          }}
        />
        <DropDownPicker
        open={paraOpen}
        value={para}
        items={items}
        setOpen={setParaOpen}
        setValue={setPara}
        setItems={setItems}
        searchable={true}
        placeholder="Para qual estação você quer ir?"
        listMode="MODAL"
        onOpen={() => {
        setItems(prev =>
          prev.filter(item => item.value.toLowerCase() !== "default")
            );
          }}
        />
        <TouchableOpacity onPress={changeScreen} style={[styles.button, styles.showAllButton]}>
          <Text style={styles.buttonText}>Traçar Rota</Text>
        </TouchableOpacity>
      </View>
      
      <GestureHandlerRootView style={{ flex: 1, marginBottom: 135 }}>
        <View style={[styles.mapWrapper, { height: scaledHeight }]}>
          <ResumableZoom
            minScale={1}
            maxScale={4}
            initialScale={1}
            contentWidth={scaledWidth}
            contentHeight={scaledHeight}
            style={{ width: scaledWidth, height: scaledHeight }}
          >
            <View style={{ width: scaledWidth, height: scaledHeight }}>
              {lines.map((line) =>
                line.show ? (
                  <Image
                    key={line.name}
                    source={line.src}
                    style={[styles.mapLayer, { width: scaledWidth, height: scaledHeight }]}
                    resizeMode="contain"
                  />
                ) : null
              )}
            </View>
          </ResumableZoom>
        </View>
      </GestureHandlerRootView>

      <View style={styles.controlsContainer}>
        <ScrollView style={styles.buttonsScrollView}>
          <View style={styles.buttonsWrapper}>
            <View style={styles.buttonContainer}>
              <View style={styles.toggleButtonsContainer}>
                <TouchableOpacity
                  onPress={() => setLines(prev => prev.map(l => ({ ...l, show: true })))}
                  style={[styles.button, styles.showAllButton]}
                >
                  <Text style={styles.buttonText}>Mostrar Todas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setLines(prev => prev.map(l => ({ ...l, show: false })))}
                  style={[styles.button, styles.hideAllButton]}
                >
                  <Text style={[styles.buttonText, styles.hideAllButtonText]}>Ocultar Todas</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.checkboxColumns}>
                <View style={styles.checkboxColumn}>
                  {leftColumn.map((line) => (
                    <View key={line.name} style={styles.checkboxRow}>
                      <CustomCheckbox
                        value={line.show}
                        onValueChange={() =>
                          setLines(prev =>
                            prev.map(l =>
                              l.name === line.name ? { ...l, show: !l.show } : l
                            )
                          )
                        }
                        color="#f00"
                      />
                      <Text style={styles.lineNameText}>{line.name}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.checkboxColumn}>
                  {rightColumn.map((line) => (
                    <View key={line.name} style={styles.checkboxRow}>
                      <CustomCheckbox
                        value={line.show}
                        onValueChange={() =>
                          setLines(prev =>
                            prev.map(l =>
                              l.name === line.name ? { ...l, show: !l.show } : l
                            )
                          )
                        }
                        color="#E2001A"
                      />
                      <Text style={styles.lineNameText}>{line.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#fff',
  },
  topButtonContainer: {
    paddingTop: 40,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    paddingHorizontal:32,
    paddingVertical: 10,
    gap: 8,
  },
  routeButton: {
    borderColor: "black", 
    borderWidth: 2, 
    padding: 10, 
    borderRadius: 5, 
    width: "50%", 
    alignItems: "center"
  },
  routeButtonText: {
    color: '#000', 
    fontSize: 16
  },
  mapWrapper: {
    width: '100%',
    overflow: 'hidden',
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  mapLayer: {
    position: 'absolute',
    top: -35,
    left: 0,
    
  },
  controlsContainer: {
    flex: 1,
    width: '100%',
  },
  buttonsScrollView: {
    width: '100%',
  },
  buttonsWrapper: {
    width: '100%',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    padding: 10,
  },
  toggleButtonsContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    width: '100%',
    marginBottom: 10
  },
  checkboxColumns: {
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'center'
  },
  checkboxColumn: {
    flex: 1, 
    alignItems: 'flex-start', 
    paddingHorizontal: 20,
    paddingBottom: 30
  },
  checkboxRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    margin: 5
  },
  lineNameText: {
    marginLeft: 8, 
    textAlign: 'left'
  },
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  showAllButton: {
    backgroundColor: '#f00', 
    borderColor: '#f00', 
    borderWidth: 3
  },
  hideAllButton: {
    backgroundColor: '#fff', 
    borderColor: '#f00', 
    borderWidth: 3, 
    marginLeft: 10
  },
  buttonText: {
    color: '#fff',
  },
  hideAllButtonText: {
    color: '#f00'
  },
});