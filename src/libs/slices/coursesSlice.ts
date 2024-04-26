/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  UpdateCourseData,
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
  getCurrentCourse,
  updateCourse,
} from '../api/myCoursesApi';
import { getDefaultCourses } from '../api/defaultCoursesApi';

export interface ICourseState {
  coursesRequestStatus: ValueOf<typeof DataStatus>;
  deleteCourseRequestStatus: ValueOf<typeof DataStatus>;
  defaultCoursesRequestStatus: ValueOf<typeof DataStatus>;
  currentCoursesRequestStatus: ValueOf<typeof DataStatus>;
  hasError: boolean;
  myCourses: ICourse[] | null;
  currentCourse: ICourse | null;
  defaultCourses: DefaultCourse[] | null;
}

const initialState: ICourseState = {
  coursesRequestStatus: DataStatus.IDLE,
  deleteCourseRequestStatus: DataStatus.IDLE,
  defaultCoursesRequestStatus: DataStatus.IDLE,
  currentCoursesRequestStatus: DataStatus.IDLE,
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
  async (payload: number) => {
    const deletedId = await deleteCurrentCourse(payload);

    return deletedId;
  },
);

export const createNewCourse = createAsyncThunk(
  'courses/create',
  async (payload: CreateCourseData) => {
    const newCourse = await createCourse(payload);

    return newCourse;
  },
);

export const getCurrent = createAsyncThunk(
  'courses/current',
  async (payload: number) => {
    const currentCourse = await getCurrentCourse(payload);

    return currentCourse;
  },
);

export const updateCurrentCourse = createAsyncThunk(
  'courses/updateCurrent',
  async ({
    updatedCourse,
    id,
  }: {
    id: number;
    updatedCourse: UpdateCourseData;
  }) => {
    const changedCourse = await updateCourse(id, updatedCourse);

    return changedCourse;
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
    builder.addCase(createNewCourse.fulfilled, (state, { payload }) => {
      state.coursesRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      state.currentCourse = payload;
    });
    builder.addCase(getAllDefaultCourses.fulfilled, (state, { payload }) => {
      state.defaultCoursesRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      state.defaultCourses = payload;
    });
    builder.addCase(getAllDefaultCourses.pending, state => {
      state.defaultCoursesRequestStatus = DataStatus.PENDING;
      state.hasError = false;
    });
    builder.addCase(getAllDefaultCourses.rejected, state => {
      state.defaultCoursesRequestStatus = DataStatus.REJECTED;
      state.hasError = true;
    });
    builder.addCase(deleteCourse.fulfilled, (state, { payload }) => {
      state.coursesRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      state.myCourses =
        payload && state.myCourses
          ? state.myCourses.filter(course => course.id !== payload.id)
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
    builder.addCase(getCurrent.fulfilled, (state, { payload }) => {
      state.currentCoursesRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      state.currentCourse = payload;
    });
    builder.addCase(getCurrent.pending, state => {
      state.currentCoursesRequestStatus = DataStatus.PENDING;
      state.hasError = false;
    });
    builder.addCase(getCurrent.rejected, state => {
      state.currentCoursesRequestStatus = DataStatus.REJECTED;
      state.hasError = true;
    });
    builder.addCase(updateCurrentCourse.fulfilled, (state, { payload }) => {
      state.currentCoursesRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      state.currentCourse = payload;
    });
    builder.addCase(updateCurrentCourse.pending, state => {
      state.currentCoursesRequestStatus = DataStatus.PENDING;
      state.hasError = false;
    });
    builder.addCase(updateCurrentCourse.rejected, state => {
      state.currentCoursesRequestStatus = DataStatus.REJECTED;
      state.hasError = true;
    });
    builder.addMatcher(
      isAnyOf(getAllMyCourses.rejected, createNewCourse.rejected),
      state => {
        state.coursesRequestStatus = DataStatus.REJECTED;
        state.hasError = true;
      },
    );
    builder.addMatcher(
      isAnyOf(getAllMyCourses.pending, createNewCourse.pending),
      state => {
        state.coursesRequestStatus = DataStatus.PENDING;
        state.hasError = false;
      },
    );
  },
});
