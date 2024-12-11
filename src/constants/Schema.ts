import * as Yup from 'yup';
export const ReviewSchema = Yup.object().shape({
  review: Yup.string().required('leave a review'),
  rating: Yup.string().required('rate restaurant'),
});

export const SearchSchema = Yup.object().shape({
  search: Yup.string().required('Search restaurant name'),
});
