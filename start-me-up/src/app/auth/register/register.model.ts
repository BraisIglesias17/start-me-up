import { User } from 'src/app/model/user.model';

export interface FormRegister extends User {
  repeatedPassword: string;
}
