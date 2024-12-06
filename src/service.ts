import { Axios } from './utils/axios-config';

export const ApiService = {

    GetProductsQuery: async (payload?:string) => {
        const { data } = await Axios.get(`products${payload ? payload : ''}`);
        return data;
    },
    GetProductsCategoryQuery: async (payload?:string) => {
        const { data } = await Axios.get(`products/categories${payload ? payload : ''}`);
        return data;
    },
};


