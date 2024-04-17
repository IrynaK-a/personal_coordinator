/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  CreateCourseData,
  DataStatus,
  DefaultCourse,
  ICourse,
  ValueOf,
} from '../types';
import {
  getAllCourses,
  deleteCourse as deleteCurrentCourse,
  createCourse,
} from '../api/myCoursesApi';
import { getDefaultCourses } from '../api/defaultCoursesApi';

export interface ICourseState {
  coursesRequestStatus: ValueOf<typeof DataStatus>;
  deleteCourseRequestStatus: ValueOf<typeof DataStatus>;
  hasError: boolean;
  myCourses: ICourse[] | null;
  currentCourse: ICourse | null;
  defaultCourses: DefaultCourse[] | null;
}

const initialState: ICourseState = {
  coursesRequestStatus: DataStatus.IDLE,
  deleteCourseRequestStatus: DataStatus.IDLE,
  hasError: false,
  myCourses: null,
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
    const deletedId = await deleteCurrentCourse(id);

    return deletedId;
  },
);

export const create = createAsyncThunk(
  'courses/create',
  async (payload: CreateCourseData) => {
    const newCourse = await createCourse(payload);

    return newCourse;
  },
);

export const { reducer, actions } = createSlice({
  initialState,
  name: 'courses',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllMyCourses.fulfilled, (state, { payload }) => {
      state.coursesRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      state.myCourses = payload;
    });
    builder.addCase(create.fulfilled, (state, { payload }) => {
      state.coursesRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      state.currentCourse = payload;
    });
    builder.addCase(getAllDefaultCourses.fulfilled, (state, { payload }) => {
      state.coursesRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      state.defaultCourses = payload;
    });
    builder.addCase(deleteCourse.fulfilled, (state, { payload }) => {
      state.coursesRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      state.myCourses =
        payload && state.myCourses
          ? state.myCourses.filter(course => course.id !== payload.CourseId)
          : state.myCourses;
    });
    builder.addCase(deleteCourse.pending, state => {
      state.deleteCourseRequestStatus = DataStatus.PENDING;
      state.hasError = false;
    });
    builder.addCase(deleteCourse.rejected, state => {
      state.deleteCourseRequestStatus = DataStatus.REJECTED;
      state.hasError = true;
    });
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
        deleteCourse.pending,
      ),
      state => {
        state.coursesRequestStatus = DataStatus.PENDING;
        state.hasError = false;
      },
    );
  },
});
