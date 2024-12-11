/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import FormInput from '@src/components/FormInput';
import {screenHeight, screenWidth} from '@src/utils/Sizes';
import SearchIcon from '@src/assets/icons/SearchIcon';

interface SearchFormInterface {
  formik?: any;
}

export default function SearchFilterForm({formik}: SearchFormInterface) {
  return (
    <>
      <View style={styles.top}>
        <FormInput
          IconLeft={SearchIcon}
          formik={formik}
          width={screenWidth(0.9)}
          name="search"
          handleSubmit={() => {
            formik.handleSubmit();
          }}
        />
      </View>
      <Text style={[styles.searchText, {marginTop: screenHeight(0.03)}]}>
        Filter search by rating
      </Text>
      <StarRating
        rating={formik.values.rating}
        onChange={e => {
          formik.setFieldValue('rating', e);
        }}
        style={{
          marginTop: 6,
          marginLeft: -8,
        }}
        maxStars={5}
        starSize={26}
      />
    </>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },

  searchText: {
    fontFamily: 'Poppins-Bold',
  },
});
