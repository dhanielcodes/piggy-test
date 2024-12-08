/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '@src/config/Colors';
import {screenHeight, screenWidth} from '@src/utils/Sizes';

export default function SkeletonCard(): React.JSX.Element {
  /* useEffect(() => {
  }, [data]); */
  return (
    <TouchableOpacity style={styles.card}>
      <View
        style={{
          width: '100%',
          borderRadius: 10,
          height: screenHeight(0.2),
          marginBottom: screenHeight(0.03),
          backgroundColor: Colors.DEFAULT_GREY2,
        }}></View>
      <View
        style={{
          width: '100%',
          borderRadius: 10,
          height: screenHeight(0.1),
          backgroundColor: Colors.DEFAULT_GREY2,
        }}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    width: screenWidth(0.7),
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
  textRating: {
    fontFamily: 'Poppins-Medium',
    fontSize: screenWidth(0.028),
    width: '100%',
  },
  textRatingNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: screenWidth(0.028),
    color: Colors.BLACK,
    width: '100%',
  },
  plus: {
    position: 'absolute',
    bottom: 7,
    right: -7,
  },
});
