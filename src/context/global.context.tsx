/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {ApiService} from '@src/service';
import {getDataObject, storeDataObject} from '@src/storage';
import {useMutation, useQuery} from '@tanstack/react-query';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

export type ContextType = {
  lastData?: any;
  viewedData?: any;
  favoriteList?: any;
  loading?: any;
  getLastViewed?: () => void;
  getLastData?: () => void;
  getFavorites?: () => void;
} | null;

interface Context {
  children?: ReactNode;
}

const MainContext = createContext<ContextType | null>(null);

export const MainProvider: React.FC<Context> = ({children}: Context) => {
  // Use this type in your state initialization
  const [lastData, setLastData] = useState([]);
  const [viewedData, setViewedData] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [loading, setLoading] = useState(false);

  const {data, isLoading, refetch, isFetching, error} = useQuery({
    queryKey: ['GetRestaurantsQuery'],
    queryFn: () => ApiService.GetRestaurantsQuery(),
    //enabled: false,
  });

  const getLastData = () => {
    setLoading(true);
    getDataObject('restaurants').then(val => {
      setLoading(false);
      if (val) {
        if (val?.length) {
          setLastData(val);
        } else {
          refetch();
        }
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
  const getFavorites = () => {
    getDataObject('favorites').then(val => {
      if (val) {
        setFavoriteList(val);
      } else {
        setFavoriteList([]);
      }
    });
  };
  useEffect(() => {
    getLastData();
    getLastViewed();
    getFavorites();
  }, []);
  useEffect(() => {
    //storeDataObject('favorites', []);
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
              isMe: false,
            },
            {
              id: 2,
              review: 'Not Bad for a new restaurant',
              rating: 4,
              isMe: false,
            },
            {
              id: 3,
              review: 'Not Bad for a new restaurant that just opened yesterday',
              rating: 3,
              isMe: false,
            },
          ],
          favorite: false,
          ...item,
        };
      }),
    ).then(res => {
      getLastData();
    });
  }, [data]);

  return (
    <MainContext.Provider
      value={{
        lastData,
        viewedData,
        favoriteList,
        getFavorites,
        getLastViewed,
        getLastData,
        loading: loading || isLoading,
      }}>
      {children}
    </MainContext.Provider>
  );
};
export const useAuth = () => useContext(MainContext);

export default MainContext;
