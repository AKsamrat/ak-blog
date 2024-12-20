import { USER_ROLE } from './user.constants';

export interface IUser {
  _id?: string;
  name?: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isBlocked: boolean;
  userStatus: 'active' | 'inactive';
}

export type TUserRole = keyof typeof USER_ROLE;
