/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  DataStatus,
  UserSignInRequestDto,
  UserSignUpRequestDto,
  ValueOf,
} from '../types';
import { authApi } from '../api/authApi';

export interface IAuthState {
  authRequestStatus: ValueOf<typeof DataStatus>;
  hasError: boolean;
  userName: string | null;
}

const initialState: IAuthState = {
  authRequestStatus: DataStatus.IDLE,
  hasError: false,
  userName: null,
};

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (payload: UserSignUpRequestDto) => {
    const { userName, token } = await authApi.signUp(payload);

    localStorage.setItem('Token', token);
    console.log(userName, token);

    return userName;
  },
);

export const signIn = createAsyncThunk(
  'auth/signUp',
  async (payload: UserSignInRequestDto) => {
    const { userName, token } = await authApi.signIn(payload);

    localStorage.setItem('Token', token);

    return userName;
  },
);

export const { reducer, actions } = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        isAnyOf(signUp.fulfilled, signIn.fulfilled),
        (state, { payload }) => {
          state.authRequestStatus = DataStatus.FULFILLED;
          state.hasError = false;
          state.userName = payload;
        },
      )
      .addMatcher(isAnyOf(signUp.pending, signIn.pending), state => {
        state.authRequestStatus = DataStatus.PENDING;
        state.hasError = false;
      })
      .addMatcher(isAnyOf(signUp.rejected, signIn.rejected), state => {
        state.authRequestStatus = DataStatus.REJECTED;
        state.hasError = true;
      });
  },
});
