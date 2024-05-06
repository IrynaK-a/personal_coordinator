import axios from 'axios';
import { IUserProfileInfo, StorageKey } from '../types';

const BASE_API_URL = 'http://localhost:8080/api/';

const authFetch = axios.create({
  baseURL: BASE_API_URL,
});

export const fetchUserInfo = async () => {
  const token = localStorage.getItem(StorageKey.TOKEN);

  if (!token) {
    window.location.reload();
    return null;
  }

  const { data } = await authFetch.get<IUserProfileInfo>('user-profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
