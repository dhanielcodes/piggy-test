/* eslint-disable @typescript-eslint/no-unused-vars */
import { storeDataObject } from '@src/storage';
import { RestaurantSchema } from '@src/types/restaurant';

export const onSubmitReview = (setData:any,data:any,values:any,review:any,lastData:any,getLastViewed:any,viewedData:any,getFavorites:any,getLastData:any) => {
    setData({
        ...data,
        reviewsList: [
          {
            id: review?.id ? review?.id : data?.reviewsList?.length + 1,
            isMe: true,
            ...values,
          },
          ...data?.reviewsList?.filter((item:any) => item?.id !== review?.id),
        ],
      });

      const updateList = lastData?.map((itm: RestaurantSchema) =>
        itm?.id === data?.id
          ? {
              ...itm,
              reviewsList: [
                {
                  id: review?.id ? review?.id : data?.reviewsList?.length + 1,
                  isMe: true,
                  ...values,
                },
                ...data?.reviewsList?.filter((item:any) => item?.id !== review?.id),
              ],
            }
          : itm,
      );
      storeDataObject('restaurants', updateList).then(res => {
        getLastData();
      });
      storeDataObject(
        'favorites',
        updateList?.filter((itm: RestaurantSchema) => itm?.favorite),
      ).then(res => {
        getFavorites();
      });
      const updateLastViewed = updateList.filter((itm: RestaurantSchema) =>
        viewedData?.map((itmm: RestaurantSchema) => itmm?.id).includes(itm.id),
      );

      storeDataObject('lastViewed', updateLastViewed).then(res => {
        getLastViewed();
      });
};

export const onFavoriteRestaurant = (getFavorites:any,lastData:any,getLastData:any,viewedData:any,getLastViewed:any,props:RestaurantSchema) =>{
  const updateList = lastData?.map((itm: RestaurantSchema) =>
    itm?.id === props?.id ? {...itm, favorite: !itm?.favorite} : itm,
  );
  storeDataObject(
    'favorites',
    updateList?.filter((itm: RestaurantSchema) => itm?.favorite),
  ).then(res => {
    getFavorites();
  });
  storeDataObject('restaurants', updateList).then(res => {
    getLastData();
  });

  const updateLastViewed = updateList.filter(
    (itm: RestaurantSchema) =>
      viewedData
        ?.map((itmm: RestaurantSchema) => itmm?.id)
        .includes(itm.id),
  );

  storeDataObject('lastViewed', updateLastViewed).then(res => {
    getLastViewed();
  });
};


export const onFavoriteRestaurantHeader = (getFavorites:any,lastData:any,getLastData:any,viewedData:any,getLastViewed:any,data:any,setData:any) =>{
  const updateList = lastData?.map((itm: RestaurantSchema) =>
    itm?.id === data?.id ? {...itm, favorite: !itm?.favorite} : itm,
  );
  storeDataObject(
    'favorites',
    updateList?.filter((itm: RestaurantSchema) => itm?.favorite),
  ).then(res => {
    getFavorites();
  });
  storeDataObject('restaurants', updateList).then(res => {
    getLastData();
    setData({...data, favorite: !data?.favorite});
  });

  const updateLastViewed = updateList.filter(
    (itm: RestaurantSchema) =>
      viewedData
        ?.map((itmm: RestaurantSchema) => itmm?.id)
        .includes(itm.id),
  );

  storeDataObject('lastViewed', updateLastViewed).then(res => {
    getLastViewed();
  });
};


