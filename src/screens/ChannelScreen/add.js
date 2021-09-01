/* eslint-disable react/jsx-filename-extension */
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../components/Button';
import Gap from '../../components/Gap';
import Input from '../../components/Input';
import {
  ASGet, ASSet, showError, showSuccess,
} from '../../utils';

const AddChannelScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [api, setApi] = useState('');
  const [channelList, setChannelList] = useState([]);

  const saveData = async () => {
    setIsLoading(true);

    let data = [{ id: Date.now(), name, api }];
    if (channelList !== null) {
      data = [...channelList, ...data];
    }

    await ASSet('channel', JSON.stringify(data))
      .then(() => {
        setChannelList(data);
        showSuccess('Data berhasil disimpan');
        navigation.navigate('ChannelScreen');
      })
      .catch((e) => {
        console.log('catch error: ', e);
        showError(`Data gagal disimpan, dengan pesan: ${e.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(async () => {
    // await ASSet('channel', []);
    await ASGet('channel').then((response) => {
      console.log('local storage: ', response);
      setChannelList(JSON.parse(response));
    });
  }, []);

  return (
    <View style={styles.container}>
      <Gap height={40} />
      <Input
        label="Nama channel"
        value={name}
        onChangeText={(value) => {
          setName(value);
        }}
      />
      <Gap height={20} />
      <Input
        label="Alamat API"
        value={api}
        onChangeText={(value) => {
          setApi(value);
        }}
      />
      <Gap height={20} />
      <Button
        title="Simpan"
        onPress={saveData}
        isLoading={isLoading}
      />
    </View>
  );
};

export default AddChannelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
