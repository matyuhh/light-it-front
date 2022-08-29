export interface IUserRegister {
  name: string;
  username: string;
  surname: string;
  password?: string;
  confirmPassword?: string;
  year_of_birth: number;
  gender: string;
}

export interface IUser {
  access_token: string;
  gender: string;
  year_of_birth: number;
}
