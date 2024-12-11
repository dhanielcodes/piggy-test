/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import Colors from '@src/config/Colors';
import {screenHeight, screenWidth} from '@src/utils/Sizes';
import {RestaurantSchema} from '@src/types/restaurant';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '@src/types/navigation';
import {StarIcon} from 'react-native-star-rating-widget';
import {storeDataObject} from '@src/storage';
import MainContext, {ContextType} from '@src/context/global.context';
import FastImage from 'react-native-fast-image';
import {onFavoriteRestaurant} from '@src/controller/RestaurantController';

export default function ProductCard(
  props: RestaurantSchema,
): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const {viewedData, getLastViewed, lastData, getLastData, getFavorites}: any =
    useContext(MainContext) as ContextType;

  /* useEffect(() => {
  }, [data]); */
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Restaurant', props);
      }}
      style={styles.card}>
      <FastImage
        style={{
          width: '100%',
          height: screenHeight(0.2),
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Colors.DEFAULT_GREY,
        }}
        source={{
          uri: props?.photo?.images?.medium?.url
            ? props?.photo?.images?.medium?.url
            : 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
          cache: FastImage.cacheControl.cacheOnly,
        }}
      />

      <Text style={styles.text}>{props?.name}</Text>
      <Text style={styles.textDescription}>
        {props?.address_obj?.city}, {props?.address_obj?.country}
      </Text>
      <Text style={styles.textPrice}>
        {props?.price || 'No Listed Pricing'}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '95%',
        }}>
        <Text style={styles.textRating}>
          <Text style={styles.textRatingNumber}>
            {props?.rating || 'No Listed Pricing'}
          </Text>{' '}
          stars rating
        </Text>
        <TouchableOpacity
          onPress={() => {
            onFavoriteRestaurant(
              getFavorites,
              lastData,
              getLastData,
              viewedData,
              getLastViewed,
              props,
            );
          }}>
          <StarIcon
            size={20}
            index={1}
            type={props?.favorite ? 'full' : 'empty'}
            color="#000"
          />
        </TouchableOpacity>
      </View>
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
});
