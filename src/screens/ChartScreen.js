/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ChartScreen = ({ route }) => {
  const { channel, sensor, api } = route.params;
  return (
    <View style={styles.container}>
      <Text>{channel}</Text>
      <Text>{sensor}</Text>
      <Text>{api}</Text>
    </View>
  );
};

export default ChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
