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

const ChartScreen = ({ route }) => {
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

  const labels = [];
  const datasets = [];
  let lastValue = 0;
  let lastTime = '';

  if (dataSource.length > 0) {
    let i = 0;
    dataSource.reverse();

    // Get first data
    lastValue = (Math.round(dataSource[0][`field${id}`] * 100) / 100).toFixed(2);
    lastTime = DateTime.fromISO(dataSource[0].created_at).toFormat('dd-MM-yyyy hh:mm:ss');

    dataSource.forEach((item) => {
      if (item[`field${id}`] === undefined) return;

      if (i > 15) return;
      labels.push(DateTime.fromISO(item.created_at).toFormat('d/M hh:mm'));
      datasets.push((item[`field${id}`] !== null ? parseFloat(item[`field${id}`]) : 0));
      i++;
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
          <Text style={styles.textCard}>{lastValue}</Text>
          <Text style={styles.textDescription}>
            {description}
          </Text>
          <Text style={styles.textLastTime}>
            {lastTime}
          </Text>
        </Card>

        {dataSource.length > 0
          ? (
            <LineChart
              data={{
                labels,
                datasets: [{ data: datasets }],
              }}
              width={Dimensions.get('window').width} // from react-native
              height={Dimensions.get('window').height - 230}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                barPercentage: 0.7,
                decimalPlaces: 2, // optional, defaults to 2dp
                fillShadowGradient: 'rgba(1, 222, 205, 1)',
                fillShadowGradientOpacity: 0.5,
                color: (opacity = 1) => `rgba(1, 122, 205, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForBackgroundLines: {
                  strokeWidth: 1,
                  stroke: '#e3e3e3',
                  strokeDasharray: '0',
                },
              }}
              bezier
              hidePointsAtIndex={[1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 15]}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
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

export default ChartScreen;

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
});
