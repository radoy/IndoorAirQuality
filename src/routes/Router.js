/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomRouter from './BottomRouter';
import ApiDetailScreen from '../screens/ApiDetailScreen';
import AddChannelScreen from '../screens/ChannelScreen/add';
import UpdateChannelScreen from '../screens/ChannelScreen/update';

const Stack = createStackNavigator();
const Router = (props) => (
  <Stack.Navigator initialRouteName="SplashScreen">
    <Stack.Screen
      name="SplashScreen"
      component={SplashScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ApiDetailScreen"
      component={ApiDetailScreen}
      options={{
        title: 'Detail API',
      }}
    />
    <Stack.Screen
      name="HomeScreen"
      component={BottomRouter}
      options={{
        title: '',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="AddChannelScreen"
      component={AddChannelScreen}
      options={{
        title: 'Tambah Channel',
      }}
    />
    <Stack.Screen
      name="UpdateChannelScreen"
      component={UpdateChannelScreen}
      options={{
        title: 'Update Channel',
      }}
    />
  </Stack.Navigator>
);

export default Router;
