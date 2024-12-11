/* eslint-disable @typescript-eslint/no-unused-vars */
import { storeDataObject } from '@src/storage';

export const formikConfig = (getHistory:any,history:any) => {
    return {
        initialValues: {
          search: '',
          rating: 0,
        },
        onSubmit: (values?: any) => {
          storeDataObject('history', [...history, values.search]).then(res => {
            getHistory();
          });
        },
    };
};
