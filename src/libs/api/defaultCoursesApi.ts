import axios from 'axios';
import { DefaultCourse } from '../types/defaultCourse.type';

const BASE_API_URL = 'http://localhost:8080/api/default-course/';

const coursesFetch = axios.create({
  baseURL: BASE_API_URL,
});

export const getDefaultCourses = async () => {
  const { data } = await coursesFetch.get<DefaultCourse[]>('all');

  return data;
};
