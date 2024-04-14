/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  DataStatus,
  StorageKey,
  UserSignInRequestDto,
  UserSignUpRequestDto,
  ValueOf,
} from '../types';
import { authApi } from '../api/authApi';

export interface IAuthState {
  authRequestStatus: ValueOf<typeof DataStatus>;
  hasError: boolean;
  user: string | null;
}

const initialState: IAuthState = {
  authRequestStatus: DataStatus.IDLE,
  hasError: false,
  user: null,
};

export const getCurrentUser = createAsyncThunk('auth/current', async () => {
  const token = localStorage.getItem(StorageKey.TOKEN);

  if (!token) {
    return null;
  }

  try {
    return await authApi.getCurrentUser(token);
  } catch {
    localStorage.removeItem(StorageKey.TOKEN);

    return null;
  }
});

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (payload: UserSignUpRequestDto) => {
    const { user, token } = await authApi.signUp(payload);

    localStorage.setItem(StorageKey.TOKEN, token);

    return user;
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload: UserSignInRequestDto) => {
    const { user, token } = await authApi.signIn(payload);

    localStorage.setItem(StorageKey.TOKEN, token);

    return user;
  },
);

export const { reducer, actions } = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    logOut: state => {
      state.user = null;
      localStorage.removeItem(StorageKey.TOKEN);
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        isAnyOf(getCurrentUser.fulfilled, signUp.fulfilled, signIn.fulfilled),
        (state, { payload }) => {
          state.authRequestStatus = DataStatus.FULFILLED;
          state.hasError = false;
          state.user = payload;
        },
      )
      .addMatcher(
        isAnyOf(getCurrentUser.pending, signUp.pending, signIn.pending),
        state => {
          state.authRequestStatus = DataStatus.PENDING;
          state.hasError = false;
        },
      )
      .addMatcher(
        isAnyOf(getCurrentUser.rejected, signUp.rejected, signIn.rejected),
        state => {
          state.authRequestStatus = DataStatus.REJECTED;
          state.hasError = true;
        },
      );
  },
});
