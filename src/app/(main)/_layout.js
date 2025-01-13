import { Stack } from 'expo-router/stack';

import { darkColors } from '../../styles/colors';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: darkColors.backgroundColorPrimary,
        },
        headerTintColor: darkColors.textColorPrimary,
        headerShadowVisible: false,
      }}
    />
  );
}
