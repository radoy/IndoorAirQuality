/* eslint-disable react/jsx-filename-extension */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Alert, StyleSheet, Text, View,
} from 'react-native';
import Button from '../components/Button';
import { ASSet } from '../utils';

const AccountScreen = ({ navigation }) => {
  const logout = async () => {
    Alert.alert('Logout', 'Apakah anda yakin untuk keluar ?', [
      {
        text: 'Ya',
        onPress: async () => {
          AsyncStorage.removeItem('token')
            .then(() => {
              navigation.replace('LoginScreen');
            });
        },
      },
      {
        text: 'Tidak', style: 'cancel',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text>Ini Akun Saya</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});
