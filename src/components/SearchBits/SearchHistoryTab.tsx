/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import Colors from '@src/config/Colors';
import {getDataObject, storeDataObject} from '@src/storage';
import {screenHeight, screenWidth} from '@src/utils/Sizes';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import EmptyState from '../EmptyState';

interface SearchHistoryTabInterface {
  formik?: any;
  setHistory?: any;
  history?: any;
}
export default function SearchHistoryTab({
  formik,
  setHistory,
  history,
}: SearchHistoryTabInterface) {
  const getHistory = () => {
    getDataObject('history').then(val => {
      if (val) {
        setHistory(val);
      } else {
        setHistory([]);
      }
    });
  };

  return (
    <>
      <View style={styles.searchTop}>
        <Text style={styles.searchText}>Search history</Text>
        <TouchableOpacity
          onPress={() => {
            storeDataObject('history', []).then(res => {
              getHistory();
            });
          }}>
          <Text style={styles.clearText}>clear</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={history}
        style={styles.historyTab}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              formik.setFieldValue('search', item);
            }}>
            <View style={styles.pin}>
              <Text style={styles.pinText}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => {
          return <EmptyState text="Search history appears here" />;
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  searchTop: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: screenHeight(0.04),
  },
  searchText: {
    fontFamily: 'Poppins-Bold',
  },
  clearText: {
    color: Colors.DEFAULT_YELLOW,
    fontFamily: 'Poppins-Bold',
  },
  historyTab: {
    marginTop: screenHeight(0.01),
  },

  pin: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginRight: screenWidth(0.01),
    marginBottom: screenWidth(0.02),
  },
  pinText: {
    color: '#6c6c6c',
    fontFamily: 'Poppins-Medium',
  },
});
