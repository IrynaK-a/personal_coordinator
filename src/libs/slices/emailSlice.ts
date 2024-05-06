/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DataStatus, ValueOf } from '../types';
import { sendEmail } from '../api/emailApi';

export interface IEmailState {
  emailRequestStatus: ValueOf<typeof DataStatus>;
  hasError: boolean;
}

const initialState: IEmailState = {
  emailRequestStatus: DataStatus.IDLE,
  hasError: false,
};

export const contactTeam = createAsyncThunk(
  'email/send',
  async (form: React.RefObject<HTMLFormElement>) => {
    await sendEmail(form);
  },
);

export const { reducer, actions } = createSlice({
  initialState,
  name: 'email',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(contactTeam.fulfilled, state => {
      state.emailRequestStatus = DataStatus.FULFILLED;
      state.hasError = false;
    });
    builder.addCase(contactTeam.pending, state => {
      state.emailRequestStatus = DataStatus.PENDING;
      state.hasError = false;
    });
    builder.addCase(contactTeam.rejected, state => {
      state.emailRequestStatus = DataStatus.REJECTED;
      state.hasError = true;
    });
  },
});
