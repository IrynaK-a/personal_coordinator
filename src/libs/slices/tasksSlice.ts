/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UpdatedTaskData, CreateTaskData, DataStatus, ValueOf } from '../types';
import { create, deleteTask, updateTask } from '../api/tasksApi';

export interface ICourseState {
  createTaskRequestStatus: ValueOf<typeof DataStatus>;
  deleteTaskRequestStatus: ValueOf<typeof DataStatus>;
  changeTaskRequestStatus: ValueOf<typeof DataStatus>;
  hasError: boolean;
}

const initialState: ICourseState = {
  createTaskRequestStatus: DataStatus.IDLE,
  deleteTaskRequestStatus: DataStatus.IDLE,
  changeTaskRequestStatus: DataStatus.IDLE,
  hasError: false,
};

export const createTask = createAsyncThunk(
  'tasks/add',
  async (payload: CreateTaskData) => {
    const currentCourse = await create(payload);

    return currentCourse;
  },
);

export const deleteCurrentTask = createAsyncThunk(
  'tasks/delete',
  async (payload: number) => {
    const deletedTask = await deleteTask(payload);

    return deletedTask;
  },
);

export const updateCurrentTask = createAsyncThunk(
  'tasks/change',
  async (payload: UpdatedTaskData) => {
    const updatedTask = await updateTask(payload);

    return updatedTask;
  },
);

export const { reducer, actions } = createSlice({
  initialState,
  name: 'tasks',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createTask.fulfilled, state => {
      state.createTaskRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
    });

    builder.addCase(createTask.pending, state => {
      state.createTaskRequestStatus = DataStatus.PENDING;
      state.hasError = false;
    });

    builder.addCase(createTask.rejected, state => {
      state.createTaskRequestStatus = DataStatus.REJECTED;
      state.hasError = true;
    });
    builder.addCase(deleteCurrentTask.fulfilled, state => {
      state.deleteTaskRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
    });

    builder.addCase(deleteCurrentTask.pending, state => {
      state.deleteTaskRequestStatus = DataStatus.PENDING;
      state.hasError = false;
    });

    builder.addCase(deleteCurrentTask.rejected, state => {
      state.deleteTaskRequestStatus = DataStatus.REJECTED;
      state.hasError = true;
    });
  },
});
