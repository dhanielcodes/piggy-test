/* eslint-disable react-native/no-inline-styles */
import './gesture-handler.native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {MainStackParamList} from '@src/types/navigation';
import {MainProvider} from '@src/context/global.context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RestaurantPage from '@src/pages/RestaurantPage';
import {MainNavigator} from '@src/navigation/MainNavigator';
import {Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/FontAwesome';

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

const ScreenStack = createNativeStackNavigator<MainStackParamList>();

function App(): React.JSX.Element {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [synchronizeState, setSynchronizeState] = useState<boolean>(true);
  const [synchronize, setSynchronize] = useState<string>(
    'Data Synchronization in process',
  );

  const synchronizeData = async () => {
    setTimeout(() => {
      setSynchronize('Data Synchronized');
    }, 2000);
    setTimeout(() => {
      setSynchronizeState(false);
    }, 3000);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        setSynchronizeState(true);
        synchronizeData();
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <MainProvider>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: 'white',
          }}>
          {isConnected ? (
            <Text style={{color: 'white', fontFamily: 'Poppins-Medium'}}>
              Online{' '}
              {synchronizeState ? (
                <Text style={{fontFamily: 'Poppins-Medium'}}>
                  {synchronize}
                </Text>
              ) : null}
            </Text>
          ) : (
            <Text style={{color: '#7c7c7c', fontFamily: 'Poppins-Medium'}}>
              You are currently browsing offline{' '}
              <Icon name="ban" size={15} color="#7c7c7c" />
            </Text>
          )}
        </View>
        <NavigationContainer>
          <ScreenStack.Navigator>
            <ScreenStack.Screen
              name="MainNavigator"
              component={MainNavigator}
              options={{
                headerShown: false,
              }}
            />
            <ScreenStack.Screen
              name="Restaurant"
              component={RestaurantPage}
              options={{
                headerShown: false,
              }}
            />
          </ScreenStack.Navigator>
        </NavigationContainer>
      </MainProvider>
    </QueryClientProvider>
  );
}

export default App;
