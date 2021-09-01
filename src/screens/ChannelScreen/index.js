/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Gap from '../../components/Gap';
import { ASGet } from '../../utils';
import Indicator from '../../components/Indicator';

const ChannelScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const isFocused = useIsFocused();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('UpdateChannelScreen', {
          id: item.id,
          name: item.name,
          api: item.api,
        });
      }}
    >
      <Card style={styles.flContainer} key={item.id}>
        <View style={styles.flContent}>
          <Text style={styles.flHeader}>{item.name}</Text>
          <Gap height={10} />
          <Text>{item.api}</Text>
        </View>
        <FaIcon name="chevron-right" />
      </Card>
    </TouchableOpacity>
  );

  useEffect(async () => {
    if (isFocused) {
      await ASGet('channel')
        .then((response) => {
          if (response) {
            console.log('-- render --> ', isFocused);
            setDataSource(JSON.parse(response));
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isFocused]);

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
      <Button
        title="Tambah Channel"
        onPress={() => {
          navigation.navigate('AddChannelScreen');
        }}
      />
    </SafeAreaView>
  );
};

export default ChannelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  flHeader: {
    fontSize: 24,
  },
  flContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  flContent: {
    flexDirection: 'column',
    width: '90%',
  },
});
