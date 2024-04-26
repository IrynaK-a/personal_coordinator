/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  UpdatedTaskData,
  CreateTaskData,
  DataStatus,
  ValueOf,
  DeleteTaskData,
  ICourseTask,
} from '../types';
import { create, deleteTask, updateTask } from '../api/tasksApi';
import { deleteCourse, getCurrent } from './coursesSlice';

export interface ICourseState {
  createTaskRequestStatus: ValueOf<typeof DataStatus>;
  deleteTaskRequestStatus: ValueOf<typeof DataStatus>;
  changeTaskRequestStatus: ValueOf<typeof DataStatus>;
  hasError: boolean;
  currentTasks: ICourseTask[];
}

const initialState: ICourseState = {
  createTaskRequestStatus: DataStatus.IDLE,
  deleteTaskRequestStatus: DataStatus.IDLE,
  changeTaskRequestStatus: DataStatus.IDLE,
  hasError: false,
  currentTasks: [],
};

export const createTask = createAsyncThunk(
  'tasks/add',
  async (payload: CreateTaskData) => {
    const currentTask = await create(payload);

    return currentTask;
  },
);

export const deleteCurrentTask = createAsyncThunk(
  'tasks/delete',
  async (payload: DeleteTaskData) => {
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
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      state.createTaskRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      if (payload) {
        state.currentTasks.push(payload);
      }
    });
    builder.addCase(createTask.pending, state => {
      state.createTaskRequestStatus = DataStatus.PENDING;
      state.hasError = false;
    });

    builder.addCase(createTask.rejected, state => {
      state.createTaskRequestStatus = DataStatus.REJECTED;
      state.hasError = true;
    });
    builder.addCase(deleteCurrentTask.fulfilled, (state, { payload }) => {
      state.deleteTaskRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      if (payload) {
        state.currentTasks = state.currentTasks.filter(
          task => task.id !== payload.id,
        );
      }
    });
    builder.addCase(deleteCurrentTask.pending, state => {
      state.deleteTaskRequestStatus = DataStatus.PENDING;
      state.hasError = false;
    });
    builder.addCase(deleteCurrentTask.rejected, state => {
      state.deleteTaskRequestStatus = DataStatus.REJECTED;
      state.hasError = true;
    });
    builder.addCase(updateCurrentTask.fulfilled, (state, { payload }) => {
      state.deleteTaskRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      state.currentTasks.forEach(task => {
        if (task.id === payload?.id) {
          task.taskName = payload.taskName;
          task.status = payload.status;
        }
      });
    });
    builder.addCase(updateCurrentTask.pending, state => {
      state.deleteTaskRequestStatus = DataStatus.PENDING;
      state.hasError = false;
    });
    builder.addCase(updateCurrentTask.rejected, state => {
      state.deleteTaskRequestStatus = DataStatus.REJECTED;
      state.hasError = true;
    });
    builder.addCase(getCurrent.fulfilled, (state, { payload }) => {
      state.createTaskRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      if (payload) {
        state.currentTasks = payload.courseTasks;
      }
    });
    builder.addCase(deleteCourse.fulfilled, (state, { payload }) => {
      state.createTaskRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      if (payload) {
        state.currentTasks = [];
      }
    });
  },
});
