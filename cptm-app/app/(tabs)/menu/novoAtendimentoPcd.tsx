import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import { Text } from "@/components/Themed";
import { useRouter } from "expo-router";
import { createAtendimento } from "@/services/api-pcd";

export default function NovoAtendimento() {
  const router = useRouter();
  const [station, setStation] = useState(1);
  const [observacoes, setObservacoes] = useState("");
  const user_id = "d1b6f5a3-718f-4318-9710-86714041b65e";

  const handleSubmit = async () => {
    try {
      await createAtendimento({
        user_id,
        station_id: station,
        observacoes,
        blue: 1,
        red: 0,
      });
      router.back();
    } catch (err) {
      console.error("Erro ao criar atendimento:", err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Estação:</Text>
        <TextInput
          style={styles.input}
          value={station.toString()}
          onChangeText={(t) => setStation(Number(t))}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Observações:</Text>
        <TextInput
          style={styles.input}
          value={observacoes}
          onChangeText={setObservacoes}
          multiline
        />

        <Text style={styles.label}>Data:</Text>
        <TextInput
          style={styles.input}
          value={new Date().toLocaleDateString('pt-BR')}
          editable={true}
        />

        <Text style={styles.label}>Horário:</Text>
        <TextInput
          style={styles.input}
          value={new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          editable={true}
          keyboardType="numeric"
          placeholder="HH:MM"
        />


        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    fontFamily: "FrutigerLTStd-Bold",
    color: "#333",
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: Platform.OS === "ios" ? 12 : 10,
    fontSize: 16,
    fontFamily: "FrutigerLTStd-Roman",
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#E2001A",
    marginTop: 32,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "FrutigerLTStd-Bold",
  },
});
