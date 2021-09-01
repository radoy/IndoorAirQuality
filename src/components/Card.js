import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = (props) => (
  <View style={{ ...styles.container, ...props.style }}>
    {props.children}
  </View>
);

export default Card;

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});
