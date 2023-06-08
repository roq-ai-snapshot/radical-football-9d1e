import * as yup from 'yup';
import { coachAcademyValidationSchema } from 'validationSchema/coach-academies';
import { playerProfileValidationSchema } from 'validationSchema/player-profiles';

export const academyValidationSchema = yup.object().shape({
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  coach_academy: yup.array().of(coachAcademyValidationSchema),
  player_profile: yup.array().of(playerProfileValidationSchema),
});
