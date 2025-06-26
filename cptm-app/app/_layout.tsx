import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import 'react-native-reanimated';

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
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerTitle: () => (
                  <Image
                    source={require('@/assets/images/logo.png')} // use .png ou .jpg aqui
                    style={{ width: 32, height: 32, resizeMode: 'contain' }}
                  />
                ),
                headerBackVisible: false,
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#E2001A' },
                headerTintColor: 'white',
                headerTitleStyle: { fontWeight: 'bold', color: '#fff' },
                contentStyle: { backgroundColor: '#F9F9F9' }, title: "Menu" }} />
        <Stack.Screen name="login/Login" options={{ headerShown: false, title: "Autenticação" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
