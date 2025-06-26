import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SubmitButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onPress, title, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabled : styles.enabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  enabled: {
    backgroundColor: '#373737',
  },
  disabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});