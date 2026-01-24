import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Register {
  username: string;
  email: string;
  password: string;
  role: string;
}

const initialState: Register = {
  username: '',
  email: '',
  password: '',
  role: '',
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    SetUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },

    SetEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    SetPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },

    SetRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },

    ClearRegister: (state) => {
      state.username = '';
      state.email = '';
      state.password = '';
      state.role = '';
    },
  },
});

export const { SetUsername, SetEmail, SetPassword, SetRole, ClearRegister } =
  registerSlice.actions;

export default registerSlice.reducer;
