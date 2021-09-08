/* eslint-disable react/jsx-filename-extension */
import { forEach } from 'async';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Dimensions,
  RefreshControl,
  SafeAreaView, StyleSheet, Text, View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import Indicator from '../components/Indicator';
import { colorPrimary } from '../styles/colors';
import { showError } from '../utils';

const ChartScreen = ({ route }) => {
  const {
    channel, sensor, api, id,
  } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const getData = async () => {
    setIsLoading(true);
    await axios.get(`${api}field/${id}.json`)
      .then((response) => {
        console.log(response.data);
        setDataSource(response.data.feeds);
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

  if (dataSource) {
    let i = 0;
    dataSource.forEach((item) => {
      if (item[`field${id}`] === undefined) return;

      // if (i > 1) return;
      labels.push(item.created_at);
      datasets.push(parseFloat(item[`field${id}`]));
      i++;
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
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
        <LineChart
          data={{
            labels,
            datasets: [{ data: datasets }],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisSuffix=" C"
          xAxisLabel=" C"
        // yAxisInterval={57} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#C0c0c0',
            // backgroundGradientFromOpacity: 0,
            // backgroundGradientTo: '#08130D',
            // backgroundGradientToOpacity: 0.5,
            barPercentage: 0.5,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(192, 192, 192, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#d62020',
            },
          }}
          bezier
          // hidePointsAtIndex={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
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
});
