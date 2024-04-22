/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  ChangeCourseData,
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
  changeCourse,
} from '../api/myCoursesApi';
import { getDefaultCourses } from '../api/defaultCoursesApi';
import { createTask } from './tasksSlice';

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

export const create = createAsyncThunk(
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

export const changeCurrentCourse = createAsyncThunk(
  'courses/changeCurrent',
  async ({
    changedData,
    id,
  }: {
    id: number;
    changedData: ChangeCourseData;
  }) => {
    const changedCourse = await changeCourse(id, changedData);

    return changedCourse;
  },
);

export const { reducer, actions } = createSlice({
  initialState,
  name: 'courses',
  reducers: {
    setNoMyCourses: state => {
      state.myCourses = null;
    },
  },
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
    builder.addCase(changeCurrentCourse.fulfilled, (state, { payload }) => {
      state.currentCoursesRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
      state.currentCourse = payload;
    });
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      state.currentCourse = payload;
    });
    builder.addCase(changeCurrentCourse.pending, state => {
      state.currentCoursesRequestStatus = DataStatus.PENDING;
      state.hasError = false;
    });
    builder.addCase(changeCurrentCourse.rejected, state => {
      state.currentCoursesRequestStatus = DataStatus.REJECTED;
      state.hasError = true;
    });
    builder.addMatcher(
      isAnyOf(getAllMyCourses.rejected, create.rejected),
      state => {
        state.coursesRequestStatus = DataStatus.REJECTED;
        state.hasError = true;
      },
    );
    builder.addMatcher(
      isAnyOf(getAllMyCourses.pending, create.pending),
      state => {
        state.coursesRequestStatus = DataStatus.PENDING;
        state.hasError = false;
      },
    );
  },
});
