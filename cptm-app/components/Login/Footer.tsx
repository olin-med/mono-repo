import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface FooterProps {
  onPress: () => void;
  activeIndex: number;
}

const Footer: React.FC<FooterProps> = ({ onPress, activeIndex }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dots}>
        <View style={[styles.dot, activeIndex === 0 && styles.activeDot]} />
        <View style={[styles.dot, activeIndex === 1 && styles.activeDot]} />
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name="arrow-right" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF8A80',
    marginHorizontal: 4,
    opacity: 0.5,
  },
  activeDot: {
    opacity: 1,
  },
  button: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 50,
  },
});
