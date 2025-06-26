import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';

interface ImagePickerProps {
  onImageSelected: (uri: string | null) => void;
}

export const ImagePickerComponent: React.FC<ImagePickerProps> = ({ onImageSelected }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImageUri(null);
    onImageSelected(null);
  };

  return (
    <View style={styles.container}>
      {!imageUri ? (
        <TouchableOpacity style={styles.uploadArea} onPress={pickImage}>
          <Feather name="upload" size={32} color="#999" style={styles.icon} />
          <Text style={styles.uploadText}>Adicionar imagem</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.imagePreview}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
            <Feather name="x" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    alignItems: 'center',
  },
  uploadArea: {
    width: '100%',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 15,
    color: '#666',
  },
  imagePreview: {
    position: 'relative',
    width: 180,
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#373737',
    borderRadius: 16,
    padding: 4,
    zIndex: 1,
  },
});