/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DataStatus, ICourse, ValueOf } from '../types';
import {
  getAllCourses,
  deleteCourse as deleteCurrentCourse,
} from '../api/myCoursesApi';

export interface ICourseState {
  coursesRequestStatus: ValueOf<typeof DataStatus>;
  hasError: boolean;
  courses: ICourse[] | null;
  currentCourse: ICourse | null;
}

const initialState: ICourseState = {
  coursesRequestStatus: DataStatus.IDLE,
  hasError: false,
  courses: null,
  currentCourse: null,
};

export const getAll = createAsyncThunk('courses/all', async () => {
  const allCourses = await getAllCourses();

  return allCourses;
});

export const deleteCourse = createAsyncThunk(
  'courses/delete',
  async (id: number) => {
    const allCourses = await deleteCurrentCourse(id);

    return allCourses;
  },
);

export const { reducer, actions } = createSlice({
  initialState,
  name: 'courses',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAll.fulfilled, (state, { payload }) => {
      state.coursesRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      state.courses = payload;
    });
    builder.addCase(getAll.rejected, state => {
      state.coursesRequestStatus = DataStatus.REJECTED;
      state.hasError = true;
      state.courses = null;
    });
    builder.addCase(getAll.pending, state => {
      state.coursesRequestStatus = DataStatus.PENDING;
      state.hasError = false;
    });
  },
});
