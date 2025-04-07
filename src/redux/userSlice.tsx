import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  username: string | null;
}

const initialState: UserState = {
  token: localStorage.getItem('token') || null,
  username: localStorage.getItem('username') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; username: string }>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.username);
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;