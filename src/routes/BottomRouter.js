/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import { colorPrimary } from '../styles/colors';
import AccountScreen from '../screens/AccountScreen';
import ApiScreen from '../screens/ApiScreen';
import ChannelScreen from '../screens/ChannelScreen/index';

const BottomTab = createBottomTabNavigator();
const BottomRouter = () => (
  <BottomTab.Navigator
    initialRouteName="HomeScreen"
    tabBarOptions={{
      activeTintColor: colorPrimary,
    }}
  >
    <BottomTab.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Beranda',
        tabBarIcon: ({ color }) => (
          <FaIcon name="home" size={27} color={color} />
        ),
      }}
    />
    <BottomTab.Screen
      name="ApiScreen"
      component={ApiScreen}
      options={{
        tabBarLabel: 'API',
        tabBarIcon: ({ color }) => (
          <FaIcon name="signal" size={27} color={color} />
        ),
      }}
    />
    <BottomTab.Screen
      name="ChannelScreen"
      component={ChannelScreen}
      options={{
        tabBarLabel: 'Channel',
        tabBarIcon: ({ color }) => (
          <FaIcon name="globe" size={27} color={color} />
        ),
      }}
    />
    <BottomTab.Screen
      name="AccountScreen"
      component={AccountScreen}
      options={{
        tabBarLabel: 'Akun Saya',
        tabBarIcon: ({ color }) => (
          <FaIcon name="user" size={27} color={color} />
        ),
      }}
    />
  </BottomTab.Navigator>
);

export default BottomRouter;
