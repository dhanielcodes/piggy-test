/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Colors from '@src/config/Colors';
import {screenHeight, screenWidth} from '@src/utils/Sizes';
import ProductCard from '@src/components/ProductCard';
import MainContext, {ContextType} from '@src/context/global.context';
import {storeDataObject} from '@src/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadingStack from '@src/components/LoadingStack';

function Home(): React.JSX.Element {
  const {lastData, viewedData, getLastViewed, loading, getLastData}: any =
    useContext(MainContext) as ContextType;

  const backgroundStyle = {
    backgroundColor: Colors.DEFAULT_WHITE,
    flex: 1,
    padding: 20,
  };

  useEffect(() => {
    getLastData();
    getLastViewed();
  }, []);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Restaurants Valley</Text>
        {loading ? null : (
          <FlatList
            data={lastData}
            style={styles.cardDisplaySection}
            renderItem={({item}) => (
              <View>
                <ProductCard {...item} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
        <LoadingStack loading={loading} />
        <Text style={styles.title}>Last Viewed</Text>
        {loading ? null : (
          <FlatList
            data={viewedData}
            style={styles.cardDisplaySection}
            renderItem={({item}) => (
              <View>
                <ProductCard {...item} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
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
                    You haven't viewed any restaurant{' '}
                    <Icon name="map-pin" size={15} color="#000" />
                  </Text>
                </View>
              );
            }}
          />
        )}
        <LoadingStack loading={loading} />
        {viewedData?.length ? (
          <TouchableOpacity
            onPress={() => {
              storeDataObject('lastViewed', []).then(res => {
                getLastViewed();
              });
            }}>
            <Text style={styles.clearText}>Clear List</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: screenWidth(0.06),
    fontFamily: 'Poppins-Medium',
  },

  clearText: {
    color: Colors.DEFAULT_GREY,
    marginTop: screenHeight(0.01),
    fontFamily: 'Poppins-Bold',
  },

  cardDisplaySection: {
    marginTop: screenHeight(0.008),
    marginBottom: screenHeight(0.03),
  },
});

export default Home;
