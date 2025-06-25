import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const TrainIllustration: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/trem.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default TrainIllustration;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: '90%',
    height: 200,
  },
});
