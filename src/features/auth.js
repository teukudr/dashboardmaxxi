import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API_ENDPOINT from '../global/api-endpoint';
import axios from 'axios';

const { LOGIN, LOGOUT, SESSION } = API_ENDPOINT;

const initialState = {
  admin: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const loginAdmin = createAsyncThunk(
  "admin/loginadmin",
  async ({ email, password }) => {
    const response = await axios.post(LOGIN({ email, password }));

    if (response.status === "error") {
      return { error: true, status: response.status };
    }
    if (response.status !== "error") {
      return { error: false, token: response.token, status: "" };
    }
  }
);

export const sessionUser = createAsyncThunk('user/session', async(_, thunkAPI) => {
  try {
    const response = await axios.get(SESSION);
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const logoutUser = createAsyncThunk('user/logout', async() => {
  await axios.delete(LOGOUT);
});

export const authSlice = createSlice({
  name: 'aut',
  initialState,
  reducers:{
    reset: (state) => initialState
  },
  extraReducers:(builder) => {
    builder.addCase(loginAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.admin = action.payload;
    });
    builder.addCase(loginAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //Session Users login
    builder.addCase(sessionUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sessionUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(sessionUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
