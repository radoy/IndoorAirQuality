/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../components/Button';
import Gap from '../../components/Gap';
import Input from '../../components/Input';
import {
  ASGet, ASSet, showError, showSuccess,
} from '../../utils';

const UpdateChannelScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [api, setApi] = useState('');
  //   const [id, setId] = useState(0);
  const [index, setIndex] = useState(0);
  const [channelList, setChannelList] = useState([]);

  const saveData = async () => {
    setIsLoading(true);

    const data = { id: route.params.id, name, api };
    const currentData = [...channelList];
    currentData[index] = data;

    await ASSet('channel', JSON.stringify(currentData))
      .then(() => {
        setChannelList(currentData);
        showSuccess('Data berhasil disimpan');

        navigation.navigate('ChannelScreen');
      })
      .catch((e) => {
        console.log('catch: ', e);
        showError(`Data gagal disimpan, dengan pesan: ${e.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(async () => {
    await ASGet('channel').then((response) => {
      if (response) {
        const data = JSON.parse(response);
        for (const i in data) {
          if (data[i].id === route.params.id) {
            setName(data[i].name);
            setApi(data[i].api);
            setIndex(i);
            break;
          }
        }

        setChannelList(JSON.parse(response));
      }
    });

    // setId(route.params.id);
    // setName(route.params.name);
    // setApi(route.params.api);
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

export default UpdateChannelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
