/* eslint-disable react/jsx-filename-extension */
import axios from 'axios';
import React, { useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text, View,
} from 'react-native';
import Button from '../components/Button';
import Gap from '../components/Gap';
import Input from '../components/Input';
import { API_THING_SPEAK } from '../config';
import { showError, showSuccess } from '../utils';

const AddChartScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');

  const saveData = async () => {
    setIsLoading(true);

    await axios.get(`${API_THING_SPEAK}?api_key=${route.params.apiKey}&field${route.params.id}=${value}`)
      .then((response) => {
        if (response && response.data[`field${route.params.id}`]) {
          showSuccess('Data berhasil dikirim');
          navigation.navigate('ChartScreen');
        }
      })
      .catch((response) => {
        showError('Data gagal dikirim, dengan pesan: ', response.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Gap height={40} />
      <Input
        label="Nilai"
        value={value}
        onChangeText={(value) => {
          setValue(value);
        }}
      />
      <Gap height={20} />
      <Button
        title="Simpan"
        onPress={saveData}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
};

export default AddChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
