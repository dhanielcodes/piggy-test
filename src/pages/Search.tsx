/* eslint-disable @typescript-eslint/no-unused-vars */
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
  View,
} from 'react-native';

import {useFormik} from 'formik';
import Colors from '@src/config/Colors';
import {getDataObject, storeDataObject} from '@src/storage';
import {screenHeight, screenWidth} from '@src/utils/Sizes';
import ProductCard from '@src/components/ProductCard';
import MainContext, {ContextType} from '@src/context/global.context';
import SearchFilterForm from '@src/components/SearchBits/SearchFilterForm';
import SearchHistoryTab from '@src/components/SearchBits/SearchHistoryTab';
import LoadingStack from '@src/components/LoadingStack';
import EmptyState from '@src/components/EmptyState';
import {RestaurantSchema} from '@src/types/restaurant';
import {formikConfig} from '@src/controller/SearchController';

interface ListInterface {
  list: Array<RestaurantSchema>;
  formik: any;
}
const FavoriteListComponent = ({list, formik}: ListInterface) => {
  return (
    <FlatList
      data={
        formik.values.search && formik.values.rating
          ? list
              ?.filter((item: any) =>
                item?.name.toLowerCase()?.includes(formik.values.search),
              )
              ?.filter(
                (item: any) => Number(item?.rating) === formik.values.rating,
              )
          : formik.values.search
          ? list?.filter((item: any) =>
              item?.name.toLowerCase()?.includes(formik.values.search),
            )
          : formik.values.rating
          ? list?.filter(
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
        return <EmptyState text="Search for a restaurant" />;
      }}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

function Search(): React.JSX.Element {
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

  const formik = useFormik(formikConfig(getHistory, history));

  useEffect(() => {
    getHistory();
    getLastViewed();
  }, []);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <SearchFilterForm formik={formik} />
        <SearchHistoryTab
          formik={formik}
          history={history}
          setHistory={setHistory}
        />

        <Text style={styles.title}>Search</Text>
        <LoadingStack loading={loading} />
        {loading ? null : (
          <FavoriteListComponent formik={formik} list={lastData} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: screenWidth(0.06),
    fontFamily: 'Poppins-Medium',
  },

  cardDisplaySection: {
    marginTop: screenHeight(0.008),
  },
});

export default Search;
