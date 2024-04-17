import axios from 'axios';
import { StorageKey, ICourse } from '../types';
import { CreateCourseData } from '../types/createCourseData';

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

export const deleteCourse = async (id: number) => {
  const token = localStorage.getItem(StorageKey.TOKEN);

  if (!token) {
    window.location.reload();
    return null;
  }

  const { data } = await coursesFetch.delete<{ CourseId: number }>(`${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const changeCourse = async (course: ICourse) => {
  const token = localStorage.getItem(StorageKey.TOKEN);

  if (!token) {
    window.location.reload();
    return null;
  }

  const { data } = await coursesFetch.patch<ICourse[]>(`${course.id}`, course, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
export const createCourse = async (course: CreateCourseData) => {
  const token = localStorage.getItem(StorageKey.TOKEN);

  if (!token) {
    window.location.reload();
    return null;
  }

  const { data } = await coursesFetch.post<ICourse>('add', course, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
