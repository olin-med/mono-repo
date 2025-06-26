// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import 'react-native-reanimated';

export default function RootLayout() {

  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    'Frutiger-Bold': require('@/assets/fonts/FrutigerLTStd-Bold.otf'),
    'Frutiger-Roman': require('@/assets/fonts/FrutigerLTStd-Roman.otf'),
    'SpaceMono': require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="Estacao" options={{ headerShown: false, title: "Autenticação" }} />
        <Stack.Screen name="estacoes" options={{ headerShown: false, title: "Autenticação" }} />
        <Stack.Screen name="search" options={{ headerShown: false, title: "Autenticação" }} />
        <Stack.Screen name="+not-found" />
      </Stack>


      <StatusBar style="light" />
    </ThemeProvider>
  );
}
