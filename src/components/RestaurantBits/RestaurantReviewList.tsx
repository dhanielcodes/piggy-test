/* eslint-disable react-native/no-inline-styles */
import {RestaurantSchema} from '@src/types/restaurant';
import {screenWidth} from '@src/utils/Sizes';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import Icon from 'react-native-vector-icons/FontAwesome';

interface RestaurantReviewListInterface {
  data?: RestaurantSchema;
  setData?: any;
  setModalVisible?: any;
  setReview?: any;
  formik?: any;
  restaurantData?: RestaurantSchema;
  item?: any;
}

const ReviewItemComponent = ({
  formik,
  setModalVisible,
  setReview,
  setData,
  data,
  restaurantData,
  item,
}: RestaurantReviewListInterface) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text style={styles.review}>
        <StarRating
          rating={item.rating}
          onChange={() => {}}
          maxStars={5}
          starSize={20}
        />
        {'                '}
        {item?.review}
      </Text>
      <View style={{flexDirection: 'row', gap: 10}}>
        {item?.isMe ? (
          <Icon
            name="pencil"
            onPress={() => {
              setReview(item);
              formik.setFieldValue('review', item?.review);
              formik.setFieldValue('rating', item?.rating);
              setModalVisible(true);
            }}
            size={15}
            color="#000"
          />
        ) : null}
        {item?.isMe ? (
          <Icon
            onPress={() => {
              setData({
                ...restaurantData,
                reviewsList: data?.reviewsList?.filter(
                  review => review?.id !== item?.id,
                ),
              });
            }}
            name="remove"
            size={15}
            color="#000"
          />
        ) : null}
      </View>
    </View>
  );
};

interface RestaurantReviewListInterface {
  data?: RestaurantSchema;
  setData?: any;
  setModalVisible?: any;
  setReview?: any;
  formik?: any;
  restaurantData?: RestaurantSchema;
}

export default function RestaurantReviewList({
  data,
  formik,
  setModalVisible,
  setReview,
  setData,
  restaurantData,
}: RestaurantReviewListInterface) {
  return (
    <View>
      {data?.reviewsList?.map(
        (
          item: {
            id: number;
            review: string;
            rating: number;
            isMe: boolean;
          },
          index: number,
        ) => {
          return (
            <ReviewItemComponent
              key={index}
              data={data}
              formik={formik}
              item={item}
              restaurantData={restaurantData}
              setData={setData}
              setModalVisible={setModalVisible}
              setReview={setReview}
            />
          );
        },
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  review: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#d8d8d8',
    fontFamily: 'Poppins-Light',
    width: '70%',
    borderRadius: 9,
    marginBottom: screenWidth(0.03),
  },
});
