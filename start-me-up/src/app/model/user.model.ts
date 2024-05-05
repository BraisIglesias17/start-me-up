export type User = {
  id: string;
  name: string;
  surname: string;
  password: string;
  email: string;
};

export const EMPTY_USER: User = {
  id: '',
  name: '',
  surname: '',
  password: '',
  email: '',
};

export type UserSession = {
  user: User;
  accessToken: string;
};

export const EMPTY_SESSION: UserSession = {
  user: EMPTY_USER,
  accessToken: '',
};
