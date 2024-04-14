import axios from 'axios';
import { UserSignInRequestDto, UserSignUpRequestDto } from '../types';

const BASE_API_URL = 'http://localhost:8080/api/auth/';

type AuthUserResponse = {
  user: string;
  token: string;
};

type CurrentUserResponse = {
  firstName: string;
};

type AuthPath = 'login' | 'register' | 'current-user';

const authFetch = axios.create({
  baseURL: BASE_API_URL,
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

const getCurrent = async (token: string) => {
  const { data } = await authFetch.get<CurrentUserResponse>('current-user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.firstName;
};

export const authApi = {
  signIn: (payload: UserSignInRequestDto) => request('login', payload),
  signUp: (payload: UserSignUpRequestDto) => request('register', payload),
  getCurrentUser: (token: string) => getCurrent(token),
};
