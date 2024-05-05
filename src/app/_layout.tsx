import { useEffect } from 'react';

import { MealProvider } from '@/context/meal-context';
import { SplashScreen, Stack } from 'expo-router';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import '../../global.css';

SplashScreen.preventAutoHideAsync();

export default function LayoutRoot() {
  const [loadedFonts, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (error) {
      throw error;
    }

    if (loadedFonts) {
      SplashScreen.hideAsync();
    }
  }, [!loadedFonts && !error]);

  if (!loadedFonts) return null;

  return (
    <MealProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: '' }} />
        <Stack.Screen name="recipe/[id]" />
      </Stack>
    </MealProvider>
  );
}
