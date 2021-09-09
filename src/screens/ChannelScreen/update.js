/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import {
  Alert, SafeAreaView, StyleSheet, View,
} from 'react-native';
import Button from '../../components/Button';
import Gap from '../../components/Gap';
import Input from '../../components/Input';
import { colorDanger } from '../../styles/colors';
import {
  ASGet, ASSet, showError, showSuccess,
} from '../../utils';

const UpdateChannelScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [api, setApi] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [index, setIndex] = useState(0);
  const [channelList, setChannelList] = useState([]);

  const saveData = async () => {
    setIsLoading(true);

    const data = {
      id: route.params.id, name, api, apiKey,
    };
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

  const deleteData = async () => {
    Alert.alert('Hapus Channel', 'Apakah anda yakin menghapus channel ini ?', [
      {
        text: 'Ya',
        onPress: async () => {
          setIsLoading(true);

          const currentData = [...channelList];
          currentData.splice(index, 1);

          await ASSet('channel', JSON.stringify(currentData))
            .then(() => {
              setChannelList(currentData);
              showSuccess('Data berhasil dihapus');

              navigation.navigate('ChannelScreen');
            })
            .catch((e) => {
              console.log('catch: ', e);
              showError(`Data gagal dihapus, dengan pesan: ${e.message}`);
            })
            .finally(() => {
              setIsLoading(false);
            });
        },
      },
      {
        text: 'Tidak',
        style: 'cancel',
      },
    ]);
  };

  useEffect(async () => {
    await ASGet('channel').then((response) => {
      if (response) {
        const data = JSON.parse(response);
        for (const i in data) {
          if (data[i].id === route.params.id) {
            setName(data[i].name);
            setApi(data[i].api);
            setApiKey(data[i].apiKey);
            setIndex(i);
            break;
          }
        }

        setChannelList(JSON.parse(response));
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
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
        <Input
          label="API Key"
          value={apiKey}
          onChangeText={(value) => {
            setApiKey(value);
          }}
        />
        <Gap height={20} />
        <Button
          title="Simpan"
          onPress={saveData}
          isLoading={isLoading}
        />
      </View>
      <Gap height={20} />
      <Button
        title="Hapus"
        onPress={deleteData}
        isLoading={isLoading}
        style={styles.buttonDelete}
      />
    </SafeAreaView>
  );
};

export default UpdateChannelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  buttonDelete: {
    backgroundColor: colorDanger,
  },
});
