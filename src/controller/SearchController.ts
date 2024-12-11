/* eslint-disable @typescript-eslint/no-unused-vars */
import {SearchSchema} from '@src/constants/Schema';
import {storeDataObject} from '@src/storage';

export const formikConfig = (getHistory: any, history: any) => {
  return {
    initialValues: {
      search: '',
      rating: 0,
    },
    validationSchema: SearchSchema,
    onSubmit: (values?: any) => {
      storeDataObject('history', [...history, values.search]).then(res => {
        getHistory();
      });
    },
  };
};

export const getListSearchData = (list: any, formik: any) => {
  return formik.values.search && formik.values.rating
    ? list
        ?.filter((item: any) =>
          item?.name.toLowerCase()?.includes(formik.values.search),
        )
        ?.filter((item: any) => Number(item?.rating) === formik.values.rating)
    : formik.values.search
    ? list?.filter((item: any) =>
        item?.name.toLowerCase()?.includes(formik.values.search),
      )
    : formik.values.rating
    ? list?.filter((item: any) => Number(item?.rating) === formik.values.rating)
    : [];
};
