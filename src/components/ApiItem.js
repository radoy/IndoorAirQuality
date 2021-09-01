/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import Card from './Card';

const ApiItem = ({ onPress, item }) => (
  <TouchableOpacity onPress={onPress}>
    <Card key={item.id} style={styles.container}>
      <Image
        source={{ uri: item.avatar }}
        style={styles.avatar}
      />
      <View style={styles.content}>
        <Text style={styles.name}>
          {item.first_name}
          {' '}
          {item.last_name}
        </Text>
        <View style={styles.email}>
          <Text>{item.email}</Text>
        </View>
      </View>
      <FaIcon name="chevron-right" />
    </Card>
  </TouchableOpacity>
);

export default ApiItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flexDirection: 'column',
    width: '60%',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    flexDirection: 'row',
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
});
