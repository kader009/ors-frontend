import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Login {
  email: string;
  password: string;
}

const initialState: Login = {
  email: '',
  password: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    SetEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    SetPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },

    ClearLogin: (state) => {
      state.email = '';
      state.password = '';
    },
  },
});

export const { SetEmail, SetPassword, ClearLogin } = loginSlice.actions;

export default loginSlice.reducer;
