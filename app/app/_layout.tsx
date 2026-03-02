import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { SubscriptionProvider } from '@/context/SubscriptionContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SubscriptionProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="paywall" />
          <Stack.Screen name="meditations" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SubscriptionProvider>
  );
}
