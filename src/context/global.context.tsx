/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {ApiService} from '@src/service';
import {getDataObject, storeDataObject} from '@src/storage';
import {useMutation, useQuery} from '@tanstack/react-query';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

export type ContextType = {
  lastData?: any;
  name?: any;
} | null;

interface Context {
  children?: ReactNode;
}

const MainContext = createContext<ContextType>(null);

export const MainProvider: React.FC<Context> = ({children}: Context) => {
  // Use this type in your state initialization

  const {data, isLoading, refetch, isFetching, error} = useQuery({
    queryKey: ['GetRestaurantsQuery'],
    queryFn: () => ApiService.GetRestaurantsQuery(),
  });
  const [lastData, setLastData] = useState([]);

  const getLastData = () => {
    getDataObject('restaurants').then(val => {
      if (val) {
        setLastData(val);
      } else {
        setLastData([]);
      }
    });
  };
  useEffect(() => {
    getLastData();
  }, []);
  console.log(data, error?.response, 'datatata');
  useEffect(() => {
    storeDataObject('restaurants', data);
  }, [data]);

  return (
    <MainContext.Provider
      value={{
        lastData,
        name: 'Daniel',
      }}>
      {children}
    </MainContext.Provider>
  );
};
export const useAuth = () => useContext(MainContext);

export default MainContext;
