/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import { colorInputBlack, colorLabel, colorPrimary } from '../styles/colors';

const Input = ({
  label, value, height = 40, secureTextEntry, onChangeText, icon,
}) => {
  const [border, setBorder] = useState(colorLabel);
  const onFocusForm = () => {
    setBorder(colorInputBlack);
  };
  const onBlurForm = () => {
    setBorder(colorLabel);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.content}>
        <TextInput
          onFocus={onFocusForm}
          onBlur={onBlurForm}
          style={styles.input(height, border)}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
        />
        {
          icon ? <FaIcon name={icon} size={24} color={colorPrimary} /> : null
        }

      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
  content: {
    flexDirection: 'row',
  },
  input: (height, border) => ({
    height,
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: border,
    borderRadius: 10,
    width: '95%',
  }),
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: colorLabel,
  },
});
