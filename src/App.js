/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import Router from './routes/Router';

const App = () => (
  <>
    <NavigationContainer>
      <Router />
    </NavigationContainer>
    <FlashMessage position="top" />
  </>
);

export default App;
