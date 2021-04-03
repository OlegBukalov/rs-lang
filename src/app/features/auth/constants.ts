export enum FormControlName {
  Name = 'name',
  Email = 'email',
  Password = 'password',
}

export const MAX_NAME_LENGTH = 25;
export const MIN_NAME_LENGTH = 3;
export const MAX_PASSWORD_LENGTH = 20;
export const MIN_PASSWORD_LENGTH = 8;

export interface LoginResponse {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}
