import axios from 'axios';
import { StorageKey, ICourse, ChangeCourseData } from '../types';
import { CreateCourseData } from '../types/createCourseData.type';

const BASE_API_URL = 'http://localhost:8080/api/courses/';

const coursesFetch = axios.create({
  baseURL: BASE_API_URL,
});

export const getAllCourses = async () => {
  const token = localStorage.getItem(StorageKey.TOKEN);

  if (!token) {
    window.location.reload();
    return null;
  }

  const { data } = await coursesFetch.get<ICourse[]>('all', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const deleteCourse = async (courseId: number) => {
  const token = localStorage.getItem(StorageKey.TOKEN);

  if (!token) {
    window.location.reload();
    return null;
  }

  const { data } = await coursesFetch.delete<Pick<ICourse, 'id'>>(
    `${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const changeCourse = async (
  courseId: number,
  payload: ChangeCourseData,
) => {
  const token = localStorage.getItem(StorageKey.TOKEN);

  if (!token) {
    window.location.reload();
    return null;
  }

  const { data } = await coursesFetch.patch<ICourse>(`${courseId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const createCourse = async (payload: CreateCourseData) => {
  const token = localStorage.getItem(StorageKey.TOKEN);

  if (!token) {
    window.location.reload();
    return null;
  }

  const { data } = await coursesFetch.post<ICourse>('add', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getCurrentCourse = async (payload: number) => {
  const token = localStorage.getItem(StorageKey.TOKEN);

  if (!token) {
    window.location.reload();
    return null;
  }

  const { data } = await coursesFetch.get<ICourse>(`${payload}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
