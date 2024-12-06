/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import './gesture-handler.native';
import React from 'react';
import {Text} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Search from '@src/pages/Search';
import Home from '@src/pages/Home';
import Trend from '@src/pages/Trend';
import Order from '@src/pages/Order';
import Profile from '@src/pages/Profile';
import {MainStackParamList} from '@src/types/navigation';
import Colors from '@src/config/Colors';
import {screenHeight, screenWidth} from '@src/utils/Sizes';
import SearchIcon from '@src/assets/icons/tabIcons/SearchIcon';
import TrendIcon from '@src/assets/icons/tabIcons/TrendIcon';
import OrderIcon from '@src/assets/icons/tabIcons/OrderIcon';
import ProfileIcon from '@src/assets/icons/tabIcons/ProfileIcon';
import HomeIcon from '@src/assets/icons/tabIcons/HomeIcon';
import {MainProvider} from '@src/context/global.context';

//import Home from 'src/pages/Home';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 5 * 60 * 1000,
    },
  },
});

const MainStack = createBottomTabNavigator<MainStackParamList>();

interface User {
  focused?: any;
}

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <MainProvider>
        <NavigationContainer>
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
                  <SearchIcon
                    color={focused ? '#12AF37' : Colors.DEFAULT_GREY}
                  />
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
              name="Trend"
              component={Trend}
              options={{
                headerShown: false,
                tabBarIcon: ({focused}: User) => (
                  <TrendIcon
                    color={focused ? '#12AF37' : Colors.DEFAULT_GREY}
                  />
                ),
                tabBarLabel: ({focused}: User) => (
                  <Text
                    style={{
                      fontSize: screenWidth(0.031),
                      color: focused ? '#12AF37' : Colors.DEFAULT_GREY,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    Trend
                  </Text>
                ),
              }}
            />
            <MainStack.Screen
              name="Order"
              component={Order}
              options={{
                headerShown: false,
                tabBarIcon: ({focused}: User) => (
                  <OrderIcon
                    color={focused ? '#12AF37' : Colors.DEFAULT_GREY}
                  />
                ),
                tabBarLabel: ({focused}: User) => (
                  <Text
                    style={{
                      fontSize: screenWidth(0.031),
                      color: focused ? '#12AF37' : Colors.DEFAULT_GREY,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    Order
                  </Text>
                ),
              }}
            />
            <MainStack.Screen
              name="Profile"
              component={Profile}
              options={{
                headerShown: false,
                tabBarIcon: ({focused}: User) => (
                  <ProfileIcon
                    color={focused ? '#12AF37' : Colors.DEFAULT_GREY}
                  />
                ),
                tabBarLabel: ({focused}: User) => (
                  <Text
                    style={{
                      fontSize: screenWidth(0.031),
                      color: focused ? '#12AF37' : Colors.DEFAULT_GREY,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    Profile
                  </Text>
                ),
              }}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </MainProvider>
    </QueryClientProvider>
  );
}

export default App;
