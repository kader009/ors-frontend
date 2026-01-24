import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// User interface
interface User {
  _id: string;
  name: string;
  email: string;
  photoUrl: string;
  role: string;
}

interface LoginResponse {
  user: User;
  token: string;
  name?: string | null | undefined;
  email?: string | null;
  image?: string | null;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state (no localStorage used)
const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: string }
>('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post<LoginResponse>(
      'https://study-platform-backend-drxm.onrender.com/api/v1/login',
      credentials,
      {
        withCredentials: true,
      }
    );

    const { user, token } = response.data;
    return { user, token };
  } catch (err) {
    let message = 'Something went wrong';
    if (axios.isAxiosError(err)) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      message = axiosErr.response?.data.message ?? axiosErr.message;
    }
    return rejectWithValue(message);
  }
});

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = action.payload ?? action.error.message ?? null;
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;