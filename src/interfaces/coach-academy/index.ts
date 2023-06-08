import { UserInterface } from 'interfaces/user';
import { AcademyInterface } from 'interfaces/academy';

export interface CoachAcademyInterface {
  id?: string;
  user_id: string;
  academy_id: string;
  created_at?: Date;
  updated_at?: Date;

  user?: UserInterface;
  academy?: AcademyInterface;
  _count?: {};
}
