/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import Colors from '../config/Colors';
import {screenHeight, screenWidth} from '../utils/Sizes';
import AddIcon from '../assets/icons/AddIcon';

interface ItemCard {
  title?: any;
  image?: string;
  desc?: any;
  amount?: string;
}

export default function ProductCard({
  title,
  image,
  desc,
  amount,
}: ItemCard): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
        }}
        style={{
          width: '100%',
          borderRadius: 10,
          height: screenHeight(0.2),
          borderWidth: 1,
          borderColor: Colors.DEFAULT_GREY,
        }}
      />
      <Text style={styles.text}>Restaurant Name</Text>
      <Text style={styles.textDescription}>Classic 1 0 1</Text>
      <Text style={styles.textPrice}># 4000</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    width: screenWidth(0.7),
    height: screenWidth(0.7),
    padding: screenWidth(0.04),
    borderColor: '#E2E2E2',
    marginRight: 20,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    marginTop: 20,
    width: '100%',
  },
  textDescription: {
    fontFamily: 'Poppins-Light',
    fontSize: screenWidth(0.025),
    width: '100%',
  },
  textPrice: {
    fontFamily: 'Poppins-Medium',
    color: Colors.DEFAULT_YELLOW,
    width: '100%',
  },
  plus: {
    position: 'absolute',
    bottom: 7,
    right: -7,
  },
});
