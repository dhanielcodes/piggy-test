/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useContext, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '@src/config/Colors';
import MainContext, {ContextType} from '@src/context/global.context';
import {screenHeight, screenWidth} from '@src/utils/Sizes';
import ProductCard from '@src/components/ProductCard';
import LoadingStack from '@src/components/LoadingStack';
import EmptyState from '@src/components/EmptyState';
import {RestaurantSchema} from '@src/types/restaurant';

interface ListInterface {
  favoriteList: Array<RestaurantSchema>;
}
const FavoriteListComponent = ({favoriteList}: ListInterface) => {
  return (
    <FlatList
      data={favoriteList}
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
        return <EmptyState text="You haven't picked any favorites" />;
      }}
    />
  );
};

function Favorites(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.DEFAULT_WHITE,
    flex: 1,
    padding: 16,
  };

  const {favoriteList, getFavorites, loading}: any = useContext(
    MainContext,
  ) as ContextType;

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text style={styles.title}>Favorites</Text>
        {loading ? null : <FavoriteListComponent favoriteList={favoriteList} />}
        <LoadingStack loading={loading} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Favorites;

const styles = StyleSheet.create({
  title: {
    fontSize: screenWidth(0.06),
    fontFamily: 'Poppins-Medium',
  },

  cardDisplaySection: {
    marginTop: screenHeight(0.008),
  },
});
