import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "@/components/Themed";
import { useRouter, useFocusEffect } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  fetchAtendimentos,
  deleteAtendimento,
} from "@/services/api-pcd";

type Atendimento = {
  id: string;
  created_at: string;
  station_id: number;
  blue: number;
  red: number;
  canDelete?: boolean;
  canRefresh?: boolean;
  highlighted?: boolean;
};

type AtendimentoGroup = {
  date: string;
  items: Atendimento[];
};

export default function AtendimentoScreen() {
  const [groups, setGroups] = useState<AtendimentoGroup[]>([]);
  const router = useRouter();
  const user_id = "d1b6f5a3-718f-4318-9710-86714041b65e";

  const loadAtendimentos = async () => {
    try {
      const res = await fetchAtendimentos(user_id);
      const data: Atendimento[] = res.data;
      const grouped: Record<string, Atendimento[]> = {};
      for (const a of data) {
        const date = new Date(a.created_at).toLocaleDateString("pt-BR");
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push({ ...a, canDelete: true });
      }
      const asGroups = Object.entries(grouped).map(([date, items]) => ({
        date,
        items,
      }));
      setGroups(asGroups);
    } catch (err) {
      console.error("Erro ao buscar atendimentos:", err);
    }
  };

  useEffect(() => {
    loadAtendimentos();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadAtendimentos(); // Atualiza ao voltar pra tela
    }, [])
  );

  const handleDelete = async (
    groupIdx: number,
    itemIdx: number,
    id: string
  ) => {
    try {
      await deleteAtendimento(id);
      await loadAtendimentos(); // Atualiza após deletar
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Atendimentos recentes</Text>

        {groups.map((group, groupIdx) => (
          <View key={group.date} style={{ marginBottom: 16 }}>
            <Text style={styles.date}>{group.date}</Text>
            {group.items.map((item, itemIdx) => (
              <View
                key={item.id}
                style={[styles.card, item.highlighted && styles.highlighted]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.timeStation}>
                    {new Date(item.created_at).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    - {item.station_id === 1 ? "Sé" : "Carandiru"}
                  </Text>

                  <View style={styles.badges}>
                    <View style={styles.badgeBlue}>
                      <Text style={styles.badgeText}>{item.blue}</Text>
                    </View>
                    {item.red > 0 && (
                      <View style={styles.badgeRed}>
                        <Text style={styles.badgeText}>{item.red}</Text>
                      </View>
                    )}
                  </View>
                </View>

                {item.canRefresh && (
                  <TouchableOpacity
                    onPress={() => console.log("REFRESH", item.id)}
                    style={{ marginHorizontal: 8 }}
                  >
                    <MaterialCommunityIcons
                      name="refresh"
                      size={20}
                      color="#222"
                    />
                  </TouchableOpacity>
                )}
                {item.canDelete && (
                  <TouchableOpacity
                    onPress={() => handleDelete(groupIdx, itemIdx, item.id)}
                  >
                    <FontAwesome name="trash" size={20} color="#E2001A" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        ))}

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/menu/novoAtendimentoPcd")}
          style={styles.newButton}
        >
          <Text style={styles.newButtonText}>Novo atendimento {">"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: "FrutigerLTStd-Bold",
    marginBottom: 16,
    color: "#222",
  },
  date: {
    fontSize: 18,
    fontFamily: "FrutigerLTStd-Bold",
    color: "#444",
    marginBottom: 8,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  highlighted: {
    backgroundColor: "#eee",
    borderColor: "#bbb",
  },
  timeStation: {
    fontSize: 16,
    fontFamily: "FrutigerLTStd-Roman",
    marginBottom: 6,
  },
  badges: {
    flexDirection: "row",
    gap: 6,
  },
  badgeBlue: {
    backgroundColor: "#1976D2",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 4,
  },
  badgeRed: {
    backgroundColor: "#F44336",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "FrutigerLTStd-Bold",
  },
  newButton: {
    marginTop: 32,
    borderWidth: 1,
    borderColor: "#E2001A",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  newButtonText: {
    color: "#E2001A",
    fontSize: 16,
    fontFamily: "FrutigerLTStd-Roman",
  },
});
