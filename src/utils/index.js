/* eslint-disable import/prefer-default-export */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';

const ASGet = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log('ASGet Error: ', e);
    return null;
  }
};

const ASSet = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value.toString());
  } catch (e) {
    console.log('ASSet Error: ', e);
  }
};

const showSuccess = (message) => {
  showMessage({
    message,
    type: 'success',
    animationDuration: 300,
  });
};

const showError = (message) => {
  showError({
    message,
    type: 'danger',
    animationDuration: 300,
  });
};

export {
  ASGet,
  ASSet,
  showSuccess,
  showError,
};
