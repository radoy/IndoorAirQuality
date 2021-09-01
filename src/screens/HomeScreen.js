/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ASGet } from '../utils';

const HomeScreen = () => {
  const [token, setToken] = useState('');

  useEffect(async () => {
    setToken(await ASGet('token'));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Ini Home Screen</Text>
      <Text>
        Token:
        {' '}
        {token}
      </Text>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});
