import { UserInterface } from 'interfaces/user';
import { AcademyInterface } from 'interfaces/academy';

export interface PlayerProfileInterface {
  id?: string;
  user_id: string;
  academy_id: string;
  date_of_birth?: Date;
  position?: string;
  height?: number;
  weight?: number;
  created_at?: Date;
  updated_at?: Date;

  user?: UserInterface;
  academy?: AcademyInterface;
  _count?: {};
}
