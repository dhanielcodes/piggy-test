import * as Yup from 'yup';
export const ReviewSchema = Yup.object().shape({
    review: Yup.string().required('leave a review'),
    rating: Yup.string().required('rate restaurant'),
  });
