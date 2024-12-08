/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Colors from '../config/Colors';
import {screenHeight, screenWidth} from '../utils/Sizes';
import AddIcon from '../assets/icons/AddIcon';
import {RestaurantSchema} from '@src/types/restaurant';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '@src/types/navigation';
import {StarIcon} from 'react-native-star-rating-widget';
import {storeDataObject} from '@src/storage';
import MainContext, {ContextType} from '@src/context/global.context';

export default function ProductCard(
  props: RestaurantSchema,
): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const {
    lastViewedData,
    getLastViewed,
    favoriteList,
    recentData,
    getFavorites,
  }: any = useContext(MainContext) as ContextType;

  const [data, setData] = useState(props);

  /* useEffect(() => {
  }, [data]); */
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Restaurant', data);
      }}
      style={styles.card}>
      <Image
        source={{
          uri: props?.photo?.images?.medium?.url
            ? props?.photo?.images?.medium?.url
            : 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
        }}
        style={{
          width: '100%',
          borderRadius: 10,
          height: screenHeight(0.2),
          borderWidth: 1,
          borderColor: Colors.DEFAULT_GREY,
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
            storeDataObject('favorites', [
              {...data, favorite: !data?.favorite},
              ...favoriteList?.filter((item: any) => item?.id !== data?.id),
            ]);
            setData({
              ...data,
              favorite: !data?.favorite,
            });
            storeDataObject('restaurants', [
              ...recentData?.filter((item: any) => item?.id !== data?.id),
              {...data, favorite: !data?.favorite},
            ]);
            // getLastViewed();
            //storeDataObject('restaurants', [...recentData, data]);
            setTimeout(() => {
              getFavorites();
            }, 500);
          }}>
          <StarIcon
            size={20}
            index={1}
            type={data?.favorite ? 'full' : 'empty'}
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
  plus: {
    position: 'absolute',
    bottom: 7,
    right: -7,
  },
});
