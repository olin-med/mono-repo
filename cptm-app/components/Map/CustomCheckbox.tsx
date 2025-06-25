import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface CustomCheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  color?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ value, onValueChange, color = '#f00' }) => {
  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      style={{
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value }}
    >
      {value ? (
        <Text style={{ color, fontSize: 18, fontWeight: 'bold', lineHeight: 22 }}>✓</Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default CustomCheckbox;
