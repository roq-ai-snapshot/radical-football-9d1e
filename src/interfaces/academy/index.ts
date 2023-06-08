import { CoachAcademyInterface } from 'interfaces/coach-academy';
import { PlayerProfileInterface } from 'interfaces/player-profile';
import { UserInterface } from 'interfaces/user';

export interface AcademyInterface {
  id?: string;
  name: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
  coach_academy?: CoachAcademyInterface[];
  player_profile?: PlayerProfileInterface[];
  user?: UserInterface;
  _count?: {
    coach_academy?: number;
    player_profile?: number;
  };
}
