/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { logo } from '../assets/images';
import { API_BASE_URL, APP_NAME, APP_VERSION } from '../config';
import Gap from '../components/Gap';
import Input from '../components/Input';
import Button from '../components/Button';
import { ASSet } from '../utils';
import { colorLabel } from '../styles/colors';

const LoginScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');

  const login = async () => {
    setIsLoading(true);

    const form = {
      email: username,
      password,
    };

    await axios.post(`${API_BASE_URL}login`, form).then((response) => {
      if (response && response.status === 200) {
        if (response.data.token) {
          // Simpan token ke local
          ASSet('token', response.data.token);
          navigation.replace('HomeScreen');
        }
      }
    }).catch((error) => {
      Alert.alert('Login gagal', 'Username atau password salah');
    }).finally(() => {
      setIsLoading(false);
    });
  };

  return (

    <SafeAreaView style={styles.container}>
      <Gap height={70} />
      <Image source={logo} style={styles.image} />
      <Gap height={20} />
      <Text style={styles.title}>{APP_NAME}</Text>
      <Gap height={50} />
      <Input
        label="Username"
        icon="user"
        value={username}
        onChangeText={(value) => {
          setUsername(value);
        }}
      />
      <Gap height={20} />
      <Input
        label="Password"
        icon="lock"
        secureTextEntry
        value={password}
        onChangeText={(value) => {
          setPassword(value);
        }}
      />
      <Gap height={20} />
      <Button title="LOGIN" onPress={login} isLoading={isLoading} />
      <Gap height={15} />
      <TouchableOpacity onPress={() => {
        Alert.alert('Informasi Login',
          'Untuk informasi username dan password, silahkan hubungi kami');
      }}
      >
        <Text style={styles.label}>Butuh bantuan login?</Text>
      </TouchableOpacity>
      <Gap height={10} />
      <Text>
        Versi
        {' '}
        {APP_VERSION}
      </Text>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
  },
  label: {
    color: colorLabel,
  },
});
