import axios, { AxiosResponse } from 'axios';
import { IUser, IUserRegister } from 'src/interfaces/User';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: { 'Access-Control-Allow-Origin': '*' },
  withCredentials: true,
});

const login = (user): Promise<AxiosResponse<IUser>> =>
  instance.post('/auth/login', user).then(({ data }) => data);

const register = (user: IUserRegister) =>
  instance.post('/users/register', user).then(({ data }) => data.user);

export default {
  login,
  register,
};
