/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import RestaurantHeader from '@src/components/RestaurantBits/RestaurantHeader';
import RestaurantReviewList from '@src/components/RestaurantBits/RestaurantReviewList';
import ReviewEditBox from '@src/components/RestaurantBits/ReviewEditBox';
import ReviewForm from '@src/components/RestaurantBits/ReviewForm';
import Colors from '@src/config/Colors';
import {ReviewSchema} from '@src/constants/Schema';
import MainContext, {ContextType} from '@src/context/global.context';
import {storeDataObject} from '@src/storage';
import {RestaurantSchema} from '@src/types/restaurant';
import {screenHeight, screenWidth} from '@src/utils/Sizes';
import {useFormik} from 'formik';
import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function RestaurantPage({route}: {route?: any}): React.JSX.Element {
  const {viewedData, getLastViewed, lastData, getLastData, getFavorites}: any =
    useContext(MainContext) as ContextType;
  const backgroundStyle = {
    backgroundColor: Colors.DEFAULT_WHITE,
    flex: 1,
    paddingHorizontal: 16,
  };

  const restaurantData: RestaurantSchema = route.params;

  const [data, setData] = useState<RestaurantSchema>(restaurantData);
  const [modalVisible, setModalVisible] = useState(false);
  const [review, setReview] = useState<any>({});
  const formik = useFormik({
    initialValues: {
      review: '',
      rating: 0,
    },
    validationSchema: ReviewSchema,
    onSubmit: values => {
      setData({
        ...data,
        reviewsList: [
          {
            id: review?.id ? review?.id : data?.reviewsList?.length + 1,
            isMe: true,
            ...values,
          },
          ...data?.reviewsList?.filter(item => item?.id !== review?.id),
        ],
      });

      const updateList = lastData?.map((itm: RestaurantSchema) =>
        itm?.id === data?.id
          ? {
              ...itm,
              reviewsList: [
                {
                  id: review?.id ? review?.id : data?.reviewsList?.length + 1,
                  isMe: true,
                  ...values,
                },
                ...data?.reviewsList?.filter(item => item?.id !== review?.id),
              ],
            }
          : itm,
      );
      storeDataObject('restaurants', updateList).then(res => {
        getLastData();
      });
      storeDataObject(
        'favorites',
        updateList?.filter((itm: RestaurantSchema) => itm?.favorite),
      ).then(res => {
        getFavorites();
      });
      const updateLastViewed = updateList.filter((itm: RestaurantSchema) =>
        viewedData?.map((itmm: RestaurantSchema) => itmm?.id).includes(itm.id),
      );

      storeDataObject('lastViewed', updateLastViewed).then(res => {
        getLastViewed();
      });
    },
  });

  useEffect(() => {
    storeDataObject('lastViewed', [
      data,
      ...viewedData?.filter((item: any) => item?.id !== data?.id),
    ]).then(res => {
      getLastViewed();
    });
  }, []);

  //console.log(data.reviewsList, 'reviewsList');

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <ReviewEditBox
          formik={formik}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <RestaurantHeader data={data} setData={setData} />

        <View
          style={{
            marginTop: screenHeight(0.02),
            paddingTop: screenHeight(0.02),
            borderTopWidth: 1,
            borderTopColor: Colors.DEFAULT_GREY,
          }}>
          <Text style={styles.textRating}>Reviews</Text>
          <ReviewForm formik={formik} />

          <RestaurantReviewList
            data={data}
            formik={formik}
            restaurantData={restaurantData}
            setData={setData}
            setModalVisible={setModalVisible}
            setReview={setReview}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RestaurantPage;

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
    fontSize: screenWidth(0.045),
    marginTop: screenHeight(0.004),
    flexShrink: 1,
  },
  textRating: {
    fontFamily: 'Poppins-Medium',
    fontSize: screenWidth(0.028),
    width: '100%',
  },
});
