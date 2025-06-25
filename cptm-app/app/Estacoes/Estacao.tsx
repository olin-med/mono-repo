import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';



const Estacao: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Mapa (placeholder) */}
      <View style={styles.mapContainer}>
        <Image 
          source={require('@/assets/images/mapa-estacao.png')} 
          style={styles.mapImage} 
          resizeMode="cover" // Para cubrir todo el contenedor
        />
    </View>

      {/* Botones principales */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.sosButton]}>
          <Text style={styles.sosButtonText}>SOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.routesButton]}>
         <Text style={styles.routesButtonText}>Rotas</Text>
        </TouchableOpacity>
     
      </View>

      {/* Próximo trem */}
      <View style={styles.nextTrainContainer}>
        <Text style={styles.sectionTitle}>Próximo trem</Text>

        <View style={styles.trainRow}>
          <View style={[styles.colorBar, { backgroundColor: '#4CAF50' }]} />
          <View style={styles.trainInfo}>
            <Text>13 - Jade:</Text>
            <Text style={styles.trainRoute}>AEROPORTO - GUARULHOS</Text>
          </View>
          <Text style={styles.trainTime}>2 min</Text>
        </View>

        <View style={styles.trainRow}>
          <View style={[styles.colorBar, { backgroundColor: '#1A237E' }]} />
          <View style={styles.trainInfo}>
            <Text>12 - Safira:</Text>
            <Text style={styles.trainRoute}>CALMON VIANA</Text>
          </View>
          <Text style={styles.trainTime}>00:57</Text>
        </View>

        <View style={styles.trainRow}>
          <View style={[styles.colorBar, { backgroundColor: '#1A237E' }]} />
          <View style={styles.trainInfo}>
            <Text>12 - Safira:</Text>
            <Text style={styles.trainRoute}>BRÁS</Text>
          </View>
          <Text style={styles.trainTime}>15 min</Text>
        </View>
      </View>

      {/* Serviços */}
      <View style={styles.servicesContainer}>
        <Text style={styles.sectionTitle}>Serviços</Text>

        <View style={styles.serviceRow}>
          <View style={styles.serviceItem}>
            <View style={styles.serviceIconPlaceholder}>
              <Image source={require('@/assets/images/logo-alimentacao-estacao.png')} style={styles.serviceIconImage} />
            </View>
            <Text>Alimentação</Text>
          </View>

          <View style={styles.serviceItem}>
            <View style={styles.serviceIconPlaceholder}>
              <Image source={require('@/assets/images/logo-farmacia-estacao.png')} style={styles.serviceIconImage} />
            </View>
            <Text>Farmácia</Text>
          </View>
        </View>

        <View style={styles.serviceRow}>
          <View style={styles.serviceItem}>
            <View style={styles.serviceIconPlaceholder}>
              <Image source={require('@/assets/images/logo-vestuario-estacao.png')} style={styles.serviceIconImage} />
            </View>
            <Text>Vestuário</Text>
          </View>

          <View style={styles.serviceItem}>
            <View style={styles.serviceIconPlaceholder}>
              <Image source={require('@/assets/images/logo-acessibilidade-estacao.png')} style={styles.serviceIconImage} />
            </View>
            <Text>Acessibilidade</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'white',
  },
  mapContainer: {
    height: 250,
    backgroundColor: '#ddd',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  mapPlaceholder: {
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  routesButton: {
    backgroundColor: '#5A5D7D',
  },
  sosButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,            
    borderColor: '#6C6D70',
  },
    sosButtonText: {
    fontWeight: 'bold',
    color: '#6C6D70',  // texto gris oscuro para SOS
  },
  routesButtonText: {
    fontWeight: '600',
    color: 'white',    // texto blanco para Rotas
  },
  nextTrainContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  trainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  colorBar: {
    width: 6,
    height: 50,
    borderRadius: 4,
    marginRight: 12,
  },
  trainInfo: {
    flex: 1,
  },
  trainRoute: {
    fontSize: 12,
    color: '#666',
  },
  trainTime: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  servicesContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
     
    
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 130,
  },
  serviceIconPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffcccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  serviceIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  mapImage: {
  width: '100%',
  height: '100%',
  borderRadius: 12, // si quieres que la imagen mantenga el borde redondeado
},

});

export default Estacao;
