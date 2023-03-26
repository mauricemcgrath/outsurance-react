import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchUsers } from './user.service';
import { User } from '../../models/user';

export interface UserState {
  list: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  list: [],
  status: 'idle',
};

export const fetchUsersAsync = createAsyncThunk(
  'user/fetchUsers',
  async () => {
    const response = await fetchUsers();
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});


export const selectUsers = (state: RootState) => state.user.list;

export const selectUsersStatus = (state: RootState) => state.user.status;

export default counterSlice.reducer;
