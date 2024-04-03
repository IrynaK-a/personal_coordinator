import axios from 'axios';
import { UserSignInRequestDto, UserSignUpRequestDto } from '../types';

const BASE_API_URL = 'http://localhost:8080/api/auth/';

type AuthUserResponse = {
  userName: string;
  token: string;
};

type AuthPath = 'login' | 'register';

const authFetch = axios.create({
  baseURL: BASE_API_URL,
  headers: { 'Content-Type': 'application/json; charset: UTF-8' },
});

const request = async (
  url: AuthPath,
  payload: UserSignUpRequestDto | UserSignInRequestDto,
) => {
  const { data } = await authFetch.post<AuthUserResponse>(url, {
    ...payload,
  });

  return data;
};

export const authApi = {
  signIn: (payload: UserSignInRequestDto) => request('login', payload),
  signUp: (payload: UserSignUpRequestDto) => request('register', payload),
};
