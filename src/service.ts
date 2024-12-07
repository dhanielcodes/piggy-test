import { Axios } from './utils/axios-config';


export const ApiService = {

    GetRestaurantsQuery: async () => {
        const { data } = await Axios.get('restaurants');
        return data;
    },
};


