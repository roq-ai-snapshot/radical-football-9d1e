import * as yup from 'yup';

export const coachAcademyValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  academy_id: yup.string().nullable().required(),
});
