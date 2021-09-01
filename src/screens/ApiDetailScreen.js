/* eslint-disable react/jsx-filename-extension */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView, StyleSheet, Text, View,
} from 'react-native';
import FoIcon from 'react-native-vector-icons/Fontisto';
import Gap from '../components/Gap';
import Indicator from '../components/Indicator';
import { API_BASE_URL } from '../config';

const ApiDetailScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const getData = async () => {
    await axios.get(`${API_BASE_URL}users/${route.params.id}`)
      .then((response) => {
        if (response && response.data.data) {
          setDataSource(response.data.data);
        }
      })
      .catch((response) => {
        console.log('error', response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading === true) {
    return <Indicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{ uri: dataSource.avatar }} />
      <Gap height={35} />
      <View style={styles.content}>
        <Text style={styles.name}>
          {dataSource.first_name}
          {' '}
          {dataSource.last_name}
        </Text>
      </View>
      <Gap height={15} />
      <View style={styles.content}>
        <FoIcon name="email" size={20} />
        <Text style={styles.email}>
          {dataSource.email}
        </Text>
      </View>
      <Gap height={90} />
    </SafeAreaView>
  );
};

export default ApiDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },

});
