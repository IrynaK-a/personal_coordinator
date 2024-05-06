/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { DataStatus, IUserProfileInfo, ValueOf } from '../types';
import { fetchUserInfo } from '../api/userApi';
import { NOTIFICATION_MESSAGES } from '../constants';

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
    });
    builder.addCase(getUserInfo.pending, state => {
      state.authRequestStatus = DataStatus.PENDING;
    });
    builder.addCase(getUserInfo.rejected, state => {
      state.authRequestStatus = DataStatus.REJECTED;
      toast.success(NOTIFICATION_MESSAGES.userInfo.error);
    });
  },
});
