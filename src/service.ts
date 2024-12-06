import { Axios } from './utils/axios-config';


export const ApiService = {

  /*   GetProductsQuery: async (payload?:string) => {
        const { data } = await Axios.get(`products${payload ? payload : ''}`);
        return data;
    }, */

    GetRestaurantsMutation: async (body?:any) => {
        const { data } = await Axios.post('merchant/business?language=en_US&location_id=297704&currency=USD&offset=0', body);
        return data;
    },
};


