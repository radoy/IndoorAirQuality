/* eslint-disable react/jsx-filename-extension */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { API_BASE_URL } from '../config';
import ApiItem from '../components/ApiItem';
import Indicator from '../components/Indicator';

const ApiScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const renderItem = ({ item }) => (
    <ApiItem
      item={item}
      onPress={() => {
        navigation.navigate('ApiDetailScreen', {
          id: item.id,
        });
      }}
    />
  );

  const getData = async () => {
    await axios.get(`${API_BASE_URL}users?page=1`)
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

  useEffect(() => { getData(); }, []);

  if (isLoading === true) {
    return <Indicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataSource}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default ApiScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
