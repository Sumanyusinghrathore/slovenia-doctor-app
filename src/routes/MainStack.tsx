import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';

import { navigationRef } from './RootNavigation';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import Loader from '../components/Loader/Loader';
import { navigationStateType, useApp } from '../context/AppContext';

const MainStack = () => {
  const { navigationState } = useApp();

  const queryClientRef = useRef<QueryClient | null>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const renderStack = () => {
    switch (navigationState) {
      case navigationStateType.WELCOME:
        return <AuthStack />;

      case navigationStateType.AUTH:
        return <AuthStack />;

      case navigationStateType.HOME:
        return <HomeStack />;

      default:
        return <Loader />;
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <QueryClientProvider client={queryClientRef.current!}>
        {renderStack()}
      </QueryClientProvider>
    </NavigationContainer>
  );
};


export default MainStack;
