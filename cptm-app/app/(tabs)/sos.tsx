import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DropdownMotivo } from '@/components/Ocorrencia/dropdownMotivo';
import { DropdownEstacao } from '@/components/Ocorrencia/dropdownEstacao';
import { ImagePickerComponent } from '@/components/Ocorrencia/imagePicker';
import { SubmitButton } from '@/components/Ocorrencia/submitButton';
import { PopupSuccess } from '@/components/Ocorrencia/popup';
import { OcorrenciaFormData } from '@/types/ocorrencia';

export const RegistrarOcorrencia: React.FC = () => {
  const [formData, setFormData] = useState<OcorrenciaFormData>({
    motivo: undefined,
    estacao: undefined,
    fotoUri: undefined,
    linha: 'Carnegie-vine line',
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = () => {
    console.log('Dados da ocorrência:', formData);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const isFormValid = formData.motivo && formData.estacao;

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registrar Ocorrência</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Motivo</Text>
          <DropdownMotivo
            onSelect={(motivo) => setFormData({ ...formData, motivo })}
            selectedMotivo={formData.motivo}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estação</Text>
          <DropdownEstacao
            onSelect={(estacao) => setFormData({ ...formData, estacao })}
            selectedEstacao={formData.estacao}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Foto</Text>
          <ImagePickerComponent
            onImageSelected={(uri) => setFormData({ ...formData, fotoUri: uri ?? undefined })}
          />
        </View>

        <View style={styles.divider} />

        <Text style={styles.linhaText}>{formData.linha}</Text>

        <SubmitButton
          title="Enviar"
          onPress={handleSubmit}
          disabled={!isFormValid}
        />
      </ScrollView>

      <PopupSuccess
        visible={showPopup}
        onClose={handleClosePopup}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 48,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold', // negrito
    textAlign: 'center', // centralizado
    marginBottom: 24,
    color: '#1A1A1A',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 24,
  },
  linhaText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#777777',
    marginBottom: 20,
    textAlign: 'left',
  },
});