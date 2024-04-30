import axios from 'axios';
import { IDefaultCourse } from '../types/defaultCourse.interface';

const BASE_API_URL = 'http://localhost:8080/api/default-course/';

const coursesFetch = axios.create({
  baseURL: BASE_API_URL,
});

export const getDefaultCourses = async () => {
  const { data } = await coursesFetch.get<IDefaultCourse[]>('all');

  return data;
};
