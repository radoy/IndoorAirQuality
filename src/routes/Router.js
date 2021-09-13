/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Alert, Button, Text, TouchableOpacity,
} from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomRouter from './BottomRouter';
import ApiDetailScreen from '../screens/ApiDetailScreen';
import AddChannelScreen from '../screens/ChannelScreen/add';
import UpdateChannelScreen from '../screens/ChannelScreen/update';
import ChartScreen from '../screens/ChartScreen';
import AddChartScreen from '../screens/AddChartScreen';
import Chart8Screen from '../screens/Chart8Screen';

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
    <Stack.Screen
      name="ChartScreen"
      component={ChartScreen}
      options={({ navigation, route }) => ({
        headerTitle: 'Chart Channel',
        headerRight: () => (
          <Button
            onPress={() => {
              navigation.navigate('AddChartScreen', {
                id: route.params.id,
                apiKey: route.params.apiKey,
              });
            }}
            title="Tambah"
            color="#000"
          />
        ),
      })}
    />
    <Stack.Screen
      name="Chart8Screen"
      component={Chart8Screen}
      options={({ navigation, route }) => ({
        headerTitle: 'Chart Channel (8)',
        headerRight: () => (
          <Button
            onPress={() => {
              navigation.navigate('AddChartScreen', {
                id: route.params.id,
                apiKey: route.params.apiKey,
              });
            }}
            title="Tambah"
            color="#000"
          />
        ),
      })}
    />
    <Stack.Screen
      name="AddChartScreen"
      component={AddChartScreen}
      options={{
        title: 'Tambah Data',
      }}
    />
  </Stack.Navigator>
);

export default Router;
