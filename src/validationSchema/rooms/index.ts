import * as yup from 'yup';

export const roomValidationSchema = yup.object().shape({
  status: yup.string().required(),
  type: yup.string().required(),
  hotel_id: yup.string().nullable(),
});
