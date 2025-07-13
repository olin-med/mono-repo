import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Image } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "Frutiger-Bold": require("@/assets/fonts/FrutigerLTStd-Bold.otf"),
    "Frutiger-Roman": require("@/assets/fonts/FrutigerLTStd-Roman.otf"),
    "SpaceMono": require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{
        headerTitleAlign: 'left',
        headerStyle: { backgroundColor: '#E2001A'},
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold', color: '#fff' },
        contentStyle: { backgroundColor: '#F9F9F9' },
      }}>
        <Stack.Screen name="faleConosco" options={{ title: "Fale Conosco" }} />
        <Stack.Screen name="missaoValores" options={{ title: "Missão e Valores" }} />
        <Stack.Screen name="tarifas" options={{ title: "Tarifas" }} />
        <Stack.Screen name="termosdeuso" options={{ title: "Termos de uso" }} />
        <Stack.Screen name="index" options={{ title: "Menu" }} />
        <Stack.Screen name="atendimentoPcd" options={{ title: "Acessibilidade" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
       