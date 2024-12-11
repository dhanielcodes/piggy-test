/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
interface EmptyStateInterface {
  text?: string;
}
export default function EmptyState({text}: EmptyStateInterface) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'Poppins-Light',
        }}>
        {text} <Icon name="map-pin" size={15} color="#000" />
      </Text>
    </View>
  );
}
