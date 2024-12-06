import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {RefetchOptions, useQuery} from '@tanstack/react-query';

import * as Yup from 'yup';
import {useFormik} from 'formik';
import Colors from '@src/config/Colors';
import {getDataObject, storeDataObject} from '@src/storage';
import {ApiService} from '@src/service';
import FormInput from '@src/components/FormInput';
import SearchIcon from '@src/assets/icons/SearchIcon';
import {screenHeight, screenWidth} from '@src/utils/Sizes';
import SettingsIcon from '@src/assets/icons/SettingsIcon';
import ItemCard from '@src/components/ItemCard';
import ProductCard from '@src/components/ProductCard';

function Search(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [history, setHistory] = useState<any>([]);

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
    padding: 16,
  };

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    validationSchema: Yup.object().shape({
      search: Yup.string().required('Input Keyword'),
    }),
    onSubmit: (values?: any) => {
      refetchProducts(
        `/category/${values.search}` as unknown as RefetchOptions,
      );
      storeDataObject('history', [...history, values.search]);
      getHistory();
    },
  });

  const {
    data: array,
    isLoading: isLoadingProducts,
    isFetching: isFetchingProducts,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ['GetProductsQuery'],
    queryFn: () =>
      ApiService.GetProductsQuery(
        formik.values.search ? `/category/${formik.values.search}` : '',
      ),
  });

  const {
    data: arrayCategory,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['GetProductsCategoryQuery'],
    queryFn: () =>
      ApiService.GetProductsCategoryQuery(`/${formik.values.search}`),
  });

  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };
  /* const data = array?.map((item?: any) => {
    return {
      ...item,
      color: generateRandomColor(),
    };
  }); */

  const filtered = arrayCategory?.filter((item: string) =>
    item?.includes(formik.values.search),
  )?.length;

  const categories = filtered
    ? arrayCategory
        ?.filter((item: string) => item?.includes(formik.values.search))
        ?.map((item?: string) => {
          return {
            title: item,
            color: generateRandomColor(),
          };
        })
    : arrayCategory?.map((item?: string) => {
        return {
          title: item,
          color: generateRandomColor(),
        };
      });

  console.log('formik', array, arrayCategory);
  useEffect(() => {
    getHistory();
  }, []);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.top}>
          <FormInput
            IconLeft={SearchIcon}
            formik={formik}
            width={screenWidth(0.72)}
            name="search"
            onPressLeft={() => {
              formik.handleSubmit();
            }}
          />
          <SettingsIcon />
        </View>
        <View style={styles.searchTop}>
          <Text style={styles.searchText}>Search History</Text>
          <TouchableOpacity
            onPress={() => {
              storeDataObject('history', []);
              getHistory();
            }}>
            <Text style={styles.clearText}>clear</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.historyTab}>
          {history?.map((item: string, index: number) => {
            return (
              <View key={index} style={styles.historyTabItem}>
                <Text style={styles.historyTabText}>{item}</Text>
              </View>
            );
          })}
        </View>
        {isLoading || isLoadingProducts || isFetchingProducts || isFetching ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <>
            <View style={styles.cardDisplaySection}>
              {categories?.length === 0 ? (
                <Text>No Result</Text>
              ) : (
                categories?.map(
                  (item?: {title: string; image: string; color: string}) => {
                    return (
                      <View key={item?.title} style={styles.cardDisplayTab}>
                        <ItemCard
                          title={item?.title}
                          image={item?.image}
                          color={item?.color}
                        />
                      </View>
                    );
                  },
                )
              )}
            </View>
            <View style={styles.cardDisplaySection}>
              {array?.length === 0 ? (
                <Text>No Result</Text>
              ) : (
                array
                  ?.map((item?: any) => {
                    return {
                      ...item,
                      color: generateRandomColor(),
                    };
                  })
                  ?.map(
                    (item?: {
                      title: string;
                      image: string;
                      color: string;
                      price: string;
                      description: string;
                    }) => {
                      return (
                        <View
                          key={item?.title}
                          style={styles.cardDisplayProduct}>
                          <ProductCard
                            title={item?.title}
                            image={item?.image}
                            amount={item?.price}
                            desc={item?.description}
                          />
                        </View>
                      );
                    },
                  )
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  top: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
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
    fontFamily: 'Poppins-Light',
  },
  historyTab: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  historyTabItem: {
    width: '20%',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  historyTabText: {
    color: Colors.DEFAULT_GREY,
    width: '100%',
    fontFamily: 'Poppins-Medium',
    fontSize: screenWidth(0.026),
  },
  cardDisplaySection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    aspectRatio: 0.6,
    width: '47%',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default Search;
