import * as yup from 'yup';

export const parentChildValidationSchema = yup.object().shape({
  parent_id: yup.string().nullable().required(),
  child_id: yup.string().nullable().required(),
});
