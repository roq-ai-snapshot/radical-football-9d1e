import * as yup from 'yup';

export const playerProfileValidationSchema = yup.object().shape({
  date_of_birth: yup.date(),
  position: yup.string(),
  height: yup.number().integer(),
  weight: yup.number().integer(),
  user_id: yup.string().nullable().required(),
  academy_id: yup.string().nullable().required(),
});
