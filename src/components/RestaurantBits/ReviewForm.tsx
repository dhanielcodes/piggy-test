/* eslint-disable react-native/no-inline-styles */
import {screenHeight, screenWidth} from '@src/utils/Sizes';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FormInput from '@src/components/FormInput';
import StarRating from 'react-native-star-rating-widget';
import Colors from '@src/config/Colors';

interface ReviewFormInterface {
  formik?: any;
}
export default function ReviewForm({formik}: ReviewFormInterface) {
  return (
    <View
      style={{
        marginBottom: screenHeight(0.03),
        marginTop: screenHeight(0.01),
        padding: screenWidth(0.04),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.DEFAULT_GREY,
      }}>
      <FormInput formik={formik} width={screenWidth(0.75)} name="review" />

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
  );
}

const styles = StyleSheet.create({
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
});
