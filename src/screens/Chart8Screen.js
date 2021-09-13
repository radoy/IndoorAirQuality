/* eslint-disable react/jsx-filename-extension */
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Dimensions,
  RefreshControl,
  StyleSheet, Text, View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import { DateTime } from 'luxon';
import Indicator from '../components/Indicator';
import { colorPrimary } from '../styles/colors';
import { showError } from '../utils';
import Card from '../components/Card';

const Chart8Screen = ({ route }) => {
  const {
    channel, sensor, api, id, apiKey,
  } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [description, setDescription] = useState('');

  const getData = async () => {
    console.log('get data from ', `${api}field/${id}.json`);

    setIsLoading(true);
    await axios.get(`${api}field/${id}.json`)
      .then((response) => {
        if (response.data.channel[`field${id}`]) {
          setDataSource(response.data.feeds);
          setDescription(response.data.channel[`field${id}`]);
        }
      })
      .catch((e) => {
        showError(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onRefresh = useCallback(
    () => {
      setRefreshing(true);
      setTimeout(async () => {
        setRefreshing(false);
        getData();
      }, 2000);
    },
    [refreshing],
  );

  useEffect(() => { getData(); }, []);

  if (isLoading === true) return <Indicator />;

  let lastTime = '';
  let returnValue = null;

  if (dataSource.length > 0) {
    dataSource.reverse();

    // Get first data
    lastTime = DateTime.fromISO(dataSource[0].created_at).toFormat('dd-MM-yyyy hh:mm:ss');

    dataSource.forEach((item) => {
      if (item[`field${id}`] === undefined) return;

      returnValue += (item[`field${id}`] !== null ? parseFloat(item[`field${id}`]) : 0);
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colorPrimary}
          />
      )}
      >
        <Text style={styles.textChannel}>
          {channel}
          {' - '}
          {sensor}
        </Text>

        <Card style={styles.contentCard}>
          <Text style={styles.textCard}>{returnValue}</Text>
          <Text style={styles.textDescription}>
            {description}
          </Text>
          <Text style={styles.textLastTime}>
            {lastTime}
          </Text>
        </Card>

        {dataSource.length > 0
          ? (
            <View style={styles.viewNoData}>
              <View style={styles.returnValue(returnValue)} />
            </View>
          )
          : (
            <View style={styles.viewNoData}>
              <Text style={styles.textNoData}>Tidak ada data</Text>
            </View>
          )}
      </ScrollView>
    </View>
  );
};

export default Chart8Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 15,
  },
  textChannel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  viewNoData: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNoData: {
    fontSize: 16,
  },
  contentCard: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
  },
  textCard: {
    fontSize: 36,
  },
  textDescription: {
    fontSize: 16,
  },
  textLastTime: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 15,
  },
  returnValue: (val) => ({
    backgroundColor: val > 0 ? 'green' : 'red',
    height: 200,
    width: 200,
    borderRadius: 100,
  }),
});
