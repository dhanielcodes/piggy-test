/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import ModalComponent from '@src/components/ModalComponent';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FormInput from '@src/components/FormInput';
import {screenWidth} from '@src/utils/Sizes';
import StarRating from 'react-native-star-rating-widget';

interface ReviewBoxInterface {
  modalVisible?: any;
  setModalVisible?: any;
  formik?: any;
}

export default function ReviewEditBox({
  modalVisible,
  setModalVisible,
  formik,
}: ReviewBoxInterface) {
  return (
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
  modalText: {
    fontFamily: 'Poppins-Light',
    fontSize: 18,
    marginBottom: 15,
  },
});
