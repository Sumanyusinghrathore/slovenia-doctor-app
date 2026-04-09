import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';

import MainStack from './src/routes/MainStack';
import AppContext from './src/context/AppContext';
import { COLORS, FONTS } from './src/constants';

function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider
        placement="bottom"
        duration={3000}
        animationType="zoom-in"
        successColor="#55BB62"
        normalColor={COLORS.secondary}
        textStyle={{
          color: COLORS.white,
          fontFamily: FONTS.AxiformaMedium,
        }}
      >
        <AppContext>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={COLORS.white}
          />
          <MainStack />
        </AppContext>
      </ToastProvider>
    </SafeAreaProvider>
  );
}

export default App;
