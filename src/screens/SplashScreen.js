/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  ActivityIndicator,
  Image, StyleSheet, Text, View,
} from 'react-native';
import { logo } from '../assets/images/index';
import { colorPrimary } from '../styles/colors';
import { APP_VERSION } from '../config';
import Gap from '../components/Gap';
import { ASGet } from '../utils';

const SplashScreen = ({ navigation }) => {
  setTimeout(async () => {
    const token = await ASGet('token');

    // User sudah login
    if (token != null) {
      navigation.replace('HomeScreen');
    } else {
      navigation.replace('LoginScreen');
    }
  }, 2230);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Gap height={15} />
      <Text>Sedang memuat, silahkan menunggu...</Text>
      <Gap height={15} />
      <ActivityIndicator size="large" color={colorPrimary} />
      <Gap height={15} />
      <Text>
        Versi
        {' '}
        {APP_VERSION}
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 128,
    height: 128,
    resizeMode: 'contain',
  },
});
