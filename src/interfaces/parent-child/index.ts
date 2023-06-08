import { UserInterface } from 'interfaces/user';

export interface ParentChildInterface {
  id?: string;
  parent_id: string;
  child_id: string;
  created_at?: Date;
  updated_at?: Date;

  user_parent_child_parent_idTouser?: UserInterface;
  user_parent_child_child_idTouser?: UserInterface;
  _count?: {};
}
