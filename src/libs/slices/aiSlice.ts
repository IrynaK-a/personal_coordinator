/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { DataStatus, IInspirationResponse, ValueOf } from '../types';
import * as aiApi from '../api/aiApi';

export interface IAIState {
  aiRequestStatus: ValueOf<typeof DataStatus>;
  hasError: boolean;
  answer: IInspirationResponse | string | null;
}

const initialState: IAIState = {
  aiRequestStatus: DataStatus.IDLE,
  hasError: false,
  answer: null,
};

export const getInspired = createAsyncThunk('ai/inspiration', async () => {
  const answer = await aiApi.getInspiraton();

  return answer;
});

export const getCourses = createAsyncThunk(
  'ai/courses',
  async (payload: string) => {
    const answer = await aiApi.getCourses(payload);

    return answer;
  },
);

export const { reducer, actions } = createSlice({
  initialState,
  name: 'ai',
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        isAnyOf(getInspired.fulfilled, getCourses.fulfilled),
        (state, { payload }) => {
          state.aiRequestStatus = DataStatus.FULFILLED;
          state.hasError = false;
          state.answer = payload;
        },
      )
      .addMatcher(isAnyOf(getInspired.pending, getCourses.pending), state => {
        state.aiRequestStatus = DataStatus.PENDING;
        state.hasError = false;
      })
      .addMatcher(isAnyOf(getInspired.rejected, getCourses.rejected), state => {
        state.aiRequestStatus = DataStatus.REJECTED;
        state.hasError = true;
      });
  },
});
