/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BackBtn from '../BackBtn';
import FastImage from 'react-native-fast-image';
import {RestaurantSchema} from '@src/types/restaurant';
import {screenHeight, screenWidth} from '@src/utils/Sizes';
import Colors from '@src/config/Colors';
import {storeDataObject} from '@src/storage';
import MainContext, {ContextType} from '@src/context/global.context';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StarIcon} from 'react-native-star-rating-widget';
import {onFavoriteRestaurantHeader} from '@src/controller/RestaurantController';
interface RestaurantHeadSchema {
  data?: RestaurantSchema;
  setData?: any;
}

export default function RestaurantHeader({
  data,
  setData,
}: RestaurantHeadSchema) {
  const {viewedData, getLastViewed, lastData, getLastData, getFavorites}: any =
    useContext(MainContext) as ContextType;
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: screenHeight(0.02),
          alignItems: 'center',
          gap: 10,
        }}>
        <BackBtn />
        <Text style={styles.text}>{data?.name}</Text>
      </View>

      <Text style={styles.textLocation}>
        {data?.address_obj.city}, {data?.address_obj.country}
      </Text>
      <Text style={styles.address}>
        <Icon name="map-pin" size={15} color="#000" /> {data?.address}
      </Text>

      <FastImage
        source={{
          uri: data?.photo?.images?.medium.url,
          cache: FastImage.cacheControl.cacheOnly,
        }}
        style={{
          width: '100%',
          borderRadius: 10,
          height: screenHeight(0.2),
          marginVertical: screenHeight(0.02),
          borderWidth: 1,
          borderColor: Colors.DEFAULT_GREY,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          gap: '10',
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
          }}>
          {data?.favorite ? 'Added to Favorites' : 'Add to Favorites'}
        </Text>
        <TouchableOpacity
          onPress={() => {
            onFavoriteRestaurantHeader(
              getFavorites,
              lastData,
              getLastData,
              viewedData,
              getLastViewed,
              data,
              setData,
            );
          }}>
          <StarIcon
            size={20}
            index={1}
            type={data?.favorite ? 'full' : 'empty'}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.textDescription}>{data?.description}</Text>
      <Text style={styles.textPrice}>{data?.price || 'No Listed Pricing'}</Text>
      <Text style={styles.textRating}>
        <Text style={styles.textRatingNumber}>
          {data?.rating || 'No Listed Rating'}
        </Text>
        stars rating
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: screenWidth(0.045),
    marginTop: screenHeight(0.004),
    flexShrink: 1,
  },
  textLocation: {
    fontFamily: 'Poppins-Medium',
    fontSize: screenWidth(0.03),
    width: '100%',
  },
  address: {
    fontFamily: 'Poppins-Light',
    fontSize: screenWidth(0.03),
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
  },
  textDescription: {
    fontFamily: 'Poppins-Light',
    fontSize: screenWidth(0.03),
    marginVertical: screenHeight(0.01),
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
