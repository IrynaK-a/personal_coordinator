import axios from 'axios';
import {
  StorageKey,
  CreateTaskData,
  ICourseTask,
  UpdatedTaskData,
  DeleteTaskData,
} from '../types';

const BASE_API_URL = 'http://localhost:8080/api/courses/';

const tasksFetch = axios.create({
  baseURL: BASE_API_URL,
});

export const create = async ({ courseId, name }: CreateTaskData) => {
  const token = localStorage.getItem(StorageKey.TOKEN);

  if (!token) {
    window.location.reload();
    return null;
  }

  const { data } = await tasksFetch.post<ICourseTask>(
    `add/${courseId}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const updateTask = async ({ status, name, id }: UpdatedTaskData) => {
  const API_URL = 'http://localhost:8080/api/tasks/';

  const token = localStorage.getItem(StorageKey.TOKEN);

  if (!token) {
    window.location.reload();

    return null;
  }

  const { data } = await axios
    .create({
      baseURL: API_URL,
    })
    .patch<ICourseTask>(
      `${id}`,
      { name, status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

  return data;
};

export const deleteTask = async ({ courseId, id }: DeleteTaskData) => {
  const token = localStorage.getItem(StorageKey.TOKEN);

  if (!token) {
    window.location.reload();
    return null;
  }

  const { data } = await tasksFetch.delete<number>(`${id}/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
