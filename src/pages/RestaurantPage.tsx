/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {NavigationProp, useNavigation} from '@react-navigation/native';
import SearchIcon from '@src/assets/icons/SearchIcon';
import BackBtn from '@src/components/BackBtn';
import FormInput from '@src/components/FormInput';
import ModalComponent from '@src/components/ModalComponent';
import Colors from '@src/config/Colors';
import MainContext, {ContextType} from '@src/context/global.context';
import {storeDataObject} from '@src/storage';
import {MainStackParamList} from '@src/types/navigation';
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
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import StarRating, {StarIcon} from 'react-native-star-rating-widget';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Yup from 'yup';

function RestaurantPage({route}: {route?: any}): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const {
    viewedData,
    getLastViewed,
    lastData,
    getLastData,
    getFavorites,
    favoriteList,
  }: any = useContext(MainContext) as ContextType;
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
    validationSchema: Yup.object().shape({
      review: Yup.string().required('leave a review'),
      rating: Yup.string().required('rates restaurant'),
    }),
    onSubmit: values => {
      setData({
        ...data,
        reviewsList: [
          {
            id: review?.id ? review?.id : data?.reviewsList?.length + 1,
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
        <ModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}>
          <Text style={styles.modalText}>Edit review</Text>

          <FormInput formik={formik} width={screenWidth(0.8)} name="review" />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              marginVertical: 10,
            }}>
            <StarRating
              rating={formik.values.rating}
              onChange={e => {
                formik.setFieldValue('rating', e);
              }}
              style={{
                marginLeft: -8,
              }}
              maxStars={5}
              starSize={26}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              formik.handleSubmit();
              setTimeout(() => {
                formik.resetForm();
                setModalVisible(false);
              }, 500);
            }}
            style={styles.pinBtn}>
            <Text
              style={{
                fontFamily: 'Poppins-Light',
              }}>
              Edit Review
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              formik.resetForm();
            }}
            style={styles.pinBtn}>
            <Text
              style={{
                fontFamily: 'Poppins-Light',
              }}>
              Cancel edit
            </Text>
          </TouchableOpacity>
        </ModalComponent>
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
            uri: data.photo.images.medium.url,
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
              const updateList = lastData?.map((itm: RestaurantSchema) =>
                itm?.id === data?.id ? {...itm, favorite: !itm?.favorite} : itm,
              );
              storeDataObject(
                'favorites',
                updateList?.filter((itm: RestaurantSchema) => itm?.favorite),
              ).then(res => {
                getFavorites();
              });
              storeDataObject('restaurants', updateList).then(res => {
                getLastData();
                setData({...data, favorite: !data?.favorite});
              });

              const updateLastViewed = updateList.filter(
                (itm: RestaurantSchema) =>
                  viewedData
                    ?.map((itmm: RestaurantSchema) => itmm?.id)
                    .includes(itm.id),
              );

              storeDataObject('lastViewed', updateLastViewed).then(res => {
                getLastViewed();
              });
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
        <Text style={styles.textPrice}>
          {data?.price || 'No Listed Pricing'}
        </Text>
        {/*   <StarRating
          rating={Number(data.rating)}
          onChange={() => {}}
          maxStars={5}
          starSize={20}
          style={{
            marginLeft: -8,
            marginBottom: 8,
          }}
        /> */}
        <Text style={styles.textRating}>
          <Text style={styles.textRatingNumber}>
            {data?.rating || 'No Listed Pricing'}
          </Text>
          stars rating
        </Text>
        <View
          style={{
            marginTop: screenHeight(0.02),
            paddingTop: screenHeight(0.02),
            borderTopWidth: 1,
            borderTopColor: Colors.DEFAULT_GREY,
          }}>
          <Text style={styles.textRating}>Reviews</Text>
          <View
            style={{
              marginBottom: screenHeight(0.03),
              marginTop: screenHeight(0.01),
              padding: screenWidth(0.04),
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.DEFAULT_GREY,
            }}>
            <FormInput
              formik={formik}
              width={screenWidth(0.75)}
              name="review"
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginTop: 10,
              }}>
              <StarRating
                rating={formik.values.rating}
                onChange={e => {
                  formik.setFieldValue('rating', e);
                }}
                style={{
                  marginTop: -10,
                  marginLeft: -8,
                }}
                maxStars={5}
                starSize={26}
              />
              <TouchableOpacity
                onPress={() => {
                  formik.handleSubmit();
                  setTimeout(() => {
                    formik.resetForm();
                  }, 500);
                }}
                style={styles.pinBtn}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Light',
                  }}>
                  Add Review
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            {data?.reviewsList?.map(
              (
                item: {id: number; review: string; rating: number},
                index: number,
              ) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    key={index}>
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
                    </View>
                  </View>
                );
              },
            )}
          </View>
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
  plus: {
    position: 'absolute',
    bottom: 7,
    right: -7,
  },
  review: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#d8d8d8',
    fontFamily: 'Poppins-Light',
    width: '70%',
    borderRadius: 9,
    marginBottom: screenWidth(0.03),
  },
  pinBtn: {
    paddingHorizontal: 13,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginRight: screenWidth(0.01),
    marginBottom: screenWidth(0.02),
  },
  modalText: {
    fontFamily: 'Poppins-Light',
    fontSize: 18,
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
