import { ThemeProvider } from '@rneui/themed';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '../redux/store';
import { darkTheme } from '../styles/themes';

export default function Layout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={darkTheme}>
          <StatusBar style="light" />
          <Slot />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
