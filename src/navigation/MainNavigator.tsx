/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeIcon from '@src/assets/icons/tabIcons/HomeIcon';
import OrderIcon from '@src/assets/icons/tabIcons/OrderIcon';
import SearchIcon from '@src/assets/icons/tabIcons/SearchIcon';
import Home from '@src/pages/Home';
import Favorites from '@src/pages/Favorites';
import Search from '@src/pages/Search';
import {MainStackParamList} from '@src/types/navigation';
import {screenHeight, screenWidth} from '@src/utils/Sizes';
import Colors from '@src/config/Colors';
import {Text} from 'react-native';

const MainStack = createBottomTabNavigator<MainStackParamList>();
interface User {
  focused?: any;
}
export const MainNavigator: React.FC = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        tabBarStyle: {
          height: screenHeight(0.097),
          paddingTop: screenHeight(0.02),
        },
      }}>
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}: User) => (
            <HomeIcon color={focused ? '#12AF37' : Colors.DEFAULT_GREY} />
          ),
          tabBarLabel: ({focused}: User) => (
            <Text
              style={{
                fontSize: screenWidth(0.031),
                color: focused ? '#12AF37' : Colors.DEFAULT_GREY,
                fontFamily: 'Poppins-Medium',
              }}>
              Home
            </Text>
          ),
        }}
      />
      <MainStack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}: User) => (
            <SearchIcon color={focused ? '#12AF37' : Colors.DEFAULT_GREY} />
          ),
          tabBarLabel: ({focused}: User) => (
            <Text
              style={{
                fontSize: screenWidth(0.031),
                color: focused ? '#12AF37' : Colors.DEFAULT_GREY,
                fontFamily: 'Poppins-Medium',
              }}>
              Search
            </Text>
          ),
        }}
      />
      <MainStack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}: User) => (
            <OrderIcon color={focused ? '#12AF37' : Colors.DEFAULT_GREY} />
          ),
          tabBarLabel: ({focused}: User) => (
            <Text
              style={{
                fontSize: screenWidth(0.031),
                color: focused ? '#12AF37' : Colors.DEFAULT_GREY,
                fontFamily: 'Poppins-Medium',
              }}>
              Favorites
            </Text>
          ),
        }}
      />
    </MainStack.Navigator>
  );
};
