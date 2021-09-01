/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import {
  FlatList, SafeAreaView, StyleSheet, Text, View,
} from 'react-native';
import HomeMenu from '../components/HomeMenu';
import Indicator from '../components/Indicator';
import { ASGet } from '../utils';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const renderItem = ({ item }) => (
    <HomeMenu item={item} />
  );

  useEffect(async () => {
    await ASGet('channel')
      .then((response) => {
        if (response) {
          setDataSource(JSON.parse(response));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
