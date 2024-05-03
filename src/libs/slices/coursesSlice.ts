/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { DataStatus, DefaultCourse, ICourse, ValueOf } from '../types';
import {
  getAllCourses,
  deleteCourse as deleteCurrentCourse,
  createCourse,
} from '../api/myCoursesApi';
import { getDefaultCourses } from '../api/defaultCoursesApi';

export interface ICourseState {
  coursesRequestStatus: ValueOf<typeof DataStatus>;
  hasError: boolean;
  courses: ICourse[] | null;
  currentCourse: ICourse | null;
  defaultCourses: DefaultCourse[] | null;
}

const initialState: ICourseState = {
  coursesRequestStatus: DataStatus.IDLE,
  hasError: false,
  courses: null,
  currentCourse: null,
  defaultCourses: null,
};

export const getAllDefaultCourses = createAsyncThunk(
  'courses/default',
  async () => {
    const defaultCourses = await getDefaultCourses();

    return defaultCourses;
  },
);

export const getAllMyCourses = createAsyncThunk('courses/all', async () => {
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

export const create = createAsyncThunk(
  'courses/create',
  async (payload: Pick<ICourse, 'link' | 'name' | 'image' | 'description'>) => {
    const newCourse = await createCourse(payload);

    return newCourse;
  },
);

export const { reducer, actions } = createSlice({
  initialState,
  name: 'courses',
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      isAnyOf(
        getAllMyCourses.rejected,
        create.rejected,
        getAllDefaultCourses.rejected,
      ),
      state => {
        state.coursesRequestStatus = DataStatus.REJECTED;
        state.hasError = true;
      },
    );
    builder.addMatcher(
      isAnyOf(
        getAllMyCourses.pending,
        create.pending,
        getAllDefaultCourses.pending,
      ),
      state => {
        state.coursesRequestStatus = DataStatus.PENDING;
        state.hasError = false;
      },
    );
    builder.addCase(getAllMyCourses.fulfilled, (state, { payload }) => {
      state.coursesRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      state.courses = payload;
    });
    builder.addCase(create.fulfilled, (state, { payload }) => {
      state.coursesRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      state.courses = payload;
    });
    builder.addCase(getAllDefaultCourses.fulfilled, (state, { payload }) => {
      state.coursesRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      state.defaultCourses = payload;
    });
  },
});
