import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { colorLoading, colorPrimary } from '../styles/colors';

const Button = ({ onPress, title, isLoading }) => {
  if (isLoading) {
    return (
      <TouchableOpacity style={styles.buttonLoading}>
        <Text style={styles.text}>Sedang diproses...</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colorPrimary,
    width: '90%',
    marginVertical: 10,
    paddingVertical: 13,
    borderRadius: 5,
  },
  buttonLoading: {
    width: '90%',
    backgroundColor: colorLoading,
    marginVertical: 10,
    paddingVertical: 13,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 1,
  },
});
