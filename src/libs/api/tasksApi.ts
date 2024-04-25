import axios from 'axios';
import {
  StorageKey,
  CreateTaskData,
  ICourseTasks,
  UpdatedTaskData,
} from '../types';

const BASE_API_URL = 'http://localhost:8080/api/tasks/';

const tasksFetch = axios.create({
  baseURL: BASE_API_URL,
});

export const create = async ({ courseId, taskName }: CreateTaskData) => {
  const API_URL = 'http://localhost:8080/api/courses/add/';

  const token = localStorage.getItem(StorageKey.TOKEN);

  if (!token) {
    window.location.reload();
    return null;
  }

  const { data } = await axios
    .create({
      baseURL: API_URL,
    })
    .post<ICourseTasks>(
      `${courseId}`,
      { name: taskName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

  return data;
};

export const updateTask = async ({ status, taskName, id }: UpdatedTaskData) => {
  const token = localStorage.getItem(StorageKey.TOKEN);

  if (!token) {
    window.location.reload();
    return null;
  }

  const { data } = await axios.patch<ICourseTasks>(
    `${id}`,
    { taskName, status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const deleteTask = async (taskId: number) => {
  const token = localStorage.getItem(StorageKey.TOKEN);

  if (!token) {
    window.location.reload();
    return null;
  }

  const { data } = await tasksFetch.delete<Pick<ICourseTasks, 'id'>>(
    `${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};
