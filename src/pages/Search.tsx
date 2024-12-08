/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {useFormik} from 'formik';
import Colors from '@src/config/Colors';
import {getDataObject, storeDataObject} from '@src/storage';
import FormInput from '@src/components/FormInput';
import SearchIcon from '@src/assets/icons/SearchIcon';
import {screenHeight, screenWidth} from '@src/utils/Sizes';
import ProductCard from '@src/components/ProductCard';
import MainContext, {ContextType} from '@src/context/global.context';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating-widget';
import SkeletonCard from '@src/components/SkeletonCard';

function Search(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [history, setHistory] = useState<any>([]);

  const {lastData, getLastViewed, loading}: any = useContext(
    MainContext,
  ) as ContextType;

  const getHistory = () => {
    getDataObject('history').then(val => {
      if (val) {
        setHistory(val);
      } else {
        setHistory([]);
      }
    });
  };

  const backgroundStyle = {
    backgroundColor: Colors.DEFAULT_WHITE,
    flex: 1,
    padding: 20,
  };

  const formik = useFormik({
    initialValues: {
      search: '',
      rating: 0,
    },
    onSubmit: (values?: any) => {
      storeDataObject('history', [...history, values.search]).then(res => {
        getHistory();
      });
    },
  });

  useEffect(() => {
    getHistory();
    getLastViewed();
  }, []);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
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
          {/*   <SettingsIcon /> */}
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
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins-Light',
                  }}>
                  Search history appears here{' '}
                </Text>
              </View>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        '{' '}
        {loading && (
          <FlatList
            data={[1, 2, 4, 5, 6, 6]}
            style={styles.cardDisplaySection}
            renderItem={({item}) => (
              <View>
                <SkeletonCard />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
        '<Text style={styles.title}>Search</Text>
        <FlatList
          data={
            formik.values.search && formik.values.rating
              ? lastData
                  ?.filter((item: any) =>
                    item?.name.toLowerCase()?.includes(formik.values.search),
                  )
                  ?.filter(
                    (item: any) =>
                      Number(item?.rating) === formik.values.rating,
                  )
              : formik.values.search
              ? lastData?.filter((item: any) =>
                  item?.name.toLowerCase()?.includes(formik.values.search),
                )
              : formik.values.rating
              ? lastData?.filter(
                  (item: any) => Number(item?.rating) === formik.values.rating,
                )
              : []
          }
          style={styles.cardDisplaySection}
          renderItem={({item}) => (
            <View>
              <ProductCard {...item} />
            </View>
          )}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins-Light',
                  }}>
                  Search for a restaurant{' '}
                  <Icon name="map-pin" size={15} color="#000" />
                </Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  title: {
    marginTop: screenHeight(0.03),
    fontSize: screenWidth(0.06),
    fontFamily: 'Poppins-Medium',
  },
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

  cardDisplaySection: {
    marginTop: screenHeight(0.008),
  },
  cardDisplayTab: {
    aspectRatio: 1,
    width: '47%',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cardDisplayProduct: {
    aspectRatio: 0.8,
    width: '47%',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
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

export default Search;
