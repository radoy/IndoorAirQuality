/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';
import { colorPrimary } from '../styles/colors';
import Card from './Card';

const HomeMenu = ({ item }) => {
  const sizeMenu = 35;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.content}>
        <View>
          <TouchableOpacity onPress={() => {
            navigation.navigate('ChartScreen', {
              channel: item.name,
              sensor: 'Temperature',
              api: item.api,
              apiKey: item.apiKey,
              id: 1,
            });
          }}
          >
            <Card style={styles.menu}>
              <MCIcon
                name="temperature-celsius"
                color="red"
                size={sizeMenu}
              />
              <Text
                style={styles.textMenu}
                adjustsFontSizeToFit
                numberOfLines={2}
              >
                Temperature
              </Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('ChartScreen', {
              channel: item.name,
              sensor: 'NH2',
              api: item.api,
              apiKey: item.apiKey,
              id: 4,
            });
          }}
          >
            <Card style={styles.menu}>
              <SLIcon
                name="chemistry"
                color="pink"
                size={sizeMenu}
              />
              <Text
                style={styles.textMenu}
                adjustsFontSizeToFit
                numberOfLines={2}
              >
                NH2
              </Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('ChartScreen', {
              channel: item.name,
              sensor: 'H2S',
              api: item.api,
              apiKey: item.apiKey,
              id: 7,
            });
          }}
          >
            <Card style={styles.menu}>
              <SLIcon
                name="chemistry"
                color="#4dc3ff"
                size={sizeMenu}
              />
              <Text
                style={styles.textMenu}
                adjustsFontSizeToFit
                numberOfLines={2}
              >
                H2S
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => {
            navigation.navigate('ChartScreen', {
              channel: item.name,
              sensor: 'Humidity',
              api: item.api,
              apiKey: item.apiKey,
              id: 2,
            });
          }}
          >
            <Card style={styles.menu}>
              <MCIcon
                name="air-humidifier"
                color="blue"
                size={sizeMenu}
              />
              <Text
                style={styles.textMenu}
                adjustsFontSizeToFit
                numberOfLines={2}
              >
                Humidity
              </Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('ChartScreen', {
              channel: item.name,
              sensor: 'CO',
              api: item.api,
              apiKey: item.apiKey,
              id: 5,
            });
          }}
          >
            <Card style={styles.menu}>
              <SLIcon
                name="chemistry"
                color="gold"
                size={sizeMenu}
              />
              <Text
                style={styles.textMenu}
                adjustsFontSizeToFit
                numberOfLines={2}
              >
                CO
              </Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('ChartScreen', {
              channel: item.name,
              sensor: 'Dust Particles',
              api: item.api,
              apiKey: item.apiKey,
              id: 8,
            });
          }}
          >
            <Card style={styles.menu}>
              <SLIcon
                name="chemistry"
                color="#e600e6"
                size={sizeMenu}
              />
              <Text
                style={styles.textMenu}
                adjustsFontSizeToFit
                numberOfLines={2}
              >
                Dust Particles
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => {
            navigation.navigate('ChartScreen', {
              channel: item.name,
              sensor: 'NO2',
              api: item.api,
              apiKey: item.apiKey,
              id: 3,
            });
          }}
          >
            <Card style={styles.menu}>
              <SLIcon name="chemistry" color={colorPrimary} size={sizeMenu} />
              <Text
                style={styles.textMenu}
                adjustsFontSizeToFit
                numberOfLines={2}
              >
                NO2
              </Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('ChartScreen', {
              channel: item.name,
              sensor: 'SO2',
              api: item.api,
              apiKey: item.apiKey,
              id: 6,
            });
          }}
          >
            <Card style={styles.menu}>
              <SLIcon
                name="chemistry"
                color="#e68a00"
                size={sizeMenu}
              />
              <Text
                style={styles.textMenu}
                adjustsFontSizeToFit
                numberOfLines={2}
              >
                SO2
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeMenu;

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  menu: {
    width: width * 0.3 - 15,
    height: width * 0.3 - 25,
    alignItems: 'center',
  },
  textMenu: {
    fontSize: 15,
    marginTop: 5,
    textAlign: 'center',
  },
});
