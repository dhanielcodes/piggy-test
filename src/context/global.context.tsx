/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {ApiService} from '@src/service';
import {getDataObject, storeDataObject} from '@src/storage';
import {useMutation, useQuery} from '@tanstack/react-query';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

export type ContextType = {
  recentData?: any;
  lastViewedData?: any;
  getLastViewed?: () => void;
  getLastData?: () => void;
} | null;

interface Context {
  children?: ReactNode;
}

const MainContext = createContext<ContextType | null>(null);

export const MainProvider: React.FC<Context> = ({children}: Context) => {
  // Use this type in your state initialization
  const [lastData, setLastData] = useState([]);

  const {data, isLoading, refetch, isFetching, error} = useQuery({
    queryKey: ['GetRestaurantsQuery'],
    queryFn: () => ApiService.GetRestaurantsQuery(),
    enabled: lastData?.length ? false : true,
  });
  const [viewedData, setViewedData] = useState([]);

  const getLastData = () => {
    getDataObject('restaurants').then(val => {
      if (val) {
        setLastData(val);
      } else {
        setLastData([]);
      }
    });
  };
  const getLastViewed = () => {
    getDataObject('lastViewed').then(val => {
      if (val) {
        setViewedData(val);
      } else {
        setViewedData([]);
      }
    });
  };
  useEffect(() => {
    getLastData();
    getLastViewed();
  }, []);
  useEffect(() => {
    storeDataObject(
      'restaurants',
      data?.data?.data?.map((item: object, index: number) => {
        return {
          id: index + 1,
          reviewsList: [
            {
              id: 1,
              review:
                'Very Good restaurant, liked the fine Dining!, the service time was amazing',
              rating: 5,
            },
            {id: 2, review: 'Not Bad for a new restaurant', rating: 4},
            {
              id: 3,
              review: 'Not Bad for a new restaurant that just opened yesterday',
              rating: 3,
            },
          ],
          favorite: false,
          ...item,
        };
      }),
    );
  }, [data]);

  return (
    <MainContext.Provider
      value={{
        recentData: lastData,
        lastViewedData: viewedData,
        getLastViewed,
        getLastData,
      }}>
      {children}
    </MainContext.Provider>
  );
};
export const useAuth = () => useContext(MainContext);

export default MainContext;
