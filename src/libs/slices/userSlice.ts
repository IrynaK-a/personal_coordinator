/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DataStatus, IUserProfileInfo, ValueOf } from '../types';
import { fetchUserInfo } from '../api/userApi';

export interface IAuthState {
  authRequestStatus: ValueOf<typeof DataStatus>;
  hasError: boolean;
  userInfo: IUserProfileInfo | null;
}

const initialState: IAuthState = {
  authRequestStatus: DataStatus.IDLE,
  hasError: false,
  userInfo: null,
};

export const getUserInfo = createAsyncThunk('user/info', async () => {
  const info = await fetchUserInfo();

  return info;
});

export const { reducer, actions } = createSlice({
  initialState,
  name: 'user',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
      state.authRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
    });
    builder.addCase(getUserInfo.pending, state => {
      state.authRequestStatus = DataStatus.PENDING;
      state.hasError = false;
    });
    builder.addCase(getUserInfo.rejected, state => {
      state.authRequestStatus = DataStatus.REJECTED;
      state.hasError = true;
    });
  },
});
