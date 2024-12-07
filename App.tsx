import './gesture-handler.native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {MainStackParamList} from '@src/types/navigation';
import {MainProvider} from '@src/context/global.context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RestaurantPage from '@src/pages/RestaurantPage';
import {MainNavigator} from '@src/navigation/MainNavigator';

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
  return (
    <QueryClientProvider client={queryClient}>
      <MainProvider>
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
